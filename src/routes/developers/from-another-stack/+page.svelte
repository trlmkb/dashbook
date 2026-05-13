<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';

	// --- Token sheet (vanilla CSS) ---
	const tokensCss = `/* dashfi-tokens.css  ·  drop into any project, link from the page head.
   Sourced from /foundations/color, /foundations/typography, /foundations/radius. */

:root {
	/* Product palette (light) */
	--bg: #faf8f1;          --fg: #123b39;
	--bg-muted: #eceae0;    --fg-muted: #6e7878;
	--border: #e8e6dc;      --input-border: #b6c0bf;
	--primary: #25261d;     --primary-fg: #ffffff;
	--brand: #2b605c;       --brand-fg: #ffffff;
	--accent: #ebff00;      --destructive: #ff4000;
	--card: #faf8f1;        --popover: #ffffff;
	--ring: #2b605c;

	/* Type families (see /foundations/typography) */
	--font-sans: 'Bai Jamjuree', ui-sans-serif, system-ui, sans-serif;
	--font-mono: 'PP Supply Mono', ui-monospace, SFMono-Regular, monospace;
	--font-display: 'PP Supply Mono', ui-monospace, monospace;

	/* Radius scale (see /foundations/radius) */
	--radius-none: 0;       --radius-sm: 4px;
	--radius-md: 6px;       --radius-lg: 8px;
	--radius-full: 9999px;

	/* Motion (see /foundations/motion) */
	--dur-fast: 120ms;      --dur-base: 200ms;
	--easing-out: cubic-bezier(0.22, 1, 0.36, 1);
}

[data-theme='dark'], html.dark {
	--bg: #0f1413;          --fg: #ffffff;
	--bg-muted: #181e1d;    --fg-muted: #8b9695;
	--border: #1f2a29;      --input-border: #1f2a29;
	--primary: #ffffff;     --primary-fg: #000000;
	--brand: #5bb8b0;       --brand-fg: #ffffff;
	--card: #0f1413;        --popover: #141a19;
	--ring: #5bb8b0;
}`;

	// --- Font @font-face ---
	const fontsCss = `/* PP Supply Mono — commercial license (Pangram Pangram).
   Host on a first-party domain; do not redistribute via CDN.
   Bai Jamjuree — SIL Open Font License; safe to bundle anywhere. */

@font-face {
	font-family: 'PP Supply Mono';
	src: url('/fonts/PPSupplyMono-Regular.woff2') format('woff2');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}
@font-face {
	font-family: 'PP Supply Mono';
	src: url('/fonts/PPSupplyMono-Ultralight.woff2') format('woff2');
	font-weight: 200;
	font-style: normal;
	font-display: swap;
}
@font-face {
	font-family: 'Bai Jamjuree';
	src: url('https://cdn.jsdelivr.net/npm/@fontsource/bai-jamjuree@5.1.0/files/bai-jamjuree-latin-400-normal.woff2') format('woff2');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}`;

	// --- Vanilla HTML quick-start ---
	const vanillaPageCss = `/* dashfi-page.css  ·  page-level resets + the canonical primitive shapes.
   Pairs with dashfi-tokens.css + dashfi-fonts.css. */

body {
	margin: 0;
	background: var(--bg);
	color: var(--fg);
	font-family: var(--font-sans);
	padding: 32px;
}

/* Button — matches /components/button anatomy (default size, 40px) */
.btn {
	height: 40px;
	padding: 0 20px;
	border: none;
	border-radius: var(--radius-md);
	background: var(--primary);
	color: var(--primary-fg);
	font-family: var(--font-sans);
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: opacity var(--dur-fast) var(--easing-out);
}
.btn:hover { opacity: 0.8; }

/* Input — matches /components/input anatomy (underline-only) */
.input {
	height: 40px;
	padding: 8px 0;
	width: 100%;
	background: transparent;
	border: none;
	border-bottom: 1px solid var(--input-border);
	font-family: var(--font-sans);
	font-size: 14px;
	color: var(--fg);
	outline: none;
}
.input:focus { border-bottom-color: var(--fg); }

/* Label — matches /components/label anatomy (mono uppercase tracked muted) */
.label {
	font-family: var(--font-mono);
	font-size: 11px;
	color: var(--fg-muted);
	letter-spacing: 0.15em;
	text-transform: uppercase;
}`;

	const vanillaHtml = `<!-- Link the three sheets in your page head, then drop the markup. -->
<!-- Stack-agnostic: works in a static .html file, a Rails view, a Django -->
<!-- template, an Express response — anything that renders HTML. -->

<label class="label" for="email">Work email</label>
<input id="email" class="input" type="email" placeholder="you@company.com" />
<button class="btn">Continue</button>`;

	// --- React + Tailwind ---
	const reactTailwindConfig = `// tailwind.config.ts (or @theme in app.css for Tailwind v4)
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--bg)',
				foreground: 'var(--fg)',
				muted: { DEFAULT: 'var(--bg-muted)', foreground: 'var(--fg-muted)' },
				primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-fg)' },
				brand: { DEFAULT: 'var(--brand)', foreground: 'var(--brand-fg)' },
				border: 'var(--border)',
				input: 'var(--input-border)',
				ring: 'var(--ring)',
				popover: 'var(--popover)'
			},
			fontFamily: {
				sans: ['Bai Jamjuree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['PP Supply Mono', 'ui-monospace', 'monospace']
			},
			borderRadius: { md: '6px', lg: '8px' }
		}
	}
} satisfies Config;`;

	const reactComponent = `// Button.tsx — match /components/button anatomy
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'brand' | 'default' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'default' | 'lg';
};

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
	default:    'bg-primary text-primary-foreground hover:opacity-80',
	brand:      'bg-brand text-brand-foreground hover:opacity-80',
	secondary:  'bg-[#354cef] text-white hover:opacity-80',     // cobalt — vnext
	outline:    'border border-input bg-transparent hover:bg-muted',
	ghost:      'bg-transparent hover:bg-muted'
};
const sizeClasses: Record<NonNullable<Props['size']>, string> = {
	sm:      'h-9 px-4 text-sm',         // 36
	default: 'h-10 px-5 text-sm',        // 40
	lg:      'h-11 px-8 text-sm'         // 44
};

export const Button = forwardRef<HTMLButtonElement, Props>(
	({ variant = 'default', size = 'default', className = '', ...rest }, ref) => (
		<button
			ref={ref}
			className={\`inline-flex items-center justify-center gap-2 font-medium rounded-md transition-opacity active:scale-[0.97] \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`}
			{...rest}
		/>
	)
);`;

	// --- React Native ---
	const reactNativeTokens = `// tokens.ts — JS module mirror of dashfi-tokens.css
