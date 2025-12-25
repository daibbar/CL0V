import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import db from './lib/db';
import type { Admin } from '@/types/db';
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

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const admin = await getAdmin(email);

          if (!admin) return null;
          
          // If admin has no password set (from migration), allowing login might be risky.
          // But for now, we assume migration added a default or empty password.
          // We must check if password matches.
          if (!admin.password) return null;

          if (admin.status !== 'accepted') {
            console.log('Account not active');
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, admin.password);
          if (passwordsMatch) return admin;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
