'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Input from '@/components/Input';

import useFlashMessages from '@/hooks/useFlashMessages';

const GENERIC_ERROR = 'That email and password combination did not work.';

export default function AdminLoginForm({
  callbackUrl = '/admin',
}: {
  callbackUrl?: string;
}) {
  const router = useRouter();
  const { addFlashMessage } = useFlashMessages();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (!result || result.error) {
        // Deliberately vague — never reveal which half was wrong.
        setError(GENERIC_ERROR);
        addFlashMessage({ type: 'error', message: GENERIC_ERROR });
        setPassword('');
        return;
      }

      addFlashMessage({ type: 'success', message: 'Welcome back.' });
      router.replace(callbackUrl);
      router.refresh();
    } catch {
      const message = 'Could not sign you in right now. Please try again.';
      setError(message);
      addFlashMessage({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      data-test="admin-login-form"
      onSubmit={handleSubmit}
      className="mt-10"
    >
      <div className="flex flex-col gap-y-6">
        <Input
          id="admin-email"
          name="email"
          type="email"
          label="Email"
          isRequired
          autoComplete="username"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          id="admin-password"
          name="password"
          type="password"
          label="Password"
          isRequired
          autoComplete="current-password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>

      {error && (
        <p
          data-test="admin-login-error"
          role="alert"
          className="mt-4 text-sm text-red-500"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
