import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, this would be a proper database
const articles: any[] = [
  {
    id: 1,
    title: "Recent Advances in Cardiac Surgery",
    author: "Dr. Sarah Johnson",
    category: "Cardiology",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "COVID-19 and Respiratory Complications",
    author: "Dr. Michael Chen",
    category: "Pulmonology",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Pediatric Drug Dosing Guidelines",
    author: "Dr. Emily Rodriguez",
    category: "Pediatrics",
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const articleData = {
      id: articles.length + 1,
      ...data,
      keywords: data.keywords.split(",").map((k: string) => k.trim()),
      references: data.references.split("\n").filter((r: string) => r.trim()),
      createdAt: new Date().toISOString(),
      views: 0,
      rating: 0,
      totalRatings: 0,
    }

    articles.push(articleData)

    return NextResponse.json({ success: true, article: articleData })
  } catch (error) {
    console.error("Articles API Error:", error)
    return NextResponse.json({ error: "Failed to add article" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Articles API Error:", error)
    return NextResponse.json({ error: "Failed to get articles" }, { status: 500 })
  }
}
