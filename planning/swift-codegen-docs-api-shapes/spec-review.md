# Spec Review: Swift & Kotlin Codegen Docs — API Shapes

**Reviewer:** Morticia (Spec QA)
**Spec:** planning/swift-codegen-docs-api-shapes/spec.md
**Revision:** 3/5
**Date:** 2026-04-02

## Engineering Preferences Applied
- DRY: flagged aggressively
- Testing: non-negotiable, more > fewer
- Engineering level: "enough" — not fragile, not over-abstracted
- Edge cases: err on more, not fewer
- Style: explicit over clever

---

## Rev 2 Issue Resolution Summary

Rev 3 addressed all 3 Important and all 5 Minor issues from Rev 2:
- Issue 1 (Important): AC 14 added — Swift Reference Constructor signature fix now in scope. ✓
- Issue 2 (Important): AC 4 rewritten to name `StaticAvo.initAvoWithInspector(inspector, application, context, AvoEnv.DEV, ...)` explicitly. ✓
- Issue 5 (Important): AC 15 added — Swift constructor usage example `avo.someEvent()` required after init block. ✓
- Issue 3 (Minor): AC 16 added — prose must distinguish return types (constructor returns `Avo` instance; static returns void). ✓
- Issue 4 (Minor): AC 10 expanded with Kotlin constructor minimum alignment requirements and `ConstructorActivity.kt` `avo.track(...)` warning. ✓
- Issue 6 (Minor): Warning added to AC 10 about the library interface call in `ConstructorActivity.kt`. ✓
- Issue 7 (Minor): AC 1 and AC 3 now explicitly prohibit static pattern appearing in Step 2. ✓
- Issue 8 (Minor): AC 10 now anchors `ViewController.swift` to AC 15 as the Swift constructor usage example source. ✓

The spec is substantially stronger than Rev 2. The following issues are new discoveries in Rev 3.

---

## Stage 1: Architecture Review — 23/25

The scope is tight, the file list is correct, the component assignment table is unambiguous, and all three existing files have been read and assessed before implementation work begins. No structural problems. One minor residual issue.

### Issue 1: Tech deep dive Initialization section already partially documents both patterns — the spec does not acknowledge this, creating risk of redundant or conflicting prose
**Severity:** Minor
**Location:** Affected Areas table ("avo-codegen-tech-deep-dive.mdx — Update Initialization section to name and explain both API shapes"); the existing `avo-codegen-tech-deep-dive.mdx` lines 62–64

**Problem:** The existing tech deep dive Initialization section already states: "There will either be a static `initAvo` method or a class, named `Avo` by default, with a constructor, depending on your setup." This is not nothing — it acknowledges both patterns exist. The spec's Current State Analysis says the tech deep dive has "No — only static pattern shown" and "Does not name or distinguish the two API shapes." This characterization is incorrect: the page already names both shapes, it just does not identify which is the default for new workspaces and which is legacy. The implementer who reads the spec before reading the file may over-write existing accurate text rather than augmenting it. The spec should correct the Current State Analysis entry for `avo-codegen-tech-deep-dive.mdx` to reflect what is actually there: both patterns are mentioned but not labeled as default vs. legacy.

| Option | Effort | Risk | Impact | Maintenance |
|--------|--------|------|--------|-------------|
| A) Update the Current State Analysis row for `avo-codegen-tech-deep-dive.mdx` to: "Both patterns mentioned but not distinguished as default vs. legacy; no prose saying constructor is the default for new workspaces" | Minimal | Low | Medium — prevents over-writing accurate existing text | Low |
| B) Add a note under the Affected Areas entry: "The Initialization section already mentions both patterns; the change is to add default/legacy labeling, not to rewrite from scratch" | Minimal | Low | Medium — same effect, different placement | Low |
| C) Do nothing | None | Low — implementer will read the file and see the existing text | — | — |

**Recommendation:** Option A — the Current State Analysis is a key implementation input. Inaccurate "does not name" language, when the file already partially names both shapes, risks unnecessary rewrites that introduce new inaccuracies. Explicit over clever.

---

## Stage 2: Completeness & Quality Review — 22/25

The spec has resolved the major DRY and completeness problems from earlier revisions. The component table, pedagogical note, and resolved ACs are all strong. Two issues remain.

### Issue 2: AC 15 source file citation is technically accurate but practically misleading — `ViewController.swift` does not directly show `Avo.testEmptyEvent()` as a top-level call
**Severity:** Minor
**Location:** AC 15 ("Source for the call shape: `static_analytics/Buttons/Controllers/ViewController.swift` (which shows the static event call shape `Avo.testEmptyEvent()`)"); AC 10 ("Swift constructor usage example (AC 15) against `static_analytics/Buttons/Controllers/ViewController.swift`")

