"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isFlipping, setIsFlipping] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    field: "",
  })
  const { login, signup } = useAuth()
  const { toast } = useToast()

  const handleFlip = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setIsLogin(!isLogin)
      setIsFlipping(false)
      setFormData({ name: "", email: "", password: "", field: "" })
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let success = false

      if (isLogin) {
        success = await login(formData.email, formData.password)
      } else {
        if (!formData.name || !formData.field) {
          toast({
            title: "Error",
            description: "Please fill in all fields",
            variant: "destructive",
          })
          return
        }
        success = await signup(formData.name, formData.email, formData.password, formData.field)
      }

      if (success) {
        toast({
          title: "Success",
          description: isLogin ? "Welcome back!" : "Account created successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#213874] via-[#1a6ac3] to-[#213874] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-in fade-in duration-1000">
          <div className="w-16 h-16 bg-[#f3ab1b] rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
            <span className="text-2xl font-bold text-[#213874]">SM</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Synapse Med</h1>
          <p className="text-blue-100">Connect. Learn. Master Medicine.</p>
        </div>

        <div className="perspective-1000 animate-in slide-in-from-bottom duration-1000">
          <Card className={`transition-transform duration-300 ${isFlipping ? "rotate-y-180" : ""}`}>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-[#213874]">{isLogin ? "Welcome Back" : "Join Synapse Med"}</h2>
                <p className="text-gray-600 mt-2">
                  {isLogin ? "Sign in to continue your learning journey" : "Start your medical education journey"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="field">Primary Field</Label>
                    <Select
                      value={formData.field}
                      onValueChange={(value) => setFormData({ ...formData, field: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical Student</SelectItem>
                        <SelectItem value="nursing">Nursing Student</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#213874] hover:bg-[#1a6ac3] transform hover:scale-105 transition-all duration-300"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={handleFlip}
                    className="ml-2 text-[#213874] hover:text-[#1a6ac3] font-medium transition-colors"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
                <p className="text-xs">Admin: admin@synapsemed.com / admin123</p>
                <p className="text-xs">Medical: medical@synapsemed.com / medical123</p>
                <p className="text-xs">Nursing: nursing@synapsemed.com / nursing123</p>
                <p className="text-xs">Pharmacy: pharmacy@synapsemed.com / pharmacy123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
