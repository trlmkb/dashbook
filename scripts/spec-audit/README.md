# spec-audit — spec ↔ lib drift engine

Checks Dashbook's component specs and product foundation against the rendered
source shipped by `@dashfi/svelte`. It updates only mechanically safe resolved
token values; prose, token-part selection, variant ordering, and other curated
fields remain human-owned.

Design: [`docs/superpowers/specs/2026-07-13-spec-lib-drift-engine-design.md`](../../docs/superpowers/specs/2026-07-13-spec-lib-drift-engine-design.md).

## Run

```bash
pnpm spec-audit             # human-readable report; stale values fail
pnpm spec-audit --write     # rewrite stale light/dark TokenRef values
pnpm spec-audit --json      # machine-readable report
pnpm spec-audit --strict    # also fail advisory coverage/trace gaps
```

The default source root is the pinned package consumed by this repository:
`node_modules/@dashfi/svelte/dist`. The runner is path-configurable for the
planned move into the core Nx workspace:

```bash
DASHBOOK_LIB_ROOT=../../libs/svelte-components/lib/src/lib pnpm spec-audit
```

The package path and Nx project name are deliberately not encoded here; the
later migration only needs to supply the sibling library root.

## What is enforced

- Every resolved `TokenRef.light` / `TokenRef.dark` value in every shared
  component spec discovered from the library is compared with the theme that
  actually renders.
- The product foundation values exposed by `product_get_foundation` are checked
  against that same theme.
- `--write` canonicalizes those light/dark string literals to the rendered
  values and preserves the surrounding spec structure and authored prose.
- The normal exit code is nonzero only for stale resolved values. This is the
  safe CI gate available before the repositories are colocated.

## What is reported for review

The source reader recursively scans `.svelte`, `.ts`, `.js`, and `.css` files,
including static class literals, `tv()` configs, class maps, and conditional
branches. It reports two additional kinds of evidence:

- source theme tokens used by a component but not selected for its curated
  `tokens[]` table;
- literal `dimensions[].tw` classes that are not visible in that component's
  own source, commonly because the appearance is inherited from Button, Input,
  Popover, Table, or another shared primitive.

Those findings are advisory by default. Automatically adding token rows would
invent part names and editorial scope, while treating inherited classes as
wrong would create false positives. `--strict` is available for focused cleanup
and for the future dependency-aware gate.

## Implementation

- `resolver.ts` parses light/dark theme variables, resolves Tailwind color
  utilities, converts HSL triples to rendered hex, and tolerates harmless HSL
  round-trip differences.
- `source-reader.ts` inventories component source, literal classes, and theme
  token usage across the full published library.
- `tv-extractor.ts` retains structured `tailwind-variants` extraction for
  deeper variant analysis.
- `spec-reader.ts` reads dimensions and token references and performs narrow,
  source-preserving token rewrites.
- `audit.ts` is the pure resolved-value comparison layer.
- `cli.ts` discovers the library and registered specs, checks the foundation,
  prints text or JSON, applies `--write`, and owns exit-code policy.

The one-time reconciliation in this PR audited 61 registered shared components,
added the missing PaginationWrapper spec, and left Sidebar to the already-open
Sidebar spec PR. It canonicalized 151 resolved token occurrences plus several verified
anatomy mismatches in Card, Loader, MultiSelect, PhoneInput, DateRangeSelector,
DropdownMenu, Calendar, Command, Tooltip, EnhancedTable, and Pagination.

## Follow-ups after this PR

- Merge/rebase the Sidebar spec from its existing PR, then require a complete
  library-to-registry inventory.
- Add dependency-aware class tracing so inherited Button/Input/Popover/Table
  geometry can move from advisory to enforceable.
- Promote reviewed source-token coverage rows without auto-inventing curation.
- Add structured prop/variant/geometry comparison where the source has a safe
  AST representation.
- Install the gate on shared-library PRs after the planned Nx move into core.
