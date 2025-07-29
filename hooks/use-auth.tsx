"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/schema"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth-token")
        if (token) {
          // In a real app, validate token with backend
          const mockUser: User = {
            id: "1",
            email: "user@example.com",
            name: "John Doe",
            role: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          setUser(mockUser)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock login - replace with real API call
      if (email && password) {
        const mockUser: User = {
          id: "1",
          email,
          name: "John Doe",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        setUser(mockUser)
        localStorage.setItem("auth-token", "mock-token")
      } else {
        throw new Error("Invalid credentials")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock register - replace with real API call
      if (name && email && password) {
        const mockUser: User = {
          id: "1",
          email,
          name,
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        setUser(mockUser)
        localStorage.setItem("auth-token", "mock-token")
      } else {
        throw new Error("Invalid data")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
