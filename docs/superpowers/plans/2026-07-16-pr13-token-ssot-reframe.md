# PR #13 — Token generator: reframe as a mirror (verdict: HOLD, reframe)

**Branch:** `EN-XX/figma-library-token-ssot`
**PR title (today):** "Figma design-system library + design-token single source of truth"
**Operating-model verdict (§17 tracker, row #13):** *Do not merge as an authority
claim.* Preserve the tooling; treat inputs as downstream mirrors until core
consumes them. Prefer folding the authority work into the Nx/core token
transition.

## Context

PR #13 adds a zero-dep DTCG token generator (`tokens/dashbook.tokens.json` +
`scripts/build-tokens.mjs`) that emits CSS, a typed TS map, a Figma variable
payload, two Figma appliers, and an HSL reference for the lib. The **tooling is
useful and worth keeping**. What is not acceptable is the framing: the PR
presents a Dashbook-local token file as the cross-product *single source of
truth* over product roles that `@dashfi/svelte` (core) actually owns. Per §11.1
and §14, Dashbook token files are **mirrors** today; authority flips only when
the §14 gates pass and the switch is thrown explicitly.

**Dependencies (both now merged to main):**
- **#17** (drift audit): `pnpm spec-audit` is the audited product-token oracle.
  Its resolved light/dark values are what generated output must match. #13's
  generated token source is **not** covered by spec-audit today.
- **#15** (MCP resources/schemas/server-card): MCP/JSON output shapes are now
  contract; §11.2 requires keeping them stable when internal token sources
  change.

**Current prod:** https://dashbook.vercel.app (`brand.dash.fi` is the future Nx
target, not prod).

## Two acceptable end-states (pick one; steps below cover Path A)

- **Path A — reframe as a mirror and make #13 mergeable standalone.** Keep the
  generator, relabel it as a normalized mirror/generation input, reconcile its
  values to #17's audited values, add a drift check, fix false docs, harden the
  Figma sync. This is the smaller, lower-risk path and is written out below.
- **Path B — fold into the core token transition (§11.3 / §14).** Do not land a
  standalone authority story; move the DTCG source + generator into the
  `packages/brand` transition where core generates the lib theme and Figma from
  it, landed as a zero-value-change reconcile first. Choose this if the team
  wants to skip a standalone reframe. The `.knowledge/brand-token-ssot-migration.md`
  doc this PR adds is the seed for Path B and can stay.

> Verified against the live branch on 2026-07-16 (`gh pr diff 13`, file reads).
> Stale-claim corrections vs the original review are called out inline.

---

## Ordered steps

### 1. Remove unqualified "single source of truth" framing (blocking item a — §14)

Unqualified SSOT language currently appears in four places over product roles the
lib owns:

- [ ] **PR title** — drop "single source of truth"; e.g. "Figma library +
  Dashbook token generator (mirror/generation tooling)".
- [ ] **`tokens/README.md`** — heading line 1 (`# Design tokens — single source
  of truth`) and the "**one place** Dashbook's design tokens are defined" claim.
  Reframe to: this file is a **normalized mirror + generation input**; product
  authority is `@dashfi/svelte` in core, marketing authority is the website
  (§11.1).
