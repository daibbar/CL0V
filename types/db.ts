
export interface Admin {
  adminId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Major {
  majorId: number;
  majorName: 'IID' | 'GI' | 'IRIC' | 'GE' | 'GPEE' | 'MGSI';
}

export interface Club {
  clubId: number;
  clubName: string;
  category: 'art et culture' | 'sport' | 'technologie' | 'entrepreneuriat social';
  description: string | null;
  createdAt: string; // SQLite returns dates as strings
}

export interface Event {
  eventId: number;
  eventName: string;
  startDate: string;
  endDate: string;
}

export interface Resource {
  resourceId: number;
  resourceName: string;
  type: 'Salle' | 'Amphitheatre' | 'Buvette' | 'Bibliotheque' | 'Terrain' | 'Labo';
}

export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  cne: string;
  email: string;
  majorId: number | null;
}

export interface Activity {
  activityId: number;
  activityName: string;
  description: string | null;
  type: 'Voyage' | 'Atelier' | 'Conference' | 'Competition';
  maxCapacity: number | null;
  startDate: string;
  endDate: string;
  // These are nullable because an activity belongs to EITHER a club OR an event
  clubId: number | null;
  eventId: number | null;
}

export interface ClubMembership {
  membershipId: number;
  joinedAt: string;
  clubId: number;
  studentId: number;
}

export interface ClubMembershipWithDetails {
  membershipId: number;
  joinedAt: string;
  clubId?: number;
  studentId: number;
  clubName: string;
  clubCategory: string;
  studentName: string;
  studentCne: string;
  studentEmail: string;
}

export interface Reservation {
  reservationId: number;
  reservationName: string;
  startDate: string;
  endDate: string;
  resourceId: number;
  activityId: number;
}

export interface EventOrganizer {
  eventId: number;
  clubId: number;
}

export interface EventParticipant {
  eventId: number;
  studentId: number;
}

export interface Registration {
  registrationId: number;
  registeredAt: string;
  studentId: number;
  activityId: number;
}

export interface Guest {
  guestId: number;
  fullName: string;
  phone: string;
  email: string;
}

export interface GuestRole {
  guestRoleId: number;
  guestId: number;
  activityId: number;
  roleDescription: string;
  startDate: string;
  endDate: string;
}