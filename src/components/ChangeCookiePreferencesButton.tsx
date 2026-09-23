'use client';

import { clearConsent } from '@/app/utils/consent';

// Lets a visitor revisit their cookie choice from the privacy policy page.
// Clearing the cookie and dispatching the consent-change event is enough —
// ConsentAwareAnalytics (mounted globally in the root layout) is listening
// and re-shows the banner immediately, no page reload required.
export default function ChangeCookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={clearConsent}
      className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
    >
      Change cookie preferences
    </button>
  );
}
