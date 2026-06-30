<script lang="ts">
	/** Split CTA — copy unit on the left, action column (buttons + chips) on the right. */
	import { bandBg, isDarkBand } from './band';
	import Editable from '../Editable.svelte';

	type Chip = { label?: string };

	let {
		background = 'cream',
		eyebrow = 'Get started',
		heading = 'Stop overpaying on',
		accent = 'shipping',
		lede = 'Connect your carriers in minutes. We audit the rest.',
		primaryLabel = 'Start a pilot',
		secondaryLabel = 'Talk to us',
		chips = [{ label: 'No setup fee' }, { label: '14-day pilot' }]
	}: {
		background?: string;
		eyebrow?: string;
		heading?: string;
		accent?: string;
		lede?: string;
		primaryLabel?: string;
		secondaryLabel?: string;
		chips?: Chip[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	<div class="split">
		<header class="copy">
			<p class="eyebrow"><Editable field="eyebrow" value={eyebrow} /></p>
			<h2 class="display">
				<Editable field="heading" value={heading} />&nbsp;<Editable
					field="accent"
					value={accent}
					class="accent"
				/>
			</h2>
			{#if lede}<p class="lede">{lede}</p>{/if}
		</header>
		<div class="action">
			{#if primaryLabel || secondaryLabel}
				<div class="btns">
					{#if primaryLabel}<span class="m-btn" data-variant="accent">{primaryLabel}</span>{/if}
					{#if secondaryLabel}<span class="m-btn" data-variant="outline">{secondaryLabel}</span>{/if}
				</div>
			{/if}
			{#if chips.length}
				<div class="chips">
					{#each chips as chip, i (i)}
						<span class="m-chip">{chip.label}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.band {
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
	.display :global(.accent) {
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
