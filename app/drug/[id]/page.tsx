"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pill, AlertTriangle, Info, Heart, Bookmark, Share, Highlighter } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function DrugPage() {
  const params = useParams()
  const drugId = params.id as string
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [highlights, setHighlights] = useState<string[]>([])

  // Sample drug data
  const drug = {
    id: drugId,
    name: "Lisinopril",
    genericName: "Lisinopril",
    brandNames: ["Prinivil", "Zestril"],
    class: "ACE Inhibitor",
    category: "Cardiovascular",
    description:
      "Lisinopril is an angiotensin-converting enzyme (ACE) inhibitor used primarily to treat high blood pressure and heart failure. It works by relaxing blood vessels, which helps lower blood pressure and makes it easier for the heart to pump blood.",
    mechanism:
      "Inhibits the angiotensin-converting enzyme (ACE), preventing the conversion of angiotensin I to angiotensin II, a potent vasoconstrictor. This results in decreased peripheral resistance and reduced aldosterone secretion.",
    indications: [
      "Hypertension (high blood pressure)",
      "Heart failure",
      "Post-myocardial infarction",
      "Diabetic nephropathy",
    ],
    dosage: {
      adult: "Initial: 5-10mg once daily, Maintenance: 10-40mg once daily",
      pediatric: "0.07mg/kg once daily (maximum 5mg)",
      elderly: "Initial: 2.5-5mg once daily",
    },
    administration: {
      route: "Oral",
      timing: "Can be taken with or without food",
      instructions: "Take at the same time each day, swallow whole with water",
    },
    pharmacokinetics: {
      absorption: "25-30% bioavailability",
      distribution: "Does not cross blood-brain barrier",
      metabolism: "Not metabolized",
      elimination: "Primarily renal excretion",
      halfLife: "12 hours",
    },
    contraindications: [
      "Hypersensitivity to ACE inhibitors",
      "History of angioedema",
      "Pregnancy (2nd and 3rd trimester)",
      "Bilateral renal artery stenosis",
    ],
    warnings: [
      "Monitor kidney function and electrolytes",
      "Risk of angioedema",
      "Hypotension with first dose",
      "Hyperkalemia risk",
    ],
    sideEffects: {
      common: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
      serious: ["Angioedema", "Hyperkalemia", "Renal impairment", "Severe hypotension"],
      rare: ["Liver dysfunction", "Neutropenia", "Stevens-Johnson syndrome"],
    },
    interactions: [
      {
        drug: "Potassium supplements",
        effect: "Increased risk of hyperkalemia",
        severity: "Major",
      },
      {
        drug: "NSAIDs",
        effect: "Reduced antihypertensive effect, increased nephrotoxicity",
        severity: "Moderate",
      },
      {
        drug: "Lithium",
        effect: "Increased lithium levels",
        severity: "Major",
      },
    ],
    monitoring: ["Blood pressure", "Serum creatinine and BUN", "Serum potassium", "Complete blood count"],
    storage: "Store at room temperature (20-25°C), protect from moisture",
    pregnancy: "Category D - Avoid in pregnancy",
  }

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked)
    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "drug",
          itemId: drug.id,
          bookmarked: !isBookmarked,
        }),
      })
    } catch (error) {
      console.error("Failed to bookmark:", error)
    }
  }

  const handleHighlight = (text: string) => {
    const newHighlights = [...highlights, text]
    setHighlights(newHighlights)
    // Save highlights to backend
    fetch("/api/highlights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "drug",
        itemId: drug.id,
        highlights: newHighlights,
      }),
    }).catch((error) => console.error("Failed to save highlight:", error))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${drug.name} - Drug Information`,
          text: drug.description,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Drug Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#213874] rounded-lg flex items-center justify-center">
                      <Pill className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl text-[#213874] mb-2">{drug.name}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#f3ab1b] text-[#213874]">{drug.class}</Badge>
                        <Badge variant="outline">{drug.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Brand names: {drug.brandNames.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleBookmark}>
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleHighlight(drug.description)}>
                      <Highlighter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-base mt-4">{drug.description}</CardDescription>
              </CardHeader>
            </Card>

            {/* Drug Information Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="dosage">Dosage</TabsTrigger>
                    <TabsTrigger value="safety">Safety</TabsTrigger>
                    <TabsTrigger value="interactions">Interactions</TabsTrigger>
                    <TabsTrigger value="pharmacology">Pharmacology</TabsTrigger>
                  </TabsList>

                  <div className="p-6">
                    <TabsContent value="overview" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#213874] mb-3">Mechanism of Action</h3>
                        <p className="text-gray-700">{drug.mechanism}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[#213874] mb-3">Indications</h3>
                        <div className="grid md:grid-cols-2 gap-2">
                          {drug.indications.map((indication, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-sm">{indication}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="dosage" className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Adult Dosage</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700">{drug.dosage.adult}</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Pediatric Dosage</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700">{drug.dosage.pediatric}</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Elderly Dosage</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700">{drug.dosage.elderly}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[#213874] mb-3">Administration</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Route</p>
                            <p className="text-sm text-gray-600">{drug.administration.route}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Timing</p>
                            <p className="text-sm text-gray-600">{drug.administration.timing}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Instructions</p>
                            <p className="text-sm text-gray-600">{drug.administration.instructions}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="safety" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#213874] mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          Contraindications
                        </h3>
                        <div className="space-y-2">
                          {drug.contraindications.map((contraindication, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              <span className="text-sm">{contraindication}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[#213874] mb-3">Side Effects</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Common</h4>
                            <div className="space-y-1">
                              {drug.sideEffects.common.map((effect, index) => (
                                <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                                  {effect}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Serious</h4>
                            <div className="space-y-1">
                              {drug.sideEffects.serious.map((effect, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs text-red-600 border-red-200 mr-1 mb-1"
                                >
                                  {effect}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Rare</h4>
                            <div className="space-y-1">
                              {drug.sideEffects.rare.map((effect, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs text-orange-600 border-orange-200 mr-1 mb-1"
                                >
                                  {effect}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="interactions" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#213874] mb-3">Drug Interactions</h3>
                        <div className="space-y-3">
                          {drug.interactions.map((interaction, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-[#213874]">{interaction.drug}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{interaction.effect}</p>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={`${
                                      interaction.severity === "Major"
                                        ? "text-red-600 border-red-200"
                                        : "text-orange-600 border-orange-200"
                                    }`}
                                  >
                                    {interaction.severity}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="pharmacology" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#213874] mb-3">Pharmacokinetics</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Absorption</p>
                            <p className="text-sm text-gray-600">{drug.pharmacokinetics.absorption}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Distribution</p>
                            <p className="text-sm text-gray-600">{drug.pharmacokinetics.distribution}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Metabolism</p>
                            <p className="text-sm text-gray-600">{drug.pharmacokinetics.metabolism}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Elimination</p>
                            <p className="text-sm text-gray-600">{drug.pharmacokinetics.elimination}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Half-life</p>
                            <p className="text-sm text-gray-600">{drug.pharmacokinetics.halfLife}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#213874]" />
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Generic Name</p>
                    <p className="text-sm text-gray-600">{drug.genericName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Drug Class</p>
                    <p className="text-sm text-gray-600">{drug.class}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Half-life</p>
                    <p className="text-sm text-gray-600">{drug.pharmacokinetics.halfLife}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Pregnancy Category</p>
                    <p className="text-sm text-gray-600">{drug.pregnancy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Monitoring Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {drug.monitoring.map((parameter, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#213874] rounded-full" />
                      <span className="text-sm">{parameter}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Storage */}
            <Card>
              <CardHeader>
                <CardTitle>Storage Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">{drug.storage}</p>
              </CardContent>
            </Card>

            {/* Warnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Important Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {drug.warnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-sm">{warning}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            {highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Highlighter className="h-5 w-5 text-[#f3ab1b]" />
                    Your Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="text-sm text-gray-700">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <AIHelper />
    </div>
  )
}
