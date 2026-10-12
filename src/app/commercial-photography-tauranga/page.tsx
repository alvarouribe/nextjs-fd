import type { Metadata } from 'next';
import ServicePage, { servicePageMetadata } from '@/components/ServicePage';
import { servicePages } from '@/app/utils/service-pages';

const page = servicePages.photographyVideo;

export const metadata: Metadata = servicePageMetadata(page);

export default function CommercialPhotographyPage() {
  return <ServicePage page={page} />;
}
