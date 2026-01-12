'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function WorldCupSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleJoinClick = () => {
    if (!user && !loading) {
      router.push('/login')
    } else if (user) {
      // Aquí puedes agregar la lógica para cuando el usuario está logueado
      console.log('Usuario autenticado, proceder con el proceso')
    }
  }

  useEffect(() => {
    // Observer para animaciones
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Solo activar confeti en pantallas grandes (desktop)
    const isMobile = window.innerWidth < 1024
    if (isMobile || !sectionRef.current) {
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current)
        }
      }
    }

    const section = sectionRef.current

    // Crear canvas específico para este contenedor
    const canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '1'
    section.appendChild(canvas)
    canvasRef.current = canvas

    // Configurar tamaño inicial del canvas
    const rect = section.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Crear instancia de confetti para este canvas específico
    // useWorker debe ser false cuando se necesita control manual del canvas
    // resize: true permite que canvas-confetti maneje el resize automáticamente
    const confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: false, // Deshabilitado para evitar conflictos con resize
    })

    // Configuración del confeti
    const confettiConfig = {
      particleCount: 20, // Aumentado para más confeti visible
      spread: 50,
      colors: ['#FFFFFF'],
      gravity: 0.3,
      drift: 0.2,
      ticks: 200,
      startVelocity: 15,
    }

    // Función para disparar confeti con mayor frecuencia
    const interval = setInterval(() => {
      const randomY = Math.random() * 0.6 + 0.2
      
      // Confeti desde el costado izquierdo del contenedor (hacia la derecha)
      confettiInstance({
        ...confettiConfig,
        angle: Math.random() * 50 + 45,
        origin: { 
          x: 0,
          y: randomY
        },
      })

      // Confeti desde el costado derecho del contenedor (hacia la izquierda)
      confettiInstance({
        ...confettiConfig,
        angle: Math.random() * 50 + 85,
        origin: { 
          x: 1,
          y: randomY
        },
      })

      // Confeti adicional desde la parte superior (opcional, para más densidad)
      if (Math.random() > 0.5) {
        confettiInstance({
          ...confettiConfig,
          angle: Math.random() * 30 + 75,
          origin: { 
            x: Math.random() * 0.4 + 0.3,
            y: 0
          },
        })
      }
    }, 1500) // Reducido a 1.5 segundos para más frecuencia

    return () => {
      clearInterval(interval)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full md:min-h-screen bg-brand py-8 sm:py-12 md:py-16 lg:py-20 confetti-pattern overflow-hidden flex flex-col items-center justify-center">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {/* Pelota de fútbol */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -180 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
          >
            <img 
              src="/images/⚽.png" 
              alt="Pelota de fútbol" 
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Título principal */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 sm:space-y-4 md:space-y-6"
          >
            <h2 className="text-white font-sans text-lg sm:text-xl md:text-2xl lg:text-[32px] font-normal leading-[127%] text-center px-2">
              Sumate como <span className="font-bold">Socio Productor</span>
            </h2>
            
            <h3 className="text-white font-display text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-normal leading-[127%] text-center px-2">
              La previa la hacemos nosotros
            </h3>
          </motion.div>

          {/* Párrafo descriptivo */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white font-sans text-sm sm:text-base md:text-lg lg:text-[32px] font-normal leading-relaxed lg:leading-[150%] text-center max-w-5xl px-4"
          >
            Durante 18 semanas co-diseñás junto a Cayetano 18 entrevistas en vivo. Vos proponés temas, votás preguntas y ayudás a armar el guion. <span className="font-bold">Acá la audiencia no mira: produce.</span>
          </motion.p>

          {/* Botón */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleJoinClick}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-sans font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-[127%] rounded-[13px] transition-colors duration-200 px-4 py-2 sm:px-6 sm:py-3"
          >
            Sumarme ahora por USD 18
          </motion.button>

          {/* Texto final */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white font-sans text-sm sm:text-base md:text-lg lg:text-2xl font-normal leading-[109%] text-center px-4"
          >
            Aporte único. Cupos limitados. Comunidad adentro.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

