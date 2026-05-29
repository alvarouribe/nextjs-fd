import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import ContactUsButton from '../../src/components/ContactUsButton';
import FooterSection from '../../src/components/FooterSection';

const trackGenerateLead = jest.fn();

jest.mock('../../src/app/utils/analytics', () => ({
  trackGenerateLead: (...args: unknown[]) => trackGenerateLead(...args),
}));

describe('FooterSection', () => {
  it('renders social links that open safely in a new tab', () => {
    render(<FooterSection />);

    const facebook = screen.getByRole('link', { name: 'Facebook' });
    const instagram = screen.getByRole('link', { name: 'Instagram' });
    const youtube = screen.getByRole('link', { name: 'YouTube' });

    for (const link of [facebook, instagram, youtube]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('shows the current year in the copyright text', () => {
    const year = new Date().getFullYear();
    render(<FooterSection />);

    expect(
      screen.getByText(new RegExp(`©\\s*${year}\\s*Flyingdolly.co.nz`, 'i'))
    ).toBeInTheDocument();
  });
});

describe('ContactUsButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('scrolls to the contact section when clicked', () => {
    const scrollIntoView = jest.fn();
    const section = document.createElement('section');
    section.id = 'contact-form-section';
    section.scrollIntoView = scrollIntoView;
    document.body.appendChild(section);

    render(<ContactUsButton />);
    fireEvent.click(screen.getByRole('button', { name: /book a free call/i }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(trackGenerateLead).toHaveBeenCalledWith({
      source: 'cta_button',
      location: 'unknown',
    });
    section.remove();
  });

  it('does nothing when the contact section is missing', () => {
    render(<ContactUsButton />);
    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: /book a free call/i }))
    ).not.toThrow();
  });
});
