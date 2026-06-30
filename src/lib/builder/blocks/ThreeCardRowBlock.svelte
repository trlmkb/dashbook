<script lang="ts">
	/** Three-card row — eyebrow + N cards (title + body + link). Content. */
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { bandBg, isDarkBand } from './band';

	type Card = { title?: string; body?: string; linkLabel?: string };

	let {
		background = 'surface',
		eyebrow = 'How it works',
		cards = [
			{ title: 'Audit', body: 'Every carrier invoice is checked against the contract the moment it lands.', linkLabel: 'How it works' },
			{ title: 'Recover', body: 'We file the claims and track each credit back to your account.', linkLabel: 'See recoveries' },
			{ title: 'Report', body: 'One ledger of every dispute, refund, and saving across carriers.', linkLabel: 'View reports' }
		]
	}: {
		background?: string;
		eyebrow?: string;
		cards?: Card[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
	<ul class="three-card-row">
		{#each cards as card, i (i)}
			<li class="card">
				<h3>{card.title}</h3>
				<p>{card.body}</p>
				{#if card.linkLabel}
					<span class="link">{card.linkLabel} <ArrowRight size={14} /></span>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	.band {
		padding: 40px;
	}
	.eyebrow {
		margin: 0 0 24px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.three-card-row {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.card {
		background: var(--m-card);
		border: 1px solid var(--m-border);
		border-radius: 16px;
		corner-shape: squircle;
		padding: 28px;
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
	}
	.card h3 {
		margin: 0 0 10px;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: 20px;
		color: var(--m-fg-strong);
	}
	.card p {
		margin: 0 0 18px;
		font-size: 14px;
		line-height: 1.55;
		color: var(--m-fg-muted);
	}
	.link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--m-accent);
	}
</style>
