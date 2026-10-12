import {
  trackContactClick,
  trackContactFormError,
  trackCtaClick,
  trackGenerateLead,
  trackSelectContent,
} from '../../src/app/utils/analytics';

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
    expect(() => trackGenerateLead({ source: 'contact_form' })).not.toThrow();
  });

  // generate_lead is the event marked as a key event in GA4, so it must
  // only ever mean "a real enquiry was sent".
  it('sends generate_lead with only the lead source', () => {
    const gtag = jest.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;

    trackGenerateLead({ source: 'contact_form' });

    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      source: 'contact_form',
    });
  });

  it('sends cta_click (not generate_lead) for a CTA button click', () => {
    const gtag = jest.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;

    trackCtaClick({ location: 'hero' });

    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith('event', 'cta_click', {
      location: 'hero',
    });
  });

  it('sends contact_form_error with the failure reason', () => {
    const gtag = jest.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;

    trackContactFormError({ reason: 'network' });

    expect(gtag).toHaveBeenCalledWith('event', 'contact_form_error', {
      reason: 'network',
    });
  });

  it('sends contact_click with the contact method', () => {
    const gtag = jest.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;

    trackContactClick({ method: 'phone' });

    expect(gtag).toHaveBeenCalledWith('event', 'contact_click', {
      method: 'phone',
    });
  });
});