export const colors = {
	bg:         { light: '#faf8f1', dark: '#0f1413' },
	fg:         { light: '#123b39', dark: '#ffffff' },
	bgMuted:    { light: '#eceae0', dark: '#181e1d' },
	fgMuted:    { light: '#6e7878', dark: '#8b9695' },
	border:     { light: '#e8e6dc', dark: '#1f2a29' },
	inputBorder:{ light: '#b6c0bf', dark: '#1f2a29' },
	primary:    { light: '#25261d', dark: '#ffffff' },
	primaryFg:  { light: '#ffffff', dark: '#000000' },
	brand:      { light: '#2b605c', dark: '#5bb8b0' },
	brandFg:    { light: '#ffffff', dark: '#ffffff' },
	ring:       { light: '#2b605c', dark: '#5bb8b0' }
};

export const radius = { none: 0, sm: 4, md: 6, lg: 8, full: 9999 };
export const motion = { fast: 120, base: 200 };
export const fonts = {
	sans: 'BaiJamjuree-Regular',
	mono: 'PPSupplyMono-Regular',
	display: 'PPSupplyMono-Ultralight'
};`;

	const reactNativeComponent = `// Button.tsx (React Native) — match /components/button anatomy
import { Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { colors, radius, fonts } from './tokens';

type Variant = 'brand' | 'default';
type Size = 'sm' | 'default' | 'lg';

export function Button({
	label,
	variant = 'default',
	size = 'default',
	onPress
}: { label: string; variant?: Variant; size?: Size; onPress?: () => void }) {
	const mode = useColorScheme() ?? 'light';
	const bg = variant === 'brand' ? colors.brand[mode] : colors.primary[mode];
	const fg = variant === 'brand' ? colors.brandFg[mode] : colors.primaryFg[mode];
	const height = size === 'sm' ? 36 : size === 'lg' ? 44 : 40;

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.btn,
				{ backgroundColor: bg, height, opacity: pressed ? 0.8 : 1 }
			]}
		>
			<Text style={[styles.label, { color: fg }]}>{label}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		borderRadius: radius.md
	},
	label: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '500' }
});`;

	// --- Server-side / backend ---
	const railsServer = `# Rails / Django / Express — serve the token sheet as a static asset.
# Same dashfi-tokens.css works in any server-rendered template.

# Rails:    app/assets/stylesheets/dashfi-tokens.css   →  stylesheet_link_tag
# Django:   static/css/dashfi-tokens.css               →  static template tag
# Express:  app.use(express.static('public'))          →  link rel=stylesheet

# For email templates (Gmail/Outlook strip style tags + drop @font-face),
# inline the brand-critical values directly:

