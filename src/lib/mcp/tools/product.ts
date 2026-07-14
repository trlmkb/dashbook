/**
 * Product tool namespace (`product_*`) — components, foundations, tokens.
 *
 * Use these tools to build Dash.fi product UI in any stack.
 */

import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { allComponentSpecs, getComponentSpec } from '../../specs/components/index.js';
import {
	getComponentImplementation,
	importPathOnly,
	withComponentImplementation
} from '../../specs/implementation.js';
import { spacingFoundation, typographyFoundation } from '../../specs/foundations/index.js';
import {
	productColors,
	baseColors,
	marketingColors,
	radii,
	motion as motionTokens,
	shadows
} from '../../tokens.js';
import { wordmarkSvg, wordmarkPresets, appIconSvg, appIconPresets } from '$chrome/logo-sources.js';

/**
 * Boundary signal — what this namespace explicitly does NOT contain.
 *
 * This string is appended to every `product_*` tool description so that
 * LLM clients introspecting the tool catalogue at discovery time see the
 * boundary, not just skill-prose readers.
 */
const PRODUCT_NON_FEATURES =
	'NOTE: the product_* namespace does not contain brand wordmarks, partner logos, legal disclosures, or marketing palette tokens — those live in marketing_*. For page chrome (wordmark in a header, FDIC text in a footer, partner co-brand lockup), use marketing_get_logo / marketing_get_legal_disclosure / marketing_get_partner_kit. Thin proxies and a composed scaffold are available under product_get_logo and product_get_page_template.';

/** Wrap a JSON-serialisable value as MCP text content. */
function json(value: unknown): { content: { type: 'text'; text: string }[] } {
	return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] };
}

