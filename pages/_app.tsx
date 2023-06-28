import { FunctionComponent, useEffect } from 'react';
import { AnalyticsBrowser } from '@segment/analytics-next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import mixpanel from 'mixpanel-browser';

import Avo, { AvoEnv, CustomDestination } from '../Avo';

import useAvoPath from '../util/useAvoPath';

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

let analytics: AnalyticsBrowser | undefined;

const segmentDestinationInterface: CustomDestination = {
  make: (_env, apiKey) => {
    analytics = AnalyticsBrowser.load({ writeKey: apiKey });
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
  make: (env, apiKey) =>
    mixpanel.init(apiKey, {
      debug: env != AvoEnv.Prod,
      ignore_dnt: env == AvoEnv.Dev,
    }),

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
  Avo.initAvo(
    { env: getAvoEnv() },
    { client: 'Docs', version: '2.0' },
    {},
    segmentDestinationInterface,
    mixpanelDestinationInterface,
  );

  const path = useAvoPath();

  useEffect(() => {
    const onCopy = () => {
      const content = window.getSelection()?.toString();
      Avo.contentCopied({ path, content });
    };

    window.addEventListener('copy', onCopy);
    return () => {
      window.removeEventListener('copy', onCopy);
    };
  }, [path]);

  const router = useRouter();

  useEffect(() => {
    Avo.docsPageViewed({
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
      <Script src="//cdn.iubenda.com/cs/iubenda_cs.js" async />
      <Script
        id="gtm-script"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html:
            "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T2GMTSM');",
        }}
      />
      <Script
        id="iubenda-script"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html:
              'var _iub = _iub || []; _iub.csConfiguration = {"lang":"en","siteId":1197126,"countryDetection":true,"enableCcpa":true,"cookiePolicyId":91875699, "banner":{ "slideDown":false,"position":"float-bottom-right","textColor":"#333","backgroundColor":"#ffffff", "height": "150px !important", "overflow": "auto !important", "width": "200px !important" }};',
          }}
        />
      <Component {...pageProps} />
    </>
  );
};

export default App;
