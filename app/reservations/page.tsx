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
import { Plus, Trash2, MapPin, Calendar, Briefcase } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Reservation = {
  id_reservation: number
  nom: string
  date_debut: string
  date_fin: string
  resource_name: string
  resource_type: string
  resource_capacity: number
  activity_name: string
  activity_type: string
  club_name: string
}

const mockReservations: Reservation[] = [
  {
    id_reservation: 1,
    nom: "Workshop Booking",
    date_debut: "2024-06-20T14:00",
    date_fin: "2024-06-20T17:00",
    resource_name: "Room A101",
    resource_type: "Salle",
    resource_capacity: 50,
    activity_name: "Web Development Workshop",
    activity_type: "Workshop",
    club_name: "Tech Club",
  },
  {
    id_reservation: 2,
    nom: "Conference Hall",
    date_debut: "2024-07-15T09:00",
    date_fin: "2024-07-15T12:00",
    resource_name: "Amphitheater B",
    resource_type: "Amphi",
    resource_capacity: 200,
    activity_name: "AI Conference 2024",
    activity_type: "Conference",
    club_name: "Tech Club",
  },
  {
    id_reservation: 3,
    nom: "Sports Field",
    date_debut: "2024-06-25T16:00",
    date_fin: "2024-06-25T18:00",
    resource_name: "Football Field",
    resource_type: "Terrain",
    resource_capacity: 100,
    activity_name: "Inter-Club Tournament",
    activity_type: "Competition",
    club_name: "Sports Association",
  },
]

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(mockReservations[0])
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const reservationData: Reservation = {
      id_reservation: Date.now(),
      nom: formData.get("nom") as string,
      date_debut: formData.get("date_debut") as string,
      date_fin: formData.get("date_fin") as string,
      resource_name: formData.get("resource_name") as string,
      resource_type: "Salle",
      resource_capacity: 50,
      activity_name: formData.get("activity_name") as string,
      activity_type: "Workshop",
      club_name: "Tech Club",
    }

    setReservations([...reservations, reservationData])
    toast({ title: "Reservation created successfully" })
    setIsOpen(false)
  }

  const handleDelete = (id: number) => {
    setReservations(reservations.filter((r) => r.id_reservation !== id))
    if (selectedReservation?.id_reservation === id) {
      setSelectedReservation(reservations[0] || null)
    }
    toast({ title: "Reservation deleted successfully" })
  }

  const calculateDuration = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Reservations Management</h1>
          <p className="text-sm text-muted-foreground">Resource booking system</p>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Reservations List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>All Reservations</CardTitle>
                  <CardDescription>{reservations.length} total reservations</CardDescription>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Create New Reservation</DialogTitle>
                      <DialogDescription>Book a resource for an activity</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="nom">Reservation Name</Label>
                        <Input id="nom" name="nom" placeholder="Workshop Booking" required />
                      </div>
                      <div>
                        <Label htmlFor="activity_name">Activity</Label>
                        <Input id="activity_name" name="activity_name" placeholder="Select activity" required />
                      </div>
                      <div>
                        <Label htmlFor="resource_name">Resource</Label>
                        <Input id="resource_name" name="resource_name" placeholder="Select resource" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date_debut">Start Date & Time</Label>
                          <Input id="date_debut" name="date_debut" type="datetime-local" required />
                        </div>
                        <div>
                          <Label htmlFor="date_fin">End Date & Time</Label>
                          <Input id="date_fin" name="date_fin" type="datetime-local" required />
                        </div>
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
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id_reservation}
                    onClick={() => setSelectedReservation(reservation)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedReservation?.id_reservation === reservation.id_reservation
                        ? "bg-primary/10 border-primary"
                        : "bg-card hover:bg-accent border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <p className="font-medium text-sm">{reservation.nom}</p>
                        <p className="text-xs text-muted-foreground">{reservation.resource_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(reservation.date_debut).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(reservation.id_reservation)
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

          {/* Right Column - Reservation Details */}
          <div className="lg:col-span-2">
            {selectedReservation ? (
              <div className="space-y-6">
                {/* Reservation Info Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle>Reservation Information</CardTitle>
                    </div>
                    <CardDescription>Booking details and timing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Reservation Name</p>
                        <p className="text-base font-medium">{selectedReservation.nom}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Start Time</p>
                        <p className="text-base font-medium">
                          {new Date(selectedReservation.date_debut).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">End Time</p>
                        <p className="text-base font-medium">
                          {new Date(selectedReservation.date_fin).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Duration</p>
                        <p className="text-base font-medium">
                          {calculateDuration(selectedReservation.date_debut, selectedReservation.date_fin)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resource Information Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle>Resource Information</CardTitle>
                    </div>
                    <CardDescription>Details about the reserved resource</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Resource Name</p>
                        <p className="text-base font-medium">{selectedReservation.resource_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Type</p>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                          {selectedReservation.resource_type}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Capacity</p>
                        <p className="text-base font-medium">{selectedReservation.resource_capacity} people</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Information Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <CardTitle>Activity Information</CardTitle>
                    </div>
                    <CardDescription>Activity using this reservation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Activity Name</p>
                        <p className="text-base font-medium">{selectedReservation.activity_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Type</p>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                          {selectedReservation.activity_type}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Organizing Club</p>
                        <p className="text-base font-medium">{selectedReservation.club_name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Select a reservation to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
