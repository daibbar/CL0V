'use server'

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Resource } from '@/types/db';

// --- CREATE RESOURCE ---
export async function createResource(formData: FormData) {
  const resourceName = formData.get('nom') as string;
  const type = formData.get('type_ressource') as string;

  try {
    const stmt = db.prepare(`
      INSERT INTO resources (resourceName, type)
      VALUES (@resourceName, @type)
    `);

    stmt.run({ resourceName, type });
    
    revalidatePath('/resources');
    return { success: true, message: 'Resource created successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- READ RESOURCES ---
export async function getResources() {
  try {
    const resources = db.prepare('SELECT * FROM resources ORDER BY resourceName ASC').all() as Resource[];
    return resources;
  } catch (error: any) {
    console.error("Failed to fetch resources:", error);
    return [];
  }
}

// --- UPDATE RESOURCE ---
export async function updateResource(resourceId: number, formData: FormData) {
  const resourceName = formData.get('nom') as string;
  const type = formData.get('type_ressource') as string;

  try {
    const stmt = db.prepare(`
      UPDATE resources 
      SET resourceName = @resourceName,
          type = @type
      WHERE resourceId = @resourceId
    `);

    stmt.run({ resourceName, type, resourceId });

    revalidatePath('/resources');
    return { success: true, message: 'Resource updated successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// --- DELETE RESOURCE ---
export async function deleteResource(resourceId: number) {
  try {
    const stmt = db.prepare('DELETE FROM resources WHERE resourceId = ?');
    stmt.run(resourceId);

    revalidatePath('/resources');
    return { success: true, message: 'Resource deleted successfully' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
