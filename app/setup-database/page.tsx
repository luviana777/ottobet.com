"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Database, Loader2 } from "lucide-react"

export default function SetupDatabasePage() {
  const [setupStatus, setSetupStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const setupDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/database-setup")
      const data = await response.json()
      setSetupStatus(data)
    } catch (error) {
      setSetupStatus({
        success: false,
        message: "Erro ao conectar com a API",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎰 OTTO BET - Configuração do Banco</h1>
          <p className="text-gray-400">Configure automaticamente as tabelas do banco de dados</p>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6" />
              Configuração Automática
            </CardTitle>
            <CardDescription className="text-gray-400">
              Este processo criará automaticamente todas as tabelas necessárias no banco PostgreSQL
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <Loader2 className="animate-spin h-12 w-12 text-green-400 mx-auto mb-4" />
                <p className="text-gray-400">Configurando banco de dados...</p>
              </div>
            ) : setupStatus ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {setupStatus.success ? (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-400" />
                  )}
                  <div>
                    <p className={`font-semibold ${setupStatus.success ? "text-green-400" : "text-red-400"}`}>
                      {setupStatus.message}
                    </p>
                  </div>
                </div>

                {setupStatus.error && (
                  <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400 font-medium">Erro:</p>
                    <p className="text-red-300 text-sm">{setupStatus.error}</p>
                  </div>
                )}

                {setupStatus.success && (
                  <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                    <p className="text-green-400 font-medium">✅ Configuração Concluída!</p>
                    <ul className="text-green-300 text-sm mt-2 space-y-1">
                      <li>• Tabela de usuários criada</li>
                      <li>• Tabela de administradores criada</li>
                      <li>• Administrador padrão inserido</li>
                      <li>• Índices e triggers configurados</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Clique no botão abaixo para configurar o banco de dados</p>
              </div>
            )}

            <div className="mt-6 flex gap-4 justify-center">
              <Button onClick={setupDatabase} disabled={loading} className="bg-green-500 hover:bg-green-600 text-black">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Configurando...
                  </>
                ) : (
                  "Configurar Banco de Dados"
                )}
              </Button>

              {setupStatus?.success && (
                <Button asChild variant="outline" className="border-green-500 text-green-400">
                  <a href="/register">Ir para Registro</a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações sobre credenciais */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400">Credenciais Padrão</CardTitle>
            <CardDescription>Credenciais que serão criadas automaticamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-2">👑 Administrador</p>
                <p className="text-gray-300">Email: groupcephas@gmail.com</p>
                <p className="text-gray-300">Senha: 23131504sv</p>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4">
                <p className="text-purple-400 font-semibold mb-2">👤 Usuários</p>
                <p className="text-gray-300">Registre-se normalmente</p>
                <p className="text-gray-300">Senhas são criptografadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links de navegação */}
        <div className="mt-8 text-center space-x-4">
          <Button asChild variant="outline" className="border-green-500 text-green-400">
            <a href="/">Voltar ao Site</a>
          </Button>
          <Button asChild variant="outline" className="border-blue-500 text-blue-400">
            <a href="/test-connection">Testar Conexão</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
