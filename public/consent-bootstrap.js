/*
 * Consent bootstrap for www.avo.app/docs.
 *
 * Port of the Webflow head bootstrap for www.avo.app (monorepo:
 * infrastructure/webflow/custom-header.html). Docs share the www origin, so the
 * iubenda choice cookie is one and the same and both hosts must enforce it the
 * same way. Differences from the head: the page-view allow-list, and the Segment /
 * Mixpanel instances are handed in by _app.tsx (the npm SDKs set no window globals).
 *
 * Loaded as a beforeInteractive script from _document.tsx, ahead of the Next.js
 * bundle that calls Avo.initAvo. It is the only script in that chain: iubenda and
 * GTM are injected from here, async, so a slow third-party CDN cannot hold up
 * hydration and the Consent Mode default is on the dataLayer before GTM starts.
 * Sections, in order: consent state + destination control, iubenda banner config,
 * script loaders.
 */
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
window.avoConsent = (function () {
  var IUBENDA_COOKIE = '_iub_cs-91875699';
  var GA4_ID = 'G-0H1TP6YQLW';
  var MIXPANEL_TOKEN = 'b22a20c38601eb0f14364e8cfdfaa415';
  var PAGE_VIEW_EVENTS = ['Docs Page Viewed'];
  // One shared id for every rejected visitor: a per-visitor id would need storage, and a
  // fresh id per page view inflates unique-user counts and MTU billing.
  var ANONYMOUS_ID = 'consent-rejected';
  var REJECT_ALL = { 4: false, 5: false };
  var state = {
    purposes: null,
    anonymous: false,
    fsStarted: false,
    marketingPushed: false,
  };
  var destinations = { analytics: null, mixpanel: null, reloadAnalytics: null };

  function getMixpanel() {
    return destinations.mixpanel || window.mixpanel;
  }
  function getAnalytics() {
    return destinations.analytics || window.analytics;
  }

  // A stored choice we cannot parse counts as a Reject. That includes a chunked cookie:
  // iubenda keeps the first chunk under this exact name. Its -uspr and -granular cookies
  // share the prefix but are not the choice, hence the exact-name match.
  function readStoredPurposes() {
    var m = document.cookie.match(
      new RegExp('(?:^|; )' + IUBENDA_COOKIE + '=([^;]*)'),
    );
    if (!m) return null;
    try {
      var stored = JSON.parse(decodeURIComponent(m[1]));
      if (stored.purposes) return stored.purposes;
      // The banner before per-purpose consent stored only an overall flag, and iubenda
      // applies it to every purpose; reading it as a Reject would anonymise old Accepts.
      if (typeof stored.consent === 'boolean')
        return { 4: stored.consent, 5: stored.consent };
      return REJECT_ALL;
    } catch (e) {
      return REJECT_ALL;
    }
  }
  function analyticsAllowed(p) {
    return !p || p['4'] !== false;
  }
  function measurementAccepted(p) {
    return !!p && p['4'] === true;
  }
  function marketingAccepted(p) {
    return !!p && p['5'] === true && navigator.globalPrivacyControl !== true;
  }
  function isPageView(name) {
    return PAGE_VIEW_EVENTS.indexOf(name) !== -1;
  }

  var ANALYTICS_COOKIES = [
    '_ga',
    '_ga_' + GA4_ID.slice(2),
    '_gid',
    'ajs_anonymous_id',
    'ajs_user_id',
    'ajs_group_id',
    'mp_' + MIXPANEL_TOKEN + '_mixpanel',
    'initialReferrer',
  ];
  // persisted-queue:v1: is analytics-next's retry queue, written on pagehide;
  // avoinspector is Avo Inspector's store (installation, stream and session ids,
  // queued events).
  var ANALYTICS_STORAGE_PREFIXES = [
    'ajs_',
    'persisted-queue:v1:',
    'avoinspector',
    '__mpq_' + MIXPANEL_TOKEN,
    'mp_',
  ];
  var REPLAY_COOKIES = ['fs_uid', 'fs_lua', 'fs_cid'];
  var MARKETING_COOKIES = [
    '_gcl_au',
    '_gcl_aw',
    '_fbp',
    'li_fat_id',
    'hubspotutk',
    '__hstc',
    '__hssrc',
    '__hssc',
  ];

  function deleteCookies(names) {
    names.forEach(function (c) {
      document.cookie = c + '=; Max-Age=0; path=/; domain=.avo.app';
      document.cookie = c + '=; Max-Age=0; path=/';
    });
  }
  function purgeAnalyticsStorage() {
    deleteCookies(ANALYTICS_COOKIES);
    [window.localStorage, window.sessionStorage].forEach(function (store) {
      try {
        Object.keys(store).forEach(function (k) {
          if (
            ANALYTICS_STORAGE_PREFIXES.some(function (prefix) {
              return k.indexOf(prefix) === 0;
            })
          )
            store.removeItem(k);
        });
      } catch (e) {}
    });
  }

  // Reject: keep counting page views, but with no cookies, no identifiers and no IP.
  function goAnonymous() {
    if (state.anonymous) return;
    state.anonymous = true;
    var mixpanel = getMixpanel();
    if (mixpanel && mixpanel.set_config) {
      mixpanel.set_config({ disable_persistence: true, ip: false });
      // The batch queue writes localStorage even with persistence disabled.
      if (mixpanel.stop_batch_senders) mixpanel.stop_batch_senders();
      mixpanel.reset();
    }
    switchSegment();
    purgeAnalyticsStorage();
  }
  function goFull() {
    if (!state.anonymous) return;
    state.anonymous = false;
    var mixpanel = getMixpanel();
    if (mixpanel && mixpanel.set_config) {
      mixpanel.set_config({ disable_persistence: false, ip: true });
      if (mixpanel.start_batch_senders) mixpanel.start_batch_senders();
    }
    if (destinations.reloadAnalytics) switchSegment();
  }
  // analytics-next fixes client persistence at load time, so a consent change needs a
  // fresh instance (reloadAnalytics reads avoDestinationOptions() for the new state).
  // Without a reloader, fall back to resetting in place: the shared id then still
  // lands in ajs_anonymous_id until the next page load purges it.
  function switchSegment() {
    if (destinations.reloadAnalytics) {
      destinations.analytics = destinations.reloadAnalytics();
      attachSegmentMiddleware(destinations.analytics);
      // The replaced instance keeps its retry-queue pagehide writer (analytics-next
      // has no teardown) and it was registered after ours; listeners run in
      // registration order, so move the purge back to the end.
      window.removeEventListener('pagehide', onPageHide);
      window.addEventListener('pagehide', onPageHide);
      return;
    }
    var analytics = getAnalytics();
    if (analytics && analytics.reset) {
      analytics.reset();
      // Segment regenerates and stores a random id on the next event unless one is set.
      analytics.setAnonymousId(ANONYMOUS_ID);
    }
  }
  function setFullStory(on) {
    var FS = window.FS;
    if (!FS) return;
    if (on && !state.fsStarted) {
      state.fsStarted = true;
      FS.restart ? FS.restart() : FS('start');
    } else if (!on && state.fsStarted) {
      state.fsStarted = false;
      FS.shutdown ? FS.shutdown() : FS('shutdown');
    }
  }

  function apply(purposes) {
    state.purposes = purposes;
    var analyticsOn = analyticsAllowed(purposes);
    var marketingOn = marketingAccepted(purposes);
    gtag('consent', 'update', {
      analytics_storage: analyticsOn ? 'granted' : 'denied',
      ad_storage: marketingOn ? 'granted' : 'denied',
      ad_user_data: marketingOn ? 'granted' : 'denied',
      ad_personalization: marketingOn ? 'granted' : 'denied',
    });
    if (analyticsOn) goFull();
    else goAnonymous();
    setFullStory(measurementAccepted(purposes));
    if (purposes && !measurementAccepted(purposes))
      deleteCookies(REPLAY_COOKIES);
    if (purposes && purposes['5'] === false) deleteCookies(MARKETING_COOKIES);
    if (marketingOn && !state.marketingPushed) {
      state.marketingPushed = true;
      dataLayer.push({ event: 'iubenda_marketing_consent_given' });
    }
  }

  function attachSegmentMiddleware(analytics) {
    if (analytics && analytics.addSourceMiddleware) {
      analytics.addSourceMiddleware(function (ctx) {
        if (state.anonymous) {
          var evt = ctx.payload.obj;
          // Returning without ctx.next is what drops an event in analytics-next;
          // ctx.next(null) would let it through unchanged.
          if (evt.type !== 'page' && !isPageView(evt.event)) return;
          evt.context = evt.context || {};
          evt.context.ip = '0.0.0.0';
          evt.properties = evt.properties || {};
          evt.properties.consent = 'rejected';
          evt.anonymousId = ANONYMOUS_ID;
          delete evt.userId;
          evt.integrations = {
            All: false,
            'Segment.io': true,
            Warehouses: { all: true },
          };
        }
        ctx.next(ctx.payload);
      });
    }
  }

  // Called right after Avo.initAvo with the Segment and Mixpanel instances it created.
  function bindDestinations(instances) {
    instances = instances || {};
    if (instances.analytics) destinations.analytics = instances.analytics;
    if (instances.mixpanel) destinations.mixpanel = instances.mixpanel;
    if (instances.reloadAnalytics)
      destinations.reloadAnalytics = instances.reloadAnalytics;
    attachSegmentMiddleware(getAnalytics());
    // On a loaded mixpanel-js instance push() runs the function at once; on the stub it
    // runs before the queued calls replay, so an identity loaded from an existing cookie
    // never rides on an anonymous event.
    var mixpanel = getMixpanel();
    if (mixpanel && mixpanel.push) {
      mixpanel.push(function () {
        if (state.anonymous) this.reset();
      });
    }
    // iubenda can report a stored Accept before Avo.initAvo has created window.FS.
    setFullStory(measurementAccepted(state.purposes));
  }

  // Avo Inspector keeps an installation id in localStorage and reports the schema of
  // every event, so it is created on first use while analytics is allowed and goes
  // silent on Reject.
  function gatedInspector(create) {
    var inspector = null;
    return {
      _avoFunctionTrackSchemaFromEvent: function () {
        if (state.anonymous) return undefined;
        if (!inspector) inspector = create();
        return inspector._avoFunctionTrackSchemaFromEvent.apply(inspector, arguments);
      },
    };
  }

  function anonymiseMixpanelEvent(payload) {
    if (!state.anonymous) return payload;
    if (!isPageView(payload.event)) return null;
    var props = payload.properties;
    props.distinct_id = ANONYMOUS_ID;
    props.$device_id = ANONYMOUS_ID;
    props.consent = 'rejected';
    delete props.$user_id;
    return payload;
  }

  state.purposes = readStoredPurposes();
  state.anonymous = !analyticsAllowed(state.purposes);
  if (state.anonymous) purgeAnalyticsStorage();
  function onPageHide() {
    if (state.anonymous) purgeAnalyticsStorage();
  }
  window.addEventListener('pagehide', onPageHide);

  // wait_for_update holds Google tags until iubenda reports; the stored choice covers the
  // case where iubenda is slow or blocked.
  gtag('consent', 'default', {
    analytics_storage: state.anonymous ? 'denied' : 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    personalization_storage: 'denied',
    wait_for_update: 500,
  });

  return {
    state: state,
    apply: apply,
    bindDestinations: bindDestinations,
    storedPurposes: readStoredPurposes,
    gatedInspector: gatedInspector,
    avoDestinationOptions: function () {
      var anon = state.anonymous;
      return {
        mixpanel: {
          disable_persistence: anon,
          batch_requests: !anon,
          ip: !anon,
          hooks: {
            before_send_events: anonymiseMixpanelEvent,
            before_send_people: function (payload) {
              return state.anonymous ? null : payload;
            },
          },
        },
        segment: anon ? { disableClientPersistence: true } : {},
        // The generated Fullstory.make ignores its options; FullStory is gated by
        // _fs_capture_on_startup below plus setFullStory, not by anything here.
        fullstory: {},
      };
    },
  };
})();

