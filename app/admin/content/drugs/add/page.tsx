"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { Pill, Upload, Save } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddDrugPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    brandNames: "",
    class: "",
    category: "",
    description: "",
    mechanism: "",
    indications: "",
    dosageAdult: "",
    dosagePediatric: "",
    dosageElderly: "",
    administrationRoute: "",
    administrationTiming: "",
    administrationInstructions: "",
    contraindications: "",
    warnings: "",
    sideEffectsCommon: "",
    sideEffectsSerious: "",
    sideEffectsRare: "",
    interactions: "",
    monitoring: "",
    storage: "",
    pregnancy: "",
    absorption: "",
    distribution: "",
    metabolism: "",
    elimination: "",
    halfLife: "",
  })

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/drugs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Drug added successfully!")
        router.push("/admin")
      } else {
        throw new Error("Failed to add drug")
      }
    } catch (error) {
      console.error("Error adding drug:", error)
      alert("Failed to add drug. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#213874] mb-2">Add New Drug</h1>
          <p className="text-gray-600">Add a new drug to the pharmacology database</p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-[#213874]" />
              Drug Information
            </CardTitle>
            <CardDescription>Fill in the comprehensive drug details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#213874]">Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Drug Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter drug name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="genericName">Generic Name</Label>
                    <Input
                      id="genericName"
                      value={formData.genericName}
                      onChange={(e) => handleInputChange("genericName", e.target.value)}
                      placeholder="Enter generic name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brandNames">Brand Names</Label>
                    <Input
                      id="brandNames"
                      value={formData.brandNames}
                      onChange={(e) => handleInputChange("brandNames", e.target.value)}
                      placeholder="Enter brand names (comma separated)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="class">Drug Class *</Label>
                    <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select drug class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ace-inhibitors">ACE Inhibitors</SelectItem>
                        <SelectItem value="beta-blockers">Beta Blockers</SelectItem>
                        <SelectItem value="calcium-channel-blockers">Calcium Channel Blockers</SelectItem>
                        <SelectItem value="diuretics">Diuretics</SelectItem>
                        <SelectItem value="antibiotics">Antibiotics</SelectItem>
                        <SelectItem value="nsaids">NSAIDs</SelectItem>
                        <SelectItem value="opioids">Opioids</SelectItem>
                        <SelectItem value="antidepressants">Antidepressants</SelectItem>
                        <SelectItem value="antipsychotics">Antipsychotics</SelectItem>
                        <SelectItem value="anticonvulsants">Anticonvulsants</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      Don't see your drug class?{" "}
                      <Link href="/admin/content/drug-classes/add" className="text-[#213874] hover:underline">
                        Add a new one
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                        <SelectItem value="cns">CNS</SelectItem>
                        <SelectItem value="antimicrobial">Antimicrobial</SelectItem>
                        <SelectItem value="endocrine">Endocrine</SelectItem>
                        <SelectItem value="respiratory">Respiratory</SelectItem>
                        <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
                        <SelectItem value="analgesic">Analgesic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pregnancy">Pregnancy Category</Label>
                    <Select value={formData.pregnancy} onValueChange={(value) => handleInputChange("pregnancy", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pregnancy category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Category A</SelectItem>
                        <SelectItem value="B">Category B</SelectItem>
                        <SelectItem value="C">Category C</SelectItem>
                        <SelectItem value="D">Category D</SelectItem>
                        <SelectItem value="X">Category X</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter drug description"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mechanism">Mechanism of Action *</Label>
                  <Textarea
                    id="mechanism"
                    value={formData.mechanism}
                    onChange={(e) => handleInputChange("mechanism", e.target.value)}
                    placeholder="Enter mechanism of action"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="indications">Indications</Label>
                  <Textarea
                    id="indications"
                    value={formData.indications}
                    onChange={(e) => handleInputChange("indications", e.target.value)}
                    placeholder="Enter indications (one per line)"
                    rows={4}
                  />
                </div>
              </div>

              {/* Dosage Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#213874]">Dosage Information</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="dosageAdult">Adult Dosage</Label>
                    <Textarea
                      id="dosageAdult"
                      value={formData.dosageAdult}
                      onChange={(e) => handleInputChange("dosageAdult", e.target.value)}
                      placeholder="Enter adult dosage"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dosagePediatric">Pediatric Dosage</Label>
                    <Textarea
                      id="dosagePediatric"
                      value={formData.dosagePediatric}
                      onChange={(e) => handleInputChange("dosagePediatric", e.target.value)}
                      placeholder="Enter pediatric dosage"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dosageElderly">Elderly Dosage</Label>
                    <Textarea
                      id="dosageElderly"
                      value={formData.dosageElderly}
                      onChange={(e) => handleInputChange("dosageElderly", e.target.value)}
                      placeholder="Enter elderly dosage"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="administrationRoute">Route</Label>
                    <Input
                      id="administrationRoute"
                      value={formData.administrationRoute}
                      onChange={(e) => handleInputChange("administrationRoute", e.target.value)}
                      placeholder="e.g., Oral"
                    />
                  </div>
                  <div>
                    <Label htmlFor="administrationTiming">Timing</Label>
                    <Input
                      id="administrationTiming"
                      value={formData.administrationTiming}
                      onChange={(e) => handleInputChange("administrationTiming", e.target.value)}
                      placeholder="e.g., With or without food"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storage">Storage</Label>
                    <Input
                      id="storage"
                      value={formData.storage}
                      onChange={(e) => handleInputChange("storage", e.target.value)}
                      placeholder="Storage conditions"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="administrationInstructions">Administration Instructions</Label>
                  <Textarea
                    id="administrationInstructions"
                    value={formData.administrationInstructions}
                    onChange={(e) => handleInputChange("administrationInstructions", e.target.value)}
                    placeholder="Enter administration instructions"
                    rows={2}
                  />
                </div>
              </div>

              {/* Safety Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#213874]">Safety Information</h3>
                <div>
                  <Label htmlFor="contraindications">Contraindications</Label>
                  <Textarea
                    id="contraindications"
                    value={formData.contraindications}
                    onChange={(e) => handleInputChange("contraindications", e.target.value)}
                    placeholder="Enter contraindications (one per line)"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="warnings">Warnings</Label>
                  <Textarea
                    id="warnings"
                    value={formData.warnings}
                    onChange={(e) => handleInputChange("warnings", e.target.value)}
                    placeholder="Enter warnings (one per line)"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="sideEffectsCommon">Common Side Effects</Label>
                    <Textarea
                      id="sideEffectsCommon"
                      value={formData.sideEffectsCommon}
                      onChange={(e) => handleInputChange("sideEffectsCommon", e.target.value)}
                      placeholder="Enter common side effects (comma separated)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sideEffectsSerious">Serious Side Effects</Label>
                    <Textarea
                      id="sideEffectsSerious"
                      value={formData.sideEffectsSerious}
                      onChange={(e) => handleInputChange("sideEffectsSerious", e.target.value)}
                      placeholder="Enter serious side effects (comma separated)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sideEffectsRare">Rare Side Effects</Label>
                    <Textarea
                      id="sideEffectsRare"
                      value={formData.sideEffectsRare}
                      onChange={(e) => handleInputChange("sideEffectsRare", e.target.value)}
                      placeholder="Enter rare side effects (comma separated)"
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="interactions">Drug Interactions</Label>
                  <Textarea
                    id="interactions"
                    value={formData.interactions}
                    onChange={(e) => handleInputChange("interactions", e.target.value)}
                    placeholder="Enter drug interactions (format: Drug Name - Effect - Severity)"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="monitoring">Monitoring Parameters</Label>
                  <Textarea
                    id="monitoring"
                    value={formData.monitoring}
                    onChange={(e) => handleInputChange("monitoring", e.target.value)}
                    placeholder="Enter monitoring parameters (comma separated)"
                    rows={2}
                  />
                </div>
              </div>

              {/* Pharmacokinetics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#213874]">Pharmacokinetics</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="absorption">Absorption</Label>
                    <Input
                      id="absorption"
                      value={formData.absorption}
                      onChange={(e) => handleInputChange("absorption", e.target.value)}
                      placeholder="e.g., 25-30% bioavailability"
                    />
                  </div>
                  <div>
                    <Label htmlFor="distribution">Distribution</Label>
                    <Input
                      id="distribution"
                      value={formData.distribution}
                      onChange={(e) => handleInputChange("distribution", e.target.value)}
                      placeholder="e.g., Does not cross blood-brain barrier"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="metabolism">Metabolism</Label>
                    <Input
                      id="metabolism"
                      value={formData.metabolism}
                      onChange={(e) => handleInputChange("metabolism", e.target.value)}
                      placeholder="e.g., Not metabolized"
                    />
                  </div>
                  <div>
                    <Label htmlFor="elimination">Elimination</Label>
                    <Input
                      id="elimination"
                      value={formData.elimination}
                      onChange={(e) => handleInputChange("elimination", e.target.value)}
                      placeholder="e.g., Primarily renal excretion"
                    />
                  </div>
                  <div>
                    <Label htmlFor="halfLife">Half-life</Label>
                    <Input
                      id="halfLife"
                      value={formData.halfLife}
                      onChange={(e) => handleInputChange("halfLife", e.target.value)}
                      placeholder="e.g., 12 hours"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="bg-[#213874] hover:bg-[#1a6ac3]">
                  {isLoading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Adding Drug...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Add Drug
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
