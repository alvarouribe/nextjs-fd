import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

import { requiredEnv } from './required-env';

export type AdminUser = {
  id: string;
  email: string;
  name: string;
};

/**
 * Constant-time comparison that tolerates different lengths — `timingSafeEqual`
 * throws when the buffers differ in size, so both sides are hashed to a fixed
 * width first.
 */
const secureEqual = (a: string, b: string): boolean => {
  const digest = (value: string) =>
    createHmac('sha256', 'admin-credentials').update(value).digest();

  return timingSafeEqual(digest(a), digest(b));
};

const normaliseEmail = (email: string) => email.trim().toLowerCase();

/**
 * Checks a submitted email/password pair against `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
 * Returns the admin user for NextAuth to put in the session, or `null` when the
 * credentials do not match.
 */
export const verifyAdminCredentials = (
  email: unknown,
  password: unknown
): AdminUser | null => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    return null;
  }

  const expectedEmail = requiredEnv('ADMIN_EMAIL');
  const expectedPassword = requiredEnv('ADMIN_PASSWORD');

  // Both comparisons always run so response time never reveals which half of
  // the credentials was wrong.
  const emailMatches = secureEqual(
    normaliseEmail(email),
    normaliseEmail(expectedEmail)
  );
  const passwordMatches = secureEqual(password, expectedPassword);

  if (!emailMatches || !passwordMatches) {
    return null;
  }

  return {
    id: 'admin',
    email: normaliseEmail(expectedEmail),
    name: 'FlyingDolly admin',
  };
};
