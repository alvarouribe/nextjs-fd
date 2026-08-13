export interface NavSubLink {
  name: string;
  href: string;
  description?: string;
}

export interface NavLink {
  name: string;
  href: string;
  subLinks?: NavSubLink[];
}

export const NavigationLinks: NavLink[] = [
  {
    name: 'PHOTOGRAPHY',
    href: '/photography',
    subLinks: [
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
    ],
  },
  { name: 'ABOUT', href: '/about' },
];
