# PR 1 — UI/UX facelift implementation plan

> **For agentic workers:** execute task-by-task, commit after each task,
> verify with `pnpm check && pnpm lint && pnpm build` before the PR.

**Goal:** High-end micro-animations and interactions across the dashbook
portal chrome, on-brand (no spring/bounce, token-driven, reduced-motion-safe).

**Architecture:** A small motion utility layer in `src/app.css` + a
`src/lib/utils/motion.ts` helper module (Svelte actions), consumed by the
chrome components and the landing page. No new dependencies.

**Tech stack:** SvelteKit 2 (Svelte 5 runes), Tailwind v4, CSS custom
properties already defined (`--easing-*`, `--dur-*`).

**Branch:** `EN-XX/uiux-facelift-micro-interactions` off `main`.

---

### Task 1: Motion utility layer

**Files:** Modify `src/app.css`; Create `src/lib/utils/motion.ts`.

`app.css` — add after the existing motion tokens:

```css
/* Motion utilities — v1.1 facelift */
@keyframes db-rise-in {
	from { opacity: 0; transform: translateY(8px); }
	to { opacity: 1; transform: translateY(0); }
}
@keyframes db-char-up {
	from { transform: translateY(110%); }
	to { transform: translateY(0); }
}
.db-reveal { opacity: 0; }
.db-reveal.is-visible {
	opacity: 1;
	animation: db-rise-in var(--dur-normal) var(--easing-out) both;
}
.db-press { transition: transform var(--dur-instant) var(--easing-default); }
.db-press:active { transform: scale(0.97); }
@media (prefers-reduced-motion: reduce) {
	.db-reveal, .db-reveal.is-visible { opacity: 1; animation: none; }
	.db-press:active { transform: none; }
	::view-transition-old(root), ::view-transition-new(root) { animation: none !important; }
}
```

`src/lib/utils/motion.ts` — two Svelte actions, no `any`:

```ts
import type { Action } from 'svelte/action';

const reduced = () =>
	typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Adds `is-visible` when the node first enters the viewport. */
export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, opts) => {
	if (reduced()) {
		node.classList.add('is-visible');
		return;
	}
	if (opts?.delay) node.style.animationDelay = `${opts.delay}ms`;
	const io = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				node.classList.add('is-visible');
				io.disconnect();
			}
		},
		{ threshold: 0.15 }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};

/** Counts a tabular numeral up to its target over 700ms ease-out cubic, once visible. */
export const countUp: Action<HTMLElement, { to: number; duration?: number } | undefined> = (
	node,
	opts
) => {
	const to = opts?.to ?? Number(node.textContent ?? 0);
	const duration = opts?.duration ?? 700;
	if (reduced() || !Number.isFinite(to)) return;
	node.textContent = '0';
	const io = new IntersectionObserver((entries) => {
		if (!entries[0].isIntersecting) return;
		io.disconnect();
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			node.textContent = String(Math.round(to * eased));
			if (t < 1) requestAnimationFrame(tick);
			else node.textContent = String(to); // must land on real value
		};
		requestAnimationFrame(tick);
	});
	io.observe(node);
	return { destroy: () => io.disconnect() };
};
```

Verify: `pnpm check`. Commit: `feat(motion): shared reveal/count-up actions + css utilities`.

### Task 2: View transitions on navigation

**Files:** Modify `src/routes/+layout.svelte` (script) and `src/app.css`.

```ts
import { onNavigate } from '$app/navigation';

onNavigate((navigation) => {
	if (!document.startViewTransition) return;
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
```

`app.css`:

```css
::view-transition-old(root) { animation: 90ms var(--easing-in) both db-vt-out; }
::view-transition-new(root) { animation: 150ms var(--easing-out) both db-vt-in; }
@keyframes db-vt-out { to { opacity: 0; } }
@keyframes db-vt-in { from { opacity: 0; transform: translateY(4px); } }
```

TS note: if `document.startViewTransition` isn't in the lib DOM types at our TS
version, add a minimal ambient declaration in `src/app.d.ts` — do not use `any`.

Commit: `feat(nav): view transitions with reduced-motion fallback`.

### Task 3: Header — scroll-condensed sticky + animated nav indicator

**Files:** Modify `src/lib/chrome/Header.svelte`.

- Make header `position: sticky; top: 0` with a `data-scrolled` state driven by
  a scroll listener (`window.scrollY > 8`), adding backdrop blur
  (`backdrop-filter: blur(8px)`, semi-transparent `--bg`) and a hairline
  `border-bottom` that transitions opacity at `--dur-fast`.
