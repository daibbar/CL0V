"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Users, Calendar, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Membership = {
  id_adhesion: number
  date_adhesion: string
  club_name: string
  student_name: string
  student_cne: string
  student_email: string
  club_category: string
}

const mockMemberships: Membership[] = [
  {
    id_adhesion: 1,
    date_adhesion: "2024-02-15",
    club_name: "Tech Club",
    student_name: "Sara Alami",
    student_cne: "R12345678",
    student_email: "sara.alami@student.edu",
    club_category: "Technological",
  },
  {
    id_adhesion: 2,
    date_adhesion: "2024-03-20",
    club_name: "Sports Association",
    student_name: "Omar Bennani",
    student_cne: "R87654321",
    student_email: "omar.bennani@student.edu",
    club_category: "Sport",
  },
  {
    id_adhesion: 3,
    date_adhesion: "2024-01-10",
    club_name: "Entrepreneurship Club",
    student_name: "Leila Ziani",
    student_cne: "R11223344",
    student_email: "leila.ziani@student.edu",
    club_category: "Social entrepreneurship",
  },
]

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>(mockMemberships)
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(mockMemberships[0])
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const membershipData: Membership = {
      id_adhesion: Date.now(),
      date_adhesion: formData.get("date_adhesion") as string,
      club_name: formData.get("club_name") as string,
      student_name: formData.get("student_name") as string,
      student_cne: "R" + Math.floor(Math.random() * 100000000),
      student_email: formData.get("student_email") as string,
      club_category: "Entertainment",
    }

    setMemberships([...memberships, membershipData])
    toast({ title: "Membership created successfully" })
    setIsOpen(false)
  }

  const handleDelete = (id: number) => {
    setMemberships(memberships.filter((m) => m.id_adhesion !== id))
    if (selectedMembership?.id_adhesion === id) {
      setSelectedMembership(memberships[0] || null)
    }
    toast({ title: "Membership deleted successfully" })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Memberships Management</h1>
          <p className="text-sm text-muted-foreground">Club member registrations</p>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Memberships List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>All Memberships</CardTitle>
                  <CardDescription>{memberships.length} total memberships</CardDescription>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Membership</DialogTitle>
                      <DialogDescription>Register a student to a club</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="student_name">Student Name</Label>
                        <Input id="student_name" name="student_name" placeholder="Enter student name" required />
                      </div>
                      <div>
                        <Label htmlFor="student_email">Student Email</Label>
                        <Input
                          id="student_email"
                          name="student_email"
                          type="email"
                          placeholder="student@edu.ma"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="club_name">Club Name</Label>
                        <Input id="club_name" name="club_name" placeholder="Enter club name" required />
                      </div>
                      <div>
                        <Label htmlFor="date_adhesion">Membership Date</Label>
                        <Input
                          id="date_adhesion"
                          name="date_adhesion"
                          type="date"
                          defaultValue={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2">
                {memberships.map((membership) => (
                  <div
                    key={membership.id_adhesion}
                    onClick={() => setSelectedMembership(membership)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedMembership?.id_adhesion === membership.id_adhesion
                        ? "bg-primary/10 border-primary"
                        : "bg-card hover:bg-accent border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{membership.student_name}</p>
                        <p className="text-xs text-muted-foreground">{membership.club_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(membership.date_adhesion).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(membership.id_adhesion)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Membership Details */}
          <div className="lg:col-span-2">
            {selectedMembership ? (
              <div className="space-y-6">
                {/* Student Information Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle>Student Information</CardTitle>
                    </div>
                    <CardDescription>Details about the member</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p className="text-base font-medium">{selectedMembership.student_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">CNE</p>
                        <p className="text-base font-medium">{selectedMembership.student_cne}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="text-base font-medium">{selectedMembership.student_email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Club Information Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <CardTitle>Club Information</CardTitle>
                    </div>
                    <CardDescription>Details about the club</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Club Name</p>
                        <p className="text-base font-medium">{selectedMembership.club_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Category</p>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                          {selectedMembership.club_category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Membership Details Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle>Membership Details</CardTitle>
                    </div>
                    <CardDescription>Registration information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
                        <p className="text-base font-medium">
                          {new Date(selectedMembership.date_adhesion).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Membership Duration</p>
                        <p className="text-base font-medium">
                          {Math.floor(
                            (new Date().getTime() - new Date(selectedMembership.date_adhesion).getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          days
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Select a membership to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
