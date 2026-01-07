'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Footer from '@/components/sections/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <div className="min-h-screen relative flex items-center justify-center bg-white overflow-hidden py-8">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-10 right-20 w-32 h-32 sm:w-40 sm:h-40 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-28 h-28 sm:w-36 sm:h-36 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-brand/5 rounded-full blur-3xl" />
        </div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-2xl px-4 text-center"
        >
          {/* Pelota de fútbol animada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <Image
                src="/images/⚽.png"
                alt="Pelota de fútbol"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Número 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-8xl sm:text-9xl md:text-[12rem] font-normal text-brand mb-4 leading-none"
          >
            404
          </motion.h1>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-gray-800 mb-4"
          >
            Página no encontrada
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto"
          >
            Parece que esta página se fue de viaje. No te preocupes, todavía podemos llegar al Mundial 2026 juntos.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto rounded-[13px] px-6 py-3 text-white font-sans font-bold text-sm"
                style={{ backgroundColor: '#318CE7', lineHeight: '127%' }}
              >
                Volver al inicio
              </Button>
            </Link>
            
            <Link href="/#proyecto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-[13px] px-6 py-3 text-brand font-sans font-bold text-sm border-2 border-brand"
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
            className="mt-12 font-sans text-sm text-gray-500"
          >
            ¿Buscás algo específico?{' '}
            <Link href="/#sumate" className="text-brand hover:text-brand-dark font-semibold transition-colors">
              Sumate al proyecto
            </Link>
          </motion.p>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}

