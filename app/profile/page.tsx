"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"
import {
  User,
  Edit,
  Camera,
  Trophy,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Star,
  Save,
  Upload,
} from "lucide-react"

export default function ProfilePage() {
  const { user, updateUser, uploadAvatar } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Passionate medical student focused on cardiology and emergency medicine. Always eager to learn and help others in their medical journey.",
    location: "New York, NY",
    university: "Harvard Medical School",
    graduationYear: "2025",
    specialization: "Cardiology",
    linkedIn: "",
    twitter: "",
    website: "",
  })

  const stats = {
    totalPoints: user?.points || 0,
    level: user?.level || "Novice",
    badges: user?.badges?.length || 0,
    coursesCompleted: 12,
    studyStreak: 7,
    totalStudyTime: 145,
    averageScore: 87,
    rank: 23,
  }

  const recentAchievements = [
    { name: "Quiz Master", date: "2 days ago", icon: "🧠" },
    { name: "Study Streak", date: "1 week ago", icon: "🔥" },
    { name: "First Module Complete", date: "2 weeks ago", icon: "🎯" },
  ]

  const studyProgress = [
    { subject: "Anatomy", progress: 85, total: 20, completed: 17 },
    { subject: "Physiology", progress: 72, total: 15, completed: 11 },
    { subject: "Pathology", progress: 60, total: 18, completed: 11 },
    { subject: "Pharmacology", progress: 45, total: 22, completed: 10 },
  ]

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      updateUser({ name: profileData.name })
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.")
      return
    }

    setIsUploadingAvatar(true)
    try {
      await uploadAvatar(file)
      alert("Avatar updated successfully!")
    } catch (error) {
      alert("Failed to update avatar. Please try again.")
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar and Basic Info */}
            <Card className="animate-in slide-in-from-left duration-500">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback className="bg-[#213874] text-white text-2xl">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white shadow-md hover:shadow-lg transition-shadow"
                      onClick={handleAvatarClick}
                      disabled={isUploadingAvatar}
                    >
                      {isUploadingAvatar ? <Upload className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>

                  <div className="mt-4">
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="text-center font-semibold"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold text-[#213874]">{profileData.name}</h2>
                    )}
                    <p className="text-gray-600">{profileData.email}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Badge className="bg-[#f3ab1b] text-[#213874]">Level {stats.level}</Badge>
                      <Badge variant="outline">{user?.field}</Badge>
                    </div>
                  </div>

                  <div className="mt-4">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Button
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                          className="w-full bg-[#213874] hover:bg-[#1a6ac3]"
                        >
                          {isLoading ? (
                            <>
                              <Save className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} className="w-full bg-[#213874] hover:bg-[#1a6ac3]">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="animate-in slide-in-from-left duration-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-[#213874]/10 rounded-lg hover:bg-[#213874]/20 transition-colors">
                    <div className="text-2xl font-bold text-[#213874]">{stats.totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                  <div className="text-center p-3 bg-[#f3ab1b]/10 rounded-lg hover:bg-[#f3ab1b]/20 transition-colors">
                    <div className="text-2xl font-bold text-[#213874]">{stats.badges}</div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                  <div className="text-center p-3 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                    <div className="text-2xl font-bold text-[#213874]">{stats.studyStreak}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                  <div className="text-center p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                    <div className="text-2xl font-bold text-[#213874]">#{stats.rank}</div>
                    <div className="text-sm text-gray-600">Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="animate-in slide-in-from-left duration-1000">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#f3ab1b]" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.name}</p>
                        <p className="text-xs text-gray-600">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="animate-in slide-in-from-right duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="university">University</Label>
                        <Input
                          id="university"
                          value={profileData.university}
                          onChange={(e) => handleInputChange("university", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="graduationYear">Graduation Year</Label>
                        <Input
                          id="graduationYear"
                          value={profileData.graduationYear}
                          onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          id="specialization"
                          value={profileData.specialization}
                          onChange={(e) => handleInputChange("specialization", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-700">{profileData.bio}</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Location:</span>
                        <span>{profileData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">University:</span>
                        <span>{profileData.university}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Graduation:</span>
                        <span>{profileData.graduationYear}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Specialization:</span>
                        <span>{profileData.specialization}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Study Progress */}
            <Card className="animate-in slide-in-from-right duration-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Study Progress
                </CardTitle>
                <CardDescription>Your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {studyProgress.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{subject.subject}</h4>
                        <div className="text-sm text-gray-600">
                          {subject.completed}/{subject.total} modules
                        </div>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      <div className="text-right text-sm text-gray-600">{subject.progress}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="animate-in slide-in-from-right duration-1000">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Score</span>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#f3ab1b]" />
                      <span className="font-semibold">{stats.averageScore}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Courses Completed</span>
                    <span className="font-semibold">{stats.coursesCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Current Rank</span>
                    <Badge className="bg-[#213874] text-white">#{stats.rank}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-in slide-in-from-right duration-1200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Study Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Study Time</span>
                    <span className="font-semibold">{stats.totalStudyTime}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Week</span>
                    <span className="font-semibold">12h 30m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Daily Average</span>
                    <span className="font-semibold">1h 45m</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Badges Collection */}
            <Card className="animate-in slide-in-from-right duration-1500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#f3ab1b]" />
                  Badge Collection
                </CardTitle>
                <CardDescription>Your earned achievements and badges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {user?.badges?.map((badge, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-gradient-to-br from-[#f3ab1b]/10 to-[#213874]/10 rounded-lg hover:from-[#f3ab1b]/20 hover:to-[#213874]/20 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="w-12 h-12 bg-[#f3ab1b] rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Award className="w-6 h-6 text-[#213874]" />
                      </div>
                      <p className="text-sm font-medium text-[#213874]">{badge}</p>
                    </div>
                  ))}
                  <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Award className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">Next Badge</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
