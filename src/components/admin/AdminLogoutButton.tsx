'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import useFlashMessages from '@/hooks/useFlashMessages';

export default function AdminLogoutButton() {
  const router = useRouter();
  const { addFlashMessage } = useFlashMessages();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleClick = async () => {
    setIsSigningOut(true);

    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      addFlashMessage({
        type: 'error',
        message: 'Could not sign you out. Please try again.',
      });
      console.error(error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <button
      type="button"
      data-test="admin-logout-button"
      onClick={handleClick}
      disabled={isSigningOut}
      className="rounded-md px-3.5 py-2 text-sm font-semibold text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 transition hover:bg-gray-50 disabled:opacity-50 dark:text-gray-200 dark:outline-white/15 dark:hover:bg-white/5"
    >
      {isSigningOut ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
