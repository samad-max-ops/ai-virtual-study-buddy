"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

export interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("study_buddy_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("study_buddy_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isLoading && !user) {
      const publicRoutes = ["/login", "/register"]
      if (!publicRoutes.includes(pathname)) {
        router.push("/login")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("study_buddy_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("study_buddy_user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
