import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Testimonials from '../../src/components/Testimonials';

const mockTestimonials = jest.fn();

jest.mock('../../src/app/utils/site-content', () => ({
  __esModule: true,
  get testimonials() {
    return mockTestimonials();
  },
}));

describe('Testimonials', () => {
  beforeEach(() => {
    mockTestimonials.mockReset();
  });

  it('renders nothing when there are no testimonials', () => {
    mockTestimonials.mockReturnValue([]);

    const { container } = render(<Testimonials />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the heading and a card per testimonial', () => {
    mockTestimonials.mockReturnValue([
      {
        quote: 'FlyingDolly transformed our booking process.',
        name: 'Jane Smith',
        business: 'Mount Cafe',
      },
      {
        quote: 'Fantastic photography and a website that converts.',
        name: 'John Doe',
        business: 'Doe Realty',
        imageSrc: '/images/john-doe.jpg',
      },
    ]);

    render(<Testimonials />);

    expect(screen.getByRole('heading', { name: /what our clients say/i })).toBeInTheDocument();

    expect(screen.getAllByRole('figure')).toHaveLength(2);

    expect(screen.getByText(/FlyingDolly transformed our booking process\./)).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Mount Cafe')).toBeInTheDocument();

    expect(
      screen.getByText(/Fantastic photography and a website that converts\./)
    ).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Doe Realty')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  it('does not render an avatar image when imageSrc is missing', () => {
    mockTestimonials.mockReturnValue([
      {
        quote: 'Great to work with.',
        name: 'No Avatar Person',
        business: 'No Avatar Co',
      },
    ]);

    render(<Testimonials />);

    expect(screen.queryByAltText('No Avatar Person')).not.toBeInTheDocument();
  });
});
