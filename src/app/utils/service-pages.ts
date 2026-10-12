// Content for the service landing pages (one per service, targeting a local
// search like "web design Tauranga"). Every page is rendered by
// ServicePage, and the header, footer, sitemap and homepage service cards
// all read their links from here — add a service once and it shows up
// everywhere.
//
// NOTE TO OWNER: the copy only restates what the site already claims and
// uses real clients only. Replace or extend the FAQs with questions real
// clients have asked, and check you're happy to stand behind each outcome.

import { PhotographyAlbums } from './photography-albums';

export interface Faq {
  question: string;
  answer: string;
}

export interface ServicePageContent {
  path: string;
  // Used for the footer, breadcrumb and homepage card links.
  shortName: string;
  // Used for the header flyout.
  navName: string;
  navDescription: string;
  title: string;
  description: string;
  serviceType: string;
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  intro: string;
  ctaLocation: string;
  outcomesHeading: string;
  outcomes: Array<{ name: string; description: string }>;
  proof: {
    eyebrow: string;
    // A selectedWork project name: shows its screenshot, description and link.
    projectName?: string;
    heading?: string;
    intro?: string;
    // Matches the start of a testimonial's business name.
    testimonialBusiness: string;
    links?: Array<{ name: string; href: string; description?: string }>;
  };
  goodFitHeading: string;
  goodFit: string[];
  processHeading: string;
  faqs: Faq[];
}

const quoteFaq = (service: string): Faq => ({
  question: `How much does ${service} cost?`,
  answer:
    "Every project is quoted on what your business actually needs, so there's no one-size-fits-all price. Tell us what you're after and we'll send you a free, no-obligation quote.",
});

const areaFaq: Faq = {
  question: 'Do you only work with businesses in Tauranga?',
  answer:
    "We're based in Mount Maunganui and work with businesses right across the Bay of Plenty — Tauranga, Papamoa, Te Puke, Katikati, Rotorua and Whakatane — as well as elsewhere in New Zealand.",
};

const webDesign: ServicePageContent = {
  path: '/web-design-tauranga',
  shortName: 'Web design Tauranga',
  navName: 'WEB DESIGN',
  navDescription: 'Websites built to bring in enquiries',
  title: 'Web Design Tauranga & Bay of Plenty | FlyingDolly',
  description:
    'Web design in Tauranga for growing Bay of Plenty businesses: fast, SEO-ready websites built to turn visitors into enquiries, by a Mount Maunganui team.',
  serviceType: 'Web design',
  eyebrow: 'Web design · Mount Maunganui',
  heading: 'Web design in',
  headingHighlight: 'Tauranga & the Bay of Plenty',
  intro:
    'Your website should be your hardest-working salesperson. We design and build fast, SEO-ready websites for growing Bay of Plenty businesses — sites that get found by local customers and turn them into enquiries.',
  ctaLocation: 'web_design_tauranga_hero',
  outcomesHeading: 'A website that does more than look good',
  outcomes: [
    {
      name: 'Built to bring in enquiries',
      description:
        'Clear calls to action, click-to-call on mobile, and quote forms in the places customers look — so visitors become leads, not just page views.',
    },
    {
      name: 'Found by local customers',
      description:
        'SEO-ready from day one: fast pages, proper titles and descriptions, structured data, and service pages for the Tauranga suburbs and towns you work in.',
    },
    {
      name: 'Fast on every device',
      description:
        'Custom-built, mobile-first sites that load quickly — because most of your customers will find you on their phone.',
    },
    {
      name: 'Measured, not guessed',
      description:
        'Google Analytics and Search Console set up so you can see which pages and searches bring you enquiries.',
    },
  ],
  proof: {
    eyebrow: 'Local work',
    projectName: 'BOP Gutter CleaNZ',
    testimonialBusiness: 'BOP Gutter CleaNZ',
  },
  goodFitHeading: 'Is this right for your business?',
  goodFit: [
    "You've outgrown a DIY or template website and it no longer reflects the business.",
    "Your website gets visitors but doesn't bring in enough enquiries.",
    'You want your website connected to your booking, CRM, or invoicing — not another system to update by hand.',
    'You want one local team for your website, photography, and video, instead of three vendors.',
  ],
  processHeading: 'How we build your website',
  faqs: [
    quoteFaq('a website'),
    areaFaq,
    {
      question: 'Will my new website show up on Google?',
      answer:
        "Every site we build is SEO-ready: fast, mobile-friendly, with proper page titles, descriptions and structured data, plus Google Search Console set up. Rankings also depend on your competition, so we won't promise a position — but we'll give your site the right foundations to be found.",
    },
    {
      question: 'Can you redesign our existing website?',
      answer:
        "Yes. We'll look at what's working on your current site and what isn't, then rebuild it so it's faster, easier to update, and better at turning visitors into enquiries.",
    },
    {
      question: 'Can you also handle automation, photography and video?',
      answer:
        "Yes — that's what makes us different. The same team builds your website, automates the admin behind it (bookings, lead follow-up, invoicing), and shoots the photos and video that fill it.",
    },
    {
      question: 'What happens after the website launches?',
      answer:
        "We don't disappear at launch. We keep optimising, supporting and improving your site as your business grows.",
    },
  ],
};

