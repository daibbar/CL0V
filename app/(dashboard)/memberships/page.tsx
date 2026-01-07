import { getClubMemberships, getClubs } from '@/actions/club-actions';
import { getStudents } from '@/actions/student-actions';
import MembershipsPageClient from './client';

export default async function MembershipsPage() {
  const [memberships, students, clubs] = await Promise.all([
    getClubMemberships(),
    getStudents(),
    getClubs()
  ]);

  return <MembershipsPageClient initialMemberships={memberships as any} students={students} clubs={clubs} />;
}