// The Avo SDK injects FullStory; capture must wait for avoConsent to start it.
window['_fs_capture_on_startup'] = false;

// iubenda banner - same config as the www head; the banner and the policy are shared.
var _iub = _iub || [];
_iub.csConfiguration = {
  siteId: 1197126,
  cookiePolicyId: 91875699,
  cookiePolicyInOtherWindow: true,
  lang: 'en',
  perPurposeConsent: true,
  // Only the purposes avoConsent.apply acts on. Experience (3) services stay in the
  // policy but get no toggle — the banner must not claim Reject blocks them.
  purposes: '1, 4, 5',
  preferenceCookie: { expireAfter: 177 },
  // Consent Mode is handled in avoConsent.apply
  googleConsentMode: false,
  floatingPreferencesButtonDisplay: 'anchored-bottom-left',
  floatingPreferencesButtonIcon: false,
  floatingPreferencesButtonCaption: true,
  floatingPreferencesButtonCaptionColor: '#191719',
  floatingPreferencesButtonColor: '#FFFFFF29',
  emailMarketing: {
    styles: {
      backgroundColor: '#1E1A1E',
      buttonsBackgroundColor: '#FF0EB4',
      buttonsTextColor: '#FFFFFF',
      footerBackgroundColor: '#212121',
      footerTextColor: '#FFFFFF',
      textColor: '#FFFFFF',
    },
    theme: 'dark',
  },
  i18n: {
    en: {
      banner: {
        dynamic: {
          body: 'We use cookies for essential functions and, unless you reject, for product analytics. With your consent we also use them for session replay and personalised ads. Reject limits us to anonymous page-view counts — no cookies, no identifiers. Change your mind anytime via Privacy choices at the bottom of the page.',
        },
      },
      per_purpose: {
        purposes: {
          4: {
            description:
              'Product analytics. On by default; switch off to be counted only as an anonymous page view. Session replay starts only if you switch this on yourself.',
          },
          5: {
            description:
              "Advertising measurement and personalisation. Also honours your browser's Global Privacy Control.",
          },
        },
      },
    },
  },
  banner: {
    acceptButtonColor: '#FF0EB4',
    acceptButtonDisplay: true,
    backgroundColor: '#1E1A1E',
    closeButtonDisplay: false,
    continueWithoutAcceptingButtonCaptionColor: '#FFFFFF',
    continueWithoutAcceptingButtonColor: '#1E1A1E',
    continueWithoutAcceptingButtonDisplay: false,
    customizeButtonDisplay: true,
    explicitWithdrawal: true,
    fontSizeBody: '12px',
    listPurposes: true,
    logo: null,
    position: 'float-bottom-left',
    rejectButtonCaptionColor: '#191719',
    rejectButtonColor: '#D5D3DB',
    rejectButtonDisplay: true,
    showTitle: false,
    slideDown: false,
  },
  callback: {
    onReady: function () {
      var prefs =
        _iub.cs &&
        _iub.cs.api &&
        _iub.cs.api.getPreferences &&
        _iub.cs.api.getPreferences();
      window.avoConsent.apply(
        prefs && prefs.purposes
          ? prefs.purposes
          : window.avoConsent.state.purposes,
      );
    },
    onPreferenceExpressed: function (prefs) {
      // iubenda has written its cookie by now; it is fresher than the page-load state.
      var consent = window.avoConsent;
      consent.apply(
        prefs && prefs.purposes
          ? prefs.purposes
          : consent.storedPurposes() || consent.state.purposes,
      );
    },
  },
};

function loadScript(src, onSettled) {
  var el = document.createElement('script');
  el.src = src;
  el.async = true;
  el.charset = 'UTF-8';
  if (onSettled) el.onload = el.onerror = onSettled;
  document.head.appendChild(el);
}

// iubenda: the sync script must run before cs.js, so cs.js waits for it to settle.
loadScript('https://cs.iubenda.com/sync/1197126.js', function () {
  loadScript('https://cdn.iubenda.com/cs/iubenda_cs.js');
});

// Google Tag Manager - GTM-T2GMTSM (shared with www). Kept after the consent default.
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-T2GMTSM');
