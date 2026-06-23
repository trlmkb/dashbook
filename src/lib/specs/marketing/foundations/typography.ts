import type { MarketingTypographyFoundation } from './types.js';

/**
 * Marketing typography — two families, four roles, one canonical copy unit.
 *
 * Mirrors the product type system's families (PP Supply Mono + Bai Jamjuree)
 * but documents the *marketing* expression: ultralight uppercase display,
 * heavily-tracked mono eyebrows, the eyebrow→heading→body copy unit, and the
 * faux-bold gotcha that bites every re-implementation.
 */
export const marketingTypographyFoundation: MarketingTypographyFoundation = {
	families: {
		display: {
			name: 'PP Supply Mono',
			stack: "'PP Supply Mono', 'JetBrains Mono', ui-monospace, monospace",
			license: 'Commercial (Pangram Pangram) — paywalled. JetBrains Mono (OFL) is the fallback.',
			usage: 'Display headings + eyebrows + data values. Weights 200 (display) and 400 (labels/data) only.',
		},
		mono: {
			name: 'PP Supply Mono',
			stack: "'PP Supply Mono', 'JetBrains Mono', ui-monospace, monospace",
			license: 'Commercial (Pangram Pangram). Same face as display — mono and display are one family here.',
			usage: 'Eyebrows, labels, tabular data values.',
		},
		sans: {
			name: 'Bai Jamjuree',
			stack: "'Bai Jamjuree', ui-sans-serif, system-ui, sans-serif",
			license: 'SIL OFL — free to self-host or load from Google Fonts.',
			usage: 'Body copy and UI text.',
		},
	},

	roles: [
		{
			name: 'display',
			family: 'display',
			weight: '200',
			size: 'clamp(2.5rem, 6vw, 4.5rem)',
			lineHeight: '~1.0',
			letterSpacing: '-0.03em',
			textTransform: 'uppercase',
			usage: 'Section + hero headings. Ultralight, uppercase, tight tracking. The trailing phrase often sits in an accent span.',
			sample: 'BUILT FOR GROWTH',
		},
		{
			name: 'eyebrow',
			family: 'mono',
			weight: '600',
			size: '10–12px',
			letterSpacing: '0.16–0.2em',
			textTransform: 'uppercase',
			usage: 'The label above a heading (see the SectionEyebrow pattern). Heavily tracked mono caps.',
			sample: 'SHIPPING',
		},
		{
			name: 'body',
			family: 'sans',
			weight: '500',
			size: '14–17px',
			lineHeight: '1.55–1.65',
			usage: 'Paragraphs, lists, UI copy.',
			sample: 'One claim per section. Specifics over hedges.',
		},
		{
			name: 'data',
			family: 'mono',
			weight: '400',
			size: '12–14px',
			usage: 'Numeric values, money, references. Always `font-variant-numeric: tabular-nums` when aligned in a column.',
			sample: '$1,240.00',
		},
	],

	copyUnit: [
		'The canonical section intro is a three-part unit, reusable on every section: eyebrow → display heading → body paragraph.',
		'1. Eyebrow — mono caps, tracked 0.16–0.2em, 10–12px, `--m-fg-subtle`.',
		'2. Display heading — PP Supply Mono 200, uppercase, with the trailing phrase wrapped in an accent span (`color: var(--m-accent)`).',
		'3. Body — Bai Jamjuree 15–17px, `--m-fg-muted`, max ~60ch.',
		'See the SectionEyebrow / section-intro pattern for the DOM.',
	],

	gotchas: [
		'PP Supply Mono ships only weights 200 & 400. Asking for 600/700 triggers synthetic faux-bold. Set `font-synthesis: none` globally and never exceed weight 400 on mono/display.',
		'Use `font-variant-numeric: tabular-nums` on any column of aligned numbers so digits don\'t jitter.',
		'The mono face is paywalled — unlicensed surfaces must fall back to JetBrains Mono (OFL). Keep the fallback in every stack.',
	],

	rules: [
		'Display weight is 200 — uppercase, tracking -0.02em, line-height ~1.0.',
		'Eyebrows are mono caps, tracked 0.16–0.2em — never sans.',
		'Body is Bai Jamjuree, 14–17px, line-height 1.55–1.65.',
		'Voice: sentence case in body, no exclamation marks, no emoji, numerals not spelled out. Pull the full rules via `marketing_get_brand_voice`.',
	],
};
