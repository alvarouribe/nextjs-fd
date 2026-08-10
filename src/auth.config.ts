import type { NextAuthConfig } from 'next-auth';

export const ADMIN_ROOT_PATH = '/admin';
export const ADMIN_LOGIN_PATH = '/admin/login';

/** Sessions last one working day, then the admin has to sign in again. */
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

/**
 * The half of the NextAuth config that must stay free of Node-only APIs so it
 * can run inside `src/proxy.ts`. The Credentials provider (which uses
 * `node:crypto`) is added in `src/auth.ts`, which only ever runs in a Route
 * Handler or a Server Component.
 */
export const authConfig = {
  pages: {
    signIn: ADMIN_LOGIN_PATH,
    error: ADMIN_LOGIN_PATH,
  },
  session: {
    strategy: 'jwt',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  },
  callbacks: {
    /**
     * Consulted by the proxy for every matched request. Everything under
     * `/admin` needs a session; the login page itself must stay reachable or
     * the redirect would loop.
     */
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;

      if (!pathname.startsWith(ADMIN_ROOT_PATH)) {
        return true;
      }

      if (pathname === ADMIN_LOGIN_PATH) {
        return true;
      }

      return Boolean(auth?.user);
    },
  },
  providers: [],
} satisfies NextAuthConfig;
