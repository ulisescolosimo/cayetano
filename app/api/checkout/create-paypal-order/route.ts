import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { createSupabaseAdmin } from '@/lib/supabase/admin'
import { createPayPalOrder, getPayPalAmountUsd } from '@/lib/paypal'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() ?? '')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body?.email === 'string' ? body.email.trim() : ''

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido o faltante' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseAdmin()

    const { data: existingPayments } = await supabase
      .from('payments')
      .select('id, status')
      .eq('email', email)
      .in('status', ['approved', 'authorized'])

    if (existingPayments && existingPayments.length > 0) {
      return NextResponse.json(
        { error: 'Ya realizaste tu aporte con este correo. Si no tenés cuenta, creala desde Iniciar sesión.' },
        { status: 400 }
      )
    }

    const amountUsd = getPayPalAmountUsd()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || ''

    const paymentId = randomUUID()
    const { error: insertError } = await supabase.from('payments').insert({
      id: paymentId,
      status: 'pending',
      email,
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
      email,
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
