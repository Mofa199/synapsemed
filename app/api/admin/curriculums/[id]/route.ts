export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Mock curriculum data - replace with real database query
    const curriculum = {
      id: Number.parseInt(params.id),
      title: params.id === "1" ? "Medical Foundation" : params.id === "2" ? "Nursing Essentials" : "Pharmacy Practice",
      description:
        params.id === "1"
          ? "Core medical knowledge and fundamentals"
          : params.id === "2"
            ? "Essential nursing skills and patient care"
            : "Pharmaceutical knowledge and drug interactions",
      category: params.id === "1" ? "Medicine" : params.id === "2" ? "Nursing" : "Pharmacy",
      duration: params.id === "1" ? "12 weeks" : params.id === "2" ? "10 weeks" : "14 weeks",
      enrolledCount: params.id === "1" ? 245 : params.id === "2" ? 189 : 156,
      createdAt: new Date().toISOString(),
    }

    return Response.json({ curriculum })
  } catch (error) {
    console.error("Error fetching curriculum:", error)
    return Response.json({ error: "Failed to fetch curriculum" }, { status: 500 })
  }
}
