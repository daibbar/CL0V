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