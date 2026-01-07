'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

export default function Project18Section() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section 
      ref={ref}
      id="proyecto" 
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center lg:block"
    >
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/entrevistas.png)',
        }}
      >
        {/* Overlay para oscurecer ligeramente el fondo */}
        <div className="absolute inset-0 bg-white/50" />
      </div>

      {/* Contenedor principal con overlay gris semi-transparente */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center lg:flex-row lg:items-center py-8 md:py-12 lg:py-0 w-full">
        <Container className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Caja gris con texto - ocupa la mitad izquierda */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-4 sm:p-6 md:p-8 lg:p-6 lg:py-10 flex flex-col rounded-[16px]"
              style={{ backgroundColor: 'rgba(230, 230, 230)' }}
            >
            {/* Título principal */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <h2 className="font-display text-[18px] sm:text-[22px] md:text-[24px] lg:text-[28px] font-normal leading-[109%]" style={{ color: '#3F3F3F' }}>
                18 entrevistas. 18 semanas. <span className="text-brand italic">1 pasión.</span> Producido por los <span className="text-brand italic">hinchas, para el mundo</span>
              </h2>
            </div>

            {/* Párrafos */}
            <div className="space-y-3 sm:space-y-4 font-sans text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-normal leading-[109%] text-black">
              <p>
                El Mundial 2026 no es "un Mundial más". Es el que se vive distinto: tres países, estadios enormes, una previa larguísima y una conversación que ya empezó aunque falte tiempo.
              </p>
              <p>
                Proyecto 18 es la manera más linda (y más nuestra) de vivir la previa: no consumiendo contenido… sino <span className="font-bold">siendo creador del contenido.</span>
              </p>
              <p>
                Porque cuando la comunidad se organiza, pasa lo mejor: Aparecen las preguntas más ocurrentes, los invitados más interesantes y momentos memorables.
              </p>
            </div>
            </motion.div>

            {/* Espacio derecho - vacío para mostrar el fondo */}
            <div className="hidden lg:block relative" />
          </div>
        </Container>
      </div>

      {/* Manchas de pintura azul decorativas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute top-10 right-20 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-brand/40 rounded-full blur-3xl" />
        <div className="absolute top-32 right-32 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/30 rounded-full blur-2xl" />
        <div className="absolute top-16 right-48 w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-brand/35 rounded-full blur-xl" />
        <div className="absolute top-60 left-1/4 w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-brand/30 rounded-full blur-2xl" />
        <div className="absolute bottom-32 right-1/3 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-brand/35 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-brand/25 rounded-full blur-lg" />
      </div>
    </section>
  )
}

