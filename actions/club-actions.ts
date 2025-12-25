'use server'

import db from '@/lib/db';
import { Club } from '@/types/db';
import { revalidatePath } from 'next/cache';

// --- CREATE ---
export async function createClub(formData: FormData) {
  const clubName = formData.get('clubName') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const createdAt = formData.get('createdAt') as string;

  try {
    const stmt = db.prepare(`
      INSERT INTO clubs (clubName, category, description, createdAt)
      VALUES (@clubName, @category, @description, @createdAt)
    `);

    stmt.run({ clubName, category, description, createdAt });
    
    // Refresh the page data
    revalidatePath('/clubs');
    return { success: true, message: 'Club created successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- READ (Optional, usually done directly in Server Components) ---
export async function getClubs() {
  const clubs = db.prepare('SELECT * FROM clubs ORDER BY createdAt DESC').all() as Club[];
  return clubs;
}

// --- UPDATE ---
export async function updateClub(clubId: number, formData: FormData) {
  const clubName = formData.get('clubName') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const createdAt = formData.get('createdAt') as string;

  try {
    const stmt = db.prepare(`
      UPDATE clubs 
      SET clubName = @clubName, 
          category = @category, 
          description = @description, 
          createdAt = @createdAt
      WHERE clubId = @clubId
    `);

    stmt.run({ clubName, category, description, createdAt, clubId });

    revalidatePath('/clubs');
    return { success: true, message: 'Club updated successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- DELETE ---
export async function deleteClub(clubId: number) {
  try {
    const stmt = db.prepare('DELETE FROM clubs WHERE clubId = ?');
    stmt.run(clubId);

    revalidatePath('/clubs');
    return { success: true, message: 'Club deleted successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- GET CLUBS BY EVENT ---
export async function getClubsByEvent(eventId: number) {
  try {
    const clubs = db.prepare(`
      SELECT c.*
      FROM clubs c
      JOIN eventOrganizers eo ON c.clubId = eo.clubId
      WHERE eo.eventId = ?
    `).all(eventId);

    return clubs || [];
  } catch (error: any) {
    console.error("Failed to fetch clubs for event:", error);
    return [];
  }
}

// --- CLUB MEMBERSHIPS ---
export async function getClubMembers(clubId: number) {
  try {
    const members = db.prepare(`
      SELECT s.*, cm.joinedAt
      FROM students s
      JOIN clubMemberships cm ON s.studentId = cm.studentId
      WHERE cm.clubId = ?
      ORDER BY cm.joinedAt DESC
    `).all(clubId);
    
    return members;
  } catch (error: any) {
    console.error("Failed to fetch club members:", error);
    return [];
  }
}

export async function getClubEvents(clubId: number) {
  try {
    // Events where the club is an organizer
    const events = db.prepare(`
      SELECT e.*
      FROM events e
      JOIN eventOrganizers eo ON e.eventId = eo.eventId
      WHERE eo.clubId = ?
      ORDER BY e.startDate DESC
    `).all(clubId);
    return events;
  } catch (error) {
    console.error("Failed to fetch club events:", error);
    return [];
  }
}

export async function getClubActivities(clubId: number) {
  try {
    // Activities owned by the club
    const activities = db.prepare(`
      SELECT * FROM activities WHERE clubId = ? ORDER BY startDate DESC
    `).all(clubId);
    return activities;
  } catch (error) {
     console.error("Failed to fetch club activities:", error);
     return [];
  }
}

export async function getClubMemberships() {
  try {
    const rows = db.prepare(`
      SELECT cm.membershipId, cm.joinedAt,
             c.clubName as clubName, c.category as clubCategory,
             s.studentId, s.firstName || ' ' || s.lastName as studentName, s.cne as studentCne, s.email as studentEmail
      FROM clubMemberships cm
      JOIN clubs c ON cm.clubId = c.clubId
      JOIN students s ON cm.studentId = s.studentId
      ORDER BY cm.joinedAt DESC
    `).all();

    return rows || [];
  } catch (error: any) {
    console.error('Failed to fetch club memberships', error);
    return [];
  }
}

export async function createClubMembership(formData: FormData) {
  const studentId = parseInt(formData.get('studentId') as string);
  const clubId = parseInt(formData.get('clubId') as string);
  const joinedAt = (formData.get('joinedAt') as string) || new Date().toISOString();

  try {
    const stmt = db.prepare(`
      INSERT INTO clubMemberships (joinedAt, clubId, studentId)
      VALUES (@joinedAt, @clubId, @studentId)
    `);

    stmt.run({ joinedAt, clubId, studentId });
    revalidatePath('/memberships');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to create club membership', error);
    return { success: false, message: error.message };
  }
}

export async function deleteClubMembership(membershipId: number) {
  try {
    const stmt = db.prepare('DELETE FROM clubMemberships WHERE membershipId = ?');
    stmt.run(membershipId);
    revalidatePath('/memberships');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete club membership', error);
    return { success: false, message: error.message };
  }
}