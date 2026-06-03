<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { centeredHero as spec } from '$specs/marketing/patterns/centered-hero';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo" data-marketing-dark>
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
		<p class="cap">Shown on the ink band — the accent lifts to <code>#5BB8B0</code> automatically.</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-near-black);
		border: 1px solid var(--m-border);
		padding: 72px 40px;
	}
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 18px;
		max-width: 40ch;
		margin: 0 auto;
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
		font-size: clamp(2.5rem, 6vw, 4rem);
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
		justify-content: center;
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
		text-decoration: none;
		transition: transform 150ms var(--easing-out);
	}
	.m-btn:active {
		transform: scale(0.97);
	}
	.m-btn[data-variant='accent'] {
		background: var(--m-accent);
		color: #06201d;
	}
	.m-btn[data-variant='outline'] {
		background: transparent;
		border: 1px solid var(--m-border-strong);
		color: var(--m-fg-strong);
	}
	.cap {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
	}
	.cap code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 5px;
	}
</style>
