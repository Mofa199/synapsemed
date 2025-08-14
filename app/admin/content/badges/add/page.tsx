"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { Award, Upload, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddBadgePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "trophy",
    color: "#f3ab1b",
    requirementType: "",
    requirementCount: "",
    requirementCategory: "",
    requirementMinScore: "",
  })

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/badges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Badge added successfully!")
        router.push("/admin")
      } else {
        throw new Error("Failed to add badge")
      }
    } catch (error) {
      console.error("Error adding badge:", error)
      alert("Failed to add badge. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213874] mb-2">Add New Badge</h1>
          <p className="text-gray-600">Create a new achievement badge for students</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#f3ab1b]" />
              Badge Information
            </CardTitle>
            <CardDescription>Fill in the details for the new badge</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Badge Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter badge name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter badge description"
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => handleInputChange("icon", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trophy">Trophy</SelectItem>
                      <SelectItem value="award">Award</SelectItem>
                      <SelectItem value="star">Star</SelectItem>
                      <SelectItem value="medal">Medal</SelectItem>
                      <SelectItem value="crown">Crown</SelectItem>
                      <SelectItem value="shield">Shield</SelectItem>
                      <SelectItem value="target">Target</SelectItem>
                      <SelectItem value="calendar">Calendar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#213874]">Requirements</h3>
                <div>
                  <Label htmlFor="requirementType">Requirement Type *</Label>
                  <Select
                    value={formData.requirementType}
                    onValueChange={(value) => handleInputChange("requirementType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select requirement type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz_completion">Quiz Completion</SelectItem>
                      <SelectItem value="module_completion">Module Completion</SelectItem>
                      <SelectItem value="daily_streak">Daily Streak</SelectItem>
                      <SelectItem value="points_earned">Points Earned</SelectItem>
                      <SelectItem value="reading_time">Reading Time</SelectItem>
                      <SelectItem value="topic_mastery">Topic Mastery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.requirementType === "quiz_completion" ||
                  formData.requirementType === "daily_streak" ||
                  formData.requirementType === "points_earned") && (
                  <div>
                    <Label htmlFor="requirementCount">Count Required</Label>
                    <Input
                      id="requirementCount"
                      type="number"
                      value={formData.requirementCount}
                      onChange={(e) => handleInputChange("requirementCount", e.target.value)}
                      placeholder="Enter count"
                    />
                  </div>
                )}

                {formData.requirementType === "module_completion" && (
                  <div>
                    <Label htmlFor="requirementCategory">Category</Label>
                    <Select
                      value={formData.requirementCategory}
                      onValueChange={(value) => handleInputChange("requirementCategory", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anatomy">Anatomy</SelectItem>
                        <SelectItem value="physiology">Physiology</SelectItem>
                        <SelectItem value="pathology">Pathology</SelectItem>
                        <SelectItem value="pharmacology">Pharmacology</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="all">All Categories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.requirementType === "quiz_completion" && (
                  <div>
                    <Label htmlFor="requirementMinScore">Minimum Score (%)</Label>
                    <Input
                      id="requirementMinScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.requirementMinScore}
                      onChange={(e) => handleInputChange("requirementMinScore", e.target.value)}
                      placeholder="Enter minimum score"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="bg-[#213874] hover:bg-[#1a6ac3]">
                  {isLoading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Adding Badge...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Badge
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
