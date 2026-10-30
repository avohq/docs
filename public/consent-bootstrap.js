/*
 * Consent bootstrap for www.avo.app/docs.
 *
 * Mirrors the www.avo.app head bootstrap. Docs share the www origin, so the
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
  // fresh id per page view inflates unique-user counts.
  var ANONYMOUS_ID = 'consent-rejected';
  var REJECT_ALL = { 4: false, 5: false };
  var state = {
    purposes: null,
    anonymous: false,
    fsStarted: false,
    marketingPushed: false,
  };
  var destinations = { analytics: null, mixpanel: null, reloadAnalytics: null };
  var segmentSwitchPending = false;

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
      // A purposes value that is present but invalid (false, {}) is a Reject, never a cue
      // to fall back to the overall flag below.
      if (Object.prototype.hasOwnProperty.call(stored, 'purposes'))
        return isPurposeMap(stored.purposes) ? stored.purposes : REJECT_ALL;
      // The banner before per-purpose consent stored only an overall flag, and iubenda
      // applies it to every purpose; reading it as a Reject would anonymise old Accepts.
      if (typeof stored.consent === 'boolean')
        return { 4: stored.consent, 5: stored.consent };
      return REJECT_ALL;
    } catch (e) {
      return REJECT_ALL;
    }
  }
  // iubenda stores a map of purpose id to boolean that always includes Measurement (4);
  // any other shape would read as allowed.
  function isPurposeMap(p) {
    return (
      !!p &&
      typeof p === 'object' &&
      !Array.isArray(p) &&
      typeof p['4'] === 'boolean' &&
      Object.keys(p).every(function (k) {
        return typeof p[k] === 'boolean';
      })
    );
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
    's%3Acontext.referrer',
    'ajs_user',
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
  var REPLAY_STORAGE_PREFIXES = ['_fs_'];
  var MARKETING_STORAGE_PREFIXES = ['_gcl_'];
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
  // Ad-click, linker and referrer ids that ride in a URL and identify the visit, and
  // Segment's ajs_* query-string identity parameters. utm_* parameters stay, so page
  // views keep their attribution.
  var CLICK_ID_PARAMS = [
    'gclid',
    'gbraid',
    'wbraid',
    'dclid',
    'fbclid',
    'msclkid',
    'li_fat_id',
    'ttclid',
    'twclid',
    'sccid',
    'ko_click_id',
    'yclid',
    'srsltid',
    'epik',
    'rdt_cid',
    'irclickid',
    'obclid',
    'igshid',
    's_kwcid',
    'mkt_tok',
    '_kx',
    '_gl',
    'btid',
    'urid',
    '_hsenc',
    '_hsmi',
    'mc_eid',
  ];
  var CLICK_ID_PREFIXES = ['hsa_', 'ajs_'];
  // The URL-valued fields Segment (page context and page properties) and mixpanel-js add.
  var URL_FIELDS = [
    'url',
    'search',
    'referrer',
    '$current_url',
    '$referrer',
    '$initial_referrer',
    'current_url_search',
  ];

  function isClickIdParam(name) {
    try {
      name = decodeURIComponent(name);
    } catch (e) {}
    name = name.toLowerCase();
    // analytics-next reads any utm_<name> as a campaign field, so utm_gclid counts too.
    if (name.indexOf('utm_') === 0) name = name.slice(4);
    return (
      CLICK_ID_PARAMS.indexOf(name) !== -1 ||
      CLICK_ID_PREFIXES.some(function (prefix) {
        return name.indexOf(prefix) === 0;
      })
    );
  }
  function stripClickIds(url) {
    var start = url.indexOf('?');
    if (start === -1) return url;
    var end = url.indexOf('#', start);
    if (end === -1) end = url.length;
    // Both libraries read a second "?" as a separator too.
    var kept = url
      .slice(start + 1, end)
      .split(/[&?]/)
      .filter(function (pair) {
        return pair && !isClickIdParam(pair.split('=')[0]);
      });
    return (
      url.slice(0, start) +
      (kept.length ? '?' + kept.join('&') : '') +
      url.slice(end)
    );
  }
  function stripClickIdFields(fields) {
    if (!fields) return;
    URL_FIELDS.forEach(function (key) {
      if (typeof fields[key] === 'string')
        fields[key] = stripClickIds(fields[key]);
    });
  }
  function dropClickIdKeys(fields) {
    if (!fields) return;
    Object.keys(fields).forEach(function (key) {
      if (isClickIdParam(key)) delete fields[key];
    });
  }
  // The Segment.io destination fills a missing userId from the instance's in-memory user
  // after the source middleware has run, and identify() sets that user before any
  // middleware does, so deleting evt.userId alone does not keep it off the event.
  // AnalyticsBrowser's own user() is async; its loaded `instance` answers directly.
  function forgetSegmentUser() {
    var analytics = getAnalytics();
    var instance = analytics && analytics.instance;
    if (instance && instance.user) instance.user().id(null);
  }

  function deleteCookies(names) {
    names.forEach(function (c) {
      document.cookie = c + '=; Max-Age=0; path=/; domain=.avo.app';
      document.cookie = c + '=; Max-Age=0; path=/';
    });
  }
  function removeStorageKeys(prefixes) {
    ['localStorage', 'sessionStorage'].forEach(function (name) {
      try {
        // Reading the property throws when the browser blocks storage.
        var store = window[name];
        Object.keys(store).forEach(function (k) {
          if (
            prefixes.some(function (prefix) {
              return k.indexOf(prefix) === 0;
            })
          )
            store.removeItem(k);
        });
      } catch (e) {}
    });
  }
  function purgeAnalyticsStorage() {
    deleteCookies(ANALYTICS_COOKIES);
    removeStorageKeys(ANALYTICS_STORAGE_PREFIXES);
  }
  // GA4 reads the page URL from the address bar, so ad-click ids would reach it there.
  // Next's router keeps the URL in its history entry too and writes it back on Back, so
  // that copy is cleaned as well.
  function stripAddressBarClickIds() {
    try {
      var clean = stripClickIds(location.href);
      if (clean === location.href) return;
      var entry = history.state;
      if (entry && entry.__N) {
        entry = Object.assign({}, entry);
        if (typeof entry.url === 'string') entry.url = stripClickIds(entry.url);
        if (typeof entry.as === 'string') entry.as = stripClickIds(entry.as);
      }
      history.replaceState(entry, '', clean);
    } catch (e) {}
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
    stripAddressBarClickIds();
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
      if (segmentSwitchPending) return;
      // An instance still loading sends its queued events with the settings it was
      // created with, so the swap waits for it and then follows the latest choice.
      segmentSwitchPending = true;
      whenLoaded(destinations.analytics, function () {
        segmentSwitchPending = false;
        replaceSegment();
      });
      return;
    }
    var analytics = getAnalytics();
    if (analytics && analytics.reset) {
      analytics.reset();
      // Segment regenerates and stores a random id on the next event unless one is set.
      analytics.setAnonymousId(ANONYMOUS_ID);
    }
  }
  // analytics-next sends its queued calls in tasks it schedules before the load settles,
  // so the swap goes one task later, after them.
  function whenLoaded(analytics, fn) {
    if (!analytics || !analytics.then || analytics.instance) return fn();
    var later = function () {
      setTimeout(fn, 0);
    };
    analytics.then(later, later);
  }
  function replaceSegment() {
    // The replaced instance keeps sending (retries, its own queue) with its own user.
    if (state.anonymous) forgetSegmentUser();
    destinations.analytics = destinations.reloadAnalytics();
    attachSegmentMiddleware(destinations.analytics);
    // The replaced instance stores its id when it sends its queued events.
    if (state.anonymous) purgeAnalyticsStorage();
    // It also keeps its pagehide writers (analytics-next has no teardown), registered
    // after ours; listeners run in registration order, so move the purge back to the end.
    window.removeEventListener('pagehide', onPageHide);
    window.addEventListener('pagehide', onPageHide);
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

  // No stored choice accepts neither, so that case purges too.
  function purgeDeniedStorage(purposes) {
    if (!measurementAccepted(purposes)) {
      deleteCookies(REPLAY_COOKIES);
      removeStorageKeys(REPLAY_STORAGE_PREFIXES);
    }
    if (!marketingAccepted(purposes)) {
      deleteCookies(MARKETING_COOKIES);
      removeStorageKeys(MARKETING_STORAGE_PREFIXES);
    }
  }

  function apply(purposes) {
    // iubenda's callbacks hand over purposes unchecked; null is the no-choice default.
    if (purposes !== null && !isPurposeMap(purposes)) purposes = REJECT_ALL;
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
    purgeDeniedStorage(purposes);
    if (marketingOn && !state.marketingPushed) {
      state.marketingPushed = true;
      dataLayer.push({ event: 'iubenda_marketing_consent_given' });
    }
  }

  function attachSegmentMiddleware(analytics) {
    if (analytics && analytics.addSourceMiddleware) {
      analytics.addSourceMiddleware(function (ctx) {
        if (state.anonymous) {
          forgetSegmentUser();
          var evt = ctx.payload.obj;
          // Returning without ctx.next is what drops an event in analytics-next;
          // ctx.next(null) would let it through unchanged.
          if (evt.type !== 'page' && !isPageView(evt.event)) return;
          evt.context = evt.context || {};
          evt.context.ip = '0.0.0.0';
          // analytics-next fills this from ?btid= / ?urid= or its s:context.referrer cookie.
          delete evt.context.referrer;
          // It also maps any utm_<name> to campaign.<name>, so ?utm_gclid= lands here.
          dropClickIdKeys(evt.context.campaign);
          stripClickIdFields(evt.context.page);
          evt.properties = evt.properties || {};
          stripClickIdFields(evt.properties);
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
        return inspector._avoFunctionTrackSchemaFromEvent.apply(
          inspector,
          arguments,
        );
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
    stripClickIdFields(props);
    // mixpanel-js copies click ids from the URL into properties of the same name.
    dropClickIdKeys(props);
    return payload;
  }

  state.purposes = readStoredPurposes();
  state.anonymous = !analyticsAllowed(state.purposes);
  if (state.anonymous) {
    purgeAnalyticsStorage();
    stripAddressBarClickIds();
  }
  // Here as well as in apply, so this also happens when iubenda loads late or not at all.
  purgeDeniedStorage(state.purposes);
  function onPageHide() {
    if (state.anonymous) purgeAnalyticsStorage();
  }
  window.addEventListener('pagehide', onPageHide);

  // iubenda opens its panel with every optional purpose off, but with no stored choice
  // Measurement is running, so the panel would misstate it. Ticking the box the way a
  // visitor would also updates iubenda's own state, so Save stores what is shown.
  // The footer opener differs from www's on purpose: docs has its own React button.
  var PANEL_OPENERS = '.iubenda-cs-customize-btn, .avo-privacy-choices';
  function tickRunningMeasurement(attemptsLeft) {
    if (state.purposes !== null) return;
    var box = document.getElementById('purpose-4');
    if (box) {
      if (!box.checked) box.click();
    } else if (attemptsLeft > 0) {
      setTimeout(function () {
        tickRunningMeasurement(attemptsLeft - 1);
      }, 100);
    }
  }
  try {
    document.addEventListener(
      'click',
      function (e) {
        if (e.target && e.target.closest && e.target.closest(PANEL_OPENERS))
          tickRunningMeasurement(30);
      },
      true,
    );
  } catch (e) {}

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
        // useQueryString: false stops ?ajs_uid= and friends from identifying the visitor.
        segment: anon
          ? { disableClientPersistence: true, useQueryString: false }
          : {},
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
  // policy but get no toggle — the banner must not claim Reject blocks them. Keep 4 listed:
  // isPurposeMap treats a stored choice without it as a Reject.
  purposes: '1, 4, 5',
  preferenceCookie: { expireAfter: 177 },
  // Consent Mode is handled in avoConsent.apply
  googleConsentMode: false,
  // Preferences reopen from the footer's "Your Privacy Choices" link.
  floatingPreferencesButtonDisplay: false,
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
          body: 'We use cookies to run this site and, unless you reject, to measure how it\'s used. With your consent, we also use them for session recordings and for ads with Google and LinkedIn. If you reject, we only record page views, with no analytics cookies or tracking IDs. Change this anytime in Your Privacy Choices. <a href="https://www.avo.app/l/cookies" target="_blank" rel="noopener">Cookie policy</a>',
        },
      },
      per_purpose: {
        purposes: {
          1: {
            description:
              'Needed to run the site securely and remember your privacy choices. Always on.',
          },
          4: {
            description:
              "Product analytics (Mixpanel, Segment, Google Analytics). On unless you switch it off. When it's off, we only record page views, with no analytics cookies or tracking IDs. Session recordings (FullStory) start only if you choose Accept or save your choices with this on.",
          },
          5: {
            description:
              'Ads and ad measurement with Google and LinkedIn. Off unless you accept or switch it on. Keeping it off opts you out of sharing your personal information for targeted ads. Never runs while your browser sends Global Privacy Control, even if you accept.' +
              (navigator.globalPrivacyControl === true
                ? " Global Privacy Control detected: you're opted out of sharing for targeted ads."
                : ''),
          },
        },
      },
    },
  },
  // Layout, fonts and the phone sheet are in styles/cookie-banner.css.
  banner: {
    acceptButtonCaption: 'Accept',
    acceptButtonCaptionColor: '#FFFFFF',
    acceptButtonColor: '#D10B93',
    acceptButtonDisplay: true,
    backgroundColor: '#FFFFFF',
    backgroundOverlay: false,
    brandBackgroundColor: '#FFFFFF',
    brandTextColor: '#211F26',
    closeButtonDisplay: false,
    continueWithoutAcceptingButtonDisplay: false,
    customizeButtonCaption: 'Customize',
    customizeButtonCaptionColor: '#211F26',
    customizeButtonColor: 'transparent',
    customizeButtonDisplay: true,
    explicitWithdrawal: true,
    fontSizeBody: '14px',
    linksColor: '#580FF5',
    listPurposes: true,
    logo: null,
    position: 'float-bottom-left',
    rejectButtonCaption: 'Reject',
    rejectButtonCaptionColor: '#FFFFFF',
    rejectButtonColor: '#211F26',
    rejectButtonDisplay: true,
    showTitle: false,
    slideDown: false,
    textColor: '#65636D',
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

// Google Tag Manager, the container shared with www. Kept after the consent default.
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
