<script lang="ts">
	/**
	 * Hero block — prop-driven, authored from the `hero` marketing spec.
	 * Styled with the `--m-*` token layer so it renders on-brand in the canvas.
	 * Self-contained section band (bg + padding) so it stacks as a real section.
	 */
	import { bandBg, isDarkBand } from './band';
	import Editable from '../Editable.svelte';

	let {
		background = 'surface',
		eyebrow = 'Shipping',
		heading = 'Spend less on',
		accent = 'every parcel',
		lede = 'Audit every carrier invoice automatically. Recover what you overpaid.',
		primaryLabel = 'Start a pilot',
		secondaryLabel = 'How it works'
	}: {
		background?: string;
		eyebrow?: string;
		heading?: string;
		accent?: string;
		lede?: string;
		primaryLabel?: string;
		secondaryLabel?: string;
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	<header class="hero">
		<p class="eyebrow"><Editable field="eyebrow" value={eyebrow} /></p>
		<h1 class="display">
			<Editable field="heading" value={heading} />&nbsp;<Editable
				field="accent"
				value={accent}
				class="accent"
			/>
		</h1>
		{#if lede}<p class="lede">{lede}</p>{/if}
		{#if primaryLabel || secondaryLabel}
			<div class="cta">
				{#if primaryLabel}
					<span class="m-btn" data-variant="accent">{primaryLabel}</span>
				{/if}
				{#if secondaryLabel}
					<span class="m-btn" data-variant="outline">{secondaryLabel}</span>
				{/if}
			</div>
		{/if}
	</header>
</section>

<style>
	.band {
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
	.display :global(.accent) {
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
