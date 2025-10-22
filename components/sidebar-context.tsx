"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface SidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  openSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(prev => !prev)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const openSidebar = () => {
    setIsOpen(true)
  }

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // On mobile, close sidebar when resizing to desktop
      if (window.innerWidth >= 1024) {
        // Keep current state on desktop
      } else {
        // On mobile, close sidebar when screen becomes smaller
        if (isOpen) {
          setIsOpen(false)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar, openSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
