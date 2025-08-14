"use client"

import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Search, Pill, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function DrugClassPage() {
  const params = useParams()
  const classId = params.id as string
  const [searchQuery, setSearchQuery] = useState("")

  // Sample drug class data
  const drugClassData = {
    1: {
      name: "Cardiovascular Drugs",
      description: "Medications that affect the cardiovascular system, including the heart and blood vessels",
      icon: Heart,
      color: "text-red-600",
      mechanism:
        "Various mechanisms including ACE inhibition, beta-blockade, calcium channel blockade, and diuretic effects to manage cardiovascular conditions",
      indications: ["Hypertension", "Heart Failure", "Arrhythmias", "Coronary Artery Disease", "Myocardial Infarction"],
      contraindications: ["Severe hypotension", "Cardiogenic shock", "Severe bradycardia", "Known hypersensitivity"],
      sideEffects: ["Hypotension", "Dizziness", "Fatigue", "Electrolyte imbalances", "Cough (ACE inhibitors)"],
      drugs: [
        {
          id: 1,
          name: "Lisinopril",
          class: "ACE Inhibitor",
          dosage: "5-40mg daily",
          route: "Oral",
          halfLife: "12 hours",
          commonUses: ["Hypertension", "Heart Failure"],
          sideEffects: ["Dry cough", "Hyperkalemia", "Angioedema"],
        },
        {
          id: 2,
          name: "Metoprolol",
          class: "Beta Blocker",
          dosage: "25-200mg twice daily",
          route: "Oral/IV",
          halfLife: "3-7 hours",
          commonUses: ["Hypertension", "Angina", "Heart Failure"],
          sideEffects: ["Bradycardia", "Fatigue", "Cold extremities"],
        },
        {
          id: 3,
          name: "Amlodipine",
          class: "Calcium Channel Blocker",
          dosage: "2.5-10mg daily",
          route: "Oral",
          halfLife: "30-50 hours",
          commonUses: ["Hypertension", "Angina"],
          sideEffects: ["Peripheral edema", "Flushing", "Dizziness"],
        },
        {
          id: 4,
          name: "Furosemide",
          class: "Loop Diuretic",
          dosage: "20-80mg daily",
          route: "Oral/IV",
          halfLife: "6 hours",
          commonUses: ["Heart Failure", "Edema", "Hypertension"],
          sideEffects: ["Hypokalemia", "Dehydration", "Ototoxicity"],
        },
      ],
    },
  }

  const currentClass = drugClassData[classId as keyof typeof drugClassData] || drugClassData[1]
  const ClassIcon = currentClass.icon

  const filteredDrugs = currentClass.drugs.filter(
    (drug) =>
      drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.class.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center`}>
              <ClassIcon className={`w-8 h-8 ${currentClass.color}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#213874]">{currentClass.name}</h1>
              <p className="text-gray-600">{currentClass.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search drugs in this class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Drugs List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#213874]">Drugs in this Class</h2>
              <div className="grid gap-4">
                {filteredDrugs.map((drug) => (
                  <Link key={drug.id} href={`/drug/${drug.id}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-[#213874] group-hover:text-[#1a6ac3] transition-colors">
                              {drug.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-[#f3ab1b] text-[#213874]">{drug.class}</Badge>
                              <Badge variant="outline">{drug.route}</Badge>
                            </div>
                          </div>
                          <div className="w-12 h-12 bg-[#213874]/10 rounded-full flex items-center justify-center">
                            <Pill className="w-6 h-6 text-[#213874]" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Dosage</p>
                            <p className="text-sm text-gray-600">{drug.dosage}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Half-life</p>
                            <p className="text-sm text-gray-600">{drug.halfLife}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Common Uses</p>
                            <div className="flex flex-wrap gap-1">
                              {drug.commonUses.map((use, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {use}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Side Effects</p>
                            <div className="flex flex-wrap gap-1">
                              {drug.sideEffects.slice(0, 2).map((effect, index) => (
                                <Badge key={index} variant="outline" className="text-xs text-red-600 border-red-200">
                                  {effect}
                                </Badge>
                              ))}
                              {drug.sideEffects.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{drug.sideEffects.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-[#213874] hover:bg-[#1a6ac3]">View Drug Details</Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Class Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#213874]" />
                  Class Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Mechanism of Action</h4>
                    <p className="text-sm text-gray-600">{currentClass.mechanism}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Indications */}
            <Card>
              <CardHeader>
                <CardTitle>Indications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentClass.indications.map((indication, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{indication}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contraindications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Contraindications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentClass.contraindications.map((contraindication, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-sm">{contraindication}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Common Side Effects */}
            <Card>
              <CardHeader>
                <CardTitle>Common Side Effects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currentClass.sideEffects.map((effect, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <span className="text-sm">{effect}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Class Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Drugs</span>
                    <span className="font-semibold">{currentClass.drugs.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Most Common Route</span>
                    <span className="font-semibold">Oral</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Half-life</span>
                    <span className="font-semibold">12-24 hours</span>
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
