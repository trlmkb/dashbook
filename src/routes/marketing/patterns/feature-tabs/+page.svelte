<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { featureTabs as spec } from '$specs/marketing/patterns/feature-tabs';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="tablist" role="tablist" aria-label="Feature tabs (static illustration)">
				<span class="tab active" role="tab" aria-selected="true">
					Audit
					<span class="fill"></span>
				</span>
				<span class="tab" role="tab" aria-selected="false">Recover</span>
				<span class="tab" role="tab" aria-selected="false">Report</span>
			</div>
			<div class="panel" role="tabpanel">
				<p class="panel-eyebrow">Audit</p>
				<p class="panel-body">
					Every carrier invoice is parsed and checked against the contract the moment it lands.
				</p>
			</div>
		</div>
		<p class="cap">
			Static snapshot — the active pill fills left→right while it auto-rotates. The fill duration
			must equal the JS advance interval (see Recipe).
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 32px;
	}
	.tablist {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.tab {
		position: relative;
		overflow: hidden;
		padding: 8px 16px;
		border-radius: 999px;
		border: 1px solid var(--m-border);
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--m-fg-muted);
		background: transparent;
	}
	.tab.active {
		color: var(--m-fg-strong);
		border-color: var(--m-accent-border);
	}
	.fill {
		position: absolute;
		inset: 0 auto 0 0;
		width: 62%;
		background: var(--m-accent-soft);
		z-index: -1;
	}
	.panel {
		margin-top: 24px;
		padding: 20px;
		background: var(--m-card);
		border: 1px solid var(--m-border);
	}
	.panel-eyebrow {
		margin: 0 0 6px;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 10px;
		color: var(--m-accent);
	}
	.panel-body {
		margin: 0;
		font-size: 15px;
		line-height: 1.55;
		color: var(--m-fg-muted);
		max-width: 60ch;
	}
	.cap {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 60ch;
	}
</style>
