'use server'

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Reservation } from '@/types/db';

// --- CREATE RESERVATION ---
export async function createReservation(formData: FormData) {
  const reservationName = formData.get('reservationName') as string;
  const resourceId = Number(formData.get('resourceId'));
  const activityId = Number(formData.get('activityId'));
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  try {
    const stmt = db.prepare(`
      INSERT INTO reservations (reservationName, resourceId, activityId, startDate, endDate)
      VALUES (@reservationName, @resourceId, @activityId, @startDate, @endDate)
    `);

    stmt.run({ reservationName, resourceId, activityId, startDate, endDate });
    
    revalidatePath('/resources');
    revalidatePath('/reservations');
    return { success: true, message: 'Reservation created successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- READ RESERVATIONS ---
export async function getReservations() {
  try {
    const reservations = db.prepare(`
      SELECT 
        r.*,
        res.resourceName,
        res.type as resourceType,
        a.activityName,
        a.type as activityType
      FROM reservations r
      JOIN resources res ON r.resourceId = res.resourceId
      JOIN activities a ON r.activityId = a.activityId
      ORDER BY r.startDate DESC
    `).all();
    
    return reservations;
  } catch (error: any) {
    console.error("Failed to fetch reservations:", error);
    return [];
  }
}

// --- DELETE RESERVATION ---
export async function deleteReservation(reservationId: number) {
  try {
    const stmt = db.prepare('DELETE FROM reservations WHERE reservationId = ?');
    stmt.run(reservationId);

    revalidatePath('/resources');
    revalidatePath('/reservations');
    return { success: true, message: 'Reservation deleted successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- GET RESERVATIONS BY RESOURCE ---
export async function getReservationsByResource(resourceId: number) {
  try {
    const reservations = db.prepare(`
      SELECT 
        r.*,
        a.activityName
      FROM reservations r
      JOIN activities a ON r.activityId = a.activityId
      WHERE r.resourceId = ?
      ORDER BY r.startDate DESC
    `).all(resourceId);
    
    return reservations;
  } catch (error: any) {
    console.error("Failed to fetch reservations by resource:", error);
    return [];
  }
}
