import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, this would be a proper database
const badges: any[] = [
  {
    id: 1,
    name: "Quiz Master",
    description: "Complete 10 quizzes with 90% or higher score",
    icon: "trophy",
    color: "#f3ab1b",
    requirements: {
      type: "quiz_completion",
      count: 10,
      minScore: 90,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Anatomy Expert",
    description: "Complete all anatomy modules",
    icon: "award",
    color: "#213874",
    requirements: {
      type: "module_completion",
      category: "anatomy",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Study Streak",
    description: "Study for 7 consecutive days",
    icon: "calendar",
    color: "#10b981",
    requirements: {
      type: "daily_streak",
      count: 7,
    },
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const badgeData = {
      id: badges.length + 1,
      name: data.name,
      description: data.description,
      icon: data.icon,
      color: data.color,
      requirements: {
        type: data.requirementType,
        count: data.requirementCount ? Number.parseInt(data.requirementCount) : undefined,
        category: data.requirementCategory,
        minScore: data.requirementMinScore ? Number.parseInt(data.requirementMinScore) : undefined,
      },
      createdAt: new Date().toISOString(),
    }

    badges.push(badgeData)

    return NextResponse.json({ success: true, badge: badgeData })
  } catch (error) {
    console.error("Badges API Error:", error)
    return NextResponse.json({ error: "Failed to add badge" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ badges })
  } catch (error) {
    console.error("Badges API Error:", error)
    return NextResponse.json({ error: "Failed to get badges" }, { status: 500 })
  }
}
