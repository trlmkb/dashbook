/**
 * SVG source generators for the four Mastercard MDES card art slots.
 *
 * Each function returns a standalone SVG string sized at the MC-required
 * pixel dimensions, ready to upload to the MC MDES portal — same pattern
 * as `logo-sources.ts`.
 *
 * MDES requires four separate uploads per BIN:
 *
 * | Slot                  | Dimensions   | Format                                           |
 * | --------------------- | ------------ | ------------------------------------------------ |
 * | Card Background       | 1536 × 969   | PNG (RGB) or PDF vector; SVG accepted in portal  |
 * | App Icon              | 100 × 100    | PNG only — PDF not supported for the icon slot   |
 * | Cobrand Logo          | 1372 × 283   | PNG (RGB + alpha) or PDF vector                  |
 * | Issuer Logo           | 1372 × 283   | PNG (RGB + alpha) or PDF vector                  |
 *
 * Plus three colour fields configured separately in MC's UI:
 *
 * - Card Background:  #2C3FB2 (default)
 * - PAN:              #FFFFFF
 * - Card Description: #EBEDE4
 *
 * ────────────────────────────────────────────────────────────────────────
 * RULES — what MUST NOT appear in any uploaded asset:
 * ────────────────────────────────────────────────────────────────────────
 *
 *   ❌ PAN (card number)                — MC overlays at composite time
 *   ❌ Cardholder name                  — MC overlays at composite time
 *   ❌ Expiration date                  — MC overlays at composite time
 *   ❌ CVC / CVV                        — not shown on digital cards period
 *   ❌ EMV chip artwork                 — wallet renders its own
 *   ❌ NFC / contactless symbol         — MC overlays
 *   ❌ Mastercard brand mark (circles)  — MC supplies the brand logo (459×283)
 *   ❌ Rounded corners on the source    — wallets round at composite time
 *
 * The brand mark composites at (995, 629) in the 1536×969 canvas. Keep
 * critical content (wordmark, brand color highlights) out of the bottom-
 * right 459×283 region or it gets covered. See CARD_LAYOUT.
 *
 * See `.knowledge/credit-card-art.md` for design notes and
 * `.knowledge/mdes-asset-spec.md` for the verified spec audit.
 */

import { wordmarkSvg } from './logo-sources';

/** Canvas dimensions per MDES upload slot. */
export const CARD_DIMENSIONS = {
	background: { width: 1536, height: 969 },
	appIcon: { width: 100, height: 100 },
	cobrandLogo: { width: 1372, height: 283 },
	issuerLogo: { width: 1372, height: 283 }
} as const;

/**
 * MDES composite-image layout — where Mastercard places each logo on the
 * 1536×969 background at render time. Values come directly from MC's docs
 * at https://developer.mastercard.com/mdes-digital-enablement/documentation/
 * use-cases/mdes-for-merchants-use-cases/#creating-a-combined-image-from-components
 *
 * Dimensions (per the MC spec diagram, captured at
 * `.knowledge/cardart-source/mdes-layout-diagram.png`):
 *
 *   A — side padding             82 px
 *   B — top/bottom padding       57 px
 *   C — cobrand+issuer width    1372 px (= canvas - 2A)
 *   D — logo-area height         283 px
 *   E — brand-logo width         459 px
 *
 * Layout within the 1536×969 canvas:
 *
 *   ┌────────────────────────────────────────────────────────┐  ← 0,0
 *   │ ↕B=57                                                  │
 *   │ ┌──────────────────────────────────────────────────┐   │  ← 82,57
 *   │ │↔A│ Co-brand Logo │           │ Issuer Logo │↔A│   │
 *   │ │  │←──── C = 1372 (split: cobrand LEFT, issuer RIGHT)│
 *   │ │D ↕                                                 │
 *   │ └──────────────────────────────────────────────────┘   │  ← 82,57+283=340
 *   │                                                        │
 *   │  middle area — background visible, optional PAN/text   │
 *   │                                                        │
 *   │                       ┌─────────────────┐              │  ← 995,629
 *   │                       │↔A│ Brand Logo │↔A│            │
 *   │                       │  │←─ E = 459 ─→│  │            │
 *   │                       │D ↕                            │
 *   │                       └─────────────────┘              │  ← 1454,912
 *   │ ↕B=57                                                  │
 *   └────────────────────────────────────────────────────────┘  ← 1536,969
 *
 * Brand logo (the MC circles mark) is SUPPLIED BY MASTERCARD — we don't
 * upload it. The slot is documented here so the live preview can mock
 * its placement and our background designs reserve a safe zone for it.
 */
