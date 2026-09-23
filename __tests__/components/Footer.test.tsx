import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import FooterSection from '../../src/components/FooterSection';

describe('FooterSection crawlable links', () => {
  it('renders server-rendered text links for key pages', () => {
    render(<FooterSection />);

    const expectedLinks: Array<[string, string]> = [
      ['Home', '/'],
      ['Photography', '/photography'],
      ['Portraits', '/photography/portraits'],
      ['Go Freek 2026 Tauranga', '/photography/go-freek-2026-tauranga'],
      ['About', '/about'],
      ['Privacy policy', '/privacy-policy'],
    ];

    for (const [name, href] of expectedLinks) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
    }
  });

  it('shows the Mount Maunganui location line', () => {
    render(<FooterSection />);

    expect(screen.getByText(/Mount Maunganui, Bay of Plenty, NZ/i)).toBeInTheDocument();
  });

  it('still renders social icon links that open safely in a new tab', () => {
    render(<FooterSection />);

    const facebook = screen.getByRole('link', { name: 'Facebook' });
    expect(facebook).toHaveAttribute('target', '_blank');
    expect(facebook).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
