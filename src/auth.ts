import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { verifyAdminCredentials } from '@/app/utils/admin-credentials';

import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Admin credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Returning `null` makes NextAuth respond with a CredentialsSignin error,
      // which the login form surfaces as a generic "invalid details" message.
      authorize: credentials =>
        verifyAdminCredentials(credentials?.email, credentials?.password),
    }),
  ],
});
