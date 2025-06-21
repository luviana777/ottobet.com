import { changeUserPassword } from "@/lib/auth-database"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, currentPassword, newPassword } = body

    // Validações básicas
    if (!userId || !currentPassword || !newPassword) {
      return Response.json({ success: false, message: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return Response.json(
        { success: false, message: "A nova senha deve ter pelo menos 8 caracteres" },
        { status: 400 },
      )
    }

    const result = await changeUserPassword(userId, currentPassword, newPassword)

    if (result.success) {
      return Response.json(result)
    } else {
      return Response.json(result, { status: 400 })
    }
  } catch (error) {
    console.error("Erro na API de alteração de senha:", error)
    return Response.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
