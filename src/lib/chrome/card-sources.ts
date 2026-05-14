/**
 * SVG source generators for the four Mastercard MDES card art slots.
 *
 * Each function returns a standalone SVG string sized at the MC-required
 * pixel dimensions, ready to upload to the MC MDES portal — same pattern
 * as `logo-sources.ts`.
 *
 * MDES requires four separate uploads per BIN:
 *
 * | Slot                  | Dimensions   | Format            |
 * | --------------------- | ------------ | ----------------- |
 * | Card Background       | 1536 × 969   | SVG (≤1MB) or PNG |
 * | App Icon              | 100 × 100    | PNG               |
 * | Cobrand Logo          | 1372 × 283   | SVG (≤1MB) or PNG |
 * | Issuer Logo           | 1372 × 283   | SVG (≤1MB) or PNG |
 *
 * Plus three colour fields configured separately in MC's UI:
 *
 * - Card Background:  #2C3FB2 (default)
 * - PAN:              #FFFFFF
 * - Card Description: #EBEDE4
 *
 * PAN, MC mark, hologram, EMV chip, NFC indicator are rendered by Mastercard
 * — never in our uploaded assets.
 *
 * See `.knowledge/credit-card-art.md` for the full design notes.
 */

import { wordmarkSvg } from './logo-sources';

/** Canvas dimensions per MDES slot. */
export const CARD_DIMENSIONS = {
	background: { width: 1536, height: 969 },
	appIcon: { width: 100, height: 100 },
	cobrandLogo: { width: 1372, height: 283 },
	issuerLogo: { width: 1372, height: 283 }
} as const;

/** Slot name → required dimensions. */
export type CardSlot = keyof typeof CARD_DIMENSIONS;

/**
 * Card variant config. Each variant captures the brand decisions for one
 * card design — drives generation of all four MDES slots.
 *
 * The configurator at /brand/card lets brand pick any of the listed variants
 * (or compose a custom one via URL params). MCP tool `marketing_list_card_variants`
 * exposes this list to agents.
 */
export type CardVariant = {
	id: string;
	label: string;
	description: string;
	status: 'production' | 'draft';
	usedForBins: string[];
	/** Solid base colour for the card background. */
	bg: string;
	/** Highlight gradient stops + position. */
	gradient: {
		from: string;
		to: string;
		cx: string; // CSS percentage e.g. '30%'
		cy: string;
		r: string;
		opacity: number;
	} | null;
	/** Foreground wordmark colour (cobrand slot fill + on-card preview overlay). */
	wordmarkFg: string;
	/** App icon — rounded-square fill + glyph fill. */
	appIcon: {
		bg: string;
		glyph: string;
		/** Corner radius as a percentage of the icon edge — typically 0.18–0.24. */
		radius: number;
	};
};

/**
 * The reference variant — re-creates the existing card design that's
 * currently submitted to MC. Cobalt-deep #2C3FB2 with a radial highlight,
 * white dash.fi wordmark, white-on-cobalt app icon.
 *
 * Adding a new variant: append to `cardVariants` below and ensure the id
 * is kebab-case (it shows up in URLs and MCP tool args). No other code
 * needs to change — generators are variant-agnostic.
 */
export const cardVariants: CardVariant[] = [
	{
		id: 'cobalt-current',
		label: 'Cobalt (current)',
		description:
			"The card design currently submitted to Mastercard. Cobalt-deep base with a radial highlight, white dash.fi wordmark, white-on-cobalt app icon. Use as the fallback while new variants are in MDES review.",
		status: 'production',
		usedForBins: [],
		bg: '#2C3FB2',
		gradient: {
			from: '#5868D8',
			to: 'transparent',
			cx: '30%',
			cy: '35%',
			r: '70%',
			opacity: 0.55
		},
		wordmarkFg: '#FFFFFF',
		appIcon: {
			bg: '#2C3FB2',
			glyph: '#FFFFFF',
			radius: 0.2
		}
	}
];

/** Resolve a variant by id; falls back to the first variant if missing. */
export function getCardVariant(id: string): CardVariant {
	return cardVariants.find((v) => v.id === id) ?? cardVariants[0];
}

/** Pretty-printed slot dimensions for human-facing labels. */
export function slotDimensionsLabel(slot: CardSlot): string {
	const d = CARD_DIMENSIONS[slot];
	return `${d.width} × ${d.height}`;
}

// ── SVG generators per MDES slot ────────────────────────────────────────

/**
 * Card Background — 1536×969. Solid base + optional radial highlight.
 * No corner radius (MC clips the rendered card frame for us).
 */
export function cardBackgroundSvg(variant: CardVariant): string {
	const { width, height } = CARD_DIMENSIONS.background;
	const gradient = variant.gradient
		? `<defs><radialGradient id="hl" cx="${variant.gradient.cx}" cy="${variant.gradient.cy}" r="${variant.gradient.r}"><stop offset="0%" stop-color="${variant.gradient.from}" stop-opacity="${variant.gradient.opacity}"/><stop offset="100%" stop-color="${variant.gradient.to}" stop-opacity="0"/></radialGradient></defs><rect width="${width}" height="${height}" fill="url(#hl)"/>`
		: '';
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Dash.fi card background"><rect width="${width}" height="${height}" fill="${variant.bg}"/>${gradient}</svg>`;
}

/**
 * App Icon — 100×100. Rounded-square base with the Dash.fi "d" glyph
 * centred. Uses PP Supply Mono Ultralight visual approximated via paths
 * inline so the SVG renders without font dependencies on MC's servers.
 */
