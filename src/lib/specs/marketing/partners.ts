/**
 * Partner-kit spec — co-branding rules, Powered-by-Dash badge variants, and
 * the partner relationships that are publicly disclosed on `/press`.
 *
 * Used by:
 * - The press docs page (currently renders from `$lib/content/partners.ts` directly).
 * - The MCP `marketing_get_partner_kit` tool — returned in full or filtered to one
 *   partner slug so agents producing announcements, integration docs, or partner
 *   landing pages have the canonical co-branding rules and asset references.
 *
 * Authoring rules:
 * - Only list partners that are publicly disclosed on `/press`. Banking partners,
 *   processors, and networks are real; customer lockups are explicitly marked as
 *   placeholders.
 * - Do not invent partner relationships. If a partner is not on `/press`, it does
 *   not belong here — leave the list short and add a note in `notes` instead.
 */

import { badgeVariants, customerLockups, coBrandRules } from '../../content/partners.js';
import type {
	BadgeVariantSpec,
	CustomerLockupSpec,
	PartnerKit,
	PartnerKitsSpec
} from './types.js';

// ── Real partner relationships (verified against /press) ────────────────

const realPartners: PartnerKit[] = [
	{
		slug: 'transpecos-banks',
		displayName: 'TransPecos Banks, SSB',
		category: 'issuing-bank',
		poweredByBadge: false,
		coBrandingRules: [
			'Card-issuer attribution appears on the cardholder agreement and on any card-issuance surface.',
			'Use the `card-issuer` legal disclosure verbatim; substitute "TransPecos Banks, SSB" for the bracketed placeholder.',
			'Pair with the Mastercard network mark on physical card art.'
		],
		legalDisclosure:
			'The Dash.fi Card is issued by TransPecos Banks, SSB, pursuant to a license from Mastercard. Member FDIC.',
		regulator: 'FDIC (Member); Mastercard network'
	},
	{
		slug: 'patriot-bank',
		displayName: 'Patriot Bank, N.A.',
		category: 'issuing-bank',
		poweredByBadge: false,
		coBrandingRules: [
			'Issuer of the AdSpend & Rewards Mastercard programme.',
			'Use the `card-issuer` legal disclosure verbatim; substitute "Patriot Bank, N.A." for the bracketed placeholder.',
			'Pair with the Mastercard network mark on physical card art.'
		],
		legalDisclosure:
			'The AdSpend & Rewards Mastercard is issued by Patriot Bank, N.A., pursuant to a license from Mastercard. Member FDIC.',
		regulator: 'FDIC (Member); Mastercard network'
	},
	{
		slug: 'vgsi',
		displayName: 'Visa Global Services Inc.',
		category: 'payment-processor',
		poweredByBadge: false,
		coBrandingRules: [
			'Payment processing partner. Not a co-branded marketing surface — disclosure-only relationship.',
			'Cardholder support hotline (888) 733-0041 is operated by VGSI.'
		],
		legalDisclosure:
			'Payment processing is provided by Visa Global Services Inc. (VGSI, NMLS ID 181032).',
		regulator: 'NMLS ID 181032'
	},
	{
		slug: 'currencycloud',
		displayName: 'The Currency Cloud Limited',
		category: 'cross-border',
		poweredByBadge: false,
		coBrandingRules: [
			'Cross-border money movement partner. Not a co-branded marketing surface.',
			'Operates under UK FCA registration; pairs with CFSB for US-side cross-border activity.'
		],
		legalDisclosure:
			'Cross-border money movement is provided by The Currency Cloud Limited (UK FCA, FRN 900199) in partnership with CFSB in the United States.',
		regulator: 'UK FCA, FRN 900199; CFSB (US)'
	},
	{
		slug: 'mastercard',
		displayName: 'Mastercard',
		category: 'network',
		poweredByBadge: false,
		coBrandingRules: [
			'Card network mark appears on physical card art and on issuer-attribution disclosures.',
			'Follow Mastercard\'s brand-mark guidelines (vector only, minimum sizing, clearspace) when reproducing the network mark.',
			'Do not modify or recolor the Mastercard mark.'
		],
		regulator: 'Mastercard brand guidelines'
	}
];

// ── Adapt badge + lockup content into the spec shape ──────────────────────

const badgeVariantSpecs: BadgeVariantSpec[] = badgeVariants.map((v) => ({
	id: v.id,
	label: v.label,
	bg: v.bg,
	fg: v.fg,
	note: v.note
}));

const customerLockupSpecs: CustomerLockupSpec[] = customerLockups.map((c) => ({
	name: c.name,
	industry: c.industry,
	note: c.note
}));

// ── Top-level spec ────────────────────────────────────────────────────────

export const partnerKits: PartnerKitsSpec = {
	general: {
		rules: [
			'Powered-by-Dash badge is opt-in for partner surfaces — never required.',
			'Co-branded lockups use jade + partner brand color side-by-side, never overlayed.',
			'Customer logo first, hairline divider, "Powered by Dash" second. Equal optical weight between the two marks.',
			'Maintain 2 dots of clearspace around the badge. The dot in ".fi" is the unit.',
			'Always use the SVG version. Never re-trace, rasterize beyond approved PNG fallbacks, or recolor outside the three approved variants.',
			'Do not place the badge larger than the customer\'s own logo. Customers should know who you are first, who powers you second.',
			'Do not embed the badge in modified or derivative marks. Use it as-is or not at all.',
			'Co-branded surfaces must never imply Dash.fi has endorsed, vetted, or partnered with the customer beyond the actual business relationship.'
		],
		legalDisclosures: [
			'Default to `marketing_get_legal_disclosure({kind:"partner-bank"})` for fintech-context surfaces.',
			'Use `marketing_get_legal_disclosure({kind:"card-issuer"})` whenever the surface mentions or shows a physical card; substitute the issuing-bank name for the bracketed placeholder.',
			'Use `marketing_get_legal_disclosure({kind:"full-footer"})` for press releases and the legal footer of any owned-media announcement.',
			'Use `marketing_get_legal_disclosure({kind:"fdic"})` as the shortest acceptable disclosure when surface space is constrained.'
		],
		badgeVariants: badgeVariantSpecs,
		coBrandRules: coBrandRules.map((r) => ({ kind: r.kind, text: r.text })),
		customerLockups: customerLockupSpecs
	},
	partners: realPartners,
	notes: [
		'Customer lockups (Acme Vendor, Northwind Studio) are placeholders for demonstration. Real customer co-brand approvals require written permission and live in a separate, marketing-team-owned registry.',
		'Per-partner asset URLs (lockup SVG, partner logo bundle) are not yet authored. Partner Operations is the owner.',
		'Additional partners (e.g. exec bios, advisory relationships) are not exposed via this MCP surface — see `/press` directly for the public roster.'
	]
};
