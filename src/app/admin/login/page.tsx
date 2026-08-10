import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import AdminLoginForm from '@/components/admin/AdminLoginForm';

import { ADMIN_ROOT_PATH } from '@/auth.config';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Admin sign in | FlyingDolly',
  robots: { index: false, follow: false },
};

const ADMIN_HOME = '/admin';

/**
 * The proxy hands us an absolute callback url, so we keep only its path and
 * query — any host in the value is thrown away, which rules out an open
 * redirect — and then require the result to stay inside the admin area.
 */
const safeCallbackUrl = (value: string | string[] | undefined): string => {
  if (typeof value !== 'string' || !value) return ADMIN_HOME;

  let target: URL;
  try {
    // The base only matters for resolving relative values; its host is discarded.
    target = new URL(value, 'http://admin.invalid');
  } catch {
    return ADMIN_HOME;
  }

  return target.pathname.startsWith(ADMIN_ROOT_PATH)
    ? `${target.pathname}${target.search}`
    : ADMIN_HOME;
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await auth();

  if (session?.user) {
    redirect(ADMIN_HOME);
  }

  const params = (await searchParams) ?? {};

  return (
    <main data-test="admin-login-page" className="bg-white dark:bg-gray-900">
      <section className="mx-auto max-w-md px-6 pb-24 pt-40 sm:pb-32 lg:px-8">
        <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
          Private area
        </p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Admin sign in
        </h1>
        <p className="mt-4 text-base/7 text-gray-600 dark:text-gray-400">
          This area is for the FlyingDolly team only.
        </p>

        <AdminLoginForm callbackUrl={safeCallbackUrl(params.callbackUrl)} />
      </section>
    </main>
  );
}
