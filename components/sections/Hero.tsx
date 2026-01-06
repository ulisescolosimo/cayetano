import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] w-full">
        {/* Columna derecha - Imagen (arriba en mobile/tablet) */}
        <div className="hidden lg:block relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-screen lg:min-h-screen order-1 lg:order-2">
          <Image
            src="/images/cayetano.jpg"
            alt="Cayetano"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Columna izquierda - Texto */}
        <div className="relative space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12 lg:py-0 flex items-center order-2 lg:order-1">
          <div className="w-full max-w-7xl mx-auto">
            {/* Header con PROYECTO 18 y PRODUCIDO POR Orsai */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-0 mb-4 sm:mb-0">
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
            </div>
            
            {/* Título principal */}
            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 lg:pt-8 lg:pt-12">
              <h1 className="leading-none">
                <span className="text-gray-800 font-sans font-bold text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] block">Rumbo al</span>
                <span className="text-brand font-display font-normal text-[52px] sm:text-[72px] md:text-[96px] lg:text-[120px] block -mt-1 sm:-mt-2">Mundial</span>
              </h1>
              
              <p className="text-base sm:text-xl md:text-2xl lg:text-[28px] font-sans font-normal leading-[127%] tracking-normal text-gray-700 max-w-xl">
                La manija es total. Poniendo 18 dólares podes ser parte de las entrevistas que van a calentar la previa del mundial de fútbol 2026.
              </p>
            </div>
            
            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 mb-4 sm:mb-6">
              <Button 
                variant="primary" 
                size="lg" 
                className="!px-5 !py-2.5 !rounded-[13px] !font-sans !font-bold !text-base sm:!text-lg lg:!text-xl !leading-[127%] !tracking-normal w-full sm:w-auto"
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
            </div>
            
            {/* Footer con fotos y créditos */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

