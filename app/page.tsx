"use client"

import { useAuth } from "@/components/auth-provider"
import { HomePage } from "@/components/home-page"
import { AuthPage } from "@/components/auth-page"

export default function Page() {
  const { user } = useAuth()

  if (!user) {
    return <AuthPage />
  }

  return <HomePage />
}
