import sitemap from '../src/app/sitemap';

describe('sitemap', () => {
  it('includes the privacy policy route with a low priority and yearly frequency', () => {
    const routes = sitemap();
    const privacyRoute = routes.find((route) => route.url.endsWith('/privacy-policy'));

    expect(privacyRoute).toBeDefined();
    expect(privacyRoute?.priority).toBe(0.3);
    expect(privacyRoute?.changeFrequency).toBe('yearly');
  });

  it('still includes the homepage as the highest-priority route', () => {
    const routes = sitemap();
    const homeRoute = routes.find((route) => route.url.endsWith('.co.nz/'));

    expect(homeRoute?.priority).toBe(1);
  });
});

describe('sitemap videography', () => {
  it('includes the videography summary page and one entry per video post', () => {
    const urls = sitemap().map((route) => route.url);
    expect(urls).toContain('https://www.flyingdolly.co.nz/videography');
    expect(urls.filter((url) => url.includes('/videography/')).length).toBeGreaterThan(0);
  });

  it('uses each video post publish date as its lastModified', () => {
    const route = sitemap().find((r) =>
      r.url.endsWith('/videography/guitardeon-latin-american-spring-festival-2026')
    );
    expect(route?.lastModified).toEqual(new Date('2026-10-06T10:10:33+00:00'));
  });
});
