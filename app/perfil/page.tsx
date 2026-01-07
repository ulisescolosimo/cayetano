'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Footer from '@/components/sections/Footer'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading, updateProfile } = useProfile(user)
  const router = useRouter()
  
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Actualizar los campos cuando el perfil se carga
  useEffect(() => {
    if (profile) {
      setNombre(profile.nombre || '')
      setApellido(profile.apellido || '')
      setEmail(profile.email || user?.email || '')
    }
  }, [profile, user])

  // Proteger la ruta - redirigir si no está autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!nombre.trim() || !apellido.trim()) {
      setError('Por favor completá todos los campos')
      return
    }

    setLoading(true)

    try {
      await updateProfile({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim() || user?.email || '',
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Error al guardar el perfil')
    } finally {
      setLoading(false)
    }
  }

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-sans text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // No mostrar nada si no está autenticado (se redirigirá)
  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-white">
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
            {/* Header */}
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
                Mi Perfil
              </h1>
              <p className="font-sans text-sm text-gray-600">
                Actualizá tus datos personales
              </p>
            </div>

            {/* Formulario */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 py-2 rounded-[8px] font-sans text-xs"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border-l-4 border-green-500 text-green-700 px-3 py-2 rounded-[8px] font-sans text-xs"
                >
                  Perfil actualizado correctamente
                </motion.div>
              )}

              <div className="space-y-3">
                <div>
                  <label htmlFor="nombre" className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    className="w-full px-3 py-2.5 rounded-[13px] border-2 border-gray-200 text-gray-900 placeholder-gray-400 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#318CE7] focus:border-[#318CE7] transition-all"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="apellido" className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
                    Apellido
                  </label>
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    required
                    className="w-full px-3 py-2.5 rounded-[13px] border-2 border-gray-200 text-gray-900 placeholder-gray-400 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#318CE7] focus:border-[#318CE7] transition-all"
                    placeholder="Tu apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-sans font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled
                    className="w-full px-3 py-2.5 rounded-[13px] border-2 border-gray-200 text-gray-400 bg-gray-50 font-sans text-sm cursor-not-allowed"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="mt-1 text-xs font-sans text-gray-500">
                    El email no se puede modificar
                  </p>
                </div>
              </div>

              <div className="pt-1 space-y-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full rounded-[13px] px-4 py-2.5 text-white font-sans font-bold text-sm"
                  style={{ backgroundColor: '#318CE7', lineHeight: '127%' }}
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar cambios'}
                </Button>
                
                <button
                  type="button"
                  onClick={() => router.push('/miembros')}
                  className="w-full rounded-[13px] px-4 py-2.5 text-gray-700 font-sans font-medium text-sm border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Volver
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}

