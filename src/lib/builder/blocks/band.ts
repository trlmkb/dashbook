/**
 * Shared section-band helpers. Marketing pages alternate background bands
 * (paper / cream / ink) for rhythm — every block exposes a `background` prop
 * so the composer can build that cadence. Ink bands flip the `--m-*` token set
 * via `data-marketing-dark` so foreground colors stay legible.
 */

export const BAND_OPTIONS = ['surface', 'cream', 'ink'] as const;
export type Band = (typeof BAND_OPTIONS)[number];

export function bandBg(bg: string): string {
	switch (bg) {
		case 'cream':
			return 'var(--m-cream)';
		case 'ink':
			return 'var(--m-near-black)';
		default:
			return 'var(--m-surface)';
	}
}

export const isDarkBand = (bg: string): boolean => bg === 'ink';
