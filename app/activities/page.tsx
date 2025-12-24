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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Calendar, Users, MapPin, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Activity = {
  id_activite: number
  nom_activite: string
  activite_description: string
  type_activite: string
  capacite_max: number
  date_debut: string
  date_fin: string
  id_event: number
}

type Event = {
  id_event: number
  nom_event: string
  event_description: string
  date_event: string
  lieu: string
}

type Guest = {
  id_invite: number
  nom_invite: string
  prenom_invite: string
  email_invite: string
  tel_invite: string
  id_activite: number
}

type Reservation = {
  id_reservation: number
  id_ressource: number
  id_activite: number
  date_reservation: string
  heure_debut: string
  heure_fin: string
  resourceName: string
  resourceType: string
}

type Club = {
  id_club: number
  nom_club: string
  club_description: string
  categorie: string
}

type Student = {
  id_etudiant: number
  nom: string
  prenom: string
  cne: string
  email: string
  id_filliere: string
}

const mockActivities: Activity[] = [
  {
    id_activite: 1,
    nom_activite: "Web Development Workshop",
    activite_description: "Learn React and Next.js from industry experts",
    type_activite: "Atelier",
    capacite_max: 30,
    date_debut: "2024-06-20T14:00",
    date_fin: "2024-06-20T17:00",
    id_event: 1,
  },
  {
    id_activite: 2,
    nom_activite: "Football Tournament",
    activite_description: "Inter-club football competition with prizes",
    type_activite: "Competition",
    capacite_max: 100,
    date_debut: "2024-07-10T09:00",
    date_fin: "2024-07-10T18:00",
    id_event: 2,
  },
  {
    id_activite: 3,
    nom_activite: "AI & Machine Learning Conference",
    activite_description: "Keynote speakers discussing the future of AI",
    type_activite: "Conference",
    capacite_max: 50,
    date_debut: "2024-08-15T10:00",
    date_fin: "2024-08-15T16:00",
    id_event: 1,
  },
]

const mockEvents: Event[] = [
  {
    id_event: 1,
    nom_event: "Tech Week 2024",
    event_description: "A week of technology workshops and conferences",
    date_event: "2024-06-20",
    lieu: "Main Campus",
  },
  {
    id_event: 2,
    nom_event: "Sports Festival",
    event_description: "Annual inter-club sports competition",
    date_event: "2024-07-10",
    lieu: "Sports Complex",
  },
]

const mockGuests: Guest[] = [
  {
    id_invite: 1,
    nom_invite: "Johnson",
    prenom_invite: "Mike",
    email_invite: "mike.j@tech.com",
    tel_invite: "0612345678",
    id_activite: 1,
  },
  {
    id_invite: 2,
    nom_invite: "Smith",
    prenom_invite: "Sarah",
    email_invite: "sarah.s@expert.com",
    tel_invite: "0623456789",
    id_activite: 1,
  },
  {
    id_invite: 3,
    nom_invite: "Brown",
    prenom_invite: "David",
    email_invite: "david.b@sports.com",
    tel_invite: "0634567890",
    id_activite: 2,
  },
]

const mockReservations: Reservation[] = [
  {
    id_reservation: 1,
    id_ressource: 1,
    id_activite: 1,
    date_reservation: "2024-06-20",
    heure_debut: "14:00",
    heure_fin: "17:00",
    resourceName: "Conference Room A",
    resourceType: "Salle",
  },
  {
    id_reservation: 2,
    id_ressource: 3,
    id_activite: 2,
    date_reservation: "2024-07-10",
    heure_debut: "09:00",
    heure_fin: "18:00",
    resourceName: "Football Field",
    resourceType: "Terrain",
  },
  {
    id_reservation: 3,
    id_ressource: 2,
    id_activite: 1,
    date_reservation: "2024-06-20",
    heure_debut: "14:00",
    heure_fin: "17:00",
    resourceName: "Computer Lab 1",
    resourceType: "Laboratoire",
  },
]

const mockClubs: Club[] = [
  {
    id_club: 1,
    nom_club: "Tech Club",
    club_description: "Technology and innovation enthusiasts",
    categorie: "Technologique",
  },
  {
    id_club: 2,
    nom_club: "Sports Club",
    club_description: "Promoting physical activities",
    categorie: "Sport",
  },
]

