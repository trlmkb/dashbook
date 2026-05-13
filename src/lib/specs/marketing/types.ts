/**
 * Marketing-spec shapes.
 *
 * Single source of truth for:
 * - Docs pages — `src/routes/brand/voice/+page.svelte`, `src/routes/press/+page.svelte`
 *   can render from these.
 * - MCP server (@dashfi/mcp-server) — return structured data to agents asking
 *   for brand voice, partner co-branding rules, or per-partner kits.
 *
 * Marketing specs describe non-product surfaces (press, partner kits, announcement
 * channels) and the voice that ties everything together. Authoring rules mirror
 * the component / foundation specs:
 *
 * 1. Every value visible on the docs page traces to a field here.
 * 2. Rules and rationale ship with the data — consumers shouldn't have to guess
 *    why a value exists.
 * 3. No `any` types. Optional fields are explicit.
 */

// ── Voice ────────────────────────────────────────────────────────────

/** A named voice principle — short title + prose body. */
export type VoicePrinciple = {
	/** Short label — `Direct`, `Confident`, etc. */
	title: string;
	/** Prose body explaining the principle. */
	body: string;
};

/** A row of the tone matrix — context → dial chips → example line. */
export type TonalContext = {
	/** Surface or situation — `Routine action`, `Money moved`, `Marketing — celebratory`. */
	context: string;
	/** Tone dial chips — three short adjectives that describe how to flex. */
	dial: string[];
	/** Canonical example copy. */
	example: string;
};

/** A copywriting rule with do / don't and optional exception. */
export type CopyRule = {
	/** Short rule name — `sentenceCase`, `exclamations`, `emoji`, `numerals`. */
	id: string;
	/** Plain-text rule — what to do. */
	do: string;
	/** Plain-text counter — what to avoid. */
	dont: string;
	/** Optional carve-out where the rule does not apply. */
	exception?: string;
};

/** A before/after example pair scoped to a context. */
export type VoiceExamplePair = {
	/** Surface — `Empty state — Dashboard`, `Error state`, etc. */
	context: string;
	/** Off-brand version. */
	before: string;
	/** On-brand rewrite. */
	after: string;
};

/** A single good / bad example anchored to a surface. */
export type VoiceExample = {
	/** Where the line would appear. */
	context: string;
	/** The copy itself. */
	text: string;
	/** For bad examples — why it's off-brand. */
	why?: string;
};

/** Surface-specific guidance — product UI vs marketing email vs press release. */
export type SurfaceGuidance = {
	/** Surface name — `product UI`, `marketing email`, `partner co-branding`, `press release`. */
	surface: string;
	/** Rules that apply on this surface. */
	rules: string[];
};

/** Top-level brand-voice spec. */
export type BrandVoiceSpec = {
	/** Headline takeaway — the one-liner. */
	summary: string;
	/** Core principles (Direct / Confident / Warm / No theater). */
	principles: VoicePrinciple[];
	/** Tone matrix — rows of context × dial × example. */
	tonalRange: TonalContext[];
	/** Copywriting rules with do / don't / exception. */
	rules: CopyRule[];
	/** Curated good / bad examples for quick reference. */
	examples: {
		good: VoiceExample[];
		bad: VoiceExample[];
	};
	/** Before / after rewrites by context. */
	beforeAfter: VoiceExamplePair[];
	/** Surface-specific guidance. */
	contextualGuidance: SurfaceGuidance[];
};

// ── Partners ─────────────────────────────────────────────────────────

/** Powered-by-Dash badge variant — colorway + intended surface. */
export type BadgeVariantSpec = {
	id: string;
	label: string;
	/** Background swatch hex. */
	bg: string;
	/** Foreground swatch hex (badge ink). */
	fg: string;
	/** Where to use it. */
	note: string;
};

/** Customer lockup example — placeholder customer for demonstration. */
export type CustomerLockupSpec = {
	name: string;
	industry: string;
	note: string;
};

/** Partner category — payments / banking / processing / customer / etc. */
export type PartnerCategory =
	| 'issuing-bank'
	| 'payment-processor'
	| 'cross-border'
	| 'network'
	| 'customer-example';

/** One partner entry — issuing bank, processor, or customer-co-brand. */
export type PartnerKit = {
	/** URL-friendly slug — `transpecos`, `patriot-bank`, `vgsi`, etc. */
	slug: string;
	/** Display name as it appears in disclosures. */
	displayName: string;
	/** What kind of relationship this is. */
	category: PartnerCategory;
	/** Whether this partner uses the Powered-by-Dash badge (or its inverse). */
	poweredByBadge: boolean;
	/** Co-branding rules specific to this partner. Empty when general rules apply. */
	coBrandingRules: string[];
	/** Partner-specific legal disclosure, if any. */
	legalDisclosure?: string;
	/** Optional asset URLs — typically deferred to the partner team to provide. */
	assetUrls?: {
		lockup?: string;
		logo?: string;
	};
	/** Optional regulator or licensing reference — FDIC, NMLS, FCA, etc. */
	regulator?: string;
};

/** Top-level partner-kit spec. */
export type PartnerKitsSpec = {
	/** General co-branding rules and disclosures that apply across all partners. */
	general: {
		rules: string[];
		legalDisclosures: string[];
		/** Powered-by-Dash badge colorway variants. */
		badgeVariants: BadgeVariantSpec[];
		/** Co-branding do/don'ts (verbatim from /press). */
		coBrandRules: Array<{ kind: 'do' | 'dont'; text: string }>;
		/** Placeholder customer lockup examples. */
		customerLockups: CustomerLockupSpec[];
	};
	/** Real partner relationships — verified against /press disclosures. */
	partners: PartnerKit[];
	/** Free-text caveats — what is not in this spec yet. */
	notes: string[];
};
