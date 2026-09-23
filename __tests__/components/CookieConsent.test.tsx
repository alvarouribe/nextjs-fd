import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import CookieConsent from '../../src/components/CookieConsent';

describe('CookieConsent', () => {
  it('renders nothing when not visible', () => {
    const { container } = render(
      <CookieConsent visible={false} onAccept={jest.fn()} onDecline={jest.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders an accessible region with Accept and Decline actions and a privacy link when visible', () => {
    render(<CookieConsent visible onAccept={jest.fn()} onDecline={jest.fn()} />);

    const region = screen.getByRole('region', { name: /cookie/i });
    expect(region).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
      'href',
      '/privacy-policy'
    );

    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decline/i })).toBeInTheDocument();
  });

  it('calls onAccept when the Accept button is clicked', () => {
    const onAccept = jest.fn();
    render(<CookieConsent visible onAccept={onAccept} onDecline={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /accept/i }));

    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it('calls onDecline when the Decline button is clicked', () => {
    const onDecline = jest.fn();
    render(<CookieConsent visible onAccept={jest.fn()} onDecline={onDecline} />);

    fireEvent.click(screen.getByRole('button', { name: /decline/i }));

    expect(onDecline).toHaveBeenCalledTimes(1);
  });

  it('exposes keyboard-focusable buttons', () => {
    render(<CookieConsent visible onAccept={jest.fn()} onDecline={jest.fn()} />);

    const acceptButton = screen.getByRole('button', { name: /accept/i });
    const declineButton = screen.getByRole('button', { name: /decline/i });

    expect(acceptButton).not.toHaveAttribute('tabindex', '-1');
    expect(declineButton).not.toHaveAttribute('tabindex', '-1');
  });
});
