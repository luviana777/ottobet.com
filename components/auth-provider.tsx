"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { auth, type User, type Admin } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  admin: Admin | null
  isAuthenticated: boolean
  isAdmin: boolean
  isUser: boolean
  login: (userData: User | Admin, type: "user" | "admin") => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticação ao carregar
    const checkAuth = () => {
      try {
        if (auth.isAuthenticated()) {
          const userData = auth.getUser()
          const adminData = auth.getAdmin()

          if (userData) {
            setUser(userData)
            setAdmin(null)
          } else if (adminData) {
            setAdmin(adminData)
            setUser(null)
          }
        } else {
          setUser(null)
          setAdmin(null)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        setUser(null)
        setAdmin(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Verificar periodicamente se a sessão ainda é válida
    const interval = setInterval(() => {
      if (!auth.isAuthenticated()) {
        setUser(null)
        setAdmin(null)
      } else {
        // Renovar sessão se ainda estiver ativa
        auth.renewSession()
      }
    }, 60000) // Verificar a cada minuto

    return () => clearInterval(interval)
  }, [])

  const login = (userData: User | Admin, type: "user" | "admin") => {
    if (type === "user") {
      auth.setUser(userData as User)
      setUser(userData as User)
      setAdmin(null)
    } else {
      auth.setAdmin(userData as Admin)
      setAdmin(userData as Admin)
      setUser(null)
    }
  }

  const logout = () => {
    auth.logout()
    setUser(null)
    setAdmin(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      auth.updateUser(userData)
    }
  }

  const value: AuthContextType = {
    user,
    admin,
    isAuthenticated: auth.isAuthenticated(),
    isAdmin: auth.isAdmin(),
    isUser: auth.isUser(),
    login,
    logout,
    updateUser,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
