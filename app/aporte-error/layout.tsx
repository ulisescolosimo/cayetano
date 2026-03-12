import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error en el aporte',
  description: 'Hubo un problema con tu aporte a Proyecto 18. Podés intentar nuevamente desde la página principal.',
  robots: { index: false, follow: false },
}

export default function AporteErrorLayout({ children }: { children: React.ReactNode }) {
  return children
}
