'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  registerForEvent, unregisterFromEvent, 
  joinClub, leaveClub, 
  registerForActivity, unregisterFromActivity 
} from '@/actions/student-portal-actions';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps {
  id: number;
  isActive: boolean;
  type: 'event' | 'club' | 'activity';
  status?: 'pending' | 'accepted' | 'rejected'; // Added status prop
}

export function ActionButton({ id, isActive, type, status }: ActionButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setLoading(true);
    let result;
    
    if (type === 'event') {
      result = isActive ? await unregisterFromEvent(id) : await registerForEvent(id);
    } else if (type === 'club') {
      // If pending, user might want to cancel request, which is same as leaving/deleting membership row
      result = isActive ? await leaveClub(id) : await joinClub(id);
    } else {
      result = isActive ? await unregisterFromActivity(id) : await registerForActivity(id);
    }

    setLoading(false);

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.message,
      });
    }
  };

  if (type === 'club' && isActive) {
      if (status === 'pending') {
          return (
             <Button 
                onClick={handleClick} 
                variant="outline"
                disabled={loading}
                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
             >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Pending Approval (Cancel)
             </Button>
          )
      }
      if (status === 'rejected') {
          // Maybe allow re-apply? Or show rejected state. 
          // For now, let's treat it as "Leave" so they can delete the rejected row and try again later if logic allows.
           return (
             <Button 
                onClick={handleClick} 
                variant="outline"
                disabled={loading}
                className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
             >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Rejected (Dismiss)
             </Button>
          )
      }
  }

  return (
    <Button 
      onClick={handleClick} 
      variant={isActive ? "outline" : "default"}
      disabled={loading}
      className={isActive ? "border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600" : ""}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isActive 
        ? (type === 'club' ? 'Leave' : 'Unregister') 
        : (type === 'club' ? 'Request to Join' : 'Register')}
    </Button>
  );
}