import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | FlyingDolly',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <main
      data-test="sign-in-page"
      className="flex min-h-screen items-center justify-center bg-white px-6 pt-40 pb-24 dark:bg-gray-900"
    >
      <SignIn />
    </main>
  );
}
