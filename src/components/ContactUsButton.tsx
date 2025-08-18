'use client';

export default function ContactUsButton() {
  const handleContactUsClick = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-10 flex">
      <button
        onClick={handleContactUsClick}
        className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:bg-green-500 dark:hover:bg-green-400 dark:focus-visible:outline-green-500"
      >
        contact us!
      </button>
    </div>
  );
}
