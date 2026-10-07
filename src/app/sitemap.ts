import type { MetadataRoute } from 'next';

import { VideoPosts } from './utils/videography';

const SITE_URL = 'https://www.flyingdolly.co.nz';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
    lastModified?: Date;
  }> = [
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
    {
      path: '/photography/the-crabs-beach-tennis-spring-2026',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    { path: '/videography', priority: 0.6, changeFrequency: 'weekly' as const },
    ...VideoPosts.map(post => ({
      path: `/videography/${post.slug}`,
      priority: 0.5,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(post.publishedAt),
    })),
    {
      path: '/privacy-policy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ];

  return routes.map(route => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: route.lastModified ?? lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
