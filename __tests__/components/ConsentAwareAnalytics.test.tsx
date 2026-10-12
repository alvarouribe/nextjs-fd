import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { CONSENT_COOKIE_NAME } from '../../src/app/utils/consent';
import ConsentAwareAnalytics from '../../src/components/ConsentAwareAnalytics';

const GoogleAnalyticsMock = jest.fn(({ gaId }: { gaId: string }) => (
  <div data-test="ga" data-ga-id={gaId} />
));

jest.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: (props: { gaId: string }) => GoogleAnalyticsMock(props),
}));

const clearCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!name) return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
};

type WindowWithGtag = Window & { gtag?: jest.Mock };

const consentUpdates = (gtag: jest.Mock) =>
  gtag.mock.calls.filter((call) => call[0] === 'consent' && call[1] === 'update');

describe('ConsentAwareAnalytics', () => {
  let gtag: jest.Mock;

  beforeEach(() => {
    clearCookies();
    GoogleAnalyticsMock.mockClear();
    gtag = jest.fn();
    (window as WindowWithGtag).gtag = gtag;
  });

  afterEach(() => {
    delete (window as WindowWithGtag).gtag;
  });

  // Consent Mode v2: GA always loads, but runs cookieless (consent defaults
  // set to denied by the inline script in the root layout) until the
  // visitor accepts.
  it('loads GA in cookieless mode and shows the banner when no consent choice has been made', () => {
    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    expect(screen.getByTestId('ga')).toHaveAttribute('data-ga-id', 'G-TEST123');
    expect(screen.getByRole('region', { name: /cookie/i })).toBeInTheDocument();
    expect(consentUpdates(gtag)).not.toContainEqual([
      'consent',
      'update',
      { analytics_storage: 'granted' },
    ]);
  });

  it('loads GA immediately on mount when a granted cookie already exists', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=granted`;

    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    expect(screen.getByTestId('ga')).toHaveAttribute('data-ga-id', 'G-TEST123');
    expect(screen.queryByRole('region', { name: /cookie/i })).not.toBeInTheDocument();
  });

  it('keeps GA cookieless when a denied cookie already exists, and hides the banner', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=denied`;

    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    expect(screen.getByTestId('ga')).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /cookie/i })).not.toBeInTheDocument();
    expect(consentUpdates(gtag)).not.toContainEqual([
      'consent',
      'update',
      { analytics_storage: 'granted' },
    ]);
  });

  it('grants analytics storage immediately after the visitor clicks Accept', () => {
    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    });

    expect(consentUpdates(gtag).at(-1)).toEqual([
      'consent',
      'update',
      { analytics_storage: 'granted' },
    ]);
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=granted`);
  });

  it('keeps analytics storage denied after the visitor clicks Decline, and persists the choice', () => {
    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /decline/i }));
    });

    expect(consentUpdates(gtag).at(-1)).toEqual([
      'consent',
      'update',
      { analytics_storage: 'denied' },
    ]);
    expect(screen.queryByRole('region', { name: /cookie/i })).not.toBeInTheDocument();
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=denied`);
  });
});
