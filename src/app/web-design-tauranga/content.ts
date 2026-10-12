// Copy for /web-design-tauranga. Kept beside the page so the FAQ shown on
// screen and the FAQPage JSON-LD always come from the same source — Google
// requires the structured data to match the visible text.
//
// NOTE TO OWNER: every answer here only restates what the site already
// claims. Replace or extend the FAQs with questions real clients have asked.

export interface Faq {
  question: string;
  answer: string;
}

export const outcomes = [
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
];

export const goodFit = [
  "You've outgrown a DIY or template website and it no longer reflects the business.",
  "Your website gets visitors but doesn't bring in enough enquiries.",
  'You want your website connected to your booking, CRM, or invoicing — not another system to update by hand.',
  'You want one local team for your website, photography, and video, instead of three vendors.',
];

export const faqs: Faq[] = [
  {
    question: 'How much does a website cost?',
    answer:
      "Every website is quoted on what your business actually needs, so there's no one-size-fits-all price. Tell us about your business and we'll send you a free, no-obligation quote.",
  },
  {
    question: 'Do you only work with businesses in Tauranga?',
    answer:
      "We're based in Mount Maunganui and work with businesses right across the Bay of Plenty — Tauranga, Papamoa, Te Puke, Katikati, Rotorua and Whakatane — as well as elsewhere in New Zealand.",
  },
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
];
