# Feature Spec: Swift & Kotlin Codegen Docs — API Shapes

**Feature Name:** `swift-codegen-docs-api-shapes`
**Created:** 2026-04-02
**Status:** Draft — Rev 3 (Morticia Rev 2 fixes)

## Problem Statement

The Swift and Kotlin codegen documentation inadequately documents the constructor/object-based pattern (`let avo = Avo.initAvo(...); avo.eventName(...)`). Developers evaluating Avo for dependency-injection-heavy codebases (e.g., using swift-dependencies or Hilt) cannot discover from the docs that Avo supports a testability-friendly interface. This creates friction during the evaluation phase and risks the impression that Avo's codegen is too rigid for modern DI-first architectures.

Origin: Intercom support request (Linear: AVO-2599).

## Current State Analysis

Before scoping implementation work, the actual state of the three files:

### `swift.mdx` Step 2

- **Constructor pattern present?** Yes — "Initialize Avo by creating an object using constructor" with `val avo = Avo(env: .dev, ...)`
- **Issues:**
  - `val` keyword is wrong in Swift; should be `let`
  - Call shape `Avo(...)` differs from actual codegen `Avo.initAvo(...)`
  - No DI/testability note
  - No legacy static section

### `swift.mdx` Reference > Constructor

- **Constructor pattern present?** Yes — shows constructor signature
- **Issues:**
  - Describes object-based init but does not show the call site pattern or DI use case
  - **Discrepancy:** The existing Reference > Constructor section (lines ~82–100) shows the signature as `public init(env: AvoEnv, ...)` — a standard Swift initializer signature — but the actual generated call site is `let avo = await Avo.initAvo(env: .dev, ...)` (a static async factory method returning `Avo`). The `public init` signature is inconsistent with the actual API shape confirmed in the platform test files. The implementer must update this Reference signature to reflect the `static func initAvo(...) async -> Avo` factory form. This fix is **in scope** for this revision; see AC 14.

### `kotlin.mdx` Step 2

- **Constructor pattern present?** Yes — with `val avo = AvoImpl(env = AvoEnv.DEV, ...)`
- **Issues:**
  - Class name and call shape are correct for a generic workspace
  - No DI/testability note
  - No legacy static section

### `kotlin.mdx` Reference > Constructor

- **Constructor pattern present?** Yes
- **Issues:**
  - Present and structurally correct
  - Has a pre-existing `Map<String, *` syntax error (unclosed generic) in the destination interface example — known pre-existing defect, out of scope for this spec, do not worsen it

### `avo-codegen-tech-deep-dive.mdx`

- **Constructor pattern present?** No — only static pattern shown
- **Issues:** Does not name or distinguish the two API shapes

### Implementation Scope

The work is narrower than "add the constructor pattern from scratch." The priority is:

1. Fix the `val`→`let` keyword and call-shape accuracy in `swift.mdx` Step 2
2. Add DI/testability callouts on both reference pages
3. Add legacy static collapsible sections on both reference pages
4. Update the tech deep dive to explain both shapes

The constructor Reference sections already exist.

## Goals

1. A developer evaluating Avo for a DI-heavy Swift or Kotlin codebase can discover the constructor/object-based pattern from the docs without requiring a support request.
2. The static/legacy pattern remains documented so existing workspace users are not broken, but it is clearly identified as legacy.
3. The codegen tech deep dive page accurately describes both available API shapes at the initialization level.

## User Stories Overview

- As a Swift developer adopting a DI framework (e.g., swift-dependencies), I want to see how to instantiate the Avo object and inject it as a dependency so that I know Avo fits my architecture before integrating it.
- As a Kotlin/Android developer using Hilt or a similar DI container, I want to see the constructor-based Avo initialization pattern so that I can evaluate whether Avo is compatible with my testability approach.
- As an existing Avo user on the legacy static pattern, I want the static pattern to remain documented so that I do not need to migrate my codebase when updating docs-referenced setup.
- As a developer reading the codegen tech deep dive, I want to understand what API shapes are available in the generated file so that I know which one applies to my workspace.

## Affected Areas

