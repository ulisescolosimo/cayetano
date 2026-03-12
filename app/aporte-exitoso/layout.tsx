import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aporte exitoso',
  description: 'Tu aporte a Proyecto 18 se realizó correctamente. Creá tu cuenta para acceder al área de miembros.',
  robots: { index: false, follow: false },
}

export default function AporteExitosoLayout({ children }: { children: React.ReactNode }) {
  return children
}
