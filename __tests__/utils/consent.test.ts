import {
  CONSENT_CHANGE_EVENT,
  CONSENT_COOKIE_NAME,
  clearConsent,
  getConsent,
  setConsent,
} from '../../src/app/utils/consent';

const clearCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!name) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
};

describe('consent utils', () => {
  beforeEach(() => {
    clearCookies();
  });

  it('returns null when no consent cookie is set', () => {
    expect(getConsent()).toBeNull();
  });

  it('returns "granted" when the cookie is set to granted', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=granted`;
    expect(getConsent()).toBe('granted');
  });

  it('returns "denied" when the cookie is set to denied', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=denied`;
    expect(getConsent()).toBe('denied');
  });

  it('ignores unrelated cookies with a similar prefix', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}other=granted`;
    expect(getConsent()).toBeNull();
  });

  it('sets the consent cookie with a 365 day expiry and SameSite=Lax', () => {
    setConsent('granted');
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=granted`);
    expect(getConsent()).toBe('granted');
  });

  it('dispatches a consent-change event when consent is set', () => {
    const handler = jest.fn();
    window.addEventListener(CONSENT_CHANGE_EVENT, handler);

    setConsent('denied');

    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent<string | null>;
    expect(event.detail).toBe('denied');

    window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
  });

  it('clears the consent cookie and dispatches a null-detail event', () => {
    setConsent('granted');

    const handler = jest.fn();
    window.addEventListener(CONSENT_CHANGE_EVENT, handler);

    clearConsent();

    expect(getConsent()).toBeNull();
    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0][0] as CustomEvent<string | null>;
    expect(event.detail).toBeNull();

    window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
  });
});
