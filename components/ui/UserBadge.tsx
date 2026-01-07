'use client'

import { useAuth } from '@/context/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UserBadge() {
  const { user, signOut, loading } = useAuth()
  const { profile } = useProfile(user)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  if (loading) {
    return null
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
      // El AuthContext ya maneja la redirección al home
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      setIsSigningOut(false)
    }
  }

  const userEmail = user.email || 'Usuario'
  
  // Obtener iniciales del nombre completo o del email
  const getInitials = () => {
    if (profile?.nombre && profile?.apellido) {
      return (profile.nombre[0] + profile.apellido[0]).toUpperCase()
    }
    return userEmail
      .split('@')[0]
      .split('.')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  const initials = getInitials()
  const displayName = profile?.nombre && profile?.apellido
    ? `${profile.nombre} ${profile.apellido}`
    : userEmail.split('@')[0]

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-sm border-2 border-brand rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-white group"
          aria-label="Menú de usuario"
        >
          <span className="text-sm font-medium text-gray-700 group-hover:text-brand transition-colors">
            {displayName}
          </span>
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {userEmail}
                </p>
              </div>
              <button
                onClick={() => {
                  router.push('/perfil')
                  setIsOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Mi Perfil
              </button>
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {isSigningOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}



