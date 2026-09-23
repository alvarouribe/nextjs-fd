import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Page from '../src/app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('Page', () => {
  it('renders the systems-positioning H1', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading.textContent.replace(/\s+/g, ' ')).toMatch(
      /we build the websites, automation, and content that grow bay of plenty businesses\./i
    );
  });

  it('renders a services section with three benefit-led cards', () => {
    render(<Page />);

    expect(document.getElementById('services-section')).toBeInTheDocument();

    expect(screen.getByText('Websites')).toBeInTheDocument();
    expect(screen.getByText('Automation')).toBeInTheDocument();
    expect(screen.getByText('Photography & Video')).toBeInTheDocument();
  });

  it('keeps the #features-section id working for the scroll cue button', () => {
    render(<Page />);

    expect(document.getElementById('features-section')).toBeInTheDocument();
  });

  it('links from the services section to the photography page', () => {
    render(<Page />);

    const photographyLink = screen.getByRole('link', {
      name: /photography & video work/i,
    });
    expect(photographyLink).toHaveAttribute('href', '/photography');
  });
});
