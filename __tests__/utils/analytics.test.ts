import { trackGenerateLead, trackSelectContent } from '../../src/app/utils/analytics';

describe('analytics helper', () => {
  afterEach(() => {
    delete (window as Window & { gtag?: unknown }).gtag;
  });

  it('sends select_content when gtag is available', () => {
    const gtag = jest.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;

    trackSelectContent({
      source: 'header_nav',
      destination: '/photography',
      label: 'Photography',
    });

    expect(gtag).toHaveBeenCalledWith('event', 'select_content', {
      source: 'header_nav',
      destination: '/photography',
      label: 'Photography',
    });
  });

  it('does not throw when gtag is unavailable', () => {
    expect(() =>
      trackGenerateLead({ source: 'contact_form', result: 'attempt' })
    ).not.toThrow();
  });
});
