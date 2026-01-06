'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase/client'
import { translateSupabaseError } from '@/lib/utils/supabaseErrors'

export default function JoinSection() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Limpiar error cuando el usuario empieza a escribir
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      router.push('/')
      router.refresh()
    } catch (error: any) {
      setError(translateSupabaseError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section 
      className="relative w-full min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/759850a5204f8d36d69d72ddca160500cbfaa80c.png)',
      }}
    >
      {/* Overlay blanco con 60% de opacity */}
      <div className="absolute inset-0 bg-white/70" />

      {/* Contenedor principal */}
      <div className="relative z-10 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20">
        <Container className="w-full">
          {/* Título con emojis */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 text-center px-2">
            <h2 className="font-display text-[20px] sm:text-[28px] md:text-[36px] lg:text-[44px] xl:text-[52px] font-normal flex flex-row items-center justify-center gap-2 sm:gap-2 md:gap-3 lg:gap-4" style={{ color: '#3F3F3F' }}>
              <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
                <Image 
                  src="/images/⚽.png" 
                  alt="Pelota" 
                  width={32} 
                  height={32} 
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                />
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                >
                  <rect width="24" height="8" fill="#74ACDF" />
                  <rect y="8" width="24" height="8" fill="#FFFFFF" />
                  <rect y="16" width="24" height="8" fill="#74ACDF" />
                  <circle cx="12" cy="12" r="3" fill="#F6B40E" />
                </svg>
              </div>
              <span>Hacé historia con nosotros</span>
              <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
                <Image 
                  src="/images/⚽.png" 
                  alt="Pelota" 
                  width={32} 
                  height={32} 
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                />
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                >
                  <rect width="24" height="8" fill="#74ACDF" />
                  <rect y="8" width="24" height="8" fill="#FFFFFF" />
                  <rect y="16" width="24" height="8" fill="#74ACDF" />
                  <circle cx="12" cy="12" r="3" fill="#F6B40E" />
                </svg>
              </div>
            </h2>
          </div>

          {/* Contenedor gris oscuro principal */}
          <div className="max-w-6xl mx-auto px-2 sm:px-0">
            <div 
              className="rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10"
              style={{ backgroundColor: 'rgba(80, 80, 80, 0.95)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                {/* Sección izquierda - Información */}
                <div className="flex flex-col">
                  {/* Subtítulo con icono */}
                  <div className="mb-1 sm:mb-1.5 md:mb-2 flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Image 
                        src="/images/⚽.png" 
                        alt="Pelota" 
                        width={24} 
                        height={24} 
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                      />
                    </div>
                    <h3 className="font-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold" style={{ lineHeight: '80%', color: '#96CAFF' }}>
                      Sumate hoy.
                    </h3>
                  </div>

                  {/* Título principal */}
                  <h4 className="font-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-white" style={{ lineHeight: '106%' }}>
                    Producí la previa.
                  </h4>

                  {/* Párrafo descriptivo */}
                  <p className="font-sans text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-normal text-white max-w-full lg:max-w-md" style={{ lineHeight: '144%' }}>
                    Tu aporte de USD 18 sostiene la producción del ciclo (logística, operación, contenido y dinámica participativa) y hace posible que la comunidad sea parte real de lo que pasa. <span className="font-bold">Acá no estás "colaborando": estás produciendo.</span>
                  </p>
                </div>

                {/* Sección derecha - Formulario */}
                <div className="flex flex-col">
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                    {/* Mensaje de error */}
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[8px] font-sans text-[12px] sm:text-[13px] md:text-[14px]">
                        {error}
                      </div>
                    )}

                    {/* Campo Correo electrónico */}
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Correo electrónico"
                      className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-[8px] sm:rounded-[10px] font-sans text-[14px] sm:text-[15px] md:text-[16px] text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#318CE7]"
                      required
                      autoComplete="email"
                    />

                    {/* Campo Contraseña */}
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Contraseña"
                      className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-[8px] sm:rounded-[10px] font-sans text-[14px] sm:text-[15px] md:text-[16px] text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#318CE7]"
                      required
                      autoComplete="new-password"
                    />

                    {/* Campo Confirmar contraseña */}
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirmar contraseña"
                      className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-[8px] sm:rounded-[10px] font-sans text-[14px] sm:text-[15px] md:text-[16px] text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#318CE7]"
                      required
                      autoComplete="new-password"
                    />

                    {/* Botón */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full rounded-[8px] sm:rounded-[10px] md:rounded-[12px] px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-white font-sans font-bold text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]"
                      style={{ backgroundColor: '#318CE7', lineHeight: '127%' }}
                      disabled={loading}
                    >
                      {loading ? 'Creando cuenta...' : 'Quiero ser socio productor'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Footer con texto */}
            <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-center px-2">
              <p className="font-sans text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-normal" style={{ color: '#3F3F3F' }}>
                Aporte único. Cupos limitados. Comunidad adentro.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

