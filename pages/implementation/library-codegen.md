# Library codegen for Kotlin, Swift, and TypeScript

This page covers the library approach for generated tracking code. It's a different shape of output for Kotlin, Swift, and TypeScript sources. The previous (single-file) codegen is still supported.

---

## 1. Why the library approach?

`avo pull` now emits two files per source (three for TypeScript) instead of one. The shared runtime — `Avo` class, validation helpers, `AvoEvent` protocol/interface, `AvoInvoke` — lives in a separate "library" file. The per-source "app" file contains only the things that change when your tracking plan changes: per-event classes, the codegen-bound IDs, and (for TypeScript) the `DestinationKey` union.

### What the previous output looked like

A single file per source. The `Avo` class held mutable global state, owned the destination SDK, and exposed one method per event:

```swift
let avo = Avo(env: .dev, customDestination: myDestination)
avo.loginSuccess(name: "Alice", clientVersion: "1.2.3")
```

This caused several friction points:

- **Every plan change rewrote the whole file.** Changes to the runtime, the assertion helpers, and the per-event functions all landed in the same diff. Reviewing a property rename meant scrolling past hundreds of lines of unchanged plumbing.
- **One shape of destination wiring per app.** The destination was bound to the `Avo` instance at construction time. Sharing tracking code across apps in a monorepo, or routing the same events to different SDKs in different builds, was awkward.
- **Runtime code couldn't be shared.** Two sources in the same project produced two copies of the runtime — same `AvoAssert`, same `AvoInvoke`, duplicated.

### What's different now

- **Library file**: the runtime. `AvoEnv`, `AvoAssert`, `AvoInvoke`, the `AvoEvent` protocol/interface, and the `Avo` class. Regenerated rarely.
- **App file**: per-event types and a thin config object. Regenerated whenever the tracking plan changes.
- **TypeScript only**: a third file, `AvoConfig.ts`, holds the codegen-bound `schemaId`/`actionId`/`branchId`/`sourceId` plus destination API keys. It has no runtime imports — just the values.

### Mental model

Events are values you construct. The `Avo` instance turns them into per-destination payloads.

```
LoginSuccessEvent(name = "Alice")  ──┐
                                     ├──> avo.process / avo.track ──> { "Custom": AvoDestinationEvent(...) }
            (a plain data type)      ┘
```

The boundary: **the library file knows nothing about your tracking plan**. The app file knows nothing about how validation or invocation metrics work. The customer decides what to do with the per-destination map the call returns.

In Swift and Kotlin the returned map is the *only* thing the runtime gives you — fan-out to your analytics SDKs is your job. In TypeScript you can either fan out yourself or pass `AvoDestination` implementations into `Avo.init()` and let the runtime call them.

### When it isn't the right fit

- You're on a language other than Kotlin, Swift, or TypeScript. The library approach is implemented only for those three.
- You rely on the previous shape of the `Avo` class (e.g. `avo.loginSuccess(...)` method calls). You'll need to update call sites — see the migration section below.
- You want the runtime and per-event code in a single file for build-system reasons. The legacy single-file codegen is still supported; don't opt in.

---

## 2. Quick start

Pull library-shaped code for an existing source by enabling the library-interface mode on that source, then run `avo pull`. The CLI will emit the library file alongside the existing source file (and `AvoConfig.ts` for TypeScript).

> **Note:** the exact opt-in flag name surfaced to customers isn't covered here — see Questions / gaps at the end.

### Kotlin

`avo pull` produces:

- `Analytics.kt` — per-event data classes and `AvoTrackingPlanConfig`
- `AnalyticsLibraryInterface.kt` — runtime (`Avo` class, `AvoEvent`, `AvoAssert`, `AvoInvoke`)

Both files share the same package (inferred from the source path, default `sh.avo`).

**Setup.** Add both files to your Gradle module. Both depend on `org.json` (available on Android out of the box) and `kotlinx.coroutines` if you've enabled coroutines or you're on Kotlin Multiplatform.

**Initialize.** Use the `initAvo` extension that's generated alongside the per-event classes:

