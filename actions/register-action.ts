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
});

export type RegisterState = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function registerAdmin(prevState: RegisterState, formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if email already exists
    const existingAdmin = db.prepare('SELECT 1 FROM admins WHERE email = ?').get(email);
    if (existingAdmin) {
        return {
            message: 'Email already in use.',
            errors: { email: ['Email already in use.'] }
        };
    }

    db.prepare(`
      INSERT INTO admins (firstName, lastName, email, password, status)
      VALUES (?, ?, ?, ?, 'pending')
    `).run(firstName, lastName, email, hashedPassword);
  } catch (error) {
    console.error('Registration failed:', error);
    return {
      message: 'Database Error: Failed to Create Admin.',
    };
  }

  redirect('/login');
}
