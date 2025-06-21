"use client"

import { Crown, Loader2 } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Crown className="h-12 w-12 text-green-400 animate-pulse" />
          <span className="text-3xl font-bold text-green-400 ml-2">OTTO BET</span>
        </div>
        <Loader2 className="h-8 w-8 animate-spin text-green-400 mx-auto mb-4" />
        <p className="text-gray-400">Carregando...</p>
      </div>
    </div>
  )
}
