import type { Metadata } from 'next'
import { Shrikhand, Inter_Tight, Bebas_Neue, Montserrat, Oswald, Geist } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { CheckoutModalProvider } from '@/context/CheckoutModalContext'
import UserBadge from '@/components/ui/UserBadge'
import Navigation from '@/components/ui/Navigation'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://proyecto18.orsai.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Proyecto 18 - La previa de la copa',
    template: '%s | Proyecto 18',
  },
  description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol: 18 hinchas viajando al Mundial 2026.',
  keywords: ['Mundial 2026', 'Proyecto 18', 'fútbol', 'hinchas', 'viaje al mundial', 'Argentina', 'Copa América', 'hinchada'],
  authors: [{ name: 'Proyecto 18', url: siteUrl }],
  creator: 'Proyecto 18',
  publisher: 'Proyecto 18',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: 'Proyecto 18 - La previa de la copa',
    description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol: 18 hinchas viajando al Mundial 2026.',
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: 'Proyecto 18',
    images: [{ url: '/images/favicon p18.png', width: 512, height: 512, alt: 'Proyecto 18' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyecto 18 - La previa de la copa',
    description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/images/favicon p18.png',
    shortcut: '/images/favicon p18.png',
    apple: '/images/favicon p18.png',
  },
  alternates: { canonical: siteUrl },
  category: 'sports',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={cn(shrikhand.variable, interTight.variable, bebasNeue.variable, montserrat.variable, oswald.variable, "font-sans", geist.variable)}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:inset-auto focus:top-4 focus:left-4 focus:right-auto focus:bottom-auto focus:z-[100] focus:w-auto focus:h-auto focus:px-4 focus:py-2 focus:m-0 focus:overflow-visible focus:[clip:auto] focus:whitespace-normal focus:bg-brand focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand font-sans font-medium"
        >
          Saltar al contenido
        </a>
        <AuthProvider>
          <CheckoutModalProvider>
            <Navigation />
            <UserBadge />
            {children}
          </CheckoutModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



