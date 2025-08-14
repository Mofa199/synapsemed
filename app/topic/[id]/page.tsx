"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"
import { Clock, Users, Award, Star, Play, Download, Share, Heart, CheckCircle } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function TopicPage() {
  const { user } = useAuth()
  const params = useParams()
  const topicId = params.id as string
  const [isCompleted, setIsCompleted] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Sample topic data
  const topic = {
    id: topicId,
    title: "Introduction to Human Anatomy",
    description:
      "Comprehensive overview of human anatomical systems, structures, and their relationships. This foundational topic covers the basic principles of anatomy and introduces students to the systematic study of the human body.",
    type: "Video",
    duration: "45 min",
    difficulty: "Beginner",
    rating: 4.8,
    totalRatings: 234,
    completions: 1847,
    points: 25,
    videoUrl: "/videos/anatomy-intro.mp4",
    content: `
      <h2>Learning Objectives</h2>
      <ul>
        <li>Understand basic anatomical terminology and directional terms</li>
        <li>Identify major body systems and their primary functions</li>
        <li>Recognize anatomical positions and body planes</li>
        <li>Describe the organization of the human body from cells to systems</li>
      </ul>
      
      <h2>Key Concepts</h2>
      <p>Human anatomy is the scientific study of the body's structures. It involves examining the body's components, from the smallest cells to the largest organs, and understanding how they work together.</p>
      
      <img src="/placeholder.svg?height=300&width=500&text=Human+Body+Systems" alt="Human Body Systems Overview" class="w-full max-w-md mx-auto my-6 rounded-lg" />
      
      <h3>Anatomical Position</h3>
      <p>The anatomical position is the standard reference position used in anatomy. In this position, the body is upright, facing forward, with arms at the sides and palms facing forward.</p>
      
      <img src="/placeholder.svg?height=400&width=300&text=Anatomical+Position" alt="Anatomical Position Illustration" class="w-full max-w-sm mx-auto my-6 rounded-lg" />
      
      <h3>Body Systems Overview</h3>
      <p>The human body consists of 11 major organ systems, each with specific functions that contribute to overall health and survival.</p>
      
      <div class="grid grid-cols-2 gap-4 my-6">
        <img src="/placeholder.svg?height=200&width=200&text=Cardiovascular+System" alt="Cardiovascular System" class="rounded-lg" />
        <img src="/placeholder.svg?height=200&width=200&text=Respiratory+System" alt="Respiratory System" class="rounded-lg" />
        <img src="/placeholder.svg?height=200&width=200&text=Nervous+System" alt="Nervous System" class="rounded-lg" />
        <img src="/placeholder.svg?height=200&width=200&text=Skeletal+System" alt="Skeletal System" class="rounded-lg" />
      </div>
    `,
    prerequisites: [
      { id: "basic-biology", title: "Basic Biology", completed: true },
      { id: "cell-structure", title: "Cell Structure", completed: false },
    ],
    nextTopics: [
      { id: "cardiovascular-overview", title: "Cardiovascular System Overview" },
      { id: "skeletal-fundamentals", title: "Skeletal System Fundamentals" },
    ],
    resources: [
      { title: "Anatomy Atlas PDF", type: "PDF", size: "15 MB", url: "/downloads/anatomy-atlas.pdf" },
      { title: "3D Heart Model", type: "Interactive", size: "Online", url: "/models/heart-3d" },
      { title: "Practice Quiz", type: "Quiz", size: "10 questions", url: "/quiz/anatomy-basics" },
    ],
  }

  const handleComplete = async () => {
    setIsCompleted(true)
    // Update user progress
    if (user) {
      user.points += topic.points
      // In real app, this would call API to update progress
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            topicId: topic.id,
            completed: true,
            points: topic.points,
          }),
        })
      } catch (error) {
        console.error("Failed to update progress:", error)
      }
    }
  }

  const handleRating = async (rating: number) => {
    setUserRating(rating)
    try {
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          topicId: topic.id,
          rating,
        }),
      })
    } catch (error) {
      console.error("Failed to submit rating:", error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: topic.title,
          text: topic.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Topic Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{topic.type}</Badge>
                      <Badge variant="outline">{topic.difficulty}</Badge>
                      {isCompleted && <Badge className="bg-green-100 text-green-700">Completed</Badge>}
                    </div>
                    <CardTitle className="text-2xl text-[#213874] mb-2">{topic.title}</CardTitle>
                    <CardDescription className="text-base">{topic.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsBookmarked(!isBookmarked)}>
                    <Heart className={`w-4 h-4 ${isBookmarked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{topic.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {topic.rating} ({topic.totalRatings} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{topic.completions} completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{topic.points} points</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Video/Content Player */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-[#213874] to-[#1a6ac3] rounded-t-lg flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Play className="w-8 h-8 mr-2" />
                    Play Video
                  </Button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#213874]">Topic Content</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(topic.videoUrl, `${topic.title}.mp4`)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: topic.content }} />

                  {!isCompleted && (
                    <Button className="w-full mt-6 bg-[#213874] hover:bg-[#1a6ac3]" onClick={handleComplete}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Complete (+{topic.points} points)
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Rating Section */}
            <Card>
              <CardHeader>
                <CardTitle>Rate this Topic</CardTitle>
                <CardDescription>Help other students by rating this content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => handleRating(star)} className="transition-colors">
                      <Star
                        className={`w-6 h-6 ${
                          star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  {userRating > 0 && (
                    <span className="text-sm text-gray-600 ml-2">
                      You rated this {userRating} star{userRating !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Topic Progress</span>
                      <span>{isCompleted ? "100%" : "0%"}</span>
                    </div>
                    <Progress value={isCompleted ? 100 : 0} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {isCompleted ? "Completed! Great job!" : "Start watching to track progress"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topic.prerequisites.map((prereq) => (
                    <Link key={prereq.id} href={`/topic/${prereq.id}`}>
                      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className={`w-2 h-2 rounded-full ${prereq.completed ? "bg-green-500" : "bg-[#213874]"}`} />
                        <span className="text-sm">{prereq.title}</span>
                        {prereq.completed && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topic.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{resource.title}</p>
                        <p className="text-xs text-gray-600">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(resource.url, resource.title)}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Up Next</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topic.nextTopics.map((nextTopic) => (
                    <Link key={nextTopic.id} href={`/topic/${nextTopic.id}`}>
                      <Button variant="ghost" className="w-full justify-start text-left h-auto p-2 hover:bg-gray-50">
                        <div>
                          <div className="text-sm font-medium text-[#213874]">{nextTopic.title}</div>
                          <div className="text-xs text-gray-600">Recommended next</div>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AIHelper />
    </div>
  )
}
