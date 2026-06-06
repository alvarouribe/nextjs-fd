'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AppConstants } from '@/app/utils/app-constants';
import Link from 'next/link';
import { trackSelectContent } from '@/app/utils/analytics';
import { NavigationLinks, type NavLink } from '@/app/utils/navigation-links';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import ContactUsButton from '@/components/ContactUsButton';

type NavLinkWithSubs = NavLink & { subLinks: NonNullable<NavLink['subLinks']> };

interface MobileMenuLinkStyle extends React.CSSProperties {
  '--link-index': number;
}

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
                  onClick={() => {
                    trackSelectContent({
                      source: 'header_nav',
                      destination: item.href,
                      label: item.name,
                    });
                    onItemClick();
                  }}
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isMenuOpen]);

  return (
    <header>
      <nav className="bg-[#0a0a0a] bg-opacity-75 fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="relative z-50 -m-1.5 p-1.5">
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
            className="relative z-50 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-base md:hidden focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span
                className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                data-test="burger-line-middle"
                className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current rounded transition-all duration-300 origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </span>
          </button>

          <div
            className={`${
              isMenuOpen
                ? 'mobile-menu-overlay fixed inset-0 z-30 flex flex-col items-center justify-center bg-[#0a0a0a]'
                : 'hidden'
            } w-full md:static md:block md:w-auto md:bg-transparent`}
            id="navbar-default"
          >
            <ul className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-0 md:space-x-8 rtl:space-x-reverse md:text-left">
              {NavigationLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="mobile-menu-link text-2xl md:text-base"
                  style={{ '--link-index': index } satisfies MobileMenuLinkStyle}
                >
                  {link.subLinks ? (
                    <NavFlyout
                      link={link as NavLinkWithSubs}
                      onItemClick={() => setIsMenuOpen(false)}
                    />
                  ) : (
                    <Link
                      href={link.href}
                      className="mobile-nav-link font-semibold text-white transition-colors hover:text-green-400 md:leading-6"
                      onClick={() => {
                        trackSelectContent({
                          source: 'header_nav',
                          destination: link.href,
                          label: link.name,
                        });
                        setIsMenuOpen(false);
                      }}
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
