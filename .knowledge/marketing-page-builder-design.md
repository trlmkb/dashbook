# Marketing page builder — design doc

Status: proposal · 2026-06-27 · author: design-systems
Scope: a minimal, in-browser, **session-only** drag-compose page builder for the **marketing** surface, living in **dashbook**.

---

## 1. Purpose

A playground / composer where someone can drag marketing sections onto a canvas, edit their content and props live, preview desktop + mobile, and export the result as a JSON page spec (and, stretch, as markup) for a developer to ship on `www.dash.fi`. It is a **sandbox**, not a CMS — there is no server, no auth, no saved pages beyond the current browser session.

**Why dashbook is the home** (decided): the marketing pattern specs already live here with structured prop schemas; the `--m-*` token system is already wired into `app.css`; it's a design-system portal, so a "compose from the system" tool is a natural extension; and session-only fits a docs portal far better than the production marketing site. The alternative — real page authoring in `www.dash.fi` via Puck — was rejected for v1 (our marketing components are `.astro`, Puck is React, and "session-only" conflicts with "ship real pages").

## 2. Non-goals (v1)

- No persistence to a backend. No accounts. No multi-page projects.
- No free-form / absolute positioning (Wix-style). Structured section stacking only.
- No raw HTML/CSS editing. Component-based only.
- No per-breakpoint editing matrix. Author desktop, auto-reflow mobile.
- No image upload (no backend) — image fields take a URL.
- Not all 36 patterns in v1 — a curated core set (see §6).
- Not the real Astro components — the builder renders dashbook-native block components (see §5, the honest reuse story).

## 3. Research basis

Two research passes (2026-06-26, in this session) ground the decisions:

**Embeddable libs**: Puck (`@puckeditor/core`, MIT) is the batteries-included winner *for React/Astro*. No mature Svelte page builder exists. For a SvelteKit host doing minimal **structured-stacking** (not free-form), the realistic path is a small custom editor on **`svelte-dnd-action`** (de-facto Svelte DnD primitive, MIT, Svelte 5, keyboard-a11y). Puck-as-React-island is the escape hatch but drags React into the bundle and isn't needed when we're structured-stacking with schemas we already own. Builder.io / Plasmic / TinaCMS are all disqualified by the no-backend constraint.

**Best minimal UX** (the leanest pro-grade builder): vertical stack of sections on a centered canvas; empty state = one "+ Add section" prompt; insert via `+` affordances + slash-in-text (not drag-from-palette); inline on-canvas editing for *content*, right-inspector for *config*; author desktop → auto-reflow mobile + preview toggle; undo/redo + duplicate + drag-handle reorder are table stakes; lean 3-zone chrome (thin top-bar, no permanent left palette, right inspector on selection only).

## 4. Tech decision

- **Host**: dashbook (SvelteKit), new route `/marketing/builder`.
- **DnD**: `svelte-dnd-action` (`use:dndzone`) for section reorder + in-section item reorder.
- **State**: a Svelte 5 rune store holding a JSON page doc; undo/redo via snapshot history; optional `localStorage` autosave keyed to a session id (still "per browser session" — no server, survives refresh, cleared on demand).
- **Styling**: the existing global `--m-*` token layer in `app.css`. Blocks use the same tokens the marketing site uses, so previews look on-brand for free.
- **No React, no Puck** in v1.

## 5. The honest reuse story

What actually exists vs what must be built:

| Asset | State | Reuse |
|---|---|---|
| `--m-*` token system (`app.css`) | ✅ exists | Direct — blocks style with these |
| Spec `props` schemas (`src/lib/specs/marketing/patterns/*.ts`) | ✅ exists | Drives the inspector field generation |
| Spec `dom` templates + `tokensUsed` | ✅ exists | Reference for authoring each block component |
| Marketing **preview** components (the `/marketing/patterns/*` routes) | ⚠️ exist but **not reusable** | They are hand-written inline demos with hardcoded content + scoped `<style>`, not prop-driven components. **Cannot be dropped into the builder as-is.** |

**Implication**: the builder needs its own set of **block components** — prop-driven Svelte components, one per included pattern. The specs make each cheap to author (DOM shape + token roles + prop schema are all there), but it is net-new authoring, roughly one component per pattern in the v1 set.

## 6. Block model

