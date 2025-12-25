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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Calendar, Clock, History, CalendarClock, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Resource = {
  id_ressource: number
  type_ressource: string
  nom: string
}

type Reservation = {
  id_reservation: number
  id_ressource: number
  id_activite: number
  activity_name: string
  date_debut: string
  date_fin: string
  status: "past" | "upcoming"
}

// REMOVED MOCK DATA - Using server actions for real data

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [reservations] = useState<Reservation[]>([])
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const resourceData: Resource = {
      id_ressource: editingResource?.id_ressource || Date.now(),
      type_ressource: formData.get("type_ressource") as string,
      nom: formData.get("nom") as string,
    }

    if (editingResource) {
      setResources(resources.map((r) => (r.id_ressource === editingResource.id_ressource ? resourceData : r)))
      toast({ title: "Resource updated successfully" })
    } else {
      setResources([...resources, resourceData])
      toast({ title: "Resource created successfully" })
    }

    setIsOpen(false)
    setEditingResource(null)
  }

  const handleDelete = (id: number) => {
    setResources(resources.filter((r) => r.id_ressource !== id))
    if (selectedResource?.id_ressource === id) {
      setSelectedResource(resources[0] || null)
    }
    toast({ title: "Resource deleted successfully" })
  }

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource)
    setIsOpen(true)
  }

  const getResourceReservations = (resourceId: number) => {
    return reservations.filter((res) => res.id_ressource === resourceId)
  }

  const getPastReservations = (resourceId: number) => {
    return reservations.filter((res) => res.id_ressource === resourceId && res.status === "past")
  }

  const getUpcomingReservations = (resourceId: number) => {
    return reservations.filter((res) => res.id_ressource === resourceId && res.status === "upcoming")
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
                  open={isOpen}
                  onOpenChange={(open) => {
                    setIsOpen(open)
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
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="nom">Resource Name</Label>
                        <Input id="nom" name="nom" defaultValue={editingResource?.nom} required />
                      </div>
                      <div>
                        <Label htmlFor="type_ressource">Resource Type</Label>
                        <Select name="type_ressource" defaultValue={editingResource?.type_ressource} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salle">Salle</SelectItem>
                            <SelectItem value="Amphitheatre">Amphitheatre</SelectItem>
                            <SelectItem value="buvet">Buvet</SelectItem>
                            <SelectItem value="Bibliotheque">Bibliotheque</SelectItem>
                            <SelectItem value="terrain">Terrain</SelectItem>
                            <SelectItem value="labo">Labo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">{editingResource ? "Update" : "Create"}</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resources.map((resource) => (
                    <div
                      key={resource.id_ressource}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedResource?.id_ressource === resource.id_ressource
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => setSelectedResource(resource)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{resource.nom}</p>
                        <p className="text-xs text-muted-foreground">
                          {resource.type_ressource} • {getResourceReservations(resource.id_ressource).length}{" "}
                          reservations
                        </p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
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
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(resource.id_ressource)
                          }}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle>Resource Details</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Resource Name</p>
                        <p className="font-medium">{selectedResource.nom}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                            {selectedResource.type_ressource}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Reservations</p>
                        <p className="font-medium">{getResourceReservations(selectedResource.id_ressource).length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Upcoming Reservations</p>
                        <p className="font-medium">{getUpcomingReservations(selectedResource.id_ressource).length}</p>
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
                    {getUpcomingReservations(selectedResource.id_ressource).length > 0 ? (
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
                          {getUpcomingReservations(selectedResource.id_ressource).map((reservation) => {
                            const start = new Date(reservation.date_debut)
                            const end = new Date(reservation.date_fin)
                            const durationHours = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60))

                            return (
                              <TableRow key={reservation.id_reservation}>
                                <TableCell className="font-medium">{reservation.activity_name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {formatDateTime(reservation.date_debut)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {formatDateTime(reservation.date_fin)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {durationHours}h
                                  </div>
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
                    {getPastReservations(selectedResource.id_ressource).length > 0 ? (
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
                          {getPastReservations(selectedResource.id_ressource).map((reservation) => {
                            const start = new Date(reservation.date_debut)
                            const end = new Date(reservation.date_fin)
                            const durationHours = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60))

                            return (
                              <TableRow key={reservation.id_reservation}>
                                <TableCell className="font-medium">{reservation.activity_name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {formatDateTime(reservation.date_debut)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {formatDateTime(reservation.date_fin)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {durationHours}h
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
