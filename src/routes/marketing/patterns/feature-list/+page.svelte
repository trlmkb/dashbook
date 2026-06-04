<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import Check from '@lucide/svelte/icons/check';
	import { featureList as spec } from '$specs/marketing/patterns/feature-list';

	const items = [
		{ title: 'Duplicate-charge detection', desc: 'Flags the same parcel billed twice.' },
		{ title: 'Late-delivery refunds', desc: 'Claims the credit when a guarantee is missed.' },
		{ title: 'Dimensional-weight checks', desc: 'Catches inflated DIM pricing on every parcel.' },
		{ title: 'Surcharge monitoring', desc: 'Watches accessorials against your agreed rates.' },
		{ title: 'Address-correction audit', desc: 'Disputes correction fees on valid addresses.' },
		{ title: 'Contract-rate enforcement', desc: 'Holds carriers to the price you negotiated.' },
		{ title: 'Weekly recovery summary', desc: 'One digest of every credit filed and won.' }
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<ul class="feature-list">
				{#each items as item (item.title)}
					<li class="row">
						<span class="icon" aria-hidden="true"><Check size={20} /></span>
						<div class="text">
							<span class="title">{item.title}</span>
							<span class="desc">{item.desc}</span>
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="demo" data-marketing-dark>
			<ul class="feature-list">
				{#each items.slice(0, 4) as item (item.title)}
					<li class="row">
						<span class="icon" aria-hidden="true"><Check size={20} /></span>
						<div class="text">
							<span class="title">{item.title}</span>
							<span class="desc">{item.desc}</span>
						</div>
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
		padding: 32px 40px;
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
	.feature-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.row {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 12px;
		align-items: start;
		padding: 13px 0;
	}
	.row + .row {
		border-top: 1px solid var(--m-border);
	}
	.icon {
		display: inline-flex;
		color: var(--m-positive);
		margin-top: 1px;
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.title {
		font-size: 15px;
		font-weight: 500;
		color: var(--m-fg-strong);
	}
	.desc {
		font-size: 14px;
		line-height: 1.5;
		color: var(--m-fg-muted);
	}
</style>
