import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Header from '../../src/components/nav/Header';

describe('Header', () => {
  it('hides the nav menu by default on mobile', () => {
    render(<Header />);
    const menu = screen.getByRole('list');
    expect(menu.closest('#navbar-default')).toHaveClass('hidden');
  });

  it('shows the nav menu when the hamburger button is clicked', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(button);
    const menu = screen.getByRole('list');
    expect(menu.closest('#navbar-default')).not.toHaveClass('hidden');
  });

  it('hides the nav menu again when the button is clicked a second time', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(button);
    fireEvent.click(button);
    const menu = screen.getByRole('list');
    expect(menu.closest('#navbar-default')).toHaveClass('hidden');
  });

  it('toggles aria-expanded on the button', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
