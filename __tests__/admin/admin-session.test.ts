import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from '../../src/app/utils/admin-auth';
import { getAdminSession } from '../../src/app/utils/admin-session';

const cookiesGet = jest.fn();

jest.mock('next/headers', () => ({
  cookies: async () => ({ get: (...args: unknown[]) => cookiesGet(...args) }),
}));

describe('getAdminSession', () => {
  beforeEach(() => {
    process.env.ADMIN_EMAIL = 'admin@example.com';
    process.env.ADMIN_PASSWORD = '1234';
    process.env.ADMIN_SESSION_SECRET = 'test-secret';
  });

  it('returns the session for a valid cookie', async () => {
    const token = createAdminSessionToken('admin@example.com');
    cookiesGet.mockReturnValue({ name: ADMIN_SESSION_COOKIE, value: token });

    await expect(getAdminSession()).resolves.toEqual(
      expect.objectContaining({ email: 'admin@example.com' })
    );
    expect(cookiesGet).toHaveBeenCalledWith(ADMIN_SESSION_COOKIE);
  });

  it('returns null when the cookie is absent', async () => {
    cookiesGet.mockReturnValue(undefined);

    await expect(getAdminSession()).resolves.toBeNull();
  });

  it('returns null when the cookie cannot be verified', async () => {
    cookiesGet.mockReturnValue({
      name: ADMIN_SESSION_COOKIE,
      value: 'tampered.token',
    });

    await expect(getAdminSession()).resolves.toBeNull();
  });
});
