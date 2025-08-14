"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { Search, Plus, BookOpen, Clock, Edit, Trash2, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function CurriculumModulesPage() {
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [curriculum, setCurriculum] = useState<any>(null)
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role !== "admin") {
      window.location.href = "/admin"
      return
    }
    fetchCurriculumAndModules()
  }, [user, params.id])

  const fetchCurriculumAndModules = async () => {
    try {
      const [curriculumRes, modulesRes] = await Promise.all([
        fetch(`/api/admin/curriculums/${params.id}`),
        fetch(`/api/admin/curriculums/${params.id}/modules`),
      ])

      const curriculumData = await curriculumRes.json()
      const modulesData = await modulesRes.json()

      setCurriculum(curriculumData.curriculum)
      setModules(modulesData.modules || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (user?.role !== "admin") {
    return null
  }

  const filteredModules = modules.filter(
    (module: any) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/curriculum")}
          className="mb-6 text-[#213874] hover:bg-[#213874]/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Curriculums
        </Button>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#213874] mb-2">{curriculum?.title || "Curriculum"} - Modules</h1>
            <p className="text-gray-600">Manage modules for this curriculum</p>
          </div>
          <Link href={`/admin/curriculum/${params.id}/modules/add`}>
            <Button className="bg-[#213874] hover:bg-[#1a6ac3]">
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Modules Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module: any, index) => (
              <Card key={module.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">Module {index + 1}</Badge>
                        <Badge variant="outline">{module.type || "Lecture"}</Badge>
                      </div>
                      <CardTitle className="text-lg text-[#213874] mb-2">{module.title}</CardTitle>
                      <CardDescription className="text-sm">{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {module.duration || "30 min"}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {module.lessonsCount || 0} lessons
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/admin/curriculum/${params.id}/modules/${module.id}/edit`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredModules.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No modules found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first module"}
            </p>
            <Link href={`/admin/curriculum/${params.id}/modules/add`}>
              <Button className="bg-[#213874] hover:bg-[#1a6ac3]">
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
