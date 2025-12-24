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
import { Plus, Edit, Trash2, Users, Calendar, Award, Building2, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Student = {
  id_etudiant: number
  nom: string
  prenom: string
  cne: string
  email: string
  id_filliere: string
}

type Activity = {
  id_activite: number
  nom_activite: string
  type_activite: string
  date_debut: string
}

type Event = {
  id_event: number
  nom_event: string
  date_event: string
}

type Club = {
  id_club: number
  nom_club: string
  categorie: string
}

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
  {
    id_etudiant: 4,
    nom: "Tazi",
    prenom: "Mehdi",
    cne: "N45678901",
    email: "mehdi.tazi@edu.ma",
    id_filliere: "GI",
  },
  {
    id_etudiant: 5,
    nom: "Amrani",
    prenom: "Laila",
    cne: "N56789012",
    email: "laila.amrani@edu.ma",
    id_filliere: "IRIC",
  },
]

const mockActivities: Activity[] = [
  {
    id_activite: 1,
    nom_activite: "Web Development Workshop",
    type_activite: "Atelier",
    date_debut: "2024-06-20T14:00",
  },
  {
    id_activite: 2,
    nom_activite: "Football Tournament",
    type_activite: "Competition",
    date_debut: "2024-07-10T09:00",
  },
  {
    id_activite: 3,
    nom_activite: "AI & Machine Learning Conference",
    type_activite: "Conference",
    date_debut: "2024-08-15T10:00",
  },
]

const mockEvents: Event[] = [
  {
    id_event: 1,
    nom_event: "Tech Week 2024",
    date_event: "2024-06-20",
  },
  {
    id_event: 2,
    nom_event: "Sports Festival",
    date_event: "2024-07-10",
  },
]

const mockClubs: Club[] = [
  {
    id_club: 1,
    nom_club: "Tech Club",
    categorie: "Technologique",
  },
  {
    id_club: 2,
    nom_club: "Sports Club",
    categorie: "Sport",
  },
  {
    id_club: 3,
    nom_club: "Arts Club",
    categorie: "Entertainment",
  },
]

// Mock data for student participations
const mockActivitySubscriptions = [
  { id_activite: 1, id_etudiant: 1 },
  { id_activite: 2, id_etudiant: 1 },
  { id_activite: 3, id_etudiant: 1 },
  { id_activite: 1, id_etudiant: 2 },
  { id_activite: 2, id_etudiant: 2 },
  { id_activite: 3, id_etudiant: 3 },
  { id_activite: 1, id_etudiant: 3 },
]

const mockMemberships = [
  { id_club: 1, id_etudiant: 1, date_inscription: "2024-01-15" },
  { id_club: 2, id_etudiant: 1, date_inscription: "2024-02-20" },
  { id_club: 1, id_etudiant: 2, date_inscription: "2024-01-10" },
  { id_club: 3, id_etudiant: 2, date_inscription: "2024-03-05" },
  { id_club: 1, id_etudiant: 3, date_inscription: "2024-02-01" },
]

