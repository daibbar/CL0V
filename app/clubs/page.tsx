"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Users, Calendar, Activity as ActivityIcon, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 1. Import centralized types
import { Club, Event, Activity, Student } from "@/types/db"

// 2. Import Server Actions
import { createClub, updateClub, deleteClub, getClubs } from "@/actions/club-actions"

// 3. Define joined/UI-specific types
type Member = Student & {
  joinedAt: string
}

// --- REMOVED ALL MOCK DATA - USING SERVER ACTIONS FOR REAL DATA ---

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingClub, setEditingClub] = useState<Club | null>(null)
  const [selectedClub, setSelectedClub] = useState<number | null>(null)
  const { toast } = useToast()

  // --- 1. FETCH REAL DATA ON LOAD ---
  const loadClubs = async () => {
    setIsLoading(true)
    try {
      const data = await getClubs()
      setClubs(data)
    } catch (error) {
      toast({ title: "Error loading clubs", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadClubs()
  }, [])

  // --- 2. HANDLE SUBMIT (CREATE / UPDATE) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    let result
    if (editingClub) {
      // Update
      result = await updateClub(editingClub.clubId, formData)
    } else {
      // Create
      // Ensure creation date is set if not provided by user
      if (!formData.get('createdAt')) {
        formData.set('createdAt', new Date().toISOString().split('T')[0])
      }
      result = await createClub(formData)
    }

    if (result.success) {
      toast({ title: result.message })
      await loadClubs() // Reload the list from DB
      setIsOpen(false)
      setEditingClub(null)
    } else {
      toast({ 
        title: "Operation Failed", 
        description: result.message, 
        variant: "destructive" 
      })
    }
  }

  // --- 3. HANDLE DELETE ---
  const handleDelete = async (id: number) => {
    const result = await deleteClub(id)
    
    if (result.success) {
      toast({ title: result.message })
      // Optimistic update: remove locally immediately
      setClubs(clubs.filter((c) => c.clubId !== id))
      if (selectedClub === id) {
        setSelectedClub(null)
      }
    } else {
      toast({ 
        title: "Delete Failed", 
        description: result.message, 
        variant: "destructive" 
      })
    }
  }

  const handleEdit = (club: Club) => {
    setEditingClub(club)
    setIsOpen(true)
  }

  const selectedClubData = clubs.find((c) => c.clubId === selectedClub)
  // TODO: Implement server actions for members/events/activities per-club
  const clubMembers: Member[] = []
  const clubEvents: Event[] = []
  const clubActivities: Activity[] = []

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Clubs Management</h1>
          <p className="text-sm text-muted-foreground">Manage student clubs and organizations</p>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* --- LEFT COLUMN: LIST OF CLUBS --- */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>All Clubs</CardTitle>
                  <CardDescription>Select a club to view details</CardDescription>
                </div>
                <Dialog
                  open={isOpen}
                  onOpenChange={(open) => {
                    setIsOpen(open)
                    if (!open) setEditingClub(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{editingClub ? "Edit Club" : "Create New Club"}</DialogTitle>
                      <DialogDescription>
                        {editingClub ? "Update club information" : "Add a new club to the system"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="clubName">Club Name</Label>
                        <Input id="clubName" name="clubName" defaultValue={editingClub?.clubName} required />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue={editingClub?.category} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="art et culture">Art et Culture</SelectItem>
                            <SelectItem value="sport">Sport</SelectItem>
                            <SelectItem value="technologie">Technologie</SelectItem>
                            <SelectItem value="entrepreneuriat social">Entrepreneuriat Social</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="createdAt">Creation Date</Label>
                        <Input
                          id="createdAt"
                          name="createdAt"
                          type="date"
                          defaultValue={editingClub?.createdAt ? new Date(editingClub.createdAt).toISOString().split('T')[0] : ''}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          defaultValue={editingClub?.description || ''}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">{editingClub ? "Update" : "Create"}</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : clubs.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground text-sm">
                    No clubs found. Create one!
                  </div>
                ) : (
                  clubs.map((club) => (
                    <div
                      key={club.clubId}
                      className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedClub === club.clubId
                          ? "bg-primary/10 border-primary"
                          : "bg-card border-border hover:bg-muted"
                      }`}
                      onClick={() => setSelectedClub(club.clubId)}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm truncate">{club.clubName}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent">
                            {club.category}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(club)
                          }}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(club.clubId)
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* --- RIGHT COLUMN: CLUB DETAILS --- */}
          <div className="lg:col-span-2">
            {selectedClubData ? (
              <div className="space-y-6">
                {/* Club Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedClubData.clubName}</CardTitle>
                    <CardDescription>{selectedClubData.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="font-medium mt-1">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent">
                            {selectedClubData.category}
                          </span>
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <p className="font-medium mt-1">
                          {new Date(selectedClubData.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Members Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      <CardTitle>Members ({clubMembers.length})</CardTitle>
                    </div>
                    <CardDescription>Club members and registration dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {clubMembers.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Joined</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clubMembers.map((member) => (
                            <TableRow key={member.studentId}>
                              <TableCell className="font-mono text-sm">{member.cne}</TableCell>
                              <TableCell className="font-medium">{member.firstName} {member.lastName}</TableCell>
                              <TableCell className="text-muted-foreground">{member.email}</TableCell>
                              <TableCell>{new Date(member.joinedAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">No members yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Events Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-accent" />
                      <CardTitle>Events ({clubEvents.length})</CardTitle>
                    </div>
                    <CardDescription>Events this club participates in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {clubEvents.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clubEvents.map((event) => (
                            <TableRow key={event.eventId}>
                              <TableCell className="font-medium">{event.eventName}</TableCell>
                              <TableCell>{new Date(event.startDate).toLocaleDateString()}</TableCell>
                              <TableCell>{new Date(event.endDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">No events yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Activities Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <ActivityIcon className="h-5 w-5 text-accent" />
                      <CardTitle>Activities ({clubActivities.length})</CardTitle>
                    </div>
                    <CardDescription>Activities organized by this club</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {clubActivities.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activity Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Capacity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clubActivities.map((activity) => (
                            <TableRow key={activity.activityId}>
                              <TableCell className="font-medium">{activity.activityName}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary capitalize">
                                  {activity.type}
                                </span>
                              </TableCell>
                              <TableCell>{new Date(activity.startDate).toLocaleDateString()}</TableCell>
                              <TableCell className="text-muted-foreground">{activity.maxCapacity} people</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">No activities yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-[400px] flex items-center justify-center">
                <CardContent>
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">No club selected</p>
                    <p className="text-sm text-muted-foreground">Select a club from the list to view its details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}