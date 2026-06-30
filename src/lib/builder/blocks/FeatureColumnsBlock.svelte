<script lang="ts">
	/** Feature columns — N icon + heading + body columns with dividers. Content. */
	import { bandBg, isDarkBand } from './band';
	import { getIcon } from './icons';

	type Col = { icon?: string; heading?: string; body?: string };

	let {
		background = 'surface',
		eyebrow = 'How it works',
		columns = [
			{ icon: 'plug', heading: 'Connect', body: 'Link UPS, FedEx, and DHL in a couple of minutes — invoices flow in on their own.' },
			{ icon: 'scan-line', heading: 'Audit', body: 'Every charge is read against your negotiated contract, line by line, automatically.' },
			{ icon: 'coins', heading: 'Recover', body: 'We file each claim and track the credit back to your statement, no spreadsheet.' }
		]
	}: {
		background?: string;
		eyebrow?: string;
		columns?: Col[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
	<ul class="feature-cols" data-dividers>
		{#each columns as col, i (i)}
			{@const Icon = getIcon(col.icon ?? 'plug')}
			<li class="col">
				<span class="icon" aria-hidden="true"><Icon size={28} /></span>
				<h3 class="heading">{col.heading}</h3>
				<p class="body">{col.body}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.band {
		padding: 48px 40px;
	}
	.eyebrow {
		margin: 0 0 28px;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.feature-cols {
		display: grid;
		gap: 40px;
		list-style: none;
		margin: 0;
		padding: 0;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
	.col {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.feature-cols[data-dividers] .col + .col {
		border-left: 1px solid var(--m-border);
		padding-left: 40px;
	}
	@media (max-width: 720px) {
		.feature-cols[data-dividers] .col + .col {
			border-left: 0;
			padding-left: 0;
		}
	}
	.icon {
		color: var(--m-accent);
	}
	.heading {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		font-size: 17px;
		line-height: 1.1;
		color: var(--m-fg-strong);
	}
	.body {
		margin: 0;
		font-size: 15px;
		line-height: 1.6;
		color: var(--m-fg-muted);
	}
</style>
