<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { cosmicHero as spec } from '$specs/marketing/patterns/cosmic-hero';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo" data-marketing-dark>
			<div class="backdrop" aria-hidden="true"></div>
			<div class="content">
				<h1 class="display-xl">Ship at the <span class="accent">speed of light</span></h1>
				<button type="button" class="m-btn">Start a pilot</button>
			</div>
		</div>
		<p class="cap">The glow drifts on a slow ambient loop in production; held static here (reduced-motion-safe).</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		position: relative;
		overflow: hidden;
		background: var(--m-near-black);
		border: 1px solid var(--m-border);
		padding: 96px 40px;
	}
	.backdrop {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(60% 50% at 70% 25%, var(--m-accent), transparent 70%),
			radial-gradient(40% 40% at 20% 90%, var(--m-accent), transparent 70%);
		opacity: 0.22;
		pointer-events: none;
	}
	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 24px;
		max-width: 20ch;
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
		color: var(--m-surface);
		transition: transform 150ms var(--easing-out);
	}
	.m-btn:active {
		transform: scale(0.97);
	}
	.cap {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
	}
</style>
