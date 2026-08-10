'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import CTAButton from '@/components/CTAButton';
import Input from '@/components/Input';
import useFlashMessages from '@/hooks/useFlashMessages';

export default function AdminLoginForm() {
  const router = useRouter();
  const { addFlashMessage } = useFlashMessages();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!credentials.email.trim()) {
      addFlashMessage({
        type: 'error',
        message: 'Please enter your email address.',
      });
      emailInputRef.current?.focus();
      return;
    }

    if (!credentials.password) {
      addFlashMessage({
        type: 'error',
        message: 'Please enter your password.',
      });
      passwordInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email.trim(),
          password: credentials.password,
        }),
      });
      const result = await response.json();

      if (result.success) {
        addFlashMessage({ type: 'success', message: 'Welcome back.' });
        setCredentials({ email: '', password: '' });
        router.push('/admin');
        router.refresh();
        return;
      }

      addFlashMessage({
        type: 'error',
        message: result.error || 'Invalid email or password.',
      });
      passwordInputRef.current?.focus();
    } catch (error) {
      addFlashMessage({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      data-test="admin-login-form"
      className="flex flex-col gap-6"
      onSubmit={event => event.preventDefault()}
    >
      <Input
        ref={emailInputRef}
        id="admin-email"
        name="email"
        type="email"
        label="Email address"
        autoComplete="username"
        isRequired
        value={credentials.email}
        onChange={event =>
          setCredentials(current => ({
            ...current,
            email: event.target.value,
          }))
        }
      />
      <Input
        ref={passwordInputRef}
        id="admin-password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        isRequired
        value={credentials.password}
        onChange={event =>
          setCredentials(current => ({
            ...current,
            password: event.target.value,
          }))
        }
      />
      <CTAButton
        type="submit"
        isLoading={isSubmitting}
        onClick={handleSubmit}
        aria-label="Sign in"
      >
        Sign in
      </CTAButton>
    </form>
  );
}
