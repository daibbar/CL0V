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
import { Plus, Edit, Trash2, Calendar, Users, Award, UserCheck, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Event = {
  id_event: number
  nom_event: string
  date_debut: string
  date_fin: string
}

type Activity = {
  id_activity: number
  nom_activity: string
  type_activity: string
  capacite: number
  id_event: number
}

type Guest = {
  id_guest: number
  nom: string
  prenom: string
  email: string
  id_activity: number
}

type Student = {
  cne: string
  nom: string
  prenom: string
  email: string
}

type Club = {
  id_club: number
  nom_club: string
  categorie: string
}

type Reservation = {
  id_reservation: number
  date_debut: string
  date_fin: string
  id_resource: number
  resource_name: string
  resource_type: string
}

const mockEvents: Event[] = [
  { id_event: 1, nom_event: "Tech Summit 2024", date_debut: "2024-06-15T09:00", date_fin: "2024-06-15T18:00" },
  { id_event: 2, nom_event: "Annual Sports Day", date_debut: "2024-07-20T08:00", date_fin: "2024-07-20T17:00" },
  { id_event: 3, nom_event: "Cultural Festival", date_debut: "2024-08-10T10:00", date_fin: "2024-08-12T20:00" },
]

const mockActivities: Activity[] = [
  { id_activity: 1, nom_activity: "AI Workshop", type_activity: "Workshop", capacite: 50, id_event: 1 },
  { id_activity: 2, nom_activity: "Hackathon Finals", type_activity: "Competition", capacite: 100, id_event: 1 },
  { id_activity: 3, nom_activity: "Football Match", type_activity: "Competition", capacite: 200, id_event: 2 },
  { id_activity: 4, nom_activity: "Basketball Tournament", type_activity: "Competition", capacite: 150, id_event: 2 },
]

const mockGuests: Guest[] = [
  { id_guest: 1, nom: "Smith", prenom: "John", email: "john.smith@tech.com", id_activity: 1 },
  { id_guest: 2, nom: "Johnson", prenom: "Sarah", email: "sarah.j@ai-corp.com", id_activity: 1 },
  { id_guest: 3, nom: "Williams", prenom: "Mike", email: "m.williams@sports.com", id_activity: 3 },
]

const mockStudents: Student[] = [
  { cne: "S12345", nom: "Alami", prenom: "Ahmed", email: "ahmed.alami@student.edu" },
  { cne: "S12346", nom: "Bennis", prenom: "Fatima", email: "fatima.bennis@student.edu" },
  { cne: "S12347", nom: "Chakir", prenom: "Omar", email: "omar.chakir@student.edu" },
]

const mockClubs: Club[] = [
  { id_club: 1, nom_club: "Tech Club", categorie: "Technological" },
  { id_club: 2, nom_club: "Sports Association", categorie: "Sport" },
  { id_club: 3, nom_club: "Cultural Society", categorie: "Entertainment" },
]

const mockReservations: Reservation[] = [
  {
    id_reservation: 1,
    date_debut: "2024-06-15T09:00",
    date_fin: "2024-06-15T18:00",
    id_resource: 1,
    resource_name: "Conference Hall A",
    resource_type: "Amphitheater",
  },
  {
    id_reservation: 2,
    date_debut: "2024-06-15T14:00",
    date_fin: "2024-06-15T17:00",
    id_resource: 2,
    resource_name: "Lab 101",
    resource_type: "Lab",
  },
  {
    id_reservation: 3,
    date_debut: "2024-07-20T08:00",
    date_fin: "2024-07-20T17:00",
    id_resource: 3,
    resource_name: "Sports Field",
    resource_type: "Field",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(mockEvents[0])
  const [isOpen, setIsOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const eventData: Event = {
      id_event: editingEvent?.id_event || Date.now(),
      nom_event: formData.get("nom_event") as string,
      date_debut: formData.get("date_debut") as string,
      date_fin: formData.get("date_fin") as string,
    }

    if (editingEvent) {
      setEvents(events.map((e) => (e.id_event === editingEvent.id_event ? eventData : e)))
      toast({ title: "Event updated successfully" })
    } else {
      setEvents([...events, eventData])
      toast({ title: "Event created successfully" })
    }

    setIsOpen(false)
    setEditingEvent(null)
  }

  const handleDelete = (id: number) => {
    setEvents(events.filter((e) => e.id_event !== id))
    if (selectedEvent?.id_event === id) {
      setSelectedEvent(events[0] || null)
    }
    toast({ title: "Event deleted successfully" })
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setIsOpen(true)
  }

  const eventActivities = mockActivities.filter((a) => a.id_activity && selectedEvent?.id_event === a.id_event)
  const activityIds = eventActivities.map((a) => a.id_activity)
  const eventGuests = mockGuests.filter((g) => activityIds.includes(g.id_activity))
  const eventReservations = mockReservations.filter((r) => {
    if (!selectedEvent) return false
    const resStart = new Date(r.date_debut)
    const resEnd = new Date(r.date_fin)
    const evtStart = new Date(selectedEvent.date_debut)
    const evtEnd = new Date(selectedEvent.date_fin)
    return resStart <= evtEnd && resEnd >= evtStart
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Events Management</h1>
          <p className="text-sm text-muted-foreground">Organize and track events</p>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Events</CardTitle>
                  <CardDescription>Select an event to view details</CardDescription>
                </div>
                <Dialog
                  open={isOpen}
                  onOpenChange={(open) => {
                    setIsOpen(open)
                    if (!open) setEditingEvent(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
                      <DialogDescription>
                        {editingEvent ? "Update event information" : "Add a new event to the system"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="nom_event">Event Name</Label>
                        <Input id="nom_event" name="nom_event" defaultValue={editingEvent?.nom_event} required />
                      </div>
                      <div>
                        <Label htmlFor="date_debut">Start Date & Time</Label>
                        <Input
                          id="date_debut"
                          name="date_debut"
                          type="datetime-local"
                          defaultValue={editingEvent?.date_debut}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="date_fin">End Date & Time</Label>
                        <Input
                          id="date_fin"
                          name="date_fin"
                          type="datetime-local"
                          defaultValue={editingEvent?.date_fin}
                          required
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">{editingEvent ? "Update" : "Create"}</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {events.map((event) => (
                <button
                  key={event.id_event}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedEvent?.id_event === event.id_event
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card hover:bg-accent border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{event.nom_event}</h3>
                      <p className="text-sm opacity-80 mt-1">
                        {new Date(event.date_debut).toLocaleDateString()} -{" "}
                        {new Date(event.date_fin).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEdit(event)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(event.id_event)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {selectedEvent ? (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedEvent.nom_event}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(selectedEvent.date_debut).toLocaleString()} -{" "}
                              {new Date(selectedEvent.date_fin).toLocaleString()}
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Event Activities
                    </CardTitle>
                    <CardDescription>All activities organized in this event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {eventActivities.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activity Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Capacity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {eventActivities.map((activity) => (
                            <TableRow key={activity.id_activity}>
                              <TableCell className="font-medium">{activity.nom_activity}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs bg-accent">
                                  {activity.type_activity}
                                </span>
                              </TableCell>
                              <TableCell>{activity.capacite} participants</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No activities for this event</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      Event Guests
                    </CardTitle>
                    <CardDescription>All guests invited to activities in this event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {eventGuests.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Activity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {eventGuests.map((guest) => {
                            const activity = mockActivities.find((a) => a.id_activity === guest.id_activity)
                            return (
                              <TableRow key={guest.id_guest}>
                                <TableCell className="font-medium">
                                  {guest.prenom} {guest.nom}
                                </TableCell>
                                <TableCell>{guest.email}</TableCell>
                                <TableCell>{activity?.nom_activity || "N/A"}</TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No guests for this event</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Participating Students
                    </CardTitle>
                    <CardDescription>All students participating in this event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>CNE</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockStudents.map((student) => (
                          <TableRow key={student.cne}>
                            <TableCell className="font-medium">{student.cne}</TableCell>
                            <TableCell>
                              {student.prenom} {student.nom}
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Organizing Clubs
                    </CardTitle>
                    <CardDescription>All clubs organizing this event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Club Name</TableHead>
                          <TableHead>Category</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockClubs.map((club) => (
                          <TableRow key={club.id_club}>
                            <TableCell className="font-medium">{club.nom_club}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs bg-accent">{club.categorie}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Resource Reservations
                    </CardTitle>
                    <CardDescription>All resources reserved during the event period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {eventReservations.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Resource</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date & Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {eventReservations.map((reservation) => (
                            <TableRow key={reservation.id_reservation}>
                              <TableCell className="font-medium">{reservation.resource_name}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs bg-accent">
                                  {reservation.resource_type}
                                </span>
                              </TableCell>
                              <TableCell>
                                {new Date(reservation.date_debut).toLocaleString()} -{" "}
                                {new Date(reservation.date_fin).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No reservations for this event</p>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Select an event to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
