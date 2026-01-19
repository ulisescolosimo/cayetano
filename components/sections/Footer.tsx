'use client'

import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-brand py-6 md:py-8 flex flex-col items-center justify-center md:justify-start lg:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Sección izquierda: PROYECTO 18 */}
          <div className="flex-shrink-0">
            <h3 className="font-sans font-bold text-[24px] uppercase text-white text-center leading-[109%] tracking-normal">
              PROYECTO 18
            </h3>
          </div>

          {/* Sección central: Rumbo al Mundial (imagen) */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/images/Vector.png"
              alt="Rumbo al Mundial"
              width={1200}
              height={300}
              className="h-auto w-auto max-w-[500px] md:max-w-[800px] lg:max-w-[1200px]"
              priority
            />
          </div>

          {/* Sección derecha: PRODUCIDO POR Orsai */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-center gap-0.5">
            <p className="font-sans font-light text-[14px] uppercase text-white leading-[105%] tracking-normal">
              PRODUCIDO POR
            </p>
            <div className="flex items-center">
              <Image
                src="/images/logo orsai.png"
                alt="Orsai"
                width={70}
                height={40}
                className="h-auto w-auto max-h-[35px] md:max-h-[45px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

