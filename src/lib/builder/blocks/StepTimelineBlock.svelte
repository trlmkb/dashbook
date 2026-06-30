<script lang="ts">
	/** Step timeline — vertical numbered steps with a connecting line. Content. */
	import { bandBg, isDarkBand } from './band';

	type Step = { title?: string; body?: string };

	let {
		background = 'surface',
		eyebrow = 'How it works',
		steps = [
			{ title: 'Connect', body: 'Link your carrier accounts in a few minutes.' },
			{ title: 'Audit', body: 'Every invoice is checked against your contract automatically.' },
			{ title: 'Recover', body: 'We file the claims and track each credit back to your account.' }
		]
	}: {
		background?: string;
		eyebrow?: string;
		steps?: Step[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
	<ol class="step-timeline">
		{#each steps as step, i (i)}
			<li class="step">
				<span class="node">{i + 1}</span>
				<div class="body">
					<h3>{step.title}</h3>
					<p>{step.body}</p>
				</div>
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
	.step-timeline {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 28px;
	}
	.step {
		position: relative;
		display: grid;
		grid-template-columns: 36px minmax(0, 1fr);
		gap: 16px;
		align-items: start;
	}
	.step::before {
		content: '';
		position: absolute;
		left: 17px;
		top: 36px;
		bottom: -28px;
		width: 1px;
		background: var(--m-border);
	}
	.step:last-child::before {
		display: none;
	}
	.node {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		border-radius: 999px;
		background: var(--m-accent-soft);
		border: 1px solid var(--m-accent-border);
		color: var(--m-accent);
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		font-size: 14px;
	}
	.body h3 {
		margin: 0 0 6px;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: 18px;
		color: var(--m-fg-strong);
	}
	.body p {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--m-fg-muted);
	}
</style>