const automation: ServicePageContent = {
  path: '/business-automation-bay-of-plenty',
  shortName: 'Business automation',
  navName: 'AUTOMATION',
  navDescription: 'Take the repetitive admin off your plate',
  title: 'Business Automation Bay of Plenty | FlyingDolly',
  description:
    'Business automation for Bay of Plenty companies: lead follow-up, bookings, invoicing and admin workflows that save your team hours every week.',
  serviceType: 'Business automation',
  eyebrow: 'Automation · Mount Maunganui',
  heading: 'Business automation for',
  headingHighlight: 'Bay of Plenty businesses',
  intro:
    'If your team is copying details between systems, chasing enquiries by hand, or typing up the same invoices every week, that time adds up. We build automations that take the repetitive admin off your plate — so your people can focus on customers.',
  ctaLocation: 'business_automation_hero',
  outcomesHeading: 'Less admin, fewer missed leads',
  outcomes: [
    {
      name: 'Leads followed up automatically',
      description:
        'New enquiries get an instant reply and a follow-up reminder, so no lead goes cold in an inbox.',
    },
    {
      name: 'Bookings without the back-and-forth',
      description:
        'Online booking with confirmations and reminders — no more phone tag to lock in a time.',
    },
    {
      name: 'Invoicing that runs itself',
      description:
        "Quotes, invoices and payment reminders created from the work you've already recorded, instead of typed up by hand.",
    },
    {
      name: 'Hours back every week',
      description:
        'We map the manual steps your team repeats, then automate the ones that cost the most time.',
    },
  ],
  proof: {
    eyebrow: 'What our clients say',
    heading: 'More enquiries, less admin',
    testimonialBusiness: 'BOP Gutter CleaNZ',
  },
  goodFitHeading: 'Is automation right for your business?',
  goodFit: [
    'Your team re-types the same information into more than one system.',
    'Enquiries sometimes slip through the cracks or get a slow reply.',
    'Quotes, invoices or reminders still go out by hand.',
    'You want your website, bookings and admin working as one system.',
  ],
  processHeading: 'How we automate your admin',
  faqs: [
    {
      question: 'What can you automate?',
      answer:
        "Most repetitive admin: lead follow-up, bookings and reminders, quotes and invoicing, and moving information between the tools you already use. We start by mapping where your team's time actually goes.",
    },
    {
      question: 'Do we have to change the software we use?',
      answer:
        "Not necessarily. Where we can, we connect the tools you already use rather than replacing them. If a change would genuinely save you time, we'll explain why before recommending it.",
    },
    quoteFaq('automation'),
    areaFaq,
    {
      question: 'Can you build our website too?',
      answer:
        'Yes. The same team designs your website, automates the admin behind it, and shoots the photos and video that fill it — so everything works together.',
    },
    {
      question: 'What happens after the automation goes live?',
      answer:
        "We don't disappear at launch. We keep supporting and improving your automations as your business grows.",
    },
  ],
};

const photographyVideo: ServicePageContent = {
  path: '/commercial-photography-tauranga',
  shortName: 'Commercial photography & video',
  navName: 'PHOTOGRAPHY & VIDEO',
  navDescription: 'Product, portrait and event content',
  title: 'Commercial Photography & Video Tauranga | FlyingDolly',
  description:
    'Commercial photography and video in Tauranga and the Bay of Plenty: product, portrait and event content that shows your business off at its best.',
  serviceType: 'Commercial photography and video production',
  eyebrow: 'Photography & video · Mount Maunganui',
  heading: 'Commercial photography & video in',
  headingHighlight: 'Tauranga & the Bay of Plenty',
  intro:
    'Customers judge your business by its photos before they ever meet you. We shoot product, portrait and event photography and video for Bay of Plenty businesses — content made for your website, social media and ads.',
  ctaLocation: 'commercial_photography_hero',
  outcomesHeading: 'Content that shows your business at its best',
  outcomes: [
    {
      name: 'Portraits and team photos',
      description:
        'Professional portraits that put real faces to your business — for your website, LinkedIn and proposals.',
    },
    {
      name: 'Product photography',
      description:
        'Clean, consistent product shots for your website, online store and print.',
    },
    {
      name: 'Event photography and video',
      description:
        'Launches, parties and tournaments, captured so you can promote the next one.',
    },
    {
      name: 'Video for web and social',
      description:
        'Highlight reels and short videos for your website, social media and ads.',
    },
  ],
  proof: {
    eyebrow: 'Recent shoots',
    heading: 'See our work',
    intro: 'Browse recent portrait sessions, local events and video projects.',
    testimonialBusiness: 'Euphoria Events',
    links: [
      ...PhotographyAlbums.filter(album => album.href !== '/photography').map(
        album => ({
          name: album.name,
          href: album.href,
          description: album.description,
        })
      ),
      {
        name: 'VIDEOGRAPHY',
        href: '/videography',
        description: 'Event films and highlight reels',
      },
    ],
  },
  goodFitHeading: 'Is this right for your business?',
  goodFit: [
    'Your website still relies on stock photos or old phone shots.',
    'You need fresh content for social media and ads.',
    'You have an event, launch or new team members to capture.',
    'You want photos and video that fit your website — from the team that built it.',
  ],
  processHeading: 'How a shoot works',
  faqs: [
    {
      question: 'What kind of photography do you do?',
      answer:
        'Product, portrait and event photography for businesses, plus video for websites, social media and ads. Our portrait and event galleries show recent examples.',
    },
    quoteFaq('a photo or video shoot'),
    areaFaq,
    {
      question: 'Can you put the photos and video on our website too?',
      answer:
        'Yes. We build websites as well, so your new content can go straight onto a site designed to show it off.',
    },
  ],
};

export const servicePages = { webDesign, automation, photographyVideo };

export const servicePageList: ServicePageContent[] = [
  webDesign,
  automation,
  photographyVideo,
];
