import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import Header from '../../src/components/nav/Header';

const trackSelectContent = jest.fn();

jest.mock('../../src/app/utils/analytics', () => ({
  trackSelectContent: (...args: unknown[]) => trackSelectContent(...args),
}));

function getMenuList(): HTMLElement {
  const menu = document.querySelector('#navbar-default > ul');
  if (!(menu instanceof HTMLElement)) {
    throw new Error('Expected top-level menu list to be rendered');
  }
  return menu;
}

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hides the nav menu by default on mobile', () => {
    render(<Header />);
    const menu = getMenuList();
    expect(menu.closest('#navbar-default')).toHaveClass('hidden');
  });

  it('shows the nav menu when the hamburger button is clicked', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(button);
    const menu = getMenuList();
    expect(menu.closest('#navbar-default')).not.toHaveClass('hidden');
  });

  it('shows the nav menu as a full-screen centered overlay on mobile', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(button);

    const menu = getMenuList();
    const menuContainer = menu.closest('#navbar-default');
    expect(menuContainer).toHaveClass('fixed', 'inset-0', 'items-center', 'justify-center');
    expect(menu).toHaveClass('items-start', 'text-left');
    expect(screen.getByRole('link', { name: 'Home' }).closest('li')).toHaveClass('text-3xl');
  });

  it('shows photography sub-links expanded and indented in the mobile menu', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(button);

    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Portraits' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go Freek 2026 Tauranga' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Portraits' }).closest('ul')).toHaveClass('pl-6');
  });

  it('hides the nav menu again when the button is clicked a second time', () => {
    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(button);
    fireEvent.click(button);
    const menu = getMenuList();
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

      await waitFor(() => expect(screen.queryByText('Portraits')).not.toBeInTheDocument());
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

  it('forces the mobile menu closed when resizing to desktop', () => {
    const originalInnerWidth = window.innerWidth;

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 375,
    });

    render(<Header />);
    const button = screen.getByRole('button', { name: /open main menu/i });

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1024,
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(getMenuList().closest('#navbar-default')).toHaveClass('hidden');

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: originalInnerWidth,
    });
  });
});
