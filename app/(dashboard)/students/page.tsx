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
import { Edit, Trash2, Users, Calendar, Award, Building2, TrendingUp, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 1. Import Types & Actions
import { Major, Event, Club, Activity } from "@/types/db"
import { StudentWithMajor, getStudents, updateStudent, deleteStudent, getMajors, getStudentEvents, getStudentClubs, getStudentActivities, getTotalActivitiesCount } from "@/actions/student-actions"



export default function StudentsPage() {
  // State for Real Data
  const [students, setStudents] = useState<StudentWithMajor[]>([])
  const [majors, setMajors] = useState<Major[]>([])
  const [studentEvents, setStudentEvents] = useState<Event[]>([])
  const [studentClubs, setStudentClubs] = useState<Club[]>([])
  const [studentActivities, setStudentActivities] = useState<Activity[]>([])
  const [totalActivities, setTotalActivities] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  // UI State
  const [selectedStudent, setSelectedStudent] = useState<StudentWithMajor | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<StudentWithMajor | null>(null)
  const { toast } = useToast()

  // --- 1. LOAD REAL DATA ---
  const loadData = async () => {
    setIsLoading(true)
    try {
      const [studentsData, majorsData, activitiesCount] = await Promise.all([
        getStudents(),
        getMajors(),
        getTotalActivitiesCount()
      ])
      setStudents(studentsData)
      setMajors(majorsData)
      setTotalActivities(activitiesCount)
      
      // Select the first student by default if available
      if (studentsData.length > 0 && !selectedStudent) {
        setSelectedStudent(studentsData[0])
      }
    } catch (error) {
      toast({ title: "Error loading data", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedStudent) {
      getStudentEvents(selectedStudent.studentId).then(setStudentEvents)
      getStudentClubs(selectedStudent.studentId).then(setStudentClubs)
      getStudentActivities(selectedStudent.studentId).then(setStudentActivities)
    } else {
      setStudentEvents([])
      setStudentClubs([])
      setStudentActivities([])
    }
  }, [selectedStudent])

  // --- 2. HANDLE ACTIONS ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingStudent) return

    const formData = new FormData(e.currentTarget)
    const result = await updateStudent(editingStudent.studentId, formData)

    if (result.success) {
      toast({ title: result.message })
      await loadData() // Refresh list
      setIsOpen(false)
      setEditingStudent(null)
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    const result = await deleteStudent(id)
    if (result.success) {
      toast({ title: result.message })
      // Optimistic Update
      setStudents(students.filter((s) => s.studentId !== id))
      if (selectedStudent?.studentId === id) {
        setSelectedStudent(null)
      }
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" })
    }
  }

  const handleEdit = (student: StudentWithMajor) => {
    setEditingStudent(student)
    setIsOpen(true)
  }

  // --- 3. CALCULATE STATISTICS (Real Data) ---
  const getTotalStudents = () => students.length
  
  const getStudentsByProgram = () => {
    const programs: Record<string, number> = {}
    students.forEach((s) => {
      const major = s.majorName || 'Unknown'
      programs[major] = (programs[major] || 0) + 1
    })
    return programs
  }

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
          
          {/* --- LEFT COLUMN: LIST & STATS --- */}
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

              {/* Note: Total Activities is mocked until we have that server action */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">Activities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{totalActivities}</p> 
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">Students per Major</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {Object.entries(programStats).length === 0 ? (
                      <span className="text-xs text-muted-foreground">No data yet</span>
                    ) : (
                      Object.entries(programStats).map(([program, count]) => (
                        <div key={program} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{program}</span>
                          <span className="font-medium">{count} students</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Students List */}
            <Card className="h-full max-h-[600px] overflow-hidden flex flex-col">
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
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Student</DialogTitle>
                      <DialogDescription>
                        Update student information
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" name="lastName" defaultValue={editingStudent?.lastName} required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" name="firstName" defaultValue={editingStudent?.firstName} required />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cne">Student Code (CNE)</Label>
                        <Input id="cne" name="cne" defaultValue={editingStudent?.cne} required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" defaultValue={editingStudent?.email} required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="majorId">Program (Major)</Label>
                        <Select name="majorId" defaultValue={editingStudent?.majorId?.toString() || ""} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            {majors.map((major) => (
                              <SelectItem key={major.majorId} value={major.majorId.toString()}>
                                {major.majorName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Update</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2 overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : students.length === 0 ? (
                   <p className="text-center text-sm text-muted-foreground py-8">No students found.</p>
                ) : (
                  students.map((student) => (
                    <div
                      key={student.studentId}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedStudent?.studentId === student.studentId
                          ? "bg-primary/10 border-primary"
                          : "group bg-card border-border hover:bg-accent hover:text-accent-foreground hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{`${student.firstName} ${student.lastName}`}</h3>
                          <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/80">{student.cne}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 group-hover:text-accent-foreground group-hover:hover:bg-white/20"
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
                            className="h-7 w-7 group-hover:text-accent-foreground group-hover:hover:bg-white/20"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(student.studentId)
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-destructive group-hover:text-destructive-foreground" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white">
                          {student.majorName || "No Major"}
                        </span>
                        <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/80">{student.email}</p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* --- RIGHT COLUMN: DETAILS (Mocked for now) --- */}
          <div className="lg:col-span-2">
            {selectedStudent ? (
              <div className="space-y-6">
                {/* Student Details Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{`${selectedStudent.firstName} ${selectedStudent.lastName}`}</CardTitle>
                        <CardDescription className="mt-2">{selectedStudent.email}</CardDescription>
                      </div>
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                        {selectedStudent.majorName || "N/A"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center p-4 rounded-lg bg-primary/5">
                        <Award className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{selectedStudent.activityCount}</p>
                        <p className="text-xs text-muted-foreground">Activities</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/5">
                        <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{selectedStudent.eventCount}</p>
                        <p className="text-xs text-muted-foreground">Events</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/5">
                        <Building2 className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold">{selectedStudent.clubCount}</p>
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
                    {studentActivities.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No activities registered yet</p>
                    ) : (
                      <div className="space-y-4">
                        {studentActivities.map((activity) => (
                           <div key={activity.activityId} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                             <div>
                               <p className="font-medium">{activity.activityName}</p>
                               <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                                 {activity.type}
                                </span>
                             </div>
                           </div>
                        ))}
                      </div>
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
                    {studentEvents.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No events attended yet</p>
                    ) : (
                      <div className="space-y-4">
                        {studentEvents.map((event) => (
                           <div key={event.eventId} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                             <div>
                               <p className="font-medium">{event.eventName}</p>
                               <p className="text-xs text-muted-foreground">
                                 {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                               </p>
                             </div>
                           </div>
                        ))}
                      </div>
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
                    {studentClubs.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">Not a member of any clubs yet</p>
                    ) : (
                      <div className="space-y-4">
                        {studentClubs.map((club) => (
                           <div key={club.clubId} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                             <div>
                               <p className="font-medium">{club.clubName}</p>
                               <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                                 {club.category}
                               </span>
                             </div>
                           </div>
                        ))}
                      </div>
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