'use client'

import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function WorldCupSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
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
    // Solo activar confeti en pantallas grandes (desktop)
    const isMobile = window.innerWidth < 1024
    if (isMobile || !sectionRef.current) return

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

    // Crear instancia de confetti para este canvas específico
    const confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })

    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

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
      window.removeEventListener('resize', resizeCanvas)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-brand py-8 sm:py-12 md:py-16 lg:py-20 confetti-pattern overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {/* Pelota de fútbol */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
            <img 
              src="/images/⚽.png" 
              alt="Pelota de fútbol" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Título principal */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h2 className="text-white font-sans text-lg sm:text-xl md:text-2xl lg:text-[32px] font-normal leading-[127%] text-center px-2">
              Sumate como <span className="font-bold">Socio Productor</span>
            </h2>
            
            <h3 className="text-white font-display text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-normal leading-[127%] text-center px-2">
              La previa la hacemos nosotros
            </h3>
          </div>

          {/* Párrafo descriptivo */}
          <p className="text-white font-sans text-sm sm:text-base md:text-lg lg:text-[32px] font-normal leading-[127%] text-center max-w-3xl px-4">
            Durante 18 semanas co-diseñás junto a Cayetano 18 entrevistas en vivo. Vos proponés temas, votás preguntas y ayudás a armar el guion. Acá la audiencia no mira: <span className="font-bold">produce.</span>
          </p>

          {/* Botón */}
          <button 
            onClick={handleJoinClick}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-sans font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-[127%] rounded-[13px] transition-colors duration-200 px-4 py-2 sm:px-6 sm:py-3"
          >
            Sumarme ahora por USD 18
          </button>

          {/* Texto final */}
          <p className="text-white font-sans text-sm sm:text-base md:text-lg lg:text-2xl font-normal leading-[109%] text-center px-4">
            Aporte único. Cupos limitados. Comunidad adentro.
          </p>
        </div>
      </div>
    </section>
  )
}

