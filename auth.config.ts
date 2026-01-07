import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;

      const isOnAdminDashboard = nextUrl.pathname.startsWith('/dashboard') || 
                            nextUrl.pathname.startsWith('/students') ||
                            nextUrl.pathname.startsWith('/clubs') ||
                            nextUrl.pathname.startsWith('/events') ||
                            nextUrl.pathname.startsWith('/activities') ||
                            nextUrl.pathname.startsWith('/memberships') ||
                            nextUrl.pathname.startsWith('/resources') ||
                            nextUrl.pathname.startsWith('/guests') ||
                            nextUrl.pathname.startsWith('/reservations');
      
      const isOnStudentDashboard = nextUrl.pathname.startsWith('/student');

      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnHome = nextUrl.pathname.startsWith('/home') || nextUrl.pathname === '/';

      // Redirect logic for logged-in users trying to access public pages
      if (isLoggedIn && (isOnLogin || isOnRegister || isOnHome)) {
         if (role === 'student') {
            return Response.redirect(new URL('/student/dashboard', nextUrl));
         } else {
            return Response.redirect(new URL('/dashboard', nextUrl));
         }
      }

      // Protect Admin Routes
      if (isOnAdminDashboard) {
        if (!isLoggedIn) return false;
        if (role !== 'admin') {
           return Response.redirect(new URL('/student/dashboard', nextUrl));
        }
        return true;
      }

      // Protect Student Routes
      if (isOnStudentDashboard) {
        if (!isLoggedIn) return false;
        if (role !== 'student') {
           // Optionally allow admins to view student dashboard or redirect them back
           return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
      }
      
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
