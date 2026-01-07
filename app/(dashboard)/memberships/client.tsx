"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Check, X, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createClubMembership, deleteClubMembership } from "@/actions/club-actions"
import { approveMembership, rejectMembership } from "@/actions/membership-actions"
import type { ClubMembershipWithDetails, Student, Club } from "@/types/db"
import { Badge } from "@/components/ui/badge"

interface MembershipsPageClientProps {
  initialMemberships: (ClubMembershipWithDetails & { status: string })[]
  students: Student[]
  clubs: Club[]
}

export default function MembershipsPageClient({ initialMemberships, students, clubs }: MembershipsPageClientProps) {
  const [memberships, setMemberships] = useState(initialMemberships)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteClubMembership(id)
      if (result.success) {
        setMemberships(memberships.filter((m) => m.membershipId !== id))
        toast({ title: "Membership removed successfully" })
      } else {
        toast({ title: "Failed to remove membership", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "An error occurred", variant: "destructive" })
    }
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const result = await createClubMembership(formData)
      if (result.success) {
        toast({ title: "Membership created successfully" })
        setIsDialogOpen(false)
        window.location.reload() // Reload to fetch updated data with joins
      } else {
        toast({ title: result.message || "Failed to create membership", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "An error occurred", variant: "destructive" })
    }
  }

  const handleApprove = async (id: number) => {
      const result = await approveMembership(id);
      if (result.success) {
          toast({ title: result.message });
          setMemberships(memberships.map(m => m.membershipId === id ? { ...m, status: 'accepted' } : m));
      } else {
          toast({ title: result.message, variant: "destructive" });
      }
  }

  const handleReject = async (id: number) => {
      const result = await rejectMembership(id);
      if (result.success) {
          toast({ title: result.message });
          setMemberships(memberships.map(m => m.membershipId === id ? { ...m, status: 'rejected' } : m));
      } else {
          toast({ title: result.message, variant: "destructive" });
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Club Memberships</h2>
          <p className="text-muted-foreground">Manage student memberships across all clubs</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Membership
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Membership</DialogTitle>
              <DialogDescription>Register a student to a club manually.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="clubId">Club</Label>
                <Select name="clubId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a club" />
                  </SelectTrigger>
                  <SelectContent>
                    {clubs.map((club) => (
                      <SelectItem key={club.clubId} value={club.clubId.toString()}>
                        {club.clubName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentId">Student</Label>
                <Select name="studentId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.studentId} value={student.studentId.toString()}>
                        {student.firstName} {student.lastName} ({student.cne})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="joinedAt">Join Date</Label>
                <Input id="joinedAt" name="joinedAt" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Add Membership</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Memberships</CardTitle>
          <CardDescription>
            View and manage memberships. Pending requests appear at the top.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No memberships found
                  </TableCell>
                </TableRow>
              ) : (
                memberships.map((membership) => (
                  <TableRow key={membership.membershipId}>
                    <TableCell>
                      <div className="font-medium">{membership.studentName}</div>
                      <div className="text-xs text-muted-foreground">{membership.studentEmail}</div>
                    </TableCell>
                    <TableCell className="font-medium">{membership.clubName}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-accent font-medium">
                        {membership.clubCategory}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(membership.joinedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                       {membership.status === 'pending' && <Badge variant="outline" className="border-yellow-500 text-yellow-600 bg-yellow-50"><Clock className="w-3 h-3 mr-1"/> Pending</Badge>}
                       {membership.status === 'accepted' && <Badge variant="default" className="bg-green-600 hover:bg-green-700">Accepted</Badge>}
                       {membership.status === 'rejected' && <Badge variant="destructive">Rejected</Badge>}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {membership.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200" onClick={() => handleApprove(membership.membershipId)}>
                                <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => handleReject(membership.membershipId)}>
                                <X className="w-4 h-4" />
                            </Button>
                          </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(membership.membershipId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
