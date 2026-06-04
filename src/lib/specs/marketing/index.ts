/**
 * Marketing-spec entry point.
 *
 * Aggregates brand voice + partner kit specs and exposes resolver helpers used
 * by the MCP tools (`marketing_get_brand_voice`, `marketing_get_partner_kit`,
 * `marketing_search`).
 */

import { brandVoice } from './voice.js';
import { partnerKits } from './partners.js';
import type { BrandVoiceSpec, PartnerKit, PartnerKitsSpec } from './types.js';

export { brandVoice } from './voice.js';
export { partnerKits } from './partners.js';
export type * from './types.js';

// ── Component & pattern library (marketing_*) ────────────────────────
// The marketing counterpart to the product component/foundation specs.
export {
	marketingPatternSpecs,
	allMarketingPatterns,
	getMarketingPattern,
	marketingPatternsByCategory,
	marketingPatternCategoryOrder,
	marketingPatternCount,
} from './patterns/index.js';
export type {
	MarketingPatternSpec,
	MarketingPatternCategory,
	MarketingTokenUse,
} from './patterns/index.js';

export {
	marketingFoundations,
	marketingFoundationMeta,
	marketingFoundationNames,
	getMarketingFoundation,
	marketingTokensFoundation,
	marketingTypographyFoundation,
	marketingLayoutFoundation,
	marketingSectionFoundation,
	marketingMotionFoundation,
} from './foundations/index.js';
export type {
	MarketingFoundationName,
	MarketingTokensFoundation,
	MarketingTypographyFoundation,
	MarketingLayoutFoundation,
	MarketingSectionFoundation,
	MarketingMotionFoundation,
} from './foundations/index.js';

/** Return the full brand-voice spec. */
export function getVoice(): BrandVoiceSpec {
	return brandVoice;
}

/**
 * Resolve a partner kit.
 *
 * - With no argument, returns the full spec (general rules + every partner).
 * - With a slug, returns just that partner — or `null` if the slug is unknown.
 */
export function getPartnerKit(): PartnerKitsSpec;
export function getPartnerKit(slug: string): PartnerKit | null;
export function getPartnerKit(slug?: string): PartnerKitsSpec | PartnerKit | null {
	if (!slug) return partnerKits;
	const partner = partnerKits.partners.find((p) => p.slug === slug);
	return partner ?? null;
}

/** Slugs of every partner currently in the spec — for listings and discovery. */
export function listPartnerSlugs(): string[] {
	return partnerKits.partners.map((p) => p.slug);
}
