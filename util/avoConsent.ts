// Contract of window.avoConsent, defined by public/consent-bootstrap.js, which
// _document.tsx loads before the Next.js bundle.
export type AvoConsentDestinationOptions = {
  mixpanel: Record<string, unknown>;
  segment: { disableClientPersistence?: boolean };
  fullstory: Record<string, unknown>;
};

export type AvoConsent = {
  state: { anonymous: boolean; purposes: Record<string, boolean> | null };
  apply: (purposes: Record<string, boolean> | null) => void;
  bindDestinations: (instances: {
    analytics?: unknown;
    mixpanel?: unknown;
    // Returns a fresh Segment instance built for the current consent state.
    reloadAnalytics?: () => unknown;
  }) => void;
  avoDestinationOptions: () => AvoConsentDestinationOptions;
  storedPurposes: () => Record<string, boolean> | null;
  // Wraps Avo Inspector so it is only created, and only reports, while analytics is allowed.
  gatedInspector: (create: () => object) => object;
};

declare global {
  interface Window {
    avoConsent?: AvoConsent;
  }
}

export const getAvoConsent = (): AvoConsent | undefined =>
  typeof window === 'undefined' ? undefined : window.avoConsent;