```kotlin
import sh.avo.Avo
import sh.avo.AvoEnv
import sh.avo.LoginSuccessEvent
import sh.avo.initAvo

val avo = Avo.initAvo(env = AvoEnv.DEV)

val payloads = avo.process(LoginSuccessEvent(
    timestamp = 1730000000,
    teamId = "team_42",
    teamDomain = "acme.example"
))

payloads["custom"]?.let { event ->
    myAnalyticsSdk.logEvent(event.name, event.properties)
}
```

`process()` returns `Map<String, AvoDestinationEvent>` keyed by destination name (lowercased identifier from your Avo workspace). The map is empty in noop mode. Validation failures throw `AvoVerificationError` when `strict = true` (the default) and log a warning otherwise.

### Swift

`avo pull` produces:

- `Analytics.swift` — `AvoTypes` namespace, per-event structs, `AvoTrackingPlanConfig`, and an `extension Avo` with a no-config `initAvo`
- `AnalyticsLibraryInterface.swift` — runtime

The app file does `import Library`. The library file is intended to be packaged as a Swift module named `Library`. See Questions / gaps for how customers are expected to set this up.

**Initialize.**

```swift
import Library

let avo = Avo.initAvo(env: .dev)

do {
    let payloads = try avo.process(event: LoginSuccessEvent(
        timestamp: 1730000000,
        teamId: "team_42",
        teamDomain: "acme.example"
    ))

    if let event = payloads["custom"] {
        MyAnalyticsSDK.logEvent(name: event.name, properties: event.properties)
    }
} catch let error as AvoVerificationError {
    // Validation failed in non-prod with strict = true.
    print("Avo verification: \(error.messages.joined(separator: \", \"))")
}
```

`process(event:)` returns `[String: AvoDestinationEvent]`. It throws `AvoVerificationError` when validation fails and `strict` is on; otherwise it logs via `NSLog` and continues.

### TypeScript

`avo pull` produces three files:

- `Avo.ts` — per-event classes (`LoginSuccessEvent`, etc.) extending `BaseAvoEvent`, plus re-exports of the public runtime surface
- `AvoLibrary.ts` — runtime (`Avo` class, `AvoEvent`, `AvoAssert`, `BaseAvoEvent`)
- `AvoConfig.ts` — codegen-bound config (default export), `DestinationKey` union, and per-destination API keys

`AvoConfig.ts` is the only file that contains your `schemaId`/`actionId`/`branchId`. Move it (and update the import path) to wherever you want `Avo.init` to live — at the app level, a library level, or any module boundary.

**Setup.** Drop the three files into your project. No package manager step beyond what your TypeScript build already does — there are no runtime dependencies outside the standard library and `fetch` (used by `AvoInvoke`).

**Initialize.** `Avo.init` takes two arguments: a runtime `AvoConfig` and the codegen-bound config (default-exported from `AvoConfig.ts`):

```ts
import { Avo, AvoEnv } from './Avo';
import { LoginSuccessEvent } from './Avo';
import codegenConfig from './AvoConfig';

const avo = Avo.init({ env: AvoEnv.Dev }, codegenConfig);

const payloads = avo.track(new LoginSuccessEvent(1730000000, 'team_42', 'acme.example'));

const custom = payloads['Custom'];
if (custom) {
  myAnalyticsSDK.logEvent(custom.name, custom.properties);
}
```

`track()` returns `Record<string, AvoDestinationEvent>`. The keys match `DestinationKey` from `AvoConfig.ts` (each destination name from your workspace, PascalCase). If you'd rather let the runtime fan out for you, pass `destinations` in the `AvoConfig`:

```ts
const avo = Avo.init(
  {
    env: AvoEnv.Dev,
    destinations: {
      Custom: {
        make(env, apiKey) { /* initialize your SDK */ },
        logEvent(event) { myAnalyticsSDK.logEvent(event.name, event.properties); },
        setUserProperties(userId, props) { myAnalyticsSDK.identify(userId, props); },
      },
    },
  },
  codegenConfig,
);

avo.track(new LoginSuccessEvent(1730000000, 'team_42', 'acme.example'));
```

`destinations` is all-or-nothing: you must provide an implementation for every `DestinationKey` or `Avo.init` will throw. Omit `destinations` entirely to opt out of internal fan-out — `track()` still returns the per-destination payload map.

