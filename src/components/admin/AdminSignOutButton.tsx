'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function AdminSignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  return (
    <button
      type="button"
      data-test="admin-sign-out"
      disabled={isSigningOut}
      onClick={() => {
        setIsSigningOut(true);
        void signOut({ redirectTo: '/admin/login' });
      }}
      className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      {isSigningOut ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
