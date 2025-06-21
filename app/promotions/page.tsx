"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Gift,
  Star,
  Trophy,
  Zap,
  Clock,
  Users,
  Target,
  Percent,
  DollarSign,
  Award,
  Sparkles,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function PromotionsPage() {
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("all")

  const promotions = [
    {
      id: 1,
      title: "Bônus de Boas-vindas",
      description: "Ganhe 100% até R$ 50.000 no seu primeiro depósito + 100 giros grátis",
      type: "welcome",
      badge: "POPULAR",
      color: "from-green-600 to-green-800",
      icon: Gift,
      bonus: "100%",
      maxAmount: "R$ 50.000",
      wagering: "35x",
      validUntil: "Permanente",
      terms: [
        "Válido apenas para novos usuários",
        "Depósito mínimo de R$ 50",
        "Rollover de 35x o valor do bônus",
        "Giros grátis válidos por 7 dias",
      ],
    },
    {
      id: 2,
      title: "Cashback VIP",
      description: "Receba até 20% de volta nas suas perdas semanais",
      type: "cashback",
      badge: "VIP",
      color: "from-purple-600 to-purple-800",
      icon: Star,
      bonus: "20%",
      maxAmount: "R$ 10.000",
      wagering: "1x",
      validUntil: "Semanal",
      terms: [
        "Disponível para jogadores VIP",
        "Calculado automaticamente toda segunda-feira",
        "Sem rollover",
        "Perdas mínimas de R$ 500",
      ],
    },
    {
      id: 3,
      title: "Torneio Mega Slots",
      description: "Participe do maior torneio de slots do Brasil",
      type: "tournament",
      badge: "NOVO",
      color: "from-blue-600 to-blue-800",
      icon: Trophy,
      bonus: "R$ 100.000",
      maxAmount: "1º Lugar",
      wagering: "0x",
      validUntil: "7 dias",
      terms: [
        "Prêmio total de R$ 100.000",
        "Top 100 jogadores ganham prêmios",
        "Apenas slots participam",
        "Classificação por maior multiplicador",
      ],
    },
    {
      id: 4,
      title: "Reload Bonus",
      description: "50% de bônus em todos os seus depósitos",
      type: "reload",
      badge: "DIÁRIO",
      color: "from-orange-600 to-orange-800",
      icon: Zap,
      bonus: "50%",
      maxAmount: "R$ 5.000",
      wagering: "30x",
      validUntil: "Diário",
      terms: ["Disponível todos os dias", "Depósito mínimo de R$ 100", "Rollover de 30x", "Válido por 24 horas"],
    },
    {
      id: 5,
      title: "Giros Grátis Diários",
      description: "50 giros grátis todos os dias em jogos selecionados",
      type: "freespins",
      badge: "GRÁTIS",
      color: "from-pink-600 to-pink-800",
      icon: Target,
      bonus: "50 Giros",
      maxAmount: "Diário",
      wagering: "25x",
      validUntil: "24h",
      terms: [
        "50 giros grátis por dia",
        "Jogos selecionados apenas",
        "Rollover de 25x os ganhos",
        "Renovado automaticamente",
      ],
    },
    {
      id: 6,
      title: "Programa de Fidelidade",
      description: "Ganhe pontos a cada aposta e troque por prêmios",
      type: "loyalty",
      badge: "EXCLUSIVO",
      color: "from-yellow-600 to-yellow-800",
      icon: Award,
      bonus: "Pontos",
      maxAmount: "Ilimitado",
      wagering: "0x",
      validUntil: "Permanente",
      terms: [
        "1 ponto a cada R$ 10 apostados",
        "Troque pontos por bônus",
        "Níveis VIP exclusivos",
        "Benefícios crescentes",
      ],
    },
  ]

  const filteredPromotions = activeTab === "all" ? promotions : promotions.filter((promo) => promo.type === activeTab)

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
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="bg-green-500 hover:bg-green-600 text-black">Minha Conta</Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button className="bg-green-500 hover:bg-green-600 text-black">Cadastrar</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Sparkles className="h-16 w-16 text-green-400 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              Promoções Exclusivas
            </h1>
            <p className="text-xl text-gray-300 mb-8">Maximize seus ganhos com nossas ofertas imperdíveis</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/20">
                <Gift className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">R$ 50.000</div>
                <div className="text-sm text-gray-400">Bônus Máximo</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/20">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">15.000+</div>
                <div className="text-sm text-gray-400">Jogadores Ativos</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-green-500/20">
                <Trophy className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">R$ 2.5M</div>
                <div className="text-sm text-gray-400">Pagos Este Mês</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-800 border-gray-700 grid grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              Todas
            </TabsTrigger>
            <TabsTrigger value="welcome" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              Boas-vindas
            </TabsTrigger>
            <TabsTrigger value="cashback" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              Cashback
            </TabsTrigger>
            <TabsTrigger value="tournament" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              Torneios
            </TabsTrigger>
            <TabsTrigger value="reload" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              Reload
            </TabsTrigger>
            <TabsTrigger value="freespins" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              Giros Grátis
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPromotions.map((promo) => (
            <Card
              key={promo.id}
              className="bg-gray-800 border-gray-700 overflow-hidden hover:border-green-500 transition-all group"
            >
              <div className={`bg-gradient-to-r ${promo.color} p-6 relative`}>
                <Badge className="absolute top-4 right-4 bg-white text-black font-bold">{promo.badge}</Badge>
                <promo.icon className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{promo.title}</h3>
                <p className="text-white/90">{promo.description}</p>
              </div>

              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="flex items-center text-green-400 mb-1">
                      <Percent className="h-4 w-4 mr-1" />
                      <span className="text-sm">Bônus</span>
                    </div>
                    <div className="font-bold text-white">{promo.bonus}</div>
                  </div>
                  <div>
                    <div className="flex items-center text-green-400 mb-1">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="text-sm">Máximo</span>
                    </div>
                    <div className="font-bold text-white">{promo.maxAmount}</div>
                  </div>
                  <div>
                    <div className="flex items-center text-green-400 mb-1">
                      <Target className="h-4 w-4 mr-1" />
                      <span className="text-sm">Rollover</span>
                    </div>
                    <div className="font-bold text-white">{promo.wagering}</div>
                  </div>
                  <div>
                    <div className="flex items-center text-green-400 mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">Válido</span>
                    </div>
                    <div className="font-bold text-white">{promo.validUntil}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Termos e Condições:</h4>
                  <ul className="space-y-1">
                    {promo.terms.map((term, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold group-hover:scale-105 transition-transform">
                  {isAuthenticated ? "RESGATAR AGORA" : "CADASTRAR E RESGATAR"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* VIP Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-purple-900/50 to-yellow-900/50 border-purple-500/50 overflow-hidden">
            <CardContent className="p-8 text-center">
              <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Programa VIP Exclusivo</h2>
              <p className="text-xl text-gray-300 mb-8">Benefícios exclusivos para nossos jogadores mais fiéis</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                  <Award className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">Cashback Maior</h3>
                  <p className="text-gray-400 text-sm">Até 25% de volta</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                  <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">Saques Prioritários</h3>
                  <p className="text-gray-400 text-sm">Processamento em 1 minuto</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                  <Users className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">Gerente Pessoal</h3>
                  <p className="text-gray-400 text-sm">Atendimento 24/7</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                  <Gift className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">Bônus Exclusivos</h3>
                  <p className="text-gray-400 text-sm">Ofertas personalizadas</p>
                </div>
              </div>

              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg">
                TORNAR-SE VIP
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Terms Section */}
        <div className="mt-16">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Termos Gerais das Promoções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
                <div>
                  <h4 className="font-semibold text-white mb-3">Elegibilidade</h4>
                  <ul className="space-y-2">
                    <li>• Apenas para maiores de 18 anos</li>
                    <li>• Uma conta por pessoa/IP/dispositivo</li>
                    <li>• Verificação de identidade obrigatória</li>
                    <li>• Residentes do Brasil apenas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Rollover</h4>
                  <ul className="space-y-2">
                    <li>• Deve ser cumprido antes do saque</li>
                    <li>• Apenas apostas reais contam</li>
                    <li>• Prazo máximo de 30 dias</li>
                    <li>• Contribuição varia por jogo</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Saques</h4>
                  <ul className="space-y-2">
                    <li>• Rollover deve estar completo</li>
                    <li>• Verificação KYC obrigatória</li>
                    <li>• Processamento em até 24h</li>
                    <li>• Limites diários aplicáveis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Geral</h4>
                  <ul className="space-y-2">
                    <li>• Otto Bet reserva o direito de alterar termos</li>
                    <li>• Promoções não são cumulativas</li>
                    <li>• Decisões da casa são finais</li>
                    <li>• Jogue com responsabilidade</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
