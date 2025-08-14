"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { Search, Plus, Users, Edit, Trash2, Mail, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function UserManagementPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.role !== "admin") {
      window.location.href = "/admin"
      return
    }
    fetchUsers()
  }, [user])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`/api/admin/users/${userId}`, { method: "DELETE" })
        fetchUsers()
      } catch (error) {
        console.error("Error deleting user:", error)
      }
    }
  }

  if (user?.role !== "admin") {
    return null
  }

  const filteredUsers = users.filter(
    (u: any) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#213874] mb-2">User Management</h1>
            <p className="text-gray-600">Manage platform users and their permissions</p>
          </div>
          <Link href="/admin/users/add">
            <Button className="bg-[#213874] hover:bg-[#1a6ac3]">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((u: any) => (
              <Card key={u.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-[#213874] mb-2">{u.name}</CardTitle>
                      <CardDescription className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {u.email}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={u.role === "admin" ? "destructive" : u.role === "instructor" ? "default" : "secondary"}
                    >
                      {u.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {u.coursesEnrolled || 0} courses
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/admin/users/${u.id}/edit`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(u.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No users found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Get started by adding your first user"}
            </p>
            <Link href="/admin/users/add">
              <Button className="bg-[#213874] hover:bg-[#1a6ac3]">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
