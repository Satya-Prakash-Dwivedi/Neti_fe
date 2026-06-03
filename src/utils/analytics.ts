import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

export const initPostHog = () => {
  if (typeof window !== 'undefined' && POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only', // or 'always' if you want to create profiles for anonymous users as well
      capture_pageview: false, // We will handle this manually or let PostHog handle it
      loaded: (ph) => {
        if (import.meta.env.DEV) ph.debug(); // Enable debug mode in development
      },
    });
  }
};

export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  posthog.capture(eventName, properties);
};

export const identifyUser = (distinctId: string, properties?: Record<string, any>) => {
  posthog.identify(distinctId, properties);
};

export const resetUser = () => {
  posthog.reset();
};
