import type { Metadata } from 'next';

type OpenGraph = NonNullable<Metadata['openGraph']>;

const DEFAULT_SHARE_IMAGE = {
  url: '/images/mount-maunganui-toby-hall.jpg',
  width: 1200,
  height: 630,
  alt: 'FlyingDolly — web development agency in Mt Maunganui, NZ',
};

// Next.js replaces (not merges) the root layout's openGraph/twitter when a page
// sets them — and a page that sets neither shares the homepage's title and URL.
// Build every public page's metadata through here so shares point at the page.
export function pageMetadata({
  title,
  description,
  path,
  image,
  openGraph,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  openGraph?: Partial<OpenGraph>;
}): Metadata {
  const images = image ? [image] : [DEFAULT_SHARE_IMAGE];

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'en_NZ',
      siteName: 'FlyingDolly',
      url: path,
      title,
      description,
      images,
      ...openGraph,
    } as OpenGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}
