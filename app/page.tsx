import Hero from '@/components/sections/Hero'
import WorldCupSection from '@/components/sections/WorldCupSection'
import Project18Section from '@/components/sections/Project18Section'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import JoinSection from '@/components/sections/JoinSection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WorldCupSection />
      <Project18Section />
      <HowItWorksSection />
      <JoinSection />
      <Footer />
    </main>
  )
}


