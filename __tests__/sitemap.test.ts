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
