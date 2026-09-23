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
