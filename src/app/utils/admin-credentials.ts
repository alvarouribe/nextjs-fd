import 'server-only';
import { type ScryptOptions, scrypt, timingSafeEqual } from 'node:crypto';

import { requiredEnv } from './required-env';

export type AdminUser = {
  id: string;
  email: string;
  name: string;
};

const HASH_SCHEME = 'scrypt';
const KEY_LENGTH = 64;

/**
 * `128 * N * r` bytes are allocated per derivation, so the ceiling doubles as a
 * guard against a malformed hash asking for an absurd amount of memory.
 */
const MAX_MEMORY_BYTES = 256 * 1024 * 1024;

type StoredHash = {
  salt: Buffer;
  key: Buffer;
  options: ScryptOptions;
};

/**
 * `ADMIN_PASSWORD_HASH` is `scrypt:<N>:<r>:<p>:<base64 salt>:<base64 key>`.
 *
 * The cost parameters travel inside the hash rather than living in this file,
 * so they can be raised later without invalidating existing hashes and can
 * never silently drift from the generator (`pnpm admin:hash`).
 */
const parseStoredHash = (value: string): StoredHash => {
  const [scheme, rawN, rawR, rawP, rawSalt, rawKey] = value.split(':');
  const [N, r, p] = [rawN, rawR, rawP].map(Number);

  const isMalformed =
    scheme !== HASH_SCHEME ||
    !rawSalt ||
    !rawKey ||
    ![N, r, p].every(value => Number.isInteger(value) && value > 0);

  if (isMalformed) {
    throw new Error(
      'ADMIN_PASSWORD_HASH must look like "scrypt:<N>:<r>:<p>:<salt>:<key>" — regenerate it with `pnpm admin:hash`.'
    );
  }

  if (128 * N * r > MAX_MEMORY_BYTES) {
    throw new Error(
      'ADMIN_PASSWORD_HASH asks for an unreasonable scrypt cost.'
    );
  }

  return {
    salt: Buffer.from(rawSalt, 'base64'),
    key: Buffer.from(rawKey, 'base64'),
    options: { N, r, p, maxmem: MAX_MEMORY_BYTES },
  };
};

const deriveKey = (
  password: string,
  salt: Buffer,
  options: ScryptOptions
): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    // The async form keeps the ~100ms derivation off the event loop.
    scrypt(password, salt, KEY_LENGTH, options, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });

const normaliseEmail = (email: string) => email.trim().toLowerCase();

/**
 * Checks a submitted email/password pair against `ADMIN_EMAIL` and the scrypt
 * digest in `ADMIN_PASSWORD_HASH`. Returns the admin user for NextAuth to put
 * in the session, or `null` when the credentials do not match.
 */
export const verifyAdminCredentials = async (
  email: unknown,
  password: unknown
): Promise<AdminUser | null> => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    return null;
  }

  const expectedEmail = requiredEnv('ADMIN_EMAIL');
  const { salt, key, options } = parseStoredHash(
    requiredEnv('ADMIN_PASSWORD_HASH')
  );

  // Derive unconditionally — even when the email is already wrong — so the
  // response time never reveals which half of the credentials failed. The
  // deliberate slowness also throttles brute-force attempts.
  const derived = await deriveKey(password, salt, options);
  const passwordMatches =
    derived.length === key.length && timingSafeEqual(derived, key);

  // The email is not a secret, so a plain comparison is enough here.
  const emailMatches = normaliseEmail(email) === normaliseEmail(expectedEmail);

  if (!emailMatches || !passwordMatches) {
    return null;
  }

  return {
    id: 'admin',
    email: normaliseEmail(expectedEmail),
    name: 'FlyingDolly admin',
  };
};
