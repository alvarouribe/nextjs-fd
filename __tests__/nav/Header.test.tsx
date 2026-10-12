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
    expect(screen.getByRole('link', { name: 'ABOUT' }).closest('li')).toHaveClass('text-3xl');
  });

  it('collapses photography to a single favorites link in the mobile menu', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));

    const photographyLink = screen.getByRole('link', { name: 'PHOTOGRAPHY' });
    expect(photographyLink).toHaveAttribute('href', '/photography');
    expect(photographyLink.closest('li')).toHaveClass('text-3xl');
    expect(screen.queryByRole('link', { name: 'PORTRAITS' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'FAVORITES' })).not.toBeInTheDocument();

    fireEvent.click(photographyLink);
    expect(trackSelectContent).toHaveBeenCalledWith({
      source: 'header_nav',
      destination: '/photography',
      label: 'PHOTOGRAPHY',
    });
    expect(screen.getByRole('button', { name: /open main menu/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
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
      expect(await screen.findByText('PORTRAITS')).toBeInTheDocument();
      expect(screen.getByText('GO FREEK 2026 TAURANGA')).toBeInTheDocument();

      fireEvent.mouseLeave(photographyButton.parentElement!);
      act(() => {
        jest.advanceTimersByTime(500);
      });

      await waitFor(() => expect(screen.queryByText('PORTRAITS')).not.toBeInTheDocument());
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
    fireEvent.click(await screen.findByRole('link', { name: 'PORTRAITS' }));

    expect(trackSelectContent).toHaveBeenCalledWith({
      source: 'header_nav',
      destination: '/photography/portraits',
      label: 'PORTRAITS',
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

    fireEvent.click(screen.getByRole('link', { name: 'ABOUT' }));
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(trackSelectContent).toHaveBeenCalledWith({
      source: 'header_nav',
      destination: '/about',
      label: 'ABOUT',
    });
  });

  it('links WORK first in the nav to the home page selected work section', () => {
    render(<Header />);

    const workLink = screen.getByRole('link', { name: 'WORK' });
    expect(workLink).toHaveAttribute('href', '/#selected-work-section');
    expect(getMenuList().querySelector('li')).toContainElement(workLink);

    fireEvent.click(workLink);
    expect(trackSelectContent).toHaveBeenCalledWith({
      source: 'header_nav',
      destination: '/#selected-work-section',
      label: 'WORK',
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

  it('collapses videography to a single featured work link in the mobile menu', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));

    expect(screen.getByRole('link', { name: 'VIDEOGRAPHY' })).toHaveAttribute(
      'href',
      '/videography'
    );
    expect(screen.queryByRole('link', { name: 'FEATURED WORK' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'GUITARDEON LATIN AMERICAN SPRING FESTIVAL 2026' })
    ).not.toBeInTheDocument();
  });

  it('keeps one top-level item per nav entry in the mobile menu', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));

    const items = getMenuList().querySelectorAll(':scope > li');
    expect(Array.from(items).map((item) => item.textContent)).toEqual([
      'WORK',
      'SERVICES',
      'PHOTOGRAPHY',
      'VIDEOGRAPHY',
      'ABOUT',
    ]);
  });

  it('collapses services to a link to the homepage services section in the mobile menu', () => {
    render(<Header />);
    fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));

    expect(screen.getByRole('link', { name: 'SERVICES' })).toHaveAttribute(
      'href',
      '/#services-section'
    );
    expect(screen.queryByRole('link', { name: 'WEB DESIGN' })).not.toBeInTheDocument();
  });

  it('lists every service page in the desktop services flyout', async () => {
    render(<Header />);

    fireEvent.click(screen.getByRole('button', { name: /services/i }));

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'WEB DESIGN' })).toHaveAttribute(
        'href',
        '/web-design-tauranga'
      );
    });
    expect(screen.getByRole('link', { name: 'AUTOMATION' })).toHaveAttribute(
      'href',
      '/business-automation-bay-of-plenty'
    );
    expect(screen.getByRole('link', { name: 'PHOTOGRAPHY & VIDEO' })).toHaveAttribute(
      'href',
      '/commercial-photography-tauranga'
    );
  });
});
