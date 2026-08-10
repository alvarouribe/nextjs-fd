import { verifyAdminCredentials } from '../../src/app/utils/admin-credentials';

const ORIGINAL_ENV = process.env;

describe('verifyAdminCredentials', () => {
  beforeEach(() => {
    process.env = {
      ...ORIGINAL_ENV,
      ADMIN_EMAIL: 'Admin@FlyingDolly.co.nz',
      ADMIN_PASSWORD: 'correct-horse-battery-staple',
    };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('returns the admin user when both credentials match', () => {
    expect(
      verifyAdminCredentials('admin@flyingdolly.co.nz', 'correct-horse-battery-staple')
    ).toEqual({
      id: 'admin',
      email: 'admin@flyingdolly.co.nz',
      name: 'FlyingDolly admin',
    });
  });

  it('ignores surrounding whitespace and casing on the email', () => {
    expect(
      verifyAdminCredentials('  ADMIN@flyingdolly.co.nz ', 'correct-horse-battery-staple')
    ).not.toBeNull();
  });

  it('rejects a wrong password', () => {
    expect(verifyAdminCredentials('admin@flyingdolly.co.nz', 'wrong')).toBeNull();
  });

  it('rejects a wrong email', () => {
    expect(verifyAdminCredentials('someone@else.com', 'correct-horse-battery-staple')).toBeNull();
  });

  it('does not treat the password as case-insensitive', () => {
    expect(
      verifyAdminCredentials('admin@flyingdolly.co.nz', 'CORRECT-HORSE-BATTERY-STAPLE')
    ).toBeNull();
  });

  it('rejects non-string credentials without touching the env', () => {
    expect(verifyAdminCredentials(undefined, undefined)).toBeNull();
    expect(verifyAdminCredentials('admin@flyingdolly.co.nz', 123)).toBeNull();
  });

  it('throws when the admin credentials are not configured', () => {
    delete process.env.ADMIN_PASSWORD;

    expect(() => verifyAdminCredentials('admin@flyingdolly.co.nz', 'anything')).toThrow(
      'Missing required environment variable: ADMIN_PASSWORD'
    );
  });
});
