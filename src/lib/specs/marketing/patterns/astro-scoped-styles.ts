import type { MarketingPatternSpec } from './types.js';

/**
 * Astro scoped styles vs child components — the critical gotcha.
 *
 * The brief flags this as the highest-value, least-obvious thing to document.
 * Astro scoped `<style>` does NOT reach the root element of a child component,
 * so a structural rule on `<Reveal class="row">` silently no-ops and the layout
 * collapses to `display: block` with no error.
 */
export const astroScopedStyles: MarketingPatternSpec = {
	slug: 'astro-scoped-styles',
	name: 'Astro scoped styles + child components',
	category: 'Gotchas',
	status: 'stable',
	description:
		'Astro scoped `<style>` does not reach the root element of a child component. Structural rules (grid / order / overflow / gap / display) put on a child component class silently no-op — the layout breaks with no error. Put them on a native element instead.',

	source: 'Cross-cutting authoring rule — applies to every marketing layout component.',

	whenToUse:
		'Read this before building any marketing layout that mixes scoped CSS with imported components (rows, grids, alternating layouts, scroll wrappers). It is the most common silent layout failure on the site.',

	recipe: [
		'Symptom: you put a structural class on a child component — `<Reveal class="row">` — and the scoped rule for `.row` (grid / order / overflow / gap / display) silently does nothing. It renders `display: block` and the layout breaks with no console error.',
		'Cause: Astro scoping rewrites selectors with a hash that is applied to the elements THIS component renders — not to the root element a child component renders.',
		'Fix A (preferred): put the structural class on a NATIVE element; wrap the child component INSIDE it.',
		'Fix B: hoist the rule to a global stylesheet (or `<style is:global>`) so it reaches the child root.',
		'Corollary: use `:global(...)` to reach into a child island\'s internals when you must style them from the parent.',
		'Carry this warning into every dashbook marketing layout component.',
	],

	dom: `<!-- Fix A: structural class on a NATIVE element; child wrapped inside -->
<div class="row">                 <!-- native: scoped .row { display:grid } applies -->
  <div class="copy"><Reveal>…</Reveal></div>
  <div class="media"><Reveal>…</Reveal></div>
</div>

<!-- BROKEN: scoped .row never reaches Reveal's root -->
<Reveal class="row">…</Reveal>`,

	tokensUsed: [{ part: 'n/a', role: '—', notes: 'This is a structural/authoring gotcha, not a styled element.' }],

	nonFeatures: [
		'Not an Astro bug — it is documented scoping behaviour. Don\'t "fix" it by disabling scoping globally.',
		'Not solved by `!important` — the selector simply never matches the child root.',
	],

	gotchas: [
		'It fails SILENTLY — no error, no warning. The only signal is a layout that renders as stacked blocks.',
		'`overflow` on a scroll wrapper has the same trap: put the scroll wrapper on a native element, or a min-width table will overflow the page (ties into the mobile blow-out rule in the Layout foundation).',
		'`gap`, `order`, `display`, `grid-template-columns` are the usual victims because they\'re the structural properties you reach for on a row/grid.',
	],

	accessibility: [
		'A collapsed layout can reorder content visually vs. DOM order — verify the reading order still matches intent after applying Fix A.',
	],

	example: `<!-- ✅ Fix A -->
<div class="row">
  <div class="copy"><Reveal>…</Reveal></div>
  <div class="media"><Reveal><img … /></Reveal></div>
</div>

<style>
  .row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 40px; }
  .row:nth-child(odd) .media { order: -1; }
</style>

<!-- ❌ Broken: scoped .row never reaches <Reveal>'s root element -->
<Reveal class="row">…</Reveal>`,
	exampleLang: 'astro',

	porting: [
		'Any framework with component-scoped CSS (Astro, Svelte, Vue SFC) has a version of this — scoped selectors apply to the component\'s own markup, not a child component\'s root.',
		'Default to structural classes on native elements; reach for the framework\'s "global" / deep selector only when you must.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook — the brief\'s flagged highest-value gotcha.' }],
};
