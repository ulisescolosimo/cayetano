import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'

/**
 * GET /api/miembros/mi-pago
 * Devuelve el pago aprobado del usuario autenticado (por email).
 * Requiere sesión activa.
 */
export async function GET() {
  try {
    const supabase = await createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user?.email) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    const admin = createSupabaseAdmin()
    const { data, error } = await admin
      .from('payments')
      .select('id, status, email, amount_usd, amount_total, currency_id, dolar_rate_used, created_at, payment_id')
      .eq('email', user.email)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('[mi-pago] Error al buscar pago:', error)
      return NextResponse.json(
        { error: 'Error al obtener el pago' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'No se encontró un pago aprobado para este usuario' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('[mi-pago] Error:', err)
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    )
  }
}
