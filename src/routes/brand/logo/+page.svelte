<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import LogoMark from '$chrome/LogoMark.svelte';
	import AssetConfigurator from '$chrome/AssetConfigurator.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';

	type WordmarkVariant = {
		name: string;
		surface: string;
		fg: string;
		bg: string;
		accent?: string;
	};

	type AppIconVariant = {
		name: string;
		surface: string;
		fg: string;
		glyph: string;
		bg: string;
		accent?: string;
	};

	const variants: WordmarkVariant[] = [
		{ name: 'Wordmark · Jade', surface: 'cream', fg: '#2B605C', bg: '#FAF8F1' },
		{ name: 'Wordmark · Ink on cream', surface: 'cream', fg: '#123B39', bg: '#FAF8F1' },
		{ name: 'Wordmark · Cream on jade', surface: 'jade', fg: '#FAF8F1', bg: '#2B605C' },
		{ name: 'Wordmark · White on ink', surface: 'ink', fg: '#FFFFFF', bg: '#0F1413' },
		{ name: 'Wordmark · Yellow accent', surface: 'cream', fg: '#2B605C', bg: '#FAF8F1', accent: '#EBFF00' }
	];

	const appIconVariants: AppIconVariant[] = [
		{ name: 'App icon · Jade', surface: 'cream', fg: '#2B605C', glyph: '#FAF8F1', bg: '#FAF8F1' },
		{ name: 'App icon · Cobalt (marketing)', surface: 'cream', fg: '#354CEF', glyph: '#E7E7F0', bg: '#FAF8F1' },
		{ name: 'App icon · Black', surface: 'cream', fg: '#000000', glyph: '#FFFFFF', bg: '#FAF8F1' },
		{ name: 'App icon · White on ink', surface: 'ink', fg: '#FFFFFF', glyph: '#0F1413', bg: '#0F1413' },
		{ name: 'App icon · Yellow glyph', surface: 'ink', fg: '#0F1413', glyph: '#EBFF00', bg: '#0F1413', accent: '#EBFF00' }
	];

	const dos = [
		{ kind: 'do' as const, text: 'Use the SVG. Always vector. Never re-trace, never rasterize beyond the provided high-res PNGs.' },
		{ kind: 'do' as const, text: 'Honor 2 dots of clearspace — the period in ".fi" is the unit.' },
		{ kind: 'do' as const, text: 'Use jade #2B605C on light, #5BB8B0 on dark. Cobalt #354CEF is reserved for marketing surfaces.' },
		{ kind: 'dont' as const, text: 'Don\'t skew, rotate, drop-shadow, gradient-fill, or otherwise modify the wordmark.' },
		{ kind: 'dont' as const, text: 'Don\'t place the wordmark on busy photography or low-contrast surfaces.' },
		{ kind: 'dont' as const, text: 'Don\'t use the wordmark inside other company names, on merchandise, or in modified marks.' }
	];
</script>

<svelte:head><title>Logo — Brand — Dashbook</title></svelte:head>

