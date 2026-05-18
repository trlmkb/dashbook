# Visual regression strategy - Dashbook + @dashfi/svelte

Owner: design systems
Status: proposal, immediate cutover checklist usable today
Scope: `@dashfi/svelte` (lib), dashbook.vercel.app (docs portal), dashfi-ui (production app)

## Why this exists

The design-vnext branch is about to merge to core master. Once it lands, dashfi-ui feature branches rebase onto a new master and silently inherit lib changes. We need a way to catch visual drift at three layers:

1. Inside the lib itself, when a token or component primitive changes.
2. Inside dashbook, where every component preview and pattern preview is a live render of the lib.
3. Inside dashfi-ui, where production customer surfaces consume the lib via `workspace:*`.

This document covers what we are protecting against, the three viable tooling options, the recommended hybrid, and the cutover checklist that ships now.

---

## 1. Failure modes we are protecting against

| #   | Failure mode                                                                                                                  | Where it shows up    | Severity |
| --- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- |
| 1   | Lib component visual drift - silent change to a primitive, e.g. button radius 6px → 8px                                       | Every consumer       | High     |
| 2   | Lib component API drift - prop renamed, default changed                                                                       | dashfi-ui, brand-app | Critical |
| 3   | Pattern preview drift - a lib change breaks a composed dashbook pattern (e.g. Tabs change → Tabbed section preview misaligns) | dashbook.vercel.app  | Medium   |
| 4   | dashfi-ui feature regression - feature branch CSS overrides collide with new lib defaults after rebase                        | Production           | Critical |
| 5   | Token drift - a hex flip in `tokens.ts` cascades into unintended surfaces                                                     | All consumers        | High     |