| Area | Files/Modules | Impact |
|------|--------------|--------|
| Swift language reference | `pages/reference/avo-codegen/programming-languages/swift.mdx` | Fix `val`→`let` in Step 2; correct call shape to `Avo.initAvo(...)`; add DI/testability callout; add legacy static collapsible section |
| Kotlin language reference | `pages/reference/avo-codegen/programming-languages/kotlin.mdx` | Add DI/testability callout; add legacy static collapsible section |
| Codegen tech deep dive | `pages/implementation/avo-codegen-tech-deep-dive.mdx` | Update Initialization section to name and explain both API shapes |

## Pedagogical Design Note: Making Two Patterns with the Same Method Name Look Distinct

Both patterns call `Avo.initAvo(...)` (Swift) or `AvoImpl(...)` (Kotlin). Without deliberate presentation, the two code blocks will look nearly identical. The documentation must make the distinction unmissable:

- **Swift:** The constructor pattern must show `let avo = Avo.initAvo(env: .dev, ...)` with the return-value capture visually prominent. The static pattern shows `Avo.initAvo(env: .dev, ...)` with no assignment. The prose must call out this difference explicitly: "With the constructor pattern, `initAvo` returns an `Avo` instance that you store and inject. With the static pattern, the return value is discarded and state is stored globally."
- **Kotlin:** Same approach — `val avo = AvoImpl(...)` vs. the static `Avo.initAvo(...)` call that assigns no instance variable.
- **Visual hierarchy:** The constructor pattern is the primary section (no collapse). The static pattern is in a `<details>/<summary>` element labelled "Legacy: Static pattern" — its collapsed state reinforces that it is secondary.
- **The DI callout:** Placing an explicit testability/DI sentence immediately after the constructor example (before the static section) primes the reader with the "why" before they see the "what."

## Existing Patterns to Follow

| Pattern | Where | Why Relevant |
|---------|-------|-------------|
| `<Callout type="info">` from nextra/components | `pages/implementation/avo-codegen-tech-deep-dive.mdx` (and many other pages) | Use for DI/testability note on both reference pages |
| `<details>/<summary>` HTML collapsible | `pages/implementation/guides/start-using-inspector-with-avo-codegen.mdx`, `pages/data-design/guides/bulk-editing.mdx` | Use for the legacy static section; must be closed by default (no `open` attribute) |
| Code fence with language tag | All reference pages | All code examples use fenced code blocks with language identifiers (`swift`, `kotlin`) |

**Component assignment per location (not optional — implementer must follow this):**

| File | Location | Component to use |
|------|----------|-----------------|
| `swift.mdx` | DI/testability benefit note after constructor example | `<Callout type="info">` — requires adding `import { Callout } from 'nextra/components'` to `swift.mdx` |
| `swift.mdx` | Legacy static section | `<details>/<summary>` (no `open` attribute) |
| `kotlin.mdx` | DI/testability benefit note after constructor example | `<Callout type="info">` — requires adding `import { Callout } from 'nextra/components'` to `kotlin.mdx` |
| `kotlin.mdx` | Legacy static section | `<details>/<summary>` (no `open` attribute) |
| `avo-codegen-tech-deep-dive.mdx` | Both pattern descriptions | `<Callout type="info">` (import already present) |

## Constraints

- **Performance:** No performance impact; changes are documentation-only.
- **Compatibility:** No new npm dependencies. Native HTML `<details>`/`<summary>` for collapsibles. `Callout` import must be added to `swift.mdx` and `kotlin.mdx`.
- **Security:** No security implications; documentation change only.
- **Accuracy:** Code examples must be derived from actual codegen output in the platform test files, not hand-crafted. Examples must remain generic (no test-harness-specific system properties). See the Swift async constraint clarification below.

**Swift async/await constraint (replaces the blanket "no async" rule):**

All Swift constructor test files (`constructor_analytics/Buttons/Managers/AppDelegate.swift`, `constructor_analytics/ButtonsTests/Helpers/AvoHelper.swift`, `swift6_actor/Buttons/ViewController.swift`) use `async/await` — there is no non-async constructor call site in the test suite. The constraint is therefore:

