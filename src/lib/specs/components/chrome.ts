/**
 * Chrome category — page-level surfaces that frame product UI.
 *
 * Each entry is a thin proxy or composed scaffold over the marketing namespace
 * + the page-template helpers. The existence of these symbols in the product
 * namespace is the load-bearing part: an LLM agent that introspects
 * `product_list_components` will discover that pages have chrome, that
 * chrome includes a wordmark, and that the wordmark is sourced from the
 * marketing namespace.
 *
 * These specs do NOT duplicate the marketing assets — they point at them.
 */

import type { ComponentSpec } from '../types.js';

// ── wordmark ──────────────────────────────────────────────────────────
export const wordmark: ComponentSpec = {
	slug: 'wordmark',
	name: 'Wordmark',
	category: 'Chrome',
	status: 'stable',
	importPath: '// Resolved via marketing_get_logo({ variant: "wordmark" })',
	description:
		'The Dash.fi wordmark — page-chrome use. Always sourced from marketing_get_logo. Never invented, reconstructed, or substituted with a placeholder glyph.',

	canonicalSource: 'src/lib/chrome/logo-sources.ts (wordmarkSvg generator)',

	dimensions: [
		{
			name: 'Natural viewBox',
			value: '426×90',
			notes: 'Aspect ratio 4.73:1. Scale via `size` (pixel width) on the MCP call.'
		},
		{
			name: 'Header default',
			value: '92px wide',
			notes: 'Page-shell header default. Matches the dashbook portal own chrome.'
		},
		{
			name: 'Auth-card default',
			value: '120px wide',
			notes: 'Auth-shell wordmark sits centered above the form card.'
		}
	],

	tokens: [
		{
			name: 'Foreground',
			notes:
				'Preset-driven. `jade` (default) → `#2B605C`; `ink` → `#25261D`; `white-on-ink` / `white-on-cobalt` for dark surfaces. Call `marketing_list_logo_presets({ variant: "wordmark" })` for the full list.'
		},
		{
			name: 'Accent dot',
			notes:
				'The dot between `dash` and `fi` is a separate path. Defaults to match foreground. Pass `accent` via the portal AssetConfigurator to override (e.g. yellow `#EBFF00`).'
		}
	],

	composition: [
		'Always call `marketing_get_logo({ variant: "wordmark", preset, size })` — never reconstruct.',
		'For page chrome on light surfaces, default `preset: "jade"`. For dark surfaces, `preset: "white-on-ink"`.',
		'Inline the returned `inlineSvg` directly into the markup, or hotlink the `url` field.',
		'For PNG-only consumers, pass `format: "png"` and decode the `pngBase64` field.'
	],

	nonFeatures: [
		'<strong>No invented placeholder.</strong> A "D in a jade square" / monogram / initial / AI-imagined glyph is never the wordmark. If the MCP is unavailable, render the literal word "Dash" in <code>var(--font-mono)</code> uppercase with letter-spacing 0.15em as an obviously-temporary fallback and tell the user.',
		'No size variant beyond the `size` parameter — viewBox is fixed.',
		'No "compact" vs "wide" toggle here; the lib has LogoSmall for that, but for chrome use cases you almost always want the full wordmark.'
	],

	props: [
		{
			name: 'variant',
			type: '"wordmark" | "app"',
			default: '"wordmark"',
			description: 'MCP parameter on `marketing_get_logo`. Use "wordmark" for page chrome.'
		},
		{
			name: 'preset',
			type: 'string',
			default: '"jade"',
			description:
				'Colorway preset. jade / jade-dark / ink / cream-on-jade / white-on-ink / white-on-cobalt / black / transparent.'
		},
		{
			name: 'size',
			type: 'number',
			description: 'Pixel width. Omit for natural 426×90.'
		},
		{
			name: 'format',
			type: '"svg" | "png"',
			default: '"svg"',
			description: 'Output format. PNG returns base64-encoded bytes.'
		}
	],

	porting: [
		'Call `marketing_get_logo` once and cache the SVG string at build time.',
		'For SSR / SSG, inline the SVG directly. For client-side, an <img src> pointing at the canonical /api/logo/wordmark/<preset> URL is fine.',
		'Never bundle a copy of the wordmark in your own repo as an asset — always reach for `marketing_get_logo` so the canonical source remains the brand portal.'
	],

	example: `// MCP call from any stack:
marketing_get_logo({
  variant: 'wordmark',
  preset: 'jade',
  size: 120,
  format: 'svg'
})
// → { inlineSvg: '<svg viewBox="0 0 426 90">…</svg>', url: 'https://…/api/logo/wordmark/jade?size=120' }

// In a Svelte component:
<svelte:html>{@html inlineSvg}</svelte:html>`,

	accessibility: [
		'Wrap the SVG in an element with <code>aria-label="Dash.fi"</code> when the wordmark is the page\'s primary brand identifier.',
		'Inside a link, the surrounding anchor carries the label (e.g. <code>aria-label="Home"</code>); the SVG itself becomes decorative.'
	],

	changelog: [
		{
			version: 'v0.2.0',
			date: '2026-05-14',
			note: 'Surfaced under the Chrome category as a product-namespace proxy over marketing_get_logo. Closes the gap that caused a consumer agent to invent an off-brand "D in a jade square" placeholder on a 2FA page.'
		}
	]
};

