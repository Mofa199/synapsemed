"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Star, Download, Share, Bookmark, Eye } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function BookPage() {
  const params = useParams()
  const bookId = params.id as string
  const [currentPage, setCurrentPage] = useState(1)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Sample book data
  const book = {
    id: bookId,
    title: "Gray's Anatomy for Students",
    author: "Richard Drake",
    category: "Anatomy",
    rating: 4.8,
    totalRatings: 1247,
    pages: 1194,
    description:
      "Gray's Anatomy for Students is a comprehensive textbook that provides medical students with a thorough understanding of human anatomy. This edition features updated content, enhanced illustrations, and clinical correlations that help students connect anatomical knowledge to clinical practice.",
    publisher: "Elsevier",
    edition: "4th Edition",
    isbn: "978-0-323-39304-7",
    language: "English",
    publicationDate: "2019",
    pdfUrl: "/downloads/grays-anatomy-students.pdf",
    readerUrl: "/reader/grays-anatomy-students",
    chapters: [
      { id: 1, title: "Introduction to Anatomy", pages: 45, completed: true },
      { id: 2, title: "Back", pages: 78, completed: true },
      { id: 3, title: "Thorax", pages: 156, completed: false },
      { id: 4, title: "Abdomen", pages: 189, completed: false },
      { id: 5, title: "Pelvis and Perineum", pages: 134, completed: false },
      { id: 6, title: "Lower Limb", pages: 167, completed: false },
      { id: 7, title: "Upper Limb", pages: 145, completed: false },
      { id: 8, title: "Head and Neck", pages: 234, completed: false },
      { id: 9, title: "Nervous System", pages: 156, completed: false },
    ],
    readingProgress: 15,
    totalReaders: 3456,
    features: ["High-resolution illustrations", "Clinical correlations", "Online resources", "Interactive content"],
    relatedBooks: [
      { id: 2, title: "Netter's Atlas of Human Anatomy", author: "Frank H. Netter" },
      { id: 3, title: "Moore's Clinically Oriented Anatomy", author: "Keith L. Moore" },
      { id: 4, title: "Grant's Atlas of Anatomy", author: "Anne M. R. Agur" },
    ],
  }

  const completedChapters = book.chapters.filter((chapter) => chapter.completed).length

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: book.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = book.pdfUrl
    link.download = `${book.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleStartReading = () => {
    window.open(book.readerUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Book Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-32 h-40 bg-gradient-to-br from-[#213874] to-[#1a6ac3] rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-2xl text-[#213874] mb-2">{book.title}</CardTitle>
                        <p className="text-lg text-gray-600 mb-2">by {book.author}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <Badge variant="outline">{book.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>
                              {book.rating} ({book.totalRatings} reviews)
                            </span>
                          </div>
                          <span>{book.pages} pages</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setIsBookmarked(!isBookmarked)}>
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <CardDescription className="text-base mb-4">{book.description}</CardDescription>
                    <div className="flex gap-2">
                      <Button className="bg-[#213874] hover:bg-[#1a6ac3]" onClick={handleStartReading}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Reading
                      </Button>
                      <Button variant="outline" onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={handleShare}>
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Book Details */}
            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Publisher</p>
                    <p className="text-sm text-gray-600">{book.publisher}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Edition</p>
                    <p className="text-sm text-gray-600">{book.edition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">ISBN</p>
                    <p className="text-sm text-gray-600">{book.isbn}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Language</p>
                    <p className="text-sm text-gray-600">{book.language}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Publication Date</p>
                    <p className="text-sm text-gray-600">{book.publicationDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Total Readers</p>
                    <p className="text-sm text-gray-600">{book.totalReaders.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
                <CardDescription>Navigate through the book chapters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {book.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            chapter.completed ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {chapter.completed ? "✓" : chapter.id}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{chapter.title}</p>
                          <p className="text-xs text-gray-600">{chapter.pages} pages</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`${book.readerUrl}#chapter-${chapter.id}`, "_blank")}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Read
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reading Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Reading Progress</span>
                      <span>{book.readingProgress}%</span>
                    </div>
                    <Progress value={book.readingProgress} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {completedChapters} of {book.chapters.length} chapters completed
                  </div>
                  <div className="text-sm text-gray-600">
                    Estimated time remaining: {Math.round((book.pages * (100 - book.readingProgress)) / 100 / 2)}{" "}
                    minutes
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {book.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#213874] rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reading Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Reading Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pages read today</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reading streak</span>
                    <span className="font-semibold">5 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average session</span>
                    <span className="font-semibold">45 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total time spent</span>
                    <span className="font-semibold">12.5 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Books */}
            <Card>
              <CardHeader>
                <CardTitle>Related Books</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {book.relatedBooks.map((relatedBook) => (
                    <Link key={relatedBook.id} href={`/book/${relatedBook.id}`}>
                      <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="w-12 h-16 bg-[#213874] rounded flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{relatedBook.title}</p>
                          <p className="text-xs text-gray-600">{relatedBook.author}</p>
                        </div>
                      </div>
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
