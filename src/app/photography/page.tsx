import type { Metadata } from 'next';
import { requiredEnv } from '@/app/utils/cloudinary';
import { getCloudinaryPhotosByFolder } from '@/app/utils/photography';
import PhotographyGallery from '@/components/PhotographyGallery';
import ServicesCrossSell from '@/components/ServicesCrossSell';

export const metadata: Metadata = {
  title: 'Mount Maunganui & Tauranga Photography | FlyingDolly',
  description:
    "Browse FlyingDolly's Mount Maunganui and Tauranga photography portfolio — portrait, event and brand photography from the Bay of Plenty team behind your website and automation.",
  alternates: {
    canonical: '/photography',
  },
};

export const dynamic = 'force-dynamic';

export default async function PhotographyPage() {
  const cloudName = requiredEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
  const images = await getCloudinaryPhotosByFolder();

  return (
    <main className="min-h-screen bg-gray-950 px-6 pb-20 pt-32 text-white lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Photography
          </h1>
          <p className="mt-4 text-base text-gray-300 sm:text-lg">
            A gallery of Mount Maunganui and Tauranga photography work, from
            portraits to events. It&apos;s one part of the FlyingDolly system —
            the same team also builds your website and automates your follow-up.
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
      <ServicesCrossSell />
    </main>
  );
}
