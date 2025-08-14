"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, Download, Share, Bookmark, Eye, User } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function ArticlePage() {
  const params = useParams()
  const articleId = params.id as string
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userRating, setUserRating] = useState(0)

  // Sample article data
  const article = {
    id: articleId,
    title: "Recent Advances in Cardiac Surgery",
    author: "Dr. Sarah Johnson",
    authorBio:
      "Dr. Sarah Johnson is a renowned cardiac surgeon with over 15 years of experience in minimally invasive cardiac procedures.",
    journal: "Journal of Cardiology",
    date: "2024-01-15",
    readTime: "12 min",
    category: "Cardiology",
    rating: 4.7,
    totalRatings: 89,
    views: 2341,
    abstract:
      "This comprehensive review examines the latest developments in cardiac surgical techniques, focusing on minimally invasive approaches and their impact on patient outcomes. We analyze recent clinical trials and technological innovations that are reshaping the field of cardiac surgery.",
    keywords: ["Cardiac Surgery", "Minimally Invasive", "Patient Outcomes", "Clinical Trials", "Medical Technology"],
    content: `
      <h2>Introduction</h2>
      <p>Cardiac surgery has undergone remarkable transformation over the past decade, with technological advances and refined surgical techniques leading to improved patient outcomes and reduced recovery times. This article explores the most significant developments in the field.</p>
      
      <h2>Minimally Invasive Techniques</h2>
      <p>The shift toward minimally invasive cardiac surgery has been one of the most significant developments in recent years. These techniques offer several advantages over traditional open-heart surgery:</p>
      <ul>
        <li>Reduced surgical trauma and scarring</li>
        <li>Shorter hospital stays</li>
        <li>Faster recovery times</li>
        <li>Lower risk of infection</li>
        <li>Improved cosmetic outcomes</li>
      </ul>
      
      <h3>Robotic-Assisted Surgery</h3>
      <p>Robotic systems have revolutionized cardiac surgery by providing surgeons with enhanced precision, improved visualization, and greater dexterity. The da Vinci Surgical System, in particular, has shown excellent results in mitral valve repair and coronary artery bypass procedures.</p>
      
      <h2>Clinical Outcomes</h2>
      <p>Recent studies have demonstrated significant improvements in patient outcomes with these advanced techniques. A multi-center trial involving 1,200 patients showed:</p>
      <ul>
        <li>30% reduction in post-operative complications</li>
        <li>25% shorter ICU stays</li>
        <li>Improved quality of life scores at 6-month follow-up</li>
      </ul>
      
      <h2>Future Directions</h2>
      <p>The future of cardiac surgery looks promising with emerging technologies such as artificial intelligence-guided procedures, advanced imaging techniques, and bioengineered materials for valve replacement.</p>
      
      <h2>Conclusion</h2>
      <p>The continuous evolution of cardiac surgical techniques, driven by technological innovation and clinical research, continues to improve patient outcomes and expand treatment options for complex cardiac conditions.</p>
    `,
    references: [
      "Smith, J. et al. (2023). Minimally invasive cardiac surgery outcomes. Journal of Thoracic Surgery, 45(3), 234-241.",
      "Brown, A. & Wilson, K. (2023). Robotic cardiac surgery: A systematic review. Cardiac Surgery Today, 12(8), 567-578.",
      "Davis, M. et al. (2024). Patient outcomes in modern cardiac surgery. New England Journal of Cardiology, 78(2), 123-135.",
    ],
    relatedArticles: [
      { id: 2, title: "Innovations in Heart Valve Replacement", author: "Dr. Michael Chen" },
      { id: 3, title: "Post-Operative Care in Cardiac Surgery", author: "Dr. Emily Rodriguez" },
      { id: 4, title: "Pediatric Cardiac Surgery Advances", author: "Dr. James Wilson" },
    ],
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
    // In real app, this would submit rating to backend
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Article Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{article.category}</Badge>
                      <Badge variant="outline">{article.journal}</Badge>
                    </div>
                    <CardTitle className="text-3xl text-[#213874] mb-4">{article.title}</CardTitle>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {article.rating} ({article.totalRatings} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">{article.abstract}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsBookmarked(!isBookmarked)}>
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button className="bg-[#213874] hover:bg-[#1a6ac3]">Read Full Article</Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Article Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
              </CardContent>
            </Card>

            {/* References */}
            <Card>
              <CardHeader>
                <CardTitle>References</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {article.references.map((reference, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {index + 1}. {reference}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Rating Section */}
            <Card>
              <CardHeader>
                <CardTitle>Rate this Article</CardTitle>
                <CardDescription>Help other readers by rating this content</CardDescription>
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
            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-[#213874] rounded-full flex items-center justify-center mx-auto">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-[#213874]">{article.author}</p>
                    <p className="text-sm text-gray-600 mt-2">{article.authorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card>
              <CardHeader>
                <CardTitle>Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Article Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Article Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Publication Date</span>
                    <span className="text-sm font-medium">{article.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Views</span>
                    <span className="text-sm font-medium">{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <span className="text-sm font-medium">{article.rating}/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reading Time</span>
                    <span className="text-sm font-medium">{article.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {article.relatedArticles.map((related) => (
                    <div
                      key={related.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <h4 className="font-medium text-sm text-[#213874] mb-1">{related.title}</h4>
                      <p className="text-xs text-gray-600">by {related.author}</p>
                    </div>
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
