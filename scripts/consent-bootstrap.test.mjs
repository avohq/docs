// Runs public/consent-bootstrap.js in a vm sandbox with a fake window and asserts
// the consent decisions it makes. Run with `yarn test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = readFileSync(
  path.join(here, '..', 'public', 'consent-bootstrap.js'),
  'utf8',
);

const IUBENDA_COOKIE = '_iub_cs-91875699';
const MIXPANEL_TOKEN = 'b22a20c38601eb0f14364e8cfdfaa415';

const storedChoice = (purposes) =>
  `${IUBENDA_COOKIE}=${encodeURIComponent(JSON.stringify({ purposes }))}`;

function fakeStorage(keys) {
  const store = Object.fromEntries(keys.map((k) => [k, '1']));
  Object.defineProperty(store, 'removeItem', {
    value: (k) => delete store[k],
    enumerable: false,
  });
  return store;
}

function fakeDocument(cookieHeader) {
  const cookies = new Map(
    cookieHeader
      .split(';')
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => [c.slice(0, c.indexOf('=')), c.slice(c.indexOf('=') + 1)]),
  );
  const insertedScripts = [];
  return {
    insertedScripts,
    get cookie() {
      return [...cookies].map(([k, v]) => `${k}=${v}`).join('; ');
    },
    set cookie(value) {
      const [pair, ...attrs] = value.split(';');
      const name = pair.slice(0, pair.indexOf('=')).trim();
      if (attrs.some((a) => /max-age=0/i.test(a))) cookies.delete(name);
      else cookies.set(name, pair.slice(pair.indexOf('=') + 1));
    },
    createElement: (tagName) => ({ tagName }),
    head: { appendChild: (el) => insertedScripts.push(el) },
    getElementsByTagName: () => [
      { parentNode: { insertBefore: (el) => insertedScripts.push(el) } },
    ],
  };
}

const scriptBySrc = (ctx, pattern) =>
  ctx.document.insertedScripts.find((el) => pattern.test(el.src || ''));

function fakeMixpanel() {
  const calls = [];
  return {
    calls,
    set_config: (c) => calls.push(['set_config', c]),
    stop_batch_senders: () => calls.push(['stop_batch_senders']),
    start_batch_senders: () => calls.push(['start_batch_senders']),
    reset: () => calls.push(['reset']),
    push(fn) {
      fn.call(this);
    },
  };
}

function fakeAnalytics() {
  const calls = [];
  let middleware;
  return {
    calls,
    reset: () => calls.push(['reset']),
    setAnonymousId: (id) => calls.push(['setAnonymousId', id]),
    addSourceMiddleware: (fn) => {
      middleware = fn;
    },
    // Mirrors analytics-next: the middleware gets a clone, and an event is
    // dropped when next() is never called.
    run(event) {
      let outcome = 'dropped';
      const obj = structuredClone(event);
      middleware({ payload: { obj }, next: (p) => (outcome = p.obj) });
      return outcome;
    },
  };
}

function fakeFullStory() {
  const calls = [];
  return {
    calls,
    restart: () => calls.push('restart'),
    shutdown: () => calls.push('shutdown'),
  };
}

function load({ cookie = '', gpc = false, localKeys = [], FS } = {}) {
  const ctx = {
    console,
    navigator: { globalPrivacyControl: gpc },
    document: fakeDocument(cookie),
    localStorage: fakeStorage(localKeys),
    sessionStorage: fakeStorage([]),
    listeners: {},
    addEventListener(type, fn) {
      (ctx.listeners[type] = ctx.listeners[type] || []).push(fn);
    },
    removeEventListener(type, fn) {
      ctx.listeners[type] = (ctx.listeners[type] || []).filter((f) => f !== fn);
    },
  };
  ctx.window = ctx;
  if (FS) ctx.FS = FS;
  vm.createContext(ctx);
  vm.runInContext(source, ctx);
  return ctx;
}

// Values built inside the sandbox carry that realm's prototypes; strip them before
// deep-equality checks.
const plain = (value) => JSON.parse(JSON.stringify(value));

const consentCalls = (ctx) =>
  ctx.dataLayer
    .filter((entry) => entry && entry[0] === 'consent')
    .map((entry) => ({ command: entry[1], params: entry[2] }));

const lastConsent = (ctx) => consentCalls(ctx).at(-1);

