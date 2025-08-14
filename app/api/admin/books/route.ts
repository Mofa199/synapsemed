import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, this would be a proper database
const books: any[] = [
  {
    id: 1,
    title: "Gray's Anatomy for Students",
    author: "Richard Drake",
    category: "Anatomy",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Robbins Basic Pathology",
    author: "Vinay Kumar",
    category: "Pathology",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Pharmacology for Nursing Care",
    author: "Richard A. Lehne",
    category: "Pharmacology",
    createdAt: new Date().toISOString(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const bookData = {
      id: books.length + 1,
      title: formData.get("title"),
      author: formData.get("author"),
      category: formData.get("category"),
      description: formData.get("description"),
      publisher: formData.get("publisher"),
      edition: formData.get("edition"),
      isbn: formData.get("isbn"),
      language: formData.get("language"),
      publicationDate: formData.get("publicationDate"),
      pages: Number.parseInt(formData.get("pages") as string) || 0,
      coverImage: formData.get("coverImage"), // In real app, would upload to storage
      pdfFile: formData.get("pdfFile"), // In real app, would upload to storage
      createdAt: new Date().toISOString(),
    }

    books.push(bookData)

    return NextResponse.json({ success: true, book: bookData })
  } catch (error) {
    console.error("Books API Error:", error)
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ books })
  } catch (error) {
    console.error("Books API Error:", error)
    return NextResponse.json({ error: "Failed to get books" }, { status: 500 })
  }
}
