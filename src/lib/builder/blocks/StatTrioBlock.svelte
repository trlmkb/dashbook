<script lang="ts">
	/** Stat trio — three (or N) big mono numbers with tracked labels. Proof rhythm. */
	import { bandBg, isDarkBand } from './band';

	type Stat = { value?: string; label?: string };

	let {
		background = 'surface',
		stats = [
			{ value: '$300M+', label: 'Overcharges recovered' },
			{ value: '98.4%', label: 'Invoices auto-audited' },
			{ value: '12', label: 'Carriers supported' }
		]
	}: {
		background?: string;
		stats?: Stat[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	<dl class="stat-trio">
		{#each stats as stat, i (i)}
			<div class="stat">
				<dd class="value">{stat.value}</dd>
				<dt class="label">{stat.label}</dt>
			</div>
		{/each}
	</dl>
</section>

<style>
	.band {
		padding: 48px 40px;
	}
	.stat-trio {
		display: grid;
		gap: 24px;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		margin: 0;
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.value {
		margin: 0;
		font-family: var(--font-mono);
		font-weight: 400;
		font-size: clamp(2rem, 5vw, 3.25rem);
		line-height: 1;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
		color: var(--m-accent);
	}
	.label {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
</style>
