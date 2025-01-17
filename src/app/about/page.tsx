'use client'

import { usePathname } from "next/navigation";
import clsx from 'clsx';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
]


export default function AboutPage() {
  const pathname = usePathname();

  return (
    <>
      <h1 className="text-2xl font-bold m-10">About</h1>

      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={clsx(
              "text-sm/6 font-semibold text-white",
              { 'underline text-purple-600': pathname === item.href, }
            )}>
            {item.name}
          </a>
        ))}
      </div>
    </>
  );
}