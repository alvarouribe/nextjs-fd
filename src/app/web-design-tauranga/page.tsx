import type { Metadata } from 'next';
import ServicePage, { servicePageMetadata } from '@/components/ServicePage';
import { servicePages } from '@/app/utils/service-pages';

const page = servicePages.webDesign;

export const metadata: Metadata = servicePageMetadata(page);

export default function WebDesignTaurangaPage() {
  return <ServicePage page={page} />;
}
