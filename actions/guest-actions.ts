'use server'

import db from '@/lib/db';
import { Guest, GuestRole } from '@/types/db';
import { revalidatePath } from 'next/cache';

// --- READ GUESTS ---
export async function getGuests() {
  try {
    const guests = db.prepare('SELECT * FROM guests ORDER BY fullName ASC').all() as Guest[];
    return guests;
  } catch (error: any) {
    console.error("Failed to fetch guests:", error);
    return [];
  }
}

// --- CREATE GUEST ---
export async function createGuest(formData: FormData) {
  const fullName = formData.get('guest_name') as string;
  const phone = formData.get('guest_phone') as string;
  const email = formData.get('guest_email') as string;

  try {
    const stmt = db.prepare(`
      INSERT INTO guests (fullName, phone, email)
      VALUES (@fullName, @phone, @email)
    `);

    stmt.run({ fullName, phone, email });
    
    revalidatePath('/guests');
    return { success: true, message: 'Guest created successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- DELETE GUEST ---
export async function deleteGuest(guestId: number) {
  try {
    const stmt = db.prepare('DELETE FROM guests WHERE guestId = ?');
    stmt.run(guestId);

    revalidatePath('/guests');
    return { success: true, message: 'Guest deleted successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- GET GUEST ACTIVITIES ---
export type GuestActivityInvitation = {
  activityName: string;
  activityType: string;
  startDate: string;
  roleDescription: string;
  eventName: string | null;
  clubName: string | null;
};

export async function getGuestActivities(guestId: number) {
  try {
    const activities = db.prepare(`
      SELECT 
        a.activityName,
        a.type as activityType,
        a.startDate,
        gr.roleDescription,
        e.eventName,
        c.clubName
      FROM guestRoles gr
      JOIN activities a ON gr.activityId = a.activityId
      LEFT JOIN events e ON a.eventId = e.eventId
      LEFT JOIN clubs c ON a.clubId = c.clubId
      WHERE gr.guestId = ?
      ORDER BY a.startDate DESC
    `).all(guestId) as GuestActivityInvitation[];

    return activities;
  } catch (error: any) {
    console.error("Failed to fetch guest activities:", error);
    return [];
  }
}