${'<'}table style="background:#faf8f1;color:#123b39;font-family:Georgia,serif;">
	${'<'}tr>${'<'}td style="padding:32px;">
		${'<'}a href="#" style="background:#25261d;color:#fff;padding:12px 20px;
			border-radius:6px;text-decoration:none;font-weight:500;">
			Continue
		${'<'}/a>
	${'<'}/td>${'<'}/tr>
${'<'}/table>`;

	const intlFormatting = `// Currency + numeric formatting — same logic backend or frontend.
// Pair with --font-mono for tabular display.

const fmt = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
});
fmt.format(1240.5);   // "$1,240.50"

const compact = new Intl.NumberFormat('en-US', {
	notation: 'compact',
	style: 'currency',
	currency: 'USD'
});
compact.format(1240500);   // "$1.24M"`;

	// --- Build tools ---
	const buildVite = `// vite.config.ts — no special handling needed.
// Just import the CSS once:

// src/main.ts
import './dashfi-tokens.css';
import './dashfi-fonts.css';
import './app.css';

// Vite, Webpack, esbuild, Parcel, Rollup, Bun — all bundle CSS @imports the same way.`;

	const buildTailwindV4 = `/* Tailwind v4 — single app.css, no config file needed. */
@import 'tailwindcss';
@import './dashfi-tokens.css';
@import './dashfi-fonts.css';

@theme {
	--color-background: var(--bg);
	--color-foreground: var(--fg);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-fg);
	--color-brand: var(--brand);
	--color-brand-foreground: var(--brand-fg);
	--color-border: var(--border);
	--color-input: var(--input-border);
	--color-ring: var(--ring);
	--font-sans: 'Bai Jamjuree', ui-sans-serif, system-ui, sans-serif;
	--font-mono: 'PP Supply Mono', ui-monospace, monospace;
	--radius-md: 6px;
}`;

	const buildPostcss = `/* PostCSS — drop dashfi-tokens.css before your app stylesheet.
   No plugin required — the file is plain CSS. */

/* postcss.config.cjs */
module.exports = {
	plugins: { autoprefixer: {}, cssnano: {} }
};

/* src/styles.css */
@import './dashfi-tokens.css';
@import './dashfi-fonts.css';
@import './app.css';`;
</script>

<svelte:head>
	<title>From another stack — Developers — Dashbook</title>
</svelte:head>

