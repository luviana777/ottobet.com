"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  User,
  Wallet,
  History,
  Settings,
  LogOut,
  TrendingUp,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Gift,
  Star,
  Trophy,
  Target,
  Zap,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth()
  const [balance, setBalance] = useState(0)
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login")
      return
    }
    setBalance(user.balance || 0)
  }, [isAuthenticated, user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const transactions = [
    { id: 1, type: "deposit", amount: 500, date: "2024-01-15", status: "completed", method: "PIX" },
    { id: 2, type: "bet", amount: -50, date: "2024-01-15", status: "completed", game: "Gates of Olympus" },
    { id: 3, type: "win", amount: 150, date: "2024-01-14", status: "completed", game: "Gates of Olympus" },
    { id: 4, type: "withdrawal", amount: -200, date: "2024-01-14", status: "pending", method: "PIX" },
    { id: 5, type: "bonus", amount: 100, date: "2024-01-13", status: "completed", description: "Bônus de boas-vindas" },
  ]

  const recentGames = [
    { name: "Gates of Olympus", result: "win", amount: 150, time: "14:30", multiplier: "3.0x" },
    { name: "Sweet Bonanza", result: "loss", amount: -50, time: "14:15", multiplier: "0x" },
    { name: "Book of Dead", result: "win", amount: 75, time: "13:45", multiplier: "2.5x" },
    { name: "Starburst", result: "loss", amount: -25, time: "13:30", multiplier: "0x" },
    { name: "Aviator", result: "win", amount: 200, time: "13:15", multiplier: "4.2x" },
  ]

  const bonuses = [
    {
      name: "Bônus de Boas-vindas",
      amount: 500,
      wagering: 17500,
      wagered: 5000,
      expires: "2024-02-15",
      status: "active",
    },
    {
      name: "Cashback Semanal",
      amount: 75,
      wagering: 75,
      wagered: 75,
      expires: "2024-01-22",
      status: "completed",
    },
  ]

  const achievements = [
    { name: "Primeiro Depósito", icon: Star, completed: true },
    { name: "High Roller", icon: Trophy, completed: false },
    { name: "Lucky Streak", icon: Target, completed: true },
    { name: "VIP Player", icon: Crown, completed: false },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-green-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-green-400" />
            <h1 className="text-2xl font-bold text-green-400">OTTO BET</h1>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Bem-vindo,</p>
              <p className="font-semibold">{user?.name || "Usuário"}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0 text-white mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Wallet className="h-5 w-5 mr-2" />
                    Saldo
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/20"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">
                  {showBalance ? `R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "R$ ••••••"}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-white text-green-600 hover:bg-gray-100">
                    <Plus className="h-4 w-4 mr-1" />
                    Depositar
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                    <Minus className="h-4 w-4 mr-1" />
                    Sacar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-800 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Estatísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Apostado:</span>
                  <span className="text-white font-semibold">R$ 2.450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Ganho:</span>
                  <span className="text-green-400 font-semibold">R$ 1.875</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Jogos Jogados:</span>
                  <span className="text-white font-semibold">147</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Nível VIP:</span>
                  <Badge className="bg-purple-500">Bronze</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Menu */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Visão Geral
                </Button>
                <Button
                  variant={activeTab === "transactions" ? "default" : "ghost"}
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setActiveTab("transactions")}
                >
                  <History className="h-4 w-4 mr-2" />
                  Transações
                </Button>
                <Button
                  variant={activeTab === "games" ? "default" : "ghost"}
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setActiveTab("games")}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Jogos Recentes
                </Button>
                <Button
                  variant={activeTab === "bonuses" ? "default" : "ghost"}
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => setActiveTab("bonuses")}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Bônus
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Performance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Total Apostado</p>
                          <p className="text-2xl font-bold text-white">R$ 2.450</p>
                        </div>
                        <div className="bg-blue-500/20 p-3 rounded-full">
                          <TrendingUp className="h-6 w-6 text-blue-400" />
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-green-400 mt-2">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        +12% este mês
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Total Ganho</p>
                          <p className="text-2xl font-bold text-white">R$ 1.875</p>
                        </div>
                        <div className="bg-green-500/20 p-3 rounded-full">
                          <DollarSign className="h-6 w-6 text-green-400" />
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-red-400 mt-2">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        -5% este mês
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Maior Ganho</p>
                          <p className="text-2xl font-bold text-white">R$ 850</p>
                        </div>
                        <div className="bg-purple-500/20 p-3 rounded-full">
                          <Trophy className="h-6 w-6 text-purple-400" />
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 mt-2">
                        <Clock className="h-4 w-4 mr-1" />
                        Gates of Olympus
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentGames.slice(0, 5).map((game, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${game.result === "win" ? "bg-green-400" : "bg-red-400"}`}
                            ></div>
                            <div>
                              <p className="font-medium text-white">{game.name}</p>
                              <p className="text-sm text-gray-400">
                                {game.time} • {game.multiplier}
                              </p>
                            </div>
                          </div>
                          <div className={`font-semibold ${game.result === "win" ? "text-green-400" : "text-red-400"}`}>
                            {game.result === "win" ? "+" : ""}R$ {Math.abs(game.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Conquistas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`text-center p-4 rounded-lg border ${achievement.completed ? "bg-green-500/20 border-green-500/50" : "bg-gray-700 border-gray-600"}`}
                        >
                          <achievement.icon
                            className={`h-8 w-8 mx-auto mb-2 ${achievement.completed ? "text-green-400" : "text-gray-400"}`}
                          />
                          <p
                            className={`text-sm font-medium ${achievement.completed ? "text-green-400" : "text-gray-400"}`}
                          >
                            {achievement.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === "transactions" && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Histórico de Transações</CardTitle>
                  <CardDescription className="text-gray-400">Suas transações mais recentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between py-4 border-b border-gray-700 last:border-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "deposit"
                                ? "bg-green-500/20"
                                : transaction.type === "withdrawal"
                                  ? "bg-blue-500/20"
                                  : transaction.type === "win"
                                    ? "bg-green-500/20"
                                    : transaction.type === "bonus"
                                      ? "bg-purple-500/20"
                                      : "bg-red-500/20"
                            }`}
                          >
                            {transaction.type === "deposit" && <Plus className="h-4 w-4 text-green-400" />}
                            {transaction.type === "withdrawal" && <Minus className="h-4 w-4 text-blue-400" />}
                            {transaction.type === "win" && <Trophy className="h-4 w-4 text-green-400" />}
                            {transaction.type === "bonus" && <Gift className="h-4 w-4 text-purple-400" />}
                            {transaction.type === "bet" && <Target className="h-4 w-4 text-red-400" />}
                          </div>
                          <div>
                            <p className="font-medium text-white capitalize">
                              {transaction.type === "deposit"
                                ? "Depósito"
                                : transaction.type === "withdrawal"
                                  ? "Saque"
                                  : transaction.type === "bet"
                                    ? "Aposta"
                                    : transaction.type === "bonus"
                                      ? "Bônus"
                                      : "Ganho"}
                            </p>
                            <p className="text-sm text-gray-400">
                              {transaction.date} • {transaction.method || transaction.game || transaction.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                            {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount)}
                          </p>
                          <Badge
                            variant={transaction.status === "completed" ? "default" : "secondary"}
                            className={
                              transaction.status === "completed"
                                ? "bg-green-500 text-white"
                                : "bg-yellow-500 text-black"
                            }
                          >
                            {transaction.status === "completed" ? "Concluído" : "Pendente"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Games Tab */}
            {activeTab === "games" && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Jogos Recentes</CardTitle>
                  <CardDescription className="text-gray-400">Seus últimos jogos e resultados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentGames.map((game, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-4 border-b border-gray-700 last:border-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              game.result === "win" ? "bg-green-500/20" : "bg-red-500/20"
                            }`}
                          >
                            {game.result === "win" ? (
                              <Trophy className="h-6 w-6 text-green-400" />
                            ) : (
                              <Target className="h-6 w-6 text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{game.name}</p>
                            <p className="text-sm text-gray-400">
                              Hoje às {game.time} • {game.multiplier}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${game.result === "win" ? "text-green-400" : "text-red-400"}`}>
                            {game.result === "win" ? "+" : ""}R$ {Math.abs(game.amount)}
                          </p>
                          <Badge
                            variant={game.result === "win" ? "default" : "destructive"}
                            className={game.result === "win" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                          >
                            {game.result === "win" ? "Vitória" : "Derrota"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bonuses Tab */}
            {activeTab === "bonuses" && (
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Bônus Ativos</CardTitle>
                    <CardDescription className="text-gray-400">Seus bônus e requisitos de apostas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {bonuses.map((bonus, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white">{bonus.name}</h3>
                            <Badge className={bonus.status === "active" ? "bg-green-500" : "bg-blue-500"}>
                              {bonus.status === "active" ? "Ativo" : "Concluído"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-400">Valor do Bônus</p>
                              <p className="font-semibold text-green-400">R$ {bonus.amount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Rollover</p>
                              <p className="font-semibold text-white">R$ {bonus.wagering.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Apostado</p>
                              <p className="font-semibold text-blue-400">R$ {bonus.wagered.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Expira em</p>
                              <p className="font-semibold text-white">{bonus.expires}</p>
                            </div>
                          </div>
                          {bonus.status === "active" && (
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(bonus.wagered / bonus.wagering) * 100}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Available Bonuses */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Bônus Disponíveis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
                        <Gift className="h-8 w-8 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Cashback VIP</h3>
                        <p className="text-sm opacity-90 mb-4">Receba 15% de volta nas suas perdas</p>
                        <Button className="bg-white text-purple-600 hover:bg-gray-100 w-full">Ativar Agora</Button>
                      </div>
                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                        <Zap className="h-8 w-8 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Reload Bonus</h3>
                        <p className="text-sm opacity-90 mb-4">50% de bônus no seu próximo depósito</p>
                        <Button className="bg-white text-blue-600 hover:bg-gray-100 w-full">Resgatar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
