'use server'

import db from '@/lib/db';
import { Student, Major } from '@/types/db';
import { revalidatePath } from 'next/cache';

// --- HELPER TYPES ---
// We define this here because the UI usually needs the Major Name, not just the ID
export type StudentWithMajor = Student & {
  majorName: string | null;
};

// --- READ ---

export async function getStudents() {
  // We JOIN with majors to get the readable name (e.g., 'IID') instead of just a number
  const students = db.prepare(`
    SELECT 
      students.*, 
      majors.majorName 
    FROM students 
    LEFT JOIN majors ON students.majorId = majors.majorId
    ORDER BY students.lastName ASC
  `).all() as StudentWithMajor[];
  
  return students;
}

// We need this to populate the <Select> dropdown in the Add/Edit form
export async function getMajors() {
  return db.prepare('SELECT * FROM majors ORDER BY majorName ASC').all() as Major[];
}

// --- CREATE ---

export async function createStudent(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const cne = formData.get('cne') as string;
  const email = formData.get('email') as string;
  // Convert string "1" to number 1, or null if empty
  const majorId = formData.get('majorId') ? parseInt(formData.get('majorId') as string) : null;

  try {
    const stmt = db.prepare(`
      INSERT INTO students (firstName, lastName, cne, email, majorId)
      VALUES (@firstName, @lastName, @cne, @email, @majorId)
    `);

    stmt.run({ firstName, lastName, cne, email, majorId });
    
    revalidatePath('/students');
    return { success: true, message: 'Student registered successfully' };
  } catch (error: any) {
    // Handle Unique Constraints (Duplicate CNE or Email)
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, message: 'Error: Student Code (CNE) or Email already exists.' };
    }
    return { success: false, message: error.message };
  }
}

// --- UPDATE ---

export async function updateStudent(studentId: number, formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const cne = formData.get('cne') as string;
  const email = formData.get('email') as string;
  const majorId = formData.get('majorId') ? parseInt(formData.get('majorId') as string) : null;

  try {
    const stmt = db.prepare(`
      UPDATE students 
      SET firstName = @firstName, 
          lastName = @lastName, 
          cne = @cne, 
          email = @email, 
          majorId = @majorId
      WHERE studentId = @studentId
    `);

    stmt.run({ firstName, lastName, cne, email, majorId, studentId });

    revalidatePath('/students');
    return { success: true, message: 'Student updated successfully' };
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, message: 'Error: Student Code or Email is already taken.' };
    }
    return { success: false, message: error.message };
  }
}

// --- DELETE ---

export async function deleteStudent(studentId: number) {
  try {
    const stmt = db.prepare('DELETE FROM students WHERE studentId = ?');
    stmt.run(studentId);

    revalidatePath('/students');
    return { success: true, message: 'Student deleted successfully' };
  } catch (error: any) {
    // SQLITE_CONSTRAINT_FOREIGNKEY happens if you try to delete a student 
    // who is arguably an "Organizer" of an event or has critical linked data.
    // (Though usually, ON DELETE CASCADE handles this, it's good to be safe)
    return { success: false, message: error.message };
  }
}