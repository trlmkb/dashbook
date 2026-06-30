<script lang="ts">
	/** Section intro — eyebrow + display heading (with accent) + lede. Connective tissue. */
	import { bandBg, isDarkBand } from './band';
	import Editable from '../Editable.svelte';

	let {
		background = 'surface',
		eyebrow = 'Shipping',
		heading = 'Spend less on',
		accent = 'every parcel',
		lede = 'Audit every carrier invoice automatically. Recover what you overpaid — no spreadsheet, no dispute queue.'
	}: {
		background?: string;
		eyebrow?: string;
		heading?: string;
		accent?: string;
		lede?: string;
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	<header class="intro">
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
</section>

<style>
	.band {
		padding: 56px 40px;
	}
	.intro {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 60ch;
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
</style>
