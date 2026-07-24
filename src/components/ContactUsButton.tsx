'use client';

import { useRouter } from 'next/navigation';
import CTAButton from './CTAButton';
import { trackGenerateLead } from '@/app/utils/analytics';

type ContactUsButtonProps = {
  location?: string;
};

export default function ContactUsButton({
  location = 'unknown',
}: ContactUsButtonProps) {
  const router = useRouter();

  const handleContactUsClick = () => {
    trackGenerateLead({ source: 'cta_button', location });
    const contactForm = document.getElementById('contact-form-section');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Contact form isn't on this page (e.g. the About page) — send the
      // visitor to the homepage form.
      router.push('/#contact-form-section');
    }
  };

  return (
    <CTAButton type="button" onClick={handleContactUsClick}>
      Book a free call
    </CTAButton>
  );
}
