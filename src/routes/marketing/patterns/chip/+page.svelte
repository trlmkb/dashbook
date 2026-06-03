<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import Check from '@lucide/svelte/icons/check';
	import { chip as spec } from '$specs/marketing/patterns/chip';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="row">
				<span class="m-chip" data-tone="positive"><Check size={14} /> Included</span>
				<span class="m-chip" data-tone="accent">Audited</span>
				<span class="m-chip" data-tone="warn">Review needed</span>
				<span class="m-chip" data-tone="negative">Overcharge</span>
			</div>
		</div>
		<div class="demo" data-marketing-dark>
			<div class="row">
				<span class="m-chip" data-tone="positive"><Check size={14} /> Included</span>
				<span class="m-chip" data-tone="accent">Audited</span>
				<span class="m-chip" data-tone="warn">Review needed</span>
				<span class="m-chip" data-tone="negative">Overcharge</span>
			</div>
			<span class="tag">[data-marketing-dark]</span>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		position: relative;
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.row {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
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
	.m-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 11px;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1;
		background: var(--m-accent-soft);
		border: 1px solid var(--m-accent-border);
		color: var(--m-accent);
	}
	.m-chip[data-tone='positive'] {
		background: var(--m-positive-soft);
		border-color: var(--m-positive-border);
		color: var(--m-positive);
	}
	.m-chip[data-tone='warn'] {
		background: var(--m-warn-soft);
		border-color: var(--m-warn-border);
		color: var(--m-warn);
	}
	.m-chip[data-tone='negative'] {
		background: var(--m-negative-soft);
		border-color: var(--m-negative-border);
		color: var(--m-negative);
	}
</style>
