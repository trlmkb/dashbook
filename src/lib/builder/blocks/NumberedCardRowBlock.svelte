<script lang="ts">
	/** Numbered card row — auto-numbered step cards. Content. */
	import { bandBg, isDarkBand } from './band';

	type Card = { title?: string; body?: string };

	let {
		background = 'surface',
		eyebrow = 'Three steps',
		cards = [
			{ title: 'Connect', body: 'Link your carrier accounts in a few minutes — no engineering work.' },
			{ title: 'Audit', body: 'Every invoice is checked against your contract automatically.' },
			{ title: 'Recover', body: 'We file the claims and track each credit back to your account.' }
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
	<ol class="numbered-card-row">
		{#each cards as card, i (i)}
			<li class="card">
				<span class="index">{String(i + 1).padStart(2, '0')}</span>
				<h3>{card.title}</h3>
				<p>{card.body}</p>
			</li>
		{/each}
	</ol>
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
	.numbered-card-row {
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
	.index {
		display: block;
		font-family: var(--font-mono);
		font-weight: 400;
		font-variant-numeric: tabular-nums;
		font-size: 2.5rem;
		line-height: 1;
		color: var(--m-accent);
	}
	.card h3 {
		margin: 16px 0 8px;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: 18px;
		color: var(--m-fg-strong);
	}
	.card p {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--m-fg-muted);
	}
</style>
