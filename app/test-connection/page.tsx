"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Users, Gamepad2, CreditCard, AlertTriangle } from "lucide-react"

export default function TestConnectionPage() {
  const [connectionStatus, setConnectionStatus] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()
      setConnectionStatus(data)

      if (data.success) {
        // Buscar estatísticas do sistema
        const statsResponse = await fetch("/api/system-stats")
        const statsData = await statsResponse.json()
        setStats(statsData)
      }
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: "Erro ao conectar com a API",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎰 OTTO BET - Teste de Conexão</h1>
          <p className="text-gray-400">Verificando conexão com o banco de dados Neon PostgreSQL</p>
        </div>

        {/* Status da Conexão */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6" />
              Status da Conexão
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Testando conexão...</p>
              </div>
            ) : connectionStatus ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {connectionStatus.success ? (
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-400" />
                  )}
                  <div>
                    <p className={`font-semibold ${connectionStatus.success ? "text-green-400" : "text-red-400"}`}>
                      {connectionStatus.message}
                    </p>
                    {connectionStatus.data && (
                      <div className="text-sm text-gray-400 mt-2">
                        <p>Banco: {connectionStatus.data.database_name}</p>
                        <p>Horário: {new Date(connectionStatus.data.current_time).toLocaleString("pt-BR")}</p>
                      </div>
                    )}
                  </div>
                </div>

                {connectionStatus.error && (
                  <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400 font-medium">Erro:</p>
                    <p className="text-red-300 text-sm">{connectionStatus.error}</p>
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-6">
              <Button
                onClick={testConnection}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-black"
              >
                {loading ? "Testando..." : "Testar Novamente"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas do Sistema */}
        {stats?.success && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total de Usuários</p>
                    <p className="text-2xl font-bold text-white">{stats.data.total_users || 0}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <Badge variant="secondary" className="mt-2">
                  {stats.data.active_users || 0} ativos
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Jogos Ativos</p>
                    <p className="text-2xl font-bold text-white">{stats.data.active_games || 0}</p>
                  </div>
                  <Gamepad2 className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Depósitos</p>
                    <p className="text-2xl font-bold text-white">
                      R${" "}
                      {Number.parseFloat(stats.data.total_deposits || 0).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Investigações</p>
                    <p className="text-2xl font-bold text-white">{stats.data.open_investigations || 0}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                </div>
                <Badge variant="secondary" className="mt-2">
                  {stats.data.pending_transactions || 0} pendentes
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Informações da Conexão */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400">Informações da Conexão Neon</CardTitle>
            <CardDescription>Detalhes do banco de dados PostgreSQL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Host:</p>
                <p className="text-white font-mono">ep-still-sun-a88abq5d-pooler.eastus2.azure.neon.tech</p>
              </div>
              <div>
                <p className="text-gray-400">Banco:</p>
                <p className="text-white font-mono">neondb</p>
              </div>
              <div>
                <p className="text-gray-400">Usuário:</p>
                <p className="text-white font-mono">neondb_owner</p>
              </div>
              <div>
                <p className="text-gray-400">SSL:</p>
                <p className="text-green-400 font-mono">Habilitado (require)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links de Navegação */}
        <div className="mt-8 text-center space-x-4">
          <Button asChild variant="outline" className="border-green-500 text-green-400">
            <a href="/">Voltar ao Site</a>
          </Button>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white">
            <a href="/admin">Painel Admin</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
