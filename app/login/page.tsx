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
  const [showPassword, setShowPassword] = useState(false)
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

      router.push('/miembros')
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
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="w-full px-3 py-2.5 pr-10 rounded-[13px] border-2 border-gray-200 text-gray-900 placeholder-gray-400 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#318CE7] focus:border-[#318CE7] transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-[#318CE7]"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
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

