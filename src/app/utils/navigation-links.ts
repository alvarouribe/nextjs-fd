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
  { name: 'Home', href: '/' },
  {
    name: 'Photography',
    href: '/photography',
    subLinks: [
      {
        name: 'Favorites',
        href: '/photography',
        description: 'Photos that we loved',
      },
      {
        name: 'Portraits',
        href: '/photography/portraits',
        description: 'Professional portrait sessions',
      },
      {
        name: 'Go Freek 2026 Tauranga',
        href: '/photography/go-freek-2026-tauranga',
        description: 'Event highlights from Go Freek 2026',
      },
    ],
  },
  // { name: 'About', href: '/about' },
];