test('no stored choice: analytics_storage is granted by default', () => {
  const ctx = load();
  assert.equal(ctx.avoConsent.state.anonymous, false);
  assert.equal(consentCalls(ctx)[0].params.analytics_storage, 'granted');
});

test('stored Reject: anonymous, analytics_storage denied by default', () => {
  const ctx = load({ cookie: storedChoice({ 4: false, 5: false }) });
  assert.equal(ctx.avoConsent.state.anonymous, true);
  assert.equal(consentCalls(ctx)[0].params.analytics_storage, 'denied');
});

test('a stored choice without purposes counts as Reject', () => {
  const ctx = load({
    cookie: `${IUBENDA_COOKIE}=${encodeURIComponent('{"timestamp":"x"}')}`,
  });
  assert.equal(ctx.avoConsent.state.anonymous, true);
});

test('while rejected, pagehide purges storage written during the session', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  ctx.localStorage.ajs_anonymous_id = 'late';
  ctx.listeners.pagehide.forEach((fn) => fn());
  assert.deepEqual(Object.keys(ctx.localStorage), []);
});

test('in full mode, pagehide leaves analytics storage alone', () => {
  const ctx = load({ localKeys: ['ajs_anonymous_id'] });
  ctx.listeners.pagehide.forEach((fn) => fn());
  assert.deepEqual(Object.keys(ctx.localStorage), ['ajs_anonymous_id']);
});

test('an unparseable stored choice counts as Reject', () => {
  const ctx = load({ cookie: `${IUBENDA_COOKIE}=%7Bnot-json` });
  assert.equal(ctx.avoConsent.state.anonymous, true);
});

test('stored Reject purges Mixpanel and Segment storage on load', () => {
  const ctx = load({
    cookie: storedChoice({ 4: false }),
    localKeys: [`__mpq_${MIXPANEL_TOKEN}_ev`, 'ajs_anonymous_id', 'theme'],
  });
  assert.deepEqual(Object.keys(ctx.localStorage), ['theme']);
});

test("stored Reject purges Segment's persisted retry queue on load", () => {
  const ctx = load({
    cookie: storedChoice({ 4: false }),
    localKeys: [
      'persisted-queue:v1:4vJw:event-queue:items',
      'persisted-queue:v1:4vJw:event-queue:seen',
    ],
  });
  assert.deepEqual(Object.keys(ctx.localStorage), []);
});

test('stored Reject deletes analytics cookies on load', () => {
  const ctx = load({
    cookie: `_ga=GA1; mp_${MIXPANEL_TOKEN}_mixpanel=x; ${storedChoice({ 4: false })}`,
  });
  assert.equal(ctx.document.cookie, storedChoice({ 4: false }));
});

test('Reject deletes replay and marketing cookies', () => {
  const ctx = load({
    cookie: 'fs_uid=a; fs_lua=b; _fbp=c; li_fat_id=d; keep=e',
  });
  ctx.avoConsent.apply({ 4: false, 5: false });
  assert.equal(ctx.document.cookie, 'keep=e');
});

test('Accept keeps replay and marketing cookies', () => {
  const ctx = load({ cookie: 'fs_uid=a; _fbp=c' });
  ctx.avoConsent.apply({ 4: true, 5: true });
  assert.equal(ctx.document.cookie, 'fs_uid=a; _fbp=c');
});

test('a returning rejected visitor gets no second Mixpanel switch', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const mixpanel = fakeMixpanel();
  ctx.avoConsent.bindDestinations({ mixpanel });
  mixpanel.calls.length = 0;
  ctx.avoConsent.apply({ 4: false, 5: false });
  assert.deepEqual(mixpanel.calls, []);
});

test('GTM is loaded only after the consent default is on the dataLayer', () => {
  const ctx = load();
  const defaultIndex = ctx.dataLayer.findIndex(
    (e) => e && e[0] === 'consent' && e[1] === 'default',
  );
  const gtmStartIndex = ctx.dataLayer.findIndex((e) => e && e['gtm.start']);
  assert.ok(defaultIndex !== -1 && defaultIndex < gtmStartIndex);
  assert.match(
    ctx.document.insertedScripts.at(-1).src,
    /googletagmanager\.com\/gtm\.js\?id=GTM-T2GMTSM/,
  );
});

