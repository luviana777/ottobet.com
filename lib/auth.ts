"use client"

// Tipos para autenticação
export interface User {
  id: number
  name: string
  email: string
  balance?: number
  status?: string
  kyc_verified?: boolean
}

export interface Admin {
  id: number
  email: string
  role: string
  permissions?: any
}

// Funções para gerenciar autenticação no localStorage
export const auth = {
  // Salvar sessão do usuário
  setUser: (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("otto_bet_user", JSON.stringify(user))
      localStorage.setItem("otto_bet_user_type", "user")
      localStorage.setItem("otto_bet_auth_time", Date.now().toString())

      // Manter compatibilidade com código antigo
      localStorage.setItem("userType", "user")
      localStorage.setItem("userEmail", user.email)
      localStorage.setItem("userName", user.name)
    }
  },

  // Salvar sessão do admin
  setAdmin: (admin: Admin) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("otto_bet_admin", JSON.stringify(admin))
      localStorage.setItem("otto_bet_user_type", "admin")
      localStorage.setItem("otto_bet_auth_time", Date.now().toString())

      // Manter compatibilidade com código antigo
      localStorage.setItem("userType", "admin")
      localStorage.setItem("userEmail", admin.email)
    }
  },

  // Obter usuário atual
  getUser: (): User | null => {
    if (typeof window === "undefined") return null
    try {
      const userData = localStorage.getItem("otto_bet_user")
      const userType = localStorage.getItem("otto_bet_user_type")
      if (userData && userType === "user") {
        return JSON.parse(userData)
      }
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error)
    }
    return null
  },

  // Obter admin atual
  getAdmin: (): Admin | null => {
    if (typeof window === "undefined") return null
    try {
      const adminData = localStorage.getItem("otto_bet_admin")
      const userType = localStorage.getItem("otto_bet_user_type")
      if (adminData && userType === "admin") {
        return JSON.parse(adminData)
      }
    } catch (error) {
      console.error("Erro ao recuperar dados do admin:", error)
    }
    return null
  },

  // Verificar se está logado
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false
    const userType = localStorage.getItem("otto_bet_user_type")
    const authTime = localStorage.getItem("otto_bet_auth_time")

    if (!userType || !authTime) return false

    // Verificar se a sessão não expirou (24 horas)
    const sessionDuration = 24 * 60 * 60 * 1000 // 24 horas em ms
    const isExpired = Date.now() - Number.parseInt(authTime) > sessionDuration

    if (isExpired) {
      auth.logout()
      return false
    }

    return (userType === "user" && auth.getUser() !== null) || (userType === "admin" && auth.getAdmin() !== null)
  },

  // Verificar se é admin
  isAdmin: (): boolean => {
    if (typeof window === "undefined") return false
    const userType = localStorage.getItem("otto_bet_user_type")
    const admin = auth.getAdmin()
    return userType === "admin" && admin !== null
  },

  // Verificar se é usuário
  isUser: (): boolean => {
    if (typeof window === "undefined") return false
    const userType = localStorage.getItem("otto_bet_user_type")
    const user = auth.getUser()
    return userType === "user" && user !== null
  },

  // Fazer logout
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("otto_bet_user")
      localStorage.removeItem("otto_bet_admin")
      localStorage.removeItem("otto_bet_user_type")
      localStorage.removeItem("otto_bet_auth_time")
      // Remover dados antigos se existirem
      localStorage.removeItem("userType")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("userName")
    }
  },

  // Atualizar dados do usuário
  updateUser: (userData: Partial<User>) => {
    const currentUser = auth.getUser()
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData }
      auth.setUser(updatedUser)
    }
  },

  // Renovar sessão
  renewSession: () => {
    if (typeof window !== "undefined" && auth.isAuthenticated()) {
      localStorage.setItem("otto_bet_auth_time", Date.now().toString())
    }
  },
}
