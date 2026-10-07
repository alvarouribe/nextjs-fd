import type { Metadata } from 'next';

import { metadata as about } from '../../src/app/about/page';
import { metadata as goFreek } from '../../src/app/photography/go-freek-2026-tauranga/page';
import { metadata as photography } from '../../src/app/photography/page';
import { metadata as portraits } from '../../src/app/photography/portraits/page';
import { metadata as crabs } from '../../src/app/photography/the-crabs-beach-tennis-spring-2026/page';
import { metadata as privacy } from '../../src/app/privacy-policy/page';
import { pageMetadata } from '../../src/app/utils/page-metadata';
import { generateMetadata as videoPost } from '../../src/app/videography/[slug]/page';
import { metadata as videography } from '../../src/app/videography/page';

jest.mock('../../src/app/utils/cloudinary', () => ({ requiredEnv: jest.fn() }));
jest.mock('../../src/app/utils/photography', () => ({ getCloudinaryPhotosByFolder: jest.fn() }));

describe('pageMetadata', () => {
  it('builds canonical, Open Graph and Twitter metadata that all point at the page', () => {
    const meta = pageMetadata({ title: 'T', description: 'D', path: '/x' });

    expect(meta).toMatchObject({
      title: 'T',
      description: 'D',
      alternates: { canonical: '/x' },
      openGraph: {
        type: 'website',
        locale: 'en_NZ',
        siteName: 'FlyingDolly',
        url: '/x',
        title: 'T',
        description: 'D',
      },
      twitter: { card: 'summary_large_image', title: 'T', description: 'D' },
    });
    expect(meta.openGraph?.images).toBeDefined();
    expect(meta.twitter?.images).toBeDefined();
  });

  it('lets a page override the share image and Open Graph type', () => {
    const meta = pageMetadata({
      title: 'T',
      description: 'D',
      path: '/x',
      image: 'https://example.com/a.jpg',
      openGraph: { type: 'video.other' },
    });

    expect(meta.openGraph).toMatchObject({
      type: 'video.other',
      url: '/x',
      images: ['https://example.com/a.jpg'],
    });
    expect(meta.twitter?.images).toEqual(['https://example.com/a.jpg']);
  });
});

// Next.js replaces (not merges) the layout's openGraph/twitter when a page sets
// metadata, so every public page must set its own or shares show the homepage.
describe('public pages share their own title and URL, not the homepage', () => {
  const pages: Array<[string, () => Promise<Metadata> | Metadata]> = [
    ['/about', () => about],
    ['/privacy-policy', () => privacy],
    ['/photography', () => photography],
    ['/photography/portraits', () => portraits],
    ['/photography/go-freek-2026-tauranga', () => goFreek],
    ['/photography/the-crabs-beach-tennis-spring-2026', () => crabs],
    ['/videography', () => videography],
    [
      '/videography/flyingdolly-showreel-2022',
      () => videoPost({ params: Promise.resolve({ slug: 'flyingdolly-showreel-2022' }) }),
    ],
  ];

  it.each(pages)('%s', async (path, load) => {
    const meta = await load();

    expect(meta.alternates?.canonical).toBe(path);
    expect(meta.openGraph).toMatchObject({
      url: path,
      title: meta.title,
      description: meta.description,
      siteName: 'FlyingDolly',
      locale: 'en_NZ',
    });
    expect(meta.twitter).toMatchObject({ title: meta.title, description: meta.description });
  });
});
