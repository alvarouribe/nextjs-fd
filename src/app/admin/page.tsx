import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

import { getAdminSession } from '@/app/utils/admin-session';

export const metadata: Metadata = {
  title: 'Admin dashboard | FlyingDolly',
  robots: { index: false, follow: false },
};

const shortcuts = [
  {
    name: 'Photography — favorites',
    href: '/photography',
    description: 'Gallery pulled from the default Cloudinary folder.',
  },
  {
    name: 'Photography — portraits',
    href: '/photography/portraits',
    description: 'Portrait sessions gallery.',
  },
  {
    name: 'Go Freek 2026 Tauranga',
    href: '/photography/go-freek-2026-tauranga',
    description: 'Event highlights gallery.',
  },
  {
    name: 'Contact form',
    href: '/#contact',
    description: 'Public enquiry form that emails the studio inbox.',
  },
];

const formatExpiry = (expiresAt: number) =>
  new Date(expiresAt).toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <main data-test="admin-page" className="bg-white dark:bg-gray-900">
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-40 sm:pb-32 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
              Private area
            </p>
            <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Admin dashboard
            </h1>
            <p className="mt-4 text-base/7 text-gray-600 dark:text-gray-400">
              Signed in as{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {session.email}
              </span>
              . This session expires at {formatExpiry(session.expiresAt)}.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <h2 className="mt-16 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Site shortcuts
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {shortcuts.map(shortcut => (
            <li
              key={shortcut.href}
              className="rounded-2xl bg-gray-50 p-6 dark:bg-gray-800"
            >
              <Link
                href={shortcut.href}
                className="text-base/7 font-semibold text-gray-900 hover:text-green-600 dark:text-white dark:hover:text-green-400"
              >
                {shortcut.name}
              </Link>
              <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                {shortcut.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
