'use client';

import Link from 'next/link';

type CookieConsentProps = {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
};

// Pure, controlled banner UI — ConsentAwareAnalytics owns the actual
// consent state and decides when this is visible.
export default function CookieConsent({
  visible,
  onAccept,
  onDecline,
}: CookieConsentProps) {
  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:inset-x-auto sm:left-4 sm:max-w-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <p className="text-sm text-gray-700 dark:text-gray-300">
        We use cookies to understand how visitors use this site. We only turn on
        analytics if you say it&apos;s okay. Read our{' '}
        <Link
          href="/privacy-policy"
          className="font-medium text-green-600 underline hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
        >
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onDecline}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={onAccept}
          className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-500"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
