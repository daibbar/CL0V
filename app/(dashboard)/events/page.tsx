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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Calendar, Users, Award, UserCheck, BookOpen, UserPlus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
// Import the actions
import { createEvent, updateEvent, deleteEvent, addStudentToEvent, removeStudentFromEvent, getEventParticipants } from "@/actions/event-actions"
import { getStudents } from "@/actions/student-actions"
import type { Student } from "@/types/db"
import { getActivities, getActivityGuests, getActivityReservations } from "@/actions/activity-actions"
import { getClubsByEvent, getClubs } from "@/actions/club-actions"
import { Checkbox } from "@/components/ui/checkbox"

// Use canonical types from types/db
import type { Event, Activity, Reservation, Club as ClubType, Guest, GuestRole } from "@/types/db"

// UI helper type: Student with major name
type StudentWithMajor = Student & { majorName?: string | null }

// Import getEvents action to load real data
import { getEvents } from "@/actions/event-actions"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [participants, setParticipants] = useState<StudentWithMajor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [eventActivities, setEventActivities] = useState<Activity[]>([])
  const [eventGuests, setEventGuests] = useState<(GuestRole & Partial<Guest>)[]>([])
  const [eventReservations, setEventReservations] = useState<Reservation[]>([])
  const [organizingClubs, setOrganizingClubs] = useState<ClubType[]>([])
  
  // New State for Club Selection
  const [allClubs, setAllClubs] = useState<ClubType[]>([])
  const [selectedClubIds, setSelectedClubIds] = useState<number[]>([])

  // Dialog States
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  
  const { toast } = useToast()

  // Load data from database on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [eventsData, studentsData, clubsData] = await Promise.all([
          getEvents(),
          getStudents(),
          getClubs()
        ])
        setEvents(eventsData)
        setStudents(studentsData)
        setAllClubs(clubsData)

        if (eventsData.length > 0) {
          setSelectedEvent(eventsData[0])
          // load participants for first event
          try {
            const p = await getEventParticipants(eventsData[0].eventId)
            setParticipants(p)
          } catch (err) {
            console.error('Failed to load participants', err)
            setParticipants([])
          }
        }
      } catch (error) {
        toast({ title: "Error loading data", variant: "destructive" })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // helper to fetch participants for current event
  const fetchParticipants = async (eventId: number | null) => {
    if (!eventId) {
      setParticipants([])
      return
    }
    try {
      const p = await getEventParticipants(eventId)
      setParticipants(p)
    } catch (err) {
      console.error('Failed to fetch participants', err)
      setParticipants([])
    }
  }

  useEffect(() => {
    if (!selectedEvent) {
      setEventActivities([])
      setEventGuests([])
      setEventReservations([])
      setOrganizingClubs([])
      return
    }

    const loadEventDetails = async () => {
      try {
        // Refresh participants for the newly selected event
        fetchParticipants(selectedEvent.eventId);

        const activities = await getActivities()
        const filtered = activities.filter((a: Activity) => a.eventId === selectedEvent.eventId)
        setEventActivities(filtered)

        // Load guests and reservations for each activity
        const guestsAccumulator: (GuestRole & Partial<Guest>)[] = []
        const reservationsAccumulator: Reservation[] = []
        await Promise.all(
          filtered.map(async (act: Activity) => {
            const actId = act.activityId
            const g = (await getActivityGuests(actId)) as (GuestRole & Partial<Guest>)[]
            if (Array.isArray(g) && g.length) {
              guestsAccumulator.push(...g)
            }
            const r = await getActivityReservations(actId)
            if (Array.isArray(r) && r.length) {
              reservationsAccumulator.push(...(r as any))
            }
          })
        )

        setEventGuests(guestsAccumulator)
        setEventReservations(reservationsAccumulator)

        // Load organizing clubs for this event
        const clubs = (await getClubsByEvent(selectedEvent.eventId)) as ClubType[]
        setOrganizingClubs(clubs)
      } catch (error) {
        console.error(error)
      }
    }

    loadEventDetails()
  }, [selectedEvent])

  // --- EVENT HANDLERS ---
  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Append selected clubs as JSON
    formData.append('clubIds', JSON.stringify(selectedClubIds));

    try {
      if (editingEvent) {
        const result = await updateEvent(editingEvent.eventId, formData)
        if (result.success) {
          const updatedEvent: Event = {
            eventId: editingEvent.eventId,
            eventName: formData.get("eventName") as string,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
          }
          setEvents(events.map((e) => (e.eventId === editingEvent.eventId ? updatedEvent : e)))
          
          // If the currently selected event was edited, refresh its details (specifically organizers)
          if (selectedEvent?.eventId === editingEvent.eventId) {
              const clubs = (await getClubsByEvent(selectedEvent.eventId)) as ClubType[]
              setOrganizingClubs(clubs)
          }
          
          toast({ title: result.message })
        } else {
          toast({ title: result.message, variant: "destructive" })
        }
      } else {
        const result = await createEvent(formData)
        if (result.success) {
           // Reload events to get the new ID properly
           const newEvents = await getEvents();
           setEvents(newEvents);
           toast({ title: result.message })
        } else {
          toast({ title: result.message, variant: "destructive" })
        }
      }

      setIsEventDialogOpen(false)
      setEditingEvent(null)
      setSelectedClubIds([]) // Reset selection
    } catch (error: any) {
      toast({ title: error.message || "An error occurred", variant: "destructive" })
    }
  }

  const handleDeleteEvent = async (id: number) => {
    try {
      const result = await deleteEvent(id)
      if (result.success) {
        const updatedEvents = events.filter((e) => e.eventId !== id)
        setEvents(updatedEvents)
        
        if (selectedEvent?.eventId === id) {
          setSelectedEvent(updatedEvents[0] || null)
        }
        toast({ title: result.message })
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message || "An error occurred", variant: "destructive" })
    }
  }

  const handleEditEvent = async (event: Event) => {
    setEditingEvent(event)
    // Fetch current organizers to populate the checkboxes
    const organizers = await getClubsByEvent(event.eventId);
    setSelectedClubIds(organizers.map(c => c.clubId));
    setIsEventDialogOpen(true)
  }

  // --- STUDENT ATTENDANCE HANDLERS ---
  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedEvent) return

    const formData = new FormData(e.currentTarget)
    formData.append("eventId", selectedEvent.eventId.toString())

    try {
      const result = await addStudentToEvent(formData)
      if (result.success) {
        toast({ title: result.message })
        setIsStudentDialogOpen(false)
        await fetchParticipants(selectedEvent.eventId)
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message || "Failed to add student", variant: "destructive" })
    }
  }

  const handleRemoveStudent = async (studentId: number) => {
    if (!selectedEvent) return
    const formData = new FormData()
    formData.append("eventId", selectedEvent.eventId.toString())
    formData.append("studentId", studentId.toString())

    try {
      const result = await removeStudentFromEvent(formData)
      if (result.success) {
         toast({ title: result.message })
        await fetchParticipants(selectedEvent.eventId)
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    }
  }

  // participants state contains students registered for selected event

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
          
          {/* LEFT COLUMN: EVENT LIST */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Events</CardTitle>
                  <CardDescription>Select an event to view details</CardDescription>
                </div>
                <Dialog
                  open={isEventDialogOpen}
                  onOpenChange={(open) => {
                    setIsEventDialogOpen(open)
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
                    <form onSubmit={handleEventSubmit} className="space-y-4 mt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="eventName">Event Name</Label>
                        <Input id="eventName" name="eventName" defaultValue={editingEvent?.eventName} required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="startDate">Start Date & Time</Label>
                        <Input
                          id="startDate"
                          name="startDate"
                          type="datetime-local"
                          defaultValue={editingEvent?.startDate}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endDate">End Date & Time</Label>
                        <Input
                          id="endDate"
                          name="endDate"
                          type="datetime-local"
                          defaultValue={editingEvent?.endDate}
                          required
                        />
                      </div>
                      
                      {/* Club Selection UI */}
                      <div className="grid gap-2">
                        <Label>Organizing Clubs</Label>
                        <div className="mt-2 border rounded-md p-3 h-40 overflow-y-auto space-y-2">
                           {allClubs.map((club) => (
                             <div key={club.clubId} className="flex items-center space-x-2">
                               <Checkbox 
                                  id={`club-${club.clubId}`}
                                  checked={selectedClubIds.includes(club.clubId)}
                                  onCheckedChange={(checked) => {
                                      if (checked) {
                                          setSelectedClubIds([...selectedClubIds, club.clubId]);
                                      } else {
                                          setSelectedClubIds(selectedClubIds.filter(id => id !== club.clubId));
                                      }
                                  }}
                               />
                               <label 
                                  htmlFor={`club-${club.clubId}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                               >
                                  {club.clubName}
                               </label>
                             </div>
                           ))}
                           {allClubs.length === 0 && (
                               <p className="text-sm text-muted-foreground">No clubs available.</p>
                           )}
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsEventDialogOpen(false)}>
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
                <div
                  key={event.eventId}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedEvent?.eventId === event.eventId
                      ? "bg-primary/10 border-primary"
                      : "group bg-card border-border hover:bg-accent hover:text-accent-foreground hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{event.eventName}</h3>
                      <p className="text-xs text-muted-foreground mt-1 group-hover:text-accent-foreground/80">
                        {new Date(event.startDate).toLocaleDateString()} -{" "}
                        {new Date(event.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            {selectedEvent ? (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedEvent.eventName}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(selectedEvent.startDate).toLocaleString()} -{" "}
                              {new Date(selectedEvent.endDate).toLocaleString()}
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditEvent(selectedEvent)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(selectedEvent.eventId)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* --- PARTICIPATING STUDENTS SECTION --- */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                         <CardTitle className="flex items-center gap-2">
                           <Users className="h-5 w-5" />
                           Participating Students
                         </CardTitle>
                         <CardDescription>All students participating in this event</CardDescription>
                      </div>
                      <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Student
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Student to Event</DialogTitle>
                            <DialogDescription>
                              Select a student to register for {selectedEvent.eventName}.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleAddStudent} className="space-y-4 mt-4">
                            <div className="grid gap-2">
                              <Label htmlFor="studentId">Select Student</Label>
                              <Select name="studentId" required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                                <SelectContent>
                                  {students.map((s) => (
                                    <SelectItem key={s.studentId} value={s.studentId.toString()}>
                                      {s.firstName} {s.lastName} ({s.cne})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button type="button" variant="outline" onClick={() => setIsStudentDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit">Register</Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>CNE</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {participants.map((student) => (
                          <TableRow key={student.studentId}>
                            <TableCell className="font-medium">{student.cne}</TableCell>
                            <TableCell>
                              {student.firstName} {student.lastName}
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemoveStudent(student.studentId)}
                              >
                                <X className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                {/* --- OTHER CARDS (Activities, Guests, etc.) --- */}
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
                            <TableRow key={activity.activityId}>
                              <TableCell className="font-medium">{activity.activityName}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs bg-accent">
                                  {activity.type}
                                </span>
                              </TableCell>
                              <TableCell>{activity.maxCapacity ?? '—'} participants</TableCell>
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
                            <TableHead>Role</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {eventGuests.map((guest: any, idx) => (
                            <TableRow key={`${guest.guestRoleId || guest.guestId}-${idx}`}>
                              <TableCell className="font-medium">{guest.fullName || `${guest.prenom} ${guest.nom}`}</TableCell>
                              <TableCell>{guest.email}</TableCell>
                              <TableCell>{guest.roleDescription || "Guest"}</TableCell>
                            </TableRow>
                          ))}
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
                        {organizingClubs.length > 0 ? (
                          organizingClubs.map((club) => (
                            <TableRow key={club.clubId}>
                              <TableCell className="font-medium">{club.clubName}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs bg-accent">{club.category}</span>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="text-sm text-muted-foreground text-center py-4">No organizing clubs yet</TableCell>
                          </TableRow>
                        )}
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
                          {eventReservations.map((reservation: any) => (
                            <TableRow key={reservation.reservationId || reservation.reservation_id}>
                              <TableCell className="font-medium">{reservation.resourceName || reservation.resource_name}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs bg-accent">
                                  {reservation.type || reservation.resource_type}
                                </span>
                              </TableCell>
                              <TableCell>
                                {new Date(reservation.startDate || reservation.date_debut).toLocaleString()} -{" "}
                                {new Date(reservation.endDate || reservation.date_fin).toLocaleString()}
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