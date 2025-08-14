"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AIHelper } from "@/components/ai-helper"
import { SearchComponent } from "@/components/search-component"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pill, Calculator, Heart, Brain, Zap } from "lucide-react"
import Link from "next/link"

export default function PharmacologyPage() {
  // Calculator states
  const [weight, setWeight] = useState("")
  const [dose, setDose] = useState("")
  const [frequency, setFrequency] = useState("")
  const [lastPeriod, setLastPeriod] = useState("")
  const [height, setHeight] = useState("")
  const [bmiWeight, setBmiWeight] = useState("")

  const drugClasses = [
    {
      id: 1,
      name: "Cardiovascular Drugs",
      icon: Heart,
      color: "text-red-600",
      drugCount: 45,
      description: "ACE inhibitors, Beta-blockers, Diuretics",
      mechanism: "Various mechanisms affecting heart and blood vessels",
    },
    {
      id: 2,
      name: "CNS Drugs",
      icon: Brain,
      color: "text-purple-600",
      drugCount: 38,
      description: "Antidepressants, Antipsychotics, Anxiolytics",
      mechanism: "Neurotransmitter modulation in the central nervous system",
    },
    {
      id: 3,
      name: "Antimicrobials",
      icon: Zap,
      color: "text-yellow-600",
      drugCount: 52,
      description: "Antibiotics, Antivirals, Antifungals",
      mechanism: "Inhibition of microbial growth and reproduction",
    },
  ]

  const featuredDrugs = [
    {
      id: 1,
      name: "Aspirin",
      class: "NSAIDs",
      mechanism: "COX enzyme inhibition",
      uses: ["Pain relief", "Anti-inflammatory", "Cardioprotective"],
      sideEffects: ["GI irritation", "Bleeding risk"],
      has3D: true,
    },
    {
      id: 2,
      name: "Metformin",
      class: "Antidiabetic",
      mechanism: "Decreases hepatic glucose production",
      uses: ["Type 2 diabetes", "PCOS"],
      sideEffects: ["GI upset", "Lactic acidosis (rare)"],
      has3D: true,
    },
    {
      id: 3,
      name: "Lisinopril",
      class: "ACE Inhibitor",
      mechanism: "Inhibits angiotensin-converting enzyme",
      uses: ["Hypertension", "Heart failure"],
      sideEffects: ["Dry cough", "Hyperkalemia"],
      has3D: false,
    },
  ]

  const calculateDosage = () => {
    if (!weight || !dose) return "Please enter weight and dose"
    const totalDose = (Number.parseFloat(weight) * Number.parseFloat(dose)).toFixed(2)
    return `${totalDose} mg`
  }

  const calculateEDD = () => {
    if (!lastPeriod) return "Please enter last menstrual period"
    const lmp = new Date(lastPeriod)
    const edd = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000)
    return edd.toLocaleDateString()
  }

  const calculateBMI = () => {
    if (!height || !bmiWeight) return "Please enter height and weight"
    const heightM = Number.parseFloat(height) / 100
    const bmi = (Number.parseFloat(bmiWeight) / (heightM * heightM)).toFixed(1)
    return `${bmi} kg/m²`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213874] mb-2">Pharmacology Hub</h1>
          <p className="text-gray-600">Explore drug classes, mechanisms, and use our clinical calculators</p>
        </div>

        <Tabs defaultValue="drugs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="drugs" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Drug Database
            </TabsTrigger>
            <TabsTrigger value="calculators" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Medical Calculators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drugs" className="space-y-8">
            {/* Search */}
            <SearchComponent placeholder="Search drugs by name, class, or indication..." />

            {/* Drug Classes */}
            <div>
              <h2 className="text-2xl font-bold text-[#213874] mb-6">Drug Classes</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {drugClasses.map((drugClass) => (
                  <Link key={drugClass.id} href={`/drug-class/${drugClass.id}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                            <drugClass.icon className={`w-6 h-6 ${drugClass.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-[#213874] group-hover:text-[#1a6ac3]">
                              {drugClass.name}
                            </CardTitle>
                            <Badge variant="outline">{drugClass.drugCount} drugs</Badge>
                          </div>
                        </div>
                        <CardDescription>{drugClass.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Mechanism:</p>
                            <p className="text-sm text-gray-600">{drugClass.mechanism}</p>
                          </div>
                          <Button className="w-full bg-[#213874] hover:bg-[#1a6ac3]">Explore Class</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Drugs */}
            <div>
              <h2 className="text-2xl font-bold text-[#213874] mb-6">Featured Drugs</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {featuredDrugs.map((drug) => (
                    <Link key={drug.id} href={`/drug/${drug.id}`}>
                      <Card className="group hover:shadow-md transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl text-[#213874] group-hover:text-[#1a6ac3]">
                                {drug.name}
                              </CardTitle>
                              <Badge className="mt-2 bg-[#f3ab1b] text-[#213874]">{drug.class}</Badge>
                            </div>
                            {drug.has3D && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Pill className="h-3 w-3" />
                                3D Model
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-sm text-gray-700 mb-1">Mechanism:</h4>
                              <p className="text-sm text-gray-600">{drug.mechanism}</p>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm text-gray-700 mb-2">Uses:</h4>
                              <div className="flex flex-wrap gap-1">
                                {drug.uses.map((use, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {use}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm text-gray-700 mb-2">Side Effects:</h4>
                              <div className="flex flex-wrap gap-1">
                                {drug.sideEffects.map((effect, index) => (
                                  <Badge key={index} variant="outline" className="text-xs text-red-600 border-red-200">
                                    {effect}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button className="w-full bg-[#213874] hover:bg-[#1a6ac3]">View Details</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* 3D Molecular Model Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5 text-[#213874]" />
                      3D Molecular Structure
                    </CardTitle>
                    <CardDescription>Interactive 3D model of Aspirin (C₉H₈O₄)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-[#213874]/10 to-[#1a6ac3]/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-[#f3ab1b] rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                          <Pill className="w-12 h-12 text-[#213874]" />
                        </div>
                        <p className="text-sm text-gray-600">3D Molecular Model</p>
                        <p className="text-xs text-gray-500">Interactive visualization</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">Rotate and zoom to explore the molecular structure</p>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Full Screen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculators" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Dosage Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[#213874]" />
                    Dosage Calculator
                  </CardTitle>
                  <CardDescription>Calculate drug dosage based on patient weight</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="weight">Patient Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="70"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dose">Dose per kg (mg/kg)</Label>
                      <Input
                        id="dose"
                        type="number"
                        value={dose}
                        onChange={(e) => setDose(e.target.value)}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once">Once daily</SelectItem>
                          <SelectItem value="twice">Twice daily</SelectItem>
                          <SelectItem value="three">Three times daily</SelectItem>
                          <SelectItem value="four">Four times daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-3 bg-[#213874]/5 rounded-lg">
                      <p className="text-sm font-medium text-[#213874]">Total Dose:</p>
                      <p className="text-lg font-bold text-[#213874]">{calculateDosage()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* EDD Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[#213874]" />
                    EDD Calculator
                  </CardTitle>
                  <CardDescription>Calculate Expected Delivery Date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="lmp">Last Menstrual Period</Label>
                      <Input id="lmp" type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
                    </div>
                    <div className="p-3 bg-[#213874]/5 rounded-lg">
                      <p className="text-sm font-medium text-[#213874]">Expected Delivery Date:</p>
                      <p className="text-lg font-bold text-[#213874]">{calculateEDD()}</p>
                    </div>
                    <div className="text-xs text-gray-600">
                      <p>* Based on Naegele's rule (280 days from LMP)</p>
                      <p>* For clinical guidance only</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* BMI Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[#213874]" />
                    BMI Calculator
                  </CardTitle>
                  <CardDescription>Calculate Body Mass Index</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="170"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bmi-weight">Weight (kg)</Label>
                      <Input
                        id="bmi-weight"
                        type="number"
                        value={bmiWeight}
                        onChange={(e) => setBmiWeight(e.target.value)}
                        placeholder="70"
                      />
                    </div>
                    <div className="p-3 bg-[#213874]/5 rounded-lg">
                      <p className="text-sm font-medium text-[#213874]">BMI:</p>
                      <p className="text-lg font-bold text-[#213874]">{calculateBMI()}</p>
                    </div>
                    <div className="text-xs text-gray-600">
                      <p>• Underweight: &lt; 18.5</p>
                      <p>• Normal: 18.5 - 24.9</p>
                      <p>• Overweight: 25 - 29.9</p>
                      <p>• Obese: ≥ 30</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AIHelper />
    </div>
  )
}