// ── page-shell ────────────────────────────────────────────────────────
export const pageShell: ComponentSpec = {
	slug: 'page-shell',
	name: 'Page shell',
	category: 'Chrome',
	status: 'stable',
	importPath: '// Resolved via product_get_page_template({ slug })',
	description:
		'Page-level chrome scaffold — centered card layout used by auth surfaces (sign-in, 2FA, magic link, password reset). 460px max-width, 24/32/48 vertical padding, wordmark header + legal footer slots.',

	canonicalSource: 'src/lib/mcp/tools/product.ts → product_get_page_template',

	dimensions: [
		{ name: 'Max width', value: '460px', notes: 'Auth-card max. Forms stay one column.' },
		{
			name: 'Vertical padding',
			value: '24px (mobile) / 32px (tablet) / 48px (desktop)',
			tw: 'py-6 sm:py-8 lg:py-12',
			notes: 'Outer page padding. Card has its own internal padding.'
		},
		{
			name: 'Horizontal padding',
			value: '24px (mobile) / 32px (tablet+)',
			tw: 'px-6 sm:px-8',
			notes: 'Outer page padding. Card sits inside.'
		},
		{
			name: 'Card padding',
			value: '32px',
			tw: 'p-8',
			notes: 'Internal card padding — auth pages.'
		},
		{
			name: 'Header gap to card',
			value: '32px',
			notes: 'Wordmark sits 32px above the card on auth surfaces.'
		},
		{
			name: 'Card to footer gap',
			value: '24px',
			notes: 'Legal disclosure sits 24px below the card.'
		}
	],

	tokens: [
		{
			name: 'Background',
			notes: 'Page bg — `--bg` (light: `#F7F7F0`, dark: `#0B0F0E`). Card sits on `--card`.'
		},
		{
			name: 'Card surface',
			notes:
				'`--card` (light: `#FFFFFF`, dark: `#141A19`). `--border` (light: `#E5E5DC`, dark: `#222827`) hairline border, `--radius-md` (6px) corners.'
		}
	],

	composition: [
		'Slot 1 (header): wordmark sourced from `marketing_get_logo`. Center-aligned. 120px wide on auth surfaces.',
		'Slot 2 (body): the form card. Single column, max-width 460px. Use product Inputs, Buttons, Labels.',
		'Slot 3 (footer): legal disclosure block + secondary nav (e.g. "Back to sign-in" link).',
		'Use `product_get_page_template({ slug })` to get the whole bundle pre-composed.'
	],

	nonFeatures: [
		'Not a multi-column dashboard shell — see the Sidebar / SidebarProvider patterns in `/patterns/protected-app-shell` for that.',
		'No top nav bar by default — auth pages are intentionally single-affordance.',
		'No background art / illustrations / hero photo — auth pages are restraint-first.'
	],

	props: [
		{
			name: 'slug',
			type: '"auth-2fa" | "auth-signin" | "auth-signup" | "auth-magic-link" | "auth-reset"',
			required: true,
			description: 'Page-template slug. Returns chrome + layout + copyTokens + requiredComponents.'
		}
	],

	porting: [
		'Call `product_get_page_template({ slug })` once to fetch the full scaffold.',
		'Render the wordmark from the returned `chrome.logo` payload — inline SVG or hotlink.',
		'Render the legal disclosure from `chrome.footer` (sourced from `marketing_get_legal_disclosure`).',
		'Apply the `layout` dimensions verbatim. Use `copyTokens` for the title and lede.',
		'Compose the form using the slugs in `requiredComponents`.'
	],

	example: `product_get_page_template({ slug: 'auth-2fa' })
// → {
//     chrome: {
//       logo: { inlineSvg: '<svg…>', url: '…' },
//       header: { wordmarkPreset: 'jade', wordmarkSize: 120 },
//       footer: { legal: 'Dash.fi is a financial technology company…' }
//     },
//     layout: { maxWidth: 460, padding: { y: [24, 32, 48], x: [24, 32, 32] } },
//     copyTokens: { title: 'Enter your verification code', lede: 'We sent a 6-digit code to…' },
//     requiredComponents: ['input', 'button', 'label']
//   }`,

	accessibility: [
		'Wordmark wrapper carries <code>aria-label="Dash.fi"</code>.',
		'Form card uses a single <code>&lt;main&gt;</code> landmark.',
		'Footer disclosure inside <code>&lt;footer role="contentinfo"&gt;</code>.'
	],

	changelog: [
		{
			version: 'v0.2.0',
			date: '2026-05-14',
			note: 'New. Composed scaffold that bundles wordmark + layout + legal-disclosure into one MCP call. Eliminates the five-lookups-to-build-a-login-page problem.'
		}
	]
};

