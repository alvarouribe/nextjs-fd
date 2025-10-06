import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/nav/Header';
import FooterSection from '@/components/FooterSection';
import NewRelicInit from '@/components/NewRelicInit';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Flyingdolly.co.nz',
  description: 'Flyingdolly Web Agency based in Mt Maunganui, New Zealand',
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
        <NewRelicInit />
        <Header />
        {children}
        <GoogleAnalytics gaId="G-SBMJ2GKDC1" />
        <FooterSection />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
