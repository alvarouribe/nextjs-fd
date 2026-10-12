// SSR-safe get/set for the cookie-consent choice, following the pattern in
// cookies-functions.ts. Consent is a simple, explicit opt-in: GA4 only loads
// once the visitor has accepted (see ConsentAwareAnalytics).

export const CONSENT_COOKIE_NAME = 'fd_consent';

// Dispatched on `window` whenever the consent choice changes (accept,
// decline, or cleared via the "Change cookie preferences" button on the
// privacy policy page), so any mounted listener can react immediately
// without a full page reload.
export const CONSENT_CHANGE_EVENT = 'fd-consent-change';

export type ConsentValue = 'granted' | 'denied';

const CONSENT_COOKIE_MAX_AGE_DAYS = 365;

const dispatchConsentChange = (value: ConsentValue | null) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<ConsentValue | null>(CONSENT_CHANGE_EVENT, {
      detail: value,
    })
  );
};

// Reads the current consent choice from the cookie. Returns null when no
// choice has been made yet (or during SSR), so callers can distinguish
// "not asked" from "declined".
export const getConsent = (): ConsentValue | null => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (!cookie.startsWith(`${CONSENT_COOKIE_NAME}=`)) continue;

    const value = cookie.slice(CONSENT_COOKIE_NAME.length + 1);
    if (value === 'granted' || value === 'denied') return value;
  }

  return null;
};

// Persists the visitor's choice for a year and notifies any listeners.
export const setConsent = (value: ConsentValue): void => {
  if (typeof document === 'undefined') return;

  const date = new Date();
  date.setTime(
    date.getTime() + CONSENT_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000
  );
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;

  dispatchConsentChange(value);
};

// Clears the stored choice (used by "Change cookie preferences") so the
// consent banner is shown again.
export const clearConsent = (): void => {
  if (typeof document === 'undefined') return;

  document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;

  dispatchConsentChange(null);
};

// Google Consent Mode v2. GA4 always loads, but every consent type starts
// as 'denied', so until the visitor accepts it sets no cookies and only
// sends anonymous, cookieless pings. Only analytics_storage is ever
// granted — the banner asks about analytics, not advertising.
//
// This runs as an inline <script> in the root layout, before GA's own init
// script, because Google requires the consent default to be set before
// `gtag('config')`. A returning visitor who already accepted is upgraded
// straight away from the cookie, so their first page view isn't cookieless.
export const CONSENT_MODE_DEFAULTS_SCRIPT = `
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
window.gtag('set', 'ads_data_redaction', true);
if (/(?:^|;\\s*)${CONSENT_COOKIE_NAME}=granted(?:;|$)/.test(document.cookie)) {
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
}
`;

type WindowWithGtag = Window & {
  gtag?: (...args: unknown[]) => void;
};

// Tells GA about a consent change made after page load (banner click, or
// "Change cookie preferences" clearing the choice).
export const updateConsentMode = (value: ConsentValue | null): void => {
  if (typeof window === 'undefined') return;

  const { gtag } = window as WindowWithGtag;
  if (typeof gtag !== 'function') return;

  gtag('consent', 'update', {
    analytics_storage: value === 'granted' ? 'granted' : 'denied',
  });
};
