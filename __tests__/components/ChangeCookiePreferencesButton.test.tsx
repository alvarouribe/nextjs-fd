import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { CONSENT_COOKIE_NAME, setConsent } from '../../src/app/utils/consent';
import ChangeCookiePreferencesButton from '../../src/components/ChangeCookiePreferencesButton';

describe('ChangeCookiePreferencesButton', () => {
  beforeEach(() => {
    document.cookie = `${CONSENT_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });

  it('renders a button', () => {
    render(<ChangeCookiePreferencesButton />);
    expect(screen.getByRole('button', { name: /change cookie preferences/i })).toBeInTheDocument();
  });

  it('clears the consent cookie when clicked', () => {
    setConsent('granted');
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=granted`);

    render(<ChangeCookiePreferencesButton />);
    fireEvent.click(screen.getByRole('button', { name: /change cookie preferences/i }));

    expect(document.cookie).not.toContain(`${CONSENT_COOKIE_NAME}=granted`);
  });

  it('dispatches a consent-change event so the banner re-appears without a reload', () => {
    const handler = jest.fn();
    window.addEventListener('fd-consent-change', handler);

    render(<ChangeCookiePreferencesButton />);
    fireEvent.click(screen.getByRole('button', { name: /change cookie preferences/i }));

    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener('fd-consent-change', handler);
  });
});
