"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { Search, Plus, Building, Edit, Trash2, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function PartnersManagementPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role !== "admin") {
      window.location.href = "/admin"
      return
    }
    fetchPartners()
  }, [user])

  const fetchPartners = async () => {
    try {
      const response = await fetch("/api/admin/partners")
      const data = await response.json()
      setPartners(data.partners || [])
    } catch (error) {
      console.error("Error fetching partners:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePartner = async (partnerId: number) => {
    if (confirm("Are you sure you want to remove this partner?")) {
      try {
        await fetch(`/api/admin/partners/${partnerId}`, { method: "DELETE" })
        fetchPartners()
      } catch (error) {
        console.error("Error deleting partner:", error)
      }
    }
  }

  if (user?.role !== "admin") {
    return null
  }

  const filteredPartners = partners.filter(
    (partner: any) =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#213874] mb-2">Partners Management</h1>
            <p className="text-gray-600">Manage institutional partners and collaborations</p>
          </div>
          <Link href="/admin/partners/add">
            <Button className="bg-[#213874] hover:bg-[#1a6ac3]">
              <Plus className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Partners Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner: any) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    {partner.logo ? (
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        width={120}
                        height={60}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Building className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg text-[#213874] text-center mb-2">{partner.name}</CardTitle>
                  <CardDescription className="text-sm text-center">{partner.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {partner.website && (
                      <div className="text-center">
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#213874] hover:underline text-sm flex items-center justify-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Visit Website
                        </a>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link href={`/admin/partners/${partner.id}/edit`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDeletePartner(partner.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPartners.length === 0 && !loading && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No partners found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Get started by adding your first partner"}
            </p>
            <Link href="/admin/partners/add">
              <Button className="bg-[#213874] hover:bg-[#1a6ac3]">
                <Plus className="h-4 w-4 mr-2" />
                Add Partner
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
