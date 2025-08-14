"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider"
import { Heart, Users, Pill, BookOpen, UserCheck, TrendingUp, Award, Settings, Plus, FileText } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { user } = useAuth()

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  const curriculums = [
    {
      id: "medical",
      title: "Medical Student Curriculum",
      description: "Comprehensive medical education covering all major systems",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      students: 1247,
      modules: 6,
      completion: 68,
    },
    {
      id: "nursing",
      title: "Nursing Student Curriculum",
      description: "Patient-centered care and clinical nursing practices",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      students: 892,
      modules: 6,
      completion: 72,
    },
    {
      id: "pharmacy",
      title: "Pharmacy Student Curriculum",
      description: "Drug therapy and pharmaceutical sciences",
      icon: Pill,
      color: "text-green-600",
      bgColor: "bg-green-100",
      students: 634,
      modules: 6,
      completion: 65,
    },
  ]

  const stats = [
    { title: "Total Students", value: "2,773", icon: UserCheck, change: "+12%" },
    { title: "Active Courses", value: "18", icon: BookOpen, change: "+2" },
    { title: "Completion Rate", value: "68%", icon: TrendingUp, change: "+5%" },
    { title: "Total Badges", value: "156", icon: Award, change: "+8" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213874] mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage curricula, monitor student progress, and oversee platform content</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-[#213874]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#213874]">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="curricula" className="space-y-6">
          <TabsList>
            <TabsTrigger value="curricula">Curricula Management</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="partners">Partners & Team</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="curricula" className="space-y-6">
            {/* Curricula Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {curriculums.map((curriculum) => (
                <Link key={curriculum.id} href={`/admin/curriculum/${curriculum.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-lg ${curriculum.bgColor} flex items-center justify-center`}>
                          <curriculum.icon className={`w-6 h-6 ${curriculum.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-[#213874] group-hover:text-[#1a6ac3]">
                            {curriculum.title}
                          </CardTitle>
                          <CardDescription className="mt-1">{curriculum.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-[#213874]">{curriculum.students}</div>
                            <div className="text-xs text-gray-600">Students</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-[#213874]">{curriculum.modules}</div>
                            <div className="text-xs text-gray-600">Modules</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-[#213874]">{curriculum.completion}%</div>
                            <div className="text-xs text-gray-600">Avg. Completion</div>
                          </div>
                        </div>
                        <Button className="w-full bg-[#213874] hover:bg-[#1a6ac3]">Manage Curriculum</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/admin/content/topics/add">
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="text-center">
                    <Settings className="w-8 h-8 text-[#213874] mx-auto mb-2" />
                    <CardTitle className="text-lg">Topics</CardTitle>
                    <CardDescription>24 topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Topic
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/content/books/add">
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="text-center">
                    <BookOpen className="w-8 h-8 text-[#213874] mx-auto mb-2" />
                    <CardTitle className="text-lg">Books</CardTitle>
                    <CardDescription>2,847 books</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Book
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/content/articles/add">
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="text-center">
                    <FileText className="w-8 h-8 text-[#213874] mx-auto mb-2" />
                    <CardTitle className="text-lg">Articles</CardTitle>
                    <CardDescription>15,632 articles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Article
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/content/drugs/add">
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="text-center">
                    <Pill className="w-8 h-8 text-[#213874] mx-auto mb-2" />
                    <CardTitle className="text-lg">Drugs</CardTitle>
                    <CardDescription>1,234 drugs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Drug
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/content/badges/add">
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="text-center">
                    <Award className="w-8 h-8 text-[#213874] mx-auto mb-2" />
                    <CardTitle className="text-lg">Badges</CardTitle>
                    <CardDescription>156 badges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Badge
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/admin/users">
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="text-center">
                    <Users className="w-8 h-8 text-[#213874] mx-auto mb-2" />
                    <CardTitle className="text-lg">Manage Users</CardTitle>
                    <CardDescription>Add, edit, and remove users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-[#213874] hover:bg-[#1a6ac3]">Manage Users</Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/admin/partners">
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="text-center">
                    <Heart className="w-8 h-8 text-[#213874] mx-auto mb-2" />
                    <CardTitle className="text-lg">Partners</CardTitle>
                    <CardDescription>Manage institutional partners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-[#213874] hover:bg-[#1a6ac3]">Manage Partners</Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/team">
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardHeader className="text-center">
                    <Users className="w-8 h-8 text-[#213874] mx-auto mb-2" />
                    <CardTitle className="text-lg">Team Members</CardTitle>
                    <CardDescription>Manage team and staff</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-[#213874] hover:bg-[#1a6ac3]">Manage Team</Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Engagement</CardTitle>
                  <CardDescription>Daily active users over the past month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Analytics Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Completion Rates</CardTitle>
                  <CardDescription>Completion rates by curriculum</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {curriculums.map((curriculum) => (
                      <div key={curriculum.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <curriculum.icon className={`w-4 h-4 ${curriculum.color}`} />
                          <span className="text-sm font-medium">{curriculum.title}</span>
                        </div>
                        <Badge variant="outline">{curriculum.completion}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AIHelper />
    </div>
  )
}
