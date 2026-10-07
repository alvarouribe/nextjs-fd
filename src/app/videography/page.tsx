import type { Metadata } from 'next';
import Link from 'next/link';

import ServicesCrossSell from '@/components/ServicesCrossSell';
import YouTubeEmbed from '@/components/YouTubeEmbed';

import { pageMetadata } from '@/app/utils/page-metadata';
import {
  getFeaturedVideoPosts,
  videoThumbnailUrl,
} from '@/app/utils/videography';

const title = 'Mount Maunganui & Tauranga Videography | FlyingDolly';
const description =
  "Watch FlyingDolly's videography work — event, artist and brand videos from the Bay of Plenty team that also builds your website and automation.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/videography',
  image: videoThumbnailUrl(getFeaturedVideoPosts()[0]),
});

export default function VideographyPage() {
  const posts = getFeaturedVideoPosts();

  return (
    <main className="min-h-screen bg-gray-950 px-6 pb-20 pt-32 text-white lg:px-8">
      <section className="mx-auto max-w-4xl">
        <div className="mb-20 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Videography
          </h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg">
            A selection of our favourite video work — events, artists and brands
            across Mount Maunganui, Tauranga and New Zealand. Open any project
            to read the story behind it.
          </p>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {posts.map((post, index) => (
            <article key={post.slug} className="flex flex-col">
              <YouTubeEmbed
                youtubeId={post.youtubeId}
                title={post.title}
                thumbnailUrl={videoThumbnailUrl(post)}
                priority={index === 0}
              />
              <h2 className="mt-8 text-3xl font-semibold tracking-tight">
                <Link
                  href={`/videography/${post.slug}`}
                  className="hover:text-green-400"
                >
                  {post.title}
                </Link>
              </h2>
              {post.location && (
                <p className="mt-1 text-sm text-gray-400">{post.location}</p>
              )}
              <p className="mt-4 max-w-2xl text-lg/8 text-gray-300">
                {post.excerpt}
              </p>
              <Link
                href={`/videography/${post.slug}`}
                aria-label={`Read more about ${post.title}`}
                className="mt-6 inline-flex w-fit items-center gap-1 font-semibold text-green-400 hover:text-green-300"
              >
                Read more <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <ServicesCrossSell heading="Video is one part of the system" />
    </main>
  );
}
