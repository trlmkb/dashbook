<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Logo, LogoSmall, LogoApp } from '@dashfi/svelte/ui/logo';

	const logoProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is h-4.'
		}
	];

	const logoSmallProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is h-4.'
		}
	];

	const logoAppProps: PropDef[] = [
		{
			name: 'radius',
			type: 'number',
			default: '0',
			description: 'Corner radius of the square background, in viewBox units (0-640).'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the root <svg>. Default sizing is size-10.'
		}
	];

	const example = `<script lang="ts">
	import { Logo, LogoSmall, LogoApp } from '@dashfi/svelte/ui/logo';
<\/script>

<Logo />        <!-- Full wordmark -->
<LogoSmall />   <!-- Compact wordmark -->
<LogoApp />     <!-- Square app icon -->`;
</script>

<svelte:head><title>Logo — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Logo"
	description="Three Dash.fi mark variants — full wordmark, compact wordmark, square app icon. For marketing surfaces and login screens."
	importPath="@dashfi/svelte/ui/logo"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:display="flex" style:gap="40px" style:align-items="center">
					<Logo />
					<LogoSmall />
					<LogoApp />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Logo" props={logoProps} />
			<PropsTable title="LogoSmall" props={logoSmallProps} />
			<PropsTable title="LogoApp" props={logoAppProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions (per part)</div>
			<ul class="docs-list">
				<li><strong>Logo</strong> — viewBox 426×90, default <code>h-4</code> (16px). Aspect ratio 4.73:1.</li>
				<li><strong>LogoSmall</strong> — viewBox 271×86, default <code>h-4</code> (16px). Aspect ratio 3.15:1 — trimmed variant for tight horizontal space.</li>
				<li><strong>LogoApp</strong> — viewBox 640×640 (square), default <code>size-10</code> (40px). Square app-icon glyph.</li>
			</ul>

			<div class="docs-h">Tokens (per part)</div>
			<ul class="docs-list">
				<li><strong>Logo</strong> — paths fill <code>currentColor</code>. Inherits from parent's text colour. There is no separate accent path in the lib SVG.</li>
				<li><strong>LogoSmall</strong> — same. <code>currentColor</code> throughout.</li>
				<li><strong>LogoApp</strong> — uses a radial gradient (<code>#344BEE</code> cobalt → <code>#262A36</code> ink) on the background rect. The "d" glyph is filled with <code>#E7E7F0</code> mist. These are baked hex values — not <code>currentColor</code>, not parametric.</li>
				<li><strong>LogoApp.radius</strong> — corner radius of the background rect in viewBox units (0–640). Pass <code>radius={`{96}`}</code> for the standard iOS-style rounded square.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Use <code>Logo</code> for headers, footers, login screens, marketing surfaces.</li>
				<li>Use <code>LogoSmall</code> when horizontal space is tight (e.g. mobile nav).</li>
				<li>Use <code>LogoApp</code> for app icons, splash screens, OG images, favicons.</li>
				<li>To recolour <code>Logo</code> or <code>LogoSmall</code>, set <code>color</code> / <code>text-*</code> on the parent. To recolour <code>LogoApp</code>, edit the SVG directly — the gradient is intentionally baked.</li>
			</ul>

			<div class="docs-h">Not part of Logo</div>
			<ul class="docs-list">
				<li>No <code>accent</code> prop. The lib's Logo is single-fill <code>currentColor</code>. The portal's <code>chrome/Wordmark.svelte</code> has an accent-colour-able variant — that's a separate chrome component, not the lib.</li>
				<li>No size prop. Use Tailwind <code>h-*</code> / <code>size-*</code> via <code>class</code>.</li>
				<li>No background fill on Logo / LogoSmall. The marks sit on whatever surface the consumer provides.</li>
				<li>No image-asset variant (PNG, JPG). For asset downloads, see the <a href="/brand/logo">/brand/logo</a> page with <code>AssetConfigurator</code>.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>Logo</code>, <code>LogoSmall</code> — only <code>class</code>.</li>
				<li><code>LogoApp</code> — <code>radius</code> (number, viewBox units) + <code>class</code>.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>The SVG paths are the contract — copy them verbatim. <code>currentColor</code> fill so the consumer controls the colour.</li>
				<li>LogoApp's baked cobalt-to-ink gradient is the brand mark; don't reinterpret it locally.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch.
					Confirmed: <code>Logo</code> and <code>LogoSmall</code>
					render as single-fill <code>currentColor</code> SVGs at
					default <code>h-4</code>; <code>LogoApp</code> bakes a
					radial gradient from cobalt <code>#344BEE</code> at the
					origin (~27% stop) to ink <code>#262A36</code> at the far
					edge, with the "d" glyph in mist <code>#E7E7F0</code>.
					<code>LogoApp.radius</code> remains a viewBox-unit number
					(0–640) for iOS-style rounded squares. The previous v0.3.1
					anatomy referenced a stale branch and is no longer accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy tightened: per-part viewBox and default size
					(<code>Logo</code> 426×90 <code>h-4</code>,
					<code>LogoSmall</code> 271×86 <code>h-4</code>,
					<code>LogoApp</code> 640×640 <code>size-10</code>),
					<code>currentColor</code> fill on the wordmarks vs baked
					cobalt-to-ink gradient on LogoApp, explicit non-features
					(no <code>accent</code> prop in the lib — the portal chrome
					has one). Matches the Input precedent.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
