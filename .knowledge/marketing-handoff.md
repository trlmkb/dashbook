# Marketing pattern library — session handoff

**Date:** 2026-06-03 · **Branch:** `claude/friendly-cray-li0ZE` · **PR:** trlmkb/dashbook #2

Context for a follow-on session (ideally scoped to **both** `trlmkb/dashbook` (read+write)
and `trlmkb/dashfi` (read)) to finish reconciling the marketing pattern library against the
real dash.fi website source.

---

## What's built (done + verified)

The marketing counterpart to the product component library — the brief's full §3 set:
**38 patterns + 5 foundations**, each as a typed spec → MCP tool → docs page.

- **Tokens** — expanded `--m-*` from 10 thin aliases to a ~20-role semantic set
  (surface/surface-2/card · fg-strong/muted/subtle · border/-strong ·
  accent/positive/warn/negative + soft/border), each with light+dark, a `data-tone`
  convention, and an attribute-flipped dark variant `[data-marketing-dark]` (decoupled
  from product `html.dark`). Lives in `src/lib/tokens.ts` (`marketingRoles`) +
  `src/app.css`. One new primitive `--dash-jade-lifted` #5BB8B0.
- **5 foundations** — `src/lib/specs/marketing/foundations/{tokens,typography,layout,section,motion}.ts`.
- **38 patterns** — `src/lib/specs/marketing/patterns/*.ts`. Categories: Heroes (5),
  Layout frames (2), Rhythm & connectors (5), Content blocks (10), Media & proof (7),
  CTAs (4), Building blocks (4), Gotchas (1).
- **MCP** — `marketing_list_patterns`, `marketing_get_pattern`, `marketing_get_foundation`;
  `marketing_search` extended with `pattern` + `foundation` kinds. In
  `src/lib/mcp/tools/marketing.ts`.
- **Docs** — `/marketing` section (index + 5 foundation pages + 38 pattern pages) via
  `src/lib/chrome/MarketingPatternLayout.svelte` + `src/lib/specs/render/MarketingAnatomy.svelte`,
  with live `--m-*`-driven previews. Wired into `src/lib/content/{marketing,nav,search-index}.ts`.

**Verified:** `pnpm check` → 0 errors; `pnpm build` → 44 marketing routes prerendered.
PLAN.md §9 has two "Done" rows recording all of this.

---

## Fidelity status — READ THIS

The library was built **from the uploaded brief**, NOT from the dash.fi source (the repo +
live `/shipping` page were unreachable from the building session). Two tiers:

- **Brief-grounded (trust):** the token values/rules, typography, layout/section/motion
  foundations, and the flagged building blocks whose recipes were inline in the brief —
  squircle-button, chip, product-shot, feature-tabs, duotone-icon, live-widget, the §7
  scoped-style gotcha, SlideFrame, section-intro.
- **On-brand interpretation, UNVERIFIED vs source (the reconciliation job):** the broader
  catalogue's `dom`/recipes and **especially every spec's `props`**. Each spec carries a
  `source:` path and a `sourceNote:` flag marking this.

---

## Open items (do these in the new session)

### 1. Real amber token (`--m-warn`) — one provisional invented value
Currently `#B5751A` (light) / `#E0A64D` (dark), invented because the brief said "amber =
caution" without a hex. Find the real caution/amber in dashfi (search the shipping CSS /
`colors_and_type.css` for `warn`/`amber`/`caution`). Update **4 places**:
- `src/lib/tokens.ts` → `marketingRoles`: `m-warn` (light+dark), `m-warn-soft`, `m-warn-border`
- `src/app.css` → `:root` block: `--m-warn` (has a `/* provisional */` comment to remove)
- `src/app.css` → `[data-marketing-dark]` block: `--m-warn`
Then drop "PROVISIONAL" from the `m-warn` role note in tokens.ts.

### 2. Prop + DOM reconciliation
For each `src/lib/specs/marketing/patterns/*.ts`, read the real component at the spec's
`source` path (`dashfi src/components/{slide,rhythm,sections}/*`) and reconcile the spec's
`props` array + `dom` sketch against the real `interface Props` / markup. Remove the
spec's `sourceNote` once verified. Update the matching docs preview if the real DOM differs
materially. Note: several specs are compositions with no single source component (most
CTAs, the generic Hero) — those just need a sanity check, not a 1:1 match.