- **Swift constructor example:** May show `await Avo.initAvo(env: .dev, ...)` inside a `Task { }` block, since this matches the actual generated API. The prose must note this is because the constructor is an async method. Alternatively, the example may omit the `Task { }` wrapper and show only the `await Avo.initAvo(...)` call with a prose note that it must be called from an async context.
- **Swift static example:** Must not contain `await`, `async`, or `actor` keywords. Source: `static_analytics/Buttons/Managers/AppDelegate.swift` — uses `Avo.initAvo(env: .dev, ...)` synchronously.
- **The actor/async specifics** (Swift 6 strict concurrency, `@MainActor`, actor isolation) remain out of scope and must not appear in the documentation.

## Out of Scope

- Library interface / event-typed pattern (`avo.track(AvoEvent.myEvent)`) — internal, not ready for docs.
- Swift 6 / actor-based strict concurrency patterns, `@MainActor`, actor isolation — covered separately.
- Other programming languages (TypeScript, JavaScript, Python, etc.).
- Migration guide for moving from static to constructor pattern.
- Changes to any page other than the three listed above.
- The pre-existing `Map<String, *` syntax error in `kotlin.mdx`'s destination interface example — known pre-existing defect, do not fix or worsen.
- The pre-existing `######` heading for "Additional arguments" in `kotlin.mdx` after the destination interface section — known structural oddity, do not worsen the heading hierarchy.
- Error handling for `initAvo` in strict mode: the existing `strict` parameter documentation already covers this; no new content needed.

## Edge Cases

- **Workspace still generates the static pattern:**
  The `<details>/<summary>` section clearly states it applies to existing/legacy workspaces; no instruction to migrate.

- **Swift async constructor:**
  The constructor example may include `await` since all constructor-pattern generated files produce an async `initAvo`. The example must be wrapped in `Task { }` or accompanied by a prose note. Actor/Swift 6 specifics are still excluded.

- **Kotlin class name varies by workspace prefix:**
  The constructor class name is `[WorkspacePrefix]AvoImpl`. For a generic new workspace the prefix is empty → class is `AvoImpl`. The test file uses `ConstructorAvoImpl` because the test workspace is prefixed "Constructor." Documentation must use the generic `AvoImpl` with a note about prefix variation.

- **Kotlin Multiplatform workspaces:**
  Include a note that `AvoImpl` is the default class name and that KMP beta users may see a different name, mirroring the existing KMP caveat.

- **Developer reads only the Quickstart section:**
  Step 2 must show the constructor pattern as the default, not the static one.

- **Tech deep-dive references `initAvo` static method:**
  The existing static example must remain but be labelled as one of two available shapes, with the constructor shape introduced alongside it.

## Acceptance Criteria

