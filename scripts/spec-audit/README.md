# spec-audit — spec ↔ lib drift engine

Derives the **mechanical** subfields of each component spec (resolved token hex,
geometry, sizes, prop/variant signatures) from `@dashfi/svelte` source and flags
where the specs have drifted. Design: [`docs/superpowers/specs/2026-07-13-spec-lib-drift-engine-design.md`](../../docs/superpowers/specs/2026-07-13-spec-lib-drift-engine-design.md).

## Run

```bash
pnpm test          # engine unit tests (vitest)
pnpm spec-audit    # drift report against the current lib + specs
pnpm spec-audit --json > report.json
```

Migration-neutral via one env knob:

```bash
# today (standalone): defaults to node_modules/@dashfi/svelte/dist
# after the move to core/packages/brand:
DASHBOOK_LIB_ROOT=../../libs/svelte-components/lib/src/lib pnpm spec-audit
```

Exit code is nonzero when any drift is found — the future CI gate (dormant until
the engine lives in core alongside the lib).

## What's implemented (this PR)

- **`resolver.ts`** — class→token→hex + geometry. Parses the lib theme sheet
  (`:root` light / `.dark` dark), converts HSL triples to the **rendered** hex,
  and compares with a per-channel tolerance so the lib's HSL rounding is not
  reported as false drift. Declines gradients / arbitrary palette values (they
  stay prose). Fully unit-tested.
- **`tv-extractor.ts`** — parses `tailwind-variants` configs (TS compiler API)
  from `index.ts` **and** `<script module>`; multiple blocks per component.
- **`spec-reader.ts`** — statically reads the token hex a spec currently records
  (no app import).
- **`audit.ts`** — pure diff: expected (from lib) vs recorded (from spec) →
  `ok` / `drift` / `missing`.
- **`cli.ts`** — runs the tv() tier end-to-end and prints the report.

Coverage today: the **tv() tier** (badge, button, alert, item, empty, toggle,
switch, sheet). Everything else reports as `unsupported` — it needs the
extractors below.

## Tracked follow-ups (remaining scope)

Per the design doc, still to build:

- **static-cn extractor** — first string-literal class on a component/sub-part
  root (Svelte 4 + 5). Biggest surface-area win: all inline-static components +
  every composite's per-slot rows.
- **class-map extractor** — `switch` / object maps (pill, sonner, merchant-logo).
- **cn-conditional extractor** — `cond === 'x' && '…'` branches (tabs, scroll-area, navigation).
- **`buttonVariants` cross-ref resolver** — pagination, calendar, date-range-selector, tel-input.
- **Subfield 3-way merge + `--write` / `--write-semi`** — apply fixes in place,
  preserving prose/ordering (currently the engine only reports).
- **Full 62-spec reconciliation** — Auto write, Semi confirm, Manual verify.
- **Foundations stretch** — reuse the resolver for `product_get_foundation` drift.
- **Verify-only guardrails** — hard-code the trap list (code-block, flow-lines,
  tabs indicator, sidebar, variant ordering, nonFeatures, curated prop subsets).
