import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';
import ContactUsButton from '@/components/ContactUsButton';
import Reveal from '@/components/motion/Reveal';
import { AppConstants } from '@/app/utils/app-constants';
import { pageMetadata } from '@/app/utils/page-metadata';
import {
  processSteps,
  selectedWork,
  testimonials,
} from '@/app/utils/site-content';
import { faqs, goodFit, outcomes } from './content';

const SITE_URL = AppConstants.siteUrl;
const PATH = '/web-design-tauranga';
const PAGE_URL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = pageMetadata({
  title: 'Web Design Tauranga & Bay of Plenty | FlyingDolly',
  description:
    'Web design in Tauranga for growing Bay of Plenty businesses: fast, SEO-ready websites built to turn visitors into enquiries, by a Mount Maunganui team.',
  path: PATH,
});

const CASE_STUDY_NAME = 'BOP Gutter CleaNZ';

const displayDomain = (url: string) =>
  new URL(url).hostname.replace(/^www\./, '');

// Escapes `<` so a string in the data can never close the <script> tag.
const toJsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web design',
  name: 'Web design in Tauranga & the Bay of Plenty',
  description: metadata.description,
  url: PAGE_URL,
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Bay of Plenty' },
    { '@type': 'City', name: 'Tauranga' },
    { '@type': 'City', name: 'Mount Maunganui' },
    { '@type': 'City', name: 'Papamoa' },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Web design Tauranga',
      item: PAGE_URL,
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function WebDesignTaurangaPage() {
  // Real client work only — each block renders nothing if its data is gone.
  const caseStudy = selectedWork.find(
    project => project.name === CASE_STUDY_NAME
  );
  const caseStudyQuote = testimonials.find(testimonial =>
    testimonial.business.startsWith(CASE_STUDY_NAME)
  );

  return (
    <main
      data-test="web-design-tauranga-page"
      className="bg-white dark:bg-gray-900"
    >
      {[serviceJsonLd, breadcrumbJsonLd, faqJsonLd].map(data => (
        <script
          key={data['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(data) }}
        />
      ))}

      {/* Intro */}
      <Reveal
        as="section"
        className="mx-auto max-w-3xl px-6 pt-40 pb-24 sm:pb-32 lg:px-8"
      >
        <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
          Web design · Mount Maunganui
        </p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Web design in{' '}
          <mark className="bg-green-600/20 text-green-700 dark:text-green-300">
            Tauranga &amp; the Bay of Plenty
          </mark>
        </h1>
        <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
          Your website should be your hardest-working salesperson. We design and
          build fast, SEO-ready websites for growing Bay of Plenty businesses —
          sites that get found by local customers and turn them into enquiries.
        </p>
        <div className="mt-10">
          <ContactUsButton location="web_design_tauranga_hero" />
        </div>
      </Reveal>

      {/* Outcomes */}
      <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-800">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              A website that does more than look good
            </h2>
          </Reveal>
          <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {outcomes.map((outcome, index) => (
              <Reveal
                key={outcome.name}
                index={index}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700"
              >
                <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                  {outcome.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                  {outcome.description}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Case study */}
      {caseStudy && (
        <section
          id="case-study-section"
          className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8"
        >
          <Reveal className="max-w-2xl">
            <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
              Local work
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {caseStudy.name}
            </h2>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              {caseStudy.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-green-600 dark:text-green-400">
              <a href={caseStudy.url} target="_blank" rel="noopener noreferrer">
                {displayDomain(caseStudy.url)}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <Reveal className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
              <Image
                alt={`${caseStudy.name} website homepage`}
                src={caseStudy.imageSrc}
                width={1200}
                height={750}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="aspect-[8/5] w-full object-cover object-top"
              />
            </Reveal>
            {caseStudyQuote && (
              <Reveal
                as="figure"
                index={1}
                className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-800"
              >
                <blockquote className="text-lg/8 text-gray-700 dark:text-gray-300">
                  <p>&ldquo;{caseStudyQuote.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  {caseStudyQuote.imageSrc && (
                    <Image
                      alt={caseStudyQuote.name}
                      src={caseStudyQuote.imageSrc}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {caseStudyQuote.name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {caseStudyQuote.business}
                    </div>
                  </div>
                </figcaption>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Good fit */}
      <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-800">
        <Reveal className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Is this right for your business?
          </h2>
          <ul className="mt-8 space-y-4">
            {goodFit.map(item => (
              <li key={item} className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-green-600 dark:text-green-400"
                />
                <span className="text-base/7 text-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            How we build your website
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, index) => (
            <Reveal
              key={item.step}
              index={index}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
            >
              <span className="text-3xl font-semibold text-green-600 dark:text-green-400">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-800">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Frequently asked questions
            </h2>
          </Reveal>
          <dl className="mt-10 divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map(faq => (
              <Reveal key={faq.question} className="py-6">
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <Reveal
        as="section"
        className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900"
        id="contact-form-section"
      >
        <ContactForm />
      </Reveal>
    </main>
  );
}
