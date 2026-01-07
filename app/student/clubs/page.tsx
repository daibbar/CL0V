import { getAllClubsForStudent } from '@/actions/student-portal-actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionButton } from '@/components/student-action-buttons';
import { Badge } from '@/components/ui/badge';

export default async function StudentClubsPage() {
  const clubs = await getAllClubsForStudent();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Clubs</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club: any) => (
          <Card key={club.clubId} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{club.clubName}</CardTitle>
                {club.isMember === 1 && (
                    <Badge variant={club.membershipStatus === 'accepted' ? 'secondary' : 'outline'}>
                        {club.membershipStatus === 'accepted' ? 'Member' : club.membershipStatus}
                    </Badge>
                )}
              </div>
              <CardDescription className="capitalize">
                {club.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{club.description}</p>
            </CardContent>
            <CardFooter>
              <ActionButton 
                id={club.clubId} 
                isActive={club.isMember === 1} 
                status={club.membershipStatus}
                type="club" 
              />
            </CardFooter>
          </Card>
        ))}
        {clubs.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
              No clubs found.
            </div>
          )}
      </div>
    </div>
  );
}