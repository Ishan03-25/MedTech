"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { toast } from "sonner"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const check = await fetch("/api/auth/check-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      })

      const payload = await check.json().catch(() => ({}))
      if (!check.ok || payload?.ok === false) {
        if (payload?.reason === "identifier") {
          setError("Incorrect username or email.")
          toast.error("Incorrect username or email")
        } else if (payload?.reason === "password") {
          setError("Incorrect password.")
          toast.error("Incorrect password")
        } else if (payload?.reason === "both") {
          setError("Username/email and password are required.")
          toast.error("Username/email and password are required")
        } else {
          setError("Unable to sign in. Please try again.")
          toast.error("Unable to sign in. Please try again.")
        }
        setIsLoading(false)
        return
      }

      const res = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
        callbackUrl: "/dashboard",
      })

      if (res?.error) {
        console.error("Signin error:", res.error)
        setError("Sign in failed. Please check your credentials.")
        toast.error("Sign in failed. Please check your credentials.")
      } else if (res?.ok) {
        // Prefer programmatic navigation to avoid full reload
        toast.success("Logged in successfully")
        router.push(res.url ?? "/dashboard")
        return
      }
    } catch (err) {
      console.error("Error in signin: ", err);
      setError("An unexpected error occurred. Please try again.")
      toast.error("An unexpected error occurred. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-500/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      </div>

      {/* Medical imagery background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/placeholder.svg?height=1080&width=1920&query=blood-cells-medical-microscopy)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Login card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl p-8 border border-white/20 dark:border-slate-700/20">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-slate-900 dark:text-slate-100">MedTech</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Healthcare Solutions</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Anemia Screening</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Enter your credentials to access the platform</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Username or email</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
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
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error ? (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              ) : null}

              {/* Login button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-white font-semibold mt-6"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              <p>© 2025 MedTech. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
