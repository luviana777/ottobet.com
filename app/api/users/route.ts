import { getAllUsers } from "@/lib/auth-database"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Em produção, você deve verificar se o usuário é admin
    const result = await getAllUsers()

    if (result.success) {
      return Response.json({ success: true, users: result.users })
    } else {
      return Response.json({ success: false, message: result.message }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return Response.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
