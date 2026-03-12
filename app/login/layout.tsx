import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Iniciá sesión en Proyecto 18 para acceder al área de miembros y seguir tu aporte al viaje al Mundial 2026.',
  robots: { index: true, follow: true },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
