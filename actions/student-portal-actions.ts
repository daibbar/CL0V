'use server'

import db from '@/lib/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

// --- HELPERS ---
async function getStudentId() {
  const session = await auth();
  if (!session?.user?.id || (session.user as any).role !== 'student') {
    throw new Error('Unauthorized');
  }
  return parseInt(session.user.id);
}

// --- READ ---

export async function getAllEventsForStudent() {
  const studentId = await getStudentId();
  try {
    const events = db.prepare(`
      SELECT e.*, 
        CASE WHEN ep.studentId IS NOT NULL THEN 1 ELSE 0 END as isRegistered
      FROM events e
      LEFT JOIN eventParticipants ep ON e.eventId = ep.eventId AND ep.studentId = ?
      ORDER BY e.startDate DESC
    `).all(studentId);
    return events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function getAllClubsForStudent() {
  const studentId = await getStudentId();
  try {
    const clubs = db.prepare(`
      SELECT c.*, 
        CASE WHEN cm.studentId IS NOT NULL THEN 1 ELSE 0 END as isMember,
        cm.status as membershipStatus
      FROM clubs c
      LEFT JOIN clubMemberships cm ON c.clubId = cm.clubId AND cm.studentId = ?
      ORDER BY c.clubName ASC
    `).all(studentId);
    return clubs;
  } catch (error) {
    console.error("Failed to fetch clubs:", error);
    return [];
  }
}

export async function getAllActivitiesForStudent() {
  const studentId = await getStudentId();
  try {
    const activities = db.prepare(`
      SELECT a.*, 
        CASE WHEN r.studentId IS NOT NULL THEN 1 ELSE 0 END as isRegistered
      FROM activities a
      LEFT JOIN registrations r ON a.activityId = r.activityId AND r.studentId = ?
      ORDER BY a.startDate DESC
    `).all(studentId);
    return activities;
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    return [];
  }
}

// --- WRITE ---

export async function registerForEvent(eventId: number) {
  const studentId = await getStudentId();
  try {
    db.prepare('INSERT INTO eventParticipants (eventId, studentId) VALUES (?, ?)').run(eventId, studentId);
    revalidatePath('/student/events');
    revalidatePath('/student/dashboard');
    return { success: true, message: 'Registered successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function unregisterFromEvent(eventId: number) {
  const studentId = await getStudentId();
  try {
    db.prepare('DELETE FROM eventParticipants WHERE eventId = ? AND studentId = ?').run(eventId, studentId);
    revalidatePath('/student/events');
    revalidatePath('/student/dashboard');
    return { success: true, message: 'Unregistered successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function joinClub(clubId: number) {
  const studentId = await getStudentId();
  try {
    db.prepare('INSERT INTO clubMemberships (clubId, studentId, status) VALUES (?, ?, ?)').run(clubId, studentId, 'pending');
    revalidatePath('/student/clubs');
    revalidatePath('/student/dashboard');
    return { success: true, message: 'Request to join club sent. Awaiting approval.' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function leaveClub(clubId: number) {
  const studentId = await getStudentId();
  try {
    db.prepare('DELETE FROM clubMemberships WHERE clubId = ? AND studentId = ?').run(clubId, studentId);
    revalidatePath('/student/clubs');
    revalidatePath('/student/dashboard');
    return { success: true, message: 'Left club successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function registerForActivity(activityId: number) {
  const studentId = await getStudentId();
  try {
    db.prepare('INSERT INTO registrations (activityId, studentId) VALUES (?, ?)').run(activityId, studentId);
    revalidatePath('/student/activities');
    revalidatePath('/student/dashboard');
    return { success: true, message: 'Registered for activity successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function unregisterFromActivity(activityId: number) {
  const studentId = await getStudentId();
  try {
    db.prepare('DELETE FROM registrations WHERE activityId = ? AND studentId = ?').run(activityId, studentId);
    revalidatePath('/student/activities');
    revalidatePath('/student/dashboard');
    return { success: true, message: 'Unregistered from activity successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function changePassword(formData: FormData) {
  const studentId = await getStudentId();
  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;

  try {
    const student = db.prepare('SELECT * FROM students WHERE studentId = ?').get(studentId) as any;
    
    const match = await bcrypt.compare(currentPassword, student.password);
    if (!match) {
      return { success: false, message: 'Incorrect current password' };
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    db.prepare('UPDATE students SET password = ? WHERE studentId = ?').run(hashed, studentId);
    
    return { success: true, message: 'Password changed successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
