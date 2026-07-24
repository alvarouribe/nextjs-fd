import type { Metadata } from 'next';
import {
  BoltIcon,
  CheckCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import ContactUsButton from '@/components/ContactUsButton';

export const metadata: Metadata = {
  title: 'About FlyingDolly | Web Development & Content Studio, Mt Maunganui',
  description:
    'FlyingDolly builds high-performing websites, smart automations, and standout visual content for growing businesses in Mt Maunganui and across New Zealand.',
  alternates: {
    canonical: '/about',
  },
};

const beliefs = [
  {
    name: 'Clarity over complexity',
    description: 'Simple, well-built solutions that just work.',
    icon: SparklesIcon,
  },
  {
    name: 'Speed over perfection',
    description: 'Launch fast, then improve continuously.',
    icon: BoltIcon,
  },
  {
    name: 'Results over vanity',
    description: 'Everything we build has a clear purpose.',
    icon: CheckCircleIcon,
  },
];

export default function AboutPage() {
  return (
    <main data-test="about-page" className="bg-white dark:bg-gray-900">
      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 pt-40 pb-24 sm:pb-32 lg:px-8">
        <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
          About us
        </p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          We don&apos;t just build websites — we build{' '}
          <mark className="bg-green-600/20 text-green-700 dark:text-green-300">
            systems that grow your business
          </mark>
          .
        </h1>
        <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
          At FlyingDolly, we help businesses stand out online and operate
          smarter. We combine web development, automation, and visual content to
          create digital experiences that actually drive results.
        </p>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-3xl px-6 pb-24 sm:pb-32 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          Our approach
        </h2>
        <p className="mt-4 text-lg/8 text-gray-700 dark:text-gray-300">
          Most agencies focus on just one piece of the puzzle. We focus on the
          whole system. A great website without traffic won&apos;t grow your
          business, content without strategy won&apos;t convert, and manual
          processes will slow you down. That&apos;s why we bring everything
          together: high-performing websites, smart automations that save time,
          and video &amp; photography that captures attention.
        </p>
      </section>

      {/* Beliefs */}
      <section className="mx-auto max-w-5xl px-6 pb-24 sm:pb-32 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          What we believe
        </h2>
        <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {beliefs.map(belief => (
            <div key={belief.name} className="relative pl-14">
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-green-600">
                  <belief.icon
                    aria-hidden="true"
                    className="size-6 text-white"
                  />
                </div>
                {belief.name}
              </dt>
              <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                {belief.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-32 lg:px-8">
        <div className="rounded-2xl bg-gray-50 p-8 sm:p-12 dark:bg-gray-800">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Let&apos;s build something that works
          </h2>
          <p className="mt-4 text-lg/8 text-gray-700 dark:text-gray-300">
            If you&apos;re ready to improve your online presence and streamline
            your business, let&apos;s talk. Book a free call and we&apos;ll map
            out your next steps.
          </p>
          <div className="mt-8">
            <ContactUsButton location="about_page" />
          </div>
        </div>
      </section>
    </main>
  );
}
