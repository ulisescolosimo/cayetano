'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import CheckoutModal from '@/components/CheckoutModal'

interface CheckoutModalContextType {
  openCheckoutModal: () => void
}

const CheckoutModalContext = createContext<CheckoutModalContextType | null>(null)

export function useCheckoutModal() {
  const context = useContext(CheckoutModalContext)
  if (!context) {
    throw new Error('useCheckoutModal must be used within CheckoutModalProvider')
  }
  return context
}

export function CheckoutModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openCheckoutModal = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])

  return (
    <CheckoutModalContext.Provider value={{ openCheckoutModal }}>
      {children}
      <CheckoutModal open={open} onClose={onClose} />
    </CheckoutModalContext.Provider>
  )
}
