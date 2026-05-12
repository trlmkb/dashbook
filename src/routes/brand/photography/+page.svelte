<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';
	import { FlowLines } from '@dashfi/svelte/ui/flow-lines';

	const dos = [
		{
			kind: 'do' as const,
			text: 'Use SVG illustration for product surfaces — flat, mono-line, or filled with the brand color.'
		},
		{
			kind: 'do' as const,
			text: 'Limit decorative imagery to the auth experience and marketing decks. The product app is opaque and image-free.'
		},
		{
			kind: 'do' as const,
			text: 'When you must use an image: cool monochrome jade or near-black. Studio lighting. Slight grain optional.'
		},
		{
			kind: 'dont' as const,
			text: "Don't use stock photos. No people-with-laptops. No hands-holding-phones. No friendly-team-meeting."
		},
		{
			kind: 'dont' as const,
			text: "Don't use warm color photography, sepia, or grain-heavy filters. The brand reads cool."
		},
		{
			kind: 'dont' as const,
			text: "Don't place full-bleed photography behind product surfaces. Imagery is for marketing only."
		}
	];
</script>

<svelte:head><title>Photography — Brand — Dashbook</title></svelte:head>

<InnerPage section="/brand" wide>
	<PageHeader
		label="Brand / Photography"
		title="Photography."
		lede="The product has none. Marketing surfaces use one signature: the vector map. When imagery is required, it's cool, monochrome, and architectural."
	/>

	<Section
		label="The product position"
		note="Dash.fi's product UI uses no photography. Period. This is intentional — the product earns trust through clarity and number-density, not imagery."
	>
		<div class="position">
			<div class="pos-cell">
				<div class="pos-label">Product</div>
				<div class="pos-canvas pos-product">
					<div class="pos-mock">
						<div class="pos-row pos-stat">$2,408,210</div>
						<div class="pos-row pos-cap">Available · resets midnight UTC</div>
					</div>
				</div>
				<p class="pos-note">No imagery. Numbers, type, and hairline borders carry the surface.</p>
			</div>
			<div class="pos-cell">
				<div class="pos-label">Marketing</div>
				<div class="pos-canvas pos-marketing">
					<FlowLines preset="subtle" class="absolute inset-0 h-full w-full" />
					<div class="pos-mock">
						<div class="pos-row pos-mhero">FASTER<br />THAN LIGHT.</div>
					</div>
				</div>
				<p class="pos-note">Radial jade gradient. The vector map drifts behind. One moment of theater.</p>
			</div>
		</div>
	</Section>

	<Section
		label="The vector map"
		note="Built as a real Svelte component — FlowLines from @dashfi/svelte. Move your cursor across the surface to disturb the field; reduced-motion users get the static gradient. See the component page at /components/flow-lines."
	>
		<div class="map-canvas">
			<FlowLines preset="hero" class="absolute inset-0 h-full w-full" />
		</div>
		<p class="map-note">
			A wind-field topographic line system. Drifts across hero surfaces — never repeated, never
			static. The signal: <em>we move with you</em>. Reserved for marketing-feel surfaces (auth,
			decks, billboards).
		</p>
	</Section>

	<Section label="Imagery rules">
		<DoDontGrid items={dos} />
	</Section>

	<Section label="When you do need imagery">
		<div class="rules">
			<div class="rule">
				<div class="rule-label">Color</div>
				<p>Cool monochrome — jade, ink, near-black. No warm tones. No saturated reds or oranges.</p>
			</div>
			<div class="rule">
				<div class="rule-label">Subject</div>
				<p>Product objects (cards, statements, ledgers). Abstract architecture (lines, grids, light). Never people.</p>
			</div>
			<div class="rule">
				<div class="rule-label">Treatment</div>
				<p>Studio lighting. High contrast. Slight grain optional. Never sepia, never washed out, never filtered.</p>
			</div>
			<div class="rule">
				<div class="rule-label">Format</div>
				<p>SVG when possible. PNG for raster only when the photographic source is irreplaceable. WebP for marketing decks.</p>
			</div>
		</div>
	</Section>
</InnerPage>

<style>
	.position {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}
	.pos-cell {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.pos-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.pos-canvas {
		min-height: 280px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 40px;
		border: 1px solid var(--border);
		overflow: hidden;
		position: relative;
	}
	.pos-product {
		background: var(--bg);
	}
	.pos-marketing {
		background: var(--gradient-jade);
		color: #ebede4;
	}
	.pos-mock {
		display: flex;
		flex-direction: column;
		gap: 12px;
		position: relative;
		z-index: 1;
	}
	.pos-stat {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(2rem, 5vw, 3.25rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--fg);
		font-variant-numeric: tabular-nums;
	}
	.pos-cap {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.pos-mhero {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(2rem, 6vw, 3.5rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		text-transform: uppercase;
	}
	.pos-note {
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
	}
	.map-canvas {
		position: relative;
		border: 1px solid var(--border);
		min-height: 320px;
		height: 320px;
		overflow: hidden;
	}
	.map-note {
		margin-top: 16px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg-muted);
		max-width: 640px;
	}
	.map-note em {
		font-style: italic;
		color: var(--fg);
	}
	.rules {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.rule {
		padding: 24px;
		background: var(--bg);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.rule-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.rule p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
	@media (max-width: 720px) {
		.position {
			grid-template-columns: 1fr;
		}
	}
</style>
