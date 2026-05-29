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

export type GenerateLeadParams = {
  source: string;
  location?: string;
  result?: 'attempt' | 'success' | 'error';
};

export const trackSelectContent = (params: SelectContentParams) => {
  sendEvent('select_content', params);
};

export const trackGenerateLead = (params: GenerateLeadParams) => {
  sendEvent('generate_lead', params);
};
