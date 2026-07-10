export type Release = {
	ver: string;
	date: string;
	summary: string;
	href: string;
};

// THE single place a new version is declared. Drives the homepage hero
// pill, the homepage "Recent" band, and the Footer version badge. The
// full release notes live as hardcoded prose on
// src/routes/changelog/+page.svelte (see the release checklist comment at
// the top of that file) — when cutting a release, add the entry here
// FIRST, then write the changelog <li> with a matching version/date/id.
export const releases: Release[] = [
	{
		ver: 'v1.0.0',
		date: '2026-05-18',
		summary:
			'First declared-stable release — 60 components, 17 patterns, MCP v0.3.0, Claude Code plugin, static JSON + asset API, card art configurator.',
		href: '/changelog#v1-0-0'
	},
	{
		ver: 'v0.9.0',
		date: '2026-05-11',
		summary:
			'Press Partner kit · ⌘K full-content search · changelog filters · PreviewCanvas Auto mode · Vercel deploy prep.',
		href: '/changelog#v0-9-0'
	},
	{
		ver: 'v0.8.0',
		date: '2026-05-11',
		summary:
			'Foundations completed (4 new subpages) · Developers rewritten for the Nx monorepo · lib-wide orange shift · Figma handoff doc.',
		href: '/changelog#v0-8-0'
	}
];

export const latestRelease = releases[0];
