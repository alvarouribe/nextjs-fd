'use client';

type EventParams = Record<string, string | number | boolean | undefined>;

type GtagFn = (
  command: 'event',
  eventName: string,
  eventParams?: EventParams
) => void;

type WindowWithGtag = Window & {
  gtag?: GtagFn;
};

const sendEvent = (eventName: string, eventParams: EventParams) => {
  if (typeof window === 'undefined') return;

  const { gtag } = window as WindowWithGtag;
  if (typeof gtag !== 'function') return;

  gtag('event', eventName, eventParams);
};

export type SelectContentParams = {
  source: string;
  destination: string;
  label: string;
};

// generate_lead is the GA4 key event: send it only when an enquiry has
// actually been sent, never for clicks or attempts.
export type GenerateLeadParams = {
  source: 'contact_form';
};

export type CtaClickParams = {
  location: string;
};

export type ContactFormErrorParams = {
  reason: 'api' | 'network';
};

export type ContactClickParams = {
  method: 'email' | 'phone';
};

export const trackSelectContent = (params: SelectContentParams) => {
  sendEvent('select_content', params);
};

export const trackGenerateLead = (params: GenerateLeadParams) => {
  sendEvent('generate_lead', params);
};

export const trackCtaClick = (params: CtaClickParams) => {
  sendEvent('cta_click', params);
};

export const trackContactFormError = (params: ContactFormErrorParams) => {
  sendEvent('contact_form_error', params);
};

export const trackContactClick = (params: ContactClickParams) => {
  sendEvent('contact_click', params);
};
