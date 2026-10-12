import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import ContactForm from '@/components/ContactForm';
import ContactUsButton from '@/components/ContactUsButton';
import Reveal from '@/components/motion/Reveal';
import { AppConstants } from '@/app/utils/app-constants';
import { pageMetadata } from '@/app/utils/page-metadata';
import type { ServicePageContent } from '@/app/utils/service-pages';
import {
  processSteps,
  selectedWork,
  testimonials,
} from '@/app/utils/site-content';

const SITE_URL = AppConstants.siteUrl;

export const servicePageMetadata = (page: ServicePageContent): Metadata =>
  pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });

const displayDomain = (url: string) =>
  new URL(url).hostname.replace(/^www\./, '');

// Escapes `<` so a string in the data can never close the <script> tag.
const toJsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

const buildJsonLd = (page: ServicePageContent) => {
  const pageUrl = `${SITE_URL}${page.path}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: page.serviceType,
      name: `${page.heading} ${page.headingHighlight}`,
      description: page.description,
      url: pageUrl,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Bay of Plenty' },
        { '@type': 'City', name: 'Tauranga' },
        { '@type': 'City', name: 'Mount Maunganui' },
        { '@type': 'City', name: 'Papamoa' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.shortName,
          item: pageUrl,
        },
      ],
    },
    // Google requires FAQ markup to match the visible text — both come
    // from page.faqs.
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];
};

// Landing page for one service, targeting a local search such as
// "web design Tauranga". Content lives in src/app/utils/service-pages.ts.
export default function ServicePage({ page }: { page: ServicePageContent }) {
  const { proof } = page;
  // Real client work only — each block renders nothing if its data is gone.
  const project = proof.projectName
    ? selectedWork.find(item => item.name === proof.projectName)
    : undefined;
  const quote = testimonials.find(testimonial =>
    testimonial.business.startsWith(proof.testimonialBusiness)
  );
  const proofHeading = project?.name ?? proof.heading;
  const proofIntro = project?.description ?? proof.intro;

  return (
    <main className="bg-white dark:bg-gray-900">
      {buildJsonLd(page).map(data => (
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
          {page.eyebrow}
        </p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          {page.heading}{' '}
          <mark className="bg-green-600/20 text-green-700 dark:text-green-300">
            {page.headingHighlight}
          </mark>
        </h1>
        <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
          {page.intro}
        </p>
        <div className="mt-10">
          <ContactUsButton location={page.ctaLocation} />
        </div>
      </Reveal>

      {/* Outcomes */}
      <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-800">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {page.outcomesHeading}
            </h2>
          </Reveal>
          <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {page.outcomes.map((outcome, index) => (
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

      {/* Proof */}
      {(project || quote || proof.links) && (
        <section
          id="proof-section"
          className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8"
        >
          <Reveal className="max-w-2xl">
            <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
              {proof.eyebrow}
            </p>
            {proofHeading && (
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {proofHeading}
              </h2>
            )}
            {proofIntro && (
              <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
                {proofIntro}
              </p>
            )}
            {project && (
              <p className="mt-4 text-sm font-semibold text-green-600 dark:text-green-400">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {displayDomain(project.url)}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            )}
          </Reveal>

          {proof.links && (
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {proof.links.map((link, index) => (
                <Reveal
                  key={link.href}
                  as="li"
                  index={index}
                  className="relative rounded-2xl p-6 ring-1 ring-gray-200 transition hover:ring-green-600/60 dark:ring-gray-700 dark:hover:ring-green-400/60"
                >
                  <Link
                    href={link.href}
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    <span className="absolute inset-0" />
                    {link.name}
                  </Link>
                  {link.description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {link.description}
                    </p>
                  )}
                </Reveal>
              ))}
            </ul>
          )}

          {(project || quote) && (
            <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
              {project && (
                <Reveal className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                  <Image
                    alt={`${project.name} website homepage`}
                    src={project.imageSrc}
                    width={1200}
                    height={750}
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="aspect-[8/5] w-full object-cover object-top"
                  />
                </Reveal>
              )}
              {quote && (
                <Reveal
                  as="figure"
                  index={1}
                  className="rounded-2xl bg-gray-50 p-8 dark:bg-gray-800"
                >
                  <blockquote className="text-lg/8 text-gray-700 dark:text-gray-300">
                    <p>&ldquo;{quote.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    {quote.imageSrc && (
                      <Image
                        alt={quote.name}
                        src={quote.imageSrc}
                        width={48}
                        height={48}
                        className="size-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {quote.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {quote.business}
                      </div>
                    </div>
                  </figcaption>
                </Reveal>
              )}
            </div>
          )}
        </section>
      )}

      {/* Good fit */}
      <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-800">
        <Reveal className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            {page.goodFitHeading}
          </h2>
          <ul className="mt-8 space-y-4">
            {page.goodFit.map(item => (
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
            {page.processHeading}
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
            {page.faqs.map(faq => (
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
