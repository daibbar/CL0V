import { AdminList } from "@/components/admin-list"
import { getAdmins } from "@/actions/admin-actions"

export default async function AdminsPage() {
  const admins = await getAdmins()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Admins</h3>
        <p className="text-sm text-muted-foreground">
          Manage system administrators and handle access requests.
        </p>
      </div>
      <AdminList initialAdmins={admins} />
    </div>
  )
}
