import type { Metadata } from 'next';
import Link from 'next/link';
import ChangeCookiePreferencesButton from '@/components/ChangeCookiePreferencesButton';
import Reveal from '@/components/motion/Reveal';

// NOTE TO OWNER: this policy was drafted by an engineering agent to cover
// the data FlyingDolly's site currently collects (contact form + optional
// GA4 analytics). Please review it — especially the retention period and
// the Privacy Commissioner contact details — before this branch merges.

export const metadata: Metadata = {
  title: 'Privacy Policy | FlyingDolly',
  description:
    "How FlyingDolly collects, uses, and protects your personal information, in line with New Zealand's Privacy Act 2020.",
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main data-test="privacy-policy-page" className="bg-white dark:bg-gray-900">
      <Reveal
        as="section"
        className="mx-auto max-w-3xl px-6 pt-40 pb-16 lg:px-8"
      >
        <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
          Privacy
        </p>
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Privacy policy
        </h1>
        <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
          FlyingDolly (&quot;we&quot;, &quot;us&quot;) is a web design,
          automation, and photography/video studio based in Mount Maunganui, Bay
          of Plenty, New Zealand. This policy explains what personal information
          we collect through flyingdolly.co.nz, why we collect it, and your
          rights under New Zealand&apos;s Privacy Act 2020.
        </p>
      </Reveal>

      <div className="mx-auto max-w-3xl space-y-12 px-6 pb-32 lg:px-8">
        <Reveal as="section">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Information we collect
          </h2>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            When you use our contact form, we collect the name, email address,
            and message you provide, so we can reply to your enquiry. We
            don&apos;t ask for anything more than we need to get back to you.
          </p>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            If you accept our cookie banner, we also collect anonymised usage
            analytics via Google Analytics 4 (GA4) — pages visited, general
            location, and device type. GA4 only runs after you give consent; if
            you decline, or don&apos;t make a choice, no analytics cookies are
            set and no analytics data is collected.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Why we collect it
          </h2>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            We use contact form details solely to respond to your enquiry about
            websites, automation, or photography/video services. Analytics data
            (only ever collected with your consent) helps us understand which
            pages are useful and where to improve the site.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Storage and disclosure
          </h2>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            Contact form submissions are sent as email via Zoho Mail. Where
            you&apos;ve given consent, analytics data is processed by Google
            Analytics. The site itself is hosted on Vercel, and photography
            gallery images are served via Cloudinary. Each of these providers
            processes data on our behalf under their own privacy and security
            terms. We do not sell your personal information, and we don&apos;t
            share it with anyone else.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            How long we keep it
          </h2>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            We keep contact form emails for as long as is reasonably needed to
            respond to and follow up your enquiry, and then delete them.
            Analytics data is retained by Google Analytics according to its own
            retention settings. Your cookie consent choice is stored in your
            browser for up to 365 days.
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Your rights
          </h2>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            Under the Privacy Act 2020, you have the right to request access to
            the personal information we hold about you, and to request
            correction of it if it&apos;s wrong. To make a request, get in touch
            through our{' '}
            <Link
              href="/#contact-form-section"
              className="font-medium text-green-600 underline hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              contact form
            </Link>
            .
          </p>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            If you&apos;re unhappy with how we&apos;ve handled your personal
            information and we haven&apos;t been able to resolve it, you can
            complain to the Office of the{' '}
            <a
              href="https://www.privacy.org.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-600 underline hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              Privacy Commissioner
            </a>
            .
          </p>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Cookie preferences
          </h2>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            You can change your mind about analytics cookies at any time.
          </p>
          <div className="mt-6">
            <ChangeCookiePreferencesButton />
          </div>
        </Reveal>

        <Reveal as="section">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Contact us
          </h2>
          <p className="mt-4 text-base/7 text-gray-700 dark:text-gray-300">
            Questions about this policy or your personal information? Reach us
            via the{' '}
            <Link
              href="/#contact-form-section"
              className="font-medium text-green-600 underline hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              contact form
            </Link>{' '}
            on our homepage.
          </p>
        </Reveal>
      </div>
    </main>
  );
}
