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
import { Plus, Trash2, User, Phone, Mail, Calendar, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Guest } from "@/types/db"
import { getGuests, createGuest, deleteGuest, getGuestActivities, GuestActivityInvitation } from "@/actions/guest-actions"

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [guestActivities, setGuestActivities] = useState<GuestActivityInvitation[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const loadGuests = async () => {
    setIsLoading(true)
    try {
      const data = await getGuests()
      setGuests(data)
    } catch (error) {
      toast({ title: "Error loading guests", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadGuests()
  }, [])

  useEffect(() => {
    const fetchActivities = async () => {
      if (selectedGuest) {
        try {
          const activities = await getGuestActivities(selectedGuest.guestId)
          setGuestActivities(activities)
        } catch (error) {
          console.error("Failed to load guest activities", error)
          setGuestActivities([])
        }
      } else {
        setGuestActivities([])
      }
    }
    fetchActivities()
  }, [selectedGuest])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const result = await createGuest(formData)
      if (result.success) {
        toast({ title: result.message })
        await loadGuests()
        setIsOpen(false)
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message || "An error occurred", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteGuest(id)
      if (result.success) {
        toast({ title: result.message })
        setGuests(guests.filter((g) => g.guestId !== id))
        if (selectedGuest?.guestId === id) {
          setSelectedGuest(null)
        }
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message || "An error occurred", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Guests Management</h1>
          <p className="text-sm text-muted-foreground">External guest management</p>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Guests List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>All Guests</CardTitle>
                  <CardDescription>Select to view details</CardDescription>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Guest</DialogTitle>
                      <DialogDescription>Add a new guest to the system</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="guest_name">Full Name</Label>
                        <Input id="guest_name" name="guest_name" placeholder="Dr. John Doe" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guest_phone">Phone</Label>
                        <Input id="guest_phone" name="guest_phone" type="tel" placeholder="+212 600 000000" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="guest_email">Email</Label>
                        <Input
                          id="guest_email"
                          name="guest_email"
                          type="email"
                          placeholder="guest@email.com"
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
              <CardContent className="space-y-2 overflow-y-auto max-h-[600px]">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : guests.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">No guests found.</p>
                ) : (
                  guests.map((guest) => (
                    <div
                      key={guest.guestId}
                      onClick={() => setSelectedGuest(guest)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedGuest?.guestId === guest.guestId
                          ? "bg-primary/10 border-primary"
                          : "group bg-card border-border hover:bg-accent hover:text-accent-foreground hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{guest.fullName}</p>
                          <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/80">{guest.email}</p>
                          <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/80">{guest.phone}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 group-hover:text-accent-foreground group-hover:hover:bg-white/20"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(guest.guestId)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive group-hover:text-destructive-foreground" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Guest Details */}
          <div className="lg:col-span-2">
            {selectedGuest ? (
              <div className="space-y-6">
                {/* Guest Contact Information Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <CardTitle>Contact Information</CardTitle>
                    </div>
                    <CardDescription>Guest contact details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p className="text-base font-medium">{selectedGuest.fullName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                          <p className="text-base font-medium">{selectedGuest.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                          <p className="text-base font-medium">{selectedGuest.phone}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Invitations Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle>Activity Invitations</CardTitle>
                    </div>
                    <CardDescription>
                      Activities where this guest is invited ({guestActivities.length})
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {guestActivities.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activity Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Organizer</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {guestActivities.map((invitation, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{invitation.activityName}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                  {invitation.activityType}
                                </span>
                              </TableCell>
                              <TableCell>{new Date(invitation.startDate).toLocaleDateString()}</TableCell>
                              <TableCell>{invitation.roleDescription}</TableCell>
                              <TableCell>{invitation.clubName || invitation.eventName || "N/A"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">No activities found for this guest</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Select a guest to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}