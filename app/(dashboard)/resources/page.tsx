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
import { Plus, Edit, Trash2, Calendar, Clock, History, CalendarClock, Building2, BookOpen, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { getResources, createResource, updateResource, deleteResource } from "@/actions/resource-actions"
import { getReservations, createReservation, deleteReservation } from "@/actions/reservation-actions"
import { getActivities } from "@/actions/activity-actions"
import { Resource, Reservation, Activity } from "@/types/db"

// Extended types for UI
type ReservationWithDetails = Reservation & {
  resourceName?: string
  resourceType?: string
  activityName?: string
  activityType?: string
  status?: "past" | "upcoming"
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [reservations, setReservations] = useState<ReservationWithDetails[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false)
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [now, setNow] = useState(new Date())
  const { toast } = useToast()

  // Update "now" every minute to auto-move expired reservations
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [resourcesData, reservationsData, activitiesData] = await Promise.all([
        getResources(),
        getReservations(),
        getActivities()
      ])
      
      setResources(resourcesData)
      setActivities(activitiesData)
      setReservations(reservationsData as ReservationWithDetails[])
      
    } catch (error) {
      toast({ title: "Error loading data", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleResourceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      let result;
      if (editingResource) {
        result = await updateResource(editingResource.resourceId, formData)
      } else {
        result = await createResource(formData)
      }

      if (result.success) {
        toast({ title: result.message })
        await loadData()
        setIsResourceDialogOpen(false)
        setEditingResource(null)
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    }
  }
  
  const handleReservationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedResource) return;
    
    const formData = new FormData(e.currentTarget)
    // Ensure resourceId is included
    if (!formData.get('resourceId')) {
        formData.append('resourceId', selectedResource.resourceId.toString())
    }

    try {
      const result = await createReservation(formData)

      if (result.success) {
        toast({ title: result.message })
        await loadData()
        setIsReservationDialogOpen(false)
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    }
  }

  const handleCancelReservation = async (reservationId: number) => {
    try {
      const result = await deleteReservation(reservationId)
      if (result.success) {
        toast({ title: "Reservation cancelled" })
        await loadData()
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteResource(id)
      if (result.success) {
        toast({ title: result.message })
        setResources(resources.filter((r) => r.resourceId !== id))
        if (selectedResource?.resourceId === id) {
          setSelectedResource(null)
        }
      } else {
        toast({ title: result.message, variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    }
  }

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource)
    setIsResourceDialogOpen(true)
  }

  const getResourceReservations = (resourceId: number) => {
    return reservations.filter((res) => res.resourceId === resourceId)
  }

  const getPastReservations = (resourceId: number) => {
    return reservations.filter((res) => res.resourceId === resourceId && new Date(res.endDate) < now)
  }

  const getUpcomingReservations = (resourceId: number) => {
    return reservations.filter((res) => res.resourceId === resourceId && new Date(res.endDate) >= now)
  }

  const formatDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h`
    return `${minutes}m`
  }

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Resources Management</h1>
          <p className="text-sm text-muted-foreground">Manage facilities and track reservations</p>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Resources List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>All Resources</CardTitle>
                  <CardDescription>Select to view details</CardDescription>
                </div>
                <Dialog
                  open={isResourceDialogOpen}
                  onOpenChange={(open) => {
                    setIsResourceDialogOpen(open)
                    if (!open) setEditingResource(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingResource ? "Edit Resource" : "Create New Resource"}</DialogTitle>
                      <DialogDescription>
                        {editingResource ? "Update resource information" : "Add a new resource to the system"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleResourceSubmit} className="space-y-4 mt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="nom">Resource Name</Label>
                        <Input id="nom" name="nom" defaultValue={editingResource?.resourceName} required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="type_ressource">Resource Type</Label>
                        <Select name="type_ressource" defaultValue={editingResource?.type} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Salle">Salle</SelectItem>
                            <SelectItem value="Amphitheatre">Amphitheatre</SelectItem>
                            <SelectItem value="Buvette">Buvette</SelectItem>
                            <SelectItem value="Bibliotheque">Bibliotheque</SelectItem>
                            <SelectItem value="Terrain">Terrain</SelectItem>
                            <SelectItem value="Labo">Labo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsResourceDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">{editingResource ? "Update" : "Create"}</Button>
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
                ) : resources.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No resources found.</p>
                ) : (
                  resources.map((resource) => (
                    <div
                      key={resource.resourceId}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedResource?.resourceId === resource.resourceId
                          ? "bg-primary/10 border-primary"
                          : "group bg-card border-border hover:bg-accent hover:text-accent-foreground hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedResource(resource)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate group-hover:text-accent-foreground">{resource.resourceName}</p>
                        <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/80">
                          {resource.type} • {getResourceReservations(resource.resourceId).length}{" "}
                          reservations
                        </p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 group-hover:text-accent-foreground group-hover:hover:bg-white/20"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(resource)
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 group-hover:text-accent-foreground group-hover:hover:bg-white/20"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(resource.resourceId)
                          }}
                        >
                          <Trash2 className="h-3 w-3 text-destructive group-hover:text-destructive-foreground" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Resource Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedResource ? (
              <>
                {/* Resource Details Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <CardTitle>Resource Details</CardTitle>
                      </div>
                      <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Book Resource
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Book {selectedResource.resourceName}</DialogTitle>
                            <DialogDescription>
                              Create a new reservation for this resource.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleReservationSubmit} className="space-y-4 mt-4">
                            <input type="hidden" name="resourceId" value={selectedResource.resourceId} />
                            
                            <div className="grid gap-2">
                              <Label htmlFor="reservationName">Reservation Name</Label>
                              <Input id="reservationName" name="reservationName" placeholder="e.g. Club Meeting" required />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="activityId">Activity</Label>
                              <Select name="activityId" required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select activity" />
                                </SelectTrigger>
                                <SelectContent>
                                  {activities.map((activity) => (
                                    <SelectItem key={activity.activityId} value={activity.activityId.toString()}>
                                      {activity.activityName} ({activity.type})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="startDate">Start Date & Time</Label>
                                <Input id="startDate" name="startDate" type="datetime-local" required />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="endDate">End Date & Time</Label>
                                <Input id="endDate" name="endDate" type="datetime-local" required />
                              </div>
                            </div>
                            
                            <div className="flex gap-2 justify-end">
                              <Button type="button" variant="outline" onClick={() => setIsReservationDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit">Confirm Booking</Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Resource Name</p>
                        <p className="font-medium">{selectedResource.resourceName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                            {selectedResource.type}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Reservations</p>
                        <p className="font-medium">{getResourceReservations(selectedResource.resourceId).length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Upcoming Reservations</p>
                        <p className="font-medium">{getUpcomingReservations(selectedResource.resourceId).length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Reservations Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-5 w-5 text-primary" />
                      <CardTitle>Upcoming Reservations</CardTitle>
                    </div>
                    <CardDescription>Future reservations for this resource</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {getUpcomingReservations(selectedResource.resourceId).length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activity</TableHead>
                            <TableHead>Start Date/Time</TableHead>
                            <TableHead>End Date/Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getUpcomingReservations(selectedResource.resourceId).map((reservation) => {
                            const start = new Date(reservation.startDate)
                            const end = new Date(reservation.endDate)

                            return (
                              <TableRow key={reservation.reservationId}>
                                <TableCell className="font-medium">{reservation.activityName}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {formatDateTime(reservation.startDate)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {formatDateTime(reservation.endDate)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {formatDuration(start, end)}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleCancelReservation(reservation.reservationId)}
                                    title="Cancel Reservation"
                                  >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No upcoming reservations for this resource
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Past Reservations Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      <CardTitle>Reservation History</CardTitle>
                    </div>
                    <CardDescription>Past reservations for this resource</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {getPastReservations(selectedResource.resourceId).length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activity</TableHead>
                            <TableHead>Start Date/Time</TableHead>
                            <TableHead>End Date/Time</TableHead>
                            <TableHead>Duration</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getPastReservations(selectedResource.resourceId).map((reservation) => {
                            const start = new Date(reservation.startDate)
                            const end = new Date(reservation.endDate)

                            return (
                              <TableRow key={reservation.reservationId}>
                                <TableCell className="font-medium">{reservation.activityName}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {formatDateTime(reservation.startDate)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {formatDateTime(reservation.endDate)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {formatDuration(start, end)}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No past reservations for this resource
                      </p>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground">Select a resource to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}