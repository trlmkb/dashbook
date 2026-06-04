<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { slideFrame as spec } from '$specs/marketing/patterns/slide-frame';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="bands">
			<div class="band paper"><span class="lbl">paper · --m-surface</span></div>
			<div class="band cream"><span class="lbl">cream · --m-cream</span></div>
			<div class="band ink" data-marketing-dark>
				<span class="lbl">ink · --m-near-black + [data-marketing-dark]</span>
			</div>
			<div class="band cobalt"><span class="lbl">cobalt · --m-cobalt</span></div>
		</div>
		<p class="cap">
			Stacked bands set the section rhythm. The ink band also carries
			<code>data-marketing-dark</code>, so any child reading <code>--m-*</code> roles re-themes.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.bands {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--m-border);
	}
	.band {
		min-height: 88px;
		display: flex;
		align-items: center;
		padding: 0 28px;
	}
	.lbl {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.paper {
		background: var(--m-surface);
		color: var(--m-fg-strong);
	}
	.cream {
		background: var(--m-cream);
		color: var(--m-fg-strong);
	}
	.ink {
		background: var(--m-near-black);
		color: var(--m-fg-strong);
	}
	.cobalt {
		background: var(--m-cobalt);
		color: #fff;
	}
	.cap {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 60ch;
	}
	.cap code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 5px;
	}
</style>
