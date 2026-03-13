import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { createSupabaseAdmin } from '@/lib/supabase/admin'

const AMOUNT_USD = 18
const DOLAR_API_OFICIAL = 'https://dolarapi.com/v1/dolares/oficial'
const MP_PREFERENCES_URL = 'https://api.mercadopago.com/checkout/preferences'

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

    // Solo bloquear si ya existe un pago autorizado o aprobado con este email (pending permite reintentar)
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

    // 1. Obtener cotización dólar oficial (venta)
    const dolarRes = await fetch(DOLAR_API_OFICIAL)
    if (!dolarRes.ok) {
      return NextResponse.json(
        { error: 'No se pudo obtener la cotización del dólar' },
        { status: 502 }
      )
    }
    const dolarJson = await dolarRes.json()
    const venta = Number(dolarJson?.venta)
    if (!Number.isFinite(venta) || venta <= 0) {
      return NextResponse.json(
        { error: 'Cotización del dólar no disponible' },
        { status: 502 }
      )
    }

    const amountTotal = Math.round(AMOUNT_USD * venta)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || ''

    // 2. Insertar en payments antes de llamar a MP
    const paymentId = randomUUID()
    const { error: insertError } = await supabase.from('payments').insert({
      id: paymentId,
      status: 'pending',
      email,
      amount_usd: AMOUNT_USD,
      amount_total: amountTotal,
      currency_id: 'ARS',
      dolar_rate_used: venta,
      preference_id: null,
      provider: 'mercadopago',
    })

    if (insertError) {
      console.error('Payments insert error:', insertError)
      return NextResponse.json(
        { error: 'Error al registrar el pago' },
        { status: 500 }
      )
    }

    // 3. Crear preferencia en MercadoPago
    const mpToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    const notificationUrl = process.env.MERCADOPAGO_NOTIFICATION_URL?.trim() || undefined

    if (!mpToken) {
      return NextResponse.json(
        { error: 'Configuración de pago no disponible' },
        { status: 500 }
      )
    }

    const mpBody = {
      items: [
        {
          id: 'aporte-unico',
          title: 'Aporte único - Productor del programa (USD 18)',
          description: `Equivalente a USD ${AMOUNT_USD} al tipo de cambio del día`,
          quantity: 1,
          unit_price: amountTotal,
          currency_id: 'ARS',
        },
      ],
      payer: {
        email,
      },
      back_urls: {
        success: `${baseUrl}/aporte-exitoso?payment_id=${paymentId}`,
        failure: `${baseUrl}/aporte-error?payment_id=${paymentId}`,
        pending: `${baseUrl}/aporte-pendiente?payment_id=${paymentId}`,
      },
      auto_return: 'approved',
      external_reference: paymentId,
      notification_url: notificationUrl || undefined,
      metadata: {
        payment_id: paymentId,
        user_email: email,
      },
    }

    const mpRes = await fetch(MP_PREFERENCES_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mpToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mpBody),
    })

    const mpJson = await mpRes.json()

    if (!mpRes.ok) {
      return NextResponse.json(
        { error: mpJson?.message || 'Error al crear la preferencia de pago' },
        { status: 502 }
      )
    }

    const preferenceId = mpJson.id
    if (preferenceId) {
      await supabase
        .from('payments')
        .update({ preference_id: preferenceId })
        .eq('id', paymentId)
    }

    const initPoint = mpJson.init_point || mpJson.sandbox_init_point
    if (!initPoint) {
      return NextResponse.json(
        { error: 'MercadoPago no devolvió URL de pago' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      init_point: initPoint,
      payment_id: paymentId,
    })
  } catch (err) {
    console.error('Create preference error:', err)
    return NextResponse.json(
      { error: 'Error interno al crear el pago' },
      { status: 500 }
    )
  }
}
