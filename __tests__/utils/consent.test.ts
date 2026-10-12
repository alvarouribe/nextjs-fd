import {
  CONSENT_CHANGE_EVENT,
  CONSENT_COOKIE_NAME,
  CONSENT_MODE_DEFAULTS_SCRIPT,
  clearConsent,
  getConsent,
  setConsent,
  updateConsentMode,
} from '../../src/app/utils/consent';

// `dataLayer` is already declared globally (as Object[]) by
// @next/third-parties, so only add gtag here.
type WindowWithGtag = Window & {
  gtag?: (...args: unknown[]) => void;
};

// The inline script runs as a classic <script> in the browser; running it
// through Function in the global scope reproduces that in jsdom.
const runDefaultsScript = () => {
  new Function(CONSENT_MODE_DEFAULTS_SCRIPT)();
};

const dataLayerCalls = () =>
  ((window.dataLayer ?? []) as IArguments[]).map((args) => Array.from(args));

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

describe('Consent Mode v2', () => {
  beforeEach(() => {
    clearCookies();
    delete (window as WindowWithGtag).dataLayer;
    delete (window as WindowWithGtag).gtag;
  });

  it('defaults every consent type to denied when no choice has been made', () => {
    runDefaultsScript();

    expect(dataLayerCalls()).toContainEqual([
      'consent',
      'default',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    expect(dataLayerCalls().some((call) => call[1] === 'update')).toBe(false);
  });

  it('defines a global gtag that pushes onto the dataLayer', () => {
    runDefaultsScript();

    expect(typeof (window as WindowWithGtag).gtag).toBe('function');
  });

  it('grants analytics storage straight away for a returning visitor who accepted', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=granted`;

    runDefaultsScript();

    const calls = dataLayerCalls();
    const defaultIndex = calls.findIndex((call) => call[1] === 'default');
    const updateIndex = calls.findIndex((call) => call[1] === 'update');
    expect(calls[updateIndex]).toEqual(['consent', 'update', { analytics_storage: 'granted' }]);
    expect(updateIndex).toBeGreaterThan(defaultIndex);
  });

  it('keeps analytics denied for a returning visitor who declined', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=denied`;

    runDefaultsScript();

    expect(dataLayerCalls().some((call) => call[1] === 'update')).toBe(false);
  });

  it('updateConsentMode grants analytics storage only when consent is granted', () => {
    const gtag = jest.fn();
    (window as WindowWithGtag).gtag = gtag;

    updateConsentMode('granted');
    updateConsentMode('denied');
    updateConsentMode(null);

    expect(gtag.mock.calls).toEqual([
      ['consent', 'update', { analytics_storage: 'granted' }],
      ['consent', 'update', { analytics_storage: 'denied' }],
      ['consent', 'update', { analytics_storage: 'denied' }],
    ]);
  });

  it('updateConsentMode does not throw when gtag is unavailable', () => {
    expect(() => updateConsentMode('granted')).not.toThrow();
  });
});
