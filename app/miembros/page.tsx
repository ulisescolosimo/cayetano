'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import CompleteProfile from '@/components/perfil/CompleteProfile'

// Fecha del Mundial 2026 (aproximada - inicio del torneo)
const WORLD_CUP_DATE = new Date('2026-06-11T00:00:00-03:00')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function MembersPage() {
  const { user, loading } = useAuth()
  const { profile, loading: profileLoading, isProfileComplete } = useProfile(user)
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isVisible, setIsVisible] = useState(false)

  // Proteger la ruta - redirigir si no está autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Calcular tiempo restante
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = WORLD_CUP_DATE.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    setIsVisible(true)

    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  // Mostrar loading mientras se verifica la autenticación
  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-sans text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si el perfil no está completo, mostrar el formulario de completar perfil
  if (user && !isProfileComplete) {
    return <CompleteProfile />
  }

  // No mostrar nada si no está autenticado (se redirigirá)
  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section con Contador */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden flex flex-col items-center justify-center">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-brand/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-3xl" />
        </div>

        <Container>
          <div className="relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-10 md:space-y-12">
            {/* Título de bienvenida */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-white font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[127%]">
                {profile?.nombre && profile?.apellido
                  ? `Bienvenido, ${profile.nombre} ${profile.apellido}`
                  : 'Bienvenido'}
              </h1>
              <p className="text-gray-300 font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-2xl mx-auto px-4">
                El Mundial 2026 se acerca. Cada segundo cuenta.
              </p>
            </motion.div>

            {/* Contador Regresivo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-5xl px-4"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {/* Días */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-brand/10 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gray-800/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-gray-700/50 shadow-xl hover:border-brand/50 transition-all duration-300">
                    <div className="text-white font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums">
                      {timeLeft.days.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 font-sans text-xs sm:text-sm md:text-base mt-2 uppercase tracking-wider">
                      Días
                    </div>
                  </div>
                </div>

                {/* Horas */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-brand/10 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gray-800/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-gray-700/50 shadow-xl hover:border-brand/50 transition-all duration-300">
                    <div className="text-white font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 font-sans text-xs sm:text-sm md:text-base mt-2 uppercase tracking-wider">
                      Horas
                    </div>
                  </div>
                </div>

                {/* Minutos */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-brand/10 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gray-800/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-gray-700/50 shadow-xl hover:border-brand/50 transition-all duration-300">
                    <div className="text-white font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 font-sans text-xs sm:text-sm md:text-base mt-2 uppercase tracking-wider">
                      Minutos
                    </div>
                  </div>
                </div>

                {/* Segundos */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-brand/10 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gray-800/80 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-gray-700/50 shadow-xl hover:border-brand/50 transition-all duration-300">
                    <div className="text-white font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-400 font-sans text-xs sm:text-sm md:text-base mt-2 uppercase tracking-wider">
                      Segundos
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </Container>
      </section>
    </main>
  )
}