**Problem:** The actual `ViewController.swift` (verified by reading the file) does not directly show `Avo.testEmptyEvent()` as a line in any public method — it shows `testAvoEmptyEvent()` (a private wrapper method). The `Avo.testEmptyEvent()` call is inside the body of `testAvoEmptyEvent()` in a `private extension ViewController`. AC 15 says this file "shows the static event call shape `Avo.testEmptyEvent()`" — which is technically true (the call is there) but may confuse an implementer searching the file for a direct prominent usage. An implementer doing a literal text search for `Avo.testEmptyEvent()` will find it inside a private method body, not at the call-site level that would be analogous to the instance form `avo.testEmptyEvent()`. The spec should add a parenthetical locating the call: "inside `testAvoEmptyEvent()` in the `private extension ViewController` section."

| Option | Effort | Risk | Impact | Maintenance |
|--------|--------|------|--------|-------------|
| A) Update AC 15: "...`static_analytics/Buttons/Controllers/ViewController.swift` (call is inside `testAvoEmptyEvent()` in the private `ViewController` extension; the static call form is `Avo.testEmptyEvent()`)" | Minimal | Low | Low | Low |
| B) Point AC 15 to `AppDelegate.swift` instead, which does not contain a usage call — keep ViewController.swift as the correct source despite the indirection | None (status quo) | Low | — | — |
| C) Do nothing | None | Low — an implementer reading the file will find the call eventually | — | — |

**Recommendation:** Option A — explicit over clever. The engineering preference is explicit over requiring the implementer to infer which line to look at.

### Issue 3: No acceptance criterion covers the Kotlin constructor usage call shape — AC 15 is Swift-only; Kotlin has no analogous requirement
**Severity:** Important
**Location:** AC 15 ("The Swift constructor pattern section includes a usage example showing `avo.someEvent()`..."); Acceptance Criteria section (no equivalent for Kotlin)

**Problem:** AC 15 was added in Rev 3 specifically to require a Swift constructor usage example after the init block. The rationale in Rev 2 Issue 5 was: "injecting implies calling it on the stored instance, not just instantiating it... without an example showing `avo.someEvent()`, a reader knows how to create the object but not how to use it." This rationale applies identically to Kotlin. The Kotlin constructor section has no analogous requirement. An implementer who reads AC 3 (Kotlin Step 2) and AC 4 (Kotlin legacy section) and AC 11 (KMP caveat) could produce a Kotlin constructor section showing `val avo = AvoImpl(...)` with a DI callout but no `avo.someEvent()` usage example — satisfying all ACs while leaving the Kotlin DI value proposition only half-demonstrated. `ConstructorActivity.kt` line 115 shows `avo.testEmptyEvent()` as the instance usage call.

| Option | Effort | Risk | Impact | Maintenance |
|--------|--------|------|--------|-------------|
| A) Add AC 17: "The Kotlin constructor pattern section includes a usage example showing `avo.testEmptyEvent()` (or an equivalent generic instance method call) following the init code block. Source: `constructoranalytics/ConstructorActivity.kt` line 115. An implementation that shows only the init call and omits the instance usage call is a failing outcome." | Minimal | Low | High — closes a symmetric gap | Low |
| B) Amend AC 15 to cover both Swift and Kotlin: "Both the Swift and Kotlin constructor pattern sections include a usage example showing the instance method call..." | Minimal | Low | High | Low |
| C) Do nothing | None | Medium — Kotlin gets a worse DX than Swift; asymmetric documentation | — | — |

**Recommendation:** Option A — a dedicated AC (AC 17) mirrors the structure of AC 15 for Swift and makes the Kotlin requirement unambiguous. Symmetry with AC 15 is preferable to a combined AC because the source files differ.

---

## Stage 3: Test & Edge Case Review — 23/25

The Rev 3 AC improvements (AC 14, AC 15, AC 16) plus the Rev 2 foundation (ACs 1–13) make this one of the most complete AC suites seen in this spec. Almost all user stories now have binary-testable criteria. One remaining gap.

### Issue 4: AC 16 requires prose distinguishing return types on the Swift section — but no analogous requirement exists for the Kotlin section, despite both languages having a static vs. constructor distinction
**Severity:** Minor
**Location:** AC 16 ("The prose accompanying the two Swift pattern examples explicitly states that the constructor `initAvo` returns an `Avo` instance... while the static `initAvo` returns void..."); no Kotlin equivalent

