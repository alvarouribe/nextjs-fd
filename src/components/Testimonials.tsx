import Image from 'next/image';
import { testimonials } from '@/app/utils/site-content';
import Reveal from '@/components/motion/Reveal';

export default function Testimonials() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials-section"
      className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            What our clients say
          </h2>
        </Reveal>
        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:max-w-none lg:flex-row lg:flex-wrap lg:justify-center">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={`${testimonial.name}-${testimonial.business}`}
              as="figure"
              index={index}
              className="flex flex-col rounded-2xl bg-white p-8 lg:w-[calc((100%-4rem)/3)] shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
            >
              <blockquote className="flex-auto text-base/7 text-gray-700 dark:text-gray-300">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                {testimonial.imageSrc && (
                  <Image
                    alt={testimonial.name}
                    src={testimonial.imageSrc}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonial.business}
                  </div>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
