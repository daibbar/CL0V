'use server';

import db from '@/lib/db';
import { Admin } from '@/types/db';
import { revalidatePath } from 'next/cache';

export async function getAdmins() {
  try {
    const admins = db.prepare('SELECT * FROM admins ORDER BY adminId DESC').all() as Admin[];
    // Remove password from returned objects for security
    return admins.map(({ password, ...rest }) => rest);
  } catch (error) {
    console.error('Failed to fetch admins:', error);
    return [];
  }
}

export async function updateAdminStatus(adminId: number, status: 'accepted' | 'rejected' | 'pending') {
  try {
    db.prepare('UPDATE admins SET status = ? WHERE adminId = ?').run(status, adminId);
    revalidatePath('/admins');
    return { success: true };
  } catch (error) {
    console.error('Failed to update admin status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

export async function deleteAdmin(adminId: number) {
  try {
    db.prepare('DELETE FROM admins WHERE adminId = ?').run(adminId);
    revalidatePath('/admins');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete admin:', error);
    return { success: false, error: 'Failed to delete admin' };
  }
}