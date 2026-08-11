'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import type { PhotographyImage } from '@/app/utils/photography';
import { useReveal } from '@/components/motion/Reveal';

interface Props {
  images: PhotographyImage[];
  cloudName: string;
}

const buildUrl = (
  cloudName: string,
  publicId: string,
  format: string,
  width: number
): string =>
  `https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_${width}/${publicId}.${format}`;

const humanizePublicId = (publicId: string): string =>
  publicId
    .split('/')
    .pop()
    ?.replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase()) ?? 'Photography image';

function PhotographyLoader() {
  return (
    <svg
      viewBox="0 0 240 240"
      role="status"
      aria-label="Loading image"
      className="h-16 w-16 text-white"
    >
      <circle
        className="pl1123__ring pl1123__ring--a"
        cx="120"
        cy="120"
        r="105"
        fill="none"
        stroke="currentColor"
        strokeWidth="20"
        strokeDasharray="0 660"
        strokeDashoffset="-330"
        strokeLinecap="round"
      />
      <circle
        className="pl1123__ring pl1123__ring--b"
        cx="120"
        cy="120"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="20"
        strokeDasharray="0 220"
        strokeDashoffset="-110"
        strokeLinecap="round"
      />
      <circle
        className="pl1123__ring pl1123__ring--c"
        cx="85"
        cy="120"
        r="70"
        fill="none"
        stroke="currentColor"
        strokeWidth="20"
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
      <circle
        className="pl1123__ring pl1123__ring--d"
        cx="155"
        cy="120"
        r="70"
        fill="none"
        stroke="currentColor"
        strokeWidth="20"
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GalleryTile({
  image,
  cloudName,
  index,
  onSelect,
}: {
  image: PhotographyImage;
  cloudName: string;
  index: number;
  onSelect: () => void;
}) {
  const { ref, className, style } = useReveal<HTMLButtonElement>(index % 6);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      style={style}
      className={`group relative mb-4 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-gray-900/50 transition hover:border-white/30 ${className}`}
    >
      <Image
        src={buildUrl(cloudName, image.publicId, image.format, 960)}
        width={image.width}
        height={image.height}
        alt={humanizePublicId(image.publicId)}
        className="h-auto w-full transform object-cover transition duration-500 ease-camera group-hover:scale-[1.08]"
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
    </button>
  );
}

export default function PhotographyGallery({ images, cloudName }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selected = selectedIndex !== null ? images[selectedIndex] : null;
  const hasPrev = selectedIndex !== null && selectedIndex > 0;
  const hasNext = selectedIndex !== null && selectedIndex < images.length - 1;

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    setIsLoading(false);
  }, []);
  const goNext = useCallback(() => {
    setIsLoading(true);
    setSelectedIndex(i => (i !== null && i < images.length - 1 ? i + 1 : i));
  }, [images.length]);
  const goPrev = useCallback(() => {
    setIsLoading(true);
    setSelectedIndex(i => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selected, closeModal, goNext, goPrev]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {images.map((image, index) => (
          <GalleryTile
            key={image.id}
            image={image}
            cloudName={cloudName}
            index={index}
            onSelect={() => {
              setIsLoading(true);
              setSelectedIndex(image.id);
            }}
          />
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={humanizePublicId(selected.publicId)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close"
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous arrow */}
          {hasPrev && (
            <button
              type="button"
              aria-label="Previous"
              onClick={e => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25 z-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next arrow */}
          {hasNext && (
            <button
              type="button"
              aria-label="Next"
              onClick={e => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25 z-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Spinner — full-modal overlay so it's always visible during load */}
          {isLoading && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <PhotographyLoader />
            </div>
          )}

          <div
            key={selectedIndex}
            className="lightbox-in relative max-h-[90vh] max-w-[90vw]"
            onClick={e => e.stopPropagation()}
          >
            <Image
              key={selectedIndex}
              src={buildUrl(
                cloudName,
                selected.publicId,
                selected.format,
                2560
              )}
              width={selected.width}
              height={selected.height}
              alt={humanizePublicId(selected.publicId)}
              className={`max-h-[90vh] w-auto rounded-lg object-contain shadow-2xl transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100 img-breathe'
              }`}
              priority
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
