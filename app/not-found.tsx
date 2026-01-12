'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 relative flex items-center justify-center bg-white overflow-hidden py-12 px-4">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-10 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-20 h-20 sm:w-28 sm:h-28 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-brand/5 rounded-full blur-3xl" />
        </div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-xl text-center"
        >
          {/* Pelota de fútbol animada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
            }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-4 sm:mb-6"
          >
            <motion.div 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/images/⚽.png"
                alt="Pelota de fútbol"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Número 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl font-normal text-brand mb-3 leading-none"
          >
            404
          </motion.h1>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-xl sm:text-2xl md:text-3xl font-normal text-gray-800 mb-3"
          >
            Página no encontrada
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-sm sm:text-base md:text-lg text-gray-600 mb-6 max-w-md mx-auto px-4"
          >
            Parece que esta página se fue de viaje. No te preocupes, todavía podemos llegar al Mundial 2026 juntos.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4"
          >
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto rounded-[13px] px-5 py-2.5 text-white font-sans font-bold text-sm hover:scale-105 transition-transform"
                style={{ backgroundColor: '#318CE7', lineHeight: '127%' }}
              >
                Volver al inicio
              </Button>
            </Link>
            
            <Link href="/#proyecto" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto rounded-[13px] px-5 py-2.5 text-brand font-sans font-bold text-sm border-2 border-brand hover:scale-105 transition-transform"
                style={{ lineHeight: '127%' }}
              >
                Conocer el proyecto
              </Button>
            </Link>
          </motion.div>

          {/* Mensaje adicional */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 sm:mt-8 font-sans text-xs sm:text-sm text-gray-500 px-4"
          >
            ¿Buscás algo específico?{' '}
            <Link 
              href="/#sumate" 
              className="text-brand hover:text-brand-dark font-semibold transition-colors underline-offset-2 hover:underline"
            >
              Sumate al proyecto
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </main>
  )
}




