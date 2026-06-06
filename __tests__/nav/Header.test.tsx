import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import Header from '../../src/components/nav/Header';

const trackSelectContent = jest.fn();

jest.mock('../../src/app/utils/analytics', () => ({
  trackSelectContent: (...args: unknown[]) => trackSelectContent(...args),
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('shows the nav menu as a full-screen centered overlay on mobile', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(button);

    const menuContainer = screen.getByRole('list').closest('#navbar-default');
    expect(menuContainer).toHaveClass('fixed', 'inset-0', 'items-center', 'justify-center');
    expect(screen.getByRole('list')).toHaveClass('items-center', 'text-center');
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

  it('opens the photography flyout on hover and closes after mouse leave delay', async () => {
    jest.useFakeTimers();
    try {
      render(<Header />);

      const photographyButton = screen.getByRole('button', {
        name: /photography/i,
      });

      fireEvent.mouseEnter(photographyButton.parentElement!);
      expect(await screen.findByText('Portraits')).toBeInTheDocument();
      expect(screen.getByText('Go Freek 2026 Tauranga')).toBeInTheDocument();

      fireEvent.mouseLeave(photographyButton.parentElement!);
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() =>
        expect(screen.queryByText('Portraits')).not.toBeInTheDocument()
      );
    } finally {
      jest.useRealTimers();
    }
  });

  it('tracks analytics for a photography flyout sub-link click', async () => {
    render(<Header />);

    const photographyButton = screen.getByRole('button', {
      name: /photography/i,
    });

    fireEvent.mouseEnter(photographyButton.parentElement!);
    fireEvent.click(await screen.findByRole('link', { name: 'Portraits' }));

    expect(trackSelectContent).toHaveBeenCalledWith({
      source: 'header_nav',
      destination: '/photography/portraits',
      label: 'Portraits',
    });
  });

  it('animates the hamburger to an X: hides the middle line when menu is open', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });

    expect(screen.getByTestId('burger-line-middle')).not.toHaveClass('opacity-0');

    fireEvent.click(button);
    expect(screen.getByTestId('burger-line-middle')).toHaveClass('opacity-0');

    fireEvent.click(button);
    expect(screen.getByTestId('burger-line-middle')).not.toHaveClass('opacity-0');
  });

  it('closes the mobile menu after a menu link is clicked', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(trackSelectContent).toHaveBeenCalledWith({
      source: 'header_nav',
      destination: '/',
      label: 'Home',
    });
  });
});
