import { auth } from '@/auth';
import { getStudentEvents, getStudentClubs, getStudentActivities } from '@/actions/student-actions';
import { StatsCard } from '@/components/stats-card';
import { Calendar, Trophy, Activity as ActivityIcon, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function StudentDashboard() {
  const session = await auth();
  const studentId = session?.user?.id ? parseInt(session.user.id) : 0;

  const events = await getStudentEvents(studentId);
  const clubs = await getStudentClubs(studentId);
  const activities = await getStudentActivities(studentId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Welcome, {session?.user?.name}</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="My Events"
          value={events.length}
          icon={Calendar}
          description="Upcoming events"
        />
        <StatsCard
          title="My Clubs"
          value={clubs.length}
          icon={Trophy}
          description="Active memberships"
        />
        <StatsCard
          title="My Activities"
          value={activities.length}
          icon={ActivityIcon}
          description="Registered activities"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         {/* My Clubs */}
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    My Clubs
                </CardTitle>
                <CardDescription>Clubs you are a member of</CardDescription>
            </CardHeader>
            <CardContent>
                {clubs.length > 0 ? (
                    <div className="space-y-4">
                        {clubs.map(club => (
                            <div key={club.clubId} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                                <div>
                                    <h4 className="font-semibold">{club.clubName}</h4>
                                    <p className="text-xs text-muted-foreground capitalize">{club.category}</p>
                                </div>
                                <Badge variant="secondary">Member</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">You haven't joined any clubs yet.</p>
                )}
            </CardContent>
         </Card>

         {/* My Events */}
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                </CardTitle>
                <CardDescription>Events you are participating in</CardDescription>
            </CardHeader>
            <CardContent>
                 {events.length > 0 ? (
                    <div className="space-y-4">
                        {events.map(event => (
                            <div key={event.eventId} className="flex flex-col space-y-2 p-3 rounded-lg border bg-card/50">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold">{event.eventName}</h4>
                                    <Badge>Registered</Badge>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {new Date(event.startDate).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">No upcoming events found.</p>
                )}
            </CardContent>
         </Card>

         {/* My Activities */}
         <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ActivityIcon className="h-5 w-5 text-primary" />
                    My Activities
                </CardTitle>
                <CardDescription>Activities you have registered for</CardDescription>
            </CardHeader>
            <CardContent>
                 {activities.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {activities.map(activity => (
                            <div key={activity.activityId} className="p-4 rounded-lg border bg-card/50 space-y-2">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold">{activity.activityName}</h4>
                                    <Badge variant="outline" className="capitalize">{activity.type}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                                <div className="flex items-center justify-between pt-2">
                                     <div className="flex items-center text-xs text-muted-foreground">
                                        <Clock className="mr-1 h-3 w-3" />
                                        {new Date(activity.startDate).toLocaleDateString()}
                                    </div>
                                    {activity.maxCapacity && (
                                         <div className="flex items-center text-xs text-muted-foreground">
                                            <Users className="mr-1 h-3 w-3" />
                                            Cap: {activity.maxCapacity}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">No registered activities.</p>
                )}
            </CardContent>
         </Card>
      </div>
    </div>
  );
}