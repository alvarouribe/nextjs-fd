'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import type { PhotographyImage } from '@/app/utils/photography';

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

export default function PhotographyGallery({ images, cloudName }: Props) {
  const [selected, setSelected] = useState<PhotographyImage | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selected, closeModal]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
        {images.map(image => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelected(image)}
            className="group relative mb-4 block w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-gray-900/50 transition hover:border-white/30"
          >
            <Image
              src={buildUrl(cloudName, image.publicId, image.format, 960)}
              width={image.width}
              height={image.height}
              alt={humanizePublicId(image.publicId)}
              className="h-auto w-full transform object-cover transition duration-200 group-hover:scale-[1.01]"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </button>
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

          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={buildUrl(
                cloudName,
                selected.publicId,
                selected.format,
                2560
              )}
              width={selected.width}
              height={selected.height}
              alt={humanizePublicId(selected.publicId)}
              className="max-h-[90vh] w-auto rounded-lg object-contain shadow-2xl"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
