import RegisterForm from '@/components/register-form';
import { Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4 relative">
      <Link 
        href="/home" 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      <Link href="/home" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
          <Trophy className="h-6 w-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight">slak ajmi</span>
      </Link>
      <RegisterForm />
    </div>
  );
}