<InnerPage>
	<PageHeader
		label="Developers"
		title="From another stack"
		lede="Building a Dash.fi-compliant UI outside the Svelte monorepo? This is the recipe — tokens, fonts, assets, and a per-stack setup for vanilla JS/HTML/CSS, React (web), React Native, server-rendered backends, and the common build tools."
	/>

	<Section
		label="Mental model"
		note="Dashbook is the spec, not a runtime for non-Svelte consumers. Three artefacts port across stacks; component shapes ride on top."
	>
		<ul class="docs-list">
			<li>
				<strong>Tokens</strong> — colors, type, spacing, radius, motion. Authored as CSS
				variables; trivially mirrored as a JS module for React Native. Documented at
				<a href="/foundations/color">/foundations/color</a>,
				<a href="/foundations/typography">/foundations/typography</a>,
				<a href="/foundations/spacing">/foundations/spacing</a>,
				<a href="/foundations/radius">/foundations/radius</a>,
				<a href="/foundations/motion">/foundations/motion</a>.
			</li>
			<li>
				<strong>Fonts</strong> — PP Supply Mono (commercial · Pangram Pangram) and Bai
				Jamjuree (SIL OFL · free). Self-host the PP file; serve Bai Jamjuree from any CDN
				or bundle.
			</li>
			<li>
				<strong>Assets</strong> — the dash.fi wordmark + app icon as SVG. Download from
				<a href="/brand/logo">/brand/logo</a>.
			</li>
			<li>
				<strong>Components</strong> — each <a href="/components">/components/&lt;name&gt;</a>
				page has an anatomy section with exact dimensions, tokens-per-part, composition
				rules, and explicit non-features. Reimplement directly from that contract.
			</li>
		</ul>
	</Section>

	<Section
		label="The token sheet"
		note="One CSS file. Drop into any project. Works in vanilla HTML, any framework, any build tool."
	>
		<CodeSnippet code={tokensCss} language="css" />
	</Section>

	<Section
		label="Fonts"
		note="@font-face works in every browser. PP Supply must be self-hosted (commercial license); Bai Jamjuree can come from a CDN."
	>
		<CodeSnippet code={fontsCss} language="css" />
	</Section>

	<Section
		label="Vanilla HTML + CSS + JS"
		note="No framework. Three sheets (tokens, fonts, page styles) + plain markup. Buttons and inputs match the canonical anatomies — 40px button, underline-only input, mono uppercase label."
	>
		<div class="setup-head">dashfi-page.css</div>
		<CodeSnippet code={vanillaPageCss} language="css" />
		<div class="setup-head">Markup</div>
		<CodeSnippet code={vanillaHtml} language="html" />
	</Section>

	<Section
		label="React (web)"
		note="Two patterns: (1) Tailwind with the dashfi-tokens.css imported and Tailwind's color/font scales mapped to the CSS vars; (2) plain inline styles using var(--…). The Tailwind path is the smoother developer experience."
	>
		<div class="setup-head">Tailwind config</div>
		<CodeSnippet code={reactTailwindConfig} language="typescript" />
		<div class="setup-head">Button component (matches /components/button anatomy)</div>
		<CodeSnippet code={reactComponent} language="typescript" />
	</Section>

	<Section
		label="React Native"
		note="No CSS variables; mirror the token sheet as a JS module and read it from StyleSheet. The resolved px values + hex colors are the contract; layout primitives swap to RN's flex API."
	>
		<div class="setup-head">tokens.ts</div>
		<CodeSnippet code={reactNativeTokens} language="typescript" />
		<div class="setup-head">Button (React Native)</div>
		<CodeSnippet code={reactNativeComponent} language="typescript" />
	</Section>

	<Section
		label="Server-rendered backends (Rails / Django / Express / etc.)"
		note="Same token sheet works as a static asset in any backend. Email templates need inlined styles because most clients strip style tags and drop @font-face — fall back to system fonts and inline the brand-critical hex values."
	>
		<CodeSnippet code={railsServer} language="html" />
	</Section>

	<Section
		label="Currency + numeric formatting"
		note="Intl.NumberFormat is universal — works the same in browser, Node, Deno, Bun. Pair monetary values with --font-mono for tabular alignment (see /foundations/typography → tabular numbers)."
	>
		<CodeSnippet code={intlFormatting} language="javascript" />
	</Section>

	<Section
		label="Build tools"
		note="The token sheet is plain CSS. Every modern bundler imports CSS files; no plugin or loader is required."
	>
		<div class="setup-head">Vite / Webpack / esbuild / Parcel / Rollup / Bun</div>
		<CodeSnippet code={buildVite} language="typescript" />
		<div class="setup-head">Tailwind v4 (Tailwind reads CSS vars natively via @theme)</div>
		<CodeSnippet code={buildTailwindV4} language="css" />
		<div class="setup-head">PostCSS</div>
		<CodeSnippet code={buildPostcss} language="css" />
	</Section>

	<Section
		label="License + asset notes"
		note="One commercial dependency. Treat carefully."
	>
		<ul class="docs-list">
			<li>
				<strong>PP Supply Mono</strong> — commercial license from Pangram Pangram. Each
				project must hold its own seat. Self-host the woff2 files on a first-party domain;
				do not redistribute via public CDN. Dash.fi's license covers internal product +
				marketing surfaces.
			</li>
			<li>
				<strong>Bai Jamjuree</strong> — SIL Open Font License. Bundle freely. CDN delivery
				via jsdelivr / unpkg / @fontsource is recommended.
			</li>
			<li>
				<strong>Logos + wordmark</strong> — see <a href="/brand/logo">/brand/logo</a> for
				the canonical SVGs, colorways, and clearance rules. Partner usage follows
				<a href="/press">/press</a>.
			</li>
			<li>
				<strong>Cobalt</strong> — <code>#354CEF</code> is product-facing on the vnext design
				lineage (Button secondary, LogoApp gradient). Earlier marketing-only guidance is
				superseded — see <a href="/foundations/color">/foundations/color</a> for current
				surface mappings.
			</li>
		</ul>
	</Section>

	<Section
		label="Working from a Dashbook component page"
		note="The repeatable flow for porting any component to your stack."
	>
		<ol class="docs-list ordered">
			<li>Open <a href="/components">/components/&lt;name&gt;</a> in this site.</li>
			<li>
				Read the <strong>Anatomy</strong> tab — every dimension, token, composition rule,
				and non-feature is listed with resolved values.
			</li>
			<li>
				Open the <strong>Preview</strong> tab in your design tool of choice and screenshot the
				canonical rendering for reference.
			</li>
			<li>
				Implement in your stack using the px / hex values from the anatomy, the token sheet
				above, and your stack's component model.
			</li>
			<li>
				If your component diverges from the canonical (e.g., adds a prop the canonical does
				not have), flag it as an intentional fork at the call site — re-implementations are
				expected to be 1:1 with Dashbook unless explicitly diverged.
			</li>
		</ol>
	</Section>
</InnerPage>

<style>
	.setup-head {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 24px 0 8px;
	}
</style>

