import { testConnection } from "@/lib/database"

export async function GET() {
  try {
    const result = await testConnection()
    return Response.json(result)
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Erro interno do servidor",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
