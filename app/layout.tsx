import type { Metadata } from 'next'
import { Knewave, Inter_Tight } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

const knewave = Knewave({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-knewave',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rumbo al Mundial',
  description: 'La previa la hacemos nosotros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${knewave.variable} ${interTight.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}



