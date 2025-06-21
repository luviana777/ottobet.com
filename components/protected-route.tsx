"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  requireUser?: boolean
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  requireUser = false,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isUser, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!isAuthenticated) {
      router.push(redirectTo)
      return
    }

    if (requireAdmin && !isAdmin) {
      router.push("/")
      return
    }

    if (requireUser && !isUser) {
      router.push("/")
      return
    }
  }, [isAuthenticated, isAdmin, isUser, loading, router, requireAdmin, requireUser, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requireAdmin && !isAdmin) {
    return null
  }

  if (requireUser && !isUser) {
    return null
  }

  return <>{children}</>
}