API drift (#2) was already audited and is byte-identical for npm 0.0.1 vs workspace HEAD, so the remaining work is visual: layers 1, 3, 4, 5.

---

## 2. Three viable tooling options

### Option A - Chromatic on Storybook

Best fit: the lib (`@dashfi/svelte`), per-component baselines.

Pros

- Per-story screenshot baselines, automatic diff per PR.
- Cloud renders in a fixed browser, so no local font-rendering noise.
- Auto-baselines on merge to main, no manual approval per snapshot.
- Reviewer UI is purpose-built for designer + engineer co-sign.

Cons

- Paid SaaS. Free tier exists but caps snapshots per month.
- Requires Storybook stories for every component. The lib has ~60 components and no Storybook today.
- Uploads source code to a third party.
- Doesn't cover composed pages - only isolated components.

### Option B - Playwright + screenshot diffing

Best fit: full-page rendering. Dashbook routes, dashfi-ui surfaces.

Pros

- Open source, runs in CI on the same machines that run e2e tests.
- Can target any URL, so it works for dashbook pattern previews and dashfi-ui pages alike.
- Built-in screenshot diffing via `toHaveScreenshot`, with a pixel tolerance knob.
- Baselines live in the repo, so review is the same review the rest of the PR gets.

Cons

- Font rendering varies by OS, so CI baselines must come from the same image as PR runs.
- Animation handling requires explicit disabling (CSS, `prefers-reduced-motion`, or test setup).
- Baselines are PNGs in the repo - bloat over time, candidate for git LFS once the suite grows.
- Flakiness on lazy-loaded fonts, images, or async content unless the test waits explicitly.

### Option C - Manual visual QA checklist

Best fit: the one-time cutover moment.

Pros

- Zero infra, immediate.
- Humans catch the things humans care about (alignment, density, hierarchy) better than pixel diffs in the first pass.
- Surfaces the post-rebase concern directly with no false positives.

Cons

- Doesn't scale, doesn't run per PR.
- Recall depends on the checklist author remembering every surface.
- No artifact for regression triage later.

---

## 3. Recommended hybrid

| Layer                     | Tool                               | When it runs                        | Who reviews        |
| ------------------------- | ---------------------------------- | ----------------------------------- | ------------------ |
| `@dashfi/svelte` (lib)    | Chromatic on Storybook, eventually | Per PR to core                      | Design + lib owner |
| Dashbook pattern previews | Playwright screenshot suite        | Per PR to dashbook + nightly        | Dashbook owner     |
| dashfi-ui post-rebase     | Manual checklist                   | Once per design-vnext-style cutover | Eng on shift       |

Rationale: each layer has different change frequency and different reviewer. The lib changes rarely but cascades widely, so per-component baselines are worth the investment. Dashbook changes daily but the surface area is a known list of routes, which Playwright handles cleanly. dashfi-ui has unbounded surface area but the cutover risk is bounded to a specific moment in time, so a checklist is the right tool.

---

## 4. What we ship now vs later

### Immediate (this cutover, days)

- Manual checklist for the design-vnext → master rebase. See section 6.
- One-page rebase QA runbook with 10–15 production routes to spot-check, owner per route, severity-to-action rubric.

### Phase 2 (post-cutover, weeks)

- Playwright screenshot suite covering the 20 most-trafficked dashbook routes - top patterns and top components.
- Baselines committed under `dashbook/tests/visual/__screenshots__/`. PNGs are small (<100 KB each at 1280×720), so direct git is fine until the suite passes ~500 baselines, then move to LFS.
- Run in CI on PR and nightly on main. PR blocks on diff above tolerance; nightly opens an issue.

### Phase 3 (later, quarter)

- Chromatic + Storybook for the lib, contingent on story coverage being added.
- Storybook coverage can be incremental: start with the 10 components that change most often, expand from there.

---

## 5. Phase 2 tooling specifics - Playwright

### What the test looks like

```ts
// dashbook/tests/visual/pattern-previews.spec.ts
import { test, expect } from '@playwright/test';

const patternRoutes = [
	'/patterns/protected-app-shell',
	'/patterns/auth-split-screen',
	'/patterns/tabbed-section',
	'/patterns/workflow-data-table',
	'/patterns/sub-section-tabs'
];

for (const route of patternRoutes) {
	test(`pattern preview: ${route}`, async ({ page }) => {
		await page.goto(`http://localhost:5173${route}`);
		const preview = page.locator('[data-testid="pattern-preview"]').first();
		await preview.waitFor({ state: 'visible' });
		await expect(preview).toHaveScreenshot(`${route.replace(/\//g, '-').slice(1)}.png`, {
			maxDiffPixels: 100
		});
	});
}
```

### Playwright config - the bits that matter

```ts
// playwright.config.ts (excerpt)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests/visual',
	expect: {
		toHaveScreenshot: {
			maxDiffPixels: 100,
			animations: 'disabled',
			caret: 'hide',
			scale: 'css'
		}
	},
	use: {
		viewport: { width: 1280, height: 720 },
		deviceScaleFactor: 1,
		colorScheme: 'light',
		locale: 'en-US',
		timezoneId: 'UTC'
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
```

Single browser only for v1. Adding webkit and firefox triples baseline storage and review surface.

### Gotchas

- Fonts must load before the screenshot. Wait on `document.fonts.ready` in the page or use a `waitFor` on a known text element.
- Disable animations globally via the `animations: 'disabled'` option, and add a test-only CSS injection that sets `transition: none; animation: none;` on `*`.
- Pin viewport, device scale factor, color scheme, locale, timezone. Defaults vary across CI runners.
- Run in a container that matches CI. If devs generate baselines on macOS and CI runs Linux, every diff is a font-hinting diff. Either use a Docker image locally or only accept baselines generated in CI.
- For lazy-loaded content, scroll the preview into view and wait for network idle before snapping.
- Mask anything dynamic (timestamps, "last updated 3m ago" strings) with `mask: [page.locator('[data-dynamic]')]`.

### Suggested package additions

```jsonc
// dashbook/package.json devDependencies
"@playwright/test": "*"   // pin to the version Vercel CI supports
```

```jsonc
// dashbook/package.json scripts
"test:visual": "playwright test --config=playwright.config.ts",
"test:visual:update": "playwright test --update-snapshots"
```

### Baseline workflow

1. Author the test, run `pnpm test:visual:update` in CI (via a one-shot workflow or a "trust the author" PR comment trigger).
2. Commit the generated PNGs.
3. PRs that change visual output show diffs in the Playwright HTML report; reviewer approves or rejects.
4. On approval, run `pnpm test:visual:update` to refresh baselines, commit, merge.

---

## 6. Cutover checklist - design-vnext → master

This is the immediate deliverable. Run this once after design-vnext is merged and dashfi-ui feature branches have been rebased.

### dashfi-ui (production surfaces)

For each route below, log in to a staging build with design-vnext applied, then compare against the same route on the pre-cutover deploy in another window.

| Route               | What to look for                                                                                                                               | Regression signal                                                                                       | Action                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `/login`            | Auth split-screen pattern. Brand pane on left, form column on right. Button variant `primary` for "Sign in", `tertiary` for "Forgot password". | Brand pane background wrong color, button heights mismatched, form column not centered.                 | Roll back if brand pane breaks. File issue if button height drifts. |
| `/dashboard`        | Protected app shell. SidebarProvider on left, content area on right. Sidebar items use correct active indicator.                               | Sidebar collapsed/expanded state wrong on load, active item not highlighted, content area gutter wrong. | Roll back if shell layout breaks.                                   |
| `/settings/profile` | Sub-section tabs pattern at top of content. Tabs render with active indicator below the active label.                                          | Active indicator missing, tab labels truncated, hover state missing.                                    | File issue.                                                         |
| `/transactions`     | Tabbed section with live pill counts ("All 142", "Pending 3").                                                                                 | Pill count badge wrong color, missing, or wrapped onto a second line.                                   | File issue. Worth rolling back if counts disappear.                 |
| `/cards`            | Workflow data table page. Row hover, row selection, bulk action bar at top.                                                                    | Row checkboxes misaligned, bulk bar not appearing on selection, row actions menu clipped.               | Roll back if bulk bar breaks (functional).                          |
| `/transactions/:id` | Detail page. Two-column layout, breadcrumb at top, action group at bottom.                                                                     | Breadcrumb separator missing, action group buttons stacked vertically when they shouldn't be.           | File issue.                                                         |
| `/team`             | List page with avatars and pills.                                                                                                              | Avatar sizing wrong, pill variant changed.                                                              | File issue.                                                         |
| `/settings/billing` | Form-heavy page. Input borders, label hierarchy, helper text.                                                                                  | Input height changed, label color drift, helper text spacing wrong.                                     | File issue.                                                         |
| `/notifications`    | Notification card stack.                                                                                                                       | Card padding, dividers, timestamp position.                                                             | File issue.                                                         |
| `/integrations`     | Card grid.                                                                                                                                     | Card grid gap, card aspect ratio, icon sizing.                                                          | File issue.                                                         |

### dashbook (docs portal)

| Route                           | What to look for                                                                        | Regression signal                                                         | Action                                |
| ------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| `/patterns/protected-app-shell` | SidebarProvider preview renders, sidebar items clickable, content swaps.                | Preview is blank, sidebar not visible, content area not rendering.        | Block deploy.                         |
| `/patterns/auth-split-screen`   | Brand pane + form column. Brand pane fills left half, form column fills right half.     | Columns flipped, brand pane missing, form column overflowing.             | Block deploy.                         |
| `/patterns/tabbed-section`      | Live tabs with counts.                                                                  | Counts missing, active tab indicator missing.                             | File issue.                           |
| `/patterns/workflow-data-table` | Live table with row selection.                                                          | Selection not working, bulk bar not appearing.                            | File issue.                           |
| `/components/button`            | All 7 variants render. Hover states, disabled state, loading state.                     | Any variant missing, hover color wrong, disabled cursor wrong.            | Block deploy if a variant is missing. |
| `/components/pill`              | All 9 variants render. Confirm the no-size-prop drift caught earlier is still resolved. | A variant misses its label, sizes off.                                    | Block deploy if drift returns.        |
| `/components/input`             | Default, error, disabled, with-icon.                                                    | Error border color wrong, icon misaligned.                                | File issue.                           |
| `/components/select`            | Open state with options visible.                                                        | Dropdown clipped, option hover state missing.                             | File issue.                           |
| `/components/dialog`            | Open by default in the preview.                                                         | Backdrop missing, dialog off-center.                                      | File issue.                           |
| `/brand/card`                   | Jade variant renders, bundle download button works, card art at correct aspect ratio.   | Card art stretched, jade variant looking off-brand, bundle download 404s. | Block deploy if bundle is broken.     |
| `/foundations/color`            | Swatches render with correct hex values and labels.                                     | Swatch missing, hex mismatched.                                           | Block deploy.                         |
| `/foundations/type`             | Type scale renders with correct sizes.                                                  | Scale collapsed, sizes wrong.                                             | File issue.                           |
| `/foundations/spacing`          | Spacing scale renders with correct values.                                              | Scale wrong.                                                              | File issue.                           |

### Severity rubric

- Block deploy: layout broken, component missing, brand-critical surface wrong.
- Roll back: production surface visibly broken to customers.
- File issue: drift exists, customer can complete the task, fix in next sprint.

---

## 7. Rollback procedure

If a regression is caught after deploy:

### Standalone dashbook (dashbook.vercel.app)

1. Open Vercel dashboard → dashbook project → Deployments.
2. Find the last green deployment before the regression.
3. Promote to production.
4. Open a follow-up PR with the fix, do not redeploy until the diff is reviewed against baselines.

### core/dashfi-ui

1. Identify the offending lib commit (most likely the design-vnext merge or a follow-up).
2. Pin `@dashfi/svelte` workspace dep to the previous good commit on the dashfi-ui side.
3. Force a re-install (`pnpm install`) and trigger a redeploy from CI.
4. Once the lib regression is fixed, unpin and redeploy.

### The lib itself (`@dashfi/svelte`)

1. If design-vnext is the regression source and the merge is fresh: revert the merge commit on core master.
2. If a single component is the source: revert just that component's commit, leave the rest of design-vnext in place.
3. Bump lib version, redeploy consumers.

---

## 8. Open questions

- Storybook coverage for the lib - who owns adding stories? Phase 3 depends on this.
- Where do screenshot baselines live long-term? Git LFS becomes necessary once the suite passes ~500 baselines or ~50 MB.
- CI runner image - needs to be pinned so Linux font rendering matches between PR and main runs.
- Do we want a "trust the author" workflow for baseline updates, or always regenerate in CI?

---

## 9. Appendix - what changes when a lib bump lands

Order of operations for any future `@dashfi/svelte` version bump after Phase 2 is live:

1. Lib PR merges, version bumps.
2. Dashbook updates `workspace:*` dep, runs `pnpm test:visual`. Diffs appear in the PR. Reviewer approves or rejects.
3. dashfi-ui updates its workspace dep on a feature branch. Manual checklist for the 5–10 routes that touch the changed component.
4. If all green, merge dashfi-ui dep bump.

The cutover checklist in section 6 is the manual-only version of this workflow. Phase 2 automates step 2. Phase 3 automates step 1 inside the lib itself.
