"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { BookOpen, Upload, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddBookPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    publisher: "",
    edition: "",
    isbn: "",
    language: "English",
    publicationDate: "",
    pages: "",
    coverImage: null as File | null,
    pdfFile: null as File | null,
    curriculumId: "",
    moduleId: "",
  })

  const [curriculums, setCurriculums] = useState([])
  const [modules, setModules] = useState([])

  useEffect(() => {
    fetchCurriculums()
  }, [])

  useEffect(() => {
    if (formData.curriculumId) {
      fetchModules(formData.curriculumId)
    } else {
      setModules([])
      setFormData((prev) => ({ ...prev, moduleId: "" }))
    }
  }, [formData.curriculumId])

  const fetchCurriculums = async () => {
    try {
      const response = await fetch("/api/admin/curriculums")
      if (response.ok) {
        const data = await response.json()
        setCurriculums(data.curriculums || [])
      }
    } catch (error) {
      console.error("Error fetching curriculums:", error)
    }
  }

  const fetchModules = async (curriculumId: string) => {
    try {
      const response = await fetch(`/api/admin/curriculums/${curriculumId}/modules`)
      if (response.ok) {
        const data = await response.json()
        setModules(data.modules || [])
      }
    } catch (error) {
      console.error("Error fetching modules:", error)
    }
  }

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

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value)
        }
      })

      const response = await fetch("/api/admin/books", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        alert("Book added successfully!")
        router.push("/admin")
      } else {
        throw new Error("Failed to add book")
      }
    } catch (error) {
      console.error("Error adding book:", error)
      alert("Failed to add book. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213874] mb-2">Add New Book</h1>
          <p className="text-gray-600">Add a new book to the medical library</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#213874]" />
              Book Information
            </CardTitle>
            <CardDescription>Fill in the details for the new book</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter book title"
                    required
                  />
                </div>
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anatomy">Anatomy</SelectItem>
                      <SelectItem value="physiology">Physiology</SelectItem>
                      <SelectItem value="pathology">Pathology</SelectItem>
                      <SelectItem value="pharmacology">Pharmacology</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="nursing">Nursing</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="publisher">Publisher</Label>
                  <Input
                    id="publisher"
                    value={formData.publisher}
                    onChange={(e) => handleInputChange("publisher", e.target.value)}
                    placeholder="Enter publisher name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="curriculum">Curriculum</Label>
                  <Select
                    value={formData.curriculumId}
                    onValueChange={(value) => handleInputChange("curriculumId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select curriculum (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {curriculums.map((curriculum: any) => (
                        <SelectItem key={curriculum.id} value={curriculum.id}>
                          {curriculum.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="module">Module</Label>
                  <Select
                    value={formData.moduleId}
                    onValueChange={(value) => handleInputChange("moduleId", value)}
                    disabled={!formData.curriculumId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select module (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((module: any) => (
                        <SelectItem key={module.id} value={module.id}>
                          {module.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter book description"
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="edition">Edition</Label>
                  <Input
                    id="edition"
                    value={formData.edition}
                    onChange={(e) => handleInputChange("edition", e.target.value)}
                    placeholder="e.g., 4th Edition"
                  />
                </div>
                <div>
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => handleInputChange("isbn", e.target.value)}
                    placeholder="Enter ISBN"
                  />
                </div>
                <div>
                  <Label htmlFor="pages">Pages</Label>
                  <Input
                    id="pages"
                    type="number"
                    value={formData.pages}
                    onChange={(e) => handleInputChange("pages", e.target.value)}
                    placeholder="Number of pages"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="publicationDate">Publication Date</Label>
                  <Input
                    id="publicationDate"
                    type="date"
                    value={formData.publicationDate}
                    onChange={(e) => handleInputChange("publicationDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange("coverImage", e.target.files?.[0] || null)}
                  />
                </div>
                <div>
                  <Label htmlFor="pdfFile">PDF File</Label>
                  <Input
                    id="pdfFile"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange("pdfFile", e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="bg-[#213874] hover:bg-[#1a6ac3]">
                  {isLoading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Adding Book...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Book
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
