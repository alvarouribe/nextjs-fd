import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

import { requiredEnv } from './required-env';

export const ADMIN_SESSION_COOKIE = 'fd_admin_session';

/** Sessions last one working day, then the admin has to sign in again. */
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export type AdminSession = {
  email: string;
  expiresAt: number;
};

type SessionPayload = {
  email: unknown;
  exp: unknown;
};

/**
 * Length-safe, constant-time string comparison. `timingSafeEqual` throws when
 * the buffers differ in length, so we hash both sides to a fixed width first.
 */
const secureEqual = (a: string, b: string): boolean => {
  const digest = (value: string) =>
    createHmac('sha256', 'compare').update(value).digest();

  return timingSafeEqual(digest(a), digest(b));
};

const normaliseEmail = (email: string) => email.trim().toLowerCase();

export const verifyAdminCredentials = (
  email: string,
  password: string
): boolean => {
  const expectedEmail = requiredEnv('ADMIN_EMAIL');
  const expectedPassword = requiredEnv('ADMIN_PASSWORD');

  // Both comparisons always run so the response time does not reveal which
  // half of the credentials was wrong.
  const emailMatches = secureEqual(
    normaliseEmail(email),
    normaliseEmail(expectedEmail)
  );
  const passwordMatches = secureEqual(password, expectedPassword);

  return emailMatches && passwordMatches;
};

const sign = (payload: string): string =>
  createHmac('sha256', requiredEnv('ADMIN_SESSION_SECRET'))
    .update(payload)
    .digest('base64url');

export const createAdminSessionToken = (
  email: string,
  nowMs: number = Date.now()
): string => {
  const payload = Buffer.from(
    JSON.stringify({
      email: normaliseEmail(email),
      exp: nowMs + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
    })
  ).toString('base64url');

  return `${payload}.${sign(payload)}`;
};

export const verifyAdminSessionToken = (
  token: string | null | undefined,
  nowMs: number = Date.now()
): AdminSession | null => {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split('.');

  if (!payload || !signature) {
    return null;
  }

  if (!secureEqual(signature, sign(payload))) {
    return null;
  }

  let parsed: SessionPayload;

  try {
    parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    return null;
  }

  const { email, exp } = parsed;

  if (typeof email !== 'string' || typeof exp !== 'number') {
    return null;
  }

  if (exp <= nowMs) {
    return null;
  }

  // Rotating ADMIN_EMAIL invalidates any session issued for the old address.
  if (!secureEqual(email, normaliseEmail(requiredEnv('ADMIN_EMAIL')))) {
    return null;
  }

  return { email, expiresAt: exp };
};
