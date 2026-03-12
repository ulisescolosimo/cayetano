import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi perfil',
  description: 'Editá tu perfil de Proyecto 18.',
  robots: { index: false, follow: false },
}

export default function PerfilLayout({ children }: { children: React.ReactNode }) {
  return children
}
