"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "student"
  field: "medical" | "nursing" | "pharmacy"
  avatar?: string
  level: number
  points: number
  streak: number
  badges: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, field: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users with different types
const mockUsers: Record<string, User> = {
  "admin@synapsemed.com": {
    id: "1",
    name: "Dr. Admin",
    email: "admin@synapsemed.com",
    role: "admin",
    field: "medical",
    level: 10,
    points: 5000,
    streak: 30,
    badges: ["early-adopter", "knowledge-master", "admin-badge"],
  },
  "medical@synapsemed.com": {
    id: "2",
    name: "Alex Medical",
    email: "medical@synapsemed.com",
    role: "student",
    field: "medical",
    level: 5,
    points: 2500,
    streak: 15,
    badges: ["first-quiz", "anatomy-expert"],
  },
  "nursing@synapsemed.com": {
    id: "3",
    name: "Sarah Nursing",
    email: "nursing@synapsemed.com",
    role: "student",
    field: "nursing",
    level: 4,
    points: 2000,
    streak: 12,
    badges: ["patient-care", "first-quiz"],
  },
  "pharmacy@synapsemed.com": {
    id: "4",
    name: "Mike Pharmacy",
    email: "pharmacy@synapsemed.com",
    role: "student",
    field: "pharmacy",
    level: 6,
    points: 3000,
    streak: 20,
    badges: ["drug-expert", "pharmacology-master", "first-quiz"],
  },
  "student@synapsemed.com": {
    id: "5",
    name: "John Student",
    email: "student@synapsemed.com",
    role: "student",
    field: "medical",
    level: 3,
    points: 1500,
    streak: 8,
    badges: ["first-quiz"],
  },
}

const mockPasswords: Record<string, string> = {
  "admin@synapsemed.com": "admin123",
  "medical@synapsemed.com": "medical123",
  "nursing@synapsemed.com": "nursing123",
  "pharmacy@synapsemed.com": "pharmacy123",
  "student@synapsemed.com": "student123",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("synapse-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers[email]
    const mockPassword = mockPasswords[email]

    if (mockUser && mockPassword === password) {
      setUser(mockUser)
      localStorage.setItem("synapse-user", JSON.stringify(mockUser))
      return true
    }

    return false
  }

  const signup = async (name: string, email: string, password: string, field: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockUsers[email]) {
      return false
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: "student",
      field: field as "medical" | "nursing" | "pharmacy",
      level: 1,
      points: 0,
      streak: 0,
      badges: [],
    }

    // Add to mock users (in real app, this would be sent to backend)
    mockUsers[email] = newUser
    mockPasswords[email] = password

    setUser(newUser)
    localStorage.setItem("synapse-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("synapse-user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("synapse-user", JSON.stringify(updatedUser))
    }
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