export function registerProductTools(server: McpServer): void {
	// ── list_components ────────────────────────────────────────────────
	server.registerTool(
		'product_list_components',
		{
			title: 'List Dashbook components',
			description:
				'Returns the catalogue of components in @dashfi/svelte plus chrome-category scaffolds. Each entry includes machine-readable implementation routing. When implementation.reusePolicy is required-in-svelte, Svelte/SvelteKit code MUST use the exact shared-library import instead of recreating the component from anatomy HTML/CSS. Use this to discover available components before fetching anatomy. The `Chrome` category surfaces page-shell, wordmark, auth-footer, and partner-cobrand entries that proxy the marketing namespace under product-namespaced names — when building any product screen with chrome (login, 2FA, sign-up, magic link, password reset, partner-co-branded pages), look in the Chrome category. ' +
				PRODUCT_NON_FEATURES,
			inputSchema: {
				category: z
					.enum(['Inputs', 'Display', 'Feedback', 'Navigation', 'Layout', 'Data', 'Chrome'])
					.optional()
					.describe(
						'Filter to one category. Omit for all. Chrome surfaces page-level proxies to marketing assets (wordmark, page-shell, auth-footer, partner-cobrand).'
					),
				status: z
					.enum(['stable', 'beta', 'deprecated'])
					.optional()
					.describe('Filter by stability status.')
			}
		},
		async ({ category, status }) => {
			let entries = allComponentSpecs.map((s) => ({
				slug: s.slug,
				name: s.name,
				category: s.category,
				status: s.status,
				importPath: importPathOnly(s.importPath),
				description: s.description,
				implementation: getComponentImplementation(s)
			}));
			if (category) entries = entries.filter((e) => e.category === category);
			if (status) entries = entries.filter((e) => e.status === status);
			return json({ count: entries.length, components: entries });
		}
	);

	// ── get_component ──────────────────────────────────────────────────
	server.registerTool(
		'product_get_component',
		{
			title: 'Get a component anatomy',
			description:
				'Returns the full structured spec plus implementation routing. Anatomy is a design/verification contract, not permission to duplicate a production Svelte component. If implementation.reusePolicy is required-in-svelte, Svelte/SvelteKit receivers MUST use implementation.importStatement and must not recreate the component from generated HTML/CSS or screenshots. Non-Svelte receivers should call product_port_to. ' +
				PRODUCT_NON_FEATURES,
			inputSchema: {
				slug: z
					.string()
					.describe(
						'Component slug — e.g. "button", "input", "radio-group". Use `product_list_components` to discover.'
					)
			}
		},
		async ({ slug }) => {
			const spec = getComponentSpec(slug);
			if (!spec) {
				return {
					content: [
						{
							type: 'text',
							text: `Component "${slug}" not found. Call product_list_components to see available slugs.`
						}
					],
					isError: true
				};
			}
			return json(withComponentImplementation(spec));
		}
	);

	// ── get_foundation ─────────────────────────────────────────────────
	server.registerTool(
		'product_get_foundation',
		{
			title: 'Get a foundation (color, typography, etc.)',
			description:
				'Returns structured data for one Dashbook foundation. Foundations are the deeper-than-tokens conceptual layers: color taxonomy, type scale, spacing rhythm, radius scale, motion timings. ' +
				PRODUCT_NON_FEATURES,
			inputSchema: {
				name: z
					.enum(['color', 'typography', 'spacing', 'radius', 'motion', 'shadows'])
					.describe('Which foundation to fetch.')
			}
		},
		async ({ name }) => {
			switch (name) {
				case 'color':
					return json({
						product: productColors,
						base: baseColors,
						marketing: marketingColors,
						rules: [
							'Brand accent is single-use. Never combine product jade with marketing cobalt in the same surface.',
							'Destructive uses the shared library orange token (#ff4000 in both modes).',
							'Yellow is highlight only. One element per slide; never a primary surface.'
						]
					});
				case 'radius':
					return json({
						scale: radii,
						rules: [
							'Default radius is 0 (square) — components opt into rounding explicitly.',
							'`md` (6px) covers buttons + cards; `lg` (8px) covers card surfaces.',
							'`full` (9999px) for round avatars, dots, indicators.'
						]
					});
				case 'motion':
					return json({
						durations: motionTokens,
						rules: [
							'`fast` (120ms) for hover / focus state transitions.',
							'`base` (200ms) for layout shifts, card expansions.',
							'`slow` for explicit emphasis only — sparing.'
						]
					});
				case 'shadows':
					return json({
						scale: shadows,
						rules: [
							'Two-step elevation. `sm` for raised surfaces, `md` for popovers/modals.',
							'Jade-tinted at low opacity — never default Material-style black shadows.'
						]
					});
				case 'typography':
					return json({
						...typographyFoundation,
						note: 'See https://dashbook.vercel.app/foundations/typography for the rendered docs.'
					});
				case 'spacing':
					return json({
						...spacingFoundation,
						note: 'See https://dashbook.vercel.app/foundations/spacing for the rendered docs.'
					});
			}
		}
	);

	// ── get_token ──────────────────────────────────────────────────────
	server.registerTool(
		'product_get_token',
		{
			title: 'Look up a single token',
			description:
				'Resolve a single token to its hex values (light + dark). Accepts the bare name (e.g. "brand", "bg-muted") or the full CSS var (e.g. "--brand", "--color-input"). Searches product, base, and marketing palettes. ' +
				PRODUCT_NON_FEATURES,
			inputSchema: {
				name: z
					.string()
					.describe('Token name or CSS var — e.g. "brand", "--input-border", "--m-cobalt".')
			}
		},
		async ({ name }) => {
			const normalised = name.replace(/^--/, '');
			const all = [...productColors, ...baseColors, ...marketingColors];
			const match = all.find(
				(t) =>
					t.name === normalised ||
					t.cssVar === `--${normalised}` ||
					t.cssVar === name ||
					t.name === name
			);
			if (!match) {
				return {
					content: [
						{
							type: 'text',
							text: `Token "${name}" not found. Try product_get_foundation({name:"color"}) to see all.`
						}
					],
					isError: true
				};
			}
			return json(match);
		}
	);

	// ── search ─────────────────────────────────────────────────────────
	server.registerTool(
		'product_search',
		{
			title: 'Search components by keyword',
			description:
				'Fuzzy search across component names, descriptions, categories, and import paths. Returns up to 10 matches ordered by relevance. Use this when the user asks for "a dropdown" or "something with tabs" rather than knowing the exact slug. Includes Chrome-category entries (wordmark, page-shell, auth-footer, partner-cobrand) that proxy marketing assets. ' +
				PRODUCT_NON_FEATURES,
			inputSchema: {
				query: z.string().describe('Search query — e.g. "modal", "dropdown", "tabular data".'),
				limit: z.number().int().min(1).max(50).optional().default(10)
			}
		},
		async ({ query, limit }) => {
			const q = query.toLowerCase();
			const scored = allComponentSpecs
				.map((s) => {
					const haystack = [s.slug, s.name, s.description, s.category, s.importPath]
						.join(' ')
						.toLowerCase();
					let score = 0;
					if (s.slug === q) score += 100;
					else if (s.name.toLowerCase() === q) score += 80;
					else if (haystack.includes(q)) score += 40;
					// token-level fallback — split query into words
					for (const w of q.split(/\s+/)) {
						if (w && haystack.includes(w)) score += 10;
					}
					return { spec: s, score };
				})
				.filter((r) => r.score > 0)
				.sort((a, b) => b.score - a.score)
				.slice(0, limit);

			return json({
				query,
				count: scored.length,
				results: scored.map((r) => ({
					slug: r.spec.slug,
					name: r.spec.name,
					category: r.spec.category,
					status: r.spec.status,
					description: r.spec.description,
					implementation: getComponentImplementation(r.spec),
					relevance: r.score
				}))
			});
		}
	);

	// ── port_to ────────────────────────────────────────────────────────
	server.registerTool(
		'product_port_to',
		{
			title: 'Get the porting checklist for a component in a target stack',
			description:
				'Returns stack-specific porting guidance for a non-Svelte target. Do not use this tool for Svelte/SvelteKit: fetch product_get_component and use implementation.importStatement to import the real @dashfi/svelte component. Targets: react, react-native, html-css, vue. ' +
				PRODUCT_NON_FEATURES,
			inputSchema: {
				slug: z.string().describe('Component slug.'),
				stack: z.enum(['react', 'react-native', 'html-css', 'vue']).describe('Target stack.')
			}
		},
		async ({ slug, stack }) => {
			const spec = getComponentSpec(slug);
			if (!spec) {
				return {
					content: [
						{
							type: 'text',
							text: `Component "${slug}" not found. Call product_list_components to see available slugs.`
						}
					],
					isError: true
				};
			}
			return json({
				slug,
				stack,
				name: spec.name,
				sourceImplementation: getComponentImplementation(spec),
				contract: {
					dimensions: spec.dimensions,
					tokens: spec.tokens,
					variants: spec.variants,
					sizes: spec.sizes,
					nonFeatures: spec.nonFeatures
				},
				portingChecklist: spec.porting,
				canonicalExample: spec.example,
				canonicalSource: spec.canonicalSource,
				note: 'Tokens listed above have stable hex values across stacks when the Dashbook token sheet is imported. See https://dashbook.vercel.app/developers/from-another-stack for stack-specific setup.'
			});
		}
	);

	// ── get_logo ───────────────────────────────────────────────────────
	// Thin proxy over `marketing_get_logo`. Exists in the product namespace so
	// an LLM agent building a product surface (auth page, error page, anything
	// with chrome) can discover the wordmark via product-namespace introspection
	// alone. Same input schema + return shape as marketing_get_logo.
	server.registerTool(
		'product_get_logo',
		{
			title: 'Dash.fi logo SVG / PNG (proxies marketing_get_logo)',
			description:
				'Returns the Dash.fi wordmark or app icon for use in product-screen chrome (auth pages, error pages, partner-co-branded surfaces). Identical to marketing_get_logo — same input, same output. The product-namespace alias exists so agents introspecting product_list_* discover the wordmark and never invent a placeholder. The wordmark is always a brand asset; reach for this even when the surrounding page is product UI.',
			inputSchema: {
				variant: z
					.enum(['wordmark', 'app'])
					.default('wordmark')
					.describe(
						'Which mark. `wordmark` = the "dash.fi" letters (viewBox 426×90). `app` = the rounded-square "d" icon (viewBox 236×236).'
					),
				preset: z
					.string()
					.optional()
					.describe(
						'Colorway preset ID. Wordmark: jade, jade-dark, ink, cream-on-jade, white-on-ink, white-on-cobalt, black, transparent. App: jade, cobalt, ink, cream, white, black. Defaults to "jade".'
					),
				size: z
					.number()
					.int()
					.positive()
					.optional()
					.describe('Pixel width (wordmark) / square edge (app). Omit for natural size.'),
				format: z
					.enum(['svg', 'png'])
					.default('svg')
					.describe(
						"Output format. `svg` (default) returns vector content inline. `png` returns server-rasterized PNG base64-encoded — use when the consumer can't render inline SVG."
					),
				scale: z
					.number()
					.int()
					.min(1)
					.max(4)
					.optional()
					.describe('PNG-only DPI multiplier (1–4). Default 1. Ignored when format is "svg".')
			}
		},
		async ({ variant, preset, size, format, scale }) => {
			const presets = variant === 'wordmark' ? wordmarkPresets : appIconPresets;
			const resolvedPresetId = preset ?? 'jade';
			const p = presets.find((x) => x.id === resolvedPresetId);
			if (!p) {
				return {
					content: [
						{
							type: 'text',
							text: `Unknown ${variant} preset "${resolvedPresetId}". Valid: ${presets.map((x) => x.id).join(', ')}`
						}
					],
					isError: true
				};
			}

			const sz = size ?? null;
			const inlineSvg =
				variant === 'wordmark'
					? wordmarkSvg(p.fg, p.bg, sz)
					: appIconSvg(p.bg ?? p.fg, p.glyph ?? '#FFFFFF', sz);

			const naturalSize =
				variant === 'wordmark' ? { width: 426, height: 90 } : { width: 236, height: 236 };
			const renderedSize = sz
				? variant === 'wordmark'
					? { width: sz, height: Math.round((sz / naturalSize.width) * naturalSize.height) }
					: { width: sz, height: sz }
				: naturalSize;

			const urlBase = `https://dashbook.vercel.app/api/logo/${variant}/${p.id}`;
			const urlQuery: string[] = [];
			if (sz) urlQuery.push(`size=${sz}`);
			if (format === 'png') urlQuery.push('format=png');
			if (format === 'png' && scale && scale > 1) urlQuery.push(`scale=${scale}`);
			const url = urlQuery.length ? `${urlBase}?${urlQuery.join('&')}` : urlBase;

			if (format === 'png') {
				const { svgToPng } = await import('$chrome/rasterize');
				const png = await svgToPng(inlineSvg, {
					width: renderedSize.width,
					height: renderedSize.height,
					scale: scale ?? 1
				});
				const base64 = Buffer.from(png).toString('base64');
				return json({
					variant,
					preset: { id: p.id, label: p.label, fg: p.fg, bg: p.bg, glyph: p.glyph ?? null },
					size: renderedSize,
					format: 'png',
					scale: scale ?? 1,
					url,
					pngBase64: base64,
					proxiedFrom: 'marketing_get_logo',
					note: 'product_get_logo is a thin proxy over marketing_get_logo — same source bytes. Decode pngBase64 or fetch the URL directly.'
				});
			}

			return json({
				variant,
				preset: { id: p.id, label: p.label, fg: p.fg, bg: p.bg, glyph: p.glyph ?? null },
				size: renderedSize,
				format: 'svg',
				url,
				inlineSvg,
				proxiedFrom: 'marketing_get_logo',
				note: 'product_get_logo is a thin proxy over marketing_get_logo — same source bytes. Use this from product_* contexts to keep namespace introspection clean.'
			});
		}
	);

	// ── get_page_template ──────────────────────────────────────────────
	// Composed scaffolds for the auth pages every product app needs. Reduces
	// the "look up chrome + look up layout + look up copy + look up components"
	// dance to one call. Returns a structured recipe — not generated code —
	// so the agent still composes the actual implementation from product_* +
	// product_get_logo lookups against the listed primitives.
	type AuthSlug = 'auth-signin' | 'auth-signup' | 'auth-2fa' | 'auth-magic-link' | 'auth-reset';
	type PageTemplate = {
		slug: AuthSlug;
		name: string;
		chrome: {
			logo: { source: string; variant: 'wordmark' | 'app'; preset: string; placement: string };
			header: { content: string };
			footer: { content: string; legalDisclosure?: string };
		};
		layout: {
			maxWidth: string;
			padding: { mobile: string; tablet: string; desktop: string };
			centering: string;
		};
		copyTokens: { title: string; lede: string };
		requiredComponents: string[];
		notes: string[];
	};

	const authTemplates: Record<AuthSlug, PageTemplate> = {
		'auth-signin': {
			slug: 'auth-signin',
			name: 'Sign-in',
			chrome: {
				logo: {
					source: 'product_get_logo',
					variant: 'wordmark',
					preset: 'jade',
					placement: 'Centered above the card, 24px gap to card top.'
				},
				header: {
					content: 'Wordmark only. No top nav — auth pages are single-purpose.'
				},
				footer: {
					content:
						'Slim legal links: Terms · Privacy · Help. Optional FDIC line if the app is post-funding-account-creation.',
					legalDisclosure:
						'Optional — call marketing_get_legal_disclosure({ kind: "deposit-fdic" }) if a card or account is referenced.'
				}
			},
			layout: {
				maxWidth: '460px',
				padding: { mobile: '24px', tablet: '32px', desktop: '48px' },
				centering: 'Card centered both axes; sticky footer; min-height 100svh.'
			},
			copyTokens: {
				title: 'Welcome back.',
				lede: 'New here? <a>Create an account</a>.'
			},
			requiredComponents: ['card', 'label', 'input', 'button'],
			notes: [
				'Submit Button is variant="brand" — jade.',
				'Email + password inputs only; defer SSO buttons above the email/password block if applicable.',
				'Always render the wordmark — never substitute or omit.'
			]
		},
		'auth-signup': {
			slug: 'auth-signup',
			name: 'Sign-up',
			chrome: {
				logo: {
					source: 'product_get_logo',
					variant: 'wordmark',
					preset: 'jade',
					placement: 'Centered above the card, 24px gap to card top.'
				},
				header: { content: 'Wordmark only.' },
				footer: {
					content:
						'Slim legal links: Terms · Privacy. Sign-up explicitly references "Terms of Service" via a checkbox or inline copy near submit.'
				}
			},
			layout: {
				maxWidth: '460px',
				padding: { mobile: '24px', tablet: '32px', desktop: '48px' },
				centering: 'Card centered both axes.'
			},
			copyTokens: {
				title: 'Get started.',
				lede: 'Already have an account? <a>Sign in</a>.'
			},
			requiredComponents: ['card', 'label', 'input', 'checkbox', 'button'],
			notes: [
				'Submit gated on the Terms checkbox being checked.',
				'Always render the wordmark — never substitute.'
			]
		},
		'auth-2fa': {
			slug: 'auth-2fa',
			name: 'Two-factor verification',
			chrome: {
				logo: {
					source: 'product_get_logo',
					variant: 'wordmark',
					preset: 'jade',
					placement: 'Centered above the card.'
				},
				header: { content: 'Wordmark only.' },
				footer: {
					content:
						'Slim links: "Try a different method" · Help. NO legal disclosure (mid-flow, not terminal).'
				}
			},
			layout: {
				maxWidth: '460px',
				padding: { mobile: '24px', tablet: '32px', desktop: '48px' },
				centering: 'Card centered both axes.'
			},
			copyTokens: {
				title: 'Two-step verification.',
				lede: 'Enter the 6-digit code from your authenticator app.'
			},
			requiredComponents: ['card', 'label', 'input', 'button'],
			notes: [
				'Input is type="text" with inputmode="numeric" + pattern="[0-9]{6}" + autocomplete="one-time-code".',
				'Auto-focus the input on mount.',
				'Secondary action ("Try a different method") below submit as a ghost-link Button.',
				'Always render the wordmark — never substitute.'
			]
		},
		'auth-magic-link': {
			slug: 'auth-magic-link',
			name: 'Magic-link sent',
			chrome: {
				logo: {
					source: 'product_get_logo',
					variant: 'wordmark',
					preset: 'jade',
					placement: 'Centered above the card.'
				},
				header: { content: 'Wordmark only.' },
				footer: { content: 'Slim link: "Wrong email? Start over".' }
			},
			layout: {
				maxWidth: '460px',
				padding: { mobile: '24px', tablet: '32px', desktop: '48px' },
				centering: 'Card centered both axes.'
			},
			copyTokens: {
				title: 'Check your inbox.',
				lede: 'We sent a sign-in link to {email}. The link expires in 10 minutes.'
			},
			requiredComponents: ['card', 'button'],
			notes: [
				'No form — terminal state of the sign-in flow.',
				'Single secondary action: "Resend link" (Button variant="outline", disabled for 30s after first send).',
				'Always render the wordmark — never substitute.'
			]
		},
		'auth-reset': {
			slug: 'auth-reset',
			name: 'Password reset request',
			chrome: {
				logo: {
					source: 'product_get_logo',
					variant: 'wordmark',
					preset: 'jade',
					placement: 'Centered above the card.'
				},
				header: { content: 'Wordmark only.' },
				footer: { content: 'Slim link: "Back to sign in".' }
			},
			layout: {
				maxWidth: '460px',
				padding: { mobile: '24px', tablet: '32px', desktop: '48px' },
				centering: 'Card centered both axes.'
			},
			copyTokens: {
				title: 'Reset your password.',
				lede: "Enter the email you signed up with and we'll send a reset link."
			},
			requiredComponents: ['card', 'label', 'input', 'button'],
			notes: [
				'Submit Button is variant="brand" — jade.',
				'Always render the wordmark — never substitute.'
			]
		}
	};

	server.registerTool(
		'product_get_page_template',
		{
			title: 'Composed page-template scaffold (auth surfaces)',
			description:
				'Returns a structured scaffold for one of the standard auth pages: chrome (wordmark source + placement, header, footer), layout (maxWidth, padding, centering), copy tokens (title, lede), required components, and implementation notes. Use this BEFORE calling product_get_component lookups — it tells you what the page is supposed to be composed of, then you fetch each piece. ' +
				PRODUCT_NON_FEATURES,
			inputSchema: {
				slug: z
					.enum(['auth-signin', 'auth-signup', 'auth-2fa', 'auth-magic-link', 'auth-reset'])
					.describe('Which auth surface to scaffold.')
			}
		},
		async ({ slug }) => {
			const template = authTemplates[slug];
			if (!template) {
				return {
					content: [
						{
							type: 'text',
							text: `Unknown page template slug "${slug}". Valid: ${Object.keys(authTemplates).join(', ')}`
						}
					],
					isError: true
				};
			}
			return json({
				...template,
				wordmarkRule:
					'CRITICAL: never invent, reconstruct, or substitute the Dash wordmark. Call product_get_logo (or marketing_get_logo) for the canonical SVG. If unavailable, halt and surface to the user — do not ship a placeholder mark.',
				canonicalReference: `https://dashbook.vercel.app/patterns/auth-split-screen — the live preview + paste-ready code for the auth shell this template describes.`
			});
		}
	);
}
