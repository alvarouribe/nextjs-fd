'use client';

import { useState, useRef } from 'react';
import SVGBackground from './SvgBackground';
import Input from './Input';
import TextArea from './TextArea';
import useFlashMessages from '@/hooks/useFlashMessages';
import {
  setEmailLimitCookie,
  checkEmailLimitCookie,
} from '@/app/utils/cookies-functions';

export default function ContactForm() {
  const { addFlashMessage } = useFlashMessages();
  const [isFormSent, setIsFormSent] = useState(checkEmailLimitCookie());
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });

  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // Check if email and message are filled
    if (!formData.email.trim()) {
      addFlashMessage({
        type: 'error',
        message: 'Please fill in your Email so we can contact you.',
      });
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }
    if (!formData.message.trim()) {
      addFlashMessage({
        type: 'error',
        message: 'Please fill the Message field so we can assist you better.',
      });
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
      return;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      addFlashMessage({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }
    setIsSending(true);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        addFlashMessage({
          type: 'success',
          message: 'Your message has been sent successfully!',
        });
        setIsFormSent(true);
        setEmailLimitCookie(60); // Set cookie for 60 minutes
      } else {
        addFlashMessage({
          type: 'error',
          message:
            'There was an error sending your message. Please try again later.',
        });
        console.error(result.error);
      }
    } catch (error) {
      addFlashMessage({
        type: 'error',
        message:
          'There was an error sending your message. Please try again later.',
      });
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <SVGBackground />
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Let{"'s"} talk about your project
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">
          We help companies and individuals build their online presence.
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form className="lg:flex-auto">
            <div
              className={`grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 ${isFormSent ? 'pointer-events-none opacity-50' : ''}`}
            >
              <Input
                id="first-name"
                label="First name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                value={formData.firstName}
                disabled={isFormSent}
                onChange={e =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />

              <Input
                id="last-name"
                label="Last name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                value={formData.lastName}
                disabled={isFormSent}
                onChange={e =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />

              <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                isRequired
                placeholder="Email address"
                autoComplete="email"
                ref={emailInputRef}
                disabled={isFormSent}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input
                id="phone"
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                disabled={isFormSent}
                onChange={e =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <div className="sm:col-span-2">
                <TextArea
                  id="message"
                  label="Message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  placeholder="Tell us about your project"
                  ref={messageInputRef}
                  isRequired
                  disabled={isFormSent}
                  onChange={e =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-10">
              {isFormSent ? (
                <div className="text-center text-green-600 dark:text-green-400">
                  <p className="text-lg font-semibold">
                    Thank you for your message!
                  </p>
                  <p>We will get back to you soon.</p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="block w-1/2 rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:bg-green-500 dark:hover:bg-green-400 dark:focus-visible:outline-green-500"
                  onClick={handleClick}
                  disabled={isSending}
                >
                  {isSending ? '...' : `Let\'s talk`}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
