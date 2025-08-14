"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
      return
    }

    if (requireAdmin && user.role !== "admin") {
      router.push("/")
      return
    }
  }, [user, requireAdmin, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#213874] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAdmin && user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
