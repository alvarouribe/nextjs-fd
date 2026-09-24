import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PrivacyPolicyPage, { metadata } from '../../src/app/privacy-policy/page';

describe('Privacy policy page metadata', () => {
  it('sets a canonical pointing at /privacy-policy', () => {
    expect(metadata.alternates?.canonical).toBe('/privacy-policy');
  });

  it('has a title mentioning FlyingDolly and privacy', () => {
    const title = metadata.title as string;
    expect(title.toLowerCase()).toMatch(/privacy/);
    expect(title).toMatch(/FlyingDolly/);
  });

  it('has a description', () => {
    expect((metadata.description as string).length).toBeGreaterThan(20);
  });
});

describe('Privacy policy page content', () => {
  let textContent: string;

  beforeEach(() => {
    const { container } = render(<PrivacyPolicyPage />);
    textContent = container.textContent ?? '';
  });

  it('identifies who we are, mentioning FlyingDolly and Mount Maunganui', () => {
    expect(screen.getAllByText(/FlyingDolly/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mount Maunganui/i).length).toBeGreaterThan(0);
  });

  it('explains what is collected via the contact form', () => {
    expect(textContent).toMatch(/name/i);
    expect(textContent).toMatch(/email/i);
    expect(textContent).toMatch(/message/i);
  });

  it('explains GA4 only runs with consent', () => {
    expect(textContent).toMatch(/GA4|Google Analytics/);
    expect(screen.getAllByText(/consent/i).length).toBeGreaterThan(0);
  });

  it('mentions the third parties data is disclosed to', () => {
    expect(screen.getByText(/Zoho/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Google Analytics/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Vercel/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloudinary/i)).toBeInTheDocument();
  });

  it('mentions rights to access and correction, and the Privacy Commissioner', () => {
    expect(screen.getAllByText(/access/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/correction/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Privacy Commissioner/i)).toBeInTheDocument();
  });

  it('renders the change cookie preferences button', () => {
    expect(screen.getByRole('button', { name: /change cookie preferences/i })).toBeInTheDocument();
  });
});
