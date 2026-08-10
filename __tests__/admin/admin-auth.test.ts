import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  verifyAdminCredentials,
  verifyAdminSessionToken,
} from '../../src/app/utils/admin-auth';

const NOW = 1_700_000_000_000;

describe('admin-auth', () => {
  beforeEach(() => {
    process.env.ADMIN_EMAIL = 'admin@example.com';
    process.env.ADMIN_PASSWORD = '1234';
    process.env.ADMIN_SESSION_SECRET = 'test-secret';
  });

  describe('verifyAdminCredentials', () => {
    it('accepts the configured email and password', () => {
      expect(verifyAdminCredentials('admin@example.com', '1234')).toBe(true);
    });

    it('ignores email casing and surrounding whitespace', () => {
      expect(verifyAdminCredentials('  Admin@Example.com ', '1234')).toBe(true);
    });

    it('rejects a wrong password', () => {
      expect(verifyAdminCredentials('admin@example.com', 'wrong')).toBe(false);
    });

    it('rejects an unknown email', () => {
      expect(verifyAdminCredentials('someone@example.com', '1234')).toBe(false);
    });

    it('rejects empty credentials', () => {
      expect(verifyAdminCredentials('', '')).toBe(false);
    });

    it('throws when the admin credentials are not configured', () => {
      delete process.env.ADMIN_PASSWORD;

      expect(() => verifyAdminCredentials('admin@example.com', '1234')).toThrow(
        'Missing required environment variable: ADMIN_PASSWORD'
      );
    });
  });

  describe('session tokens', () => {
    it('exposes a stable cookie name and session length', () => {
      expect(ADMIN_SESSION_COOKIE).toBe('fd_admin_session');
      expect(ADMIN_SESSION_MAX_AGE_SECONDS).toBe(60 * 60 * 8);
    });

    it('round-trips a signed session', () => {
      const token = createAdminSessionToken('admin@example.com', NOW);

      expect(verifyAdminSessionToken(token, NOW)).toEqual({
        email: 'admin@example.com',
        expiresAt: NOW + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
      });
    });

    it('returns null for a missing token without reading the secret', () => {
      delete process.env.ADMIN_SESSION_SECRET;

      expect(verifyAdminSessionToken(undefined, NOW)).toBeNull();
      expect(verifyAdminSessionToken('', NOW)).toBeNull();
    });

    it('returns null for a malformed token', () => {
      expect(verifyAdminSessionToken('not-a-token', NOW)).toBeNull();
    });

    it('returns null when the payload was tampered with', () => {
      const token = createAdminSessionToken('admin@example.com', NOW);
      const [, signature] = token.split('.');
      const forgedPayload = Buffer.from(
        JSON.stringify({
          email: 'attacker@example.com',
          exp: NOW + 1_000_000,
        })
      ).toString('base64url');

      expect(verifyAdminSessionToken(`${forgedPayload}.${signature}`, NOW)).toBeNull();
    });

    it('returns null when the token was signed with a different secret', () => {
      const token = createAdminSessionToken('admin@example.com', NOW);
      process.env.ADMIN_SESSION_SECRET = 'another-secret';

      expect(verifyAdminSessionToken(token, NOW)).toBeNull();
    });

    it('returns null once the session has expired', () => {
      const token = createAdminSessionToken('admin@example.com', NOW);
      const afterExpiry = NOW + ADMIN_SESSION_MAX_AGE_SECONDS * 1000 + 1;

      expect(verifyAdminSessionToken(token, afterExpiry)).toBeNull();
    });

    it('returns null when the signed email is no longer the admin email', () => {
      const token = createAdminSessionToken('admin@example.com', NOW);
      process.env.ADMIN_EMAIL = 'new-admin@example.com';

      expect(verifyAdminSessionToken(token, NOW)).toBeNull();
    });
  });
});
