# PR 3 — Pattern extraction R3 implementation plan

> **For agentic workers:** execute task-by-task, commit after each task,
> verify with `pnpm check && pnpm lint && pnpm build` before the PR.

**Goal:** Close the gaps between (a) the Dash.fi product app and the product
design system, and (b) the live dash.fi marketing site and the marketing
design system — grounded in two July-2026 gap-analysis passes (evidence cited
per item below).

**Branch:** `EN-XX/pattern-extraction-r3` off `main`.

**Method:** Before writing anything, study 2–3 existing examples of each file
shape you will produce and copy their structure exactly:
- Product pattern pages: `src/routes/patterns/<slug>/+page.svelte` +
  registry `src/lib/content/patterns.ts` (17 existing; e.g.
  `transaction-list`, `multi-step-onboarding`).
- Marketing pattern specs: `src/lib/specs/marketing/patterns/*.ts` +
  `index.ts` registry + route pages `src/routes/marketing/patterns/<slug>/`.
- Component docs: `src/lib/content/components.ts` + component route pages.

Evidence sources for pattern anatomy (read-only, do not modify):
- Product app: `/Users/zy/dev/dash/core/packages/dashfi-ui/app/src/routes`
  and `/Users/zy/dev/dash/core/packages/dashfi-ui/app/src/lib`.
- Component lib: `/Users/zy/dev/dash/core/libs/svelte-components/lib`.

Voice: sentence case, no exclamation marks, no emoji, numerals. Marketing
demos use `--m-*` tokens only; product demos use `@dashfi/svelte` components
inside `PreviewCanvas` conventions used by existing pattern pages.

---

### Task 1: Six new full-depth product patterns

Add to `src/lib/content/patterns.ts` and create
`src/routes/patterns/<slug>/+page.svelte` for each, with Preview / Code /
Rationale / Variations depth matching existing pages:

| Slug | Category | Grounding (real app source to read first) |
|---|---|---|
| `bulk-action-bar` | Data | `app/src/lib/components/common/bulk-action-bar`, `expenses/transactions/components/expense-bulk-action-bar.svelte`, selection stores; async BulkRunner + toast reporting |
| `bulk-import-wizard` | Forms | `app/src/lib/modules/bulk-import/` (wizard, step-rail, file-source, item review tables, live-count tabs) |
| `in-dialog-stepper` | Forms | `financial-accounts/components/add-funds-dialog.svelte` (steps array of {component, props}, direction-aware fly transitions) |
| `card-gallery` | Data | `cards/overview/+page.svelte` (grid/list ToggleGroup, cardholder combobox facet, status/spend chips) |
| `secret-reveal` | Confirmation | `settings/developer/*` (api-key-reveal-dialog, webhook-secret-reveal-dialog; reveal-once semantics) |
| `notification-inbox` | Data | `notifications/all/+page.svelte` (Today/Yesterday/This week grouping, date filter, unread + mark-read) |

Each preview is a simplified, self-contained recreation using `@dashfi/svelte`
components (no app-private imports). Rationale sections cite the recurrence
("used across expenses, bill-pay, and card transactions" etc.).

Commit after each pattern: `feat(patterns): <slug>`.

### Task 2: Three draft product patterns

Same registry + route, but using the existing `draft` support in
`PatternLayout` (see how existing drafts/stubs were done in git history or the
`draft` prop in `src/lib/chrome/PatternLayout.svelte`):
`statement-archive` (Data — statements year pager + month rows + preview
modals), `role-permission-matrix` (Forms — master-detail, mobile collapses to
Select), `product-catalog` (Layout — enable/disable product rows with
off-ramp dialog and pricing table).

Commit: `feat(patterns): draft stubs for statement-archive, role-permission-matrix, product-catalog`.

### Task 3: Product drift corrections

- `workflow-data-table-page`: update `uses`/copy to name the dedicated
  bulk-action bar (link the new pattern) instead of implying
  DropdownMenu+Button suffices.
- `multi-step-onboarding`: add a "When NOT to use" / sibling note pointing to
  `in-dialog-stepper` for modal-scoped flows.
- `table-filters` component docs: cross-link EnhancedTable's
  `FilterConfig`/`FilterValues` capability as the advanced facet-filter path.
- `card-detail`: add a note that the pattern is a simplified excerpt of the
  production card-management surface.

Commit: `docs(patterns): drift corrections from product-app audit`.

### Task 4: Component catalogue gaps

