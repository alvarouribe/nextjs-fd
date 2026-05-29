'use client';

import CTAButton from './CTAButton';
import { trackGenerateLead } from '@/app/utils/analytics';

type ContactUsButtonProps = {
  location?: string;
};

export default function ContactUsButton({
  location = 'unknown',
}: ContactUsButtonProps) {
  const handleContactUsClick = () => {
    trackGenerateLead({ source: 'cta_button', location });
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
