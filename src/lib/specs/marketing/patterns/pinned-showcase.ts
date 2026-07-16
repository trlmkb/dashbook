import type { MarketingPatternSpec } from './types.js';

/**
 * PinnedShowcase — the scroll-pinned product showcase.
 *
 * A sticky product visual stays in view (`position: sticky`) while a column of
 * copy / steps scrolls past it. As each step enters, an IntersectionObserver
 * marks it active and the visual updates to match — a guided walkthrough where
 * one visual narrates several steps without leaving the viewport.
 */
export const pinnedShowcase: MarketingPatternSpec = {
	slug: 'pinned-showcase',
	name: 'PinnedShowcase',
	category: 'Media & proof',
	status: 'stable',
	description:
		'A scroll-pinned showcase: a sticky product visual stays in view (`position: sticky`) while a column of copy or steps scrolls past it. An IntersectionObserver marks the active step as it enters, and the active step drives what the pinned visual shows.',

	source: 'src/components/rhythm/PinnedShowcase.astro',
	sourceNote:
		'Prop signatures pulled from the brief; verify against the website source. No live usage on dash.fi as of 2026-07 — kept as a documented pattern for a future feature deep-dive page.',
	sourceRevision: 'a5be701',
	lastVerifiedAt: '2026-07-16',
	verificationStatus: 'stale',

	whenToUse:
		'When one product visual should narrate several steps — a feature deep-dive or "how it works" where you want the screen to stay put while the explanation scrolls past it and the visual changes to match the active step. Use StepTimeline for a plain sequential list with no pinned visual, and the scale-to-fit product shot for a single static visual.',

	recipe: [
		'Lay out a two-column grid on a native element: one column for the steps, one for the visual. Keep tracks `minmax(0, 1fr)` so a fixed-width product shot cannot blow the row out.',
		'Make the visual column sticky: `position: sticky; top: <header height + gap>` on the visual so it pins within the section while the steps column scrolls.',
		'Stack the steps as a tall column of copy blocks (eyebrow / heading / body), each at least a viewport-ish tall so one is centred at a time.',
		'Wire an IntersectionObserver on the step blocks (rootMargin tuned so a step counts as active near the centre); on intersect, set an active index and toggle the matching visual state (swap layers, move a highlight, advance the shot).',
		'Cross-fade the visual between states rather than hard-cutting; keep only the active layer visible and the rest inert.',
		'Collapse to a single column on mobile: drop `position: sticky`, place each visual state inline above or below its step, and disable the observer-driven swapping.',
	],

	dom: `<div class="pinned">                 <!-- native: 2-col grid, minmax(0,1fr) -->
  <ol class="steps">
    <li class="step" data-step="0">…copy…</li>
    <li class="step" data-step="1">…copy…</li>
    <li class="step" data-step="2">…copy…</li>
  </ol>
  <div class="visual">                    <!-- position: sticky; top: <header> -->
    <div class="layer" data-active>…state 0…</div>
    <div class="layer">…state 1…</div>
    <div class="layer">…state 2…</div>
  </div>
</div>`,

	tokensUsed: [
		{ part: 'visual surface', role: '--m-card', notes: 'The sticky visual sits on the card surface with a 1px --m-border and the lift shadow.' },
		{ part: 'active step copy', role: '--m-fg-strong', notes: 'Heading of the step in view.' },
		{ part: 'inactive step copy', role: '--m-fg-muted', notes: 'Steps not currently active dim to muted.' },
		{ part: 'step marker / rule', role: '--m-accent', notes: 'Active step marker or progress rule in the accent.' },
		{ part: 'visual border', role: '--m-border', notes: 'Hairline around the pinned visual.' },
	],

	dimensions: [
		{ name: 'Columns', value: '1 → 2', notes: 'Single column on mobile; two columns from the section breakpoint, tracks `minmax(0,1fr)`.' },
		{ name: 'Sticky top', value: 'header height + gap', notes: '`top:` offset so the pinned visual clears the sticky header.' },
		{ name: 'Step height', value: '≈ one viewport', notes: 'Tall enough that one step is centred at a time.' },
		{ name: 'Lift shadow', value: '0 26px 56px -38px rgba(15, 20, 18, 0.42)', notes: 'Faint card lift on the pinned visual.' },
	],

	props: [
		{ name: 'steps', type: '{ title: string; body: string }[]', required: true, description: 'The scrolling copy blocks; index maps to a visual state.' },
		{ name: 'visuals', type: 'Snippet[] | string[]', description: 'One visual state per step — swapped as the active step changes. Signature pulled from the brief; verify against the website source.' },
		{ name: 'stickyTop', type: 'string', default: "'var(--header-h)'", description: 'Top offset for the sticky visual so it clears the header.' },
	],

	nonFeatures: [
		'Not scroll-jacking — it uses native `position: sticky`; it never hijacks the scroll position, traps the wheel, or animates the page on the user\'s behalf.',
		'Not a carousel — steps advance only with the reader\'s own scroll, never on a timer; there are no next/prev controls.',
		'No pin on mobile — the sticky behaviour and the observer-driven swapping are dropped on narrow viewports; states render inline with their step.',
	],

	gotchas: [
		'`position: sticky` only pins within its scrolling ancestor — an `overflow: hidden` (or `clip`) on any ancestor silently kills the stick and the visual just scrolls away. Keep the column\'s ancestors free of clipping overflow.',
		'Put the grid / sticky / overflow classes on the NATIVE column elements, not a child component\'s root — Astro scoped styles do not reach a child root, so the rule silently no-ops to `display: block` (see the astro-scoped-styles pattern). Keep tracks `minmax(0,1fr)` so a fixed-width visual cannot overflow.',
	],

	motion: [
		'The visual pins via native `position: sticky` while the steps column scrolls — layout, not an animation; nothing moves on a timer.',
		'An IntersectionObserver watches the step blocks (rootMargin tuned so a step is "active" near the viewport centre) and sets the active index; the matching visual layer cross-fades in, the rest go inert.',
		'Reduced motion (`prefers-reduced-motion: reduce`): drop the cross-fade for an instant swap (or show all states stacked), never animate the visual, and keep the sticky pin — the pin is positioning, not motion.',
		'On mobile the observer-driven swapping and the pin are disabled; each visual state renders inline with its step so the content is complete without scroll choreography.',
	],

	accessibility: [
		'Order the steps semantically (an `<ol>`); the pinned visual is a synchronised illustration of the step in view and carries a text alternative (or is `aria-hidden` when the step copy fully describes it).',
		'Active state must not be conveyed by colour alone — pair the accent marker with a weight / opacity change on the active step, and ensure every step\'s content is reachable by scrolling regardless of the visual.',
	],

	example: `<div class="pinned">
  <ol class="steps">
    <li class="step" data-step="0"><h3>Connect</h3><p>Link your carrier accounts.</p></li>
    <li class="step" data-step="1"><h3>Audit</h3><p>Every invoice is checked automatically.</p></li>
    <li class="step" data-step="2"><h3>Recover</h3><p>Claims are filed and tracked to each credit.</p></li>
  </ol>
  <div class="visual">
    <div class="layer" data-active>…state 0…</div>
    <div class="layer">…state 1…</div>
    <div class="layer">…state 2…</div>
  </div>
</div>

<style>
  .pinned { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 64px; }
  .steps { list-style: none; margin: 0; padding: 0; }
  .step { min-height: 80vh; display: grid; align-content: center; }
  .step h3 { color: var(--m-fg-strong); margin: 0 0 8px; }
  .step:not([data-active]) { color: var(--m-fg-muted); }
  .visual { position: sticky; top: calc(var(--header-h) + 24px); align-self: start;
    background: var(--m-card); border: 1px solid var(--m-border);
    box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42); }
  .layer { opacity: 0; transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1); }
  .layer[data-active] { opacity: 1; }
  @media (max-width: 880px) {
    .pinned { grid-template-columns: minmax(0, 1fr); }
    .visual { position: static; }
    .step { min-height: 0; }
  }
  @media (prefers-reduced-motion: reduce) { .layer { transition: none; } }
</style>

<script>
  const root = document.querySelector('.pinned');
  const steps = root.querySelectorAll('.step');
  const layers = root.querySelectorAll('.layer');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const i = Number(e.target.dataset.step);
      steps.forEach((s, n) => s.toggleAttribute('data-active', n === i));
      layers.forEach((l, n) => l.toggleAttribute('data-active', n === i));
    }
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => io.observe(s));
</script>`,
	exampleLang: 'html',

	porting: [
		'A native two-column grid (`minmax(0,1fr)` tracks): a tall steps column scrolls while the visual column is `position: sticky` under the header; an IntersectionObserver on the steps sets the active index and cross-fades the matching visual layer.',
		'Keep ancestors free of clipping overflow or the stick dies; collapse to one column on mobile (drop sticky + observer); honour reduced motion by swapping instantly and never animating the visual.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