const mockStudents: Student[] = [
  { id_etudiant: 1, nom: "Alami", prenom: "Sara", cne: "N12345678", email: "sara.alami@edu.ma", id_filliere: "GI" },
  {
    id_etudiant: 2,
    nom: "Bennani",
    prenom: "Omar",
    cne: "N23456789",
    email: "omar.bennani@edu.ma",
    id_filliere: "IID",
  },
  {
    id_etudiant: 3,
    nom: "El Idrissi",
    prenom: "Fatima",
    cne: "N34567890",
    email: "fatima.elidrissi@edu.ma",
    id_filliere: "MGSI",
  },
]

const mockActivitySubscriptions = [
  { id_activite: 1, id_etudiant: 1 },
  { id_activite: 1, id_etudiant: 2 },
  { id_activite: 2, id_etudiant: 2 },
  { id_activite: 2, id_etudiant: 3 },
  { id_activite: 3, id_etudiant: 1 },
  { id_activite: 3, id_etudiant: 3 },
]

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(mockActivities[0])
  const [isOpen, setIsOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const activityData: Activity = {
      id_activite: editingActivity?.id_activite || Date.now(),
      nom_activite: formData.get("nom_activite") as string,
      activite_description: formData.get("activite_description") as string,
      type_activite: formData.get("type_activite") as string,
      capacite_max: Number.parseInt(formData.get("capacite_max") as string),
      date_debut: formData.get("date_debut") as string,
      date_fin: formData.get("date_fin") as string,
      id_event: Number.parseInt(formData.get("id_event") as string),
    }

    if (editingActivity) {
      setActivities(activities.map((a) => (a.id_activite === editingActivity.id_activite ? activityData : a)))
      toast({ title: "Activity updated successfully" })
      if (selectedActivity?.id_activite === editingActivity.id_activite) {
        setSelectedActivity(activityData)
      }
    } else {
      setActivities([...activities, activityData])
      toast({ title: "Activity created successfully" })
    }

    setIsOpen(false)
    setEditingActivity(null)
  }

  const handleDelete = (id: number) => {
    setActivities(activities.filter((a) => a.id_activite !== id))
    if (selectedActivity?.id_activite === id) {
      setSelectedActivity(activities.find((a) => a.id_activite !== id) || null)
    }
    toast({ title: "Activity deleted successfully" })
  }

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity)
    setIsOpen(true)
  }

  const getActivityEvent = () => {
    if (!selectedActivity) return null
    return mockEvents.find((e) => e.id_event === selectedActivity.id_event)
  }

  const getActivityGuests = () => {
    if (!selectedActivity) return []
    return mockGuests.filter((g) => g.id_activite === selectedActivity.id_activite)
  }

  const getActivityReservations = () => {
    if (!selectedActivity) return []
    return mockReservations.filter((r) => r.id_activite === selectedActivity.id_activite)
  }

  const getOrganizingClub = () => {
    if (!selectedActivity) return null
    // In a real app, you would get this from the event-club relationship
    return mockClubs[0] // Mock data
  }

  const getActivityStudents = () => {
    if (!selectedActivity) return []
    const subscribedStudentIds = mockActivitySubscriptions
      .filter((sub) => sub.id_activite === selectedActivity.id_activite)
      .map((sub) => sub.id_etudiant)
    return mockStudents.filter((student) => subscribedStudentIds.includes(student.id_etudiant))
  }

  const activityEvent = getActivityEvent()
  const activityGuests = getActivityGuests()
  const activityReservations = getActivityReservations()
  const organizingClub = getOrganizingClub()
  const activityStudents = getActivityStudents()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Activities Management</h1>
          <p className="text-sm text-muted-foreground">Manage club and event activities</p>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Activities List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>All Activities</CardTitle>
                  <CardDescription className="text-xs">Select to view details</CardDescription>
                </div>
                <Dialog
                  open={isOpen}
                  onOpenChange={(open) => {
                    setIsOpen(open)
                    if (!open) setEditingActivity(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingActivity ? "Edit Activity" : "Create New Activity"}</DialogTitle>
                      <DialogDescription>
                        {editingActivity ? "Update activity information" : "Add a new activity to the system"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="nom_activite">Activity Name</Label>
                        <Input
                          id="nom_activite"
                          name="nom_activite"
                          defaultValue={editingActivity?.nom_activite}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="activite_description">Description</Label>
                        <Textarea
                          id="activite_description"
                          name="activite_description"
                          defaultValue={editingActivity?.activite_description}
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type_activite">Type</Label>
                          <Select name="type_activite" defaultValue={editingActivity?.type_activite} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Voyage">Voyage</SelectItem>
                              <SelectItem value="Atelier">Atelier</SelectItem>
                              <SelectItem value="Conference">Conference</SelectItem>
                              <SelectItem value="Competition">Competition</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="capacite_max">Max Capacity</Label>
                          <Input
                            id="capacite_max"
                            name="capacite_max"
                            type="number"
                            min="1"
                            defaultValue={editingActivity?.capacite_max}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="id_event">Event</Label>
                        <Select name="id_event" defaultValue={editingActivity?.id_event.toString()} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockEvents.map((event) => (
                              <SelectItem key={event.id_event} value={event.id_event.toString()}>
                                {event.nom_event}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date_debut">Start Date & Time</Label>
                          <Input
                            id="date_debut"
                            name="date_debut"
                            type="datetime-local"
                            defaultValue={editingActivity?.date_debut}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="date_fin">End Date & Time</Label>
                          <Input
                            id="date_fin"
                            name="date_fin"
                            type="datetime-local"
                            defaultValue={editingActivity?.date_fin}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">{editingActivity ? "Update" : "Create"}</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2">
                {activities.map((activity) => (
                  <div
                    key={activity.id_activite}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                      selectedActivity?.id_activite === activity.id_activite
                        ? "bg-primary/5 border-primary"
                        : "bg-card border-border"
                    }`}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{activity.nom_activite}</h3>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(activity)
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
                            handleDelete(activity.id_activite)
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                        {activity.type_activite}
                      </span>
                      <p className="text-xs text-muted-foreground line-clamp-2">{activity.activite_description}</p>
                      <p className="text-xs text-muted-foreground">Capacity: {activity.capacite_max} participants</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity Details */}
          <div className="lg:col-span-2">
            {selectedActivity ? (
              <div className="space-y-6">
                {/* Activity Details Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedActivity.nom_activite}</CardTitle>
                        <CardDescription className="mt-2">{selectedActivity.activite_description}</CardDescription>
                      </div>
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                        {selectedActivity.type_activite}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Start Date & Time</p>
                        <p className="font-medium">{new Date(selectedActivity.date_debut).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">End Date & Time</p>
                        <p className="font-medium">{new Date(selectedActivity.date_fin).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Maximum Capacity</p>
                        <p className="font-medium">{selectedActivity.capacite_max} participants</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Activity ID</p>
                        <p className="font-medium">#{selectedActivity.id_activite}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Parent Event Card */}
                {activityEvent && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Parent Event</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{activityEvent.nom_event}</h4>
                          <p className="text-sm text-muted-foreground">{activityEvent.event_description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Event Date</p>
                            <p className="font-medium">{new Date(activityEvent.date_event).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Location</p>
                            <p className="font-medium">{activityEvent.lieu}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Organizing Club Card */}
                {organizingClub && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Organizing Club</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg">{organizingClub.nom_club}</h4>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                            {organizingClub.categorie}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{organizingClub.club_description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Guests Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">Invited Guests</CardTitle>
                      </div>
                    </div>
                    <CardDescription>External guests invited to this activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activityGuests.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activityGuests.map((guest) => (
                            <TableRow key={guest.id_invite}>
                              <TableCell className="font-medium">{`${guest.prenom_invite} ${guest.nom_invite}`}</TableCell>
                              <TableCell>{guest.email_invite}</TableCell>
                              <TableCell>{guest.tel_invite}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No guests invited yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Students Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">Subscribed Students</CardTitle>
                        <CardDescription>Students registered for this activity</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {activityStudents.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>CNE</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Program</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activityStudents.map((student) => (
                            <TableRow key={student.id_etudiant}>
                              <TableCell className="font-medium">{`${student.prenom} ${student.nom}`}</TableCell>
                              <TableCell>{student.cne}</TableCell>
                              <TableCell>{student.email}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                  {student.id_filliere}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No students subscribed yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Resource Reservations Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">Resource Reservations</CardTitle>
                        <CardDescription className="text-xs">
                          {activityReservations.length} resource{activityReservations.length !== 1 ? "s" : ""} reserved
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {activityReservations.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Resource</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activityReservations.map((reservation) => (
                            <TableRow key={reservation.id_reservation}>
                              <TableCell className="font-medium">{reservation.resourceName}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                  {reservation.resourceType}
                                </span>
                              </TableCell>
                              <TableCell>{new Date(reservation.date_reservation).toLocaleDateString()}</TableCell>
                              <TableCell>
                                {reservation.heure_debut} - {reservation.heure_fin}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No resources reserved yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">Select an activity to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
