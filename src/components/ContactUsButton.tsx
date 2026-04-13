'use client';

import CTAButton from './CTAButton';

export default function ContactUsButton() {
  const handleContactUsClick = () => {
    const contactForm = document.getElementById('contact-form-section');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CTAButton type="button" onClick={handleContactUsClick}>
      Book a free call
    </CTAButton>
  );
}
