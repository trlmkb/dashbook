import type { MarketingPatternSpec } from './types.js';

/**
 * PlatformShowcase — the copy-plus-visual platform section.
 *
 * A richer platform block: a copy unit (eyebrow + display heading + lede + a few
 * PlatformBullets) on one side, a product visual / tile cluster on the other.
 * Two-column and alternating-row friendly. Promoted from the rhythm/ library.
 */
export const platformShowcase: MarketingPatternSpec = {
	slug: 'platform-showcase',
	name: 'PlatformShowcase',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A richer platform section pairing a copy unit (eyebrow + heading + lede + a few PlatformBullets) on one side with a product visual or tile cluster on the other. Two-column and alternating-row friendly.',

	source: 'src/components/rhythm/PlatformShowcase.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify against the website source.',

	whenToUse:
		'When a platform capability deserves a full row of its own — a copy unit alongside a product visual. Stack several down a page with the side alternating to build the copy-media rhythm. Use a plain PlatformBullets block instead when there is no paired visual.',

	recipe: [
		'Lay out a full-width two-column grid on a native element: `grid-template-columns: repeat(2, minmax(0, 1fr))` with a column gap.',
		'Copy side: the canonical copy unit — eyebrow (mono, uppercase) → display heading (`var(--font-display)`, weight 200, uppercase) → lede in `--m-fg-muted` → a PlatformBullets list.',
		'Media side: a product visual (scale-to-fit ProductImage) or a UtilityTiles / tile cluster.',
		'Alternate the sides down the page with `:nth-child(even)` reordering the columns (set `order` / `direction`) for the copy-media rhythm.',
		'Collapse to a single column on mobile (copy first), keeping the grid tracks `minmax(0, 1fr)` so the fixed-width visual cannot blow out the row.',
	],

	dom: `<div class="showcase">           <!-- native: scoped grid applies -->
  <div class="copy">
    <p class="eyebrow">Platform</p>
    <h2 class="display">One ledger for <span class="accent">every spend</span></h2>
    <p class="lede">…</p>
    <ul class="platform-bullets">…</ul>
  </div>
  <div class="media"><!-- ProductImage / UtilityTiles --></div>
</div>`,

	tokensUsed: [
		{ part: 'eyebrow', role: '--m-fg-subtle', notes: 'Mono, uppercase label.' },
		{ part: 'heading', role: '--m-fg-strong', notes: 'Display heading; trailing phrase in --m-accent.' },
		{ part: 'lede + bullets', role: '--m-fg-muted', notes: 'Body copy; PlatformBullets checks stay --m-positive.' },
		{ part: 'media surface', role: '--m-card', notes: 'Product visual / tile cluster sits on the card surface with a 1px --m-border.' },
	],

	dimensions: [
		{ name: 'Columns', value: '1 → 2', notes: 'Single column on mobile; `repeat(2, minmax(0,1fr))` from the section breakpoint.' },
		{ name: 'Column gap', value: '40 → 80px', notes: 'Ramps with the gutter scale; the media edge inset matches the gap.' },
		{ name: 'Alternation', value: ':nth-child(even)', notes: 'Reorders the two columns to alternate copy/media down the page.' },
	],

	variants: [
		{ name: 'media-right', description: 'Default — copy left, visual right.' },
		{ name: 'media-left', description: 'Reversed row for the alternating rhythm; copy right, visual left.' },
	],

	props: [
		{ name: 'eyebrow', type: 'string', description: 'Mono uppercase label above the heading.' },
		{ name: 'reverse', type: 'boolean', default: 'false', description: 'Flip the columns (media-left) for the alternating rhythm.' },
		{ name: 'bullets', type: 'string[]', description: 'Capability lines for the embedded PlatformBullets.' },
	],

	nonFeatures: [
		'Not a hero — it is a mid-page section row, not the page opener; no oversized lockup or primary CTA pair.',
		'Not a card grid — it is one copy-plus-visual row; stack instances for multiple capabilities rather than packing several into one.',
		'No carousel — the visual is static; if it is a product shot, it does not auto-advance.',
	],

	gotchas: [
		'Put the grid / order / overflow classes on the NATIVE row element, not on a child component\'s root — Astro scoped styles do not reach a child component\'s root, so the alternating-row rule silently no-ops and the layout renders `display: block` (see the astro-scoped-styles pattern).',
		'Keep the grid tracks `minmax(0, 1fr)`: a fixed-width product visual will otherwise size its column to its content and overflow the row on narrow viewports.',
	],

	accessibility: [
		'One section heading per showcase row for a clean screen-reader outline; the eyebrow is a label, not a heading.',
		'Decorative media is `aria-hidden` or carries a text alternative describing what the product visual shows; reorder columns visually only — keep copy first in the DOM.',
	],

	example: `---
import PlatformShowcase from '../components/rhythm/PlatformShowcase.astro';
---
<PlatformShowcase
  eyebrow="Platform"
  reverse={false}
  bullets={['Real-time carrier audit', 'Automatic refund recovery']}
>
  <h2 slot="heading">One ledger for <span class="accent">every spend</span></h2>
  <p slot="lede">Audit, reconcile, and recover across every carrier in one place.</p>
  <ProductImage slot="media" />
</PlatformShowcase>`,
	exampleLang: 'astro',

	porting: [
		'A native two-column grid (`repeat(2, minmax(0,1fr))`) with a copy unit one side and a product visual / tile cluster the other; reorder columns by `:nth-child(even)` or a `reverse` prop for the alternating rhythm.',
		'Keep structural classes on the native row, not a child root; keep tracks `minmax(0,1fr)`; the embedded PlatformBullets checks stay `--m-positive`.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
