"use client"

import { Globe, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1" />

        <div className="flex items-center gap-4">
          {/* Language selector removed from header - moved to screening header */}
          {/* User profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
              S
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">Sohom</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>

          {/* Logout button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (window.location.href = "/")}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </header>
  )
}
