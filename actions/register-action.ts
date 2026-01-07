'use server';

import { z } from 'zod';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

const RegisterSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'admin']),
  cne: z.string().optional(),
}).refine((data) => {
  if (data.role === 'student' && !data.cne) {
    return false;
  }
  return true;
}, {
  message: "CNE is required for students",
  path: ["cne"],
});

export type RegisterState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
    cne?: string[];
  };
  message?: string | null;
};

export async function registerUser(prevState: RegisterState, formData: FormData) {
  const rawData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    // Convert null to undefined so Zod .optional() works correctly
    cne: formData.get('cne') ? (formData.get('cne') as string) : undefined,
  };

  const validatedFields = RegisterSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const { firstName, lastName, email, password, role, cne } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    if (role === 'admin') {
        const existingAdmin = db.prepare('SELECT 1 FROM admins WHERE email = ?').get(email);
        if (existingAdmin) {
            return { message: 'Email already in use.', errors: { email: ['Email already in use.'] } };
        }
        db.prepare(`
          INSERT INTO admins (firstName, lastName, email, password, status)
          VALUES (?, ?, ?, ?, 'pending')
        `).run(firstName, lastName, email, hashedPassword);

    } else {
        // Student Registration
        const existingStudent = db.prepare('SELECT 1 FROM students WHERE email = ? OR cne = ?').get(email, cne);
        if (existingStudent) {
             return { message: 'Email or CNE already in use.', errors: { email: ['Email or CNE already in use.'] } };
        }
        
        // Default Major ID to 1 (IID) or null if schema allows, but schema says INTEGER (nullable). 
        // Let's leave it null for now or user can update profile later.
        db.prepare(`
          INSERT INTO students (firstName, lastName, email, password, cne, majorId)
          VALUES (?, ?, ?, ?, ?, NULL)
        `).run(firstName, lastName, email, hashedPassword, cne);
    }

  } catch (error) {
    console.error('Registration failed:', error);
    return {
      message: 'Database Error: Failed to Create Account.',
    };
  }

  redirect('/login');
}
