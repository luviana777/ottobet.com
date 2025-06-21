import { registerUser } from "@/lib/auth-database"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password } = body

    console.log("Tentativa de registro:", { name, email, phone })

    // Validações básicas
    if (!name || !email || !password) {
      return Response.json({ success: false, message: "Nome, email e senha são obrigatórios" }, { status: 400 })
    }

    if (password.length < 8) {
      return Response.json({ success: false, message: "A senha deve ter pelo menos 8 caracteres" }, { status: 400 })
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, message: "Formato de email inválido" }, { status: 400 })
    }

    // Registrar usuário
    const result = await registerUser({ name, email, phone, password })

    console.log("Resultado do registro:", result.success ? "Sucesso" : result.message)

    if (result.success) {
      return Response.json(result, { status: 201 })
    } else {
      return Response.json(result, { status: 400 })
    }
  } catch (error) {
    console.error("Erro na API de registro:", error)
    return Response.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
