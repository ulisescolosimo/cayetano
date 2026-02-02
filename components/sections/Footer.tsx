'use client'

import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-brand py-6 md:py-8 flex flex-col items-center justify-center md:justify-start lg:block">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Sección izquierda: PROYECTO 18 */}
          <div className="flex-shrink-0">
            <Image
              src="/images/descarga.png"
              alt="Proyecto 18"
              width={200}
              height={50}
              className="h-auto w-auto max-h-[32px] md:max-h-[50px]"
              priority
            />
          </div>

          {/* Sección central: Rumbo al Mundial (imagen) */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/images/rumb.png"
              alt="Rumbo al Mundial"
              width={1000}
              height={200}
              className="h-auto w-auto max-w-[120px] sm:max-w-[400px] md:max-w-[700px] lg:max-w-[1100px]"
              priority
            />
          </div>

          {/* Sección derecha: PRODUCIDO POR Orsai */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-center gap-0.5">
            <p className="font-sans font-light text-[11px] md:text-[14px] uppercase text-white leading-[105%] tracking-normal">
              PRODUCIDO POR
            </p>
            <div className="flex items-center">
              <Image
                src="/images/logo orsai.png"
                alt="Orsai"
                width={70}
                height={40}
                className="h-auto w-auto max-h-[24px] md:max-h-[45px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