// ── auth-footer ───────────────────────────────────────────────────────
export const authFooter: ComponentSpec = {
	slug: 'auth-footer',
	name: 'Auth footer',
	category: 'Chrome',
	status: 'stable',
	importPath: '// Resolved via marketing_get_legal_disclosure({ kind })',
	description:
		'Legal disclosure block paired with secondary routing — sits at the bottom of auth pages (sign-in, sign-up, 2FA, magic link, password reset). Sourced from marketing_get_legal_disclosure.',

	canonicalSource: 'src/lib/mcp/tools/marketing.ts → marketing_get_legal_disclosure',

	dimensions: [
		{ name: 'Top gap', value: '24px', notes: 'Distance from form card to footer.' },
		{ name: 'Max width', value: '460px', notes: 'Matches the form card.' },
		{ name: 'Line height', value: '1.4', notes: 'Caption type.' }
	],

	tokens: [
		{
			name: 'Text',
			notes: '`--fg-muted` (light: `#6E7878`, dark: `#8B9695`). Always muted — never primary.'
		}
	],

	composition: [
		'Legal text sourced from `marketing_get_legal_disclosure({ kind })`. Default `kind: "full-footer"` for auth pages.',
		'Optional secondary link row above the disclosure (e.g. "Already have an account? Sign in").',
		'Render in `.caption` typographic class — 12px / line-height 1.4 / Bai Jamjuree.'
	],

	nonFeatures: [
		'No copyright row — handled by the dashfi.com global footer, not the auth footer.',
		'No social links / nav menu — auth pages stay single-affordance.',
		'Disclosure text is never paraphrased or shortened. Use verbatim.'
	],

	props: [
		{
			name: 'kind',
			type: '"fdic" | "partner-bank" | "card-issuer" | "full-footer"',
			default: '"full-footer"',
			description: 'Which disclosure to render. Auth pages typically use "full-footer".'
		}
	],

	porting: [
		'Call `marketing_get_legal_disclosure({ kind })` once and embed the returned `text` verbatim.',
		'Replace bracketed placeholders (e.g. `[partner bank]`) with the partner-specific value at use time.',
		'Style as muted caption — `font-size: 12px`, `color: var(--fg-muted)`, `text-align: center`.'
	],

	example: `marketing_get_legal_disclosure({ kind: 'full-footer' })
// → { text: 'Dash.fi is a financial technology company, not a bank. Banking services provided by partner banks, members FDIC. The Dash.fi Card is issued by [partner bank], pursuant to a license from Visa U.S.A. Inc.' }`,

	accessibility: [
		'Footer is inside a <code>&lt;footer role="contentinfo"&gt;</code> landmark.',
		'Disclosure text is real prose (not an image) so screen readers read it out.'
	],

	changelog: [
		{
			version: 'v0.2.0',
			date: '2026-05-14',
			note: 'Surfaced under the Chrome category as a product-namespace proxy over marketing_get_legal_disclosure.'
		}
	]
};