// Link activities to events
const mockActivityEvents = [
  { id_activite: 1, id_event: 1 },
  { id_activite: 2, id_event: 2 },
  { id_activite: 3, id_event: 1 },
]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(mockStudents[0])
  const [isOpen, setIsOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const studentData: Student = {
      id_etudiant: editingStudent?.id_etudiant || Date.now(),
      nom: formData.get("nom") as string,
      prenom: formData.get("prenom") as string,
      cne: formData.get("cne") as string,
      email: formData.get("email") as string,
      id_filliere: formData.get("id_filliere") as string,
    }

    if (editingStudent) {
      setStudents(students.map((s) => (s.id_etudiant === editingStudent.id_etudiant ? studentData : s)))
      toast({ title: "Student updated successfully" })
      if (selectedStudent?.id_etudiant === editingStudent.id_etudiant) {
        setSelectedStudent(studentData)
      }
    } else {
      setStudents([...students, studentData])
      toast({ title: "Student created successfully" })
    }

    setIsOpen(false)
    setEditingStudent(null)
  }

  const handleDelete = (id: number) => {
    setStudents(students.filter((s) => s.id_etudiant !== id))
    if (selectedStudent?.id_etudiant === id) {
      setSelectedStudent(students.find((s) => s.id_etudiant !== id) || null)
    }
    toast({ title: "Student deleted successfully" })
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setIsOpen(true)
  }

  // Get statistics
  const getTotalStudents = () => students.length
  const getStudentsByProgram = () => {
    const programs: Record<string, number> = {}
    students.forEach((s) => {
      programs[s.id_filliere] = (programs[s.id_filliere] || 0) + 1
    })
    return programs
  }
  const getTotalActivitiesParticipation = () => mockActivitySubscriptions.length
  const getTotalMemberships = () => mockMemberships.length

  // Get student's participation data
  const getStudentActivities = () => {
    if (!selectedStudent) return []
    const activityIds = mockActivitySubscriptions
      .filter((sub) => sub.id_etudiant === selectedStudent.id_etudiant)
      .map((sub) => sub.id_activite)
    return mockActivities.filter((activity) => activityIds.includes(activity.id_activite))
  }

  const getStudentEvents = () => {
    if (!selectedStudent) return []
    const studentActivities = getStudentActivities()
    const eventIds = mockActivityEvents
      .filter((ae) => studentActivities.some((a) => a.id_activite === ae.id_activite))
      .map((ae) => ae.id_event)
    return mockEvents.filter((event) => eventIds.includes(event.id_event))
  }

  const getStudentClubs = () => {
    if (!selectedStudent) return []
    const clubIds = mockMemberships
      .filter((mem) => mem.id_etudiant === selectedStudent.id_etudiant)
      .map((mem) => mem.id_club)
    return mockClubs.filter((club) => clubIds.includes(club.id_club))
  }

  const studentActivities = getStudentActivities()
  const studentEvents = getStudentEvents()
  const studentClubs = getStudentClubs()
  const programStats = getStudentsByProgram()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-foreground">Students Management</h1>
          <p className="text-sm text-muted-foreground">Student directory and participation tracking</p>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Students List with Statistics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">Total Students</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{getTotalStudents()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">Activities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{getTotalActivitiesParticipation()}</p>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">Club Memberships</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-2">{getTotalMemberships()}</p>
                  <div className="space-y-1">
                    {Object.entries(programStats).map(([program, count]) => (
                      <div key={program} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{program}</span>
                        <span className="font-medium">{count} students</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Students List */}
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>All Students</CardTitle>
                  <CardDescription className="text-xs">Select to view participation</CardDescription>
                </div>
                <Dialog
                  open={isOpen}
                  onOpenChange={(open) => {
                    setIsOpen(open)
                    if (!open) setEditingStudent(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingStudent ? "Edit Student" : "Create New Student"}</DialogTitle>
                      <DialogDescription>
                        {editingStudent ? "Update student information" : "Add a new student to the system"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nom">Last Name</Label>
                          <Input id="nom" name="nom" defaultValue={editingStudent?.nom} required />
                        </div>
                        <div>
                          <Label htmlFor="prenom">First Name</Label>
                          <Input id="prenom" name="prenom" defaultValue={editingStudent?.prenom} required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cne">CNE</Label>
                        <Input id="cne" name="cne" defaultValue={editingStudent?.cne} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={editingStudent?.email} required />
                      </div>
                      <div>
                        <Label htmlFor="id_filliere">Program</Label>
                        <Select name="id_filliere" defaultValue={editingStudent?.id_filliere} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IID">IID</SelectItem>
                            <SelectItem value="GI">GI</SelectItem>
                            <SelectItem value="IRIC">IRIC</SelectItem>
                            <SelectItem value="GE">GE</SelectItem>
                            <SelectItem value="GPEE">GPEE</SelectItem>
                            <SelectItem value="MGSI">MGSI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">{editingStudent ? "Update" : "Create"}</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2">
                {students.map((student) => (
                  <div
                    key={student.id_etudiant}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                      selectedStudent?.id_etudiant === student.id_etudiant
                        ? "bg-primary/5 border-primary"
                        : "bg-card border-border"
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm">{`${student.prenom} ${student.nom}`}</h3>
                        <p className="text-xs text-muted-foreground">{student.cne}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(student)
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
                            handleDelete(student.id_etudiant)
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                        {student.id_filliere}
                      </span>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Student Details */}
          <div className="lg:col-span-2">
            {selectedStudent ? (
              <div className="space-y-6">
                {/* Student Details Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{`${selectedStudent.prenom} ${selectedStudent.nom}`}</CardTitle>
                        <CardDescription className="mt-2">{selectedStudent.email}</CardDescription>
                      </div>
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                        {selectedStudent.id_filliere}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center p-4 rounded-lg bg-primary/5">
                        <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{studentActivities.length}</p>
                        <p className="text-xs text-muted-foreground">Activities</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/5">
                        <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{studentEvents.length}</p>
                        <p className="text-xs text-muted-foreground">Events</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/5">
                        <Building2 className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{studentClubs.length}</p>
                        <p className="text-xs text-muted-foreground">Clubs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activities Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Registered Activities</CardTitle>
                    </div>
                    <CardDescription>All activities this student has participated in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {studentActivities.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Activity Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentActivities.map((activity) => (
                            <TableRow key={activity.id_activite}>
                              <TableCell className="font-medium">{activity.nom_activite}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                  {activity.type_activite}
                                </span>
                              </TableCell>
                              <TableCell>{new Date(activity.date_debut).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No activities registered yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Events Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Participated Events</CardTitle>
                    </div>
                    <CardDescription>Events this student has attended</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {studentEvents.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentEvents.map((event) => (
                            <TableRow key={event.id_event}>
                              <TableCell className="font-medium">{event.nom_event}</TableCell>
                              <TableCell>{new Date(event.date_event).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No events attended yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Clubs Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Club Memberships</CardTitle>
                    </div>
                    <CardDescription>Clubs this student is a member of</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {studentClubs.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Club Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Joined</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentClubs.map((club) => {
                            const membership = mockMemberships.find(
                              (m) => m.id_club === club.id_club && m.id_etudiant === selectedStudent.id_etudiant,
                            )
                            return (
                              <TableRow key={club.id_club}>
                                <TableCell className="font-medium">{club.nom_club}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                                    {club.categorie}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {membership ? new Date(membership.date_inscription).toLocaleDateString() : "N/A"}
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">Not a member of any clubs yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a student to view their participation details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
