import { NextResponse } from 'next/server';

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  verifyAdminCredentials,
} from '@/app/utils/admin-auth';
import {
  clearFailedLogins,
  isLoginThrottled,
  registerFailedLogin,
} from '@/app/utils/login-throttle';

const getClientKey = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');

  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
};

export async function POST(request: Request) {
  const clientKey = getClientKey(request);

  if (isLoginThrottled(clientKey)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many failed attempts. Please try again later.',
      },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const { email, password } = (body ?? {}) as {
    email?: unknown;
    password?: unknown;
  };

  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Email and password are required.' },
      { status: 400 }
    );
  }

  if (!email.trim() || !password) {
    return NextResponse.json(
      { success: false, error: 'Email and password are required.' },
      { status: 400 }
    );
  }

  let isValid: boolean;
  let token: string;

  try {
    isValid = verifyAdminCredentials(email, password);
    token = isValid ? createAdminSessionToken(email) : '';
  } catch (error) {
    console.error('Admin login misconfigured:', error);

    return NextResponse.json(
      { success: false, error: 'Admin login is not configured.' },
      { status: 500 }
    );
  }

  if (!isValid) {
    registerFailedLogin(clientKey);

    return NextResponse.json(
      { success: false, error: 'Invalid email or password.' },
      { status: 401 }
    );
  }

  clearFailedLogins(clientKey);

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
