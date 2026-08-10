import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | FlyingDolly',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const user = await currentUser();
  console.log('user', user);

  return (
    <main
      data-test="admin-page"
      className="min-h-screen bg-white px-6 pt-40 pb-24 lg:px-8 dark:bg-gray-900"
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Admin
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Signed in as {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
        <UserButton />
      </div>
    </main>
  );
}
