import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/admin'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await params
    if (!paymentId?.trim()) {
      return NextResponse.json({ error: 'payment_id requerido' }, { status: 400 })
    }

    const supabase = createSupabaseAdmin()
    const { data, error } = await supabase
      .from('payments')
      .select('email, status')
      .eq('id', paymentId)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      email: data.email ?? null,
      status: data.status ?? 'pending',
    })
  } catch {
    return NextResponse.json(
      { error: 'Error al obtener el pago' },
      { status: 500 }
    )
  }
}
