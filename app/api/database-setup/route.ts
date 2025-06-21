import { ensureTablesExist } from "@/lib/database"

export async function GET() {
  try {
    const result = await ensureTablesExist()
    return Response.json(result)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Erro ao configurar banco de dados",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  return GET() // Mesmo comportamento para POST
}
