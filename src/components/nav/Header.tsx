'use client';

import Image from 'next/image';
import { AppConstants } from '@/app/utils/app-constants';
import Link from 'next/link';
import ContactUsButton from '@/components/ContactUsButton';

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        {/* Logo - left */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{AppConstants['companyName']}</span>
            <Image
              alt="FlyingDolly Logo"
              src="/fd-logo-glow.svg"
              width={120}
              height={40}
              className="w-auto h-16"
              data-test="logo"
            />
          </Link>
        </div>

        {/* Centered nav links */}
        {/* <div className="hidden sm:flex sm:items-center sm:space-x-8 justify-center flex-1">
          <Link
            href="/services"
            className="font-semibold leading-6 text-white hover:text-green-600 transition-colors"
          >
            SERVICES
          </Link>
          <Link
            href="/about"
            className="font-semibold leading-6 text-white hover:text-green-600 transition-colors"
          >
            ABOUT
          </Link>
        </div> */}

        {/* Contact Us button - right */}
        <div className="flex lg:flex-1 justify-end">
          <div className="ml-auto">
            <ContactUsButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
