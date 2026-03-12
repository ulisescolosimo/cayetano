import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'

const MP_PAYMENTS_URL = 'https://api.mercadopago.com/v1/payments'

/**
 * Webhook de MercadoPago (IPN / notificaciones).
 * URL a configurar: https://offish-alverta-unbusily.ngrok-free.dev/api/webhooks/mercadopago
 *
 * MercadoPago puede enviar:
 * - GET ?topic=payment&id=<payment_id>
 * - POST application/json { "topic": "payment", "resource": "<payment_id>" }
 *
 * Ante cualquier notificación respondemos 200 para que MP no reintente.
 * Si topic=payment, consultamos el pago en MP y, si está aprobado, actualizamos nuestra tabla payments.
 */
export async function GET(request: NextRequest) {
  const topic = request.nextUrl.searchParams.get('topic')
  const id = request.nextUrl.searchParams.get('id')
  return processNotification(topic, id)
}

export async function POST(request: NextRequest) {
  let topic: string | null = null
  let id: string | null = null

  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      const body = await request.json()
      topic = body?.topic ?? body?.data?.topic ?? null
      id = body?.id ?? body?.resource ?? body?.data?.id ?? null
    } catch {
      // body vacío o inválido
    }
  }
  if (!id && request.nextUrl.searchParams) {
    topic = request.nextUrl.searchParams.get('topic')
    id = request.nextUrl.searchParams.get('id')
  }

  return processNotification(topic, id)
}

async function processNotification(
  topic: string | null,
  paymentIdMp: string | null
): Promise<NextResponse> {
  // Siempre responder 200 para que MercadoPago no reintente (timeout 22s)
  if (!topic || !paymentIdMp?.trim()) {
    return NextResponse.json({ received: true }, { status: 200 })
  }

  if (topic !== 'payment') {
    return NextResponse.json({ received: true, topic }, { status: 200 })
  }

  const mpToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!mpToken) {
    console.error('[webhook mercadopago] MERCADOPAGO_ACCESS_TOKEN no configurado')
    return NextResponse.json({ received: true }, { status: 200 })
  }

  try {
    const res = await fetch(`${MP_PAYMENTS_URL}/${paymentIdMp}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${mpToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error('[webhook mercadopago] Error al obtener pago de MP:', res.status, await res.text())
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const payment = await res.json()
    const status = payment?.status
    const externalReference = payment?.external_reference ?? payment?.metadata?.payment_id ?? null

    if (status === 'approved' && externalReference) {
      const supabase = createSupabaseAdmin()
      const { data: updatedRow, error } = await supabase
        .from('payments')
        .update({
          status: 'approved',
          payment_id: String(paymentIdMp),
        })
        .eq('id', externalReference)
        .select('id, email, amount_usd, amount_total, currency_id, dolar_rate_used, created_at')
        .single()

      if (error) {
        console.error('[webhook mercadopago] Error al actualizar payment en DB:', error)
      } else if (updatedRow) {
        // Notificar a n8n para envío de mail (fire-and-forget)
        const mailingWebhookUrl =
          process.env.N8N_MAILING_WEBHOOK_URL?.trim() ||
          'https://orsai.app.n8n.cloud/webhook/mailing-cayetano'
        fetch(mailingWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: updatedRow.email,
            payment_id: updatedRow.id,
            mp_payment_id: paymentIdMp,
            amount_usd: updatedRow.amount_usd,
            amount_total: updatedRow.amount_total,
            currency_id: updatedRow.currency_id,
            dolar_rate_used: updatedRow.dolar_rate_used,
            created_at: updatedRow.created_at,
          }),
        }).catch((err) => {
          console.error('[webhook mercadopago] Error al notificar mailing n8n:', err)
        })
      }
    }
  } catch (err) {
    console.error('[webhook mercadopago] Error procesando notificación:', err)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
