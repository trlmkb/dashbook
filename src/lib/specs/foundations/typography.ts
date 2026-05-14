/**
 * Typography foundation spec — single source of truth for the Dashbook type system.
 *
 * Mirrors what the docs page renders at
 * `src/routes/foundations/typography/+page.svelte`.
 *
 * Consumed by:
 * - MCP `product_get_foundation({ name: 'typography' })` — returns structured
 *   data so agents can reproduce the type system without scraping the docs.
 * - (Future) the docs page itself, once foundation pages adopt the same
 *   spec-driven rendering pattern as component pages.
 */

import type { TypographyFoundation } from './types.js';

export const typographyFoundation: TypographyFoundation = {
	families: {
		sans: {
			cssVar: '--font-sans',
			name: 'Bai Jamjuree',
			stack: "'Bai Jamjuree', 'Geist', ui-sans-serif, system-ui, sans-serif",
			license: 'SIL OFL',
			usage: 'Body, UI, buttons. The default for any prose or interactive label.'
		},
		mono: {
			cssVar: '--font-mono',
			name: 'PP Supply Mono',
			stack:
				"'PP Supply Mono', 'Geist Mono', ui-monospace, SFMono-Regular, monospace",
			license: 'Commercial (Pangram Pangram)',
			usage:
				'Labels, data values, tabular numbers, code, anything that benefits from monospaced figures.'
		},
		display: {
			cssVar: '--font-display',
			name: 'PP Supply Mono (Ultralight, weight 200)',
			stack: "'PP Supply Mono', 'JetBrains Mono', ui-monospace, monospace",
			license: 'Commercial (Pangram Pangram)',
			usage:
				'Display headings only — uppercase, tight letter-spacing, weight 200. Same family as mono but used as a distinct display voice.'
		}
	},

	typeScale: [
		{
			name: 'display',
			className: 'heading-display',
			family: 'display',
			fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
			lineHeight: '0.9',
			letterSpacing: '-0.01em',
			weight: '200',
			textTransform: 'uppercase',
			usage: 'Hero headings on marketing and landing surfaces. One per page maximum.',
			sample: 'BUILT FOR GROWTH'
		},
		{
			name: 'page-label',
			className: 'page-label',
			family: 'mono',
			fontSize: '0.75rem',
			letterSpacing: '0.3em',
			textTransform: 'uppercase',
			usage:
				'Breadcrumb-style page label above the title. Wide tracking. Always paired with --fg-muted.',
			sample: 'BRAND / LOGO'
		},
		{
			name: 'section-header',
			className: 'section-header',
			family: 'mono',
			fontSize: '0.6875rem',
			weight: '500',
			letterSpacing: '0.15em',
			textTransform: 'uppercase',
			usage:
				'Labels above sections inside a page — `Product palette`, `Marketing slate`. Always --fg-muted.',
			sample: 'PRODUCT PALETTE'
		},
		{
			name: 'data-value',
			className: 'data-value',
			family: 'mono',
			fontSize: 'inherit',
			weight: '400',
			letterSpacing: '-0.02em',
			usage:
				'Currency, counts, IDs, percentages. Always tabular-nums. Inherits surrounding size; pair with a larger element when used as a metric.',
			sample: '$2,408,210'
		},
		{
			name: 'body-lg',
			className: 'body-lg',
			family: 'sans',
			fontSize: '1.0625rem',
			lineHeight: '1.6',
			usage:
				'Lede paragraphs on every page header. One per page — the sentence directly under the title.',
			sample: 'The most rewarding card for growing your business.'
		},
		{
			name: 'body',
			className: 'body',
			family: 'sans',
			fontSize: '0.9375rem',
			lineHeight: '1.6',
			usage: 'Default body copy. Prose, descriptions, longer-form UI text.',
			sample: 'Spending data refreshed successfully.'
		},
		{
			name: 'body-sm',
			className: 'body-sm',
			family: 'sans',
			fontSize: '0.8125rem',
			lineHeight: '1.5',
			usage: 'Supporting text under inputs, helper copy, table captions. Always --fg-muted.',
			sample: 'Resets midnight UTC.'
		},
		{
			name: 'caption',
			className: 'caption',
			family: 'sans',
			fontSize: '0.75rem',
			lineHeight: '1.4',
			usage: 'Footnotes, disclosures, microcopy. Always --fg-muted.',
			sample: 'Issuing-bank disclosure footnote.'
		}
	],

	tabularNumerics: {
		declaration: 'font-variant-numeric: tabular-nums',
		mandatoryWhen: [
			'Currency values (any $ amount).',
			'Counts, IDs, ordinal positions.',
			'Percentages, ratios.',
			'Timestamps, dates rendered as digits.',
			'Anywhere numbers stack vertically and must align — tables, lists, ledgers.'
		],
		autoOptIn: [
			'.tabular-nums utility class.',
			'[data-numeric] attribute selector.',
			'[data-mono] attribute selector.',
			'.data-value semantic class (mono + tabular by default).'
		]
	},

	semanticClasses: [
		{
			className: '.heading-display',
			css: 'font-family: var(--font-display); font-weight: 200; font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 0.9; letter-spacing: -0.01em; text-transform: uppercase;',
			usage: 'Top-level hero headings. Used once per page at most.'
		},
		{
			className: '.section-header',
			css: 'font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--fg-muted);',
			usage: 'Label above a `<Section>` inside a page. Stable across the entire system.'
		},
		{
			className: '.page-label',
			css: 'font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--fg-muted);',
			usage: 'Breadcrumb-style label above a `<PageHeader>` title.'
		},
		{
			className: '.data-value',
			css: 'font-family: var(--font-mono); font-weight: 400; letter-spacing: -0.02em; font-variant-numeric: tabular-nums;',
			usage: 'Any rendered number. Always tabular figures.'
		},
		{
			className: '.label-caps',
			css: 'font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase;',
			usage: 'Standalone all-caps labels not bound to a Section header — chip labels, KPI captions.'
		},
		{
			className: '.brand-underline',
			css: 'background-image: linear-gradient(var(--brand), var(--brand)); background-repeat: no-repeat; background-size: 100% 1px; background-position: 0 100%;',
			usage: 'Inline emphasis under a span of text. Used in marketing surfaces for brand-coloured underlines.'
		},
		{
			className: '.tabular-nums',
			css: 'font-variant-numeric: tabular-nums;',
			usage: 'Force tabular figures on any element. Use generously — it never hurts.'
		}
	],

	webDelivery: {
		sans: {
			family: 'Bai Jamjuree',
			license: 'SIL OFL',
			googleFonts:
				'https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@200;300;400;500;600;700&display=swap',
			notes: 'Free for any use, self-host or load from the Google CDN.'
		},
		mono: {
			family: 'PP Supply Mono',
			license: 'Commercial (Pangram Pangram)',
			source: 'https://pangrampangram.com/products/supply',
			fallback: {
				family: 'JetBrains Mono',
				license: 'Apache-2.0',
				googleFonts:
					'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200;300;400;500;600;700&display=swap'
			},
			notes:
				'PP Supply Mono is paywalled — embed licensed @font-face files inside the licensed project. On surfaces without a license, fall back to JetBrains Mono for both the mono and display roles.'
		}
	},

	rules: [
		'Three families. Eight semantic styles. Tabular figures everywhere a number appears.',
		'Use the semantic class names — `.heading-display`, `.body`, `.caption`. Never reach for ad-hoc `font-size`.',
		'The lede directly under every PageHeader title uses `.body-lg`. One per page.',
		'Section labels (above any `<Section>`) use `.section-header`. They are always `--fg-muted`.',
		'Tabular-nums is mandatory anywhere a number lives — currency, counts, IDs, percentages, dates. Never ship proportional figures in a table.',
		'PP Supply Mono carries both `mono` and `display` roles. Display headings use weight 200 (Ultralight) at uppercase with tight tracking.',
		'Bai Jamjuree handles every line of prose, every button, every input label.'
	]
};
