'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import CookieConsent from './CookieConsent';
import {
  CONSENT_CHANGE_EVENT,
  type ConsentValue,
  getConsent,
  setConsent,
  updateConsentMode,
} from '@/app/utils/consent';

type ConsentAwareAnalyticsProps = {
  gaId: string;
};

// The consent cookie is an external store (like localStorage) — subscribe
// to it with useSyncExternalStore rather than mirroring it into local
// state via useEffect. That gives a correct, SSR-safe snapshot (null on
// the server, since cookies aren't readable there) and reacts to changes
// dispatched from anywhere: this component's own Accept/Decline, or the
// "Change cookie preferences" button on /privacy-policy.
const subscribe = (onStoreChange: () => void) => {
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
};

const getServerSnapshot = (): ConsentValue | null => null;

// Google Consent Mode v2: GA4 always loads, but runs cookieless until the
// visitor accepts. The consent defaults (and the upgrade for a returning
// visitor who already accepted) are set by CONSENT_MODE_DEFAULTS_SCRIPT in
// the root layout; this component keeps GA in sync with later changes.
export default function ConsentAwareAnalytics({
  gaId,
}: ConsentAwareAnalyticsProps) {
  const consent = useSyncExternalStore(
    subscribe,
    getConsent,
    getServerSnapshot
  );

  // Syncs an external system (gtag) with the consent store — the one job
  // an effect is for.
  useEffect(() => {
    updateConsentMode(consent);
  }, [consent]);

  const handleAccept = useCallback(() => {
    setConsent('granted');
  }, []);

  const handleDecline = useCallback(() => {
    setConsent('denied');
  }, []);

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      <CookieConsent
        visible={consent === null}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </>
  );
}
