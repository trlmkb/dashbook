# Spec ↔ lib drift engine — design

> Status: **implemented and reconciled** · Designed: 2026-07-13 · Implemented: 2026-07-14 · Scope: dashbook standalone; migration-neutral for the planned core Nx move
>
> This lift also closed the adjacent handoff-routing gap. It does **not** perform the core migration.

---

## 1. Problem

Dashbook documents every `@dashfi/svelte` component as a typed **spec** (`src/lib/specs/components/*.ts`) — dimensions with literal Tailwind classes, per-variant token tables with resolved light/dark hex, sizes, prop signatures. These specs are hand-authored and are a **mirror** of the library. When the library changes, the mirror drifts, silently.

That drift is not cosmetic. Claude Design cannot render Svelte, so it builds UI from these specs (the "Foundation" surface). When a spec is stale, Claude Design produces a component approximation from wrong geometry/colors; "Handoff to Claude Code" then re-implements that approximation in code instead of importing the real component. The drift propagates all the way into landed code.

The changelogs prove the drift is real and harmful, not theoretical:

- Badge's resolved variant colors were **wholesale wrong** across v0.3.1 → v0.3.2.
- A Pill token carried a copy-paste typo (`bg-mutescript-muted-foreground`).
- Every "anatomy regenerated" entry is dominated by geometry churn: input height 36→40px + `border`→`border-b`; dialog radius 8→16, `shadow-lg`→`xl`, border dropped, overlay 50%→40%; checkbox radius removed (v0.3.1 had wrongly claimed `rounded-sm`).

The root cause is structural: **the spec is a separate representation of the lib, maintained by hand.** This engine attacks that root cause by deriving the mechanical parts of each spec directly from lib source and flagging everything it cannot derive.

## 2. Goals & non-goals

**Goals**

