<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import Wordmark from '$chrome/Wordmark.svelte';
	import { dashfiWordmark as spec } from '$specs/marketing/patterns/dashfi-wordmark';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="grid">
			<div class="demo">
				<Wordmark size="lg" />
				<span class="tag">paper band</span>
			</div>
			<div class="demo" data-marketing-dark>
				<Wordmark size="lg" />
				<span class="tag">[data-marketing-dark]</span>
			</div>
		</div>
		<p class="cap">
			The canonical <code>$chrome/Wordmark.svelte</code> rendered on a paper band and an ink band to show
			colourways — the dot tracks the brand accent on each surface. The mark is a single-source asset
			fetched via <code>marketing_get_logo</code>; it is never hand-drawn or retyped.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 16px;
	}
	.demo {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 140px;
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
		color: var(--m-fg-strong);
	}
	/* Token-driven: lift the wordmark dot to the marketing dark accent on the ink band. */
	.demo[data-marketing-dark] {
		--brand: var(--m-accent);
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
