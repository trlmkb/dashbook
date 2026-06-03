<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import Plug from '@lucide/svelte/icons/plug';
	import Search from '@lucide/svelte/icons/search';
	import Banknote from '@lucide/svelte/icons/banknote';
	import { featureColumns as spec } from '$specs/marketing/patterns/feature-columns';

	const columns = [
		{
			icon: Plug,
			heading: 'Connect',
			body: 'Link UPS, FedEx, and DHL in a couple of minutes — invoices flow in on their own.'
		},
		{
			icon: Search,
			heading: 'Audit',
			body: 'Every charge is read against your negotiated contract, line by line, automatically.'
		},
		{
			icon: Banknote,
			heading: 'Recover',
			body: 'We file each claim and track the credit back to your statement, no spreadsheet.'
		}
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">How it works</p>
			<ul class="feature-cols" data-dividers>
				{#each columns as col (col.heading)}
					<li class="col">
						<span class="icon" aria-hidden="true"><col.icon size={28} /></span>
						<h3 class="heading">{col.heading}</h3>
						<p class="body">{col.body}</p>
					</li>
				{/each}
			</ul>
		</div>
		<div class="demo" data-marketing-dark>
			<ul class="feature-cols" data-dividers>
				{#each columns as col (col.heading)}
					<li class="col">
						<span class="icon" aria-hidden="true"><col.icon size={28} /></span>
						<h3 class="heading">{col.heading}</h3>
						<p class="body">{col.body}</p>
					</li>
				{/each}
			</ul>
			<span class="tag">[data-marketing-dark]</span>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		position: relative;
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 48px 40px;
	}
	.eyebrow {
		margin: 0 0 28px;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.tag {
		position: absolute;
		top: 10px;
		right: 12px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--m-fg-subtle);
	}
	.feature-cols {
		display: grid;
		gap: 40px;
		list-style: none;
		margin: 0;
		padding: 0;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	@media (max-width: 720px) {
		.feature-cols {
			grid-template-columns: minmax(0, 1fr);
		}
	}
	.col {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.feature-cols[data-dividers] .col + .col {
		border-left: 1px solid var(--m-border);
		padding-left: 40px;
	}
	@media (max-width: 720px) {
		.feature-cols[data-dividers] .col + .col {
			border-left: 0;
			padding-left: 0;
		}
	}
	.icon {
		color: var(--m-accent);
	}
	.heading {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		font-size: 17px;
		line-height: 1.1;
		color: var(--m-fg-strong);
	}
	.body {
		margin: 0;
		font-size: 15px;
		line-height: 1.6;
		color: var(--m-fg-muted);
	}
</style>
