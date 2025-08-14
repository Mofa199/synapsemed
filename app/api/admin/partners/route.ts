export async function GET() {
  try {
    // Mock partners data - replace with real database queries
    const partners = [
      {
        id: 1,
        name: "Johns Hopkins Medicine",
        description: "Leading academic medical institution",
        logo: "/johns-hopkins-medicine-logo.png",
        website: "https://www.hopkinsmedicine.org",
        createdAt: "2024-01-01T10:00:00Z",
      },
      {
        id: 2,
        name: "Mayo Clinic",
        description: "World-renowned medical center",
        logo: "/mayo-clinic-logo.png",
        website: "https://www.mayoclinic.org",
        createdAt: "2024-01-01T10:00:00Z",
      },
      {
        id: 3,
        name: "Harvard Medical School",
        description: "Premier medical education institution",
        logo: "/harvard-medical-school-logo.png",
        website: "https://hms.harvard.edu",
        createdAt: "2024-01-01T10:00:00Z",
      },
      {
        id: 4,
        name: "Cleveland Clinic",
        description: "Innovative healthcare provider",
        logo: "/cleveland-clinic-logo.png",
        website: "https://my.clevelandclinic.org",
        createdAt: "2024-01-01T10:00:00Z",
      },
    ]

    return Response.json({ partners })
  } catch (error) {
    console.error("Error fetching partners:", error)
    return Response.json({ error: "Failed to fetch partners" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const website = formData.get("website") as string
    const logo = formData.get("logo") as File

    // Mock creation - replace with real database insert
    const newPartner = {
      id: Date.now(),
      name,
      description,
      website,
      logo: logo ? `/uploads/${logo.name}` : null,
      createdAt: new Date().toISOString(),
    }

    return Response.json({ partner: newPartner })
  } catch (error) {
    console.error("Error creating partner:", error)
    return Response.json({ error: "Failed to create partner" }, { status: 500 })
  }
}
