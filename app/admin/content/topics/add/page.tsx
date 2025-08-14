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
import { BookOpen, Upload, Save, Plus, X, Bold, Italic, Link, ImageIcon, Table, List } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddTopicPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    difficulty: "beginner",
    estimatedTime: "",
    prerequisites: [] as string[],
    learningObjectives: [] as string[],
    tags: [] as string[],
    coverImage: null as File | null,
    curriculumId: "",
    moduleId: "",
  })

  const [curriculums, setCurriculums] = useState([])
  const [modules, setModules] = useState([])
  const [newPrerequisite, setNewPrerequisite] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [newTag, setNewTag] = useState("")

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

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, coverImage: file }))
  }

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    let replacement = ""

    switch (format) {
      case "bold":
        replacement = `**${selectedText || "bold text"}**`
        break
      case "italic":
        replacement = `*${selectedText || "italic text"}*`
        break
      case "link":
        replacement = `[${selectedText || "link text"}](url)`
        break
      case "image":
        replacement = `![${selectedText || "alt text"}](image-url)`
        break
      case "table":
        replacement = `\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n`
        break
      case "list":
        replacement = `\n- ${selectedText || "List item"}\n- List item 2\n`
        break
    }

    const newContent = formData.content.substring(0, start) + replacement + formData.content.substring(end)
    setFormData((prev) => ({ ...prev, content: newContent }))
  }

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setFormData((prev) => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()],
      }))
      setNewPrerequisite("")
    }
  }

  const removePrerequisite = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index),
    }))
  }

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData((prev) => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, newObjective.trim()],
      }))
      setNewObjective("")
    }
  }

  const removeObjective = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "prerequisites" || key === "learningObjectives" || key === "tags") {
          formDataToSend.append(key, JSON.stringify(value))
        } else if (value !== null) {
          formDataToSend.append(key, value)
        }
      })

      const response = await fetch("/api/admin/topics", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        alert("Topic added successfully!")
        router.push("/admin")
      } else {
        throw new Error("Failed to add topic")
      }
    } catch (error) {
      console.error("Error adding topic:", error)
      alert("Failed to add topic. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213874] mb-2">Add New Topic</h1>
          <p className="text-gray-600">Create a new educational topic for students</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#213874]" />
              Topic Information
            </CardTitle>
            <CardDescription>Fill in the details for the new topic</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Topic Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter topic title"
                    required
                  />
                </div>
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
                  placeholder="Enter topic description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <div className="border rounded-md">
                  <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => insertFormatting("bold")}
                      className="h-8"
                    >
                      <Bold className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => insertFormatting("italic")}
                      className="h-8"
                    >
                      <Italic className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => insertFormatting("link")}
                      className="h-8"
                    >
                      <Link className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => insertFormatting("image")}
                      className="h-8"
                    >
                      <ImageIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => insertFormatting("table")}
                      className="h-8"
                    >
                      <Table className="h-3 w-3" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => insertFormatting("list")}
                      className="h-8"
                    >
                      <List className="h-3 w-3" />
                    </Button>
                  </div>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Enter the main content of the topic. Use the toolbar above for formatting."
                    rows={12}
                    className="border-0 resize-none focus:ring-0"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Supports Markdown formatting. Use the toolbar buttons to insert formatting or type manually.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                  <Input
                    id="estimatedTime"
                    type="number"
                    value={formData.estimatedTime}
                    onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                    placeholder="e.g., 30"
                  />
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <Label>Prerequisites</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newPrerequisite}
                    onChange={(e) => setNewPrerequisite(e.target.value)}
                    placeholder="Add a prerequisite"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPrerequisite())}
                  />
                  <Button type="button" onClick={addPrerequisite} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span className="text-sm">{prereq}</span>
                      <Button
                        type="button"
                        onClick={() => removePrerequisite(index)}
                        size="icon"
                        variant="ghost"
                        className="h-4 w-4"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <Label>Learning Objectives</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    placeholder="Add a learning objective"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addObjective())}
                  />
                  <Button type="button" onClick={addObjective} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span className="text-sm">{objective}</span>
                      <Button
                        type="button"
                        onClick={() => removeObjective(index)}
                        size="icon"
                        variant="ghost"
                        className="h-4 w-4"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded">
                      <span className="text-sm text-blue-800">{tag}</span>
                      <Button
                        type="button"
                        onClick={() => removeTag(index)}
                        size="icon"
                        variant="ghost"
                        className="h-4 w-4"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="bg-[#213874] hover:bg-[#1a6ac3]">
                  {isLoading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Adding Topic...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Topic
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
