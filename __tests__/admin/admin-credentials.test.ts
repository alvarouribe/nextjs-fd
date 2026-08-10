import { randomBytes, scrypt } from 'node:crypto';

import { verifyAdminCredentials } from '../../src/app/utils/admin-credentials';

const ORIGINAL_ENV = process.env;
const PASSWORD = 'correct-horse-battery-staple';

// Cheap cost parameters keep the suite fast; production uses N=16384.
const N = 1024;
const R = 8;
const P = 1;

const buildHash = async (password: string): Promise<string> => {
  const salt = randomBytes(16);
  const key = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, { N, r: R, p: P }, (error, derivedKey) =>
      error ? reject(error) : resolve(derivedKey)
    );
  });

  return ['scrypt', N, R, P, salt.toString('base64'), key.toString('base64')].join(':');
};

describe('verifyAdminCredentials', () => {
  let passwordHash: string;

  beforeAll(async () => {
    passwordHash = await buildHash(PASSWORD);
  });

  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      ADMIN_EMAIL: 'Admin@FlyingDolly.co.nz',
      ADMIN_PASSWORD_HASH: passwordHash,
    };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns the admin user when both credentials match', async () => {
    await expect(verifyAdminCredentials('admin@flyingdolly.co.nz', PASSWORD)).resolves.toEqual({
      id: 'admin',
      email: 'admin@flyingdolly.co.nz',
      name: 'FlyingDolly admin',
    });
  });

  it('ignores surrounding whitespace and casing on the email', async () => {
    await expect(
      verifyAdminCredentials('  ADMIN@flyingdolly.co.nz ', PASSWORD)
    ).resolves.not.toBeNull();
  });

  it('rejects a wrong password', async () => {
    await expect(verifyAdminCredentials('admin@flyingdolly.co.nz', 'wrong')).resolves.toBeNull();
  });

  it('rejects a wrong email', async () => {
    await expect(verifyAdminCredentials('someone@else.com', PASSWORD)).resolves.toBeNull();
  });

  it('does not treat the password as case-insensitive', async () => {
    await expect(
      verifyAdminCredentials('admin@flyingdolly.co.nz', PASSWORD.toUpperCase())
    ).resolves.toBeNull();
  });

  it('rejects a password that only shares a prefix with the real one', async () => {
    await expect(
      verifyAdminCredentials('admin@flyingdolly.co.nz', PASSWORD.slice(0, -1))
    ).resolves.toBeNull();
  });

  it('rejects non-string credentials without touching the env', async () => {
    await expect(verifyAdminCredentials(undefined, undefined)).resolves.toBeNull();
    await expect(verifyAdminCredentials('admin@flyingdolly.co.nz', 123)).resolves.toBeNull();
  });

  it('never keeps the password in plaintext in the env', () => {
    // The point of the scrypt hash — guards against a regression that
    // reintroduces a readable ADMIN_PASSWORD.
    expect(process.env.ADMIN_PASSWORD).toBeUndefined();
    expect(process.env.ADMIN_PASSWORD_HASH).not.toContain(PASSWORD);
  });

  it('throws when the password hash is not configured', async () => {
    delete process.env.ADMIN_PASSWORD_HASH;

    await expect(verifyAdminCredentials('admin@flyingdolly.co.nz', PASSWORD)).rejects.toThrow(
      'Missing required environment variable: ADMIN_PASSWORD_HASH'
    );
  });

  it('throws a helpful error when the hash is malformed', async () => {
    process.env.ADMIN_PASSWORD_HASH = 'not-a-real-hash';

    await expect(verifyAdminCredentials('admin@flyingdolly.co.nz', PASSWORD)).rejects.toThrow(
      'pnpm admin:hash'
    );
  });

  it('rejects a hash whose cost parameters would exhaust memory', async () => {
    process.env.ADMIN_PASSWORD_HASH = `scrypt:${2 ** 30}:8:1:c2FsdA==:a2V5`;

    await expect(verifyAdminCredentials('admin@flyingdolly.co.nz', PASSWORD)).rejects.toThrow(
      'unreasonable scrypt cost'
    );
  });

  it('verifies a hash produced by the generator script', async () => {
    // Guards against the script and the verifier drifting apart.
    const { execFileSync } = await import('node:child_process');
    const output = execFileSync('node', ['scripts/hash-admin-password.mjs'], {
      input: PASSWORD,
      encoding: 'utf8',
    });

    process.env.ADMIN_PASSWORD_HASH = output.trim().replace('ADMIN_PASSWORD_HASH=', '');

    await expect(
      verifyAdminCredentials('admin@flyingdolly.co.nz', PASSWORD)
    ).resolves.not.toBeNull();
  }, 20000);
});
