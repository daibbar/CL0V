"use client"

import type React from "react"
import { useEffect, useState } from "react"
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
import { getStudents } from "@/actions/student-actions"
import { getClubs, getClubMemberships, createClubMembership, deleteClubMembership } from "@/actions/club-actions"
import type { Club, Student, ClubMembershipWithDetails } from "@/types/db"

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState<ClubMembershipWithDetails[]>([])
  const [selectedMembership, setSelectedMembership] = useState<ClubMembershipWithDetails | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [clubs, setClubs] = useState<Club[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => {
      try {
        const s = await getStudents()
        setStudents(s as Student[])
        const c = await getClubs()
        setClubs(c as Club[])
        const m = await getClubMemberships()
        setMemberships(m as ClubMembershipWithDetails[])
        setSelectedMembership((m as ClubMembershipWithDetails[])[0] || null)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const res = await createClubMembership(formData)
    if (res?.success) {
      const m = await getClubMemberships()
      setMemberships(m as ClubMembershipWithDetails[])
      setSelectedMembership((m as ClubMembershipWithDetails[])[0] || null)
      toast({ title: "Membership created successfully" })
      setIsOpen(false)
    } else {
      toast({ title: res?.message || 'Failed to create membership' })
    }
  }

  const handleDelete = async (id: number) => {
    const res = await deleteClubMembership(id)
    if (res?.success) {
      const m = await getClubMemberships()
      setMemberships(m as ClubMembershipWithDetails[])
      setSelectedMembership((m as ClubMembershipWithDetails[])[0] || null)
      toast({ title: "Membership deleted successfully" })
    } else {
      toast({ title: res?.message || 'Failed to delete membership' })
    }
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
                        <Label htmlFor="studentId">Student</Label>
                        <select id="studentId" name="studentId" className="w-full p-2 border rounded" required>
                          <option value="">Select a student</option>
                          {students.map((s) => (
                            <option key={s.studentId} value={s.studentId}>
                              {s.firstName} {s.lastName} — {s.cne}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="clubId">Club</Label>
                        <select id="clubId" name="clubId" className="w-full p-2 border rounded" required>
                          <option value="">Select a club</option>
                          {clubs.map((c) => (
                            <option key={c.clubId} value={c.clubId}>
                              {c.clubName} ({c.category})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="joinedAt">Membership Date</Label>
                        <Input
                          id="joinedAt"
                          name="joinedAt"
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
                    key={membership.membershipId}
                    onClick={() => setSelectedMembership(membership)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedMembership?.membershipId === membership.membershipId
                        ? "bg-primary/10 border-primary"
                        : "bg-card hover:bg-accent border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{membership.studentName}</p>
                        <p className="text-xs text-muted-foreground">{membership.clubName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(membership.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(membership.membershipId)
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
                        <p className="text-base font-medium">{selectedMembership.studentName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">CNE</p>
                        <p className="text-base font-medium">{selectedMembership.studentCne}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="text-base font-medium">{selectedMembership.studentEmail}</p>
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
                        <p className="text-base font-medium">{selectedMembership.clubName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Category</p>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                          {selectedMembership.clubCategory}
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
                          {new Date(selectedMembership.joinedAt).toLocaleDateString("en-US", {
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
                            (new Date().getTime() - new Date(selectedMembership.joinedAt).getTime()) /
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