- Add a `sidebar` entry to `src/lib/content/components.ts` (category
  Navigation, status beta) + component page documenting the Sidebar family
  from `lib/src/lib/ui/sidebar/` (Sidebar, SidebarProvider, SidebarInset,
  SidebarTrigger, SidebarMenu, SidebarGroup, SidebarHeader/Footer/Rail/
  Separator/Input) — PropsTable per key sub-component read from the actual
  lib source. It is referenced by the shipped `protected-app-shell` pattern
  and currently undocumented. Update the component count anywhere it is
  displayed (home page derives it from the array — verify; `/developers`
  stability matrix; PLAN.md counts move 60 → 61).
- `pagination` docs: note the `PaginationWrapper` convenience wrapper exists
  in the lib.
- PLAN.md backlog note: "`@dashfi/svelte` version reconciliation — dashbook
  pins ^0.5.0, lib package.json says 0.4.0 (workspace: consumers unaffected);
  confirm published registry contents."

Commit: `docs(components): sidebar family + pagination-wrapper; version-drift note`.

### Task 5: Five new marketing patterns

For each: spec in `src/lib/specs/marketing/patterns/<slug>.ts`, register in
`index.ts`, route page under `src/routes/marketing/patterns/<slug>/`. Specs
feed the MCP and JSON API automatically — follow existing spec type exactly
(`src/lib/specs/types.ts`).

| Slug | What | Live evidence |
|---|---|---|
| `comparison-table` | N-column (2–4) feature matrix, emphasized "us" column, horizontal-scroll wrapper on mobile | home, /corporate-card, /rewards, /shipping, /ai-spend-audit — replaced the pricing page entirely |
| `data-table-band` | Marketing data table as proof section (audit violations, flagged items) | /parcel-audit, /carrier-contract-management |
| `chart-band` | Chart + explanatory copy proof band (bar/line, optional range tabs) | /parcel-analytics, /parcel-audit, /ai-spend-audit |
| `action-plan` | Numbered prioritized-recommendation list with effort / timeline / impact metadata | /parcel-analytics (7-item plan), /ai-spend-audit |
| `form-capture` | Embedded application/email-capture form section | /growthnetwork, /partner, home email-capture hero |

Demo implementations stay restrained: static demo data, `--m-*` tokens,
tabular numerals for money, jade for positive (never green), monochrome for
negative (never red).

Commit per pattern: `feat(marketing): <slug> pattern`.

### Task 6: Marketing variants + staleness annotations (spec edits only)

- `step-timeline`: add "compare" (old way vs new way — /rewards,
  /carrier-contract-management) and "pipeline status" (Draft → Submitted →
  Acknowledged → Accepted — /ai-spend-audit) documented variants.
- `live-widget`: add term-selector (Net-1→Net-60 picker, /corporate-card) and
  tier-slider (/meta-cashback) sub-recipes.
- `split-cta`: add dual-peer-CTA-boxes variant (/parcel-audit family).
- `feature-grid`: add 4-up audience-segment card variant (/partner,
  /growthnetwork).
- `case-study-card`: add confidence-score + strategy-bullets variant
  (/parcel-audit, /parcel-analytics).
- `pinned-showcase` and `cosmic-hero`: add source note "no live usage on
  dash.fi as of 2026-07" (keep the patterns; cosmic-hero noted as reserved
  for campaign surfaces).

Commit: `docs(marketing): variants and staleness notes from live-site audit`.

### Task 7: Registry reconciliation + IA note

- Fix `src/lib/content/marketing.ts` against
  `src/lib/specs/marketing/patterns/index.ts`: remove phantom slugs
  (`centered-hero`, `asymmetric-product-hero`, `slide-frame`,
  `two-col-slide`, `stat-strip`, `cta-section`); add missing
  (`dark-cta-band`, `faq-accordion`, `trust-stat-band`, `calculator-island`)
  plus the 5 new ones from Task 5. Verify ⌘K search picks them up
  (check `src/lib/content/search-index.ts`).
- Add the "Audit agents" nav taxonomy (shipping / ad-pay / ai-spend-audit
  families, current top-level dash.fi IA) as a content note on the marketing
  section foundation page (`src/routes/marketing/foundations/section/` or the
  most fitting foundation — inspect first).

Commit: `fix(marketing): reconcile nav registry with pattern index; audit-agents IA note`.

### Task 8: PLAN, CHANGELOG, verify, PR

- PLAN.md: pattern counts 17 → 23 full + 3 draft product; marketing 34 → 39;
  components 60 → 61; add backlog items (version reconciliation; FDIC copy on
  /financial-accounts should be compared verbatim against the legal-disclosure
  library — flag for compliance review, do NOT change legal copy in this PR).
- CHANGELOG.md under unreleased heading.
- `pnpm check` 0 errors · `pnpm lint` · `pnpm build`.
- Push, `gh pr create --base main --title "EN-XX: pattern extraction R3 — product app and dash.fi sweeps"`.
  Body: summary tables (new patterns with live-site/app evidence), review
  route list, "How to test manually". **Do not merge.**
