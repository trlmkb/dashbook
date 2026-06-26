import type { MarketingSectionFoundation } from './types.js';

/**
 * Marketing section rhythm — the alternating-surface cadence.
 *
 * Marketing pages read as a sequence of full-width bands. The rhythm rule keeps
 * adjacent bands from blurring together and uses a dark band for emphasis.
 */
export const marketingSectionFoundation: MarketingSectionFoundation = {
	bands: [
		{
			name: 'paper',
			surface: '--m-surface (#FAF9F5)',
			fg: '--m-fg-strong / --m-fg-muted',
			usage: 'The default band — warm paper. Most sections.',
		},
		{
			name: 'cream',
			surface: '--m-cream (#EBEDE4)',
			fg: '--m-fg-strong / --m-fg-muted',
			usage: 'The alternate light band. Use between two paper sections to break the cadence.',
		},
		{
			name: 'ink',
			surface: '--m-near-black (#25261D) or the dark variant via [data-marketing-dark]',
			fg: '--m-fg-strong (paper) on dark',
			usage: 'The emphasis band — a dark interruption between light sections. Pricing, big quote, hero closer.',
		},
		{
			name: 'cobalt',
			surface: '--m-cobalt (#354CEF)',
			fg: 'cream / white',
			usage: 'Demoted, barely used. Jade is the brand colour — cobalt is a rare legacy data-accent, reached for almost never. At most one small moment per page, never two adjacent. When in doubt, use the ink band instead.',
		},
	],

	rhythmRules: [
		'Alternate paper ↔ cream across consecutive light sections — never two identical backgrounds adjacent.',
		'Drop an ink (dark) band between light sections for emphasis; it resets the eye and spotlights one idea.',
		'The band variant (paper · cream · ink) sets the surface; the dark variant flips `--m-*` roles via `[data-marketing-dark]`.',
		'Jade is the brand colour — it carries the accent across every light band. Cobalt is demoted and barely used; if you reach for it at all, it is one small moment per page, never adjacent to another saturated band.',
		'Keep vertical rhythm consistent: bands share a section padding scale; only the background changes.',
	],
};
