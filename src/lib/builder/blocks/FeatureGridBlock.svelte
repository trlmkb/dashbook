<script lang="ts">
	/** Feature grid — N cells, each an icon + title + blurb. Content block. */
	import { bandBg, isDarkBand } from './band';
	import { getIcon } from './icons';

	type Cell = { icon?: string; title?: string; blurb?: string };

	let {
		background = 'surface',
		cells = [
			{ icon: 'shield-check', title: 'Invoice audit', blurb: 'Every carrier charge checked against your contract, line by line.' },
			{ icon: 'scan-line', title: 'Duplicate detection', blurb: 'Spots the same parcel billed twice before it leaves your account.' },
			{ icon: 'coins', title: 'Refund recovery', blurb: 'Files the claim and tracks the credit back to your statement.' }
		]
	}: {
		background?: string;
		cells?: Cell[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	<ul class="feature-grid">
		{#each cells as cell, i (i)}
			{@const Icon = getIcon(cell.icon ?? 'shield-check')}
			<li class="cell">
				<span class="icon" aria-hidden="true"><Icon size={20} /></span>
				<h3 class="title">{cell.title}</h3>
				<p class="blurb">{cell.blurb}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.band {
		padding: 48px 40px;
	}
	.feature-grid {
		display: grid;
		gap: 32px;
		list-style: none;
		margin: 0;
		padding: 0;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	}
	.cell {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		corner-shape: squircle;
		background: var(--m-accent-soft);
		color: var(--m-accent);
	}
	.title {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		font-size: 18px;
		line-height: 1.1;
		color: var(--m-fg-strong);
	}
	.blurb {
		margin: 0;
		max-width: 38ch;
		font-size: 15px;
		line-height: 1.6;
		color: var(--m-fg-muted);
	}
</style>
