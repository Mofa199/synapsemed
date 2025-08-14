"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Save } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AddModulePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const curriculumId = params.id as string

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "",
    prerequisites: [] as string[],
    learningObjectives: [] as string[],
    tags: [] as string[],
    content: "",
    coverImage: null as File | null,
  })

  const [newPrerequisite, setNewPrerequisite] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [newTag, setNewTag] = useState("")

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

    try {
      const moduleData = new FormData()
      moduleData.append("title", formData.title)
      moduleData.append("description", formData.description)
      moduleData.append("duration", formData.duration)
      moduleData.append("difficulty", formData.difficulty)
      moduleData.append("prerequisites", JSON.stringify(formData.prerequisites))
      moduleData.append("learningObjectives", JSON.stringify(formData.learningObjectives))
      moduleData.append("tags", JSON.stringify(formData.tags))
      moduleData.append("content", formData.content)
      moduleData.append("curriculumId", curriculumId)

      if (formData.coverImage) {
        moduleData.append("coverImage", formData.coverImage)
      }

      const response = await fetch(`/api/admin/curriculum/${curriculumId}/modules`, {
        method: "POST",
        body: moduleData,
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Module created successfully!",
        })
        router.push(`/admin/curriculum/${curriculumId}/modules`)
      } else {
        throw new Error("Failed to create module")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create module. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href={`/admin/curriculum/${curriculumId}/modules`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Modules
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Module</h1>
        <p className="text-gray-600 mt-2">Create a new learning module for this curriculum</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic details for the module</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Module Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Introduction to Cardiology"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 2 weeks, 10 hours"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this module covers..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level *</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    coverImage: e.target.files?.[0] || null,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
            <CardDescription>Add any prerequisites for this module</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newPrerequisite}
                onChange={(e) => setNewPrerequisite(e.target.value)}
                placeholder="Enter prerequisite..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPrerequisite())}
              />
              <Button type="button" onClick={addPrerequisite} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.prerequisites.map((prerequisite, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {prerequisite}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removePrerequisite(index)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Objectives</CardTitle>
            <CardDescription>Define what students will learn in this module</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                placeholder="Enter learning objective..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addObjective())}
              />
              <Button type="button" onClick={addObjective} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.learningObjectives.map((objective, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{objective}</span>
                  <X className="w-4 h-4 cursor-pointer text-red-500" onClick={() => removeObjective(index)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Add tags to help categorize this module</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tag..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(index)} />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Module Content</CardTitle>
            <CardDescription>Add the main content for this module</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Enter the module content here..."
                rows={10}
                required
              />
              <p className="text-sm text-gray-500">You can use markdown formatting for rich text content.</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/admin/curriculum/${curriculumId}/modules`)}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Create Module
          </Button>
        </div>
      </form>
    </div>
  )
}
