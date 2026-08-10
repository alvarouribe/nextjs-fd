import NextAuth from 'next-auth';

import { authConfig } from '@/auth.config';

// Uses the provider-free config so the proxy stays lightweight — the session
// cookie is all it needs to read to gate `/admin`.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/admin/:path*'],
};
