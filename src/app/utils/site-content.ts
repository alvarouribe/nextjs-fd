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

export interface SelectedWorkProject {
  name: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
  imageSrc: string; // homepage screenshot, 1200x750
}

export interface ContactDetails {
  email?: string;
  phone?: string;
  suburb: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: `FlyingDolly captured our events exactly the way we wanted them remembered. Their photos and videos bring the energy of the night to life, and they've become a big part of how we promote upcoming parties and grow our audience.`,
    name: 'Jose Lavin',
    business: 'Euphoria Events',
    imageSrc: '/images/jose-euphoria.jpg',
  },
  {
    quote: `FlyingDolly built our website and gave us what we needed to compete in the local market. We're getting more enquiries than ever and spending far less time on admin.`,
    name: 'Glenn Robert',
    business: 'BOP Gutter CleaNZ, Mount Maunganui',
    imageSrc: '/images/glenn-low.jpeg',
  },
];

export const selectedWork: SelectedWorkProject[] = [
  {
    name: 'BOP Gutter CleaNZ',
    url: 'https://www.bopguttercleanz.co.nz/',
    category: 'Trades & services',
    description:
      'A lead-generating website for a Mount Maunganui gutter and roof specialist — click-to-call, free-quote enquiries, and clear service pages for Tauranga, Papamoa, and the Mount.',
    tags: ['Web design', 'Development', 'Local SEO'],
    imageSrc: '/images/work/bop-gutter-cleanz.webp',
  },
  {
    name: 'Pacific Share',
    url: 'https://www.pacificshare.org/',
    category: 'Nonprofit',
    description:
      'A storytelling website for a nonprofit that gives donated fishing and diving gear a second life in Pacific Island communities — with clear paths to donate, deliver, or request gear.',
    tags: ['Brand', 'Web design', 'Development'],
    imageSrc: '/images/work/pacific-share.webp',
  },
  {
    name: 'Alvaro Uribe',
    url: 'https://www.alvarouribe.cl/',
    category: 'Personal brand',
    description:
      'A portfolio and blog for a full-stack developer and visual storyteller — featuring writing on AI and LLMs, interactive UI experiments, and a newsletter signup.',
    tags: ['Portfolio', 'Blog', 'Development'],
    imageSrc: '/images/work/alvaro-uribe.webp',
  },
];

export const pricingTiers: PricingTier[] = [
  // Example — replace with your real starting price, then uncomment:
  // {
  //   service: 'Websites',
  //   startingFrom: 'NZ$500',
  //   description:
  //     'A custom, mobile-friendly site with SEO basics and analytics set up.',
  //   href: '/#contact-form-section',
  // },
];

export const contactDetails: ContactDetails = {
  email: 'contact@flyingdolly.co.nz',
  phone: '+64 21 525 144',
  suburb: 'Mount Maunganui, Bay of Plenty',
};
