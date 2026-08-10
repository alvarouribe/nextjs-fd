import 'server-only';
import { cookies } from 'next/headers';

import {
  ADMIN_SESSION_COOKIE,
  AdminSession,
  verifyAdminSessionToken,
} from './admin-auth';

/**
 * Reads the admin session from the request cookies. Returns `null` for
 * anonymous visitors as well as for expired, forged, or otherwise unusable
 * cookies — callers should treat `null` as "not signed in".
 */
export const getAdminSession = async (): Promise<AdminSession | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    return verifyAdminSessionToken(token);
  } catch {
    return null;
  }
};
