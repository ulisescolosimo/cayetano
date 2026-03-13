'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { MercadoPagoIcon } from '@/components/icons/MercadoPagoIcon'
import { Paypal } from '@/components/ui/svgs/paypal'

type PaymentProvider = 'mercadopago' | 'paypal'

export default function JoinSection() {
  const [email, setEmail] = useState('')
  const [provider, setProvider] = useState<PaymentProvider>('mercadopago')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (provider === 'paypal') {
        const res = await fetch('/api/checkout/create-paypal-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data?.error || 'Error al iniciar el pago')
          return
        }
        if (data.approval_url) {
          window.location.href = data.approval_url
          return
        }
        setError('No se recibió la URL de pago')
        return
      }

      const res = await fetch('/api/checkout/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || 'Error al iniciar el pago')
        return
      }

      if (data.init_point) {
        window.location.href = data.init_point
        return
      }
      setError('No se recibió la URL de pago')
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={ref}
      id="sumate"
      className="relative w-full min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center lg:block"
      style={{
        backgroundImage: 'url(/images/759850a5204f8d36d69d72ddca160500cbfaa80c.png)',
      }}
    >
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative z-10 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 w-full">
        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 text-center px-2"
          >
            <h2 className="font-display text-[20px] sm:text-[28px] md:text-[36px] lg:text-[44px] xl:text-[52px] font-normal flex flex-row items-center justify-center gap-2 sm:gap-2 md:gap-3 lg:gap-4" style={{ color: '#3F3F3F' }}>
              <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
                <Image src="/images/⚽.png" alt="Pelota" width={32} height={32} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                <svg width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
                  <rect width="24" height="8" fill="#74ACDF" />
                  <rect y="8" width="24" height="8" fill="#FFFFFF" />
                  <rect y="16" width="24" height="8" fill="#74ACDF" />
                  <circle cx="12" cy="12" r="3" fill="#F6B40E" />
                </svg>
              </div>
              <span>Hacé historia con nosotros</span>
              <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
                <Image src="/images/⚽.png" alt="Pelota" width={32} height={32} className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                <svg width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
                  <rect width="24" height="8" fill="#74ACDF" />
                  <rect y="8" width="24" height="8" fill="#FFFFFF" />
                  <rect y="16" width="24" height="8" fill="#74ACDF" />
                  <circle cx="12" cy="12" r="3" fill="#F6B40E" />
                </svg>
              </div>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto px-2 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10"
              style={{ backgroundColor: 'rgba(80, 80, 80, 0.95)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col"
                >
                  <div className="mb-1 sm:mb-1.5 md:mb-2 flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Image src="/images/⚽.png" alt="Pelota" width={24} height={24} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="font-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold" style={{ lineHeight: '80%', color: '#96CAFF' }}>
                      Sumate hoy.
                    </h3>
                  </div>
                  <h4 className="font-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-white" style={{ lineHeight: '106%' }}>
                    Producí la previa.
                  </h4>
                  <p className="font-sans text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-normal text-white max-w-full lg:max-w-md" style={{ lineHeight: '144%' }}>
                    Tu aporte de USD 18 sostiene la producción del ciclo (logística, operación, contenido y dinámica participativa) y hace posible que la comunidad sea parte real de lo que pasa. <span className="font-bold">Acá no estás "colaborando": estás produciendo.</span>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col"
                >
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[8px] font-sans text-[12px] sm:text-[13px] md:text-[14px]">
                        {error}
                      </div>
                    )}

                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError(null)
                      }}
                      placeholder="Correo para tu cuenta / registro"
                      className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-[8px] sm:rounded-[10px] font-sans text-[14px] sm:text-[15px] md:text-[16px] text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#318CE7]"
                      required
                      autoComplete="email"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setProvider('mercadopago')}
                        className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-[8px] sm:rounded-[10px] font-sans font-medium text-[12px] sm:text-[13px] md:text-[14px] border-2 transition-colors ${
                          provider === 'mercadopago'
                            ? 'border-[#318CE7] bg-[#318CE7]/20 text-white'
                            : 'border-white/30 text-white/80 hover:border-white/50'
                        }`}
                      >
                        <MercadoPagoIcon className="h-5 sm:h-6 w-auto shrink-0" aria-hidden />
                        Mercado Pago
                      </button>
                      <button
                        type="button"
                        onClick={() => setProvider('paypal')}
                        className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-[8px] sm:rounded-[10px] font-sans font-medium text-[12px] sm:text-[13px] md:text-[14px] border-2 transition-colors ${
                          provider === 'paypal'
                            ? 'border-[#008CFF] bg-[#008CFF]/20 text-white'
                            : 'border-white/30 text-white/80 hover:border-white/50'
                        }`}
                      >
                        <Paypal className="h-5 sm:h-6 w-6 shrink-0" aria-hidden />
                        PayPal
                      </button>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full rounded-[8px] sm:rounded-[10px] md:rounded-[12px] px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-white font-sans font-bold text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] flex flex-row items-center justify-center gap-2"
                      style={{
                        backgroundColor: provider === 'paypal' ? '#008CFF' : '#318CE7',
                        lineHeight: '127%',
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        provider === 'paypal'
                          ? 'Redirigiendo a PayPal...'
                          : 'Redirigiendo a MercadoPago...'
                      ) : (
                        <>
                          <span>Ir a pagar USD 18</span>
                          {provider === 'paypal' ? (
                            <Paypal className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 shrink-0" aria-hidden />
                          ) : (
                            <MercadoPagoIcon className="h-6 sm:h-7 md:h-8 w-auto shrink-0" aria-hidden />
                          )}
                        </>
                      )}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  )
}
