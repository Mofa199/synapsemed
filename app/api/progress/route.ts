import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, this would be a proper database
const userProgress: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const { userId, topicId, completed, points } = await request.json()

    if (!userProgress[userId]) {
      userProgress[userId] = {
        completedTopics: [],
        totalPoints: 0,
        level: 1,
      }
    }

    if (completed && !userProgress[userId].completedTopics.includes(topicId)) {
      userProgress[userId].completedTopics.push(topicId)
      userProgress[userId].totalPoints += points

      // Level up logic
      const newLevel = Math.floor(userProgress[userId].totalPoints / 100) + 1
      userProgress[userId].level = newLevel
    }

    return NextResponse.json({
      success: true,
      progress: userProgress[userId],
    })
  } catch (error) {
    console.error("Progress API Error:", error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const progress = userProgress[userId] || {
      completedTopics: [],
      totalPoints: 0,
      level: 1,
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Progress API Error:", error)
    return NextResponse.json({ error: "Failed to get progress" }, { status: 500 })
  }
}
