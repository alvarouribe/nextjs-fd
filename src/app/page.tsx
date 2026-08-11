import Image from 'next/image';
import {
  ArrowPathIcon,
  PaintBrushIcon,
  PhoneIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import HeroSection from '../components/HeroSection';
import ContactForm from '@/components/ContactForm';
import ContactUsButton from '@/components/ContactUsButton';
import Reveal from '@/components/motion/Reveal';

const processSteps = [
  {
    step: '01',
    name: 'Discover',
    description:
      'We start with a free call to understand your business, your goals, and what success looks like for you.',
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

const features = [
  {
    name: 'Custom Design',
    description:
      'Your website will be tailored to your brand and goals, ensuring it reflects your unique identity while standing out online.',
    icon: PaintBrushIcon,
  },
  {
    name: 'Optimized Performance',
    description:
      'We build fast, reliable, and responsive websites that deliver seamless experiences across all devices.',
    icon: BoltIcon,
  },
  {
    name: 'Data-Driven Insights',
    description:
      'With built-in analytics, you’ll gain valuable insights into your visitors’ behavior to make informed business decisions.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Ongoing Support',
    description:
      'We’re here beyond launch, offering updates, guidance, and support to keep your website performing at its best.',
    icon: PhoneIcon,
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-green-600 dark:text-green-400">
              Deploy faster
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Everything{' '}
              <mark className="bg-green-600/20 text-green-300">
                your business needs
              </mark>{' '}
              to show off your work
            </p>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              After a quick consultation, we will create a custom website that
              meets your needs and exceeds your expectations. Our team will work
              with you to ensure that your website is not only visually stunning
              but also optimized for the best performance and user experience.
            </p>
          </Reveal>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature, index) => (
                <Reveal key={feature.name} index={index} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                    <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-green-600 dark:bg-green-600">
                      <feature.icon
                        aria-hidden="true"
                        className="size-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </dd>
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
                Ready to elevate your online presence?
              </h2>
              <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300 mb-10">
                Contact us now to schedule a consultation and let’s build
                something amazing together.
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
              No jargon and no surprises — just a clear path to a website that
              works for your business.
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