A block is a registry entry pairing a prop-driven Svelte component with the schema that drives its inspector. The schema is **derived from / kept in sync with** the existing pattern spec's `props`.

```ts
// src/lib/builder/blocks/types.ts
type BuilderFieldType =
  | 'text'        // single-line, side-panel
  | 'textarea'    // multi-line, side-panel
  | 'inline'      // edited on-canvas (contenteditable), not in the panel
  | 'select'      // enum (variants, align, background band)
  | 'boolean'
  | 'number'
  | 'image-url'   // URL string (no upload in v1)
  | 'repeater';   // array of sub-items, each with its own fields

type BuilderField = {
  key: string;
  label: string;
  type: BuilderFieldType;
  options?: string[];           // for 'select'
  itemFields?: BuilderField[];  // for 'repeater'
  default: unknown;
};

type BuilderBlock = {
  id: string;                   // matches the pattern slug, e.g. 'hero'
  name: string;
  category: string;             // reuse the spec's category (Heroes, Proof, …)
  component: Component;         // the prop-driven Svelte block
  fields: BuilderField[];       // inspector schema (mirrors spec.props)
  defaults: Record<string, unknown>;
};
```

**Inspector auto-generation** maps each field type to a control: text→input, textarea→multiline, select→dropdown, boolean→toggle, number→stepper, image-url→url input, repeater→add/remove/reorder list of sub-field groups. `inline` fields are NOT shown in the panel — they're edited directly on the canvas via `contenteditable`.

**Content vs config split**: by convention, copy fields (eyebrow, heading, lede, stat values, cell titles/blurbs) are `inline` (edited on canvas); structural fields (variant, alignment, background band, link href, image URL) live in the side inspector. This is the "inline for content, panel for config" rule from the UX research.

**Repeater** is the one non-trivial control — feature-grid has 6 cells, stat-trio has 3 stats, logo-rail has N logos. The repeater lets you add/remove/reorder items, each item a small group of sub-fields. Must-have for those blocks to be editable.

### v1 block set (~10, curated for coverage)

One from each major marketing job, so a user can build a believable landing page end to end:

1. **hero** (Heroes) — eyebrow, heading+accent, lede, CTA pair, background band
2. **feature-grid** (Content) — repeater of {icon, title, blurb}
3. **stat-trio** (Rhythm) — repeater of {value, label}
4. **testimonial-card** (Proof) — quote, author, role, logo
5. **logo-rail** (Proof) — repeater of {logo-url, alt}
6. **split-cta** (CTAs) — heading, lede, primary/secondary CTA
7. **section-intro** (Content) — eyebrow + heading + lede (the connective tissue)
8. **three-card-row** (Content) — repeater of {title, body, link}
9. **faq-accordion** (Content) — repeater of {q, a}
10. **dark-cta-band** (CTAs) — the jade-glow closer

Adding more later = author one block component + one registry entry. The architecture scales linearly; nothing else changes.

## 7. Page-state model

```ts
type PageNode = {
  id: string;                       // stable instance id (for dnd keys + selection)
  blockId: string;                  // → BuilderBlock.id
  props: Record<string, unknown>;
};
type PageDoc = { sections: PageNode[] };
```

- The whole document is this one serializable tree — that IS the export format.
- Session store: `builderState` rune holding `{ doc, selectedId, history, future, device }`.
- Undo/redo: push a structural-clone snapshot of `doc` onto `history` before each mutation; `future` for redo.
- Autosave: debounced write of `doc` to `localStorage['dashbook-builder-draft']`; "Clear" button + "Start fresh" reset it. Survives refresh, never leaves the browser.

## 8. Editor UI (lean 3-zone)

- **Top bar** (thin): undo / redo · device toggle (desktop ⇆ mobile) · "Clear" · "Export". No logo clutter.
- **Canvas** (center, the star): centered column of rendered sections. Empty state = a single centered "+ Add section". Each section on hover shows a drag handle (reorder) + duplicate + delete + a "+ insert below" affordance. Selecting a section opens the inspector. Text marked `inline` is `contenteditable` directly on the canvas.
- **Right inspector** (appears only on selection): the auto-generated fields for the selected block's config. Closes when nothing's selected, so the canvas breathes.
- **Add-section picker**: a small searchable popover (the `+` triggers it) listing the ~10 blocks grouped by category. Click to insert. (No persistent left palette — matches the minimal-chrome finding.)
- **Mobile preview**: device toggle constrains the canvas to a phone width; blocks reflow via their own responsive CSS (authored desktop-first, auto-stack on narrow). No separate mobile editing.

