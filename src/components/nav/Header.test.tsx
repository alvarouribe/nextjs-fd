import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the header logo image', () => {
    render(<Header />);

    const logoImage = screen.getByTestId('logo');

    expect(logoImage).toBeInTheDocument();
  });
});
