export type PatternCategory = 'Data' | 'Forms' | 'Confirmation' | 'States' | 'Layout';

export type PatternEntry = {
	slug: string;
	name: string;
	description: string;
	category: PatternCategory;
	uses: string[];
};

export const patterns: PatternEntry[] = [
	{
		slug: 'transaction-list',
		name: 'Transaction list',
		description:
			'The canonical Dash.fi data screen — search, facet filters, paginated table. Drop-in for cards, statements, ad spend, vendors.',
		category: 'Data',
		uses: ['SearchFilter', 'SelectFilter', 'Table', 'Pagination', 'Pill', 'Badge']
	},
	{
		slug: 'metric-card',
		name: 'Metric card',
		description:
			'A single headline number with a delta. The atom of every dashboard hero, KYC overview, statement summary.',
		category: 'Data',
		uses: ['Card', 'Pill']
	},
	{
		slug: 'destructive-confirm',
		name: 'Destructive confirmation',
		description:
			'Two-step gate for irreversible actions — close card, revoke virtual, terminate user. AlertDialog with a single destructive primary.',
		category: 'Confirmation',
		uses: ['Button', 'AlertDialog']
	},
	{
		slug: 'empty-zero-state',
		name: 'Empty state',
		description:
			'What the surface looks like before there is data. Centered, opinionated, ends with a single primary CTA.',
		category: 'States',
		uses: ['Empty', 'Button']
	},
	{
		slug: 'settings-section',
		name: 'Settings section',
		description:
			'A grouped block of form controls inside a long settings page. Label · description · control · inline help.',
		category: 'Forms',
		uses: ['Label', 'Input', 'Switch', 'Separator', 'Button']
	},
	{
		slug: 'card-detail',
		name: 'Card detail',
		description:
			'Two-column issued-card summary. Status pill, limit progress, controls on the right. Pattern for any "thing" detail page.',
		category: 'Layout',
		uses: ['Card', 'Pill', 'Progress', 'Switch', 'Button', 'Separator']
	}
];

export const patternCategoryOrder: PatternCategory[] = [
	'Data',
	'Forms',
	'Confirmation',
	'States',
	'Layout'
];

export function patternsByCategory(): Map<PatternCategory, PatternEntry[]> {
	const map = new Map<PatternCategory, PatternEntry[]>();
	for (const c of patternCategoryOrder) map.set(c, []);
	for (const p of patterns) map.get(p.category)?.push(p);
	return map;
}
