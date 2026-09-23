'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import CookieConsent from './CookieConsent';
import {
  CONSENT_CHANGE_EVENT,
  type ConsentValue,
  getConsent,
  setConsent,
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

// Gates GA4 behind an explicit visitor choice: nothing loads until consent
// is 'granted' — on first mount (an existing cookie), or the instant the
// visitor accepts the banner.
export default function ConsentAwareAnalytics({
  gaId,
}: ConsentAwareAnalyticsProps) {
  const consent = useSyncExternalStore(
    subscribe,
    getConsent,
    getServerSnapshot
  );

  const handleAccept = useCallback(() => {
    setConsent('granted');
  }, []);

  const handleDecline = useCallback(() => {
    setConsent('denied');
  }, []);

  return (
    <>
      {consent === 'granted' && <GoogleAnalytics gaId={gaId} />}
      <CookieConsent
        visible={consent === null}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </>
  );
}
