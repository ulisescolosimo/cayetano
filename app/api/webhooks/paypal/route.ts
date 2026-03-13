import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'

type PayPalWebhookEvent = {
  event_type?: string
  resource?: {
    id?: string
    links?: Array<{ rel: string; href: string }>
    status?: string
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PayPalWebhookEvent
    const eventType = body?.event_type
    const resource = body?.resource

    if (!eventType || !resource) {
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (eventType !== 'PAYMENT.CAPTURE.COMPLETED') {
      return NextResponse.json({ received: true, event_type: eventType }, { status: 200 })
    }

    if (resource.status !== 'COMPLETED') {
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const captureId = resource.id
    const orderLink = resource.links?.find((l) => l.rel === 'up')
    const orderHref = orderLink?.href
    const orderId: string | null = orderHref
      ? (orderHref.split('/').filter(Boolean).pop() ?? null)
      : null

    if (!orderId) {
      console.error('[webhook paypal] No se pudo obtener order_id del resource')
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const supabase = createSupabaseAdmin()
    const { data: paymentRow, error: fetchError } = await supabase
      .from('payments')
      .select('id, status, email, amount_usd, amount_total, currency_id, dolar_rate_used, created_at')
      .eq('provider', 'paypal')
      .eq('preference_id', orderId)
      .single()

    if (fetchError || !paymentRow) {
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (paymentRow.status === 'approved') {
      return NextResponse.json({ received: true, already_approved: true }, { status: 200 })
    }

    const { error: updateError } = await supabase
      .from('payments')
      .update({ status: 'approved', payment_id: captureId || orderId })
      .eq('id', paymentRow.id)

    if (updateError) {
      console.error('[webhook paypal] Error al actualizar payment:', updateError)
      return NextResponse.json({ received: true }, { status: 200 })
    }

    const mailingWebhookUrl =
      process.env.N8N_MAILING_WEBHOOK_URL?.trim() ||
      'https://orsai.app.n8n.cloud/webhook/mailing-cayetano'
    fetch(mailingWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'paypal',
        email: paymentRow.email,
        payment_id: paymentRow.id,
        mp_payment_id: captureId || orderId,
        paypal_order_id: orderId,
        amount_usd: paymentRow.amount_usd,
        amount_total: paymentRow.amount_total,
        currency_id: paymentRow.currency_id,
        dolar_rate_used: paymentRow.dolar_rate_used,
        created_at: paymentRow.created_at,
      }),
    }).catch((err) => {
      console.error('[webhook paypal] Error al notificar n8n:', err)
    })

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error('[webhook paypal] Error:', err)
    return NextResponse.json({ received: true }, { status: 200 })
  }
}
