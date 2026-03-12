import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Área de miembros',
  description: 'Área privada de miembros de Proyecto 18. Seguí tu aporte y la cuenta regresiva al Mundial 2026.',
  robots: { index: false, follow: false },
}

export default function MiembrosLayout({ children }: { children: React.ReactNode }) {
  return children
}
