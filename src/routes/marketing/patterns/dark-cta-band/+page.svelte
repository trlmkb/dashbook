<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { darkCtaBand as spec } from '$specs/marketing/patterns/dark-cta-band';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">Apply now</p>
			<h2>Keep more of <span class="accent">every dollar</span>.</h2>
			<p class="lede">Apply in minutes. No personal guarantee, no platform fee, and up to 3% cash back.</p>
			<div class="actions">
				<button type="button" class="btn-primary">Apply now <ArrowRight size={14} /></button>
				<button type="button" class="btn-ghost">Book a demo</button>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		--accent: #5bb8b0;
		background: radial-gradient(ellipse 80% 70% at 50% 100%, var(--m-jade-deep) 0%, hsl(176 56% 8%) 70%);
		border-radius: 16px;
		padding: clamp(48px, 8vw, 88px) 32px;
		text-align: center;
		color: rgba(234, 230, 219, 0.62);
	}
	.eyebrow {
		margin: 0 0 12px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--accent);
	}
	h2 {
		margin: 0 auto;
		max-width: 18ch;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(28px, 3.6vw, 42px);
		line-height: 1.08;
		letter-spacing: -0.025em;
		color: #fff;
	}
	h2 .accent {
		color: var(--accent);
	}
	.lede {
		margin: 16px auto 0;
		max-width: 46ch;
		font-size: 15px;
		line-height: 1.55;
	}
	.actions {
		display: inline-flex;
		gap: 12px;
		margin-top: 28px;
		flex-wrap: wrap;
		justify-content: center;
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background: #ebede4;
		color: #123b39;
		border: none;
		border-radius: 10px;
		padding: 12px 20px;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}
	.btn-ghost {
		background: transparent;
		color: #faf9f5;
		border: 1px solid rgba(234, 230, 219, 0.2);
		border-radius: 10px;
		padding: 12px 20px;
		font: inherit;
		cursor: pointer;
	}
</style>
