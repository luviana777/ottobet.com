"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Users,
  BarChart3,
  DollarSign,
  Shield,
  LogOut,
  Search,
  Filter,
  MoreHorizontal,
  Ban,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Gamepad2,
} from "lucide-react"

// Importar o hook de autenticação
import { useAuth } from "@/components/auth-provider"

export default function AdminPage() {
  const { admin, logout, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    console.log("Admin page - Estado auth:", { admin, isAdmin, loading })

    // Aguardar o loading terminar antes de fazer verificações
    if (!loading) {
      setIsInitialized(true)

      // Verificar se é admin apenas após o loading
      if (!isAdmin && !admin) {
        console.log("Não é admin, redirecionando para login...")
        router.push("/login")
        return
      }

      console.log("Admin autenticado:", admin)
    }
  }, [isAdmin, admin, loading, router])

  // Remover a verificação duplicada do localStorage que estava causando conflito
  // useEffect(() => {
  //   const userType = localStorage.getItem("userType")
  //   const userEmail = localStorage.getItem("userEmail")

  //   if (userType !== "admin" || userEmail !== "groupcephas@gmail.com") {
  //     router.push("/login")
  //     return
  //   }
  //   setAdminEmail(userEmail)
  // }, [router])

  const handleLogout = () => {
    console.log("Fazendo logout admin...")
    logout()
    router.push("/")
  }

  // Mostrar loading enquanto verifica autenticação
  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <div className="text-white text-xl">Carregando painel administrativo...</div>
        </div>
      </div>
    )
  }

  // Se não for admin, não renderizar nada (vai redirecionar)
  if (!isAdmin || !admin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl">Redirecionando...</div>
        </div>
      </div>
    )
  }

  // Mock data
  const stats = {
    totalUsers: 15847,
    activeUsers: 3421,
    totalRevenue: 2847593.5,
    totalBets: 89234,
    pendingWithdrawals: 47,
    suspiciousActivity: 12,
  }

  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      balance: 1250.5,
      status: "active",
      lastLogin: "2024-01-15 14:30",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@email.com",
      balance: 850.0,
      status: "suspended",
      lastLogin: "2024-01-14 09:15",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@email.com",
      balance: 2100.75,
      status: "active",
      lastLogin: "2024-01-15 16:45",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      email: "ana@email.com",
      balance: 450.25,
      status: "pending_kyc",
      lastLogin: "2024-01-13 11:20",
    },
  ]

  const games = [
    { id: 1, name: "Gates of Olympus", provider: "Pragmatic Play", rtp: 96.5, status: "active", players: 1247 },
    { id: 2, name: "Sweet Bonanza", provider: "Pragmatic Play", rtp: 96.48, status: "active", players: 892 },
    { id: 3, name: "Book of Dead", provider: "Play'n GO", rtp: 94.25, status: "maintenance", players: 0 },
    { id: 4, name: "Starburst", provider: "NetEnt", rtp: 96.09, status: "active", players: 634 },
  ]

  const transactions = [
    { id: 1, user: "João Silva", type: "withdrawal", amount: 500, status: "pending", date: "2024-01-15 15:30" },
    { id: 2, user: "Maria Santos", type: "deposit", amount: 200, status: "completed", date: "2024-01-15 14:15" },
    { id: 3, user: "Pedro Costa", type: "withdrawal", amount: 1000, status: "flagged", date: "2024-01-15 13:45" },
    { id: 4, user: "Ana Oliveira", type: "deposit", amount: 150, status: "completed", date: "2024-01-15 12:30" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-red-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-red-400" />
            <h1 className="text-2xl font-bold text-red-400">OTTO BET ADMIN</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Administrador</p>
              <p className="font-semibold">{admin?.email || "Admin"}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Usuários</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Usuários Ativos</p>
                  <p className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Receita Total</p>
                  <p className="text-2xl font-bold text-white">R$ {(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Apostas</p>
                  <p className="text-2xl font-bold text-white">{stats.totalBets.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Saques Pendentes</p>
                  <p className="text-2xl font-bold text-white">{stats.pendingWithdrawals}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Atividade Suspeita</p>
                  <p className="text-2xl font-bold text-white">{stats.suspiciousActivity}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="users" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Gestão de Usuários
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Gestão de Jogos
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Gestão Financeira
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Relatórios
            </TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Gestão de Usuários</CardTitle>
                    <CardDescription className="text-gray-400">
                      Gerencie contas de usuários, verificações KYC e suspensões
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Buscar usuário..." className="pl-10 bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-400">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">Último login: {user.lastLogin}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-white">R$ {user.balance.toFixed(2)}</p>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "suspended"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={
                              user.status === "active"
                                ? "bg-green-500 text-black"
                                : user.status === "suspended"
                                  ? "bg-red-500"
                                  : "bg-yellow-500 text-black"
                            }
                          >
                            {user.status === "active"
                              ? "Ativo"
                              : user.status === "suspended"
                                ? "Suspenso"
                                : "KYC Pendente"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {user.status === "active" ? (
                            <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                              <Ban className="h-4 w-4 mr-1" />
                              Suspender
                            </Button>
                          ) : user.status === "suspended" ? (
                            <Button size="sm" variant="outline" className="border-green-500 text-green-400">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Ativar
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                              <Shield className="h-4 w-4 mr-1" />
                              Verificar KYC
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Games Management */}
          <TabsContent value="games" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Gestão de Jogos</CardTitle>
                    <CardDescription className="text-gray-400">Controle jogos, RTP e provedores</CardDescription>
                  </div>
                  <Button className="bg-red-500 hover:bg-red-600 text-white">Adicionar Jogo</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {games.map((game) => (
                    <div key={game.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Gamepad2 className="h-8 w-8 text-purple-400" />
                        <div>
                          <p className="font-medium text-white">{game.name}</p>
                          <p className="text-sm text-gray-400">{game.provider}</p>
                          <p className="text-xs text-gray-500">RTP: {game.rtp}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-white">{game.players} jogadores</p>
                          <Badge
                            variant={game.status === "active" ? "default" : "secondary"}
                            className={
                              game.status === "active" ? "bg-green-500 text-black" : "bg-yellow-500 text-black"
                            }
                          >
                            {game.status === "active" ? "Ativo" : "Manutenção"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                            Editar RTP
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Management */}
          <TabsContent value="financial" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Gestão Financeira</CardTitle>
                <CardDescription className="text-gray-400">
                  Controle depósitos, saques e transações suspeitas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{transaction.user}</p>
                        <p className="text-sm text-gray-400">
                          {transaction.type === "deposit" ? "Depósito" : "Saque"} - {transaction.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-white">R$ {transaction.amount}</p>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : transaction.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              transaction.status === "completed"
                                ? "bg-green-500 text-black"
                                : transaction.status === "pending"
                                  ? "bg-yellow-500 text-black"
                                  : "bg-red-500"
                            }
                          >
                            {transaction.status === "completed"
                              ? "Concluído"
                              : transaction.status === "pending"
                                ? "Pendente"
                                : "Suspeito"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {transaction.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline" className="border-green-500 text-green-400">
                                Aprovar
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                                Rejeitar
                              </Button>
                            </>
                          )}
                          {transaction.status === "flagged" && (
                            <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-400">
                              Investigar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Relatório de Desempenho</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Receita Hoje:</span>
                      <span className="text-green-400 font-semibold">R$ 45.230,50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Apostas Hoje:</span>
                      <span className="text-white font-semibold">2.847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Novos Usuários:</span>
                      <span className="text-blue-400 font-semibold">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxa de Conversão:</span>
                      <span className="text-purple-400 font-semibold">12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Análise de Comportamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tempo Médio de Sessão:</span>
                      <span className="text-white font-semibold">47 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Jogo Mais Popular:</span>
                      <span className="text-green-400 font-semibold">Gates of Olympus</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Horário de Pico:</span>
                      <span className="text-white font-semibold">20:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Retenção 7 dias:</span>
                      <span className="text-blue-400 font-semibold">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Relatório de Lucro/Prejuízo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-400">Receita Bruta</p>
                    <p className="text-2xl font-bold text-green-400">R$ 2.8M</p>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-400">Pagamentos</p>
                    <p className="text-2xl font-bold text-red-400">R$ 1.9M</p>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-400">Lucro Líquido</p>
                    <p className="text-2xl font-bold text-green-400">R$ 900K</p>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-400">Margem</p>
                    <p className="text-2xl font-bold text-white">32%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
