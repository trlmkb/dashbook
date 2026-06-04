<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { hero as spec } from '$specs/marketing/patterns/hero';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<header class="hero">
				<p class="eyebrow">Shipping</p>
				<h1 class="display">Spend less on <span class="accent">every parcel</span></h1>
				<p class="lede">Audit every carrier invoice automatically. Recover what you overpaid.</p>
				<div class="cta">
					<button type="button" class="m-btn" data-variant="accent">Start a pilot</button>
					<button type="button" class="m-btn" data-variant="outline">How it works</button>
				</div>
			</header>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 64px 40px;
	}
	.hero {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 50ch;
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
	.cta {
		display: flex;
		gap: 12px;
		margin-top: 8px;
		flex-wrap: wrap;
	}
	.m-btn {
		display: inline-flex;
		align-items: center;
		padding: 12px 20px;
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 500;
		border-radius: 6px;
		corner-shape: squircle;
		appearance: none;
		border: 0;
		cursor: pointer;
		transition: transform 150ms var(--easing-out);
	}
	.m-btn:active {
		transform: scale(0.97);
	}
	.m-btn[data-variant='accent'] {
		background: var(--m-accent);
		color: var(--m-surface);
	}
	.m-btn[data-variant='outline'] {
		background: transparent;
		border: 1px solid var(--m-border-strong);
		color: var(--m-fg-strong);
	}
</style>
