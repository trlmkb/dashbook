<script lang="ts">
	/** Dark CTA band — the jade-glow closer. Always dark; no background prop. CTAs. */
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Editable from '../Editable.svelte';

	let {
		eyebrow = 'Apply now',
		heading = 'Keep more of',
		accent = 'every dollar',
		lede = 'Apply in minutes. No personal guarantee, no platform fee, and up to 3% cash back.',
		primaryLabel = 'Apply now',
		secondaryLabel = 'Book a demo'
	}: {
		eyebrow?: string;
		heading?: string;
		accent?: string;
		lede?: string;
		primaryLabel?: string;
		secondaryLabel?: string;
	} = $props();
</script>

<section class="band">
	<p class="eyebrow"><Editable field="eyebrow" value={eyebrow} /></p>
	<h2>
		<Editable field="heading" value={heading} />&nbsp;<Editable
			field="accent"
			value={accent}
			class="accent"
		/>.
	</h2>
	{#if lede}<p class="lede">{lede}</p>{/if}
	{#if primaryLabel || secondaryLabel}
		<div class="actions">
			{#if primaryLabel}
				<span class="btn-primary">{primaryLabel} <ArrowRight size={14} /></span>
			{/if}
			{#if secondaryLabel}<span class="btn-ghost">{secondaryLabel}</span>{/if}
		</div>
	{/if}
</section>

<style>
	.band {
		--accent: #5bb8b0;
		background: radial-gradient(
			ellipse 80% 70% at 50% 100%,
			var(--m-jade-deep) 0%,
			hsl(176 56% 8%) 70%
		);
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
	h2 :global(.accent) {
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
		border-radius: 10px;
		padding: 12px 20px;
		font-weight: 600;
	}
	.btn-ghost {
		display: inline-flex;
		align-items: center;
		background: transparent;
		color: #faf9f5;
		border: 1px solid rgba(234, 230, 219, 0.2);
		border-radius: 10px;
		padding: 12px 20px;
	}
</style>