- [ ] **AC 1 — Swift Step 2 call shape:** The Swift docs page (`swift.mdx`) Step 2 shows `let avo = Avo.initAvo(env: .dev, ...)` (not `val`, not `Avo(env: .dev, ...)`). The `let` keyword is Swift-correct and the call shape matches the actual generated `Avo.initAvo` factory method. The Step 2 section must not contain a static pattern code block; the static pattern appears only in the Reference section's collapsible `<details>` element. An implementation that shows both patterns in Step 2 is a failing outcome.
- [ ] **AC 2 — Swift legacy section:** The Swift docs page includes a `<details>` element (without the `open` attribute, so collapsed by default) with a `<summary>` labelled "Legacy: Static pattern" that documents `Avo.initAvo(env: .dev, ...)` (void return, no assignment) and `Avo.eventName(...)` usage.
- [ ] **AC 3 — Kotlin Step 2:** The Kotlin docs page (`kotlin.mdx`) shows `val avo = AvoImpl(env = AvoEnv.DEV, ...)` as the primary/default approach. The class name `AvoImpl` is used (generic workspace default), with a note that the actual class name matches the workspace prefix. The Step 2 section must not contain a static pattern code block; the static pattern appears only in the Reference section's collapsible `<details>` element. An implementation that shows both patterns in Step 2 is a failing outcome.
- [ ] **AC 4 — Kotlin legacy section:** The Kotlin docs page includes a `<details>` element (without the `open` attribute, so collapsed by default) with a `<summary>` labelled "Legacy: Static pattern" that documents `StaticAvo.initAvoWithInspector(inspector, application, context, AvoEnv.DEV, ...)` as the static init call shape and `StaticAvo.eventName(...)` as the static event call shape, sourced from `staticanalytics/StaticActivity.kt`. Using `initAvo(...)` (without `WithInspector`) is a failing outcome — the Kotlin static init method is `initAvoWithInspector`.
- [ ] **AC 5 — Tech deep dive names both shapes and states the correct default:** The tech deep dive page (`avo-codegen-tech-deep-dive.mdx`) Initialization section explicitly states: (a) the constructor/object-based pattern is the default for all new workspaces, and (b) the static pattern applies to existing/legacy workspaces. A reviewer can verify both statements are present and correct — stating the reverse (static as default) is a failing outcome.
- [ ] **AC 6 — Swift constructor async correctness:** The Swift constructor example either (a) shows `await Avo.initAvo(env: .dev, ...)` inside a `Task { }` block with a prose note explaining it is async, or (b) shows the bare `await Avo.initAvo(...)` call with a note that it must be called from an async context. The example does not contain `actor` keyword or Swift 6 strict concurrency patterns.
- [ ] **AC 7 — No library interface mention:** No page mentions the library interface / event-typed pattern (`avo.track(AvoEvent...)` or equivalent).
- [ ] **AC 8 — DI/testability callout on both pages:** Each reference page (`swift.mdx` and `kotlin.mdx`) includes a `<Callout type="info">` immediately following the constructor pattern example that explicitly states the constructor pattern enables dependency injection and names an example DI framework relevant to that language (swift-dependencies for Swift; Hilt for Kotlin).
- [ ] **AC 9 — Static pattern identified as legacy:** The static pattern sections on both reference pages and the tech deep dive are clearly identified as applying to legacy/existing workspaces and not recommended for new integrations.
- [ ] **AC 10 — Code example accuracy verification:** The writer confirms each code example against the designated source file before submitting. Specifically: Swift constructor init example against `constructor_analytics/Buttons/Managers/AppDelegate.swift`; Swift constructor usage example (AC 15) against `static_analytics/Buttons/Controllers/ViewController.swift` (which shows the static event call shape `Avo.testEmptyEvent()` — use the analogous instance form `avo.someEvent()` for the constructor usage example); Swift static init example against `static_analytics/Buttons/Managers/AppDelegate.swift`; Swift static usage example against `static_analytics/Buttons/Controllers/ViewController.swift`; Kotlin constructor example against `constructoranalytics/ConstructorActivity.kt` (using `AvoImpl` as the generic name); Kotlin static example against `staticanalytics/StaticActivity.kt`. Each example must compile if the destination interface is provided. For the Kotlin constructor example, the generic example will differ from the workspace-specific test file in class name (`AvoImpl` vs `ConstructorAvoImpl`) and parameter count; accuracy check is limited to verifying that `application`, `context`, and `AvoEnv.DEV` appear as the first three positional parameters, consistent with `ConstructorActivity.kt`, and that at least one system property placeholder or comment is present. **Warning:** `ConstructorActivity.kt` contains both `avo.testEmptyEvent()` (the correct instance method call) and `avo.track(ConstructorAvoBase.AvoEvent.TestEmptyEventEvent)` (the library interface pattern, excluded by AC 7) on adjacent lines. Only the `avo.testEmptyEvent()` form should appear in documentation; the `avo.track(...)` call must not appear. A note in the PR description must confirm which file each example was verified against.
- [ ] **AC 11 — KMP caveat present:** The Kotlin reference page includes a note that `AvoImpl` is the default class name for new workspaces and that Kotlin Multiplatform (beta) users may see a different class name, consistent with the existing KMP caveat already on the Kotlin page.
- [ ] **AC 12 — Callout imports added:** `swift.mdx` and `kotlin.mdx` both include `import { Callout } from 'nextra/components'` at the top of the file (or wherever imports are placed in those files).
- [ ] **AC 13 — Build passes:** The docs site builds without errors after all changes are applied (`npm run build` in the docs repo passes with no compilation errors introduced by this change).
- [ ] **AC 14 — Swift Reference Constructor signature corrected:** The `swift.mdx` Reference > Constructor section shows the factory method signature as `static func initAvo(...) async -> Avo` (or equivalent accurate form), not `public init(env: AvoEnv, ...)`. The `public init` form is a failing outcome because the actual generated API is a static async factory method, as confirmed by `constructor_analytics/Buttons/Managers/AppDelegate.swift` (which calls `avo = await Avo.initAvo(...)`). The updated signature must be consistent with the `Avo.initAvo(...)` call form mandated by AC 1 and AC 6.
- [ ] **AC 15 — Swift constructor usage example present:** The Swift constructor pattern section includes a usage example showing `avo.someEvent()` (or an equivalent generic instance method call) following the init code block, demonstrating that the returned `Avo` instance is called to track events via instance methods. An implementation that shows only the init call and omits the instance usage call is a failing outcome. Source for the call shape: `static_analytics/Buttons/Controllers/ViewController.swift` (static usage pattern `Avo.testEmptyEvent()` — use the analogous instance form `avo.testEmptyEvent()` for the constructor section).
- [ ] **AC 16 — Prose distinguishes constructor vs. static `initAvo` return types:** The prose accompanying the two Swift pattern examples explicitly states that the constructor `initAvo` returns an `Avo` instance (which is stored and injected as a dependency) while the static `initAvo` returns void (storing state globally). An implementation that shows two nearly-identical code blocks with no explanatory text distinguishing return type and state model is a failing outcome.

