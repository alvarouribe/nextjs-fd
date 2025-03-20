'use client'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import Image from 'next/image'
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AppConstants } from '@/app/utils/app-constants'
import { NavigationLinks } from '@/app/utils/navigation-links'
import clsx from 'clsx'
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{AppConstants['companyName']}</span>
            <Image
              alt="FlyingDolly Logo"
              src="/fd-logo-glow.svg"
              width={120}
              height={40}
              className="w-auto h-16"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {NavigationLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "text-sm/6 font-semibold text-white",
                { '!text-green-300': pathname === item.href, }
              )}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="#" className="text-sm/6 font-semibold text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">{AppConstants['companyName']}</span>
                <Image
                  alt="FlyingDolly Logo"
                  src="/fd-logo-glow.svg"
                  width={120}
                  height={40}
                  className="w-auto h-16"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {NavigationLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        "-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800",
                        { '!text-green-300': pathname === item.href, }
                      )}>
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {/* <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                  >
                    Log in
                  </a> */}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
  );
}