## 9. v1 feature set (from the UX teardown)

**Must-have (ship in v1):** add-section picker · structured section stacking · drag-handle reorder (sections + repeater items) · duplicate · delete · right inspector from schema · inline on-canvas text editing for content fields · undo/redo · mobile preview toggle · add-first-section empty state · export JSON.

**Deferred (explicitly out of v1):** per-breakpoint overrides · navigator/layer tree · multi-select · templates gallery · slash-command insert (the `+` picker covers it) · image upload · in-section grid/2-up arrangement · markup export (see §10 stretch).

## 10. Export

- **v1**: "Export" copies / downloads the `PageDoc` JSON. A developer (or a future codegen step) turns it into a real page. The JSON shape intentionally matches the marketing recipe model (a list of {pattern, props}).
- **Stretch**: generate markup from each spec's `dom` template + the node props — emit an Astro/HTML scaffold of the composed page. Feasible because the `dom` strings already exist in the specs, but deferred (template interpolation + token-class wiring is its own task).

## 11. Routing / IA

- New route `/marketing/builder` in dashbook.
- Surfaced from the `/marketing` index as a "Compose" / "Playground" entry.
- Gating: it's a marketing-surface tool, so public by default like the rest of `/marketing`. If we'd rather keep it internal-only while it's rough, reuse the existing internal-section gate pattern (`+layout.server.ts` + `guardInternal`) — cheap to add, cheap to remove.

## 12. Phased build plan

- **P0 — scaffold** (~0.5d): route, rune store, `PageDoc` types, empty-state canvas, render-a-hardcoded-hero-block. Proves the render loop.
- **P1 — core loop** (~1.5d): 3–4 block components (hero, feature-grid, stat-trio, split-cta) + registry + add-section picker + select + schema-driven inspector (text/textarea/select/boolean). The builder is usable end-to-end for a few blocks.
- **P2 — interactions** (~1.5d): `svelte-dnd-action` reorder + duplicate + delete + undo/redo + inline contenteditable for content fields + repeater control (unlocks feature-grid/stat-trio editing) + mobile preview toggle.
- **P3 — fill out + polish** (~1d): remaining v1 blocks (→10 total) + export JSON + localStorage autosave + empty/clear flows + a11y pass on DnD.
- **P4 — stretch** (later): markup/Astro export from `dom` templates; more blocks; optional internal-gate removal.

Rough total for a polished v1: **~4.5 dev-days**, dominated by authoring the 10 block components (the framework around them is small).

## 13. Open questions

1. **Block-component source of truth**: author the 10 builder blocks fresh from the specs, or first refactor the `/marketing/patterns/*` previews into reusable prop-driven components and share them between the docs pages and the builder? The latter is more work now but kills the duplication (docs preview vs builder block rendering the same pattern). Leaning: author builder blocks fresh for v1, then converge later if it proves worth it.
2. **Schema duplication**: the inspector `fields` mirror each spec's `props`. Derive `fields` from `spec.props` at runtime (one source) or hand-write per block (decoupled)? Deriving is DRY but the spec `props` are documentation-shaped (types like `'string | Snippet'`), not control-shaped — would need a mapping layer. Leaning: hand-write `fields` per block in v1, revisit a derivation later.
3. **Export consumer**: who/what consumes the JSON? If a human dev, JSON is fine. If we want one-click-to-real-page, prioritize the §10 stretch markup export sooner.
4. **Gate or public**: ship `/marketing/builder` public, or internal-gate while rough?

## 14. Risks

- **Block authoring is the bulk of the work** and is linear in block count — resist scope creep past 10 in v1.
- **contenteditable is fiddly** (caret, paste-as-plaintext, nested marks for the accent span). Budget for it; fall back to a side-panel text field per block if a given block's inline editing gets gnarly.
- **Repeater + DnD nesting** (reordering items inside a section that itself reorders) needs careful `svelte-dnd-action` zone isolation — known-solvable but the trickiest interaction.
- **Docs/builder duplication** (open question 1) — if not converged, the same pattern is rendered by two code paths that can drift.
