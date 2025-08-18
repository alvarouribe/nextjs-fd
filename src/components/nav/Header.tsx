'use client';
import Image from 'next/image';
import { AppConstants } from '@/app/utils/app-constants';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-center sm:justify-between p-6 lg:px-8"
      >
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
      </nav>
    </header>
  );
}
