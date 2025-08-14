"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import { Clock, Award, Star, Play, Users, Trophy } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ModulePage() {
  const { user } = useAuth()
  const params = useParams()
  const field = params.field as string
  const moduleId = params.id as string

  // Sample topics data based on module
  const moduleData = {
    1: {
      name: "Anatomy & Physiology",
      description: "Comprehensive study of human anatomy and physiological processes",
      topics: [
        {
          id: 1,
          title: "Introduction to Human Anatomy",
          type: "Video",
          duration: "45 min",
          difficulty: "Beginner",
          completed: true,
          points: 25,
        },
        {
          id: 2,
          title: "Cardiovascular System Overview",
          type: "Interactive",
          duration: "60 min",
          difficulty: "Intermediate",
          completed: true,
          points: 30,
        },
        {
          id: 3,
          title: "Heart Anatomy 3D Model",
          type: "3D Model",
          duration: "30 min",
          difficulty: "Intermediate",
          completed: false,
          points: 35,
        },
        {
          id: 4,
          title: "Blood Circulation Pathways",
          type: "Article",
          duration: "25 min",
          difficulty: "Beginner",
          completed: false,
          points: 20,
        },
        {
          id: 5,
          title: "Cardiac Cycle Mechanics",
          type: "Simulation",
          duration: "40 min",
          difficulty: "Advanced",
          completed: false,
          points: 40,
        },
        {
          id: 6,
          title: "ECG Interpretation Basics",
          type: "Quiz",
          duration: "20 min",
          difficulty: "Intermediate",
          completed: false,
          points: 25,
        },
      ],
    },
    2: {
      name: "Pathology",
      description: "Study of disease processes and their effects on the human body",
      topics: [
        {
          id: 7,
          title: "Introduction to Pathology",
          type: "Video",
          duration: "50 min",
          difficulty: "Beginner",
          completed: true,
          points: 25,
        },
        {
          id: 8,
          title: "Cellular Injury and Death",
          type: "Interactive",
          duration: "45 min",
          difficulty: "Intermediate",
          completed: false,
          points: 30,
        },
        {
          id: 9,
          title: "Inflammation Process",
          type: "Article",
          duration: "35 min",
          difficulty: "Intermediate",
          completed: false,
          points: 25,
        },
        {
          id: 10,
          title: "Neoplasia Fundamentals",
          type: "Video",
          duration: "55 min",
          difficulty: "Advanced",
          completed: false,
          points: 35,
        },
        {
          id: 11,
          title: "Cardiovascular Pathology",
          type: "Case Study",
          duration: "40 min",
          difficulty: "Advanced",
          completed: false,
          points: 40,
        },
        {
          id: 12,
          title: "Pathology Quiz",
          type: "Quiz",
          duration: "30 min",
          difficulty: "Intermediate",
          completed: false,
          points: 30,
        },
      ],
    },
  }

  const currentModule = moduleData[moduleId as keyof typeof moduleData] || moduleData[1]
  const completedTopics = currentModule.topics.filter((topic) => topic.completed).length
  const totalPoints = currentModule.topics.reduce((acc, topic) => acc + (topic.completed ? topic.points : 0), 0)
  const progress = Math.round((completedTopics / currentModule.topics.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#213874]">{currentModule.name}</h1>
              <p className="text-gray-600">{currentModule.description}</p>
            </div>
            <Badge className="bg-[#f3ab1b] text-[#213874]">{progress}% Complete</Badge>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#213874] mb-2">{progress}%</div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#213874]">
                  {completedTopics}/{currentModule.topics.length}
                </div>
                <p className="text-xs text-gray-600">Topics finished</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#213874]">{totalPoints}</div>
                <p className="text-xs text-gray-600">Total points</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#213874]">{Math.round((completedTopics * 45) / 60)}h</div>
                <p className="text-xs text-gray-600">Study time</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentModule.topics.map((topic) => (
            <Link key={topic.id} href={`/topic/${topic.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{topic.type}</Badge>
                        <Badge variant="outline">{topic.difficulty}</Badge>
                        {topic.completed && <Badge className="bg-green-100 text-green-700">✓</Badge>}
                      </div>
                      <CardTitle className="text-lg text-[#213874] group-hover:text-[#1a6ac3] transition-colors">
                        {topic.title}
                      </CardTitle>
                    </div>
                    {topic.type === "Video" && (
                      <div className="w-10 h-10 bg-[#213874]/10 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-[#213874]" />
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{topic.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{topic.points} pts</span>
                      </div>
                    </div>

                    <Button
                      className={`w-full ${
                        topic.completed ? "bg-green-600 hover:bg-green-700" : "bg-[#213874] hover:bg-[#1a6ac3]"
                      }`}
                    >
                      {topic.completed ? "Review Topic" : "Start Topic"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Gamification Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#f3ab1b]" />
                Module Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f3ab1b] rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-[#213874]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">First Steps</p>
                      <p className="text-xs text-gray-600">Complete your first topic</p>
                    </div>
                  </div>
                  {completedTopics > 0 && <Badge className="bg-green-100 text-green-700">Earned!</Badge>}
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f3ab1b] rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#213874]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Half Way There</p>
                      <p className="text-xs text-gray-600">Complete 50% of module</p>
                    </div>
                  </div>
                  {progress >= 50 && <Badge className="bg-green-100 text-green-700">Earned!</Badge>}
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f3ab1b] rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-[#213874]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Module Master</p>
                      <p className="text-xs text-gray-600">Complete entire module</p>
                    </div>
                  </div>
                  {progress === 100 && <Badge className="bg-green-100 text-green-700">Earned!</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Streak</CardTitle>
              <CardDescription>Keep learning every day to maintain your streak!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#f3ab1b] mb-2">7</div>
                <p className="text-sm text-gray-600 mb-4">Days in a row</p>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={day} className="w-6 h-6 bg-[#f3ab1b] rounded-full flex items-center justify-center">
                      <span className="text-xs text-[#213874] font-bold">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AIHelper />
    </div>
  )
}
