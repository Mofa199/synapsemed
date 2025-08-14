export async function GET() {
  try {
    // Mock users data - replace with real database queries
    const users = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@synapsemed.com",
        role: "instructor",
        coursesEnrolled: 5,
        createdAt: "2024-01-15T10:00:00Z",
      },
      {
        id: 2,
        name: "Medical Student",
        email: "medical@synapsemed.com",
        role: "student",
        coursesEnrolled: 12,
        createdAt: "2024-02-01T10:00:00Z",
      },
      {
        id: 3,
        name: "Nursing Student",
        email: "nursing@synapsemed.com",
        role: "student",
        coursesEnrolled: 8,
        createdAt: "2024-02-01T10:00:00Z",
      },
      {
        id: 4,
        name: "Pharmacy Student",
        email: "pharmacy@synapsemed.com",
        role: "student",
        coursesEnrolled: 10,
        createdAt: "2024-02-01T10:00:00Z",
      },
      {
        id: 5,
        name: "Admin User",
        email: "admin@synapsemed.com",
        role: "admin",
        coursesEnrolled: 0,
        createdAt: "2024-01-01T10:00:00Z",
      },
    ]

    return Response.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return Response.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
