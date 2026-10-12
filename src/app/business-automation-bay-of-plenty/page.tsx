import type { Metadata } from 'next';
import ServicePage, { servicePageMetadata } from '@/components/ServicePage';
import { servicePages } from '@/app/utils/service-pages';

const page = servicePages.automation;

export const metadata: Metadata = servicePageMetadata(page);

export default function BusinessAutomationPage() {
  return <ServicePage page={page} />;
}
