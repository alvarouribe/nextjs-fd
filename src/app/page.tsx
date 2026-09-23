import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowPathIcon,
  CameraIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';
import HeroSection from '../components/HeroSection';
import ContactForm from '@/components/ContactForm';
import ContactUsButton from '@/components/ContactUsButton';
import PricingSection from '@/components/PricingSection';
import Testimonials from '@/components/Testimonials';
import Reveal from '@/components/motion/Reveal';

const processSteps = [
  {
    step: '01',
    name: 'Discover',
    description:
      'We start with a free, no-obligation quote — a quick chat to understand your business, your goals, and what success looks like for you.',
  },
  {
    step: '02',
    name: 'Build',
    description:
      'We design and develop your website, automation, or content — keeping you in the loop at every stage.',
  },
  {
    step: '03',
    name: 'Launch',
    description:
      'We go live fast, handle the technical details, and make sure everything works flawlessly across devices.',
  },
  {
    step: '04',
    name: 'Grow',
    description:
      'Beyond launch we optimise, support, and scale — so your site keeps performing as your business grows.',
  },
];

const services = [
  {
    name: 'Websites',
    description:
      'Custom design, fast performance, and SEO-ready pages built to convert visitors into customers.',
    icon: PaintBrushIcon,
    crossSell: {
      label: 'Already have a website? Add automation →',
      href: '#contact-form-section',
    },
  },
  {
    name: 'Automation',
    description:
      'Booking, lead follow-up, invoicing, and admin workflows that save your business hours every week.',
    icon: ArrowPathIcon,
    crossSell: {
      label: 'Need a new site too? Let’s talk →',
      href: '#contact-form-section',
    },
  },
  {
    name: 'Photography & Video',
    description:
      'Product, portrait, and event content that shows your business off at its best.',
    icon: CameraIcon,
    crossSell: {
      label: 'See our photography & video work →',
      href: '/photography',
    },
  },
];

export default function Home() {
  return (
    <main data-test="home-page">
      <HeroSection />

      <section
        id="features-section"
        className="bg-white py-24 sm:py-32 dark:bg-gray-900"
      >
        <div id="services-section" className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-green-600 dark:text-green-400">
              One team, one system
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Everything{' '}
              <mark className="bg-green-600/20 text-green-300">
                your business needs
              </mark>{' '}
              to grow online
            </p>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              Websites, automation, and photography/video — built and run by the
              same team, so nothing falls through the cracks between vendors.
            </p>
            <p className="mt-4 text-base/7 text-gray-600 dark:text-gray-400">
              Most agencies hand you off between three different vendors. One
              team beats three vendors: no hand-offs, no mixed messages — just
              one system that keeps your website, automation, and content
              working together as your business grows.
            </p>
          </Reveal>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {services.map((service, index) => (
                <Reveal
                  key={service.name}
                  index={index}
                  className="relative pl-16"
                >
                  <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-green-600 dark:bg-green-600">
                      <service.icon
                        aria-hidden="true"
                        className="size-6 text-white"
                      />
                    </div>
                    {service.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                    {service.description}
                  </dd>
                  <p className="mt-3 text-sm font-semibold text-green-600 dark:text-green-400">
                    <Link href={service.crossSell.href}>
                      {service.crossSell.label}
                    </Link>
                  </p>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-32 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <Reveal className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                One system for your website, automation, and content
              </h2>
              <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300 mb-10">
                Stop juggling three different vendors. Get a free quote and see
                how we can grow your online presence and streamline your
                operations together.
              </p>

              <ContactUsButton location="mid_page" />
            </Reveal>

            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <Reveal
                index={0}
                className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end"
              >
                <Image
                  alt="Mount Maunganui - Mauao"
                  src="/images/mount-maunganui-toby-hall.jpg"
                  className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover max-sm:w-[30rem] dark:bg-gray-800"
                  width={600}
                  height={400}
                />
              </Reveal>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <Reveal
                  index={1}
                  className="order-first flex w-64 flex-none justify-end self-end max-sm:w-40 lg:w-auto"
                >
                  <Image
                    alt="Relax beach meeting"
                    src="/images/beach-red.jpg"
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover dark:bg-gray-800"
                    width={600}
                    height={450}
                  />
                </Reveal>
                <Reveal
                  index={2}
                  className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none"
                >
                  <Image
                    alt="relax office meeting"
                    src="/images/meetup.jpg"
                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover max-sm:w-[30rem] dark:bg-gray-800"
                    width={600}
                    height={400}
                  />
                </Reveal>
                <Reveal
                  index={3}
                  className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none"
                >
                  <Image
                    alt="volleyball game"
                    src="/images/volleyball.jpg"
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover dark:bg-gray-800"
                    width={600}
                    height={450}
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="process-section"
        className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-green-600 dark:text-green-400">
              How we work
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              A simple process, from idea to launch
            </p>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              No jargon and no surprises — just a clear path to a website,
              automation, and content that all work for your business.
            </p>
          </Reveal>
          <div className="relative mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
            <Reveal
              aria-hidden="true"
              className="process-rail absolute inset-x-0 top-11 -z-10 hidden h-px bg-gray-300 lg:block dark:bg-gray-700"
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((item, index) => (
                <Reveal
                  key={item.step}
                  index={index}
                  step={200}
                  className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800 dark:ring-gray-700"
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
          </div>
        </div>
      </section>

      <PricingSection />

      <Testimonials />

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
