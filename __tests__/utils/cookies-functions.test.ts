import {
  checkEmailLimitCookie,
  setEmailLimitCookie,
} from '../../src/app/utils/cookies-functions';

describe('cookies-functions', () => {
  beforeEach(() => {
    document.cookie = 'emailLimit=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie = 'otherCookie=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  });

  it('sets the email limit cookie when running in the browser', () => {
    setEmailLimitCookie(60);
    expect(document.cookie).toContain('emailLimit=active');
  });

  it('returns true when the email limit cookie exists', () => {
    document.cookie = 'emailLimit=active';
    expect(checkEmailLimitCookie()).toBe(true);
  });

  it('returns false when the email limit cookie does not exist', () => {
    document.cookie = 'otherCookie=1';
    expect(checkEmailLimitCookie()).toBe(false);
  });
});
