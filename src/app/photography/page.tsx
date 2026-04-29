import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { requiredEnv } from '@/app/utils/cloudinary';
import { getPhotographyImages } from '@/app/utils/photography';

export const metadata: Metadata = {
  title: 'Photography | FlyingDolly',
  description:
    'A curated FlyingDolly photography gallery powered by Cloudinary, featuring recent work and visual storytelling.',
};

export const dynamic = 'force-dynamic';

const buildCloudinaryImageUrl = (
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
    .replace(/\b\w/g, character => character.toUpperCase()) ??
  'Photography image';

export default async function PhotographyPage() {
  const cloudName = requiredEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
  const images = await getPhotographyImages();

  return (
    <main className="min-h-screen bg-gray-950 px-6 pb-20 pt-32 text-white lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Photography
          </h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg">
            A gallery showcasing selected photography work.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-gray-900/70 p-8">
            <p className="text-lg font-medium text-white">
              No photos available yet.
            </p>
            <p className="mt-2 text-sm text-gray-300">
              Upload images to your configured Cloudinary folder to populate
              this gallery.
            </p>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
            {images.map(image => (
              <Link
                key={image.id}
                href={buildCloudinaryImageUrl(
                  cloudName,
                  image.publicId,
                  image.format,
                  2560
                )}
                target="_blank"
                rel="noreferrer"
                className="group relative mb-4 block overflow-hidden rounded-lg border border-white/10 bg-gray-900/50 transition hover:border-white/30"
              >
                <Image
                  src={buildCloudinaryImageUrl(
                    cloudName,
                    image.publicId,
                    image.format,
                    960
                  )}
                  width={image.width}
                  height={image.height}
                  alt={humanizePublicId(image.publicId)}
                  className="h-auto w-full transform object-cover transition duration-200 group-hover:scale-[1.01]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