test('iubenda sync script is loaded first, cs.js only once sync has settled', () => {
  const ctx = load();
  const sync = scriptBySrc(ctx, /cs\.iubenda\.com\/sync\/1197126\.js/);
  assert.ok(sync, 'sync script inserted');
  assert.equal(scriptBySrc(ctx, /iubenda_cs\.js/), undefined);
  sync.onload();
  assert.match(
    scriptBySrc(ctx, /iubenda_cs\.js/).src,
    /^https:\/\/cdn\.iubenda\.com\/cs\/iubenda_cs\.js$/,
  );
});

test('cs.js still loads when the sync script fails', () => {
  const ctx = load();
  scriptBySrc(ctx, /sync\/1197126\.js/).onerror();
  assert.ok(scriptBySrc(ctx, /iubenda_cs\.js/));
});

test('the consent default holds all marketing signals denied', () => {
  const ctx = load();
  const { params } = consentCalls(ctx)[0];
  assert.deepEqual(
    [params.ad_storage, params.ad_user_data, params.ad_personalization],
    ['denied', 'denied', 'denied'],
  );
});

test('Reject switches the registered Mixpanel to anonymous mode', () => {
  const ctx = load();
  const mixpanel = fakeMixpanel();
  ctx.avoConsent.bindDestinations({ mixpanel });
  ctx.avoConsent.apply({ 4: false, 5: false });
  assert.deepEqual(plain(mixpanel.calls), [
    ['set_config', { disable_persistence: true, ip: false }],
    ['stop_batch_senders'],
    ['reset'],
  ]);
});

test('Reject resets the registered Segment and pins the shared anonymous id', () => {
  const ctx = load();
  const analytics = fakeAnalytics();
  ctx.avoConsent.bindDestinations({ analytics });
  ctx.avoConsent.apply({ 4: false, 5: false });
  assert.deepEqual(analytics.calls, [
    ['reset'],
    ['setAnonymousId', 'consent-rejected'],
  ]);
});

test('Reject reloads Segment memory-only instead of resetting the old instance', () => {
  const ctx = load();
  const first = fakeAnalytics();
  const second = fakeAnalytics();
  let optionsAtReload;
  ctx.avoConsent.bindDestinations({
    analytics: first,
    reloadAnalytics: () => {
      optionsAtReload = ctx.avoConsent.avoDestinationOptions().segment;
      return second;
    },
  });
  ctx.avoConsent.apply({ 4: false, 5: false });
  assert.deepEqual(first.calls, []);
  assert.deepEqual(plain(optionsAtReload), { disableClientPersistence: true });
  assert.equal(
    second.run({ type: 'track', event: 'Docs Page Viewed', properties: {} })
      .anonymousId,
    'consent-rejected',
  );
});

test('after a Segment swap the purge still runs last on pagehide', () => {
  const ctx = load();
  ctx.avoConsent.bindDestinations({
    analytics: fakeAnalytics(),
    reloadAnalytics: () => fakeAnalytics(),
  });
  // The replaced instance's retry queue keeps its own pagehide writer, registered
  // after the bootstrap's listener.
  ctx.addEventListener('pagehide', () => {
    ctx.localStorage['persisted-queue:v1:4vJw:event-queue:items'] = '[…]';
  });
  ctx.avoConsent.apply({ 4: false, 5: false });
  ctx.listeners.pagehide.forEach((fn) => fn());
  assert.deepEqual(Object.keys(ctx.localStorage), []);
});

test('Accept after Reject reloads Segment with persistence back on', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const reloads = [];
  ctx.avoConsent.bindDestinations({
    analytics: fakeAnalytics(),
    reloadAnalytics: () => {
      reloads.push(plain(ctx.avoConsent.avoDestinationOptions().segment));
      return fakeAnalytics();
    },
  });
  ctx.avoConsent.apply({ 4: true, 5: false });
  assert.deepEqual(reloads, [{}]);
});

test('Accept after Reject restores Mixpanel persistence and IP', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const mixpanel = fakeMixpanel();
  ctx.avoConsent.bindDestinations({ mixpanel });
  mixpanel.calls.length = 0;
  ctx.avoConsent.apply({ 4: true, 5: false });
  assert.deepEqual(plain(mixpanel.calls), [
    ['set_config', { disable_persistence: false, ip: true }],
    ['start_batch_senders'],
  ]);
});

test('a Mixpanel identity queued before binding is reset when anonymous', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const mixpanel = fakeMixpanel();
  ctx.avoConsent.bindDestinations({ mixpanel });
  assert.deepEqual(mixpanel.calls, [['reset']]);
});