export function cardAppIconSvg(variant: CardVariant): string {
	const { width, height } = CARD_DIMENSIONS.appIcon;
	const radius = Math.round(width * variant.appIcon.radius);
	// PP Supply Mono Ultralight "d" glyph — simplified shape that renders
	// cleanly at 100×100. Path designed in a 100-unit viewBox; centred and
	// proportioned to match the existing app icon preview in mdes-3.
	const dGlyph = `<path d="M 56 22 L 56 47 L 50 43 C 46 41 41 41 37 43 C 31 45 27 50 27 57 L 27 70 C 27 76 30 81 36 84 C 40 86 46 86 50 84 L 56 81 L 56 84 L 64 84 L 64 22 Z M 56 56 L 56 71 C 56 73 55 75 53 76 L 47 79 C 44 80 41 79 39 77 C 37 75 36 73 36 70 L 36 57 C 36 53 38 51 41 50 C 43 49 46 50 48 51 L 56 56 Z" fill="${variant.appIcon.glyph}"/>`;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Dash.fi app icon"><rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="${variant.appIcon.bg}"/>${dGlyph}</svg>`;
}

/**
 * Cobrand Logo — 1372×283. The Dash.fi wordmark sized to fit the MC
 * cobrand slot. Wordmark paths come from `logo-sources.ts` so colourway
 * stays in sync with /brand/logo.
 */
export function cardCobrandLogoSvg(variant: CardVariant): string {
	const { width, height } = CARD_DIMENSIONS.cobrandLogo;
	// Wordmark native viewBox is 0 0 426 90 (aspect 4.73:1).
	// Cobrand slot is 1372:283 = 4.85:1 — nearly identical, so we centre
	// the wordmark with minimal whitespace.
	const scale = Math.min(width / 426, height / 90) * 0.92; // 8% margin
	const scaledW = 426 * scale;
	const scaledH = 90 * scale;
	const tx = (width - scaledW) / 2;
	const ty = (height - scaledH) / 2;
	const wordmark = wordmarkSvg(variant.wordmarkFg, null, null, null);
	// Embed the inner wordmark by stripping its outer <svg> wrapper and
	// re-wrapping in a transform group.
	const inner = wordmark.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Dash.fi cobrand logo"><g transform="translate(${tx} ${ty}) scale(${scale})">${inner}</g></svg>`;
}

/**
 * Issuer Logo — 1372×283 fully-transparent SVG. MDES requires this slot
 * to be populated; an empty asset satisfies the upload form without
 * placing a visible issuer mark on the card (Dash.fi designs bake the
 * issuer indication into the background instead).
 */
export function cardIssuerLogoSvg(): string {
	const { width, height } = CARD_DIMENSIONS.issuerLogo;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Issuer logo placeholder (intentionally transparent)"/>`;
}

// ── Composite preview (for /brand/card live preview only) ────────────────

/**
 * Composite preview — what the rendered card LOOKS like in Apple Pay /
 * Google Pay once MC overlays the PAN + their own marks.
 *
 * Not uploaded anywhere — just the live preview. Renders the background,
 * overlays a wordmark approximation top-left, a placeholder PAN bottom-
 * left, and an MC logo bottom-right.
 *
 * This intentionally MIMICS MC's render so designers can see the final
 * card before submitting. Don't ship this composite as an MDES upload.
 */
export function cardPreviewSvg(variant: CardVariant): string {
	const { width, height } = CARD_DIMENSIONS.background;
	const bg = cardBackgroundSvg(variant);
	// Strip outer svg wrappers from the inner inserts.
	const bgInner = bg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');

	// Wordmark — top-left, ~22% width.
	const wmW = width * 0.22;
	const wmH = wmW * (90 / 426);
	const wmX = width * 0.05;
	const wmY = height * 0.08;
	const wordmark = wordmarkSvg(variant.wordmarkFg, null, null, null);
	const wmInner = wordmark.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
	const wmGroup = `<g transform="translate(${wmX} ${wmY}) scale(${wmW / 426})">${wmInner}</g>`;

	// PAN — placeholder •••• 1234 — bottom-left.
	const panY = height * 0.84;
	const panX = width * 0.05;
	const panFontSize = height * 0.07;
	const pan = `<text x="${panX}" y="${panY}" font-family="ui-monospace, 'PP Supply Mono', SFMono-Regular, Menlo, monospace" font-size="${panFontSize}" font-weight="400" fill="#FFFFFF" letter-spacing="0.05em">•••• 1234</text>`;

	// Mastercard logo — bottom-right. Two overlapping circles (red + amber).
	const mcSize = height * 0.18;
	const mcCx = width - width * 0.08;
	const mcCy = height - mcSize * 0.7;
	const mcOverlap = mcSize * 0.35;
	const mc = `<g><circle cx="${mcCx - mcSize / 2 + mcOverlap / 2}" cy="${mcCy}" r="${mcSize / 2}" fill="#EB001B"/><circle cx="${mcCx + mcSize / 2 - mcOverlap / 2}" cy="${mcCy}" r="${mcSize / 2}" fill="#F79E1B" opacity="0.85"/></g>`;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Dash.fi card preview">${bgInner}${wmGroup}${pan}${mc}</svg>`;
}

/** Resolve a slot id to its SVG string for a given variant. */
export function cardSlotSvg(variant: CardVariant, slot: CardSlot): string {
	switch (slot) {
		case 'background':
			return cardBackgroundSvg(variant);
		case 'appIcon':
			return cardAppIconSvg(variant);
		case 'cobrandLogo':
			return cardCobrandLogoSvg(variant);
		case 'issuerLogo':
			return cardIssuerLogoSvg();
	}
}
