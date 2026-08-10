import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import AdminLoginForm from '@/components/admin/AdminLoginForm';

import { getAdminSession } from '@/app/utils/admin-session';

export const metadata: Metadata = {
  title: 'Admin sign in | FlyingDolly',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect('/admin');
  }

  return (
    <main data-test="admin-login-page" className="bg-white dark:bg-gray-900">
      <section className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 pb-24 pt-40 lg:px-8">
        <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
          Private area
        </p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Admin sign in
        </h1>
        <p className="mt-4 text-base/7 text-gray-600 dark:text-gray-400">
          This area is restricted to the FlyingDolly account owner.
        </p>

        <div className="mt-10">
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
