import { authenticateUser, authenticateAdmin } from "@/lib/auth-database"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("Tentativa de login:", { email, password: "***" })

    // Validações básicas
    if (!email || !password) {
      return Response.json({ success: false, message: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Verificar se é admin primeiro (email específico)
    if (email === "groupcephas@gmail.com") {
      console.log("Tentando login como admin...")

      const adminResult = await authenticateAdmin({ email, password })
      console.log("Resultado auth admin:", adminResult.success ? "Sucesso" : adminResult.message)

      if (adminResult.success) {
        return Response.json({
          success: true,
          message: adminResult.message,
          user: adminResult.admin,
          userType: "admin",
        })
      } else {
        console.log("Falha na autenticação admin:", adminResult.message)
        return Response.json({ success: false, message: "Credenciais de administrador inválidas" }, { status: 401 })
      }
    }

    // Tentar autenticação como usuário normal
    console.log("Tentando login como usuário...")
    const userResult = await authenticateUser({ email, password })
    console.log("Resultado auth user:", userResult.success ? "Sucesso" : userResult.message)

    if (userResult.success) {
      return Response.json({
        success: true,
        message: userResult.message,
        user: userResult.user,
        userType: "user",
      })
    } else {
      return Response.json(userResult, { status: 401 })
    }
  } catch (error) {
    console.error("Erro na API de login:", error)
    return Response.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
