// Shared by the header flyout, the album nav on every photography page, and
// the photography & video service page.
export interface PhotographyAlbum {
  name: string;
  href: string;
  description: string;
}

export const PhotographyAlbums: PhotographyAlbum[] = [
  {
    name: 'FAVORITES',
    href: '/photography',
    description: 'Photos that we loved',
  },
  {
    name: 'PORTRAITS',
    href: '/photography/portraits',
    description: 'Professional portrait sessions',
  },
  {
    name: 'GO FREEK 2026 TAURANGA',
    href: '/photography/go-freek-2026-tauranga',
    description: 'Event highlights from Go Freek 2026',
  },
  {
    name: 'THE CRABS BEACH TENNIS CLUB',
    href: '/photography/the-crabs-beach-tennis-spring-2026',
    description: 'Spring Tournament 2026',
  },
];
