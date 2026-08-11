'use client';

import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

export default function ScrollCueButton() {
  const handleClick = () => {
    document
      .getElementById('features-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to features"
      onClick={handleClick}
      className="hero-cue mb-12 flex w-full items-center justify-center opacity-25 transition-opacity duration-300 hover:opacity-60 focus:outline-none focus-visible:opacity-60"
    >
      <ArrowDownCircleIcon className="size-8 text-white" />
    </button>
  );
}
