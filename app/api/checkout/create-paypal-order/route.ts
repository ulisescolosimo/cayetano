import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { createSupabaseAdmin } from '@/lib/supabase/admin'
import { createPayPalOrder, getPayPalAmountUsd } from '@/lib/paypal'

export async function POST(request: NextRequest) {
  try {
    await request.json().catch(() => ({})) // payload no requerido; el email es solo referencia al volver

    const supabase = createSupabaseAdmin()
    const amountUsd = getPayPalAmountUsd()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || ''

    const paymentId = randomUUID()
    const { error: insertError } = await supabase.from('payments').insert({
      id: paymentId,
      status: 'pending',
      email: '',
      amount_usd: amountUsd,
      amount_total: amountUsd,
      currency_id: 'USD',
      dolar_rate_used: null,
      preference_id: null,
      provider: 'paypal',
    })

    if (insertError) {
      console.error('Payments insert error (paypal):', insertError)
      return NextResponse.json(
        { error: 'Error al registrar el pago' },
        { status: 500 }
      )
    }

    const returnUrl = `${baseUrl}/aporte-exitoso?payment_id=${paymentId}`
    const cancelUrl = `${baseUrl}/aporte-error?payment_id=${paymentId}`

    const { orderId, approvalUrl } = await createPayPalOrder({
      paymentId,
      email: '',
      returnUrl,
      cancelUrl,
    })

    await supabase
      .from('payments')
      .update({ preference_id: orderId })
      .eq('id', paymentId)

    return NextResponse.json({
      order_id: orderId,
      approval_url: approvalUrl,
      payment_id: paymentId,
    })
  } catch (err) {
    console.error('Create PayPal order error:', err)
    const message = err instanceof Error ? err.message : 'Error interno'
    return NextResponse.json(
      { error: message },
      { status: 502 }
    )
  }
}
