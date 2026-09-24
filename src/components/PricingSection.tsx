import { pricingTiers } from '@/app/utils/site-content';
import Reveal from '@/components/motion/Reveal';

export default function PricingSection() {
  if (pricingTiers.length === 0) {
    return null;
  }

  return (
    <section
      id="pricing-section"
      className="bg-white py-24 sm:py-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Transparent starting prices
          </h2>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal
              key={tier.service}
              index={index}
              className="flex flex-col rounded-2xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tier.service}
              </h3>
              <p className="mt-4 text-3xl font-semibold text-green-600 dark:text-green-400">
                From {tier.startingFrom}
              </p>
              <p className="mt-4 flex-auto text-base/7 text-gray-600 dark:text-gray-400">
                {tier.description}
              </p>
              {tier.href && (
                <a
                  href={tier.href}
                  className="mt-6 font-semibold text-green-600 hover:text-green-500 dark:text-green-400"
                >
                  Learn more &rarr;
                </a>
              )}
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Final quotes depend on scope &mdash; get in touch for exact pricing.
        </p>
      </div>
    </section>
  );
}
