import { getSystemStats } from "@/lib/database"

export async function GET() {
  try {
    const result = await getSystemStats()
    return Response.json(result)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Erro ao buscar estatísticas",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
