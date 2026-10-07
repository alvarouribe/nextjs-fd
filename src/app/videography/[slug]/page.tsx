import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ContactUsButton from '@/components/ContactUsButton';
import YouTubePlayer from '@/components/YouTubePlayer';

import { AppConstants } from '@/app/utils/app-constants';
import {
  formatIsoDuration,
  getRelatedVideoPosts,
  getVideoPost,
  VideoPosts,
  videoThumbnailUrl,
} from '@/app/utils/videography';

type Props = { params: Promise<{ slug: string }> };

const SITE_URL = AppConstants.siteUrl;

export const dynamicParams = false;

export async function generateStaticParams() {
  return VideoPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getVideoPost((await params).slug);
  if (!post) return {};

  const title = `${post.title} | FlyingDolly`;
  const url = `/videography/${post.slug}`;
  const image = videoThumbnailUrl(post);

  // Child metadata replaces (not merges) the layout's openGraph/twitter, so
  // every field shares need is set here.
  return {
    title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'video.other',
      locale: 'en_NZ',
      siteName: 'FlyingDolly',
      url,
      title,
      description: post.excerpt,
      images: [image],
      videos: [{ url: `https://www.youtube.com/embed/${post.youtubeId}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function VideoPostPage({ params }: Props) {
  const post = getVideoPost((await params).slug);
  if (!post) notFound();

  const pageUrl = `${SITE_URL}/videography/${post.slug}`;
  const related = getRelatedVideoPosts(post.slug, 3);

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: post.title,
    description: post.excerpt,
    thumbnailUrl: videoThumbnailUrl(post),
    uploadDate: post.publishedAt,
    duration: formatIsoDuration(post.durationSeconds),
    embedUrl: `https://www.youtube.com/embed/${post.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${post.youtubeId}`,
    url: pageUrl,
    publisher: { '@id': `${SITE_URL}/#business` },
    ...(post.location && {
      contentLocation: { '@type': 'Place', name: post.location },
    }),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Videography',
        item: `${SITE_URL}/videography`,
      },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  };

  const publishedLabel = new Date(post.publishedAt).toLocaleDateString(
    'en-NZ',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Pacific/Auckland',
    }
  );

  return (
    <main className="min-h-screen bg-gray-950 px-6 pb-20 pt-32 text-white lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="mx-auto max-w-4xl">
        <Link
          href="/videography"
          className="text-sm font-semibold text-green-400 hover:text-green-300"
        >
          <span aria-hidden="true">←</span> All videography
        </Link>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-gray-400">
          {[post.client, post.location, publishedLabel]
            .filter(Boolean)
            .join(' · ')}
        </p>

        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
          <YouTubePlayer youtubeId={post.youtubeId} title={post.title} />
        </div>

        <div className="mt-10 space-y-6 text-lg/8 text-gray-300">
          {post.body.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-gray-800 bg-gray-900/70 p-8">
          <h2 className="text-2xl font-semibold">Want a video like this?</h2>
          <p className="mt-2 text-gray-300">
            Tell us about your event, artist or brand and we&apos;ll put a plan
            together.
          </p>
          <div className="mt-6">
            <ContactUsButton location="videography_post" />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="mx-auto mt-24 max-w-4xl"
        >
          <h2
            id="related-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            More videography
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {related.map(item => (
              <Link
                key={item.slug}
                href={`/videography/${item.slug}`}
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-900">
                  <Image
                    src={videoThumbnailUrl(item)}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 290px, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="mt-3 block font-semibold group-hover:text-green-400">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
