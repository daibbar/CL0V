'use server'

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Event, Student } from '@/types/db'; 

// --- CREATE EVENT ---
export async function createEvent(formData: FormData) {
  const eventName = formData.get('eventName') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  try {
    const stmt = db.prepare(`
      INSERT INTO events (eventName, startDate, endDate)
      VALUES (@eventName, @startDate, @endDate)
    `);

    stmt.run({ eventName, startDate, endDate });
    
    revalidatePath('/events');
    return { success: true, message: 'Event created successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- READ EVENTS (Optional utility) ---
export async function getEvents() {
  try {
    const events = db.prepare('SELECT * FROM events ORDER BY startDate DESC').all() as Event[];
    return events;
  } catch (error: any) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

// --- UPDATE EVENT ---
export async function updateEvent(eventId: number, formData: FormData) {
  const eventName = formData.get('eventName') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  try {
    const stmt = db.prepare(`
      UPDATE events 
      SET eventName = @eventName, 
          startDate = @startDate, 
          endDate = @endDate
      WHERE eventId = @eventId
    `);

    stmt.run({ eventName, startDate, endDate, eventId });

    revalidatePath('/events');
    return { success: true, message: 'Event updated successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- DELETE EVENT ---
export async function deleteEvent(eventId: number) {
  try {
    const stmt = db.prepare('DELETE FROM events WHERE eventId = ?');
    stmt.run(eventId);

    revalidatePath('/events');
    return { success: true, message: 'Event deleted successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- ADD STUDENT TO EVENT (Attendance) ---
export async function addStudentToEvent(formData: FormData) {
  const eventId = Number(formData.get('eventId'));
  const studentId = Number(formData.get('studentId'));

  if (!eventId || !studentId) {
    return { success: false, message: 'Invalid Event or Student ID' };
  }

  try {
    // Uses the camelCase table name 'eventParticipants' matching your schema
    const stmt = db.prepare(`
      INSERT INTO eventParticipants (eventId, studentId)
      VALUES (@eventId, @studentId)
    `);

    stmt.run({ eventId, studentId });

    // Revalidate events to update the UI counts/lists immediately
    revalidatePath('/events');
    return { success: true, message: 'Student successfully registered for event' };

  } catch (error: any) {
    // Handle Unique Constraint (Student already added)
    if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY' || error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, message: 'Student is already registered for this event' };
    }
    return { success: false, message: error.message };
  }
}

// --- REMOVE STUDENT FROM EVENT ---
export async function removeStudentFromEvent(formData: FormData) {
    const eventId = Number(formData.get('eventId'));
    const studentId = Number(formData.get('studentId'));

    if (!eventId || !studentId) {
        return { success: false, message: 'Invalid Event or Student ID' };
    }

    try {
        const stmt = db.prepare('DELETE FROM eventParticipants WHERE eventId = ? AND studentId = ?');
        stmt.run(eventId, studentId);
        
        revalidatePath('/events');
        return { success: true, message: 'Student removed from event' };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

// --- GET EVENT PARTICIPANTS ---
export async function getEventParticipants(eventId: number) {
  try {
    const participants = db.prepare(`
      SELECT s.*
      FROM eventParticipants ep
      JOIN students s ON ep.studentId = s.studentId
      WHERE ep.eventId = ?
      ORDER BY s.lastName ASC
    `).all(eventId) as Student[];

    return participants || [];
  } catch (error: any) {
    console.error("Failed to fetch event participants:", error);
    return [];
  }
}