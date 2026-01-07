import { ChangePasswordForm } from '@/components/change-password-form';
import { auth } from '@/auth';

export default async function StudentProfilePage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
             <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="text-sm">
                    <p><span className="font-medium">Name:</span> {session?.user?.name}</p>
                    <p><span className="font-medium">Email:</span> {session?.user?.email}</p>
                </div>
             </div>
        </div>

        <div>
            <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
