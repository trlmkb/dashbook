/**
 * Spacing foundation spec — single source of truth for the Dashbook spacing system.
 *
 * Mirrors what the docs page renders at
 * `src/routes/foundations/spacing/+page.svelte`.
 *
 * Consumed by:
 * - MCP `product_get_foundation({ name: 'spacing' })` — returns structured
 *   data so agents can reproduce the spacing rhythm without scraping the docs.
 * - (Future) the docs page itself, once foundation pages adopt the same
 *   spec-driven rendering pattern as component pages.
 */

import type { SpacingFoundation } from './types.js';

export const spacingFoundation: SpacingFoundation = {
	baseUnit: '4px',

	scale: [
		{
			token: 'space-1',
			tw: 'p-1',
			value: '4px',
			rem: '0.25rem',
			usage: 'Tight inline gaps, icon-to-label.'
		},
		{
			token: 'space-2',
			tw: 'p-2',
			value: '8px',
			rem: '0.5rem',
			usage: 'Button gap, chip padding.'
		},
		{
			token: 'space-3',
			tw: 'p-3',
			value: '12px',
			rem: '0.75rem',
			usage: 'Card-internal gaps, table cells.'
		},
		{
			token: 'space-4',
			tw: 'p-4',
			value: '16px',
			rem: '1rem',
			usage: 'Default block gap, form rows.'
		},
		{
			token: 'space-6',
			tw: 'p-6',
			value: '24px',
			rem: '1.5rem',
			usage: 'Section gap — workhorse for layout.'
		},
		{
			token: 'space-8',
			tw: 'p-8',
			value: '32px',
			rem: '2rem',
			usage: 'Page padding (tablet), section padding.'
		},
		{
			token: 'space-10',
			tw: 'p-10',
			value: '40px',
			rem: '2.5rem',
			usage: 'Wide page chrome.'
		},
		{
			token: 'space-12',
			tw: 'p-12',
			value: '48px',
			rem: '3rem',
			usage: 'Page padding (desktop), block separation.'
		},
		{
			token: 'space-16',
			tw: 'p-16',
			value: '64px',
			rem: '4rem',
			usage: 'Hero pad, section breaks.'
		},
		{
			token: 'space-20',
			tw: 'p-20',
			value: '80px',
			rem: '5rem',
			usage: 'Large hero, page-end breathing room.'
		}
	],

	pagePadding: [
		{ breakpoint: 'Mobile', value: '24px', token: '--space-6' },
		{ breakpoint: 'Tablet', value: '32px', token: '--space-8' },
		{ breakpoint: 'Desktop', value: '48px', token: '--space-12' }
	],

	formFieldRhythm: [
		{
			name: 'Label → Input',
			value: '6px',
			notes: 'Tight, so the label visually binds to its field.'
		},
		{
			name: 'Input → Helper text',
			value: '6px',
			notes: 'Same tight rhythm — helper belongs to the field.'
		},
		{
			name: 'Field → Field',
			value: '16px',
			token: '--space-4',
			notes: 'Default vertical gap between adjacent form rows.'
		},
		{
			name: 'Field group → Field group',
			value: '24px',
			token: '--space-6',
			notes: 'When fields are grouped under a sub-heading.'
		}
	],

	sectionRhythm: [
		{
			name: 'Inside a Section',
			value: '16px',
			token: '--space-4',
			notes: 'Default gap between rows inside one section.'
		},
		{
			name: 'Between related groups',
			value: '32px',
			token: '--space-8',
			notes: 'Two groups that belong to the same conceptual section.'
		},
		{
			name: 'Between sections',
			value: '64px',
			token: '--space-16',
			notes: 'Top-level vertical rhythm between Section blocks on a page.'
		}
	],

	rules: [
		'4px base unit. Pairs cleanly with Tailwind\'s default scale.',
		'Always use `gap-*` between siblings (flex or grid). Never `margin-bottom` on a child to space the next sibling — margins compound, gaps don\'t.',
		'Section gap is 24px (`gap-6`). Page padding is 24/32/48 for mobile/tablet/desktop. Maximum content width is 1800px.',
		'Sidebar is 256px expanded, 56px collapsed. Always at left. The Dashbook portal itself uses a 220px secondary sidebar pattern for sub-section navigation.',
		'Hairline borders live in spacing, not in margin. Use `border-top` + `padding-top: 1.5rem` instead of `margin-top` to create separation.',
		'If you\'re reaching for a value that isn\'t on the scale, you\'re probably wrong.'
	]
};
