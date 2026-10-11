'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackSelectContent } from '@/app/utils/analytics';
import { PhotographyAlbums } from '@/app/utils/navigation-links';

export default function PhotographyAlbumNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Photography albums" className="mb-10">
      <ul className="flex flex-wrap gap-3">
        {PhotographyAlbums.map(album => {
          const isCurrent = pathname === album.href;
          return (
            <li key={album.href}>
              <Link
                href={album.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={`inline-block rounded-full px-4 py-2 text-sm font-semibold tracking-wide ring-1 transition-colors ${
                  isCurrent
                    ? 'bg-green-600 text-white ring-green-600'
                    : 'text-gray-300 ring-gray-700 hover:text-white hover:ring-green-400'
                }`}
                onClick={() =>
                  trackSelectContent({
                    source: 'photography_albums',
                    destination: album.href,
                    label: album.name,
                  })
                }
              >
                {album.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
