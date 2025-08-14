import { NextResponse } from "next/server"

// Mock analytics data - in real app, this would come from database
const analyticsData = {
  overview: {
    totalUsers: 1247,
    activeUsers: 892,
    totalCourses: 45,
    completionRate: 78.5,
    averageScore: 85.2,
    totalContent: 1250,
  },
  userGrowth: [
    { month: "Jan", users: 800, active: 650 },
    { month: "Feb", users: 920, active: 720 },
    { month: "Mar", users: 1050, active: 810 },
    { month: "Apr", users: 1180, active: 850 },
    { month: "May", users: 1247, active: 892 },
  ],
  courseProgress: [
    { course: "Anatomy", completed: 85, inProgress: 12, notStarted: 3 },
    { course: "Physiology", completed: 72, inProgress: 18, notStarted: 10 },
    { course: "Pathology", completed: 68, inProgress: 22, notStarted: 10 },
    { course: "Pharmacology", completed: 75, inProgress: 15, notStarted: 10 },
  ],
  topContent: [
    { title: "Cardiovascular System", views: 2450, rating: 4.8 },
    { title: "Respiratory Pathology", views: 2100, rating: 4.7 },
    { title: "Drug Interactions", views: 1890, rating: 4.6 },
    { title: "Cardiac Arrhythmias", views: 1750, rating: 4.9 },
    { title: "Anatomy Basics", views: 1650, rating: 4.5 },
  ],
  recentActivity: [
    { user: "John Doe", action: "Completed", content: "Anatomy Module 1", time: "2 hours ago" },
    { user: "Jane Smith", action: "Started", content: "Pharmacology Quiz", time: "3 hours ago" },
    { user: "Mike Johnson", action: "Earned", content: "Quiz Master Badge", time: "5 hours ago" },
    { user: "Sarah Wilson", action: "Completed", content: "Pathology Article", time: "6 hours ago" },
    { user: "David Brown", action: "Started", content: "Cardiology Course", time: "8 hours ago" },
  ],
  contentStats: {
    articles: 245,
    books: 89,
    videos: 156,
    quizzes: 78,
    cases: 34,
  },
  userEngagement: [
    { day: "Mon", sessions: 450, duration: 35 },
    { day: "Tue", sessions: 520, duration: 42 },
    { day: "Wed", sessions: 480, duration: 38 },
    { day: "Thu", sessions: 610, duration: 45 },
    { day: "Fri", sessions: 580, duration: 40 },
    { day: "Sat", sessions: 320, duration: 28 },
    { day: "Sun", sessions: 280, duration: 25 },
  ],
}

export async function GET() {
  try {
    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Analytics API Error:", error)
    return NextResponse.json({ error: "Failed to get analytics data" }, { status: 500 })
  }
}
