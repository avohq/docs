# Interview Brief: swift-codegen-docs-api-shapes

## Feature Name
`swift-codegen-docs-api-shapes`

## Problem Statement
The Swift and Kotlin codegen documentation only shows the static/function-per-event pattern (`Avo.appOpened(...)`) and doesn't document the constructor/object-based pattern. Developers evaluating Avo for DI-heavy codebases (e.g., using swift-dependencies) can't discover from the docs that Avo supports a testability-friendly interface. This creates friction during evaluation and risks the impression that Avo's codegen isn't flexible enough.

**Origin:** Intercom support request (Linear: AVO-2599).

## Scope

### In Scope
- **Swift language reference page** (`pages/reference/avo-codegen/programming-languages/swift.mdx`)
- **Kotlin language reference page** (`pages/reference/avo-codegen/programming-languages/kotlin.mdx`)
- **Codegen tech deep dive page** (`pages/implementation/avo-codegen-tech-deep-dive.mdx`)
- Two API patterns to document:
  1. **Constructor / object-based pattern** (default for all new workspaces) — lead with this
  2. **Static pattern** (legacy) — cover in a collapsible/note section

### Out of Scope
- Library interface / event-typed pattern (internal state, not ready for docs)
- Swift actor / async-await specifics (behind a separate feature flag, will be covered separately)
- Other programming languages

## API Patterns to Document

### 1. Constructor / Object-Based Pattern (Default)
- User instantiates an Avo object via constructor, passing env, system properties, and destination interfaces
- Event tracking is done via instance methods: `avo.eventName(...)`
- System properties are stored per-instance
- This is what all new workspaces get

**Swift example (from platform_tests — keep generic, no actor/async):**
- File: `/Users/alexverein/code/avo/monorepo2/platform_tests/ios/swift/Buttons/swift6_actor/Buttons/Avo.swift`
- Usage: `/Users/alexverein/code/avo/monorepo2/platform_tests/ios/swift/Buttons/swift6_actor/Buttons/ViewController.swift`
- Pattern: `let avo = Avo.initAvo(env: .dev, ...)` then `avo.testEmptyEvent()`

**Kotlin example (from platform_tests):**
- File: `/Users/alexverein/code/avo/monorepo2/platform_tests/android/kotlin/AndroidKotlin/constructoranalytics/src/main/java/app/avo/constructoranalytics/ConstructorAvo.kt`
- Usage: `/Users/alexverein/code/avo/monorepo2/platform_tests/android/kotlin/AndroidKotlin/constructoranalytics/src/main/java/app/avo/constructoranalytics/ConstructorActivity.kt`
- Pattern: `val avo = ConstructorAvoImpl(application, context, AvoEnv.DEV, ...)` then `avo.testEmptyEvent()`

### 2. Static Pattern (Legacy)
- No object instantiation; initialize via static method
- Event tracking via static/class methods: `Avo.eventName(...)`
- System properties stored globally (static/companion object)
- Legacy — existing workspaces may still use this

**Swift example:**
- File: `/Users/alexverein/code/avo/monorepo2/platform_tests/ios/swift/Buttons/static_analytics/Buttons/Avo.swift`
- Pattern: `Avo.initAvo(env: .dev, ...)` then `Avo.testEmptyEvent()`

**Kotlin example:**
- File: `/Users/alexverein/code/avo/monorepo2/platform_tests/android/kotlin/AndroidKotlin/staticanalytics/src/main/java/app/avo/staticanalytics/StaticAvo.kt`
- Usage: `/Users/alexverein/code/avo/monorepo2/platform_tests/android/kotlin/AndroidKotlin/staticanalytics/src/main/java/app/avo/staticanalytics/StaticActivity.kt`
- Pattern: `StaticAvo.initAvoWithInspector(inspector, application, ...)` then `StaticAvo.testEmptyEvent()`

## Documentation Approach
- **Lead with constructor/object-based** as the default/recommended pattern
- **Put static pattern in a collapsible/note** labeled as legacy
- Update existing docs pages in-place (don't create new pages)
- Highlight DI/testability benefits of the constructor pattern
- Keep Swift examples generic (no actor/async specifics)

## Files to Modify
1. `pages/reference/avo-codegen/programming-languages/swift.mdx`
2. `pages/reference/avo-codegen/programming-languages/kotlin.mdx`
3. `pages/implementation/avo-codegen-tech-deep-dive.mdx`

## Acceptance Criteria
- Swift docs page shows the constructor/object-based pattern as the primary approach
- Swift docs page includes a legacy/collapsible section for the static pattern
- Kotlin docs page shows the same two patterns with the same structure
- Tech deep dive page explains the available API shapes
- A developer evaluating Avo for a DI-heavy codebase can discover the constructor pattern from the docs
- Code examples are accurate and derived from actual codegen output
- No mention of the library interface / event-typed pattern
- No mention of Swift actor / async-await specifics
