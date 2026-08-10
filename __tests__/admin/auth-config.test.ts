import type { Session } from 'next-auth';

import { authConfig } from '../../src/auth.config';

type AuthorizedArgs = Parameters<
  NonNullable<NonNullable<typeof authConfig.callbacks>['authorized']>
>[0];

const buildRequest = (pathname: string) => ({ nextUrl: { pathname } }) as AuthorizedArgs['request'];

const signedIn = {
  user: { email: 'admin@flyingdolly.co.nz' },
  expires: '2099-01-01T00:00:00.000Z',
} as Session;

const authorized = (pathname: string, auth: Session | null) =>
  authConfig.callbacks.authorized({
    request: buildRequest(pathname),
    auth,
  } as AuthorizedArgs);

describe('authConfig', () => {
  it('uses a JWT session so no database is required', () => {
    expect(authConfig.session.strategy).toBe('jwt');
  });

  it('sends unauthenticated visitors to the admin login page', () => {
    expect(authConfig.pages.signIn).toBe('/admin/login');
  });

  describe('authorized callback', () => {
    it('lets anyone through on public pages', () => {
      expect(authorized('/', null)).toBe(true);
      expect(authorized('/photography/portraits', null)).toBe(true);
    });

    it('always allows the login page so the redirect cannot loop', () => {
      expect(authorized('/admin/login', null)).toBe(true);
    });

    it('blocks the dashboard without a session', () => {
      expect(authorized('/admin', null)).toBe(false);
      expect(authorized('/admin/anything/nested', null)).toBe(false);
    });

    it('blocks when the session carries no user', () => {
      expect(authorized('/admin', {} as Session)).toBe(false);
    });

    it('allows the dashboard for a signed-in admin', () => {
      expect(authorized('/admin', signedIn)).toBe(true);
      expect(authorized('/admin/anything/nested', signedIn)).toBe(true);
    });
  });
});
