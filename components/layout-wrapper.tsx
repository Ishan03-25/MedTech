"use client"

import type React from "react"
import { usePathname } from "next/navigation"

import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { SidebarProvider, useSidebar } from "./sidebar-context"
import { SessionProvider } from "next-auth/react"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, closeSidebar } = useSidebar()
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} onClose={closeSidebar} />
        <main className="flex-1 transition-all duration-300 ease-in-out">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/"

  if (isLoginPage) {
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    )
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </SessionProvider>
  )
}
