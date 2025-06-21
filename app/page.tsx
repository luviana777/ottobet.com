"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Crown,
  Trophy,
  Zap,
  Shield,
  CreditCard,
  Play,
  Users,
  TrendingUp,
  Gift,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Award,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [stats, setStats] = useState({
    onlineUsers: 2847,
    totalPayout: 15420000,
    biggestWin: 250000,
    gamesPlayed: 89234,
  })

  const { user, admin, isAuthenticated, isAdmin, isUser, logout } = useAuth()

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        onlineUsers: prev.onlineUsers + Math.floor(Math.random() * 10) - 5,
        totalPayout: prev.totalPayout + Math.floor(Math.random() * 10000),
        biggestWin: prev.biggestWin + Math.floor(Math.random() * 5000),
        gamesPlayed: prev.gamesPlayed + Math.floor(Math.random() * 20),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const games = [
    { name: "Slots Clássicos", icon: Dice1, players: "2.5k", hot: true },
    { name: "Blackjack", icon: Dice2, players: "1.2k", hot: false },
    { name: "Roleta", icon: Dice3, players: "890", hot: true },
    { name: "Poker", icon: Dice4, players: "1.8k", hot: false },
    { name: "Baccarat", icon: Dice5, players: "650", hot: false },
    { name: "Crash Games", icon: Dice6, players: "3.1k", hot: true },
  ]

  const features = [
    { icon: Shield, title: "Segurança Total", desc: "Criptografia SSL 256-bit e licença internacional" },
    { icon: Zap, title: "Saques Instantâneos", desc: "PIX em até 5 minutos, 24/7" },
    { icon: CreditCard, title: "Múltiplos Pagamentos", desc: "PIX, cartões, criptomoedas e mais" },
    { icon: Trophy, title: "Jackpots Diários", desc: "Prêmios de até R$ 1.000.000" },
  ]

  const promotions = [
    {
      title: "Bônus de Boas-vindas",
      description: "100% até R$ 50.000 + 100 giros grátis",
      badge: "POPULAR",
      color: "from-green-600 to-green-800",
    },
    {
      title: "Cashback VIP",
      description: "Até 20% de volta nas suas perdas",
      badge: "VIP",
      color: "from-purple-600 to-purple-800",
    },
    {
      title: "Torneio Semanal",
      description: "R$ 100.000 em prêmios",
      badge: "NOVO",
      color: "from-blue-600 to-blue-800",
    },
  ]

  const testimonials = [
    {
      name: "Carlos M.",
      amount: "R$ 45.000",
      game: "Gates of Olympus",
      time: "2 min atrás",
    },
    {
      name: "Ana S.",
      amount: "R$ 12.500",
      game: "Sweet Bonanza",
      time: "5 min atrás",
    },
    {
      name: "Pedro L.",
      amount: "R$ 8.750",
      game: "Aviator",
      time: "8 min atrás",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/95 backdrop-blur-sm border-b border-green-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-green-400" />
            <h1 className="text-2xl font-bold text-green-400">OTTO BET</h1>
            <Badge className="bg-green-500 text-black text-xs">LICENCIADO</Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#games" className="hover:text-green-400 transition-colors">
              Jogos
            </Link>
            <Link href="#promotions" className="hover:text-green-400 transition-colors">
              Promoções
            </Link>
            <Link href="#vip" className="hover:text-green-400 transition-colors">
              VIP
            </Link>
            <Link href="#support" className="hover:text-green-400 transition-colors">
              Suporte
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Bem-vindo,</p>
                  <p className="font-semibold text-green-400">
                    {isUser ? user?.name : isAdmin ? admin?.email : "Usuário"}
                  </p>
                </div>
                <Link href={isAdmin ? "/admin" : "/dashboard"}>
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">
                    {isAdmin ? "Painel Admin" : "Minha Conta"}
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">Cadastrar</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-green-900/20 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-green-400 mr-2" />
              <Badge className="bg-green-500 text-black px-4 py-1 text-sm font-semibold">#1 CASSINO DO BRASIL</Badge>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              OTTO BET
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-8">Onde os sonhos se tornam realidade</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">{stats.onlineUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Jogadores Online</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">R$ {(stats.totalPayout / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-400">Pagos Hoje</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">R$ {(stats.biggestWin / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-400">Maior Ganho</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">{stats.gamesPlayed.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Jogos Hoje</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/register">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  JOGAR AGORA
                </Button>
              </Link>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">R$ 50.000</div>
                <div className="text-sm text-gray-400">Bônus de Boas-vindas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Winners */}
      <section className="py-4 bg-green-500/10 border-y border-green-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 overflow-hidden">
            <Trophy className="h-6 w-6 text-green-400" />
            <div className="flex space-x-8 animate-pulse">
              {testimonials.map((winner, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <span className="text-green-400 font-semibold">{winner.name}</span>
                  <span className="text-white">ganhou</span>
                  <span className="text-green-400 font-bold">{winner.amount}</span>
                  <span className="text-gray-400">em {winner.game}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-green-400 mb-4">JOGOS POPULARES</h3>
            <p className="text-gray-400">Mais de 5.000 jogos dos melhores provedores</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {games.map((game, index) => (
              <Card
                key={index}
                className="bg-gray-700 border-gray-600 hover:border-green-500 transition-all cursor-pointer group relative overflow-hidden"
              >
                {game.hot && <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs z-10">HOT</Badge>}
                <CardContent className="p-6 text-center">
                  <game.icon className="h-12 w-12 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-2 text-white">{game.name}</h4>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>{game.players} jogando</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">
              Ver Todos os Jogos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-green-400 mb-4">POR QUE ESCOLHER OTTO BET?</h3>
            <p className="text-gray-400">A experiência de cassino mais completa do Brasil</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                  <feature.icon className="h-8 w-8 text-green-400 group-hover:text-black" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-white">{feature.title}</h4>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promotions" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-green-400 mb-4">PROMOÇÕES EXCLUSIVAS</h3>
            <p className="text-gray-400">Ofertas imperdíveis para maximizar seus ganhos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${promo.color} border-0 text-white relative overflow-hidden`}
              >
                <Badge className="absolute top-4 right-4 bg-white text-black font-bold">{promo.badge}</Badge>
                <CardContent className="p-6">
                  <Gift className="h-8 w-8 mb-4" />
                  <h4 className="text-xl font-bold mb-2">{promo.title}</h4>
                  <p className="mb-4 opacity-90">{promo.description}</p>
                  <Button className="bg-white text-black hover:bg-gray-100 font-semibold w-full">RESGATAR AGORA</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Section */}
      <section id="vip" className="py-16 bg-gradient-to-r from-purple-900/20 to-gold-900/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">PROGRAMA VIP EXCLUSIVO</h3>
            <p className="text-xl text-gray-300 mb-8">Benefícios exclusivos para nossos jogadores mais fiéis</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-yellow-400/20">
                <Award className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Cashback Maior</h4>
                <p className="text-gray-400 text-sm">Até 25% de volta</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-yellow-400/20">
                <Target className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Limites Maiores</h4>
                <p className="text-gray-400 text-sm">Apostas sem limites</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-yellow-400/20">
                <Users className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Gerente Pessoal</h4>
                <p className="text-gray-400 text-sm">Atendimento 24/7</p>
              </div>
            </div>

            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3">TORNAR-SE VIP</Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">CONFIANÇA E SEGURANÇA</h3>
            <p className="text-gray-400">Licenciado e regulamentado pelas principais autoridades</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <Shield className="h-12 w-12 text-green-400 mx-auto" />
              </div>
              <h4 className="font-semibold text-white">SSL 256-bit</h4>
              <p className="text-gray-400 text-sm">Criptografia máxima</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
              </div>
              <h4 className="font-semibold text-white">Licenciado</h4>
              <p className="text-gray-400 text-sm">Autoridades internacionais</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <Clock className="h-12 w-12 text-green-400 mx-auto" />
              </div>
              <h4 className="font-semibold text-white">Suporte 24/7</h4>
              <p className="text-gray-400 text-sm">Sempre disponível</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 rounded-lg p-6 mb-4">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto" />
              </div>
              <h4 className="font-semibold text-white">RTP Alto</h4>
              <p className="text-gray-400 text-sm">Até 99% de retorno</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold text-green-400">OTTO BET</span>
              </div>
              <p className="text-gray-400 mb-4">
                O cassino online mais confiável do Brasil com jogos seguros e pagamentos rápidos.
              </p>
              <div className="flex space-x-4">
                <Badge className="bg-green-500 text-black">Licenciado</Badge>
                <Badge className="bg-blue-500 text-white">SSL</Badge>
                <Badge className="bg-purple-500 text-white">18+</Badge>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Jogos</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Slots
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Mesa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Ao Vivo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Crash
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Suporte</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Chat 24/7
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Termos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4 text-white">Pagamentos</h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-700 px-3 py-2 rounded text-sm text-green-400 text-center">PIX</div>
                <div className="bg-gray-700 px-3 py-2 rounded text-sm text-green-400 text-center">Visa</div>
                <div className="bg-gray-700 px-3 py-2 rounded text-sm text-green-400 text-center">Master</div>
                <div className="bg-gray-700 px-3 py-2 rounded text-sm text-green-400 text-center">Bitcoin</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Otto Bet. Todos os direitos reservados. Jogue com responsabilidade. +18</p>
            <p className="text-sm mt-2">Licença: GLI-2024-OTTO-BR | RNG Certificado | Jogo Responsável</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