// ── partner-cobrand ───────────────────────────────────────────────────
export const partnerCobrand: ComponentSpec = {
	slug: 'partner-cobrand',
	name: 'Partner co-brand block',
	category: 'Chrome',
	status: 'stable',
	importPath: '// Resolved via marketing_get_partner_kit({ partner })',
	description:
		'Partner co-branding block — wordmark + partner logo lockup with the canonical usage rules. Used on partner-co-branded auth pages, integration docs, joint landing pages.',

	canonicalSource: 'src/lib/mcp/tools/marketing.ts → marketing_get_partner_kit',

	dimensions: [
		{ name: 'Lockup gap', value: '16px', notes: 'Between Dash wordmark and partner logo.' },
		{ name: 'Wordmark height', value: '24px', notes: 'Standard partner-co-brand lockup height.' },
		{
			name: 'Divider',
			value: '1px × 16px',
			notes: 'Vertical hairline between the two marks. `--border` token.'
		}
	],

	tokens: [
		{
			name: 'Divider',
			notes: '`--border` — `#E5E5DC` light / `#222827` dark.'
		}
	],

	composition: [
		'Always pull both marks from the MCP — `marketing_get_logo` for Dash, `marketing_get_partner_kit({ partner })` for the partner asset URL.',
		'Honor the `coBrandingRules` field in the returned partner kit verbatim — every partner has slightly different rules (whose mark goes first, equal weight vs primary, allowed colorways).',
		'If the partner kit has no `assetUrls`, fall back to a "Powered by Dash" badge variant (`marketing_get_partner_kit` → `general.badgeVariants`).'
	],

	nonFeatures: [
		'No invented partner logos. If `marketing_get_partner_kit` returns no asset URLs, surface that to the user and use a "Powered by Dash" badge instead.',
		'No partner co-branding with companies not in the partner list. The MCP partner list is the entire valid set.',
		'No alteration of partner logos — recolor, crop, rotate, drop-shadow, etc. all disallowed unless explicitly in `coBrandingRules`.'
	],

	props: [
		{
			name: 'partner',
			type: 'string',
			description:
				'Partner slug. Call without it to list partners. Known slugs: transpecos-banks, patriot-bank, visa-gsi, currency-cloud, mastercard.'
		}
	],

	porting: [
		'Call `marketing_get_partner_kit({ partner })` once. The response includes co-branding rules, legal disclosure, regulator reference, and (where authored) asset URLs.',
		'Render rules side-by-side with the lockup so designers can audit compliance at a glance.',
		'For partner-specific legal copy (e.g. issuing-bank disclosure on a partner-co-branded card art page), use the `legalDisclosure` field of the returned kit.'
	],

	example: `marketing_get_partner_kit({ partner: 'transpecos-banks' })
// → { displayName: 'TransPecos Banks, SSB', category: 'Issuing Bank',
//     coBrandingRules: […], legalDisclosure: '…', assetUrls: { … } }`,

	accessibility: [
		'Both marks carry an <code>aria-label</code> with the entity name (e.g. <code>aria-label="Dash.fi"</code>, <code>aria-label="TransPecos Banks"</code>).'
	],

	changelog: [
		{
			version: 'v0.2.0',
			date: '2026-05-14',
			note: 'Surfaced under the Chrome category as a product-namespace proxy over marketing_get_partner_kit.'
		}
	]
};
