import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PricingSection from '../../src/components/PricingSection';

const mockPricingTiers = jest.fn();

jest.mock('../../src/app/utils/site-content', () => ({
  __esModule: true,
  get pricingTiers() {
    return mockPricingTiers();
  },
}));

describe('PricingSection', () => {
  beforeEach(() => {
    mockPricingTiers.mockReset();
  });

  it('renders nothing when there are no pricing tiers', () => {
    mockPricingTiers.mockReturnValue([]);

    const { container } = render(<PricingSection />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the section id, heading, a card per tier and the scope note', () => {
    mockPricingTiers.mockReturnValue([
      {
        service: 'Websites',
        startingFrom: 'NZ$1,500',
        description: 'Custom-designed, SEO-ready websites.',
      },
      {
        service: 'Automation',
        startingFrom: 'NZ$800',
        description: 'Booking and lead follow-up workflows.',
        href: '/#contact-form-section',
      },
    ]);

    const { container } = render(<PricingSection />);

    expect(container.querySelector('#pricing-section')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /transparent starting prices/i })
    ).toBeInTheDocument();

    expect(screen.getByText('Websites')).toBeInTheDocument();
    expect(screen.getByText('From NZ$1,500')).toBeInTheDocument();
    expect(screen.getByText('Custom-designed, SEO-ready websites.')).toBeInTheDocument();

    expect(screen.getByText('Automation')).toBeInTheDocument();
    expect(screen.getByText('From NZ$800')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toHaveAttribute('href', '/#contact-form-section');

    expect(screen.getByText(/final quotes depend on scope/i)).toBeInTheDocument();
  });

  it('does not render a link when a tier has no href', () => {
    mockPricingTiers.mockReturnValue([
      {
        service: 'Photography & Video',
        startingFrom: 'NZ$400',
        description: 'Product, portrait and event content.',
      },
    ]);

    render(<PricingSection />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
