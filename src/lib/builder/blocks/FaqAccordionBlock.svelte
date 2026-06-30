<script lang="ts">
	/**
	 * FAQ — Q/A list. In the editor it renders static (all answers shown) so it's
	 * cleanly previewable + selectable; the shipped page uses the interactive
	 * accordion variant. Content.
	 */
	import { bandBg, isDarkBand } from './band';

	type QA = { q?: string; a?: string };

	let {
		background = 'surface',
		items = [
			{ q: 'Is the parcel audit really free?', a: 'Yes — the audit is free with the card.' },
			{ q: 'How long until the first finding?', a: 'Most accounts see their first flagged overcharge within 48 hours of connecting invoices.' },
			{ q: 'Which carriers are supported?', a: 'UPS and FedEx today, with DHL in beta.' }
		]
	}: {
		background?: string;
		items?: QA[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	<div class="faq">
		{#each items as item, i (i)}
			<div class="row">
				<div class="q"><span class="marker">Q.</span><span class="q-text">{item.q}</span></div>
				<div class="a"><span class="marker" aria-hidden="true">A.</span><p>{item.a}</p></div>
			</div>
		{/each}
	</div>
</section>

<style>
	.band {
		padding: 48px 40px;
	}
	.faq {
		max-width: 640px;
		margin: 0 auto;
	}
	.row {
		padding: 22px 0;
	}
	.row + .row {
		border-top: 1px solid var(--m-border);
	}
	.q {
		display: flex;
		gap: 14px;
		align-items: flex-start;
	}
	.q-text {
		color: var(--m-fg-strong);
		font-size: 17px;
		font-weight: 600;
		line-height: 1.35;
	}
	.a {
		display: flex;
		gap: 14px;
		margin-top: 12px;
	}
	.a p {
		margin: 0;
		color: var(--m-fg-muted);
		font-size: 16px;
		line-height: 1.6;
	}
	.marker {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.22em;
		color: var(--m-accent);
		flex-shrink: 0;
		margin-top: 4px;
	}
</style>
