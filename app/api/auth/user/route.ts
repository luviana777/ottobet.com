export const dynamic = 'force-dynamic';

import { getUserById } from "@/lib/auth-database"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
      return Response.json({ success: false, message: "ID do usuário é obrigatório" }, { status: 400 })
    }

    const result = await getUserById(Number.parseInt(userId))

    if (result.success) {
      return Response.json(result)
    } else {
      return Response.json(result, { status: 404 })
    }
  } catch (error) {
    console.error("Erro na API de usuário:", error)
    return Response.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
