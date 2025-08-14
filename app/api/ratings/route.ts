import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, this would be a proper database
const ratings: Record<string, any[]> = {}

export async function POST(request: NextRequest) {
  try {
    const { userId, topicId, rating } = await request.json()

    if (!ratings[topicId]) {
      ratings[topicId] = []
    }

    // Remove existing rating from this user
    ratings[topicId] = ratings[topicId].filter((r) => r.userId !== userId)

    // Add new rating
    ratings[topicId].push({
      userId,
      rating,
      timestamp: new Date().toISOString(),
    })

    // Calculate average rating
    const avgRating = ratings[topicId].reduce((sum, r) => sum + r.rating, 0) / ratings[topicId].length

    return NextResponse.json({
      success: true,
      averageRating: avgRating,
      totalRatings: ratings[topicId].length,
    })
  } catch (error) {
    console.error("Ratings API Error:", error)
    return NextResponse.json({ error: "Failed to submit rating" }, { status: 500 })
  }
}
