"use client"

import { useState } from "react"
import { Admin } from "@/types/db"
import { updateAdminStatus, deleteAdmin } from "@/actions/admin-actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, XCircle, Trash2, Shield, Clock } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AdminListProps {
  initialAdmins: Omit<Admin, 'password'>[]
}

export function AdminList({ initialAdmins }: AdminListProps) {
  const [admins, setAdmins] = useState(initialAdmins)

  const handleStatusChange = async (adminId: number, newStatus: 'accepted' | 'rejected' | 'pending') => {
    const result = await updateAdminStatus(adminId, newStatus)
    if (result.success) {
      setAdmins(admins.map(admin => 
        admin.adminId === adminId ? { ...admin, status: newStatus } : admin
      ))
      toast.success(`Admin status updated to ${newStatus}`)
    } else {
      toast.error("Failed to update status")
    }
  }

  const handleDelete = async (adminId: number) => {
    const result = await deleteAdmin(adminId)
    if (result.success) {
      setAdmins(admins.filter(admin => admin.adminId !== adminId))
      toast.success("Admin deleted successfully")
    } else {
      toast.error("Failed to delete admin")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Management</CardTitle>
        <CardDescription>Manage admin accounts and access requests.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.adminId}>
                <TableCell className="font-medium">
                  {admin.firstName} {admin.lastName}
                </TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      admin.status === 'accepted' ? 'default' : 
                      admin.status === 'pending' ? 'secondary' : 'destructive'
                    }
                  >
                    {admin.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {admin.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleStatusChange(admin.adminId, 'accepted')}
                        title="Approve"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="sr-only">Approve</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleStatusChange(admin.adminId, 'rejected')}
                        title="Reject"
                      >
                        <XCircle className="h-4 w-4 text-red-600" />
                         <span className="sr-only">Reject</span>
                      </Button>
                    </>
                  )}
                  {admin.status === 'rejected' && (
                     <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleStatusChange(admin.adminId, 'accepted')}
                        title="Re-activate"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="sr-only">Re-activate</span>
                      </Button>
                  )}
                   {admin.status === 'accepted' && (
                     <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleStatusChange(admin.adminId, 'rejected')}
                        title="Deactivate"
                      >
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="sr-only">Deactivate</span>
                      </Button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the admin account
                          for <strong>{admin.email}</strong>.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(admin.adminId)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
