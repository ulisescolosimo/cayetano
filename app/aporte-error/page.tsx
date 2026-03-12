'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AporteErrorPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-white overflow-hidden py-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 right-20 w-32 h-32 sm:w-40 sm:h-40 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-28 h-28 sm:w-36 sm:h-36 bg-red-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4 text-center"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-[20px] p-6 sm:p-8 shadow-xl border border-gray-100">
          <div className="flex justify-center mb-4">
            <Image src="/images/⚽.png" alt="Pelota" width={48} height={48} className="w-12 h-12 object-contain" />
          </div>
          <h1 className="font-display text-[28px] sm:text-[32px] font-normal text-gray-800 mb-2">
            El pago no pudo completarse
          </h1>
          <p className="font-sans text-sm text-gray-600 mb-6">
            No te preocupes, no se realizó ningún cargo. Podés reintentar el pago o crear una cuenta para más tarde.
          </p>

          <div className="space-y-3">
            <Link
              href="/#sumate"
              className="block w-full rounded-[13px] px-4 py-2.5 text-white font-sans font-bold text-sm text-center transition-colors"
              style={{ backgroundColor: '#318CE7', lineHeight: '127%' }}
            >
              Reintentar pago
            </Link>
            <Link
              href="/register"
              className="block w-full rounded-[13px] px-4 py-2.5 font-sans font-bold text-sm text-center border-2 border-[#318CE7] text-[#318CE7] hover:bg-[#318CE7] hover:text-white transition-colors"
            >
              Crear cuenta
            </Link>
            <p className="font-sans text-xs text-gray-500 mt-2">
              Si ya realizaste el pago, podés crear tu cuenta desde{' '}
              <Link href="/login" className="text-[#318CE7] font-medium hover:underline">
                Iniciar sesión
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="font-sans text-xs text-gray-500 hover:text-gray-700 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
