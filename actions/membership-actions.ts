'use server'

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function approveMembership(membershipId: number) {
    try {
        db.prepare("UPDATE clubMemberships SET status = 'accepted' WHERE membershipId = ?").run(membershipId);
        revalidatePath('/memberships');
        return { success: true, message: 'Membership approved' };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}

export async function rejectMembership(membershipId: number) {
    try {
        db.prepare("UPDATE clubMemberships SET status = 'rejected' WHERE membershipId = ?").run(membershipId);
        revalidatePath('/memberships');
        return { success: true, message: 'Membership rejected' };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}
