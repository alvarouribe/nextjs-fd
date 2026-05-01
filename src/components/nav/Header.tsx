'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AppConstants } from '@/app/utils/app-constants';
import Link from 'next/link';
import { NavigationLinks, type NavLink } from '@/app/utils/navigation-links';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import ContactUsButton from '@/components/ContactUsButton';

type NavLinkWithSubs = NavLink & { subLinks: NonNullable<NavLink['subLinks']> };

function NavFlyout({
  link,
  onItemClick,
}: {
  link: NavLinkWithSubs;
  onItemClick: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!buttonRef.current?.hasAttribute('data-open')) {
      buttonRef.current?.click();
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (buttonRef.current?.hasAttribute('data-open')) {
        buttonRef.current?.click();
      }
    }, 150);
  };

  return (
    <Popover>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <PopoverButton
          ref={buttonRef}
          className="inline-flex items-center gap-x-1 font-semibold leading-6 text-white transition-colors hover:text-green-400 focus:outline-none"
        >
          {link.name}
          <ChevronDownIcon aria-hidden="true" className="size-4" />
        </PopoverButton>

        <PopoverPanel
          transition
          className="absolute left-1/2 z-10 mt-3 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="w-56 flex-auto rounded-2xl bg-gray-800 p-3 text-sm shadow-lg outline outline-1 -outline-offset-1 outline-white/10">
            {link.subLinks.map(item => (
              <div
                key={item.href}
                className="relative rounded-lg p-3 hover:bg-white/5"
              >
                <Link
                  href={item.href}
                  className="block font-semibold text-white"
                  onClick={onItemClick}
                >
                  {item.name}
                  <span className="absolute inset-0" />
                </Link>
                {item.description && (
                  <p className="mt-1 text-gray-400">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </PopoverPanel>
      </div>
    </Popover>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={() => setIsMenuOpen(prev => !prev)}
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
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

          <div
            className={`${isMenuOpen ? '' : 'hidden'} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-700 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
              {NavigationLinks.map(link => (
                <li key={link.href}>
                  {link.subLinks ? (
                    <NavFlyout
                      link={link as NavLinkWithSubs}
                      onItemClick={() => setIsMenuOpen(false)}
                    />
                  ) : (
                    <Link
                      href={link.href}
                      className="font-semibold leading-6 text-white transition-colors hover:text-green-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
