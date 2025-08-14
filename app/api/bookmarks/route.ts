import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, this would be a proper database
const bookmarks: Record<string, string[]> = {}

export async function POST(request: NextRequest) {
  try {
    const { userId, type, itemId, bookmarked } = await request.json()

    if (!bookmarks[userId]) {
      bookmarks[userId] = []
    }

    const bookmarkKey = `${type}:${itemId}`

    if (bookmarked) {
      if (!bookmarks[userId].includes(bookmarkKey)) {
        bookmarks[userId].push(bookmarkKey)
      }
    } else {
      bookmarks[userId] = bookmarks[userId].filter((b) => b !== bookmarkKey)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Bookmarks API Error:", error)
    return NextResponse.json({ error: "Failed to update bookmark" }, { status: 500 })
  }
}
