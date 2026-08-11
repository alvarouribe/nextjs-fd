import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/nav/Header';
import FooterSection from '@/components/FooterSection';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://www.flyingdolly.co.nz';

const title =
  'Web Development Agency Mt Maunganui | Custom Websites NZ | FlyingDolly';
const description =
  'Custom website design & development in Mt Maunganui, NZ. FlyingDolly builds fast, responsive websites that drive results. Book your free consultation today.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: SITE_URL,
    siteName: 'FlyingDolly',
    title,
    description,
    images: [
      {
        url: '/images/mount-maunganui-toby-hall.jpg',
        width: 1200,
        height: 630,
        alt: 'FlyingDolly — web development agency in Mt Maunganui, NZ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/mount-maunganui-toby-hall.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'FlyingDolly',
  description,
  url: SITE_URL,
  image: `${SITE_URL}/images/mount-maunganui-toby-hall.jpg`,
  areaServed: [
    { '@type': 'City', name: 'Mount Maunganui' },
    { '@type': 'City', name: 'Tauranga' },
    { '@type': 'Country', name: 'New Zealand' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mount Maunganui',
    addressRegion: 'Bay of Plenty',
    addressCountry: 'NZ',
  },
  sameAs: [
    'https://www.facebook.com/flyingdolly',
    'https://www.instagram.com/flyingdolly.co.nz',
    'https://www.youtube.com/@flyingdolly8322',
  ],
  knowsAbout: [
    'Web design',
    'Web development',
    'Next.js',
    'SEO',
    'Photography',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.motion='on';}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <GoogleAnalytics gaId="G-SBMJ2GKDC1" />
        <FooterSection />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
