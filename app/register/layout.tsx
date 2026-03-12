import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crear cuenta',
  description: 'Creá tu cuenta en Proyecto 18 después de tu aporte. Completá tu perfil y sumate a los 18 hinchas que viajan al Mundial 2026.',
  robots: { index: true, follow: true },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children
}
