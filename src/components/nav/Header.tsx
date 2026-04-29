import Image from 'next/image';
import { AppConstants } from '@/app/utils/app-constants';
import Link from 'next/link';
import { NavigationLinks } from '@/app/utils/navigation-links';
// import ContactUsButton from '@/components/ContactUsButton';

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-center sm:justify-between p-6 lg:px-8"
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
              className="w-auto h-16 hover:scale-110 transition-transform duration-300"
              data-test="logo"
            />
          </Link>
        </div>

        <div className="hidden flex-1 justify-center sm:flex sm:items-center sm:space-x-8">
          {NavigationLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold leading-6 text-white transition-colors hover:text-green-400"
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Contact Us button - right */}
        {/* <div className="flex lg:flex-1 justify-end">
          <div className="ml-auto hidden sm:inline">
            <ContactUsButton />
          </div>
        </div> */}
      </nav>
    </header>
  );
}
