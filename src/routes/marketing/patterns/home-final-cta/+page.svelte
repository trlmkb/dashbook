<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { homeFinalCta as spec } from '$specs/marketing/patterns/home-final-cta';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo" data-marketing-dark>
			<div class="closer">
				<h2 class="display-xl">Spend less on <span class="accent">everything you ship</span></h2>
				<button type="button" class="m-btn" data-variant="accent">Start a pilot</button>
				<p class="reassure">No setup fee. Cancel anytime.</p>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-near-black);
		border: 1px solid var(--m-border);
		padding: 96px 40px;
	}
	.closer {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 24px;
		max-width: 18ch;
		margin: 0 auto;
	}
	.display-xl {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		font-size: clamp(2.5rem, 8vw, 5rem);
		line-height: 0.98;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong);
	}
	.display-xl .accent {
		color: var(--m-accent);
	}
	.m-btn {
		display: inline-flex;
		align-items: center;
		padding: 14px 24px;
		font-family: var(--font-sans);
		font-size: 16px;
		font-weight: 500;
		border-radius: 6px;
		corner-shape: squircle;
		appearance: none;
		border: 0;
		cursor: pointer;
		background: var(--m-accent);
		color: #06201d;
		transition: transform 150ms var(--easing-out);
	}
	.m-btn:active {
		transform: scale(0.97);
	}
	.reassure {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		color: var(--m-fg-subtle);
	}
</style>
