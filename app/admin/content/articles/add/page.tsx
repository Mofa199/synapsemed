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
import { FileText, Upload, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddArticlePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    authorBio: "",
    journal: "",
    category: "",
    abstract: "",
    content: "",
    keywords: "",
    references: "",
    readTime: "",
    difficulty: "Beginner",
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
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Article added successfully!")
        router.push("/admin")
      } else {
        throw new Error("Failed to add article")
      }
    } catch (error) {
      console.error("Error adding article:", error)
      alert("Failed to add article. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213874] mb-2">Add New Article</h1>
          <p className="text-gray-600">Add a new research article to the library</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#213874]" />
              Article Information
            </CardTitle>
            <CardDescription>Fill in the details for the new article</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter article title"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="journal">Journal</Label>
                  <Input
                    id="journal"
                    value={formData.journal}
                    onChange={(e) => handleInputChange("journal", e.target.value)}
                    placeholder="Enter journal name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="authorBio">Author Bio</Label>
                <Textarea
                  id="authorBio"
                  value={formData.authorBio}
                  onChange={(e) => handleInputChange("authorBio", e.target.value)}
                  placeholder="Enter author biography"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="pulmonology">Pulmonology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="pharmacology">Pharmacology</SelectItem>
                      <SelectItem value="nursing">Nursing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange("readTime", e.target.value)}
                    placeholder="e.g., 15 min"
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="abstract">Abstract *</Label>
                <Textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => handleInputChange("abstract", e.target.value)}
                  placeholder="Enter article abstract"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Enter article content (HTML supported)"
                  rows={10}
                  required
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange("keywords", e.target.value)}
                  placeholder="Enter keywords separated by commas"
                />
              </div>

              <div>
                <Label htmlFor="references">References</Label>
                <Textarea
                  id="references"
                  value={formData.references}
                  onChange={(e) => handleInputChange("references", e.target.value)}
                  placeholder="Enter references (one per line)"
                  rows={5}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="bg-[#213874] hover:bg-[#1a6ac3]">
                  {isLoading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Adding Article...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Article
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