---

## 3. Migration from the previous codegen

### Before / after

#### Kotlin

```kotlin
// Before
val avo = Avo(env = AvoEnv.DEV, customDestination = MyCustomDestination())
avo.loginSuccess(
    timestamp = 1730000000,
    teamId = "team_42",
    teamDomain = "acme.example",
)

// After
val avo = Avo.initAvo(env = AvoEnv.DEV)
val payloads = avo.process(LoginSuccessEvent(
    timestamp = 1730000000,
    teamId = "team_42",
    teamDomain = "acme.example",
))
payloads["custom"]?.let { event ->
    myAnalyticsSdk.logEvent(event.name, event.properties)
}
```

#### Swift

```swift
// Before
let avo = Avo(env: .dev, customDestination: MyCustomDestination())
avo.loginSuccess(
    timestamp: 1730000000,
    teamId: "team_42",
    teamDomain: "acme.example"
)

// After
let avo = Avo.initAvo(env: .dev)
let payloads = try avo.process(event: LoginSuccessEvent(
    timestamp: 1730000000,
    teamId: "team_42",
    teamDomain: "acme.example"
))
if let event = payloads["custom"] {
    MyAnalyticsSDK.logEvent(name: event.name, properties: event.properties)
}
```

#### TypeScript

```ts
// Before
import Avo from './Avo';
Avo.initAvo({ env: Avo.AvoEnv.Dev }, /* destinations */ {});
Avo.loginSuccess({
  timestamp: 1730000000,
  teamId: 'team_42',
  teamDomain: 'acme.example',
});

// After
import { Avo, AvoEnv, LoginSuccessEvent } from './Avo';
import codegenConfig from './AvoConfig';

const avo = Avo.init({ env: AvoEnv.Dev }, codegenConfig);
avo.track(new LoginSuccessEvent(1730000000, 'team_42', 'acme.example'));
```

### Checklist of changes in your app

1. **Drop the legacy `Avo` constructor**. Replace direct `Avo(...)` / `Avo.initAvo(...)` calls with the new init that takes no destinations (Swift, Kotlin) or accepts the codegen-bound config from `AvoConfig.ts` (TypeScript).
2. **Replace event method calls with event constructors and a single `process` / `track` call.** Each `avo.someEvent(...)` becomes `avo.process(SomeEvent(...))` (Swift/Kotlin) or `avo.track(new SomeEvent(...))` (TypeScript).
3. **Move your destination SDK calls to your own code (Swift/Kotlin).** The new `process()` returns a per-destination payload map; the legacy `Avo` class invoked your destinations for you. You're now responsible for calling `myAnalyticsSDK.logEvent(name, properties)`.
4. **In TypeScript, choose between manual fan-out and `AvoConfig.destinations`.** If you keep manual fan-out, the migration is closer to Swift/Kotlin. If you wire up `destinations`, you must implement the `AvoDestination` interface (`make`, `logEvent`, `setUserProperties`) for every destination — all-or-nothing.
5. **Update system properties calls (if you use them).** `setSystemProperties(...)` / `Avo.setSystemProperties(...)` becomes `AppSystemProperties.configure(...)` (Kotlin) or `AppSystemProperties.shared.configure({...})` (Swift, TypeScript). Call this once at startup before tracking any events.
6. **Update imports.** Add the library file to your build and import its types where you previously imported from the single `Avo` file. In Swift this is `import Library`; in Kotlin it's `import sh.avo.*` (or whatever package your source path resolves to); in TypeScript it's `import { ... } from './Avo'` (the app file re-exports the public library surface).

### What stays the same

- **Event names, property names, and validation rules.** The tracking plan is unchanged — only the shape of the generated code changed.
- **Strict / noop modes.** `strict` (throw on validation failure in non-prod) and `noop` (drop everything) still work the same way.
- **Inspector integration.** You still pass your Avo Inspector instance into the init call, and the runtime still forwards events to it.
- **The `avo pull` workflow.** Same command, same authentication, same source/destination configuration in your Avo workspace.
- **Destination API keys.** Still embedded by codegen. In TypeScript they're in `AvoConfig.ts`; in Swift/Kotlin they're held inside `AvoTrackingPlanConfig` and used by the `initAvo` extension.

