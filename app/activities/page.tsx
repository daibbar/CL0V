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
import { Plus, Edit, Trash2, Calendar, Users, MapPin, Building2, UserPlus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { 
  createActivity, 
  updateActivity, 
  deleteActivity, 
  getActivities,
  getActivityRegistrations,
  addStudentToActivity,
  removeStudentFromActivity,
  getActivityReservations 
} from "@/actions/activity-actions"
import { getStudents } from "@/actions/student-actions"
import { getEvents } from "@/actions/event-actions"
import type { Activity as DbActivity, Event as DbEvent, Club as DbClub, Guest as DbGuest, GuestRole as DbGuestRole, Reservation as DbReservation, Registration as DbRegistration, Student as DbStudent } from "@/types/db"

// UI activity includes optional relation fields returned by the activity actions
type Activity = DbActivity & { eventName?: string | null; clubName?: string | null }
type Event = DbEvent
type Club = DbClub
type Reservation = DbReservation & { resourceName?: string; type?: string }
type ActivityGuest = DbGuestRole & Partial<DbGuest>
type RegisteredStudent = DbRegistration & Partial<DbStudent> & { firstName?: string; lastName?: string; cne?: string; email?: string; majorName?: string }
type Student = DbStudent

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [registeredStudents, setRegisteredStudents] = useState<any[]>([])
  const [activityReservations, setActivityReservations] = useState<Reservation[]>([])
  const [activityGuests, setActivityGuests] = useState<ActivityGuest[]>([])
  const [organizingClub, setOrganizingClub] = useState<Club | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // --- FIX 1: Derived State Calculation ---
  // We must calculate these variables based on the selectedActivity to use them in the JSX
  const activityEvent = selectedActivity
    ? events.find((e) => e.eventId === Number(selectedActivity.eventId))
    : null

  // derived event (lookup by eventId)
  // ----------------------------------------

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [activitiesData, studentsData, eventsData] = await Promise.all([
          getActivities(),
          getStudents(),
          getEvents()
        ])
        setActivities(activitiesData)
        setStudents(studentsData)
        setEvents(eventsData)
        if (activitiesData.length > 0) {
          setSelectedActivity(activitiesData[0])
          loadActivityDetails(activitiesData[0].activityId)
        }
      } catch (error) {
        toast({ title: "Error loading data", variant: "destructive" })
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Load activity details when selection changes
  const loadActivityDetails = async (activityId: number) => {
    try {
      const [regData, resData] = await Promise.all([
        getActivityRegistrations(activityId),
        getActivityReservations(activityId)
      ])
      setRegisteredStudents(regData)
      setActivityReservations(resData as Reservation[])

      // load guests for activity
      try {
        const g = (await (await import('@/actions/activity-actions')).getActivityGuests(activityId)) as ActivityGuest[]
        setActivityGuests(g)
      } catch (err) {
        console.error('Failed to load activity guests', err)
        setActivityGuests([])
      }

      // load organizing club if any
      try {
        const act = activities.find((a) => a.activityId === activityId)
        const clubId = act?.clubId ?? null
        if (clubId) {
          const club = (await (await import('@/actions/activity-actions')).getActivityClub(clubId)) as Club | null
          setOrganizingClub(club)
        } else {
          setOrganizingClub(null)
        }
      } catch (err) {
        console.error('Failed to load organizing club', err)
        setOrganizingClub(null)
      }
    } catch (error) {
      console.error("Error loading activity details:", error)
    }
  }

  const handleActivitySelect = async (activity: Activity) => {
    setSelectedActivity(activity)
    await loadActivityDetails(activity.activityId)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      let result
      if (editingActivity) {
        result = await updateActivity(editingActivity.activityId, formData)
      } else {
        result = await createActivity(formData)
      }

      if (result.success) {
        toast({ title: result.message })
        const activitiesData = await getActivities()
        setActivities(activitiesData)
        setIsOpen(false)
        setEditingActivity(null)
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message || "An error occurred", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteActivity(id)
      if (result.success) {
        setActivities(activities.filter((a) => a.activityId !== id))
        if (selectedActivity?.activityId === id) {
          setSelectedActivity(activities.find((a) => a.activityId !== id) || null)
        }
        toast({ title: result.message })
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message || "An error occurred", variant: "destructive" })
    }
  }

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity)
    setIsOpen(true)
  }

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedActivity) return

    const formData = new FormData(e.currentTarget)
    formData.append("activityId", selectedActivity.activityId.toString())

    try {
      const result = await addStudentToActivity(formData)
      if (result.success) {
        toast({ title: result.message })
        setIsStudentDialogOpen(false)
        await loadActivityDetails(selectedActivity.activityId)
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message || "Failed to add student", variant: "destructive" })
    }
  }

  const handleRemoveStudent = async (studentId: number) => {
    if (!selectedActivity) return
    const formData = new FormData()
    formData.append("activityId", selectedActivity.activityId.toString())
    formData.append("studentId", studentId.toString())

    try {
      const result = await removeStudentFromActivity(formData)
      if (result.success) {
        toast({ title: result.message })
        await loadActivityDetails(selectedActivity.activityId)
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    }
  }

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
                        <Label htmlFor="activityName">Activity Name</Label>
                        <Input
                          id="activityName"
                          name="activityName"
                          defaultValue={editingActivity?.activityName}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          defaultValue={editingActivity?.description ?? ""}
                          rows={2}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Select name="type" defaultValue={editingActivity?.type || ""} required>
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
                          <Label htmlFor="maxCapacity">Max Capacity</Label>
                          <Input
                            id="maxCapacity"
                            name="maxCapacity"
                            type="number"
                            min="1"
                            defaultValue={editingActivity?.maxCapacity?.toString() || ""}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="eventId">Event</Label>
                        <Select name="eventId" defaultValue={editingActivity?.eventId?.toString() || ""} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event" />
                          </SelectTrigger>
                          <SelectContent>
                            {events.map((event) => (
                              <SelectItem key={event.eventId} value={event.eventId.toString()}>
                                {event.eventName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Start Date & Time</Label>
                          <Input
                            id="startDate"
                            name="startDate"
                            type="datetime-local"
                            defaultValue={editingActivity?.startDate}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date & Time</Label>
                          <Input
                            id="endDate"
                            name="endDate"
                            type="datetime-local"
                            defaultValue={editingActivity?.endDate}
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
                    key={activity.activityId}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                      selectedActivity?.activityId === activity.activityId
                        ? "bg-primary/5 border-primary"
                        : "bg-card border-border"
                    }`}
                    onClick={() => handleActivitySelect(activity)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{activity.activityName}</h3>
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
                            handleDelete(activity.activityId)
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                        {activity.type}
                      </span>
                      <p className="text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">Capacity: {activity.maxCapacity} participants</p>
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
                        <CardTitle className="text-2xl">{selectedActivity.activityName}</CardTitle>
                        <CardDescription className="mt-2">{selectedActivity.description}</CardDescription>
                      </div>
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                        {selectedActivity.type}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {/* --- FIX 2: Updated Property Names to English (matching state) --- */}
                      <div>
                        <p className="text-muted-foreground mb-1">Start Date & Time</p>
                        <p className="font-medium">{new Date(selectedActivity.startDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">End Date & Time</p>
                        <p className="font-medium">{new Date(selectedActivity.endDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Maximum Capacity</p>
                        <p className="font-medium">{selectedActivity.maxCapacity} participants</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Activity ID</p>
                        <p className="font-medium">#{selectedActivity.activityId}</p>
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
                          <h4 className="font-semibold text-lg mb-1">{activityEvent.eventName}</h4>
                          <p className="text-sm text-muted-foreground">{activityEvent.startDate} - {activityEvent.endDate}</p>
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
                          <h4 className="font-semibold text-lg">{organizingClub.clubName}</h4>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                            {organizingClub.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{organizingClub.description}</p>
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
                            <TableRow key={guest.guestRoleId || guest.guestId}>
                              <TableCell className="font-medium">{guest.fullName || `${(guest as any).prenom_invite || ''} ${(guest as any).nom_invite || ''}`}</TableCell>
                              <TableCell>{guest.email || (guest as any).email_invite}</TableCell>
                              <TableCell>{guest.phone || (guest as any).tel_invite}</TableCell>
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">Registered Students</CardTitle>
                          <CardDescription>Students registered for this activity</CardDescription>
                        </div>
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
                            <DialogTitle>Add Student to Activity</DialogTitle>
                            <DialogDescription>
                              Select a student to register for {selectedActivity.activityName}.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleAddStudent} className="space-y-4 mt-4">
                            <div>
                              <Label htmlFor="studentId">Select Student</Label>
                              <select 
                                id="studentId" 
                                name="studentId" 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                              >
                                <option value="">-- Select a student --</option>
                                {students.map(s => (
                                  <option key={s.studentId} value={s.studentId}>
                                    {s.firstName} {s.lastName} ({s.cne})
                                  </option>
                                ))}
                              </select>
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
                    {registeredStudents.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>CNE</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Major</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {registeredStudents.map((student: any) => (
                            <TableRow key={student.studentId}>
                              <TableCell className="font-medium">{`${student.firstName} ${student.lastName}`}</TableCell>
                              <TableCell>{student.cne}</TableCell>
                              <TableCell>{student.email}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                  {student.majorName || "N/A"}
                                </span>
                              </TableCell>
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
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No students registered yet</p>
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
                          {activityReservations.map((reservation: any) => (
                            <TableRow key={reservation.reservationId}>
                              <TableCell className="font-medium">{reservation.resourceName}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                  {reservation.type}
                                </span>
                              </TableCell>
                              <TableCell>{new Date(reservation.startDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                {new Date(reservation.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(reservation.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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