import { getAllActivitiesForStudent } from '@/actions/student-portal-actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionButton } from '@/components/student-action-buttons';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Users } from 'lucide-react';
import { format } from 'date-fns';

export default async function StudentActivitiesPage() {
  const activities = await getAllActivitiesForStudent();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity: any) => (
          <Card key={activity.activityId} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{activity.activityName}</CardTitle>
                {activity.isRegistered === 1 && <Badge variant="secondary">Registered</Badge>}
              </div>
              <CardDescription className="capitalize">
                {activity.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="mr-2 h-3 w-3" />
                  {format(new Date(activity.startDate), 'PP p')}
              </div>
              {activity.maxCapacity && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="mr-2 h-3 w-3" />
                    Max Capacity: {activity.maxCapacity}
                  </div>
              )}
            </CardContent>
            <CardFooter>
              <ActionButton 
                id={activity.activityId} 
                isActive={activity.isRegistered === 1} 
                type="activity" 
              />
            </CardFooter>
          </Card>
        ))}
         {activities.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
              No activities found.
            </div>
          )}
      </div>
    </div>
  );
}
