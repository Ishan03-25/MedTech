"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, Globe, PanelLeft } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { useSidebar } from "./sidebar-context"
import { signOut } from "next-auth/react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toggleSidebar } = useSidebar()
  const router = useRouter()
  const { data: session } = useSession()
  const displayName = session?.user?.name || session?.user?.email || "User"
  const initials = (() => {
    const name = (session?.user?.name || "").trim()
    if (!name) {
      const email = session?.user?.email || ""
      const base = email.split("@")[0] || "U"
      return base.slice(0, 2).toUpperCase()
    }
    const parts = name.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return parts[0].slice(0, 2).toUpperCase()
  })()

  const isLoginPage = pathname === "/"

  const handleLogout = async () => {
    try {
      const res = await signOut({ redirect: false, callbackUrl: "/" })
      toast.success("Logged out successfully")
      router.push(res?.url ?? "/")
    } catch (e) {
      toast.error("Failed to logout. Please try again.")
    }
  }

  if (isLoginPage) {
    return null
  }

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Sidebar Toggle and MedTech Heading */}
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Toggle Sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </Button>
            
            {/* MedTech Heading */}
            <Link href="/dashboard" className="flex items-center gap-3 flex-shrink-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <span className="font-bold text-xl text-slate-900 dark:text-slate-100">MedTech</span>
                <span className="hidden sm:inline-block ml-2 text-sm text-slate-500 dark:text-slate-400">Healthcare Solutions</span>
              </div>
            </Link>
          </div>

          {/* Right Section - User Profile and Logout */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Selector removed from navbar - moved to screening header */}

            {/* User Profile and Logout */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold text-sm">
                  {initials}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{displayName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
                </div>
              </div>
              
              {/* Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <div className="px-4 py-4 space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-semibold">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{displayName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
                </div>
              </div>
              
              {/* Theme and Language */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-slate-200 dark:border-slate-600"
                >
                  <Globe size={16} />
                  <span className="text-slate-700 dark:text-slate-300">English</span>
                </Button>
              </div>
              
              {/* Logout */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
