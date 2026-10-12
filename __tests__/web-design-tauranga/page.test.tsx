import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';

import { faqs } from '../../src/app/web-design-tauranga/content';
import WebDesignTaurangaPage, { metadata } from '../../src/app/web-design-tauranga/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

type JsonLdNode = Record<string, unknown> & { '@type': string };

const jsonLdOfType = (type: string): JsonLdNode | undefined =>
  Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => JSON.parse(script.textContent ?? '{}') as JsonLdNode)
    .find((node) => node['@type'] === type);

describe('Web design Tauranga page metadata', () => {
  it('sets a canonical pointing at /web-design-tauranga', () => {
    expect(metadata.alternates?.canonical).toBe('/web-design-tauranga');
  });

  it('targets "web design" and "Tauranga" in a title under 60 characters', () => {
    const title = metadata.title as string;
    expect(title).toMatch(/web design/i);
    expect(title).toMatch(/Tauranga/);
    expect(title).toMatch(/FlyingDolly/);
    expect(title.length).toBeLessThanOrEqual(60);
  });

  it('has a description between 120 and 160 characters mentioning Tauranga', () => {
    const description = metadata.description as string;
    expect(description.length).toBeGreaterThanOrEqual(120);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(description).toMatch(/Tauranga/);
  });
});

describe('Web design Tauranga page content', () => {
  beforeEach(() => {
    render(<WebDesignTaurangaPage />);
  });

  it('renders a single H1 with the target keyword and place', () => {
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toMatch(/web design/i);
    expect(headings[0].textContent).toMatch(/Tauranga/);
    expect(headings[0].textContent).toMatch(/Bay of Plenty/);
  });

  it('shows the BOP Gutter CleaNZ case study with its client quote', () => {
    const caseStudy = document.getElementById('case-study-section');
    expect(caseStudy).toBeInTheDocument();
    const section = within(caseStudy as HTMLElement);
    expect(section.getByRole('heading', { name: 'BOP Gutter CleaNZ' })).toBeInTheDocument();
    expect(section.getByText(/Glenn Robert/)).toBeInTheDocument();
    expect(section.getByRole('link', { name: /bopguttercleanz/i })).toHaveAttribute(
      'href',
      'https://www.bopguttercleanz.co.nz/'
    );
  });

  it('shows the four-step process', () => {
    for (const step of ['Discover', 'Build', 'Launch', 'Grow']) {
      expect(screen.getByRole('heading', { name: step })).toBeInTheDocument();
    }
  });

  it('renders every FAQ question and answer', () => {
    for (const faq of faqs) {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
      expect(screen.getByText(faq.answer)).toBeInTheDocument();
    }
  });

  it('ends with the contact form, so the CTA buttons scroll to it', () => {
    const contact = document.getElementById('contact-form-section');
    expect(contact).toBeInTheDocument();
    expect(
      within(contact as HTMLElement).getByRole('button', { name: /let's talk/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /get a free quote/i }).length).toBeGreaterThan(0);
  });
});

describe('Web design Tauranga page JSON-LD', () => {
  beforeEach(() => {
    render(<WebDesignTaurangaPage />);
  });

  it('describes a web design Service provided by the FlyingDolly business', () => {
    const service = jsonLdOfType('Service');
    expect(service).toMatchObject({
      serviceType: 'Web design',
      url: 'https://www.flyingdolly.co.nz/web-design-tauranga',
      provider: { '@id': 'https://www.flyingdolly.co.nz/#business' },
    });
    expect(JSON.stringify(service?.areaServed)).toMatch(/Tauranga/);
    expect(JSON.stringify(service?.areaServed)).toMatch(/Bay of Plenty/);
  });

  it('includes a breadcrumb from Home to this page', () => {
    const breadcrumb = jsonLdOfType('BreadcrumbList');
    const items = breadcrumb?.itemListElement as Array<{ name: string; item: string }>;
    expect(items.map((item) => item.item)).toEqual([
      'https://www.flyingdolly.co.nz/',
      'https://www.flyingdolly.co.nz/web-design-tauranga',
    ]);
  });

  it('mirrors the visible FAQs exactly in FAQPage markup', () => {
    const faqPage = jsonLdOfType('FAQPage');
    const entities = faqPage?.mainEntity as Array<{
      name: string;
      acceptedAnswer: { text: string };
    }>;
    expect(entities.map((entity) => [entity.name, entity.acceptedAnswer.text])).toEqual(
      faqs.map((faq) => [faq.question, faq.answer])
    );
  });
});
