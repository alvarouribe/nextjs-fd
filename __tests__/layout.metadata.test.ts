import { metadata } from '../src/app/layout';

describe('Root layout metadata', () => {
  it('has an SEO-optimised title with agency type, location and brand', () => {
    expect(metadata.title).toBe(
      'Web Development Agency Mt Maunganui | Custom Websites NZ | FlyingDolly'
    );
  });

  it('has a meta description between 150 and 160 characters', () => {
    const description = metadata.description as string;
    expect(description.length).toBeGreaterThanOrEqual(150);
    expect(description.length).toBeLessThanOrEqual(160);
  });

  it('meta description mentions services, location and a value proposition', () => {
    const description = (metadata.description as string).toLowerCase();
    expect(description).toMatch(/website/);
    expect(description).toMatch(/mt maunganui|new zealand|nz/);
    expect(description).toMatch(/design|develop|build/);
  });
});