- [ ] **`tokens/dashbook.tokens.json`** — `$description` ("Dashbook design tokens
  — the single source of truth").
- [ ] **`scripts/build-tokens.mjs`** — header comment ("the single-source-of-truth
  generator").

**Acceptance:** no artifact claims Dashbook is the SSOT for product/marketing
values; each states it is a mirror/generation input per §11.1–§11.2. Grep for
"single source of truth" / "one place" returns only correctly-qualified uses
(e.g. "single source of *every hex within Dashbook's mirror*").

### 2. Reconcile generated values to #17's audited values (blocking item b — §11.2)

The generated source **diverges from #17's audited resolved values**, and the
divergence is a silent value change, not a mirror:

- `product.primary.light` is set to `{base.dash-ink}` → resolves **#25261d**;
  #17's audited `primary` light is **#24251d**.
- `product.fg.light` is set to `{base.dash-jade-deep}` → resolves **#123b39**;
  #17's audited `fg` light is **#123b38**.

(The base primitives `dash-ink` #25261D and `dash-jade-deep` #123B39 match main;
the drift is introduced by re-aliasing the *semantic roles* to those primitives,
changing the resolved value by one hex step from the audited map.)

- [ ] Do a **zero-value-change reconcile**: make generated product output equal
  #17's audited resolved values (`src/lib/tokens.ts` on main / `pnpm spec-audit`).
  Either keep the audited literals for `primary`/`fg` (and any other role that
  resolves differently) instead of aliasing, or correct the primitive — but the
  resolved value must not change in this PR.
- [ ] Regenerate (`pnpm tokens`) and diff `src/lib/generated/*` against the prior
  committed output to confirm only intended reconciliation deltas.

**Acceptance:** `pnpm spec-audit` reports **0 stale resolved values**; a
value-by-value diff of the generated product roles against the audited map is
empty. Any deliberate value change is split into a separate, owner-approved PR
(§9.5, §11.3 — reconcile first, design evolution later).

### 3. Resolve the parallel, unconsumed token source (blocking item b — §11.2)

`tokens/dashbook.tokens.json` → `src/lib/generated/tokens.ts` is **imported
nowhere**; app code consumes only the generated CSS (`app.css` imports
`generated/tokens.css` + `generated/theme.css`), and the JSON API still reads the
hand-maintained `src/lib/tokens.ts` (`src/routes/api/foundations/color.json/+server.ts`).
Shipping a second, unaudited, already-divergent product-token map is the core §14
violation.

- [ ] Choose one and do it in this PR:
  - **(i) Wire it up (Phase 0 of the migration doc):** point the JSON API / MCP
    foundations / docs at `generated/tokens.ts`, retire the hand-maintained
    `src/lib/tokens.ts`, and snapshot-test the JSON/MCP output shapes so they are
    unchanged (§11.2, #15 contract). Then step 2's reconcile also covers this
    map.
  - **(ii) Drop it:** remove `generated/tokens.ts` from the PR and keep only the
    consumed CSS outputs until the migration wires a single source.
- [ ] Do **not** leave two product-token maps in the tree.

**Acceptance:** exactly one product-token source is consumed by app + JSON + MCP;
whichever remains is covered by `pnpm spec-audit`; `/api/foundations/color.json`
output shape is byte-stable (snapshot test).

### 4. Add a generated-artifact drift check (blocking item c — §11.2, §9.6)

`scripts/build-tokens.mjs` always writes; it never verifies. There is no gate
that fails when committed generated files are stale.

- [ ] Add a `--check` mode to `build-tokens.mjs` that generates to memory and
  exits non-zero if any committed artifact
  (`src/lib/generated/tokens.css`, `theme.css`, `tokens.ts`,
  `tokens/figma.tokens.json`, `tokens/figma-apply.gen.js`,
  `tokens/figma-text-styles.gen.js`, `tokens/lib-tokens.reference.css`) differs.
- [ ] Wire `pnpm tokens --check` (or `pnpm tokens:check`) into CI and reference
  it from the checks in `CLAUDE.md`.
- [ ] Keep output deterministic (stable key order, trailing newline) so the check
  is not flaky.

**Acceptance:** editing the JSON without regenerating fails CI; a clean tree
passes; running the check twice is stable.

### 5. Correct false / self-contradictory documentation (blocking item d)

- [ ] **`tokens/README.md`** — the claim "The portal and `@dashfi/svelte` pick up
  the CSS automatically (app.css imports the generated file)" is **false**:
  `@dashfi/svelte` is an external package with its own `global.css`; it does not
  consume Dashbook's generated CSS. Restrict the claim to the Dashbook portal.
- [ ] **Self-contradiction:** the README note (and the `tailwind` `$description`
  in `dashbook.tokens.json`) say the `@theme` surface "differs from the product
  token layer (`--primary` #000, `--destructive` #000)". After this PR's own
  correction the generated token layer is `--primary: var(--dash-ink)` and
  `--destructive: #ff4000` — i.e. no longer #000. Remove/rewrite the "they differ /
  unifying is a deliberate design decision" note so docs match the generated
  output.

**Acceptance:** every consumption/authority claim in `tokens/README.md` and the
JSON `$description`s is literally true against the actual imports and the
generated files; no statement contradicts another.

### 6. Harden the Figma sync (blocking item e — §11.2)

`tokens/figma-apply.gen.js` (and the generator that emits it) hardcode Figma IDs
and overclaim "upsert":

- [ ] Move the collection IDs (`3:2/3:3/3:4`), mode IDs (`3:0…3:4`), and file key
  (`91csAF1OGUmCZROdZlCRSv`) out of the emitted script into **configuration**
  (e.g. a `tokens/figma.config.json` the generator reads), so identifiers are
  config, not baked authority (§11.2).
- [ ] Fix the "upsert" overclaim: today a missing variable is pushed to `missing`
  and the loop `continue`s — it neither creates nor fails. Either **create** the
  variable, or **fail/clearly block** on missing when the sync claims to upsert
  (§11.2). Update `tokens/README.md` "Sync Figma" wording ("upserts variables")
  to match the actual behavior.

**Acceptance:** a missing Figma variable produces a non-zero result or an
explicit blocking report (not a silent `missing:[]`-adjacent success); Figma
IDs live in config; README describes real behavior.

### 7. Rebase / merge hygiene (blocking item f — re-verified, now stale)

**Correction:** the original review listed `package.json` + `PLAN.md` as
conflicting with main. As of 2026-07-16 they **auto-merge cleanly**
(`git merge-tree origin/main <#13 head>` reports "Auto-merging", no CONFLICT);
main's `build` script is still `vite build`, so #13's `build` change does not
textually collide.

- [ ] Re-verify at rebase time (state is perishable).
- [ ] **Semantic integration point:** #13's `build` becomes
  `node scripts/build-tokens.mjs && vite build`; #17 added a separate
  `spec-audit` script. Decide how they compose — recommended: `build` runs
  `tokens --check` (step 4) so a stale artifact fails the build, and `spec-audit`
  stays independent.

**Acceptance:** clean rebase onto current main; `pnpm build` runs token
generation/check; `pnpm spec-audit` still runs independently.

### 8. Confirm integration order / authority stance (§17.1)

- [ ] Keep #13 **out of the authority path** (§17.1 step 5). It merges only as
  reframed mirror tooling (Path A) or is folded into the core token transition
  (Path B). Record the choice in `PLAN.md` and, if it changes authority framing,
  in the operating-model change log (§21.2).

---

## Acceptance / verification

Run and prove (repo baseline lint has known failures — prove **no new** ones,
per `CLAUDE.md`):

```
pnpm check && pnpm lint && pnpm test && pnpm spec-audit && pnpm build
pnpm tokens --check      # new drift gate (step 4) — must pass on a clean tree
```

- [ ] `pnpm spec-audit` → 0 stale resolved values (step 2).
- [ ] Only one product-token source is consumed; `/api/foundations/color.json`
  shape unchanged via snapshot (step 3).
- [ ] `pnpm tokens --check` fails on a hand-edited JSON, passes clean (step 4).
- [ ] No unqualified SSOT language; no false/contradictory docs (steps 1, 5).
- [ ] Figma sync blocks/reports on missing vars; IDs in config (step 6).
- [ ] Clean rebase; build composes token check with #17's spec-audit (step 7).
- [ ] MCP/JSON output shapes verified stable (primary surface, §10.2 / #15).
- [ ] Tell the human to run the checks and to test the change manually before it
  is considered verified.
