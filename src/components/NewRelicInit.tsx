'use client';

import { useEffect } from 'react';
import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent';

export default function NewRelicInit() {
  useEffect(() => {
    const options = {
      init: {
        licenseKey: 'NRJS-da3c440ddd0b75688e3',
        applicationID: '1134628480',
        spa: true,
      },
      loader_config: {
        accountID: '4685155',
        trustKey: '4685155',
        agentID: '1134628480',
        beacon: 'bam.nr-data.net',
      },
    };

    const nrba = new BrowserAgent(options);
    return () => nrba.destroy?.();
  }, []);

  return null;
}
