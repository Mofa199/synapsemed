import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, this would be a proper database
const mockData = {
  books: [
    { id: 1, title: "Gray's Anatomy for Students", author: "Richard Drake", category: "Anatomy", type: "book" },
    { id: 2, title: "Robbins Basic Pathology", author: "Vinay Kumar", category: "Pathology", type: "book" },
    {
      id: 3,
      title: "Pharmacology for Nursing Care",
      author: "Richard A. Lehne",
      category: "Pharmacology",
      type: "book",
    },
  ],
  articles: [
    {
      id: 1,
      title: "Recent Advances in Cardiac Surgery",
      author: "Dr. Sarah Johnson",
      category: "Cardiology",
      type: "article",
    },
    {
      id: 2,
      title: "COVID-19 and Respiratory Complications",
      author: "Dr. Michael Chen",
      category: "Pulmonology",
      type: "article",
    },
    {
      id: 3,
      title: "Pediatric Drug Dosing Guidelines",
      author: "Dr. Emily Rodriguez",
      category: "Pediatrics",
      type: "article",
    },
  ],
  drugs: [
    { id: 1, name: "Aspirin", class: "NSAIDs", category: "Pain Relief", type: "drug" },
    { id: 2, name: "Metformin", class: "Antidiabetic", category: "Diabetes", type: "drug" },
    { id: 3, name: "Lisinopril", class: "ACE Inhibitor", category: "Cardiovascular", type: "drug" },
  ],
  topics: [
    { id: 1, title: "Introduction to Human Anatomy", category: "Anatomy", difficulty: "Beginner", type: "topic" },
    {
      id: 2,
      title: "Cardiovascular System Overview",
      category: "Cardiology",
      difficulty: "Intermediate",
      type: "topic",
    },
    { id: 3, title: "Pharmacokinetics Fundamentals", category: "Pharmacology", difficulty: "Advanced", type: "topic" },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""
    const type = searchParams.get("type") || "all"
    const category = searchParams.get("category") || "all"

    let results: any[] = []

    // Search across all data types
    Object.entries(mockData).forEach(([dataType, items]) => {
      if (type === "all" || type === dataType.slice(0, -1)) {
        // Remove 's' from plural
        const filteredItems = items.filter((item: any) => {
          const matchesQuery =
            item.title?.toLowerCase().includes(query) ||
            item.name?.toLowerCase().includes(query) ||
            item.author?.toLowerCase().includes(query) ||
            item.class?.toLowerCase().includes(query) ||
            item.category?.toLowerCase().includes(query)

          const matchesCategory = category === "all" || item.category?.toLowerCase() === category.toLowerCase()

          return matchesQuery && matchesCategory
        })

        results = [...results, ...filteredItems]
      }
    })

    // Sort by relevance (simple scoring based on title/name match)
    results.sort((a, b) => {
      const aTitle = (a.title || a.name || "").toLowerCase()
      const bTitle = (b.title || b.name || "").toLowerCase()
      const aScore = aTitle.includes(query) ? 1 : 0
      const bScore = bTitle.includes(query) ? 1 : 0
      return bScore - aScore
    })

    return NextResponse.json({ results: results.slice(0, 20) }) // Limit to 20 results
  } catch (error) {
    console.error("Search API Error:", error)
    return NextResponse.json({ error: "Failed to process search request" }, { status: 500 })
  }
}
