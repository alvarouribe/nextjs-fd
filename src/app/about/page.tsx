'use client'

import { usePathname } from "next/navigation";
import { NavigationLinks } from '../utils/navigation-links'
import clsx from 'clsx';
import AsyncSelectInput from "../components/AsyncSelectInput";

export default function AboutPage() {
  const pathname = usePathname();

  return (
    <>
      <h1 className="text-2xl font-bold m-10">About</h1>

      <AsyncSelectInput />

      <div className="hidden lg:flex lg:gap-x-12">
        {NavigationLinks.map((item) => (
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