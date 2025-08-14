"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import { Heart, Users, Pill, BookOpen, Award, Edit, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function AdminCurriculumPage() {
  const { user } = useAuth()
  const params = useParams()
  const curriculumId = params.id as string

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

  const curriculumData = {
    medical: {
      title: "Medical Student Curriculum",
      description: "Comprehensive medical education covering all major systems",
      icon: Heart,
      color: "text-red-600",
      modules: [
        { id: 1, name: "Anatomy & Physiology", topics: 24, duration: "8 weeks", students: 456, avgProgress: 75 },
        { id: 2, name: "Pathology", topics: 18, duration: "6 weeks", students: 423, avgProgress: 45 },
        { id: 3, name: "Pharmacology", topics: 32, duration: "10 weeks", students: 398, avgProgress: 60 },
        { id: 4, name: "Clinical Medicine", topics: 28, duration: "12 weeks", students: 367, avgProgress: 30 },
        { id: 5, name: "Surgery", topics: 20, duration: "8 weeks", students: 234, avgProgress: 15 },
        { id: 6, name: "Pediatrics", topics: 16, duration: "6 weeks", students: 189, avgProgress: 0 },
      ],
    },
    nursing: {
      title: "Nursing Student Curriculum",
      description: "Patient-centered care and clinical nursing practices",
      icon: Users,
      color: "text-blue-600",
      modules: [
        { id: 1, name: "Fundamentals of Nursing", topics: 20, duration: "6 weeks", students: 312, avgProgress: 85 },
        { id: 2, name: "Medical-Surgical Nursing", topics: 26, duration: "8 weeks", students: 298, avgProgress: 55 },
        { id: 3, name: "Pediatric Nursing", topics: 18, duration: "6 weeks", students: 267, avgProgress: 40 },
        { id: 4, name: "Mental Health Nursing", topics: 14, duration: "5 weeks", students: 245, avgProgress: 25 },
        { id: 5, name: "Community Health", topics: 12, duration: "4 weeks", students: 198, avgProgress: 10 },
        { id: 6, name: "Critical Care", topics: 16, duration: "6 weeks", students: 156, avgProgress: 0 },
      ],
    },
    pharmacy: {
      title: "Pharmacy Student Curriculum",
      description: "Drug therapy and pharmaceutical sciences",
      icon: Pill,
      color: "text-green-600",
      modules: [
        { id: 1, name: "Pharmaceutical Chemistry", topics: 22, duration: "8 weeks", students: 234, avgProgress: 70 },
        { id: 2, name: "Pharmacology & Toxicology", topics: 28, duration: "10 weeks", students: 221, avgProgress: 50 },
        { id: 3, name: "Clinical Pharmacy", topics: 24, duration: "8 weeks", students: 198, avgProgress: 35 },
        { id: 4, name: "Pharmaceutical Technology", topics: 16, duration: "6 weeks", students: 167, avgProgress: 20 },
        { id: 5, name: "Pharmacoeconomics", topics: 12, duration: "4 weeks", students: 134, avgProgress: 5 },
        { id: 6, name: "Regulatory Affairs", topics: 10, duration: "3 weeks", students: 98, avgProgress: 0 },
      ],
    },
  }

  const currentCurriculum = curriculumData[curriculumId as keyof typeof curriculumData]

  if (!currentCurriculum) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Curriculum Not Found</h1>
          <p className="text-gray-600">The requested curriculum does not exist.</p>
        </div>
      </div>
    )
  }

  const CurriculumIcon = currentCurriculum.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
              <CurriculumIcon className={`w-6 h-6 ${currentCurriculum.color}`} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#213874]">{currentCurriculum.title}</h1>
              <p className="text-gray-600">{currentCurriculum.description}</p>
            </div>
            <Button className="bg-[#213874] hover:bg-[#1a6ac3]">
              <Plus className="w-4 h-4 mr-2" />
              Add Module
            </Button>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{currentCurriculum.modules.length} Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{currentCurriculum.modules.reduce((acc, mod) => acc + mod.students, 0)} Total Enrollments</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Admin Management</span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCurriculum.modules.map((module) => (
            <Card key={module.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-[#213874] group-hover:text-[#1a6ac3] transition-colors">
                      {module.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {module.topics} topics • {module.duration}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/module/${curriculumId}/${module.id}`}>
                        <Eye className="w-3 h-3" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-[#213874]">{module.students}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-[#213874]">{module.avgProgress}%</div>
                      <div className="text-xs text-gray-600">Avg. Progress</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Module Progress</span>
                      <span>{module.avgProgress}%</span>
                    </div>
                    <Progress value={module.avgProgress} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#213874] hover:bg-[#1a6ac3]" asChild>
                      <Link href={`/admin/module/${curriculumId}/${module.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AIHelper />
    </div>
  )
}
