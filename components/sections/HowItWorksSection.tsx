'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function HowItWorksSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { user, loading } = useAuth()
  const router = useRouter()

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleJoinClick = () => {
    if (!user && !loading) {
      router.push('/login')
    } else if (user) {
      // Aquí puedes agregar la lógica para cuando el usuario está logueado
      console.log('Usuario autenticado, proceder con el proceso')
    }
  }
  const steps = [
    {
      number: 1,
      title: 'Te sumás con USD18',
      description: 'Entrás como Socio Productor del ciclo'
    },
    {
      number: 2,
      title: '18 entrevistas en 18 semanas',
      description: 'Algunas grabadas en locaciones especiales y otras en vivo en Paseo la Plaza - Sala Casals'
    },
    {
      number: 3,
      title: 'Co-diseñas cada entrevista',
      description: 'Antes de cada fecha, participás con ideas, temas y preguntas. Se vota y se arma el guion con lo mejor.'
    },
    {
      number: 4,
      title: 'Lo que se consigue, se sortea',
      description: 'Premios, regalos de marcas aliadas: si entra al proyecto, vuelve a la gente.'
    },
    {
      number: 5,
      title: 'El gran premio final',
      description: 'El más afortunado de nosotros viaja a la primera ronda del mundial.'
    }
  ]

  const benefits = [
    {
      title: 'Ser co-productor',
      description: 'Tus preguntas pueden quedar en el guion y salir al aire.'
    },
    {
      title: 'Somos una comunidad',
      description: 'Los objetivos los cumplimos juntos.'
    },
    {
      title: 'Estamos asociados',
      description: 'Lo que se consigue se reparte. Sorteos en cada semana, en cada entrevista.'
    },
    {
      title: 'Momentos únicos',
      description: 'Cerca de los invitados que elijamos juntos.'
    },
    {
      title: 'Tu nombre en los créditos',
      description: 'Porque si sos productor, se nota. (Y sí: sos dueño de esto con Cayetano).'
    },
    {
      title: 'El sueño más grande',
      description: 'Participar por viaje al mundial 2026'
    }
  ]

  const faqs = [
    {
      question: '¿Puedo participar si no vivo en Buenos Aires?',
      answer: '¡Por supuesto! Proyecto 18 es para todos, sin importar dónde vivas. Puedes participar desde cualquier lugar del mundo. Las entrevistas se transmiten en vivo y puedes seguir todo el proceso de forma remota, participando en la creación de preguntas y sorteos desde donde estés.'
    },
    {
      question: '¿Cómo se eligen las preguntas de cada entrevista?',
      answer: 'Antes de cada entrevista, todos los socios-productores pueden enviar sus ideas, temas y preguntas. Luego, entre todos votamos y seleccionamos las mejores propuestas. Con eso se arma el guion final de cada entrevista, asegurando que las preguntas más interesantes y relevantes sean las que se hagan.'
    },
    {
      question: '¿El aporte es mensual o es un pago único?',
      answer: 'El aporte es un pago único de USD 18. No hay cuotas mensuales ni pagos recurrentes. Con ese único aporte te convertís en Socio Productor del ciclo completo de 18 entrevistas y participás en todos los sorteos durante las 18 semanas.'
    },
    {
      question: '¿Cómo es la dinámica de los sorteos?',
      answer: 'Los sorteos se realizan durante cada entrevista y también hay sorteos especiales a lo largo de las 18 semanas. Todo lo que se consiga del proyecto (premios, regalos de marcas aliadas, etc.) se sortea entre los socios-productores. La dinámica es transparente y todos tienen las mismas oportunidades de ganar.'
    },
    {
      question: '¿Cómo funciona el Gran Premio del viaje al Mundial 2026?',
      answer: 'El Gran Premio es el sorteo final del proyecto. Entre todos los socios-productores que hayan participado durante las 18 semanas, se sorteará el viaje a la primera ronda del Mundial 2026. El ganador será seleccionado de forma aleatoria y transparente entre todos los socios del proyecto.'
    }
  ]

  return (
    <section 
      className="relative w-full min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: 'url(/images/Group%2015.png)',
      }}
    >
      {/* Contenedor principal */}
      <div className="relative z-10 py-6 sm:py-8 md:py-12 lg:py-20 xl:py-40">
        <Container className="w-full">
          {/* Título de la sección */}
          <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10">
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px]" style={{ lineHeight: '78%' }}>
              <span className="font-sans font-semibold" style={{ color: '#318CE7' }}>Cómo</span> <br />
              <span className="font-display font-normal" style={{ color: '#318CE7' }}> funciona</span>
            </h2>
          </div>

          {/* Grid horizontal de tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-[12px] sm:rounded-[16px] flex flex-col"
                style={{ backgroundColor: 'rgba(230, 230, 230)' }}
              >
                {/* Número */}
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <span className="font-display text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold" style={{ color: '#318CE7' }}>
                    {step.number}
                  </span>
                </div>
                
                {/* Título */}
                <h3 className="font-sans text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-bold text-black mb-1.5 sm:mb-2 md:mb-3">
                  {step.title}
                </h3>
                
                {/* Descripción */}
                <p className="font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-normal text-black leading-[140%]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sección de Beneficios */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 lg:mb-20 xl:mt-40 xl:mb-40 flex justify-center">
            <div className="w-full max-w-4xl">
              {/* Título de la sección */}
              <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 text-center">
                <h2 className="text-center" style={{ lineHeight: '94%' }}>
                  <span className="font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px] font-normal" style={{ color: '#318CE7' }}>
                    Beneficios{' '}
                  </span>
                  <span className="font-sans text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px] font-semibold lowercase" style={{ lineHeight: '94%', color: '#318CE7' }}>
                    de ser <br/> socio-productor
                  </span>
                </h2>
              </div>

              {/* Grid de tarjetas de beneficios (2 filas x 3 columnas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-[12px] sm:rounded-[16px] flex flex-col"
                    style={{ backgroundColor: '#318CE7' }}
                  >
                    {/* Título */}
                    <h3 className="font-sans text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-bold text-white mb-1.5 sm:mb-2 md:mb-3">
                      {benefit.title}
                    </h3>
                    
                    {/* Descripción */}
                    <p className="font-sans text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-normal text-white leading-[140%]">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sección Regla simple */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-40 xl:mb-40 flex justify-center">
            <div className="w-full max-w-3xl text-center flex flex-col items-center gap-3 sm:gap-4">
              {/* Título */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <h2 className="font-sans text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-center" style={{ lineHeight: '94%', color: '#3F3F3F' }}>
                  Regla simple
                </h2>
              </div>

              {/* Mensaje principal */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <p className="font-display text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-normal text-center" style={{ color: '#318CE7', lineHeight: '94%' }}>
                  Lo que logra proyecto 18 es para proyecto 18.
                </p>
              </div>

              {/* Explicación */}
              <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <p className="font-sans text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[36px] font-normal text-center" style={{ lineHeight: '94%' }}>
                  No hay letra chica: lo que las marcas <br className="hidden sm:block" /> aporten, se sortea entre los socios.
                </p>
              </div>

              {/* Botón */}
              <div className="flex justify-center w-full px-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-[13px] px-3 sm:px-4 py-2 sm:py-2.5 text-white font-sans font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] w-full sm:w-auto"
                  style={{ backgroundColor: '#318CE7', lineHeight: '127%' }}
                  onClick={handleJoinClick}
                >
                  Sumarme ahora por USD 18
                </Button>
              </div>
            </div>
          </div>

          {/* Sección Preguntas frecuentes */}
          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 flex justify-center">
            <div className="w-full max-w-4xl">
              {/* Título de la sección */}
              <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 text-center">
                <h2 className="font-display text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] font-bold italic" style={{ color: '#3F3F3F' }}>
                  Preguntas frecuentes
                </h2>
              </div>

              {/* Lista de preguntas */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="paper-texture rounded-[12px] sm:rounded-[16px] relative overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-3 sm:p-4 md:p-5 lg:p-6 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                    >
                      <h3 className="font-sans text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-white text-left flex-1 relative z-10" style={{ lineHeight: '94%' }}>
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-300 flex-shrink-0 mt-1 sm:mt-0 ${openFaq === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: 'white' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-3 sm:px-4 md:px-5 lg:px-6 pb-3 sm:pb-4 md:pb-5 lg:pb-6 pt-0">
                        <p className="font-sans text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] font-normal text-white/90 relative z-10 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

