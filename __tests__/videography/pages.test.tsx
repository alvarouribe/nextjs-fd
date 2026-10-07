import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';

import { VideoPosts, getFeaturedVideoPosts } from '../../src/app/utils/videography';
import VideoPostPage, {
  generateMetadata,
  generateStaticParams,
} from '../../src/app/videography/[slug]/page';
import VideographyPage, { metadata } from '../../src/app/videography/page';

const notFound = jest.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
});

jest.mock('next/navigation', () => ({
  notFound: () => notFound(),
  useRouter: () => ({ push: jest.fn() }),
}));

function readJsonLd(container: HTMLElement) {
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]')).map(
    (script) => JSON.parse(script.textContent ?? '{}')
  );
}

describe('/videography', () => {
  it('has its own canonical, Open Graph and Twitter metadata (not the homepage defaults)', () => {
    expect(metadata.alternates?.canonical).toBe('/videography');
    expect(metadata.openGraph).toMatchObject({
      url: '/videography',
      title: metadata.title,
      siteName: 'FlyingDolly',
      locale: 'en_NZ',
    });
    expect(metadata.twitter).toMatchObject({ title: metadata.title });
  });

  it('lists every featured video with its title, excerpt and a read more link', () => {
    render(<VideographyPage />);

    const featured = getFeaturedVideoPosts();
    expect(screen.getAllByRole('article')).toHaveLength(featured.length);
    featured.forEach((post) => {
      expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument();
      expect(screen.getByText(post.excerpt)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: `Read more about ${post.title}` })).toHaveAttribute(
        'href',
        `/videography/${post.slug}`
      );
    });
  });

  it('uses a videography-specific cross-sell heading', () => {
    render(<VideographyPage />);
    expect(screen.queryByText('Photos are one part of the system')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Video is one part of the system' })
    ).toBeInTheDocument();
  });
});

describe('/videography/[slug]', () => {
  const post = VideoPosts[0];
  const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

  it('prerenders one page per video post', async () => {
    expect(await generateStaticParams()).toEqual(VideoPosts.map((p) => ({ slug: p.slug })));
  });

  it('builds complete SEO metadata from the post', async () => {
    const meta = await generateMetadata(params(post.slug));
    expect(meta.title).toBe(`${post.title} | FlyingDolly`);
    expect(meta.description).toBe(post.excerpt);
    expect(meta.alternates?.canonical).toBe(`/videography/${post.slug}`);
    expect(meta.openGraph).toMatchObject({
      url: `/videography/${post.slug}`,
      siteName: 'FlyingDolly',
      locale: 'en_NZ',
      type: 'video.other',
    });
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image', title: meta.title });
  });

  it('embeds the YouTube player directly so search engines can index the video', async () => {
    render(await VideoPostPage(params(post.slug)));

    expect(screen.getByRole('heading', { level: 1, name: post.title })).toBeInTheDocument();
    post.body.forEach((section) => {
      if (section.heading) {
        expect(
          screen.getByRole('heading', { level: 2, name: section.heading })
        ).toBeInTheDocument();
      }
      section.paragraphs.forEach((paragraph) =>
        expect(screen.getByText(paragraph)).toBeInTheDocument()
      );
    });
    expect(screen.getByTitle(post.title)).toHaveAttribute(
      'src',
      expect.stringContaining(`youtube-nocookie.com/embed/${post.youtubeId}`)
    );
  });

  it('shows the publish date in New Zealand time', async () => {
    // 2026-10-06T10:10:33Z is 6 October in NZ (NZDT, UTC+13)
    render(await VideoPostPage(params('guitardeon-latin-american-spring-festival-2026')));
    expect(screen.getByText(/6 October 2026/)).toBeInTheDocument();
  });

  it('outputs VideoObject and BreadcrumbList structured data', async () => {
    const { container } = render(await VideoPostPage(params(post.slug)));
    const [video, breadcrumbs] = readJsonLd(container);

    expect(video).toMatchObject({
      '@type': 'VideoObject',
      name: post.title,
      description: post.excerpt,
      uploadDate: post.publishedAt,
      duration: 'PT2M37S',
      embedUrl: `https://www.youtube.com/embed/${post.youtubeId}`,
      publisher: { '@id': 'https://www.flyingdolly.co.nz/#business' },
    });
    expect(video.thumbnailUrl).toContain(post.youtubeId);

    expect(breadcrumbs['@type']).toBe('BreadcrumbList');
    expect(breadcrumbs.itemListElement.map((item: { name: string }) => item.name)).toEqual([
      'Home',
      'Videography',
      post.title,
    ]);
  });

  it('links to other video posts for internal linking', async () => {
    render(await VideoPostPage(params(post.slug)));
    const related = screen.getByRole('region', { name: 'More videography' });
    const links = within(related).getAllByRole('link');

    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) =>
      expect(link.getAttribute('href')).not.toBe(`/videography/${post.slug}`)
    );
  });

  it('404s for an unknown slug', async () => {
    await expect(VideoPostPage(params('nope'))).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });
});
