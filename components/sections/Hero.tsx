'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleJoinClick = () => {
    if (!user && !loading) {
      router.push('/login')
    } else if (user) {
      // Aquí puedes agregar la lógica para cuando el usuario está logueado
      // Por ejemplo, redirigir a una página de pago o dashboard
      console.log('Usuario autenticado, proceder con el proceso')
    }
  }

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const, // easeOutCubic
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr] w-full max-w-[1380px] mx-auto">
        {/* Columna derecha - Imagen (arriba en mobile/tablet) */}
        <motion.div 
          className="hidden lg:block relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen lg:min-h-screen order-1 lg:order-2"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/images/cayetano-2026.png"
            alt="Cayetano"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Columna izquierda - Texto */}
        <motion.div 
          className="relative space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12 lg:py-0 flex items-center order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            {/* Header con PROYECTO 18 y PRODUCIDO POR Orsai */}
            <motion.div 
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-0 mb-4 sm:mb-0"
              variants={itemVariants}
            >
              <p className="text-xs sm:text-sm font-sans text-gray-800 font-medium uppercase tracking-wide">
                PROYECTO 18
              </p>
              
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm text-gray-600 font-sans uppercase tracking-wide">
                  PRODUCIDO POR
                </p>
                <div className="mt-1">
                  <Image 
                    src="/images/logo2.png" 
                    alt="Orsai" 
                    width={120} 
                    height={40}
                    className="h-auto w-20 sm:w-24 md:w-[120px]"
                    style={{ height: 'auto' }}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Título principal */}
            <motion.div 
              className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 lg:pt-8 lg:pt-12"
              variants={itemVariants}
            >
              <h1 className="leading-none">
                <span className="text-gray-800 font-sans font-bold text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] block">Rumbo al</span>
                <span className="text-brand font-display font-normal text-[52px] sm:text-[72px] md:text-[96px] lg:text-[120px] block -mt-1 sm:-mt-2">Mundial</span>
              </h1>
              
              <p className="text-base sm:text-xl md:text-2xl lg:text-[28px] font-sans font-normal leading-[127%] tracking-normal text-gray-700 max-w-xl">
                La manija es total. Poniendo 18 dólares podes ser parte de las entrevistas que van a calentar la previa del mundial de fútbol 2026.
              </p>
            </motion.div>
            
            {/* Botones */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="!px-5 !py-2.5 !rounded-[13px] !font-sans !font-bold !text-base sm:!text-lg lg:!text-xl !leading-[127%] !tracking-normal w-full sm:w-auto"
                onClick={handleJoinClick}
              >
                Quiero ser parte
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white !px-5 !py-2.5 !rounded-[13px] !font-sans !font-bold !text-base sm:!text-lg lg:!text-xl !leading-[127%] !tracking-normal w-full sm:w-auto"
              >
                Más información
              </Button>
            </motion.div>
            
            {/* Footer con fotos y créditos */}
            <motion.div 
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2 sm:pt-4"
              variants={itemVariants}
            >
              <div className="flex -space-x-2">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="/images/casciari.jpg"
                    alt="Hernán Casciari"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="/images/cayetano2.jpg"
                    alt="Cayetano"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-base sm:text-lg md:text-xl lg:text-[24px] font-sans leading-[140%] tracking-normal text-gray-600">
                <span className="font-light block">Una idea original de</span>
                <span className="font-semibold block -mt-1">Hernán Casciari y Cayetano</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

