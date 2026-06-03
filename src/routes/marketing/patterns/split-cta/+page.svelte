<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { splitCta as spec } from '$specs/marketing/patterns/split-cta';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="split">
				<header class="copy">
					<p class="eyebrow">Get started</p>
					<h2 class="display">Stop overpaying on <span class="accent">shipping</span></h2>
					<p class="lede">Connect your carriers in minutes. We audit the rest.</p>
				</header>
				<div class="action">
					<div class="btns">
						<button type="button" class="m-btn" data-variant="accent">Start a pilot</button>
						<button type="button" class="m-btn" data-variant="outline">Talk to us</button>
					</div>
					<div class="chips">
						<span class="m-chip">No setup fee</span>
						<span class="m-chip">14-day pilot</span>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-cream);
		border: 1px solid var(--m-border);
		padding: 48px 40px;
	}
	.split {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: 48px;
		align-items: center;
	}
	@media (max-width: 720px) {
		.split {
			grid-template-columns: minmax(0, 1fr);
			gap: 28px;
		}
	}
	.copy {
		display: flex;
		flex-direction: column;
		gap: 12px;
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
		font-size: clamp(1.75rem, 4vw, 2.75rem);
		line-height: 1.02;
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
	.action {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.btns {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.chips {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.m-chip {
		display: inline-flex;
		align-items: center;
		padding: 4px 10px;
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--m-positive-soft);
		border: 1px solid var(--m-positive-border);
		color: var(--m-positive);
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
		color: #fff;
	}
	.m-btn[data-variant='outline'] {
		background: transparent;
		border: 1px solid var(--m-border-strong);
		color: var(--m-fg-strong);
	}
</style>
