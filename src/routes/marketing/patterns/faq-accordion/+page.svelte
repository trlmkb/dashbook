<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { faqAccordion as spec } from '$specs/marketing/patterns/faq-accordion';

	const items = [
		{ q: 'Is the parcel audit really free?', a: 'Yes — the audit is free with the card. You only ever pay nothing for it.' },
		{ q: 'How long until the first finding?', a: 'Most accounts see their first flagged overcharge within 48 hours of connecting invoices.' },
		{ q: 'Which carriers are supported?', a: 'UPS and FedEx today, with DHL in beta. Your contract and shipping log are all we need.' },
	];
	let open = $state(0);
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="faq">
			{#each items as item, i (item.q)}
				<div class="row">
					<button class="q" aria-expanded={open === i} onclick={() => (open = open === i ? -1 : i)}>
						<span class="q-text"><span class="marker">Q.</span>{item.q}</span>
						<span class="toggle" class:open={open === i} aria-hidden="true">+</span>
					</button>
					<div class="a" data-open={open === i} aria-hidden={open !== i}>
						<div class="a-inner">
							<span class="marker" aria-hidden="true">A.</span>
							<p>{item.a}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.faq {
		max-width: 640px;
		margin: 0 auto;
	}
	.row + .row {
		border-top: 1px solid var(--m-border, rgba(15, 20, 18, 0.08));
	}
	.q {
		display: flex;
		width: 100%;
		gap: 24px;
		justify-content: space-between;
		align-items: flex-start;
		padding: 22px 0;
		background: none;
		border: 0;
		text-align: left;
		cursor: pointer;
		font: inherit;
	}
	.q-text {
		display: flex;
		gap: 14px;
		color: var(--m-fg-strong, #123b39);
		font-size: 17px;
		font-weight: 600;
		line-height: 1.35;
	}
	.marker {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.22em;
		color: var(--m-accent, #2b605c);
		flex-shrink: 0;
		margin-top: 4px;
	}
	.toggle {
		font-family: var(--font-mono);
		font-size: 20px;
		font-weight: 200;
		line-height: 1;
		color: var(--m-fg-muted, #505148);
		transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
		flex-shrink: 0;
	}
	.toggle.open {
		transform: rotate(45deg);
	}
	.a {
		display: grid;
		grid-template-rows: 0fr;
		overflow: hidden;
		transition: grid-template-rows 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.a[data-open='true'] {
		grid-template-rows: 1fr;
	}
	.a-inner {
		min-height: 0;
		display: flex;
		gap: 14px;
		padding-bottom: 22px;
	}
	.a-inner p {
		margin: 0;
		color: var(--m-fg-muted, #505148);
		font-size: 16px;
		line-height: 1.6;
	}
	@media (prefers-reduced-motion: reduce) {
		.toggle,
		.a {
			transition: none;
		}
	}
</style>
