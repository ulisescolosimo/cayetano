import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aporte pendiente',
  description: 'Tu aporte a Proyecto 18 está pendiente de confirmación.',
  robots: { index: false, follow: false },
}

export default function AportePendienteLayout({ children }: { children: React.ReactNode }) {
  return children
}
