'use server'

import db from '@/lib/db';
import { Activity, Event, Registration, Reservation } from '@/types/db';
import { revalidatePath } from 'next/cache';

// --- TYPES ---
export type ActivityWithRelations = Activity & {
  eventName?: string | null;
  clubName?: string | null;
};

export async function createActivity(formData: FormData) {
  const activityName = formData.get('activityName') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as string;
  const maxCapacity = formData.get('maxCapacity') ? Number(formData.get('maxCapacity')) : null;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const budget = formData.get('budget') ? Number(formData.get('budget')) : 0;
  const rating = formData.get('rating') ? Number(formData.get('rating')) : 0;
  const clubId = formData.get('clubId') ? Number(formData.get('clubId')) : null;
  const eventId = formData.get('eventId') ? Number(formData.get('eventId')) : null;

  try {
    const stmt = db.prepare(`
      INSERT INTO activities (activityName, description, type, maxCapacity, startDate, endDate, budget, rating, clubId, eventId)
      VALUES (@activityName, @description, @type, @maxCapacity, @startDate, @endDate, @budget, @rating, @clubId, @eventId)
    `);

    stmt.run({ activityName, description, type, maxCapacity, startDate, endDate, budget, rating, clubId, eventId });
    
    revalidatePath('/activities');
    return { success: true, message: 'Activity created successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getActivities() {
  try {
    const activities = db.prepare(`
      SELECT 
        a.*,
        e.eventName,
        c.clubName
      FROM activities a
      LEFT JOIN events e ON a.eventId = e.eventId
      LEFT JOIN clubs c ON a.clubId = c.clubId
      ORDER BY a.rating DESC, a.startDate DESC
    `).all() as ActivityWithRelations[];
    
    return activities;
  } catch (error: any) {
    console.error("Failed to fetch activities:", error);
    return [];
  }
}

// --- GET ACTIVITY BY ID ---
export async function getActivityById(activityId: number) {
  try {
    const activity = db.prepare(`
      SELECT 
        a.*,
        e.eventName,
        c.clubName
      FROM activities a
      LEFT JOIN events e ON a.eventId = e.eventId
      LEFT JOIN clubs c ON a.clubId = c.clubId
      WHERE a.activityId = ?
    `).get(activityId) as ActivityWithRelations | undefined;
    
    return activity || null;
  } catch (error: any) {
    console.error("Failed to fetch activity:", error);
    return null;
  }
}

// --- UPDATE ACTIVITY ---
export async function updateActivity(activityId: number, formData: FormData) {
  const activityName = formData.get('activityName') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as string;
  const maxCapacity = formData.get('maxCapacity') ? Number(formData.get('maxCapacity')) : null;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;
  const budget = formData.get('budget') ? Number(formData.get('budget')) : 0;
  const rating = formData.get('rating') ? Number(formData.get('rating')) : 0;
  const clubId = formData.get('clubId') ? Number(formData.get('clubId')) : null;
  const eventId = formData.get('eventId') ? Number(formData.get('eventId')) : null;

  try {
    const stmt = db.prepare(`
      UPDATE activities 
      SET activityName = @activityName,
          description = @description,
          type = @type,
          maxCapacity = @maxCapacity,
          startDate = @startDate,
          endDate = @endDate,
          budget = @budget,
          rating = @rating,
          clubId = @clubId,
          eventId = @eventId
      WHERE activityId = @activityId
    `);

    stmt.run({ activityName, description, type, maxCapacity, startDate, endDate, budget, rating, clubId, eventId, activityId });

    revalidatePath('/activities');
    return { success: true, message: 'Activity updated successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- DELETE ACTIVITY ---
export async function deleteActivity(activityId: number) {
  try {
    const stmt = db.prepare('DELETE FROM activities WHERE activityId = ?');
    stmt.run(activityId);

    revalidatePath('/activities');
    return { success: true, message: 'Activity deleted successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- GET ACTIVITY REGISTRATIONS (Students registered for activity) ---
export async function getActivityRegistrations(activityId: number) {
  try {
    const registrations = db.prepare(`
      SELECT 
        r.*,
        s.firstName,
        s.lastName,
        s.cne,
        s.email
      FROM registrations r
      JOIN students s ON r.studentId = s.studentId
      WHERE r.activityId = ?
      ORDER BY s.lastName ASC
    `).all(activityId);
    
    return registrations || [];
  } catch (error: any) {
    console.error("Failed to fetch registrations:", error);
    return [];
  }
}

// --- ADD STUDENT TO ACTIVITY ---
export async function addStudentToActivity(formData: FormData) {
  const activityId = Number(formData.get('activityId'));
  const studentId = Number(formData.get('studentId'));

  if (!activityId || !studentId) {
    return { success: false, message: 'Invalid Activity or Student ID' };
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO registrations (studentId, activityId)
      VALUES (@studentId, @activityId)
    `);

    stmt.run({ studentId, activityId });

    revalidatePath('/activities');
    return { success: true, message: 'Student successfully registered for activity' };
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY' || error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, message: 'Student is already registered for this activity' };
    }
    return { success: false, message: error.message };
  }
}

// --- REMOVE STUDENT FROM ACTIVITY ---
export async function removeStudentFromActivity(formData: FormData) {
  const activityId = Number(formData.get('activityId'));
  const studentId = Number(formData.get('studentId'));

  if (!activityId || !studentId) {
    return { success: false, message: 'Invalid Activity or Student ID' };
  }

  try {
    const stmt = db.prepare('DELETE FROM registrations WHERE activityId = ? AND studentId = ?');
    stmt.run(activityId, studentId);

    revalidatePath('/activities');
    return { success: true, message: 'Student removed from activity' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- GET ACTIVITY RESERVATIONS ---
export async function getActivityReservations(activityId: number) {
  try {
    const reservations = db.prepare(`
      SELECT 
        res.*,
        r.resourceName,
        r.type
      FROM reservations res
      JOIN resources r ON res.resourceId = r.resourceId
      WHERE res.activityId = ?
      ORDER BY res.startDate ASC
    `).all(activityId);
    
    return reservations || [];
  } catch (error: any) {
    console.error("Failed to fetch reservations:", error);
    return [];
  }
}

// --- GET ACTIVITY EVENT ---
export async function getActivityEvent(eventId: number | null) {
  if (!eventId) return null;
  
  try {
    const event = db.prepare(`
      SELECT * FROM events WHERE eventId = ?
    `).get(eventId) as Event | undefined;
    
    return event || null;
  } catch (error: any) {
    console.error("Failed to fetch event:", error);
    return null;
  }
}

// --- GET ACTIVITY CLUB ---
export async function getActivityClub(clubId: number | null) {
  if (!clubId) return null;
  
  try {
    const club = db.prepare(`
      SELECT * FROM clubs WHERE clubId = ?
    `).get(clubId);
    
    return club || null;
  } catch (error: any) {
    console.error("Failed to fetch club:", error);
    return null;
  }
}

// --- GET ACTIVITY GUESTS ---
export async function getActivityGuests(activityId: number) {
  try {
    const guests = db.prepare(`
      SELECT gr.*, g.fullName, g.email, g.phone
      FROM guestRoles gr
      JOIN guests g ON gr.guestId = g.guestId
      WHERE gr.activityId = ?
      ORDER BY gr.startDate ASC
    `).all(activityId);

    return guests || [];
  } catch (error: any) {
    console.error("Failed to fetch activity guests:", error);
    return [];
  }
}

// --- ADD GUEST TO ACTIVITY ---
export async function addGuestToActivity(formData: FormData) {
  const activityId = Number(formData.get('activityId'));
  const guestId = Number(formData.get('guestId'));
  const roleDescription = formData.get('roleDescription') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  if (!activityId || !guestId) {
    return { success: false, message: 'Invalid Activity or Guest ID' };
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO guestRoles (guestId, activityId, roleDescription, startDate, endDate)
      VALUES (@guestId, @activityId, @roleDescription, @startDate, @endDate)
    `);

    stmt.run({ guestId, activityId, roleDescription, startDate, endDate });

    revalidatePath('/activities');
    return { success: true, message: 'Guest added to activity successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- REMOVE GUEST FROM ACTIVITY ---
export async function removeGuestFromActivity(guestRoleId: number) {
  if (!guestRoleId) {
    return { success: false, message: 'Invalid Guest Role ID' };
  }

  try {
    const stmt = db.prepare('DELETE FROM guestRoles WHERE guestRoleId = ?');
    stmt.run(guestRoleId);

    revalidatePath('/activities');
    return { success: true, message: 'Guest removed from activity' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}