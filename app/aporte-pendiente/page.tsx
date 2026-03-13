'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase/client'
import { translateSupabaseError } from '@/lib/utils/supabaseErrors'

function AportePendienteContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')

  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentLoading, setPaymentLoading] = useState(true)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  useEffect(() => {
    if (!paymentId) {
      setPaymentError('Falta el identificador del pago')
      setPaymentLoading(false)
      return
    }
    fetch(`/api/payments/${paymentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.email != null) setEmail(data.email)
        else setPaymentError('Pago no encontrado')
      })
      .catch(() => setPaymentError('Error al cargar los datos del pago'))
      .finally(() => setPaymentLoading(false))
  }, [paymentId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email) return
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      const { error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) throw signUpError
      router.push('/miembros')
      router.refresh()
    } catch (err: unknown) {
      setError(translateSupabaseError(err))
      setLoading(false)
    }
  }

  if (paymentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (paymentError || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <p className="font-sans text-gray-700 mb-4">{paymentError || 'No se encontró el pago'}</p>
          <Link href="/#sumate" className="text-brand font-sans font-bold hover:text-brand-dark hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded">
            Volver a intentar
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-white overflow-hidden py-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 right-20 w-32 h-32 sm:w-40 sm:h-40 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-28 h-28 sm:w-36 sm:h-36 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-[20px] p-6 sm:p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <Image src="/images/⚽.png" alt="Pelota" width={48} height={48} className="w-12 h-12 object-contain" />
            </div>
            <h1 className="font-display text-[28px] sm:text-[32px] font-normal text-gray-800 mb-1">
              Pago pendiente
            </h1>
            <p className="font-sans text-sm text-gray-600">
              Tu pago está en proceso. Cuando se acredite podrás acceder a la zona de miembros. Podés crear tu cuenta con el mismo correo ya.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 py-2 rounded-[8px] font-sans text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-sans font-medium text-gray-700 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-3 py-2.5 rounded-[13px] border-2 border-gray-200 text-gray-600 font-sans text-sm bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-3 py-2.5 rounded-[13px] border-2 border-gray-200 text-gray-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                required
                autoComplete="new-password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repetí tu contraseña"
                className="w-full px-3 py-2.5 rounded-[13px] border-2 border-gray-200 text-gray-900 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                required
                autoComplete="new-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full rounded-[13px] px-4 py-2.5 text-white font-sans font-bold text-sm leading-[127%]"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="font-sans text-xs text-gray-600">
              ¿Ya tenés cuenta?{' '}
              <Link href={`/login?email=${encodeURIComponent(email)}`} className="font-bold text-brand hover:text-brand-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded">
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="font-sans text-xs text-gray-500 hover:text-gray-700 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function AportePendientePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AportePendienteContent />
    </Suspense>
  )
}
