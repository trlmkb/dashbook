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
			usage: 'The marketing data-accent band. Sparing — a single high-energy section, never two adjacent.',
		},
	],

	rhythmRules: [
		'Alternate paper ↔ cream across consecutive light sections — never two identical backgrounds adjacent.',
		'Drop an ink (dark) band between light sections for emphasis; it resets the eye and spotlights one idea.',
		'A SlideFrame `background` variant (paper · cream · ink · cobalt) sets the band; the dark variant flips `--m-*` roles via `[data-marketing-dark]`.',
		'Cobalt is high-energy — at most one cobalt band per page, never adjacent to another saturated band.',
		'Keep vertical rhythm consistent: bands share a section padding scale; only the background changes.',
	],
};