## Open Questions Resolved

- **Which pattern is the default for new workspaces?**
  Constructor/object-based is the default for all new workspaces. Lead with it.

- **Should we create new pages or update existing ones?**
  Update existing pages in-place only. No new pages.

- **Should the static pattern be completely removed?**
  No. It must remain documented in a collapsible section since existing workspaces still use it.

- **Should Swift examples use actor/async?**
  The constructor example must use `await` because all constructor-variant generated files produce an async `initAvo`. Actor/Swift 6 strict concurrency specifics remain excluded. The static example must not use `await`.

- **What collapsible component to use?**
  Use native HTML `<details>`/`<summary>` elements, consistent with the pattern in `start-using-inspector-with-avo-codegen.mdx` and `bulk-editing.mdx`. The `<details>` element must not have the `open` attribute.

- **What is the accurate Swift constructor call site?**
  `let avo = await Avo.initAvo(env: .dev, ...)` (async factory method returning an `Avo` instance); event tracking via `avo.testEmptyEvent()`.
  Source: `constructor_analytics/Buttons/Managers/AppDelegate.swift` — uses `Task { avo = await Avo.initAvo(...) }`

- **Is there a non-async Swift constructor call site in the test suite?**
  No. All constructor-analytics Swift test files call `await Avo.initAvo(...)` wrapped in a `Task`. There is no synchronous constructor call site. The original "no async" constraint is revised to allow `await` in the constructor example while still excluding actor/Swift 6 specifics.

- **What is the accurate Kotlin constructor class name?**
  The generated class is named `[WorkspacePrefix]AvoImpl`. The test workspace prefix is "Constructor", producing `ConstructorAvoImpl`. For a generic new workspace (no prefix), the class is `AvoImpl`. Documentation must use `AvoImpl` as the generic name with a note about workspace prefix variation.
  Source: `constructoranalytics/ConstructorActivity.kt` — uses `ConstructorAvoImpl`; `kotlin.mdx` already uses `AvoImpl` as the generic form.

- **What is the accurate Kotlin constructor call site?**
  `val avo = AvoImpl(application, context, AvoEnv.DEV, ...)` then `avo.testEmptyEvent()`.
  Source: `constructoranalytics/ConstructorActivity.kt`, with `AvoImpl` substituted for the workspace-specific `ConstructorAvoImpl`.

