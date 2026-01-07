'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  id: string
  icon: React.ReactNode
}

// Componentes de iconos
const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const ProjectIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)

const HowItWorksIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const JoinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
)

const navItems: NavItem[] = [
  { label: 'Inicio', href: '#hero', id: 'hero', icon: <HomeIcon /> },
  { label: 'El Proyecto', href: '#proyecto', id: 'proyecto', icon: <ProjectIcon /> },
  { label: 'Cómo Funciona', href: '#como-funciona', id: 'como-funciona', icon: <HowItWorksIcon /> },
  { label: 'Sumate', href: '#sumate', id: 'sumate', icon: <JoinIcon /> },
]

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isHovered, setIsHovered] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Detectar sección activa al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      const offset = 0
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    
    setIsMobileMenuOpen(false)
  }

  const handleJoinClick = () => {
    if (!user && !loading) {
      router.push('/login')
    } else if (user) {
      const element = document.getElementById('sumate')
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    setIsMobileMenuOpen(false)
  }

  // No mostrar en páginas de login/register
  if (pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <>
      {/* Desktop Sidebar - Lado derecho, sutil y fino */}
      <motion.nav
        initial={{ x: 100, y: '-50%' }}
        animate={{ x: 0, y: '-50%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden lg:flex fixed right-0 top-[50%] z-50"
      >
        <div className="relative flex items-center">
          {/* Contenedor principal */}
          <motion.div
            animate={{
              width: isHovered ? 200 : 60,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/80 backdrop-blur-sm shadow-lg rounded-l-2xl border-l border-t border-b border-gray-200/50 overflow-hidden"
          >
            <div className="flex flex-col items-center py-8">
              {/* Items de navegación */}
              <div className="flex flex-col gap-2 w-full px-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id
                  const isSumate = item.id === 'sumate'
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                        isSumate
                          ? 'bg-brand text-white shadow-md hover:bg-brand-dark'
                          : isActive
                          ? 'bg-brand/10 text-brand'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {/* Indicador activo - línea vertical */}
                      {isActive && !isSumate && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-r-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Icono - siempre visible */}
                      <motion.div
                        animate={{
                          scale: isHovered ? 0.9 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`flex-shrink-0 w-5 h-5 ${
                          isSumate ? 'text-white' : isActive ? 'text-brand' : 'text-gray-600'
                        }`}
                      >
                        {item.icon}
                      </motion.div>
                      
                      {/* Texto - solo visible cuando está desplegado */}
                      <motion.span
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          x: isHovered ? 0 : -10,
                          width: isHovered ? 'auto' : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`font-sans text-sm font-medium whitespace-nowrap overflow-hidden ${
                          isSumate ? 'text-white font-semibold' : ''
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile - Botón flotante */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-14 h-14 bg-brand text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-dark transition-colors"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile - Drawer lateral */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header del drawer */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-sans font-bold text-lg text-gray-800">Menú</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-600 hover:text-brand transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Items de navegación */}
                <div className="flex flex-col gap-2 flex-1">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id
                    const isSumate = item.id === 'sumate'
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left ${
                          isSumate
                            ? 'bg-brand text-white shadow-lg font-semibold'
                            : isActive
                            ? 'bg-brand/10 text-brand'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-5 h-5 ${
                          isSumate ? 'text-white' : isActive ? 'text-brand' : 'text-gray-600'
                        }`}>
                          {item.icon}
                        </div>
                        <span className={`font-sans font-medium text-base ${
                          isSumate ? 'text-white font-semibold' : ''
                        }`}>{item.label}</span>
                        {isActive && !isSumate && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="ml-auto w-2 h-2 bg-brand rounded-full"
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
