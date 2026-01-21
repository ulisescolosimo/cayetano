import type { Metadata } from 'next'
import { Shrikhand, Inter_Tight, Bebas_Neue, Montserrat, Oswald } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import UserBadge from '@/components/ui/UserBadge'
import Navigation from '@/components/ui/Navigation'

const shrikhand = Shrikhand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-shrikhand',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

// Alternativas de tipografía para títulos
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Proyecto 18 - Rumbo al mundial',
  description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol: 18 hinchas viajando al Mundial 2026.',
  keywords: ['Mundial 2026', 'Proyecto 18', 'fútbol', 'hinchas', 'viaje al mundial', 'Argentina'],
  authors: [{ name: 'Proyecto 18' }],
  openGraph: {
    title: 'Proyecto 18 - Rumbo al mundial',
    description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyecto 18 - Rumbo al mundial',
    description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol.',
  },
  icons: {
    icon: '/images/favicon p18.png',
    shortcut: '/images/favicon p18.png',
    apple: '/images/favicon p18.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${shrikhand.variable} ${interTight.variable} ${bebasNeue.variable} ${montserrat.variable} ${oswald.variable}`}>
      <body>
        <AuthProvider>
          <Navigation />
          <UserBadge />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}



