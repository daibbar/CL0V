import { getAllEventsForStudent } from '@/actions/student-portal-actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionButton } from '@/components/student-action-buttons';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export default async function StudentEventsPage() {
  const events = await getAllEventsForStudent();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event: any) => (
          <Card key={event.eventId} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{event.eventName}</CardTitle>
                {event.isRegistered === 1 && <Badge variant="secondary">Registered</Badge>}
              </div>
              <CardDescription>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(new Date(event.startDate), 'PPP')} - {format(new Date(event.endDate), 'PPP')}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {/* Description could go here if added to schema */}
            </CardContent>
            <CardFooter>
              <ActionButton 
                id={event.eventId} 
                isActive={event.isRegistered === 1} 
                type="event" 
              />
            </CardFooter>
          </Card>
        ))}
        {events.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            No events found.
          </div>
        )}
      </div>
    </div>
  );
}
