import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import type { Metadata } from 'next';

import AutomationPage, {
  metadata as automationMetadata,
} from '../../src/app/business-automation-bay-of-plenty/page';
import PhotographyVideoPage, {
  metadata as photographyVideoMetadata,
} from '../../src/app/commercial-photography-tauranga/page';
import { type ServicePageContent, servicePages } from '../../src/app/utils/service-pages';
import WebDesignPage, {
  metadata as webDesignMetadata,
} from '../../src/app/web-design-tauranga/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const SITE_URL = 'https://www.flyingdolly.co.nz';

type JsonLdNode = Record<string, unknown> & { '@type': string };

const jsonLdOfType = (type: string): JsonLdNode | undefined =>
  Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => JSON.parse(script.textContent ?? '{}') as JsonLdNode)
    .find((node) => node['@type'] === type);

const cases: Array<{
  page: ServicePageContent;
  Component: () => React.JSX.Element;
  metadata: Metadata;
  keyword: RegExp;
  place: RegExp;
}> = [
  {
    page: servicePages.webDesign,
    Component: WebDesignPage,
    metadata: webDesignMetadata,
    keyword: /web design/i,
    place: /Tauranga/,
  },
  {
    page: servicePages.automation,
    Component: AutomationPage,
    metadata: automationMetadata,
    keyword: /business automation/i,
    place: /Bay of Plenty/,
  },
  {
    page: servicePages.photographyVideo,
    Component: PhotographyVideoPage,
    metadata: photographyVideoMetadata,
    keyword: /commercial photography/i,
    place: /Tauranga/,
  },
];

describe.each(cases)('$page.path', ({ page, Component, metadata, keyword, place }) => {
  describe('metadata', () => {
    it('sets the canonical to the page path', () => {
      expect(metadata.alternates?.canonical).toBe(page.path);
    });

    it('targets the keyword and place in a title of 60 characters or fewer', () => {
      const title = metadata.title as string;
      expect(title).toMatch(keyword);
      expect(title).toMatch(place);
      expect(title).toMatch(/FlyingDolly/);
      expect(title.length).toBeLessThanOrEqual(60);
    });

    it('has a description of 120–160 characters naming the place', () => {
      const description = metadata.description as string;
      expect(description.length).toBeGreaterThanOrEqual(120);
      expect(description.length).toBeLessThanOrEqual(160);
      expect(description).toMatch(place);
    });
  });

  describe('content', () => {
    beforeEach(() => {
      render(<Component />);
    });

    it('renders a single H1 with the keyword and place', () => {
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
      expect(headings[0].textContent).toMatch(keyword);
      expect(headings[0].textContent).toMatch(place);
    });

    it('shows the four-step process', () => {
      for (const step of ['Discover', 'Build', 'Launch', 'Grow']) {
        expect(screen.getByRole('heading', { name: step })).toBeInTheDocument();
      }
    });

    it('renders every FAQ question and answer', () => {
      for (const faq of page.faqs) {
        expect(screen.getByText(faq.question)).toBeInTheDocument();
        expect(screen.getByText(faq.answer)).toBeInTheDocument();
      }
    });

    it('shows a real client testimonial as proof', () => {
      const proof = within(document.getElementById('proof-section') as HTMLElement);
      expect(proof.getByRole('blockquote')).toBeInTheDocument();
    });

    it('ends with the contact form, so the CTA buttons scroll to it', () => {
      const contact = document.getElementById('contact-form-section');
      expect(contact).toBeInTheDocument();
      expect(
        within(contact as HTMLElement).getByRole('button', { name: /let's talk/i })
      ).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /get a free quote/i }).length).toBeGreaterThan(
        0
      );
    });
  });

  describe('JSON-LD', () => {
    beforeEach(() => {
      render(<Component />);
    });

    it('describes a Service provided by the FlyingDolly business', () => {
      const service = jsonLdOfType('Service');
      expect(service).toMatchObject({
        serviceType: page.serviceType,
        url: `${SITE_URL}${page.path}`,
        provider: { '@id': `${SITE_URL}/#business` },
      });
      expect(JSON.stringify(service?.areaServed)).toMatch(/Bay of Plenty/);
    });

    it('includes a breadcrumb from Home to this page', () => {
      const breadcrumb = jsonLdOfType('BreadcrumbList');
      const items = breadcrumb?.itemListElement as Array<{ item: string }>;
      expect(items.map((item) => item.item)).toEqual([`${SITE_URL}/`, `${SITE_URL}${page.path}`]);
    });

    it('mirrors the visible FAQs exactly in FAQPage markup', () => {
      const faqPage = jsonLdOfType('FAQPage');
      const entities = faqPage?.mainEntity as Array<{
        name: string;
        acceptedAnswer: { text: string };
      }>;
      expect(entities.map((entity) => [entity.name, entity.acceptedAnswer.text])).toEqual(
        page.faqs.map((faq) => [faq.question, faq.answer])
      );
    });
  });
});

describe('page-specific proof', () => {
  it('web design shows the BOP Gutter CleaNZ case study with its site link', () => {
    render(<WebDesignPage />);
    const proof = within(document.getElementById('proof-section') as HTMLElement);
    expect(proof.getByRole('heading', { name: 'BOP Gutter CleaNZ' })).toBeInTheDocument();
    expect(proof.getByText(/Glenn Robert/)).toBeInTheDocument();
    expect(proof.getByRole('link', { name: /bopguttercleanz/i })).toHaveAttribute(
      'href',
      'https://www.bopguttercleanz.co.nz/'
    );
  });

  it('photography & video links to the real galleries and shows the Euphoria Events quote', () => {
    render(<PhotographyVideoPage />);
    const proof = within(document.getElementById('proof-section') as HTMLElement);
    expect(proof.getByText(/Jose Lavin/)).toBeInTheDocument();
    for (const href of [
      '/photography/portraits',
      '/photography/go-freek-2026-tauranga',
      '/videography',
    ]) {
      expect(proof.getAllByRole('link').some((link) => link.getAttribute('href') === href)).toBe(
        true
      );
    }
  });
});
