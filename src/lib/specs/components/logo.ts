import type { ComponentSpec } from '../types.js';

/**
 * Logo — three Dash.fi mark variants.
 *
 * Logo (full wordmark), LogoSmall (compact wordmark), LogoApp (square app icon).
 * Wordmarks use currentColor; LogoApp uses a baked cobalt-to-ink gradient.
 */
export const logo: ComponentSpec = {
	slug: 'logo',
	name: 'Logo',
	category: 'Display',
	status: 'stable',
	importPath: "import { Logo, LogoSmall, LogoApp } from '@dashfi/svelte/ui/logo'",
	description: 'Dash.fi wordmark and app icon as Svelte components — Logo, LogoSmall, LogoApp.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/logo/',

	dimensions: [
		{
			name: 'Logo',
			value: 'viewBox 426×90, default 16px tall',
			tw: 'h-4',
			notes: 'Aspect ratio 4.73:1.'
		},
		{
			name: 'LogoSmall',
			value: 'viewBox 271×86, default 16px tall',
			tw: 'h-4',
			notes: 'Aspect ratio 3.15:1 — trimmed variant for tight horizontal space.'
		},
		{
			name: 'LogoApp',
			value: 'viewBox 640×640 (square), default 40px',
			tw: 'size-10',
			notes: 'Square app-icon glyph.'
		}
	],

	tokens: [
		{
			name: 'Logo / LogoSmall fill',
			notes:
				"Paths fill `currentColor`. Inherits from parent's text colour. There is no separate accent path in the lib SVG."
		},
		{
			name: 'LogoApp gradient',
			notes:
				'Radial gradient from cobalt `#344BEE` (origin, ~27% stop) to ink `#262A36` (far edge) on the background rect. The "d" glyph is filled with mist `#E7E7F0`. These are baked hex values — not `currentColor`, not parametric.'
		},
		{
			name: 'LogoApp.radius',
			notes:
				'Corner radius of the background rect in viewBox units (0–640). Pass `radius={96}` for the standard iOS-style rounded square.'
		}
	],

	composition: [
		'Use <code>Logo</code> for headers, footers, login screens, marketing surfaces.',
		'Use <code>LogoSmall</code> when horizontal space is tight (e.g. mobile nav).',
		'Use <code>LogoApp</code> for app icons, splash screens, OG images, favicons.',
		'To recolour <code>Logo</code> or <code>LogoSmall</code>, set <code>color</code> / <code>text-*</code> on the parent. To recolour <code>LogoApp</code>, edit the SVG directly — the gradient is intentionally baked.'
	],

	nonFeatures: [
		"No <code>accent</code> prop. The lib's Logo is single-fill <code>currentColor</code>. The portal's <code>chrome/Wordmark.svelte</code> has an accent-colour-able variant — that's a separate chrome component, not the lib.",
		'No size prop. Use Tailwind <code>h-*</code> / <code>size-*</code> via <code>class</code>.',
		'No background fill on Logo / LogoSmall. The marks sit on whatever surface the consumer provides.',
		'No image-asset variant (PNG, JPG). For asset downloads, see the <a href="/brand/logo">/brand/logo</a> page with <code>AssetConfigurator</code>.'
	],

	props: [
		{
			name: 'Logo.class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is h-4.'
		},
		{
			name: 'LogoSmall.class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is h-4.'
		},
		{
			name: 'LogoApp.radius',
			type: 'number',
			default: '0',
			description: 'Corner radius of the square background, in viewBox units (0-640).'
		},
		{
			name: 'LogoApp.class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is size-10.'
		}
	],

	porting: [
		'The SVG paths are the contract — copy them verbatim. <code>currentColor</code> fill so the consumer controls the colour.',
		"LogoApp's baked cobalt-to-ink gradient is the brand mark; don't reinterpret it locally."
	],

	example: `<script lang="ts">
	import { Logo, LogoSmall, LogoApp } from '@dashfi/svelte/ui/logo';
<\/script>

<Logo />        <!-- Full wordmark -->
<LogoSmall />   <!-- Compact wordmark -->
<LogoApp />     <!-- Square app icon -->`,

	accessibility: [
		'SVGs are decorative by default. For consumer-facing logos with brand-name meaning, wrap in a parent with <code>aria-label="Dash.fi"</code>.',
		'Inside link contexts, supply a <code>aria-label</code> on the surrounding anchor (e.g. "Home").'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy regenerated against the EN-XX/design-vnext--sidebar-feature branch. Confirmed: Logo and LogoSmall render as single-fill currentColor SVGs at default h-4; LogoApp bakes a radial gradient from cobalt #344BEE at the origin (~27% stop) to ink #262A36 at the far edge, with the "d" glyph in mist #E7E7F0. LogoApp.radius remains a viewBox-unit number (0–640) for iOS-style rounded squares. The previous v0.3.1 anatomy referenced a stale branch and is no longer accurate.'
		},
		{
			version: 'v0.3.1',
			date: '2026-05-13',
			note: 'Anatomy tightened: per-part viewBox and default size (Logo 426×90 h-4, LogoSmall 271×86 h-4, LogoApp 640×640 size-10), currentColor fill on the wordmarks vs baked cobalt-to-ink gradient on LogoApp, explicit non-features (no accent prop in the lib — the portal chrome has one). Matches the Input precedent.'
		}
	]
};
