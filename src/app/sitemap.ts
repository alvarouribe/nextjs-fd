import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.flyingdolly.co.nz';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: '/', priority: 1, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/photography', priority: 0.6, changeFrequency: 'weekly' as const },
    {
      path: '/photography/portraits',
      priority: 0.5,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/photography/go-freek-2026-tauranga',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
