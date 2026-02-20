type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: AnalyticsPayload) => void;
  }
}

export function trackEvent(name: string, params: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('portfolio:analytics', {
      detail: {
        name,
        params,
        timestamp: new Date().toISOString(),
      },
    })
  );

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
    return;
  }

  if (import.meta.env.DEV) {
    console.info('[analytics]', name, params);
  }
}

