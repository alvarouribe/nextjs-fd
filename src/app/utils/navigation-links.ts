import { PhotographyAlbums } from './photography-albums';
import { servicePageList } from './service-pages';
import { VideoPosts } from './videography';

export { PhotographyAlbums };

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
  { name: 'WORK', href: '/#selected-work-section' },
  {
    // No /services page: on mobile (where flyouts collapse to their parent
    // link) this goes to the homepage services section, which links to
    // every service page.
    name: 'SERVICES',
    href: '/#services-section',
    subLinks: servicePageList.map(page => ({
      name: page.navName,
      href: page.path,
      description: page.navDescription,
    })),
  },
  {
    name: 'PHOTOGRAPHY',
    href: '/photography',
    subLinks: PhotographyAlbums,
  },
  {
    name: 'VIDEOGRAPHY',
    href: '/videography',
    subLinks: [
      {
        name: 'FEATURED WORK',
        href: '/videography',
        description: 'Our best video work',
      },
      ...VideoPosts.map(post => ({
        name: post.title.toUpperCase(),
        href: `/videography/${post.slug}`,
      })),
    ],
  },
  { name: 'ABOUT', href: '/about' },
];
