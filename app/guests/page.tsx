"use client"

import type React from "react"
import { useState } from "react"
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
import { Plus, Trash2, User, Phone, Mail, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Guest = {
  id_guest: number
  guest_name: string
  guest_phone: string
  guest_email: string
}

type ActivityInvitation = {
  activity_name: string
  activity_type: string
  activity_date: string
  event_name: string
  club_name: string
}

// REMOVED MOCK DATA - Using server actions for real data

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const guestData: Guest = {
      id_guest: Date.now(),
      guest_name: formData.get("guest_name") as string,
      guest_phone: formData.get("guest_phone") as string,
      guest_email: formData.get("guest_email") as string,
    }

    setGuests([...guests, guestData])
    toast({ title: "Guest created successfully" })
    setIsOpen(false)
  }

  const handleDelete = (id: number) => {
    setGuests(guests.filter((g) => g.id_guest !== id))
    if (selectedGuest?.id_guest === id) {
      setSelectedGuest(guests[0] || null)
    }
    toast({ title: "Guest deleted successfully" })
  }

  const getGuestActivities = (guestId: number): ActivityInvitation[] => {
    // TODO: implement server action to fetch activity invitations for a guest
    return []
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
                  <CardDescription>{guests.length} total guests</CardDescription>
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
                      <div>
                        <Label htmlFor="guest_name">Guest Name</Label>
                        <Input id="guest_name" name="guest_name" placeholder="Dr. John Doe" required />
                      </div>
                      <div>
                        <Label htmlFor="guest_phone">Phone</Label>
                        <Input id="guest_phone" name="guest_phone" type="tel" placeholder="+212 600 000000" required />
                      </div>
                      <div>
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
              <CardContent className="space-y-2">
                {guests.map((guest) => (
                  <div
                    key={guest.id_guest}
                    onClick={() => setSelectedGuest(guest)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedGuest?.id_guest === guest.id_guest
                        ? "bg-primary/10 border-primary"
                        : "bg-card hover:bg-accent border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{guest.guest_name}</p>
                        <p className="text-xs text-muted-foreground">{guest.guest_email}</p>
                        <p className="text-xs text-muted-foreground">{guest.guest_phone}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(guest.id_guest)
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
                        <p className="text-base font-medium">{selectedGuest.guest_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                          <p className="text-base font-medium">{selectedGuest.guest_email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                          <p className="text-base font-medium">{selectedGuest.guest_phone}</p>
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
                      Activities where this guest is invited ({getGuestActivities(selectedGuest.id_guest).length})
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {getGuestActivities(selectedGuest.id_guest).length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activity Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead>Club</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getGuestActivities(selectedGuest.id_guest).map((invitation, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{invitation.activity_name}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                  {invitation.activity_type}
                                </span>
                              </TableCell>
                              <TableCell>{new Date(invitation.activity_date).toLocaleDateString()}</TableCell>
                              <TableCell>{invitation.event_name}</TableCell>
                              <TableCell>{invitation.club_name}</TableCell>
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
