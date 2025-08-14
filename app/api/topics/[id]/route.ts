import { type NextRequest, NextResponse } from "next/server"

// Mock topics data - replace with real database
const topics: Record<string, any> = {
  cardiovascular: {
    id: "cardiovascular",
    title: "Cardiovascular System",
    description: "Comprehensive study of the heart and circulatory system",
    category: "Medical",
    difficulty: "Intermediate",
    duration: "2 hours",
    progress: 0,
    prerequisites: ["Basic Anatomy", "Physiology Fundamentals"],
    learningObjectives: [
      "Understand cardiac anatomy and physiology",
      "Analyze cardiovascular pathophysiology",
      "Apply knowledge in clinical scenarios",
      "Interpret diagnostic tests and imaging",
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const topicId = params.id
    const topic = topics[topicId]

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 })
    }

    return NextResponse.json({ topic })
  } catch (error) {
    console.error("Topics API Error:", error)
    return NextResponse.json({ error: "Failed to get topic" }, { status: 500 })
  }
}
