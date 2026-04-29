import Image from 'next/image';
import { AppConstants } from '@/app/utils/app-constants';
import Link from 'next/link';
import { NavigationLinks } from '@/app/utils/navigation-links';
// import ContactUsButton from '@/components/ContactUsButton';

export default function Header() {
  return (
    <header>
      <nav className="bg-[#0a0a0a] bg-opacity-75 fixed w-full z-20 top-0 start-0 bord-er-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {NavigationLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-semibold leading-6 text-white transition-colors hover:text-green-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
