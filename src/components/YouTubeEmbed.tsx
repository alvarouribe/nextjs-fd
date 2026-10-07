'use client';

import { useState } from 'react';

import { PlayIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import YouTubePlayer from '@/components/YouTubePlayer';

// Shows the thumbnail until clicked, so a page with several videos doesn't
// load several YouTube players up front. Single-video pages should render
// YouTubePlayer directly so search engines can index the embed.
export default function YouTubeEmbed({
  youtubeId,
  title,
  thumbnailUrl,
  priority = false,
}: {
  youtubeId: string;
  title: string;
  thumbnailUrl: string;
  priority?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
      {isPlaying ? (
        <YouTubePlayer youtubeId={youtubeId} title={title} autoplay />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group absolute inset-0 h-full w-full"
        >
          <span className="sr-only">Play {title}</span>
          <Image
            src={thumbnailUrl}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
            <span className="flex size-16 items-center justify-center rounded-full bg-green-500/90 shadow-lg transition-transform group-hover:scale-110">
              <PlayIcon
                aria-hidden="true"
                className="size-8 translate-x-0.5 text-white"
              />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
