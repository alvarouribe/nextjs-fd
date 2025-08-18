'use client';

import { useState, useRef } from 'react';
import SVGBackground from './SvgBackground';
import Input from './Input';
import TextArea from './TextArea';

export default function ContactForm() {
  const [isFormSent, setIsFormSent] = useState(false);
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
      alert('Please fill in both Email and Message fields before submitting.');
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }
    if (!formData.message.trim()) {
      alert('Please fill in both Email and Message fields before submitting.');
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
      return;
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert('Please enter a valid email address.');
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
        alert('Email sent successfully!');
        setIsFormSent(true);
      } else {
        alert('Failed to send email: ' + result.error);
      }
    } catch {
      alert('Error sending email.');
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
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <Input
                id="first-name"
                label="First name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                value={formData.firstName}
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
