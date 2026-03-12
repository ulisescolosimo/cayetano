import Hero from '@/components/sections/Hero'
import WorldCupSection from '@/components/sections/WorldCupSection'
import Project18Section from '@/components/sections/Project18Section'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import JoinSection from '@/components/sections/JoinSection'
import Footer from '@/components/sections/Footer'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = {
  title: 'Inicio',
  description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol: 18 hinchas viajando al Mundial 2026.',
  openGraph: {
    title: 'Proyecto 18 - La previa de la copa',
    description: 'La previa la hacemos nosotros. Unite al proyecto más ambicioso del fútbol: 18 hinchas viajando al Mundial 2026.',
    url: '/',
  },
}

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      <JsonLd />
      <Hero />
      <WorldCupSection />
      <Project18Section />
      <HowItWorksSection />
      <JoinSection />
      <Footer />
    </main>
  )
}


