<script lang="ts">
	/** Feature list — checked rows of title + description. Content. */
	import Check from '@lucide/svelte/icons/check';
	import { bandBg, isDarkBand } from './band';

	type Item = { title?: string; desc?: string };

	let {
		background = 'surface',
		items = [
			{ title: 'Duplicate-charge detection', desc: 'Flags the same parcel billed twice.' },
			{ title: 'Late-delivery refunds', desc: 'Claims the credit when a guarantee is missed.' },
			{ title: 'Dimensional-weight checks', desc: 'Catches inflated DIM pricing on every parcel.' },
			{ title: 'Contract-rate enforcement', desc: 'Holds carriers to the price you negotiated.' }
		]
	}: {
		background?: string;
		items?: Item[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	<ul class="feature-list">
		{#each items as item, i (i)}
			<li class="row">
				<span class="icon" aria-hidden="true"><Check size={20} /></span>
				<div class="text">
					<span class="title">{item.title}</span>
					<span class="desc">{item.desc}</span>
				</div>
			</li>
		{/each}
	</ul>
</section>

<style>
	.band {
		padding: 32px 40px;
	}
	.feature-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.row {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 12px;
		align-items: start;
		padding: 13px 0;
	}
	.row + .row {
		border-top: 1px solid var(--m-border);
	}
	.icon {
		display: inline-flex;
		color: var(--m-positive);
		margin-top: 1px;
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.title {
		font-size: 15px;
		font-weight: 500;
		color: var(--m-fg-strong);
	}
	.desc {
		font-size: 14px;
		line-height: 1.5;
		color: var(--m-fg-muted);
	}
</style>