- **What is the accurate Kotlin static call site?**
  `StaticAvo.initAvoWithInspector(inspector, application, context, AvoEnv.DEV, ...)` then `StaticAvo.eventName(...)`.
  Source: `staticanalytics/StaticActivity.kt`.

- **What is the accurate Swift static call site?**
  `Avo.initAvo(env: .dev, ...)` (synchronous, void return, sets global state) then `Avo.testEmptyEvent()`.
  Source: `static_analytics/Buttons/Managers/AppDelegate.swift`.

- **What component should the DI callout use?**
  `<Callout type="info">` on both reference pages. The `Callout` import must be added to `swift.mdx` and `kotlin.mdx`.

## Dependencies

- No external service dependencies.
- The three MDX files to edit must remain syntactically valid for the Nextra/Next.js docs build. Run `npm run build` in the docs repo before submitting to confirm no new compilation errors.
- Add `import { Callout } from 'nextra/components'` to `swift.mdx` and `kotlin.mdx`.
- Platform test files used as reference sources (read-only, no changes required):
  - `/Users/alexverein/code/avo/monorepo2/platform_tests/ios/swift/Buttons/constructor_analytics/Buttons/Managers/AppDelegate.swift` (Swift constructor — async)
  - `/Users/alexverein/code/avo/monorepo2/platform_tests/ios/swift/Buttons/constructor_analytics/ButtonsTests/Helpers/AvoHelper.swift`
  - `/Users/alexverein/code/avo/monorepo2/platform_tests/ios/swift/Buttons/swift6_actor/Buttons/ViewController.swift`
  - `/Users/alexverein/code/avo/monorepo2/platform_tests/ios/swift/Buttons/static_analytics/Buttons/Managers/AppDelegate.swift` (Swift static — synchronous)
  - `/Users/alexverein/code/avo/monorepo2/platform_tests/ios/swift/Buttons/static_analytics/Buttons/Controllers/ViewController.swift` (Swift static usage — `Avo.testEmptyEvent()` call shape; also used as reference for Swift constructor usage example in AC 15, substituting instance form `avo.testEmptyEvent()`)
  - `/Users/alexverein/code/avo/monorepo2/platform_tests/android/kotlin/AndroidKotlin/constructoranalytics/src/main/java/app/avo/constructoranalytics/ConstructorActivity.kt`
  - `/Users/alexverein/code/avo/monorepo2/platform_tests/android/kotlin/AndroidKotlin/staticanalytics/src/main/java/app/avo/staticanalytics/StaticActivity.kt`

## Revision History

### Rev 1 — 2026-04-02 (Wednesday)
Initial draft.

### Rev 2 — 2026-04-02 (Wednesday)
Addressed Morticia Rev 1 feedback (9 Critical/Important issues):
- Resolved Swift async contradiction — all constructor test files are async; revised constraint to permit `await` in constructor examples, exclude actor/Swift6 specifics only
- Reconciled Kotlin class name — `ConstructorAvoImpl` in test is workspace-prefixed; `AvoImpl` is the correct generic form
- Added Current State Analysis and pedagogical design note
- Rewrote all ACs to be binary pass/fail with expected outcomes
- Added AC 11 (KMP caveat), AC 12 (Callout imports), AC 13 (build passes)
- Committed to specific component per location (Callout vs. details table)
- Noted `kotlin.mdx` pre-existing syntax error and `######` heading as known out-of-scope debt

### Rev 3 — 2026-04-02 (Wednesday)
Addressed Morticia Rev 2 feedback (3 Important, 5 Minor issues):
- Added `public init` vs `Avo.initAvo` discrepancy note; added AC 14 requiring Swift Reference Constructor signature correction
- Rewrote AC 4 to name `StaticAvo.initAvoWithInspector(...)` explicitly as the required Kotlin static init method
- Added AC 15 requiring Swift constructor usage example (`avo.someEvent()`)
- Added AC 16 for prose distinguishing return types
- Expanded AC 10 with Kotlin constructor minimum alignment and `avo.track(...)` contamination warning
- Added clause to AC 1/AC 3 that static pattern must not appear in Step 2
