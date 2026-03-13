import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'
import { capturePayPalOrder } from '@/lib/paypal'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const paymentId = typeof body?.payment_id === 'string' ? body.payment_id.trim() : ''
    const orderId = typeof body?.order_id === 'string' ? body.order_id.trim() : ''

    if (!paymentId || !orderId) {
      return NextResponse.json(
        { error: 'payment_id y order_id son requeridos' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseAdmin()
    const { data: paymentRow, error: fetchError } = await supabase
      .from('payments')
      .select('id, status, provider')
      .eq('id', paymentId)
      .single()

    if (fetchError || !paymentRow) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    if (paymentRow.provider !== 'paypal') {
      return NextResponse.json(
        { error: 'Este pago no es de PayPal' },
        { status: 400 }
      )
    }

    if (paymentRow.status === 'approved') {
      return NextResponse.json({ success: true, already_captured: true })
    }

    const { captureId } = await capturePayPalOrder(orderId)

    const { data: updatedRow, error: updateError } = await supabase
      .from('payments')
      .update({
        status: 'approved',
        payment_id: captureId || orderId,
      })
      .eq('id', paymentId)
      .select('id, email, amount_usd, amount_total, currency_id, dolar_rate_used, created_at')
      .single()

    if (updateError) {
      console.error('[capture-paypal] Error al actualizar payment:', updateError)
      return NextResponse.json(
        { error: 'Error al registrar el pago' },
        { status: 500 }
      )
    }

    if (updatedRow) {
      const mailingWebhookUrl =
        process.env.N8N_MAILING_WEBHOOK_URL?.trim() ||
        'https://orsai.app.n8n.cloud/webhook/mailing-cayetano'
      fetch(mailingWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'paypal',
          email: updatedRow.email,
          payment_id: updatedRow.id,
          mp_payment_id: captureId || orderId,
          paypal_order_id: orderId,
          amount_usd: updatedRow.amount_usd,
          amount_total: updatedRow.amount_total,
          currency_id: updatedRow.currency_id,
          dolar_rate_used: updatedRow.dolar_rate_used,
          created_at: updatedRow.created_at,
        }),
      }).catch((err) => {
        console.error('[capture-paypal] Error al notificar n8n:', err)
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Capture PayPal error:', err)
    const message = err instanceof Error ? err.message : 'Error al capturar el pago'
    return NextResponse.json(
      { error: message },
      { status: 502 }
    )
  }
}
