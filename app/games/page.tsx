"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Crown, Search, Filter, Star, Play, Users, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const { isAuthenticated } = useAuth()

  const categories = [
    { id: "all", name: "Todos", icon: Dice1 },
    { id: "slots", name: "Slots", icon: Dice2 },
    { id: "table", name: "Mesa", icon: Dice3 },
    { id: "live", name: "Ao Vivo", icon: Dice4 },
    { id: "crash", name: "Crash", icon: Dice5 },
    { id: "instant", name: "Instantâneos", icon: Dice6 },
  ]

  const games = [
    {
      id: 1,
      name: "Gates of Olympus",
      provider: "Pragmatic Play",
      category: "slots",
      rtp: 96.5,
      players: 2847,
      hot: true,
      new: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Sweet Bonanza",
      provider: "Pragmatic Play",
      category: "slots",
      rtp: 96.48,
      players: 1923,
      hot: true,
      new: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Aviator",
      provider: "Spribe",
      category: "crash",
      rtp: 97.0,
      players: 3421,
      hot: true,
      new: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Lightning Roulette",
      provider: "Evolution Gaming",
      category: "live",
      rtp: 97.3,
      players: 892,
      hot: false,
      new: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Blackjack Classic",
      provider: "Evolution Gaming",
      category: "table",
      rtp: 99.28,
      players: 654,
      hot: false,
      new: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Mines",
      provider: "Spribe",
      category: "instant",
      rtp: 97.0,
      players: 1234,
      hot: false,
      new: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      name: "Book of Dead",
      provider: "Play'n GO",
      category: "slots",
      rtp: 94.25,
      players: 756,
      hot: false,
      new: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      name: "Crazy Time",
      provider: "Evolution Gaming",
      category: "live",
      rtp: 96.08,
      players: 1567,
      hot: true,
      new: false,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filteredGames = games.filter((game) => {
    const matchesCategory = selectedCategory === "all" || game.category === selectedCategory
    const matchesSearch =
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
              <Link href="/login">
                <Button className="bg-green-500 hover:bg-green-600 text-black">Entrar</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Nossos Jogos</h1>
          <p className="text-gray-400 text-lg">Mais de 5.000 jogos dos melhores provedores do mundo</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar jogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-400">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-green-500 text-black"
                    : "border-gray-700 text-gray-400 hover:text-white"
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className="bg-gray-800 border-gray-700 hover:border-green-500 transition-all cursor-pointer group overflow-hidden"
            >
              <div className="relative">
                <img
                  src={game.image || "/placeholder.svg"}
                  alt={game.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {game.hot && <Badge className="bg-red-500 text-white text-xs">HOT</Badge>}
                  {game.new && <Badge className="bg-blue-500 text-white text-xs">NOVO</Badge>}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-bold">
                    <Play className="h-4 w-4 mr-2" />
                    JOGAR
                  </Button>
                </div>

                {/* RTP Badge */}
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-gray-900/80 text-green-400 text-xs">RTP {game.rtp}%</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-1 truncate">{game.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{game.provider}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Users className="h-3 w-3" />
                    <span>{game.players.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-400">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8">Carregar Mais Jogos</Button>
        </div>

        {/* Game Providers */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Nossos Provedores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Pragmatic Play", "Evolution Gaming", "NetEnt", "Play'n GO", "Spribe", "Microgaming"].map(
              (provider, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700 hover:border-green-500 transition-colors"
                >
                  <div className="h-12 bg-gray-700 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-semibold">{provider}</span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