<InnerPage section="/brand" wide>
	<PageHeader
		label="Brand / Logo"
		title="Logo."
		lede="The dash.fi wordmark and app icon. Provided as SVG with high-resolution PNG fallbacks. Royalty-free for editorial use under the trademark policy below."
	/>

	<Section
		label="Wordmark"
		note="Cobalt is the historical marketing color (visible in the brand book). The product surface uses jade. When in doubt, jade is the default."
	>
		<div class="grid">
			{#each variants as v (v.name)}
				<div class="cell" style:--logo-bg={v.bg} style:--logo-fg={v.fg}>
					<div class="canvas" style:background={v.bg} style:color={v.fg}>
						<LogoMark variant="wordmark" class="mark" accent={v.accent ?? null} />
					</div>
					<div class="caption">
						<span class="name">{v.name}</span>
						<span class="hex tabular-nums">{(v.accent ?? v.fg).toUpperCase()}</span>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="App icon" note="Used as favicon, app launcher, social avatar. Square 36px corner radius — the only place radii deviate from the architectural zero stance.">
		<div class="grid icon-grid">
			{#each appIconVariants as v (v.name)}
				<div class="cell">
					<div class="canvas" style:background={v.bg}>
						<div style:--app-icon-glyph={v.glyph} style:color={v.fg} class="icon-wrap">
							<LogoMark variant="app" class="icon" accent={v.accent ?? null} />
						</div>
					</div>
					<div class="caption">
						<span class="name">{v.name}</span>
						<span class="hex tabular-nums">{(v.accent ?? v.fg).toUpperCase()}</span>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Clearspace" note="Maintain 2 dots of clearspace around the wordmark in all directions. The dot in '.fi' is the unit.">
		<div class="clearspace-canvas">
			<div class="clearspace-grid">
				<div class="cs-frame">
					<div class="cs-mark">
						<LogoMark variant="wordmark" class="mark" />
					</div>
					<div class="cs-guide top"></div>
					<div class="cs-guide right"></div>
					<div class="cs-guide bottom"></div>
					<div class="cs-guide left"></div>
				</div>
			</div>
			<p class="cs-note">The dotted guides indicate the minimum clearspace — never tighter than this.</p>
		</div>
	</Section>

	<Section label="Download · Wordmark" note="Configure color, size, format. SVG is canonical; PNG/JPG rasterized client-side via canvas. Bundle .zip ships every preset at 256 / 512 / 1024 px.">
		<AssetConfigurator kind="wordmark" />
	</Section>

	<Section label="Download · App icon" note="Same configurator, square geometry. Use the cobalt variant for marketing surfaces.">
		<AssetConfigurator kind="app" />
	</Section>

	<Section label="Do · Don't">
		<DoDontGrid items={dos} />
	</Section>

	<Section label="Trademark policy">
		<div class="legal">
			<p>
				The dash.fi wordmark and app icon are trademarks of Dash.fi. They may be used for editorial
				coverage, partner co-branding (per the partner kit), and customer-facing references to the
				product, as long as they remain visually unmodified and clearspace is honored.
			</p>
			<p>
				They may <strong>not</strong> be used to imply endorsement, in another company's name, on
				merchandise, or in any modified form.
			</p>
		</div>
	</Section>
</InnerPage>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.cell {
		display: flex;
		flex-direction: column;
		background: var(--bg);
	}
	.canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 160px;
		padding: 32px;
	}
	.canvas :global(.mark) {
		width: 140px;
		height: auto;
		display: block;
	}
	.icon-grid .canvas {
		min-height: 200px;
	}
	.icon-wrap :global(.icon) {
		width: 96px;
		height: 96px;
		display: block;
	}
	.caption {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;
		border-top: 1px solid var(--border);
		font-size: 12px;
	}
	.name {
		font-family: var(--font-sans);
		color: var(--fg);
	}
	.hex {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
		letter-spacing: -0.01em;
	}
	.clearspace-canvas {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 48px;
		border: 1px solid var(--border);
	}
	.clearspace-grid {
		display: flex;
		justify-content: center;
		padding: 64px;
	}
	.cs-frame {
		position: relative;
		display: inline-block;
		padding: 32px;
	}
	.cs-mark {
		color: var(--brand);
	}
	.cs-mark :global(.mark) {
		width: 240px;
		height: auto;
		display: block;
	}
	.cs-guide {
		position: absolute;
		border: 1px dashed var(--input-border);
	}
	.cs-guide.top {
		top: 0;
		left: 32px;
		right: 32px;
		height: 32px;
		border-bottom: 1px dashed var(--input-border);
		border-top: 0;
		border-left: 0;
		border-right: 0;
	}
	.cs-guide.bottom {
		bottom: 0;
		left: 32px;
		right: 32px;
		height: 32px;
		border-top: 1px dashed var(--input-border);
		border-bottom: 0;
		border-left: 0;
		border-right: 0;
	}
	.cs-guide.left {
		left: 0;
		top: 32px;
		bottom: 32px;
		width: 32px;
		border-right: 1px dashed var(--input-border);
		border-top: 0;
		border-bottom: 0;
		border-left: 0;
	}
	.cs-guide.right {
		right: 0;
		top: 32px;
		bottom: 32px;
		width: 32px;
		border-left: 1px dashed var(--input-border);
		border-top: 0;
		border-bottom: 0;
		border-right: 0;
	}
	.cs-note {
		font-size: 13px;
		line-height: 1.6;
		color: var(--fg-muted);
		text-align: center;
	}
	.legal {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 720px;
	}
	.legal p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
</style>
