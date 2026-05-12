/**
 * Search index for the ⌘K palette. Aggregates every page worth surfacing
 * — primary nav, 60 components, 6 patterns, foundations + brand subpages —
 * into one flat array with a stable shape.
 *
 * Build-time data only. Static so the palette renders instantly.
 */

import { primaryNav } from './nav';
import { components } from './components';
import { patterns } from './patterns';

export type SearchSection =
	| 'Page'
	| 'Brand'
	| 'Foundation'
	| 'Component'
	| 'Pattern'
	| 'Developer';

export type SearchEntry = {
	title: string;
	href: string;
	section: SearchSection;
	description?: string;
	keywords?: string;
};

const navPages: SearchEntry[] = [];
const navBrand: SearchEntry[] = [];
const navFoundations: SearchEntry[] = [];
const navDev: SearchEntry[] = [];

for (const item of primaryNav) {
	if (item.href === '/components' || item.href === '/patterns') continue;
	const parentEntry: SearchEntry = {
		title: item.title,
		href: item.href,
		section: 'Page',
		description: item.description
	};
	navPages.push(parentEntry);

	if (!item.children) continue;
	for (const child of item.children) {
		const entry: SearchEntry = {
			title: child.title,
			href: child.href,
			section:
				item.href === '/brand'
					? 'Brand'
					: item.href === '/foundations'
						? 'Foundation'
						: item.href === '/developers'
							? 'Developer'
							: 'Page',
			description: item.description
		};
		if (item.href === '/brand') navBrand.push(entry);
		else if (item.href === '/foundations') navFoundations.push(entry);
		else if (item.href === '/developers') navDev.push(entry);
		else navPages.push(entry);
	}
}

const componentEntries: SearchEntry[] = components.map((c) => ({
	title: c.name,
	href: `/components/${c.slug}`,
	section: 'Component',
	description: c.description,
	keywords: `${c.category} ${c.slug} ${c.importPath}`
}));

const patternEntries: SearchEntry[] = patterns.map((p) => ({
	title: p.name,
	href: `/patterns/${p.slug}`,
	section: 'Pattern',
	description: p.description,
	keywords: `${p.category} ${p.slug} ${p.uses.join(' ')}`
}));

export const searchEntries: SearchEntry[] = [
	...navPages,
	...navBrand,
	...navFoundations,
	...navDev,
	...componentEntries,
	...patternEntries
];

/**
 * Simple substring + position scoring. Higher score = better match.
 * Title hits dominate, then description, then keywords.
 */
export function scoreEntry(entry: SearchEntry, query: string): number {
	if (!query) return 0;
	const q = query.toLowerCase();
	const title = entry.title.toLowerCase();
	const desc = (entry.description ?? '').toLowerCase();
	const keys = (entry.keywords ?? '').toLowerCase();

	let score = 0;
	if (title === q) score += 200;
	else if (title.startsWith(q)) score += 120;
	else if (title.includes(q)) score += 70;

	if (desc.includes(q)) score += 25;
	if (keys.includes(q)) score += 15;

	// Per-word bonus — every space-separated word in the query that hits the title
	const words = q.split(/\s+/).filter(Boolean);
	if (words.length > 1) {
		const titleHits = words.filter((w) => title.includes(w)).length;
		score += titleHits * 10;
	}

	return score;
}

export const sectionOrder: SearchSection[] = [
	'Page',
	'Brand',
	'Foundation',
	'Component',
	'Pattern',
	'Developer'
];