test('anonymous Segment middleware passes the docs page view, anonymised', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const analytics = fakeAnalytics();
  ctx.avoConsent.bindDestinations({ analytics });
  const out = analytics.run({
    type: 'track',
    event: 'Docs Page Viewed',
    userId: 'u1',
    properties: { path: '/docs' },
  });
  assert.deepEqual(plain(out), {
    type: 'track',
    event: 'Docs Page Viewed',
    anonymousId: 'consent-rejected',
    context: { ip: '0.0.0.0' },
    properties: { path: '/docs', consent: 'rejected' },
    integrations: { All: false, 'Segment.io': true, Warehouses: { all: true } },
  });
});

test('anonymous Segment middleware drops every other event', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const analytics = fakeAnalytics();
  ctx.avoConsent.bindDestinations({ analytics });
  assert.equal(
    analytics.run({ type: 'track', event: 'Content Copied', properties: {} }),
    'dropped',
  );
});

test('full-mode Segment middleware leaves events untouched', () => {
  const ctx = load();
  const analytics = fakeAnalytics();
  ctx.avoConsent.bindDestinations({ analytics });
  const event = { type: 'track', event: 'Content Copied', userId: 'u1' };
  const snapshot = structuredClone(event);
  assert.deepEqual(plain(analytics.run(event)), snapshot);
});

test('marketing Accept is ignored while Global Privacy Control is on', () => {
  const ctx = load({ gpc: true });
  ctx.avoConsent.apply({ 4: true, 5: true });
  assert.equal(lastConsent(ctx).params.ad_storage, 'denied');
  assert.equal(
    ctx.dataLayer.some(
      (e) => e && e.event === 'iubenda_marketing_consent_given',
    ),
    false,
  );
});

test('marketing Accept grants the ad signals and fires the GTM event once', () => {
  const ctx = load();
  ctx.avoConsent.apply({ 4: true, 5: true });
  ctx.avoConsent.apply({ 4: true, 5: true });
  assert.equal(lastConsent(ctx).params.ad_personalization, 'granted');
  assert.equal(
    ctx.dataLayer.filter(
      (e) => e && e.event === 'iubenda_marketing_consent_given',
    ).length,
    1,
  );
});

test('FullStory does not start on the default (no choice) state', () => {
  const FS = fakeFullStory();
  const ctx = load({ FS });
  ctx.avoConsent.bindDestinations({});
  ctx.avoConsent.apply(null);
  assert.deepEqual(FS.calls, []);
});

test('FullStory starts once Measurement is accepted', () => {
  const FS = fakeFullStory();
  const ctx = load({ FS });
  ctx.avoConsent.apply({ 4: true, 5: false });
  ctx.avoConsent.apply({ 4: true, 5: false });
  assert.deepEqual(FS.calls, ['restart']);
});

test('a stored Measurement accept starts FullStory at bind time', () => {
  const FS = fakeFullStory();
  const ctx = load({ FS, cookie: storedChoice({ 4: true, 5: false }) });
  ctx.avoConsent.bindDestinations({});
  assert.deepEqual(FS.calls, ['restart']);
});

test('FullStory stops when Measurement is rejected after an accept', () => {
  const FS = fakeFullStory();
  const ctx = load({ FS });
  ctx.avoConsent.apply({ 4: true, 5: false });
  ctx.avoConsent.apply({ 4: false, 5: false });
  assert.deepEqual(FS.calls, ['restart', 'shutdown']);
});

test('FullStory capture-on-startup is switched off before the SDK loads', () => {
  const ctx = load();
  assert.equal(ctx._fs_capture_on_startup, false);
});

test('anonymous destination options disable persistence and IP', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const { mixpanel, segment } = ctx.avoConsent.avoDestinationOptions();
  assert.deepEqual(
    [
      mixpanel.disable_persistence,
      mixpanel.batch_requests,
      mixpanel.ip,
      segment.disableClientPersistence,
    ],
    [true, false, false, true],
  );
});

test('full-mode destination options keep persistence and IP', () => {
  const ctx = load();
  const { mixpanel, segment } = ctx.avoConsent.avoDestinationOptions();
  assert.deepEqual(
    plain([
      mixpanel.disable_persistence,
      mixpanel.batch_requests,
      mixpanel.ip,
      segment,
    ]),
    [false, true, true, {}],
  );
});

