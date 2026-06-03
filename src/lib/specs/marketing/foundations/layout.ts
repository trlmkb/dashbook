import type { MarketingLayoutFoundation } from './types.js';

/**
 * Marketing layout — the page-agnostic structural patterns.
 *
 * Container, full-bleed-to-edge, alternating copy↔media rows, and the mobile
 * blow-out fix. These are recipes, not components: any marketing page composes
 * sections out of them.
 */
export const marketingLayoutFoundation: MarketingLayoutFoundation = {
	contentMax: '1240px (--content-max)',
	gutters: { sm: '24px', md: '40px', lg: '80px' },

	patterns: [
		{
			name: 'Container',
			summary: 'Center content at the max-width; ramp the inline padding across breakpoints.',
			recipe:
				'max-width: var(--content-max); margin-inline: auto; padding-inline: clamp(var(--gutter-sm), 5vw, var(--gutter-md));',
			notes: 'The default wrapper for any centered section.',
		},
		{
			name: 'Full-bleed to edge',
			summary:
				'The section background spans the viewport while its content stays aligned to the centered container — content padded on one side, bled to the viewport edge on the other.',
			recipe:
				'Content-side padding: max(var(--gutter-md), calc((100vw - var(--content-max)) / 2 + var(--gutter-lg))); bleed side: var(--gutter-lg). Mirror the two to bleed the other way.',
			notes: 'Used for media that should kiss the viewport edge while copy stays on the grid.',
		},
		{
			name: 'Alternating copy ↔ media rows',
			summary:
				'Full-width 2-col grid; media bleeds to its edge, copy insets to the content margin; the side alternates row to row.',
			recipe:
				'Full-width grid; alternate sides via `:nth-child(odd)` + `order`. The media\'s edge inset equals the column gap, for balance.',
			notes: 'The workhorse for product-page feature sections.',
		},
		{
			name: 'Mobile blow-out fix',
			summary:
				'Single-column mobile grids must use `grid-template-columns: minmax(0, 1fr)`.',
			recipe: 'grid-template-columns: minmax(0, 1fr);',
			notes:
				'Otherwise a fixed-width child (a 1180px product shot, a min-width table) sizes the column to its own content and overflows the page. Same fix: horizontal-scroll tables need the scroll wrapper on a NATIVE element (see the scoped-style gotcha).',
		},
	],

	mobileRule:
		'Any single-column grid that can contain a fixed-width or min-width child gets `minmax(0, 1fr)` columns. This is the single most common marketing-page layout bug.',

	scopedStyleGotcha:
		'The highest-value layout gotcha is Astro scoped styles not reaching a child component\'s root element — put structural classes (grid / order / overflow / gap) on a NATIVE element. See the `astro-scoped-styles` pattern.',
};
