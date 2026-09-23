// Real business content for the marketing site. Every section that reads from
// here renders nothing while its data is empty — never add invented entries.

export interface Testimonial {
  quote: string;
  name: string;
  business: string;
  imageSrc?: string;
}

export interface PricingTier {
  service: 'Websites' | 'Automation' | 'Photography & Video';
  startingFrom: string; // e.g. 'NZ$1,500'
  description: string;
  href?: string;
}

export interface ContactDetails {
  email?: string;
  phone?: string;
  suburb: string;
}

export const testimonials: Testimonial[] = [];

export const pricingTiers: PricingTier[] = [];

export const contactDetails: ContactDetails = {
  suburb: 'Mount Maunganui, Bay of Plenty',
};
