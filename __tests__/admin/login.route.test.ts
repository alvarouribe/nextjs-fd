import { POST as login } from '../../src/app/api/admin/login/route';
import { POST as logout } from '../../src/app/api/admin/logout/route';
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  verifyAdminSessionToken,
} from '../../src/app/utils/admin-auth';
import { MAX_FAILED_LOGIN_ATTEMPTS, resetLoginThrottle } from '../../src/app/utils/login-throttle';

const cookieSet = jest.fn();
const cookieDelete = jest.fn();

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
      cookies: {
        set: (...args: unknown[]) => cookieSet(...args),
        delete: (...args: unknown[]) => cookieDelete(...args),
      },
    }),
  },
}));

const buildRequest = (body: unknown, ip = '1.1.1.1') =>
  ({
    json: async () => {
      if (body instanceof Error) {
        throw body;
      }
      return body;
    },
    headers: new Headers({ 'x-forwarded-for': ip }),
  }) as unknown as Request;

describe('POST /api/admin/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetLoginThrottle();
    process.env.ADMIN_EMAIL = 'admin@example.com';
    process.env.ADMIN_PASSWORD = '1234';
    process.env.ADMIN_SESSION_SECRET = 'test-secret';
  });

  it('sets an httpOnly session cookie for valid credentials', async () => {
    const response = await login(buildRequest({ email: 'admin@example.com', password: '1234' }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(cookieSet).toHaveBeenCalledTimes(1);

    const cookie = cookieSet.mock.calls[0][0];
    expect(cookie).toEqual(
      expect.objectContaining({
        name: ADMIN_SESSION_COOKIE,
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      })
    );
    expect(verifyAdminSessionToken(cookie.value)).toEqual(
      expect.objectContaining({ email: 'admin@example.com' })
    );
  });

  it('rejects a wrong password without setting a cookie', async () => {
    const response = await login(buildRequest({ email: 'admin@example.com', password: 'nope' }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Invalid email or password.',
    });
    expect(cookieSet).not.toHaveBeenCalled();
  });

  it('rejects an unknown email with the same generic message', async () => {
    const response = await login(buildRequest({ email: 'attacker@example.com', password: '1234' }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Invalid email or password.',
    });
  });

  it('returns 400 when fields are missing', async () => {
    const response = await login(buildRequest({ email: 'admin@example.com' }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Email and password are required.',
    });
    expect(cookieSet).not.toHaveBeenCalled();
  });

  it('returns 400 for an unparseable body', async () => {
    const response = await login(buildRequest(new Error('bad json')));

    expect(response.status).toBe(400);
    expect(cookieSet).not.toHaveBeenCalled();
  });

  it('throttles repeated failed attempts from the same client', async () => {
    for (let i = 0; i < MAX_FAILED_LOGIN_ATTEMPTS; i += 1) {
      await login(buildRequest({ email: 'admin@example.com', password: 'no' }));
    }

    const response = await login(buildRequest({ email: 'admin@example.com', password: '1234' }));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Too many failed attempts. Please try again later.',
    });
    expect(cookieSet).not.toHaveBeenCalled();
  });

  it('does not throttle a different client', async () => {
    for (let i = 0; i < MAX_FAILED_LOGIN_ATTEMPTS; i += 1) {
      await login(buildRequest({ email: 'admin@example.com', password: 'no' }, '9.9.9.9'));
    }

    const response = await login(
      buildRequest({ email: 'admin@example.com', password: '1234' }, '1.1.1.1')
    );

    expect(response.status).toBe(200);
  });

  it('returns 500 when the admin credentials are not configured', async () => {
    delete process.env.ADMIN_PASSWORD;

    const response = await login(buildRequest({ email: 'admin@example.com', password: '1234' }));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: 'Admin login is not configured.',
    });
  });
});

describe('POST /api/admin/logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clears the session cookie', async () => {
    const response = await logout();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
    expect(cookieSet).toHaveBeenCalledWith(
      expect.objectContaining({
        name: ADMIN_SESSION_COOKIE,
        value: '',
        maxAge: 0,
        path: '/',
        httpOnly: true,
      })
    );
  });
});
