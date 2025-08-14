"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { SearchComponent } from "@/components/search-component"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, FileText, Newspaper, Filter, TrendingUp, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function LibraryPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const books = [
    {
      id: 1,
      title: "Gray's Anatomy for Students",
      author: "Richard Drake",
      category: "Anatomy",
      rating: 4.8,
      pages: 1194,
      trending: true,
    },
    {
      id: 2,
      title: "Robbins Basic Pathology",
      author: "Vinay Kumar",
      category: "Pathology",
      rating: 4.7,
      pages: 910,
      trending: false,
    },
    {
      id: 3,
      title: "Pharmacology for Nursing Care",
      author: "Richard A. Lehne",
      category: "Pharmacology",
      rating: 4.6,
      pages: 1344,
      trending: true,
    },
  ]

  const articles = [
    {
      id: 1,
      title: "Recent Advances in Cardiac Surgery",
      author: "Dr. Sarah Johnson",
      journal: "Journal of Cardiology",
      date: "2024-01-15",
      readTime: "12 min",
      category: "Cardiology",
    },
    {
      id: 2,
      title: "COVID-19 and Respiratory Complications",
      author: "Dr. Michael Chen",
      journal: "Respiratory Medicine",
      date: "2024-01-10",
      readTime: "8 min",
      category: "Pulmonology",
    },
    {
      id: 3,
      title: "Pediatric Drug Dosing Guidelines",
      author: "Dr. Emily Rodriguez",
      journal: "Pediatric Pharmacology",
      date: "2024-01-08",
      readTime: "15 min",
      category: "Pediatrics",
    },
  ]

  const magazines = [
    {
      id: 1,
      title: "Medical Student Review",
      issue: "January 2024",
      cover: "Latest Medical Breakthroughs",
      category: "General Medicine",
    },
    {
      id: 2,
      title: "Nursing Today",
      issue: "December 2023",
      cover: "Patient Care Excellence",
      category: "Nursing",
    },
    {
      id: 3,
      title: "Pharmacy Practice",
      issue: "January 2024",
      cover: "Clinical Pharmacy Updates",
      category: "Pharmacy",
    },
  ]

  const trendingTopics = [
    "Artificial Intelligence in Medicine",
    "Telemedicine Best Practices",
    "Drug Resistance Mechanisms",
    "Minimally Invasive Surgery",
    "Personalized Medicine",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213874] mb-2">Medical Library</h1>
          <p className="text-gray-600">Access thousands of medical books, research articles, and journals</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchComponent placeholder="Search books, articles, topics..." />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="anatomy">Anatomy</SelectItem>
                <SelectItem value="physiology">Physiology</SelectItem>
                <SelectItem value="pathology">Pathology</SelectItem>
                <SelectItem value="pharmacology">Pharmacology</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="nursing">Nursing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="books" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="books" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Books
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="magazines" className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  Magazines
                </TabsTrigger>
              </TabsList>

              <TabsContent value="books" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {books.map((book) => (
                    <Link key={book.id} href={`/book/${book.id}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg text-[#213874] group-hover:text-[#1a6ac3] transition-colors">
                                {book.title}
                              </CardTitle>
                              <CardDescription className="mt-1">by {book.author}</CardDescription>
                            </div>
                            {book.trending && (
                              <Badge className="bg-[#f3ab1b] text-[#213874]">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <Badge variant="outline">{book.category}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{book.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{book.pages} pages</p>
                            <Button className="w-full bg-[#213874] hover:bg-[#1a6ac3]">Read Now</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="articles" className="space-y-6">
                <div className="space-y-4">
                  {articles.map((article) => (
                    <Link key={article.id} href={`/article/${article.id}`}>
                      <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-[#213874] group-hover:text-[#1a6ac3] transition-colors mb-2">
                                {article.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span>by {article.author}</span>
                                <span>•</span>
                                <span>{article.journal}</span>
                                <span>•</span>
                                <span>{article.date}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">{article.category}</Badge>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Clock className="h-4 w-4" />
                                  <span>{article.readTime}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" className="ml-4 bg-transparent">
                              Read Article
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="magazines" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {magazines.map((magazine) => (
                    <Link key={magazine.id} href={`/magazine/${magazine.id}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <CardHeader>
                          <div className="aspect-[3/4] bg-gradient-to-br from-[#213874] to-[#1a6ac3] rounded-lg mb-4 flex items-center justify-center">
                            <div className="text-center text-white p-4">
                              <h4 className="font-bold text-lg mb-2">{magazine.title}</h4>
                              <p className="text-sm opacity-90">{magazine.cover}</p>
                            </div>
                          </div>
                          <CardTitle className="text-lg text-[#213874]">{magazine.title}</CardTitle>
                          <CardDescription>{magazine.issue}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <Badge variant="outline">{magazine.category}</Badge>
                            <Button className="w-full bg-[#213874] hover:bg-[#1a6ac3]">Read Issue</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#f3ab1b]" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2 hover:bg-[#213874]/5"
                    >
                      <span className="text-sm">{topic}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Library Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Books</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Research Articles</span>
                    <span className="font-semibold">15,632</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Journals</span>
                    <span className="font-semibold">456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Updated Today</span>
                    <span className="font-semibold text-green-600">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Additions */}
            <Card>
              <CardHeader>
                <CardTitle>Recently Added</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-[#213874]">Advanced Pharmacokinetics</p>
                    <p className="text-gray-600 text-xs">Added 2 days ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-[#213874]">Clinical Neurology Cases</p>
                    <p className="text-gray-600 text-xs">Added 3 days ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-[#213874]">Pediatric Emergency Medicine</p>
                    <p className="text-gray-600 text-xs">Added 1 week ago</p>
                  </div>
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
