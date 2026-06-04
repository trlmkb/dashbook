<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { ctaSection as spec } from '$specs/marketing/patterns/cta-section';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo" data-marketing-dark>
			<div class="cta">
				<h2 class="display">Ready when <span class="accent">you are</span></h2>
				<p class="lede">Connect your carriers and see your first audit in a day.</p>
				<div class="btns">
					<button type="button" class="m-btn" data-variant="accent">Start a pilot</button>
					<button type="button" class="m-btn" data-variant="outline">Book a demo</button>
				</div>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-near-black);
		border: 1px solid var(--m-border);
		padding: 72px 40px;
	}
	.cta {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
		max-width: 40ch;
		margin: 0 auto;
	}
	.display {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		font-size: clamp(2rem, 5vw, 3.25rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong);
	}
	.display .accent {
		color: var(--m-accent);
	}
	.lede {
		margin: 0;
		font-size: 16px;
		line-height: 1.55;
		color: var(--m-fg-muted);
	}
	.btns {
		display: flex;
		gap: 12px;
		margin-top: 6px;
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
</style>