### Breaking changes to watch for

- **The `Avo` constructor signature.** Both Swift and Kotlin's legacy `Avo` took a `customDestination` argument; the new one doesn't. Old call sites will fail to compile.
- **Per-event method calls.** `avo.someEvent(...)` is gone. The compiler will catch every site that needs to change.
- **Swift `process(event:)` throws.** The legacy `someEvent(...)` method did not. Wrap in `do / catch` or `try?` depending on whether you want strict-mode validation failures to surface.
- **TypeScript: `track` instead of `Avo.someEvent(...)`.** The free-function shape is replaced by `avo.track(new SomeEvent(...))`. If you previously imported `Avo` and called methods on it, those methods no longer exist on the instance.
- **TypeScript destination shape.** Custom destinations are no longer a single callback object; they implement `AvoDestination` with `make / logEvent / setUserProperties`. Existing custom-destination implementations will not type-check.
- **AppSystemProperties is the only way to set system properties.** The free `setSystemProperties` / static `Avo.setSystemProperties` functions are not generated in library mode. Required system properties not set via `AppSystemProperties.configure(...)` are dropped, with a console warning.
- **No `setAvoLogger` for Swift.** The library uses `NSLog` directly. Kotlin's `Avo` instance still exposes `setAvoLogger(...)` for redirecting log output.

---

## Questions / gaps

The following could not be verified from the codegen source and need a real answer before this doc ships:

1. **CLI opt-in flag.** The codegen distinguishes `#KotlinLibraryInterface`, `#SwiftLibraryInterface`, `#TypeScriptLibraryInterface` feature flags internally (see `AvoCore.res:484–520`). What's the customer-facing way to enable each one — a per-source toggle in the Avo workspace, a `avo.json` field, or a CLI flag on `avo pull`?
2. **Swift module setup.** The generated app file does `import Library` (`AvoSwift.res:7457`, default `libraryModuleName = "Library"`). What's the recommended way to create that Swift module — a separate SPM package, an Xcode target, an `internal` framework? Is the library module name configurable per project?
3. **Kotlin Gradle layout.** Should the library file go in a separate Gradle module or coexist with the app file in the same module? The codegen infers the package from the source path; what happens when customers want different packages for the two files?
4. **TypeScript: built-in destination wrappers.** The TypeScript app file emits "built-in `AvoDestination` wrapper classes for each plan destination" according to the codegen comments (`AvoTypeScript.res:8875`). I didn't find an example snapshot showing one. Are these emitted when the destination is a known SDK (Amplitude, Mixpanel) and customers just pass them in? Or do customers always write their own `AvoDestination`?
5. **`AppSystemProperties.isConfigured` prerequisite.** The codegen says per-event classes throw if system properties aren't configured (`AvoTypeScript.res:8509–8513`). What's the actual exception type and message customers see? Does it differ between TypeScript, Swift, and Kotlin?
6. **Inspector setup.** The library exposes a structural `AvoInspector` interface (TypeScript) / `Any?` (Kotlin) / `AnyObject?` (Swift). How do customers obtain an Inspector instance to pass in — is it a separate package, or does the existing Avo Inspector SDK satisfy this interface?
7. **Co-existence with the legacy codegen.** Can a single source be flipped from legacy to library mode in place, or must customers create a new source? Is there a deprecation timeline for the legacy single-file output?
8. **TypeScript `destinations` partial mode.** The runtime supports "zero destinations" (no fan-out) and "full destinations" (all-or-nothing). What's the recommended pattern for customers who want internal fan-out for some destinations and manual fan-out for others? They appear to have to pick one mode globally.
9. **Snowplow / Adobe-Experience-Platform / mParticle.** These have their own codegen modules but I didn't verify whether the library approach interacts with them. Is library mode mutually exclusive with destination-specific codegen, or do they compose?
10. **Versioning of the library file.** Since the library file is shared runtime, what happens when a customer is on, say, codegen v1.0.0 in one source and v1.1.0 in another that share the same library file? Does `avo pull` regenerate both, or does it warn?
