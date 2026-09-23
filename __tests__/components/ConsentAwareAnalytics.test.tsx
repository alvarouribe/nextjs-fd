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

describe('ConsentAwareAnalytics', () => {
  beforeEach(() => {
    clearCookies();
    GoogleAnalyticsMock.mockClear();
  });

  it('does not load GA and shows the banner when no consent choice has been made', () => {
    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    expect(screen.queryByTestId('ga')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: /cookie/i })).toBeInTheDocument();
  });

  it('loads GA immediately on mount when a granted cookie already exists', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=granted`;

    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    expect(screen.getByTestId('ga')).toHaveAttribute('data-ga-id', 'G-TEST123');
    expect(screen.queryByRole('region', { name: /cookie/i })).not.toBeInTheDocument();
  });

  it('does not load GA when a denied cookie already exists, and hides the banner', () => {
    document.cookie = `${CONSENT_COOKIE_NAME}=denied`;

    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    expect(screen.queryByTestId('ga')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /cookie/i })).not.toBeInTheDocument();
  });

  it('loads GA immediately after the visitor clicks Accept', () => {
    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    expect(screen.queryByTestId('ga')).not.toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /accept/i }));
    });

    expect(screen.getByTestId('ga')).toHaveAttribute('data-ga-id', 'G-TEST123');
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=granted`);
  });

  it('does not load GA after the visitor clicks Decline, and persists the choice', () => {
    render(<ConsentAwareAnalytics gaId="G-TEST123" />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /decline/i }));
    });

    expect(screen.queryByTestId('ga')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /cookie/i })).not.toBeInTheDocument();
    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=denied`);
  });
});