export const CARD_LAYOUT = {
	canvas: { width: 1536, height: 969 }, // = CARD_DIMENSIONS.background; 63% ratio
	sidePadding: 82, // A
	topBottomPadding: 57, // B
	logoArea: { width: 1372, height: 283 }, // C × D — cobrand + issuer band
	brandLogo: { width: 459, height: 283 }, // E × D — MC's own mark
	/**
	 * Pre-computed positions within the canvas, top-left origin.
	 * Use these to position assets in the live composite preview.
	 */
	positions: {
		cobrandIssuerBand: { x: 82, y: 57 }, // top strip, full C wide
		brandLogo: { x: 1536 - 82 - 459, y: 969 - 57 - 283 } // = (995, 629), bottom-right
	},
	/** Usable area between the padded edges. */
	safeZone: { x: 82, y: 57, width: 1372, height: 855 }
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
		id: 'jade',
		label: 'Jade',
		description:
			"The Dash.fi card — facelift design language. Jade-deep base (#123B39) with a subtle jade highlight, cream wordmark, jade app icon with cream glyph. Single source of truth for every BIN — Mastercard composites the brand mark + PAN at render time.",
		status: 'production',
		usedForBins: [],
		bg: '#123B39',
		gradient: {
			// Subtle jade highlight — facelift restraint, not the old radial glow.
			from: '#2B605C',
			to: 'transparent',
			cx: '25%',
			cy: '30%',
			r: '85%',
			opacity: 0.22
		},
		wordmarkFg: '#EBEDE4',
		appIcon: {
			bg: '#2B605C',
			glyph: '#EBEDE4',
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
 * Cobrand Logo — 1372×283. The Dash.fi wordmark sized + positioned to
 * match how cobrand logos actually appear on composited digital cards.
 *
 * **Sizing — why we don't fill the slot.** The 1372×283 slot is the
 * MDES upload canvas, not the intended rendered size. Per the MDES
 * layout diagram, when both cobrand AND issuer are present they share
 * this band (cobrand-left, issuer-right) — so each is content-sized to
 * roughly half. Even when shipping cobrand-only (our case — issuer is a
 * 1×1 transparent placeholder), the wordmark should remain proportional
 * to a real wallet-card cobrand (~22% of card width, ~7% of card
 * height) so it doesn't dominate the composite.
 *
 * **Positioning.** Left-aligned within the slot per the MDES layout
 * diagram (cobrand goes LEFT, issuer goes RIGHT in the same band).
 * The slot itself sits at canvas offset (82, 57), so the slot's x=0
 * lines up with the card's A=82 side padding — that natural margin
 * is the visual left-edge, no extra internal padding needed.
 *
 * Wordmark paths come from `logo-sources.ts` so colourway stays in sync
 * with /brand/logo.
 */
export function cardCobrandLogoSvg(variant: CardVariant): string {
	const { width, height } = CARD_DIMENSIONS.cobrandLogo;
	// Wordmark native viewBox is 0 0 426 90 (aspect 4.73:1).
	// Target ~72 px tall → ~340 px wide. ~22% of card width. Matches the
	// proportions of cobrand logos on real Apple Pay / Google Pay renders.
	const targetH = 72;
	const scale = targetH / 90;
	const scaledH = 90 * scale;
	// Left-aligned: tx=0 puts the wordmark flush with the slot's left edge.
	// The slot sits at canvas x=82, so the wordmark lines up with the card's
	// A=82 side padding — that's the natural margin.
	const tx = 0;
	const ty = (height - scaledH) / 2;
	const wordmark = wordmarkSvg(variant.wordmarkFg, null, null, null);
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
 * Google Pay once MC overlays the brand mark at composite time.
 *
 * Not uploaded anywhere — just the live preview. Honours the exact MDES
 * layout from `CARD_LAYOUT`: cobrand-logo at the top-left of the
 * top strip, optional issuer-logo top-right, optional PAN last-4 + product
 * text in the middle, and the MC brand mark at bottom-right (459×283).
 *
 * `safeZone: true` overlays translucent rectangles showing the padding and
 * brand-mark zone so brand designers can validate a new background design
 * doesn't crash into any of MC's overlay regions.
 */
export function cardPreviewSvg(
	variant: CardVariant,
	options: { safeZone?: boolean } = {}
): string {
	const { width, height } = CARD_LAYOUT.canvas;
	const { sidePadding, topBottomPadding, logoArea, brandLogo, positions } = CARD_LAYOUT;
	const bg = cardBackgroundSvg(variant);
	const bgInner = bg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');

	// ── Cobrand logo (our dash.fi wordmark) — sized to fit the top strip ─
	// In the canonical MDES composite, cobrand sits at the LEFT of the
	// 1372×283 top band. Our slot's full content fills 1372 wide, so when
	// we ship cobrand-only (no issuer mark — issuer slot is a 1×1 transparent
	// placeholder) the wordmark gets the full strip. Mirror that here.
	const cobrand = cardCobrandLogoSvg(variant);
	const cobrandInner = cobrand.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
	const cobrandGroup = `<g transform="translate(${positions.cobrandIssuerBand.x} ${positions.cobrandIssuerBand.y})">${cobrandInner}</g>`;

	// ── Brand mark (Mastercard's two-circle mark) — 459×283 bottom-right ─
	// Sized to fit the E×D region. Two overlapping circles, scaled so the
	// pair fits within the 459×283 box.
	const bmW = brandLogo.width;
	const bmH = brandLogo.height;
	const bmX = positions.brandLogo.x;
	const bmY = positions.brandLogo.y;
	// Two circles sized to bmH and overlapped by 35% of diameter — matches
	// the proportions of MC's actual mark within an E×D bounding box.
	const r = bmH / 2;
	const overlap = bmH * 0.35;
	const totalWidth = r * 2 + (r * 2 - overlap); // = 2r * 1.65
	// Center the pair horizontally + vertically within the E×D box.
	const cy = bmY + bmH / 2;
	const startX = bmX + (bmW - totalWidth) / 2;
	const cxRed = startX + r;
	const cxAmber = startX + r * 2 + (r * 2 - overlap) - r;
	const brandMark = `<g aria-hidden="true">
		<circle cx="${cxRed}" cy="${cy}" r="${r}" fill="#EB001B"/>
		<circle cx="${cxAmber}" cy="${cy}" r="${r}" fill="#F79E1B" opacity="0.85"/>
	</g>`;

	// ── Optional safe-zone overlay (dev/QA aid) ──────────────────────────
	let overlay = '';
	if (options.safeZone) {
		// Hatch fill (semi-transparent) over each MC-overlay region. Helps
		// designers see where critical content gets covered at composite time.
		const stroke = '#EBFF00'; // yellow, high-contrast against any bg
		const fill = 'rgba(235, 255, 0, 0.18)';
		overlay = `<g aria-hidden="true">
			<!-- Cobrand + issuer top strip -->
			<rect x="${positions.cobrandIssuerBand.x}" y="${positions.cobrandIssuerBand.y}" width="${logoArea.width}" height="${logoArea.height}" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-dasharray="12 8"/>
			<!-- Brand mark slot bottom-right -->
			<rect x="${bmX}" y="${bmY}" width="${bmW}" height="${bmH}" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-dasharray="12 8"/>
			<!-- Outer padding boundary (safe zone) -->
			<rect x="${sidePadding}" y="${topBottomPadding}" width="${width - sidePadding * 2}" height="${height - topBottomPadding * 2}" fill="none" stroke="${stroke}" stroke-width="2" stroke-dasharray="4 6" opacity="0.6"/>
		</g>`;
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Dash.fi card preview (composite mock)">${bgInner}${cobrandGroup}${brandMark}${overlay}</svg>`;
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