**Problem:** AC 16 was added to prevent two nearly-identical-looking Swift code blocks from being presented without explanatory prose. The same risk exists for Kotlin: the constructor pattern shows `val avo = AvoImpl(...)` and the static pattern shows `StaticAvo.initAvoWithInspector(...)` — these use different class names, so the code blocks look more different than the Swift case. However, the return-type distinction (Kotlin constructor returns an `AvoImpl` instance; the static method is a void init) is still worth stating explicitly. Without an AC, a reviewer cannot fail an implementation that omits this prose from the Kotlin section. The asymmetry between AC 16 (Swift-only) and the absence of any equivalent for Kotlin is a gap.

| Option | Effort | Risk | Impact | Maintenance |
|--------|--------|------|--------|-------------|
| A) Add a clause to AC 16 extending it to Kotlin: "The same requirement applies to the Kotlin patterns: prose must state that `AvoImpl(...)` returns an instance used for injection while `StaticAvo.initAvoWithInspector(...)` is void and stores state globally" | Minimal | Low | Medium | Low |
| B) Accept the asymmetry — the Kotlin code blocks use different class names (`AvoImpl` vs `StaticAvo`) which makes the distinction clearer without prose | None | Low | — | — |
| C) Do nothing | None | Low — the different class names in Kotlin make the distinction visually unmissable compared to Swift | — | — |

**Recommendation:** Option B — the Kotlin case is genuinely different from Swift. In Swift, both patterns call `Avo.initAvo(...)` with the only visible difference being `let avo =`, making prose essential. In Kotlin, `AvoImpl(...)` vs. `StaticAvo.initAvoWithInspector(...)` are visually distinct class names. The risk of an undifferentiated-looking pair of Kotlin code blocks is much lower. Option B is the "engineered enough" choice.

### Issue 5: No edge case addresses what happens when the `<details>` element is inside an MDX component context that doesn't render raw HTML — Nextra/Next.js MDX interop risk is unverified
**Severity:** Minor
**Location:** Existing Patterns to Follow section ("`<details>/<summary>` HTML collapsible"); Out of Scope section; AC 13 ("Build passes")

**Problem:** The spec requires `<details>`/`<summary>` native HTML elements in MDX files. The spec cites two existing pages (`start-using-inspector-with-avo-codegen.mdx` and `bulk-editing.mdx`) as precedent. However, the spec does not verify that these patterns render correctly in the current Nextra version used by the docs repo, or that styling is consistent. Native `<details>` in MDX can behave unexpectedly depending on the MDX renderer version (MDX v1 vs v2 vs v3 handle raw HTML differently). AC 13 requires `npm run build` to pass, which will catch compilation errors but not runtime rendering failures (a `<details>` block that compiles but renders as a flat unstyled section). The spec's mitigation — citing existing usage on two pages — is good enough for compilation confidence but not rendering confidence.

| Option | Effort | Risk | Impact | Maintenance |
|--------|--------|------|--------|-------------|
| A) Add to AC 13: "The implementer must confirm that the `<details>` element renders correctly in a local dev server (`npm run dev`) by visually verifying the collapsible behavior before submitting" | Minimal | Low | Medium — catches rendering failure that build alone misses | Low |
| B) Accept that the existing usage on two other pages is sufficient evidence of working `<details>` support in this Nextra configuration | None | Low | — | — |
| C) Do nothing | None | Low — existing pattern usage is strong evidence | — | — |

**Recommendation:** Option B — the two existing precedent pages in the same repo are strong enough evidence. The "Existing Patterns to Follow" section is doing exactly the job it should: pointing to working examples in the same codebase. Adding a visual verification step to AC 13 would be over-engineering. This is flagged as Minor only because the MDX version interop question is real in general, not because it is likely to be a problem here.

---

## Stage 4: Performance & Feasibility Review — 24/25

All phantom dependency issues from Rev 2 are resolved. All source files exist and have been verified (read directly during this review). The build AC is in place. One very minor observation.

### Issue 6: AC 10 specifies that the Kotlin constructor minimum alignment check requires `application`, `context`, and `AvoEnv.DEV` as "first three positional parameters" — but the actual test file passes `application`, `this`, `AvoEnv.DEV` where `this` is an `Activity`, not a named `context` variable
**Severity:** Minor
**Location:** AC 10 ("verifying that `application`, `context`, and `AvoEnv.DEV` appear as the first three positional parameters, consistent with `ConstructorActivity.kt`")

