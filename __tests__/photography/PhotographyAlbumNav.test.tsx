import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';

import { PhotographyAlbums } from '../../src/app/utils/navigation-links';
import PhotographyAlbumNav from '../../src/components/PhotographyAlbumNav';

const mockPathname = jest.fn();
const trackSelectContent = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

jest.mock('../../src/app/utils/analytics', () => ({
  trackSelectContent: (...args: unknown[]) => trackSelectContent(...args),
}));

describe('PhotographyAlbumNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname.mockReturnValue('/photography');
  });

  it('links to every photography album from the shared nav data', () => {
    render(<PhotographyAlbumNav />);

    const nav = screen.getByRole('navigation', { name: /photography albums/i });
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      PhotographyAlbums.map((album) => album.href)
    );
    expect(within(nav).getByRole('link', { name: /portraits/i })).toHaveAttribute(
      'href',
      '/photography/portraits'
    );
  });

  it('marks only the current album with aria-current', () => {
    mockPathname.mockReturnValue('/photography/portraits');

    render(<PhotographyAlbumNav />);

    expect(screen.getByRole('link', { name: /portraits/i })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: /favorites/i })).not.toHaveAttribute('aria-current');
  });

  it('tracks album clicks', () => {
    render(<PhotographyAlbumNav />);

    fireEvent.click(screen.getByRole('link', { name: /go freek/i }));

    expect(trackSelectContent).toHaveBeenCalledWith({
      source: 'photography_albums',
      destination: '/photography/go-freek-2026-tauranga',
      label: 'GO FREEK 2026 TAURANGA',
    });
  });
});
