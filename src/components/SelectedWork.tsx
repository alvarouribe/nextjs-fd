'use client';

import Image from 'next/image';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Reveal from '@/components/motion/Reveal';
import { trackSelectContent } from '@/app/utils/analytics';
import { selectedWork } from '@/app/utils/site-content';

const displayDomain = (url: string) =>
  new URL(url).hostname.replace(/^www\./, '');

export default function SelectedWork() {
  if (selectedWork.length === 0) {
    return null;
  }

  return (
    <section
      id="selected-work-section"
      className="bg-white py-24 sm:py-32 dark:bg-gray-800"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base/7 font-semibold text-green-600 dark:text-green-400">
            Selected work
          </p>
          <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Websites we&apos;ve built
          </h2>
          <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
            From local trades to nonprofits and personal brands — a few of the
            sites we&apos;ve designed, built, and launched.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {selectedWork.map((project, index) => (
            <Reveal
              key={project.url}
              as="article"
              index={index}
              className="group relative flex flex-col"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:ring-green-600/60 dark:bg-gray-900 dark:ring-gray-700 dark:group-hover:ring-green-400/60">
                <div className="flex items-center gap-x-3 border-b border-gray-200 px-4 py-2.5 dark:border-gray-700">
                  <div aria-hidden="true" className="flex gap-x-1.5">
                    <span className="size-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="size-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="size-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                  </div>
                  <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {displayDomain(project.url)}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <Image
                    alt={`${project.name} website homepage`}
                    src={project.imageSrc}
                    width={1200}
                    height={750}
                    sizes="(min-width: 1024px) 384px, (min-width: 640px) 672px, 100vw"
                    className="aspect-[8/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-start justify-between gap-x-4">
                <div>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {project.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackSelectContent({
                          source: 'selected_work',
                          destination: project.url,
                          label: project.name,
                        })
                      }
                    >
                      <span className="absolute inset-0" />
                      {project.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="flex size-10 flex-none items-center justify-center rounded-full ring-1 ring-gray-300 transition-colors duration-300 group-hover:bg-green-600 group-hover:ring-green-600 dark:ring-gray-600"
                >
                  <ArrowUpRightIcon className="size-4 text-gray-700 group-hover:text-white dark:text-gray-300" />
                </span>
              </div>
              <p className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <li
                    key={tag}
                    className="rounded-full bg-green-600/10 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-400/10 dark:text-green-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
