'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { translateSupabaseError } from '@/lib/utils/supabaseErrors'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/')
      router.refresh()
    } catch (error: any) {
      setError(translateSupabaseError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-white overflow-hidden py-8">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 right-20 w-32 h-32 sm:w-40 sm:h-40 bg-brand/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-28 h-28 sm:w-36 sm:h-36 bg-brand/10 rounded-full blur-3xl" />
      </div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-[20px] p-6 sm:p-8 shadow-xl border border-gray-100">
          {/* Header compacto */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/⚽.png"
                  alt="Pelota"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="font-display text-[28px] sm:text-[32px] font-normal text-gray-800 mb-1">
              Bienvenido
            </h1>
            <p className="font-sans text-sm text-gray-600">
              Iniciá sesión para continuar
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 py-2 rounded-[8px] font-sans text-xs"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2.5 rounded-[13px] border-2 border-gray-200 text-gray-900 placeholder-gray-400 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#318CE7] focus:border-[#318CE7] transition-all"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2.5 rounded-[13px] border-2 border-gray-200 text-gray-900 placeholder-gray-400 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#318CE7] focus:border-[#318CE7] transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-1">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full rounded-[13px] px-4 py-2.5 text-white font-sans font-bold text-sm"
                style={{ backgroundColor: '#318CE7', lineHeight: '127%' }}
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="font-sans text-xs text-gray-600">
                ¿No tenés cuenta?{' '}
                <Link
                  href="/register"
                  className="font-bold text-[#318CE7] hover:text-[#2563eb] transition-colors"
                >
                  Creá una cuenta
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Link de vuelta al inicio */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="font-sans text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

