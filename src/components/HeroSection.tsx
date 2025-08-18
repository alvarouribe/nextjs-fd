import Image from 'next/image';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <div className="bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14">
        <Image
          alt="earth from above"
          // src="/images/working.jpg"
          // src="/images/studio-blend-med.jpg"
          src="/images/earth-from-above-low.jpg"
          className="absolute inset-0 -z-10 size-full object-cover opacity-30"
          width={1280}
          height={840}
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                Make us your{' '}
                <span className="underline text-green-400">technology</span>{' '}
                partner
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-green-200 sm:text-xl/8">
                We create visually stunning websites with powerful analytics,
                giving you the insights you need to grow your business online.
              </p>
            </div>
          </div>
          <div className="mb-12 flex items-center justify-center opacity-25">
            <ArrowDownCircleIcon className="size-8 text-white" />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
