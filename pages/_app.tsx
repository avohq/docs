import { FunctionComponent, useEffect } from 'react';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import mixpanel, { Config as MixpanelConfig } from 'mixpanel-browser';
import * as Inspector from "ssr-web-avo-inspector";

import Avo, { AvoEnv, CustomDestination } from '../Avo';
import { contentCopied } from '../AvoEvents/contentCopied';
import { docsPageViewed } from '../AvoEvents/docsPageViewed';
import useAvoPath from '../util/useAvoPath';
import { getAvoConsent } from '../util/avoConsent';
import '../styles/cookie-banner.css';

const getAvoEnv = () => {
  switch (process.env.NEXT_PUBLIC_AVO_ENV) {
    case 'production':
      return AvoEnv.Prod;
    case 'staging':
      return AvoEnv.Staging;
    case 'development':
    default:
      return AvoEnv.Dev;
  }
};

const getAvoInspectorEnv = () => {
  switch (process.env.NEXT_PUBLIC_AVO_ENV) {
    case 'production':
      return Inspector.AvoInspectorEnv.Prod;
    case 'staging':
      return Inspector.AvoInspectorEnv.Staging;
    case 'development':
    default:
      return Inspector.AvoInspectorEnv.Dev;
  }
};

let analytics: AnalyticsBrowser | undefined;
let segmentWriteKey: string | undefined;
let consentDestinationsBound = false;

// analytics-next fixes client persistence when it is created, so the consent
// layer asks for a new instance whenever the visitor's choice changes. With no
// consent layer at all (bootstrap missing) Segment is never created: the
// destination methods all go through `analytics?.`, so events are dropped.
const loadSegment = () => {
  const consent = getAvoConsent();
  if (segmentWriteKey === undefined || consent === undefined) return analytics;
  analytics = AnalyticsBrowser.load(
    { writeKey: segmentWriteKey },
    consent.avoDestinationOptions().segment,
  );
  return analytics;
};

const segmentDestinationInterface: CustomDestination = {
  make: (_env, apiKey) => {
    segmentWriteKey = apiKey;
    loadSegment();
  },

  identify: (userId) => analytics?.identify(userId),

  logEvent: (eventName, eventProperties) =>
    analytics?.track(eventName, eventProperties),

  setUserProperties: (userProperties) => analytics?.identify(userProperties),

  unidentify: () => analytics?.reset(),

  logPage: (eventName, eventProperties) =>
    analytics?.page(eventName, eventProperties),

  revenue: (amount: number, eventProperties: object) =>
    analytics?.track('Purchase Complete', {
      ...eventProperties,
      revenue: amount,
    }),

  setGroupProperties: (_groupType, groupId, groupProperties) =>
    analytics?.group(groupId, groupProperties),

  addCurrentUserToGroup: (_groupType, groupId) => analytics?.group(groupId),

  // logEventWithGroups is not supported by the Segment SDK
  // logEventWithGroups: (eventName, eventProperties, groupTypesToGroupIds) => {},
};

const mixpanelDestinationInterface: CustomDestination = {
  make: (env, apiKey) => {
    const consent = getAvoConsent();
    // No consent layer: memory-only init, then nothing may be sent.
    const consentOptions = consent
      ? consent.avoDestinationOptions().mixpanel
      : { disable_persistence: true, batch_requests: false, ip: false };
    mixpanel.init(apiKey, {
      debug: env != AvoEnv.Prod,
      ignore_dnt: env == AvoEnv.Dev,
      ...(consentOptions as Partial<MixpanelConfig>),
    });
    if (consent === undefined) mixpanel.disable();
  },

  identify: (userId) => mixpanel.identify(userId),

  logEvent: (eventName, eventProperties) =>
    mixpanel.track(eventName, eventProperties),

  setUserProperties: (_userId, userProperties) =>
    mixpanel.people.set(userProperties),

  unidentify: () => mixpanel.reset(),

  addCurrentUserToGroup: (groupTypeName, groupId) =>
    mixpanel.set_group(groupTypeName, groupId),

  logEventWithGroups: (eventName, eventProperties, groupTypeNamesToGroupIds) =>
    mixpanel.track_with_groups(
      eventName,
      eventProperties,
      groupTypeNamesToGroupIds,
    ),

  setGroupProperties: (groupTypeName, groupId, groupProperties) =>
    mixpanel.get_group(groupTypeName, groupId).set(groupProperties),

  // revenue: (amount, eventProperties) => {}
  // Mixpanel does not support revenue tracking out of the box.
};

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const consent = getAvoConsent();
  if (consent === undefined && typeof window !== 'undefined') {
    // Fail closed without Avo's `noop` (the generated SDK forces it off in
    // production): Segment is not created, Mixpanel is disabled in its `make`,
    // and FullStory must not capture since nothing will ever start it.
    (window as unknown as Record<string, unknown>)._fs_capture_on_startup = false;
    console.warn('[consent] bootstrap missing; analytics disabled for this page load');
  }
  Avo.initAvo(
    {
      env: getAvoEnv(),
      // No consent layer means no Inspector: it stores an installation id.
      inspector: consent?.gatedInspector(
        () =>
          new Inspector.AvoInspector({
            apiKey: "mT3lTbBrUn6bYCxICbcz",
            env: getAvoInspectorEnv(),
            version: "1.0.0",
            appName: "Avo Docs",
            suffix: "main",
            publicEncryptionKey: "024ec9c17ea2fb3e727d2815941eeb7d7c6e551536c9e2dde37fbbf0ffb9850579"
          }),
      ),
    },
    { client: 'Docs', version: '2.0' },
    consent ? consent.avoDestinationOptions() : {},
    segmentDestinationInterface,
    mixpanelDestinationInterface,
  );
  // initAvo runs its destination `make`s once; the consent layer needs those
  // instances (the npm SDKs expose no window globals) to enforce a Reject.
  if (consent && !consentDestinationsBound) {
    consentDestinationsBound = true;
    try {
      consent.bindDestinations({
        analytics,
        mixpanel,
        reloadAnalytics: loadSegment,
      });
    } catch (error) {
      // Fail closed rather than white-screen: without the consent hooks Segment
      // and Mixpanel stay off for this page load. A Reject through the consent
      // layer also purges what `make` already stored and silences Inspector.
      console.error('[consent] binding destinations failed; analytics disabled', error);
      mixpanel.disable();
      try {
        consent.apply({ 1: true, 4: false, 5: false });
      } catch (applyError) {
        console.error('[consent] reject fallback failed', applyError);
      }
      analytics = undefined;
      // Keeps a later Accept from re-creating Segment through reloadAnalytics.
      segmentWriteKey = undefined;
    }
  }

  const path = useAvoPath();

  useEffect(() => {
    const onCopy = () => {
      const content = window.getSelection()?.toString();
      contentCopied({ path, content });
    };

    window.addEventListener('copy', onCopy);
    return () => {
      window.removeEventListener('copy', onCopy);
    };
  }, [path]);

  const router = useRouter();

  useEffect(() => {
    docsPageViewed({
      userId_: 'not-used',
      path: path,
      referrer: document.referrer,
      utmCampaign: router.query.utm_campaign as string | undefined,
      utmContent: router.query.utm_content as string | undefined,
      utmMedium: router.query.utm_medium as string | undefined,
      utmSource: router.query.utm_source as string | undefined,
      utmTerm: router.query.utm_term as string | undefined,
    });
  }, [path]); // eslint-disable-line

  return (
    <>
      <Component {...pageProps} />
      <style jsx>{`
        :global(.nextra-content img) {
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default App;