1. Compare every component spec against the real lib source and report drift at **subfield** granularity.
2. **Generate** the mechanically-derivable subfields (resolved token hex, geometry, sizes, prop/variant signatures) from lib source — for as many components as the research shows is safely reachable (~46 of 62).
3. **Preserve** all human-authored prose and curation byte-for-byte; never overwrite it.
4. Run once now to fix all current drift; leave behind a reusable, CI-ready engine.
5. Be **migration-neutral**: work today against standalone dashbook, and drop into `core` (lift #2) with config-only changes.

**Non-goals (explicit)**

- Does **not** perform the migration into the core Nx workspace — that remains a separate large lift. This engine is *designed to move with it*, not to do it.
- Does **not** wire core CI (can't until the migration lands) — but the engine is built CI-ready (JSON report + nonzero exit on drift).
- Does **not** touch the 4 open PRs.

## 3. Why this is migration-neutral (and stronger after migration)

The drift problem exists *because* specs and lib live apart. The migration to `core` shrinks that gap; this engine is a mitigation that works in both worlds and gets stronger in the monorepo:

| | Standalone (today) | In the core Nx workspace (later lift) |
|---|---|---|
| Lib it compares against | Pinned **published** `@dashfi/svelte` (0.5.0) in `node_modules` | Live lib **HEAD** — sibling `libs/svelte-components/lib/src/lib/ui/` |
| When drift is caught | Only on dep bump — can be weeks late | The moment a lib PR changes a component |
| Strongest enforcement | A check in dashbook's own CI | A **merge gate on the lib PR** ("you changed Badge; its spec is now stale") |
| `tv`-based components | Regenerate on dep bump | Can be generated at build time → cannot drift |

The specs' `canonicalSource` fields already encode the core path (`libs/svelte-components/lib/src/lib/ui/badge/badge.svelte`), so the engine is written against that path shape from day one. Landing in core is a **root-prefix swap**, not a rewrite. There is no version of the migration decision where this work is wasted; it pays off immediately and pays off *most* after migration.

## 4. Research findings (2026-07-13)

Four parallel read-only research agents analyzed all 62 lib components (three by source pattern, one on the spec-side payoff). Full transcripts in the session; the load-bearing conclusions:

**Reach — mechanically derivable coverage:**

| Verdict | ~Count | Definition |
|---|---|---|
| Auto | ~23 | Fields derivable from a clean structured source (a `tv()` config, a single static class literal) |
| Semi | ~23 | Derivable via a per-pattern extractor + light human confirm |
| Manual / verify-only | ~16 | Runtime- or curation-driven; must never be auto-generated |

**Coverage comes from a small set of reusable extractors, not per-component work.** The lib uses a handful of appearance-definition patterns, and one extractor covers a whole family.

**Cross-cutting facts the engine must respect:**

- The lib **mixes Svelte 4 and Svelte 5 syntax**. Svelte-5 parts use `let { class: className } = $props()` + `{@render children()}`; Svelte-4 parts (`avatar/*`, `breadcrumb/*`, `hover-card`, `indicator`, `logo`) use `export let`, `$$Props`, `$$restProps`, `$$props.class`, `<slot>`. The parser must handle both.
- `tv()` definitions live in **different places**: `index.ts` (badge), a `.svelte` `<script module>` block (button, alert), and there can be **two per component** (switch: `switchVariants` track + `thumbVariants` thumb).
- Appearance is sometimes **inherited cross-component** via `buttonVariants({ variant: … })` calls (pagination, calendar/range-calendar day cells, date-range-selector, alert-dialog actions, tel-input). A per-file scraper misses this entirely.

## 5. Design

### 5.1 Central principle — generate at subfield granularity, preserve curation

The single most important constraint from the payoff research: within a spec, mechanical data and human curation are **interleaved in the same structures.** A `variants[]` entry has a mechanical `name` + `tokens` but an editorial `description` and an intentional *ordering*. A `tokens[]` array has mechanical resolved hex for clean tokens but deliberately records alpha-composited values as prose `notes` instead of fake hex.

Therefore the engine never regenerates a spec file. It computes fresh mechanical subfields, then performs a **3-way merge** that writes only those subfields into the existing spec object, leaving every prose/curation field — and the ordering of arrays it does not own — untouched.

### 5.2 Pipeline

```
locate → extract → resolve → merge → report
```

1. **locate** — for a component, find its source files under `canonicalSourceRoot` and identify the appearance-definition pattern (which extractor applies).
2. **extract** — run the matching extractor(s) → a normalized `ExtractedComponent` intermediate (raw class strings, variant/size axes, prop signatures, per-slot classes).
3. **resolve** — turn Tailwind classes / cssVars into concrete geometry values and light/dark hex via the shared resolvers.
4. **merge** — 3-way merge the mechanical subfields into the current spec, preserving prose and human-owned ordering. Emit the would-be diff.
5. **report** — per-component status + per-subfield diffs, as human text and JSON; nonzero exit if any drift in "write" scope.

### 5.3 Extraction strategies (5) + value resolvers (2)

Coverage collapses into a handful of parsers. Four of the five strategies read a component's own source; the fifth (`buttonVariants` cross-ref) is a resolver that feeds the others when appearance is inherited. Two **value resolvers** then turn extracted classes/cssVars into concrete spec values.

| Extractor | Pattern it parses | Components (examples) | Emits |
|---|---|---|---|
| **`tv()` parser** | `tv({ base, variants, defaultVariants })` string-literal config; scans `index.ts` **and** `<script module>`; supports multiple blocks + cross-file refs | badge, button, alert, item, sheet, switch, toggle, toggle-group, empty-media, sidebar-menu-button | Exact variant/size axes + per-variant classes (→ token tables) |
| **static-`cn` reader** | first string-literal arg of `cn(...)` / `class={…}` on a root element; Svelte 4 + 5 | all inline-static (input, label, popover, progress, textarea, skeleton, separator, radio-group, tooltip, …) + **each composite's per-slot rows** (card, dialog, drawer, table, select, form, command, accordion) | Per-slot geometry/class strings |
| **class-map extractor** | a `switch`/object literal mapping a prop value → class string | pill (`statusClassnames`), merchant-logo (`sizeClasses`), sonner (`toastOptions.classes`) | State/size → class token table |
| **cn-conditional extractor** | `cond === 'x' && '…'` / `cond && '…'` branches | scroll-area (orientation), tabs (variant), navigation (variant) | Per-branch classes (Semi — flagged for confirm) |
| **`buttonVariants` cross-ref resolver** *(feeds the others)* | imported variant-fn calls like `buttonVariants({ variant: 'ghost' })` | pagination, calendar/range-calendar, date-range-selector, alert-dialog, tel-input | Resolves inherited appearance against the parsed Button spec |

**Value resolvers**

- **class → token → hex** — reads the lib theme token sheet so `bg-primary` → `--color-primary` → `{ light, dark }` hex. This produces the `TokenRef` resolved values that the spec type exists to provide and that are the #1 drift-and-build-critical field. Must recognize when a utility does **not** map to a clean token (alpha composites, raw Tailwind palette values like `amber-500`) and decline rather than fabricate hex — surfacing it for prose `notes` instead.
- **geometry resolver** — maps utility classes to concrete values (`h-10` → 40px, `rounded-md` → 6px) for `dimensions[].value` and `sizes[]`.

### 5.4 Confidence tiers drive behavior

Each component is tagged by the extractor(s) that apply:

- **Auto** (`tv()`, static-`cn`, class-map) → eligible for `--write`; drift auto-fixed.
- **Semi** (cn-conditional, cross-ref-dependent) → generate a proposal, but **flag for human confirmation**; never silently written without `--write-semi`.
- **Manual / verify-only** → never generated. The engine only checks that the values the spec *claims* still exist in current source (class strings present, variant names present, cssVars resolve) and flags mismatches for a human.

### 5.5 The verify-only zone (never auto-generate)

The research specifically hunted the deceptive cases — sources that *look* extractable but would yield confident, well-formed, wrong specs. These are hard-coded to verify-only:

**Runtime / CSS-driven appearance the spec model cannot hold**
- `code-block` — theme is a runtime `import('prismjs/themes/prism-*.css')`, not class strings. The clean `language`/`theme` enums are a trap.
- `flow-lines` — `PRESET_CONFIGS` is a pristine object literal, but its fields are WebGL shader numerics + hex gradient stops, not tokens.
- `sheet` / `linear-loader` — motion lives in `<style>` `@keyframes` keyed on `data-*`, not in classes.
- `tabs` — the `secondary` variant's selection indicator is an absolutely-positioned div whose geometry is JS-computed (`offsetLeft`/`offsetWidth` via observers). A class-only extractor omits it while looking complete.
- `spinner` / `logo` — SVG path art, not tokens.

**Structural / cross-component inheritance a naive parser misreads**
- `sidebar` — 26 files; appearance depends on ancestor `group-data-[collapsible|side|variant]` modifiers + CSS-var widths in `constants.ts`.
- `navigation` — `variant` is implemented by dispatching to two files, each further branching on responsive breakpoint × active state.
- `multi-select` — no variant prop, but heavy state-conditional styling scattered across ~6 inline `cn` calls.
- `enhanced-table` / `data-table` — runtime-computed, logic components; no visual spec.

**Human curation inside mechanical structures** (from the payoff analysis)
- `variants[]` **ordering** — the emphasis ladder (default > brand > secondary > yellow > outline). `tv()` gives the set, not the rank.
- `nonFeatures[]` — anticipation of re-implementer mistakes; not derivable by diffing classes, and goes stale in *reverse* (alert v0.5.0's non-features stopped holding after a restyle).
- `whenToUse` / `description` — cross-component taxonomy (Badge↔Pill, Dialog↔AlertDialog↔Drawer).
- `tokens[]` **part selection** + the deliberate choice to leave non-clean values as prose `notes`.
- `props[]` — a curated behaviour-only *subset* with editorial descriptions; reading `$props()` would emit every prop, untyped-purpose, clobbering curation.
- `status` (beta/stable maturity call), `canonicalSource` file-vs-directory granularity, `example` domain content.

**One concrete gotcha:** `switch.svelte:53` duplicates its `tv()` `base` string as an inline literal in the template. The extractor must trust the `tv()` definition, not the rendered `class` attribute, or it will read a stale copy.

### 5.6 Migration-neutral configuration

A single knob, `canonicalSourceRoot`, plus a resolver that knows where variant configs live and which file extension wins:

- **Today** → `node_modules/@dashfi/svelte/dist` (ships `.svelte` source + compiled `index.js`; both parse).
- **After lift #2** → `core/libs/svelte-components/lib/src/lib/ui` (true `.ts` source).

Flipping the root (and the `.ts` vs `.js` preference) is config-only.

### 5.7 Output

- **Drift report** — per component: `ok` / `drifted:[subfields]` / `unverifiable:[reason]`, with per-subfield before/after. Human-readable text + machine-readable JSON.
- **Exit code** — nonzero when any in-`--write`-scope component has drift. This is the future CI gate (dormant until core).
- **`--write`** applies Auto fixes; **`--write-semi`** additionally applies flagged Semi proposals. Manual/verify-only are never written.

## 6. Deliverable — the one-time audit

Run the engine across all 62 components → produce the drift report → fix Auto by regeneration, Semi by confirm-then-write, Manual by hand → commit. This *is* the "audit Foundation vs actual component" that motivated the lift, and it leaves the reusable engine behind.

### Implementation result (2026-07-14)

The implementation deliberately narrowed automatic mutation to the field that
can be proven safe across the entire catalogue: resolved light/dark `TokenRef`
values. The full source reader still inventories literal classes and token use,
but coverage and inherited-geometry findings remain advisory unless `--strict`
is requested. This avoids inventing token-part curation or misclassifying a
Button/Popover/Table dependency as drift.

The one-time pass audited the product foundation and 61 registered shared
components, canonicalized 151 resolved token occurrences, manually reconciled verified
anatomy mismatches, and added PaginationWrapper. Sidebar remains owned by the
already-open Sidebar spec PR. The adjacent handoff-routing work also landed in
this lift: MCP/JSON responses now include machine-readable implementation and
reuse metadata, while the receiving skills require exact shared imports for
Svelte and route other stacks through the porting tool.

## 7. Testing

- **Extractor unit tests** — feed each extractor a known source fixture (a `tv()` config; a static-`cn` root; pill's `switch`) and assert the extracted structure.
- **Resolver unit tests** — `bg-primary` → `--color-primary` → correct light/dark hex; `h-10` → 40px; a non-clean utility (`amber-500`, alpha composite) → declines rather than fabricating.
- **Merge tests** — a spec with hand-authored prose + a deliberately-stale mechanical subfield → the mechanical field is corrected, every prose field and array ordering is byte-identical.
- **Trap tests** — code-block / flow-lines / tabs / switch inline-dup: assert the engine classifies verify-only and does not emit a (wrong) generated field.
- **Golden components** — badge + button pinned as end-to-end known-good.

## 8. Foundations (stretch — only if free)

The class→token→hex resolver already reads the lib theme. If foundation token/spacing/type drift (`product_get_foundation`) falls out of that resolver for negligible extra effort, include it. Otherwise defer. Not a goal.

## 9. Shape / where it lives

A path-configurable Node + TypeScript CLI in dashbook (proposed `scripts/spec-audit/`), run via a `pnpm` script. Uses a TS/AST parser to read literals from `.ts` and from `.svelte` `<script module>`/`<script>` blocks. No runtime import of the lib (Svelte + ESM + `tv()` returning a function make static parsing more robust than execution). Moves with the repo in lift #2.

## 10. Risks & open questions

- **Static parsing of non-literal classes.** Some classes may be composed from variables/imports rather than string literals. Policy: extract literals; anything non-literal → downgrade that subfield to verify-only, never guess.
- **Theme sheet location.** The class→hex resolver needs the authoritative light/dark token sheet; exact file(s) to be pinned during planning (the specs already contain the resolved hex, so the source exists — this is a "find it" task, not a "does it exist" risk).
- **Semi false-confidence.** cn-conditional and cross-ref components are the most likely to produce plausible-but-incomplete output; hence they are flag-for-confirm, never silent-write.
- **Lib version skew standalone.** Standalone compares against the pinned published version, not lib HEAD — accepted limitation, resolved by lift #2.

## 11. Sequencing

1. **This lift** — the drift/generator engine + one-time audit (this doc).
2. **Included in this lift** — handoff-routing metadata and receiving-skill guidance.
3. **Next large lift** — migrate dashbook into the core Nx workspace; the engine moves with it and gains the lib-PR merge gate.
