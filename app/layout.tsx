import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Otto Bet - Cassino Online #1 do Brasil",
  description:
    "O cassino online mais confiável do Brasil. Jogos seguros, pagamentos rápidos e bônus incríveis. Cadastre-se e ganhe R$ 50.000 de bônus!",
  keywords: "cassino online, slots, blackjack, roleta, apostas, bônus, PIX, Brasil",
  authors: [{ name: "Otto Bet" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Otto Bet - Cassino Online #1 do Brasil",
    description: "O cassino online mais confiável do Brasil. Jogos seguros, pagamentos rápidos e bônus incríveis.",
    type: "website",
    locale: "pt_BR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