- Active nav link: animated underline/indicator — `::after` scaling from 0 to
  1 horizontally at `--dur-fast var(--easing-out)`; active state derived from
  `page.url.pathname` (already available in the component — inspect first).

Commit: `feat(header): sticky condensed state + animated nav indicator`.

### Task 4: Landing page signature moves

**Files:** Modify `src/routes/+page.svelte`.

- Display heading: wrap each character of the `brand & design system` line in
  `<span class="char" style:animation-delay={i * 30 + 'ms'}>` inside
  `overflow:hidden` line wrappers; animate with `db-char-up 600ms
  var(--easing-out) both`. Reduced motion: no animation (chars static). Keep
  the existing `aria-label` on the `h1`; mark char spans `aria-hidden="true"`.
- Numbers band: apply `countUp` action to the 4 `.num` values.
- Sections (`numbers`, `palette`, audience tiles, recent updates): `reveal`
  action with 40ms incremental delays.
- Palette strip: hover state per swatch — swatch grows `flex-grow` slightly or
  lifts border + shows hex more prominently, `--dur-fast`.
- Fix stale version pill: derive `ver`/`date` from the newest entry of the
  changelog data source (check `src/routes/changelog` for the data module; if
  entries are hardcoded in the changelog page, extract the top entry into
  `src/lib/content/releases.ts` and import from both places). The hero pill
  currently hardcodes v0.9.0 while the site is v1.0.0 — this is the bug.

Commit: `feat(home): char-stagger hero, count-up numbers, section reveals, live version pill`.

### Task 5: Command palette polish

**Files:** Modify `src/lib/chrome/CommandPalette.svelte`.

- Overlay: fade in at `--dur-fast`; panel: opacity + `scale(0.95→1)` +
  `translateY(4px→0)` at `--dur-fast var(--easing-out)`. Closing may be
  instant (Linear-style) — do not add exit-animation complexity.
- Selected-row highlight: `transition: background-color var(--dur-instant)`.
- Respect reduced motion.

Commit: `feat(palette): entrance animation + selection transitions`.

### Task 6: Micro-interactions sweep

**Files:** Modify `src/lib/chrome/CopyValue.svelte`, `Swatch.svelte`,
`ThemeToggle.svelte`, `Tabs.svelte`, `Sidebar.svelte`,
`ComponentsSidebar.svelte`, `AssetDownload.svelte`, `Footer.svelte`, and the
audience tiles / link cards on `src/routes/+page.svelte` + shared card styles.

- Copy actions: on copy, swap icon to a check with a 150ms cross-fade and swap
  label to `copied`; revert after ~1.2s. (Inspect current implementation first
  — extend, don't rewrite.)
- ThemeToggle: rotate/cross-fade icon swap at `--dur-fast var(--easing-out)`.
- Cards/tiles (`.num-cell`, audience tiles, AssetDownload, link cards):
  `transition: border-color, box-shadow, background-color var(--dur-fast)`;
  hover = `--border-strong` + `--shadow-md`; add `.db-press` where clickable.
- Any `ArrowUpRight` icon inside a link: on link hover translate `2px, -2px`
  at `--dur-fast` (CSS only, scoped per component).
- Sidebar active item: hairline left indicator that slides between items
  (CSS `transition` on `transform` of a shared indicator, or per-item
  `::before` scale — pick simpler; must not jump on page load).
- Tabs: verify existing sliding pill uses `--dur-fast/--easing-out`; align.
- Add consistent `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px }`
  where missing on interactive chrome.

Commit per component group; message style `feat(chrome): …`.

### Task 7: Document the recipes

**Files:** Modify `src/routes/foundations/motion/+page.svelte` and
`src/routes/brand/motion/+page.svelte`; PLAN.md §6 Motion; CHANGELOG.md.

- Add the new named recipes (reveal-on-scroll, view transition, copy-confirm,
  hover lift, nav indicator) with durations/easings, using existing
  `MotionPreview` where a live demo is cheap.
- CHANGELOG: new `v1.1.0 (unreleased)` section listing the facelift.
- PLAN.md: update motion section + add row to phases table.

Commit: `docs(motion): document facelift recipes; changelog v1.1.0 draft`.

### Task 8: Verify + PR

- `pnpm install` (fresh worktree), `pnpm check` (0 errors), `pnpm lint`,
  `pnpm build`.
- `pnpm dev` + drive the site (playwright MCP tools if available, else curl
  the built pages) — verify: homepage animations run once and land on exact
  values; navigation crossfades; palette opens smoothly; copy confirm works;
  no layout shift from sticky header.
- Push branch, `gh pr create --base main` — body: summary, per-route review
  list, "how to test manually" section. **Do not merge.**
