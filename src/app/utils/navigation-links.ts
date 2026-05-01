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
      { name: 'All Photography', href: '/photography' },
      {
        name: 'Portraits',
        href: '/photography/portraits',
        description: 'Professional portrait sessions',
      },
    ],
  },
  // { name: 'About', href: '/about' },
];
