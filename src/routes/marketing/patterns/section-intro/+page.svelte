<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { sectionIntro as spec } from '$specs/marketing/patterns/section-intro';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<header class="section-intro">
				<p class="eyebrow">Shipping</p>
				<h2 class="display">Spend less on <span class="accent">every parcel</span></h2>
				<p class="lede">
					Audit every carrier invoice automatically. Recover what you overpaid — no spreadsheet,
					no dispute queue.
				</p>
			</header>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 56px 40px;
	}
	.section-intro {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 60ch;
	}
	.eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.display {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		font-size: clamp(2.25rem, 5vw, 3.75rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong);
	}
	.display .accent {
		color: var(--m-accent);
	}
	.lede {
		margin: 0;
		font-size: 17px;
		line-height: 1.6;
		color: var(--m-fg-muted);
	}
</style>
