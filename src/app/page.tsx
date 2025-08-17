import Image from 'next/image';
import {
  ArrowPathIcon,
  PaintBrushIcon,
  PhoneIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import HeroSection from '../components/HeroSection';

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

      <section className="bg-white py-24 sm:py-32 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-green-600 dark:text-green-400">
              Deploy faster
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Everything you need to show off your work
            </p>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              After a quick consultation, we will create a custom website that
              meets your needs and exceeds your expectations. Our team will work
              with you to ensure that your website is not only visually stunning
              but also optimized for the best performance and user experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map(feature => (
                <div key={feature.name} className="relative pl-16">
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
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-green-600 dark:text-green-400">
              Get started today
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
              Ready to elevate your{' '}
              <span className="underline text-green-400">online presence</span>?
            </p>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              Contact us now to schedule a consultation and let’s build
              something amazing together.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="overflow-hidden bg-white py-32 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                  Ready to elevate your online presence?
                </h2>
                <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300">
                  Contact us now to schedule a consultation and let’s build
                  something amazing together.
                </p>

                <div className="mt-10 flex">
                  <a
                    href="#"
                    className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:bg-green-500 dark:hover:bg-green-400 dark:focus-visible:outline-green-500"
                  >
                    contact us!
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <Image
                    alt="Mount mauao"
                    src="/images/mount-maunganui-toby-hall.jpg"
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover max-sm:w-[30rem] dark:bg-gray-800"
                    width={600}
                    height={400}
                  />
                  {/* <img
                alt=""
                src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover max-sm:w-[30rem] dark:bg-gray-800"
              /> */}
                </div>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <div className="order-first flex w-64 flex-none justify-end self-end max-sm:w-40 lg:w-auto">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                      className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover dark:bg-gray-800"
                    />
                  </div>
                  <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover max-sm:w-[30rem] dark:bg-gray-800"
                    />
                  </div>
                  <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                      className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
