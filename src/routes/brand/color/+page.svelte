<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	const story = [
		{
			role: 'Surface',
			color: 'Cream',
			hex: '#FAF8F1',
			body: 'Warm-neutral. The default product canvas. Cream over pure white — softer, more architectural.'
		},
		{
			role: 'Ink',
			color: 'Jade-deep',
			hex: '#123B39',
			body: 'Body text on light. Deep jade carries weight without being aggressive.'
		},
		{
			role: 'Brand',
			color: 'Jade',
			hex: '#2B605C',
			body: 'The single product accent. Used for focus, primary affordances, and the dot in dash.fi.'
		},
		{
			role: 'Marketing',
			color: 'Cobalt',
			hex: '#354CEF',
			body: 'The brand book. Decks, billboards, marketing surfaces. Never appears in product UI.'
		},
		{
			role: 'Highlight',
			color: 'Electric yellow',
			hex: '#EBFF00',
			body: 'Sparing. One element per surface, no exceptions. Pulls focus — never decoration.'
		}
	];

	const dos = [
		{ kind: 'do' as const, text: 'Use jade as the only accent in product UI. Cobalt and yellow are reserved for marketing surfaces.' },
		{ kind: 'do' as const, text: 'Pair cream surfaces with deep-jade ink. Pair near-black surfaces with white ink.' },
		{ kind: 'do' as const, text: 'Treat destructive as monochrome — black on light, white on dark. Restraint is the trust signal.' },
		{ kind: 'dont' as const, text: 'Don\'t mix product jade and marketing cobalt in the same surface — choose one register.' },
		{ kind: 'dont' as const, text: 'Don\'t use yellow as a background, button color, or for body text. Highlight only.' },
		{ kind: 'dont' as const, text: 'Don\'t reach for red destructive. The system is monochrome on purpose.' }
	];
</script>

<svelte:head><title>Color — Brand — Dashbook</title></svelte:head>

<InnerPage section="/brand" wide>
	<PageHeader
		label="Brand / Color"
		title="Color."
		lede="One brand accent — deep jade. Warm-neutral surfaces. The marketing palette adds cobalt and yellow but never appears in product UI. Restraint is the brand."
	/>

	<Section label="The story">
		<div class="story">
			{#each story as s (s.role)}
				<div class="story-row">
					<div class="story-swatch" style:background={s.hex}></div>
					<div class="story-meta">
						<div class="story-name">
							<span class="role">{s.role}</span>
							<span class="color">{s.color}</span>
							<span class="hex tabular-nums">{s.hex}</span>
						</div>
						<p>{s.body}</p>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section
		label="Two registers"
		note="The product palette and marketing palette do not mix. The product is restrained; the marketing is expressive. Both share jade as a connective thread."
	>
		<div class="registers">
			<div class="register product">
				<div class="reg-head">
					<span class="reg-label">Product</span>
					<span class="reg-tag">Restraint</span>
				</div>
				<div class="reg-body">
					<p>
						Cream surface. Jade-deep ink. Jade brand accent. Hairline borders. No gradients, no
						shadows, no rounded corners. Architectural.
					</p>
				</div>
			</div>
			<div class="register marketing">
				<div class="reg-head">
					<span class="reg-label">Marketing</span>
					<span class="reg-tag">Expression</span>
				</div>
				<div class="reg-body">
					<p>
						Cobalt foreground. Radial gradients. Yellow highlight. Vector-map and morse-code
						motifs. Reserved for decks, billboards, hero surfaces, the auth screen.
					</p>
				</div>
			</div>
		</div>
	</Section>

	<Section label="Do · Don't">
		<DoDontGrid items={dos} />
	</Section>

	<a class="see-tokens" href="/foundations/color">
		<span>
			<span class="see-label">Foundations / Color</span>
			<span class="see-title">See every token, in light and dark</span>
		</span>
		<ArrowUpRight size={16} strokeWidth={1.5} />
	</a>
</InnerPage>

<style>
	.story {
		display: flex;
		flex-direction: column;
	}
	.story-row {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 24px;
		padding: 24px 0;
		border-top: 1px solid var(--border);
		align-items: flex-start;
	}
	.story-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.story-swatch {
		width: 80px;
		height: 80px;
		border: 1px solid var(--border);
	}
	.story-name {
		display: flex;
		gap: 16px;
		align-items: baseline;
		margin-bottom: 8px;
	}
	.role {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.color {
		font-size: 17px;
		font-weight: 500;
		color: var(--fg);
	}
	.hex {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
		letter-spacing: -0.01em;
	}
	.story-row p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg-muted);
		max-width: 600px;
	}
	.registers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.register {
		padding: 32px;
		min-height: 220px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.product {
		background: #faf8f1;
		color: #123b39;
	}
	.marketing {
		background: var(--gradient-jade);
		color: #ebede4;
	}
	.reg-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.reg-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		opacity: 0.72;
	}
	.reg-tag {
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.01em;
	}
	.reg-body p {
		font-size: 17px;
		line-height: 1.5;
	}
	.see-tokens {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding: 24px 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		text-decoration: none;
		color: var(--fg);
		transition: color 150ms;
	}
	.see-tokens:hover {
		color: var(--brand);
	}
	.see-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 4px;
	}
	.see-title {
		display: block;
		font-size: 17px;
		font-weight: 500;
	}
	@media (max-width: 720px) {
		.registers {
			grid-template-columns: 1fr;
		}
	}
</style>
