"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { Heart, Users, Pill, BookOpen, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const { user } = useAuth()

  const courseData = {
    medical: {
      title: "Medical Student Curriculum",
      description: "Comprehensive medical education covering all major systems",
      icon: Heart,
      color: "text-red-600",
      modules: [
        { id: 1, name: "Anatomy & Physiology", progress: 75, topics: 24, duration: "8 weeks" },
        { id: 2, name: "Pathology", progress: 45, topics: 18, duration: "6 weeks" },
        { id: 3, name: "Pharmacology", progress: 60, topics: 32, duration: "10 weeks" },
        { id: 4, name: "Clinical Medicine", progress: 30, topics: 28, duration: "12 weeks" },
        { id: 5, name: "Surgery", progress: 15, topics: 20, duration: "8 weeks" },
        { id: 6, name: "Pediatrics", progress: 0, topics: 16, duration: "6 weeks" },
      ],
    },
    nursing: {
      title: "Nursing Student Curriculum",
      description: "Patient-centered care and clinical nursing practices",
      icon: Users,
      color: "text-blue-600",
      modules: [
        { id: 1, name: "Fundamentals of Nursing", progress: 85, topics: 20, duration: "6 weeks" },
        { id: 2, name: "Medical-Surgical Nursing", progress: 55, topics: 26, duration: "8 weeks" },
        { id: 3, name: "Pediatric Nursing", progress: 40, topics: 18, duration: "6 weeks" },
        { id: 4, name: "Mental Health Nursing", progress: 25, topics: 14, duration: "5 weeks" },
        { id: 5, name: "Community Health", progress: 10, topics: 12, duration: "4 weeks" },
        { id: 6, name: "Critical Care", progress: 0, topics: 16, duration: "6 weeks" },
      ],
    },
    pharmacy: {
      title: "Pharmacy Student Curriculum",
      description: "Drug therapy and pharmaceutical sciences",
      icon: Pill,
      color: "text-green-600",
      modules: [
        { id: 1, name: "Pharmaceutical Chemistry", progress: 70, topics: 22, duration: "8 weeks" },
        { id: 2, name: "Pharmacology & Toxicology", progress: 50, topics: 28, duration: "10 weeks" },
        { id: 3, name: "Clinical Pharmacy", progress: 35, topics: 24, duration: "8 weeks" },
        { id: 4, name: "Pharmaceutical Technology", progress: 20, topics: 16, duration: "6 weeks" },
        { id: 5, name: "Pharmacoeconomics", progress: 5, topics: 12, duration: "4 weeks" },
        { id: 6, name: "Regulatory Affairs", progress: 0, topics: 10, duration: "3 weeks" },
      ],
    },
  }

  const currentCourse = user?.field ? courseData[user.field] : courseData.medical
  const CourseIcon = currentCourse.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
              <CourseIcon className={`w-6 h-6 ${currentCourse.color}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#213874]">{currentCourse.title}</h1>
              <p className="text-gray-600">{currentCourse.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{currentCourse.modules.length} Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Self-paced learning</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Earn certificates</span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourse.modules.map((module) => (
            <Link key={module.id} href={`/module/${user?.field || "medical"}/${module.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                {/* Rest of the card content remains the same */}
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
                    <Badge
                      variant={module.progress > 0 ? "default" : "secondary"}
                      className={module.progress > 0 ? "bg-[#213874]" : ""}
                    >
                      {module.progress > 0 ? `${module.progress}%` : "New"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {Math.floor(module.topics * (module.progress / 100))} of {module.topics} completed
                      </span>
                      {module.progress === 100 && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Complete
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Course Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Completion</span>
                  <span>42%</span>
                </div>
                <Progress value={42} className="h-2" />
                <p className="text-xs text-gray-600 mt-2">Keep going! You're making great progress.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f3ab1b] mb-2">7</div>
                <p className="text-sm text-gray-600">Days in a row</p>
                <Badge className="mt-2 bg-[#f3ab1b] text-[#213874]">On Fire! 🔥</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Next Milestone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">Complete Pathology Module</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-gray-600 mt-2">10 more topics to unlock the next badge!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AIHelper />
    </div>
  )
}
