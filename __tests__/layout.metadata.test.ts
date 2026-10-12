import { jsonLd, metadata } from '../src/app/layout';
import { contactDetails } from '../src/app/utils/site-content';

describe('Root layout metadata', () => {
  it('has an SEO-optimised title reflecting the systems positioning (websites, automation, photography)', () => {
    expect(metadata.title).toBe(
      'Web Design, Automation & Photography in Mt Maunganui | FlyingDolly'
    );
  });

  it('has a meta description between 150 and 160 characters', () => {
    const description = metadata.description as string;
    expect(description.length).toBeGreaterThanOrEqual(150);
    expect(description.length).toBeLessThanOrEqual(160);
  });

  it('meta description mentions all three services, location and a value proposition', () => {
    const description = (metadata.description as string).toLowerCase();
    expect(description).toMatch(/website/);
    expect(description).toMatch(/automation/);
    expect(description).toMatch(/photography|video/);
    expect(description).toMatch(/mt maunganui|new zealand|nz/);
    expect(description).toMatch(/design|develop|build|grow/);
  });

  it('keeps the canonical pointing at the homepage', () => {
    expect(metadata.alternates?.canonical).toBe('/');
  });
});

describe('Root layout JSON-LD', () => {
  it('lists business automation and video production alongside the existing services', () => {
    expect(jsonLd.knowsAbout).toEqual(
      expect.arrayContaining(['Business automation', 'Video production'])
    );
  });

  it('includes the phone and email from site content, so they stay in sync', () => {
    expect(jsonLd.telephone).toBe(contactDetails.phone);
    expect(jsonLd.email).toBe(contactDetails.email);
  });

  it('serves the wider Bay of Plenty, not just Mount Maunganui and Tauranga', () => {
    const names = jsonLd.areaServed.map((area) => area.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'Bay of Plenty',
        'Mount Maunganui',
        'Tauranga',
        'Papamoa',
        'Te Puke',
        'Katikati',
        'Rotorua',
        'Whakatane',
      ])
    );
    expect(jsonLd.areaServed).toContainEqual({
      '@type': 'AdministrativeArea',
      name: 'Bay of Plenty',
    });
  });
});
