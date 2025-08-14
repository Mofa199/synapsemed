import { type NextRequest, NextResponse } from "next/server"

// Mock database for topics
const topics: any[] = [
  {
    id: "1",
    title: "Introduction to Anatomy",
    category: "anatomy",
    description: "Basic introduction to human anatomy",
    content: "Comprehensive overview of human body systems...",
    difficulty: "beginner",
    estimatedTime: 45,
    prerequisites: [],
    learningObjectives: ["Understand basic anatomy", "Identify major body systems"],
    tags: ["anatomy", "basics", "introduction"],
    coverImage: "/placeholder.jpg",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(topics)
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const newTopic = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      difficulty: formData.get("difficulty") as string,
      estimatedTime: Number.parseInt(formData.get("estimatedTime") as string) || 0,
      prerequisites: JSON.parse((formData.get("prerequisites") as string) || "[]"),
      learningObjectives: JSON.parse((formData.get("learningObjectives") as string) || "[]"),
      tags: JSON.parse((formData.get("tags") as string) || "[]"),
      coverImage: formData.get("coverImage") ? "/placeholder.jpg" : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    topics.push(newTopic)

    return NextResponse.json(newTopic, { status: 201 })
  } catch (error) {
    console.error("Error creating topic:", error)
    return NextResponse.json({ error: "Failed to create topic" }, { status: 500 })
  }
}
