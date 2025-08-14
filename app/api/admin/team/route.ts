import { type NextRequest, NextResponse } from "next/server"

// Mock team members data
const mockTeamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    position: "Medical Director",
    department: "Medical",
    email: "sarah.johnson@synapsemed.com",
    phone: "+1 (555) 123-4567",
    bio: "Leading medical educator with 15+ years of experience in curriculum development.",
    expertise: "Cardiology, Medical Education",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    position: "Head of Research",
    department: "Research",
    email: "michael.chen@synapsemed.com",
    phone: "+1 (555) 234-5678",
    bio: "Research scientist specializing in AI applications in medical education.",
    expertise: "AI/ML, Educational Technology",
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    position: "Curriculum Specialist",
    department: "Education",
    email: "emily.rodriguez@synapsemed.com",
    phone: "+1 (555) 345-6789",
    bio: "Expert in medical curriculum design and assessment methodologies.",
    expertise: "Curriculum Design, Assessment",
    createdAt: "2024-02-15T00:00:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      teamMembers: mockTeamMembers,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const newMember = {
      id: mockTeamMembers.length + 1,
      name: formData.get("name") as string,
      position: formData.get("position") as string,
      department: formData.get("department") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      bio: formData.get("bio") as string,
      expertise: formData.get("expertise") as string,
      linkedin: formData.get("linkedin") as string,
      createdAt: new Date().toISOString(),
    }

    // In a real app, save to database
    mockTeamMembers.push(newMember)

    return NextResponse.json({
      success: true,
      message: "Team member added successfully",
      teamMember: newMember,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add team member" }, { status: 500 })
  }
}