### 3. Make `/marketing` public (pending one-liner — NOT yet on the branch)
The section is currently `internal` (reachable by URL + sidebar, hidden from public top-nav
and signed-out ⌘K). To publish it:
- `src/lib/content/nav.ts` → remove `internal: true` from the `/marketing` primaryNav entry.
- `src/lib/content/search-index.ts` → in the `marketingEntries` block, set the two
  `internal: false` (foundations + patterns maps). (They may already read `false` if a prior
  edit persisted — verify.)
Recommend doing this AFTER reconciliation so the public version is the polished one.
This only affects the preview/branch; production (main) updates when the PR merges.

---

## Where things live (dashbook)

| Path | What |
|---|---|
| `src/lib/tokens.ts` (`marketingRoles`) + `src/app.css` (`[data-marketing-dark]`) | the `--m-*` token + dark-variant layer |
| `src/lib/specs/marketing/foundations/*.ts` | 5 foundation specs (+ `types.ts`, `index.ts`) |
| `src/lib/specs/marketing/patterns/*.ts` | 38 pattern specs (+ `types.ts`, `index.ts` registry) |
| `src/lib/mcp/tools/marketing.ts` | the `marketing_*` MCP tools |
| `src/lib/content/{marketing,nav,search-index}.ts` | sidebar / top-nav / ⌘K wiring |
| `src/lib/chrome/MarketingPatternLayout.svelte` + `src/lib/specs/render/MarketingAnatomy.svelte` | docs render layer |
| `src/routes/marketing/**` | the 44 docs routes |

Adding/changing a pattern: edit/create the spec in `specs/marketing/patterns/`, register it
in that folder's `index.ts`, add a row to `content/marketing.ts` — it then auto-flows into the
MCP tools, the `/marketing` index, the sidebar, and the ⌘K Marketing section.

---

## Workflow + gotchas

- **Container is ephemeral** — commit + push to `claude/friendly-cray-li0ZE` often;
  uncommitted work is lost on reset.
- **Install:** `pnpm install`. `@dashfi/svelte` is aligned to `^0.4.0` (matches package.json);
  if `--frozen-lockfile` ever fails, use `--no-frozen-lockfile`.
- **Gates:** `pnpm check` must be **0 errors**. `pnpm build` must succeed — its prerender
  step catches broken links and missing-id fragments, so never use `href="#fakeAnchor"` in
  demo markup (point demo links at a real prerendered path like `/marketing`).
- **Lint is NOT a gate:** `pnpm lint` is pre-existing **red** repo-wide (~340 errors:
  `no-navigation-without-resolve`, `no-at-html-tags`, `no-unused-vars`). Match existing
  conventions — `{@html}` in the renderers (trusted authored strings, like `Anatomy.svelte`),
  plain `<a href>` in index pages (like `/components`).
- **`corner-shape: squircle`** triggers a harmless svelte-check "unknown property" warning —
  intentional, leave it.
- **Scoped-style doctrine:** put structural classes (grid/order/overflow) on NATIVE elements,
  not child-component roots — documented as the `astro-scoped-styles` pattern; keep honoring it.
- **Colors:** reference `--m-*` roles only; never invent brand hex (the amber was the sole
  exception, flagged). Money/positive = jade, negative = monochrome ink (never red),
  warn = amber.
- **DashfiWordmark:** the wordmark is single-source — fetch via `marketing_get_logo` / render
  the repo `Wordmark` component; never reconstruct or hand-draw the glyph.

---

## Kickoff prompt for the new session

> Continue the Dash.fi marketing pattern library on branch `claude/friendly-cray-li0ZE`.
> Read `.knowledge/marketing-handoff.md` first. Then, using read access to `trlmkb/dashfi`:
> (1) find the real caution/amber token and replace the provisional `--m-warn` everywhere
> listed in the handoff; (2) reconcile each `src/lib/specs/marketing/patterns/*.ts` spec's
> `props`/`dom` against the real components at its `source` path, removing `sourceNote` once
> verified; (3) when reconciliation is done, make `/marketing` public per the handoff.
> Gate on `pnpm check` (0 errors) + `pnpm build`; commit + push to the branch.
