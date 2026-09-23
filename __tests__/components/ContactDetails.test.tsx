import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ContactDetails from '../../src/components/ContactDetails';

const mockContactDetails = jest.fn();

jest.mock('../../src/app/utils/site-content', () => ({
  __esModule: true,
  get contactDetails() {
    return mockContactDetails();
  },
}));

describe('ContactDetails', () => {
  beforeEach(() => {
    mockContactDetails.mockReset();
  });

  it('always shows the suburb, even with no email or phone', () => {
    mockContactDetails.mockReturnValue({
      suburb: 'Mount Maunganui, Bay of Plenty',
    });

    render(<ContactDetails />);

    expect(screen.getByText('Mount Maunganui, Bay of Plenty')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders a mailto link when email is set', () => {
    mockContactDetails.mockReturnValue({
      suburb: 'Mount Maunganui, Bay of Plenty',
      email: 'hello@flyingdolly.co.nz',
    });

    render(<ContactDetails />);

    const link = screen.getByRole('link', {
      name: 'hello@flyingdolly.co.nz',
    });
    expect(link).toHaveAttribute('href', 'mailto:hello@flyingdolly.co.nz');
  });

  it('renders a tel link when phone is set', () => {
    mockContactDetails.mockReturnValue({
      suburb: 'Mount Maunganui, Bay of Plenty',
      phone: '+64 7 123 4567',
    });

    render(<ContactDetails />);

    const link = screen.getByRole('link', { name: '+64 7 123 4567' });
    expect(link).toHaveAttribute('href', 'tel:+64 7 123 4567');
  });

  it('renders both mailto and tel links when both are set', () => {
    mockContactDetails.mockReturnValue({
      suburb: 'Mount Maunganui, Bay of Plenty',
      email: 'hello@flyingdolly.co.nz',
      phone: '+64 7 123 4567',
    });

    render(<ContactDetails />);

    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