test('anonymous Mixpanel hook anonymises the page view and drops the rest', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const { hooks } = ctx.avoConsent.avoDestinationOptions().mixpanel;
  const pageView = hooks.before_send_events({
    event: 'Docs Page Viewed',
    properties: { distinct_id: 'd', $device_id: 'd', $user_id: 'u' },
  });
  assert.deepEqual(pageView.properties, {
    distinct_id: 'consent-rejected',
    $device_id: 'consent-rejected',
    consent: 'rejected',
  });
  assert.equal(
    hooks.before_send_events({ event: 'Content Copied', properties: {} }),
    null,
  );
  assert.equal(hooks.before_send_people({ $set: {} }), null);
});

test('the iubenda config exposes only the purposes the bootstrap enforces', () => {
  const ctx = load();
  assert.equal(ctx._iub.csConfiguration.purposes, '1, 4, 5');
  assert.equal(ctx._iub.csConfiguration.googleConsentMode, false);
});

test('iubenda onPreferenceExpressed applies the expressed purposes', () => {
  const ctx = load();
  ctx._iub.csConfiguration.callback.onPreferenceExpressed({
    purposes: { 4: false, 5: false },
  });
  assert.equal(ctx.avoConsent.state.anonymous, true);
});

test('iubenda onReady falls back to the stored choice when the API has none', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  ctx._iub.cs = { api: { getPreferences: () => null } };
  ctx._iub.csConfiguration.callback.onReady();
  assert.equal(lastConsent(ctx).params.analytics_storage, 'denied');
});

function fakeInspectorFactory() {
  const factory = () => {
    factory.created += 1;
    return {
      _avoFunctionTrackSchemaFromEvent: (name) => factory.tracked.push(name),
    };
  };
  factory.created = 0;
  factory.tracked = [];
  return factory;
}

test('Avo Inspector is never created for a visitor who rejected', () => {
  const ctx = load({ cookie: storedChoice({ 4: false }) });
  const factory = fakeInspectorFactory();
  const inspector = ctx.avoConsent.gatedInspector(factory);
  inspector._avoFunctionTrackSchemaFromEvent('Docs Page Viewed', {});
  assert.deepEqual([factory.created, factory.tracked], [0, []]);
});

test('Avo Inspector is created once and reports schemas in full mode', () => {
  const ctx = load();
  const factory = fakeInspectorFactory();
  const inspector = ctx.avoConsent.gatedInspector(factory);
  inspector._avoFunctionTrackSchemaFromEvent('Docs Page Viewed', {});
  inspector._avoFunctionTrackSchemaFromEvent('Content Copied', {});
  assert.deepEqual(
    [factory.created, factory.tracked],
    [1, ['Docs Page Viewed', 'Content Copied']],
  );
});

test('Avo Inspector stops reporting after a mid-session Reject', () => {
  const ctx = load();
  const factory = fakeInspectorFactory();
  const inspector = ctx.avoConsent.gatedInspector(factory);
  inspector._avoFunctionTrackSchemaFromEvent('Docs Page Viewed', {});
  ctx.avoConsent.apply({ 4: false, 5: false });
  inspector._avoFunctionTrackSchemaFromEvent('Content Copied', {});
  assert.deepEqual(factory.tracked, ['Docs Page Viewed']);
});

test("stored Reject purges Avo Inspector's installation id on load", () => {
  const ctx = load({
    cookie: storedChoice({ 4: false }),
    localKeys: ['avoinspectormain/AvoInstallationId', 'theme'],
  });
  assert.deepEqual(Object.keys(ctx.localStorage), ['theme']);
});

test('a related iubenda cookie alone is not a stored choice', () => {
  const ctx = load({ cookie: `${IUBENDA_COOKIE}-uspr=x` });
  assert.equal(ctx.avoConsent.state.anonymous, false);
});

test('iubenda onPreferenceExpressed without purposes keeps a stored Reject', () => {
  const ctx = load({ cookie: storedChoice({ 4: false, 5: false }) });
  ctx._iub.csConfiguration.callback.onPreferenceExpressed({});
  assert.equal(ctx.avoConsent.state.anonymous, true);
});

test('iubenda onPreferenceExpressed without purposes reads the choice it just stored', () => {
  const ctx = load();
  ctx.document.cookie = storedChoice({ 4: false, 5: false });
  ctx._iub.csConfiguration.callback.onPreferenceExpressed({});
  assert.equal(ctx.avoConsent.state.anonymous, true);
});