**Problem:** Reading `ConstructorActivity.kt` directly: `ConstructorAvoImpl(application, this, AvoEnv.DEV, ...)` — the second parameter is `this` (an `AppCompatActivity`, which is a `Context`), not a named `context` variable. AC 10 says the reviewer should verify "`application`, `context`, and `AvoEnv.DEV`" appear as the first three positional parameters. An implementer writing `AvoImpl(application, context, AvoEnv.DEV, ...)` with `context` being a named variable is correct and consistent with the source — but the source file literally uses `this` as the context argument. The AC's "consistent with `ConstructorActivity.kt`" language may be read as requiring `this` rather than a `context` variable. This is a minor alignment issue between the AC text and the actual test file. The generic documentation form `AvoImpl(application, context, AvoEnv.DEV, ...)` is more readable and instructive than `AvoImpl(application, this, AvoEnv.DEV, ...)`, so the spec's intent is correct — the wording just needs a small clarification that `context` here means the `Context` argument (which in the test file happens to be `this`).

| Option | Effort | Risk | Impact | Maintenance |
|--------|--------|------|--------|-------------|
| A) Update AC 10 to clarify: "...`application`, `context` (the `Context`-typed argument, which is `this` in `ConstructorActivity.kt`), and `AvoEnv.DEV` appear as the first three positional parameters" | Minimal | Low | Low | Low |
| B) Do nothing — the distinction between `this` and a named `context` variable is obvious to any Kotlin developer | None | Low | — | — |
| C) Change the minimum alignment requirement to match the test file literally: require `this` (which is technically wrong for documentation) | None | Low | Medium (bad) | — |

**Recommendation:** Option A — one parenthetical removes the ambiguity. It costs nothing and the "explicit over clever" principle applies. An implementer who reads AC 10 and then reads `ConstructorActivity.kt` should not have to make a judgment call about whether `this` satisfies the `context` requirement.

---

## Strengths

- All 8 issues from Rev 2 were addressed substantively, not cosmetically. The AC count grew from 13 to 16 with each addition being meaningful, not padding.
- AC 14 is the best single addition in Rev 3: it identifies a specific, verifiable discrepancy between the existing `swift.mdx` Reference section (showing `public init(env: AvoEnv, ...)`) and the actual generated API (a static async factory method `Avo.initAvo(...)`), puts it explicitly in scope, and makes "the `public init` form is a failing outcome" a binary test.
- AC 16 on prose-distinguishing return types is strong. The pedagogical design note is no longer just aspirational — it has a binary AC anchoring it.
- The warning in AC 10 about `avo.track(ConstructorAvoBase.AvoEvent.TestEmptyEventEvent)` appearing adjacent to `avo.testEmptyEvent()` in `ConstructorActivity.kt` is validated by direct source inspection: line 129 of `ConstructorActivity.kt` is exactly that call, on the line immediately after `avo.testEmptyEvent()`. The spec's explicit guard is correct.
- The platform test files referenced in Dependencies were verified to exist and to match the spec's descriptions of their content.
- The Open Questions Resolved section remains the single best structural feature of this spec: every question has a specific file reference and a verbatim code form as the answer.

---

## Summary

| Stage | Score | Top Issue |
|-------|-------|-----------|
| Architecture | 23/25 | Current State Analysis incorrectly characterizes the tech deep dive as not naming both patterns — existing text already mentions both |
| Completeness & Quality | 22/25 | No AC covers the Kotlin constructor usage call shape (`avo.testEmptyEvent()`) — asymmetric with AC 15 for Swift |
| Test & Edge Cases | 23/25 | AC 16 requires prose distinguishing return types for Swift only; Kotlin has no analogous requirement (though the visual distinction is clearer there) |
| Performance & Feasibility | 24/25 | AC 10's `context` vs. `this` wording is technically inconsistent with `ConstructorActivity.kt` which passes `this` as the context argument |
| **Total** | **92/100** | |

**Verdict:** PASS
**Critical issues:** 0
**Important issues:** 1
**Minor issues:** 5

## Recommendation

This spec passes. The one Important issue (Issue 3 — no Kotlin constructor usage call AC) is a real gap but not blocking: a diligent implementer following the symmetric logic of AC 15 and the Kotlin user story would likely add the usage example anyway. Address it in the next revision for cleanliness before PRD generation.

Priority order for optional Rev 4 cleanup:
1. Add AC 17 for Kotlin constructor usage call shape — `avo.testEmptyEvent()` required after the init block (Issue 3, Important)
2. Correct the Current State Analysis entry for `avo-codegen-tech-deep-dive.mdx` — it already mentions both patterns, just not labeled (Issue 1, Minor)
3. Clarify AC 15 source file citation to locate the call inside `testAvoEmptyEvent()` in the private `ViewController` extension (Issue 2, Minor)
4. Clarify AC 10 `context` vs. `this` wording with a parenthetical (Issue 6, Minor)
5. Issues 4 and 5 are scored as Minor and the recommendation in both cases is to do nothing — no action needed.

Run `/pugsley swift-codegen-docs-api-shapes` to generate the PRD.
