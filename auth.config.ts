import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard') || 
                            nextUrl.pathname.startsWith('/students') ||
                            nextUrl.pathname.startsWith('/clubs') ||
                            nextUrl.pathname.startsWith('/events') ||
                            nextUrl.pathname.startsWith('/activities') ||
                            nextUrl.pathname.startsWith('/memberships') ||
                            nextUrl.pathname.startsWith('/resources') ||
                            nextUrl.pathname.startsWith('/guests') ||
                            nextUrl.pathname.startsWith('/reservations');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnHome = nextUrl.pathname.startsWith('/home') || nextUrl.pathname === '/';

      // Allow access to home, login, and register pages
      if (isOnHome || isOnLogin || isOnRegister) {
        if (isLoggedIn && (isOnLogin || isOnRegister)) {
          return Response.redirect(new URL('/dashboard', nextUrl)); // Redirect logged-in users to dashboard
        }
        return true;
      }

      // Protect dashboard routes
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      
      // Default allow for other routes (like api, _next, static files)
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
