"use client"

import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth" || pathname === "/login" || pathname === "/signup"

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
      <Toaster />
    </AuthProvider>
  )
}
