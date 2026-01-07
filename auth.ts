import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import db from './lib/db';
import type { Admin, Student } from '@/types/db';
import bcrypt from 'bcryptjs';

async function getAdmin(email: string): Promise<Admin | undefined> {
  try {
    const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email) as Admin | undefined;
    return admin;
  } catch (error) {
    console.error('Failed to fetch admin:', error);
    throw new Error('Failed to fetch admin.');
  }
}

async function getStudent(email: string): Promise<Student | undefined> {
  try {
    const student = db.prepare('SELECT * FROM students WHERE email = ?').get(email) as Student | undefined;
    return student;
  } catch (error) {
    console.error('Failed to fetch student:', error);
    throw new Error('Failed to fetch student.');
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
             email: z.string().email(), 
             password: z.string().min(6),
             role: z.string().optional() 
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password, role } = parsedCredentials.data;
          
          // If role is 'admin' or unspecified, check Admin
          if (!role || role === 'admin') {
              const admin = await getAdmin(email);
              if (admin) {
                if (!admin.password) return null;
                if (admin.status !== 'accepted') return null;
                
                const passwordsMatch = await bcrypt.compare(password, admin.password);
                if (passwordsMatch) {
                  return {
                    id: String(admin.adminId),
                    name: `${admin.firstName} ${admin.lastName}`,
                    email: admin.email,
                    role: 'admin',
                  };
                }
              }
          }

          // If role is 'student' or unspecified, check Student
          if (!role || role === 'student') {
              const student = await getStudent(email);
              if (student) {
                if (!student.password) return null;
                
                const passwordsMatch = await bcrypt.compare(password, student.password);
                if (passwordsMatch) {
                  return {
                    id: String(student.studentId),
                    name: `${student.firstName} ${student.lastName}`,
                    email: student.email,
                    role: 'student',
                  };
                }
              }
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
