import type { Metadata } from 'next';
import { requiredEnv } from '@/app/utils/cloudinary';
import { getPhotographyImages } from '@/app/utils/photography';
import PhotographyGallery from '@/components/PhotographyGallery';

export const metadata: Metadata = {
  title: 'Photography | FlyingDolly',
  description:
    'A curated FlyingDolly photography gallery powered by Cloudinary, featuring recent work and visual storytelling.',
};

export const dynamic = 'force-dynamic';

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
          <PhotographyGallery images={images} cloudName={cloudName} />
        )}
      </section>
    </main>
  );
}
