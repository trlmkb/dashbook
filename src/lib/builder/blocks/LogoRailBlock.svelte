<script lang="ts">
	/** Logo rail — eyebrow + a row of customer logos (image or text placeholder). Proof. */
	import { bandBg, isDarkBand } from './band';

	type Logo = { label?: string; src?: string };

	let {
		background = 'surface',
		eyebrow = 'Trusted by',
		logos = [
			{ label: 'Northwind' },
			{ label: 'Harbor Co.' },
			{ label: 'Meridian' },
			{ label: 'Atlas' },
			{ label: 'Beacon' }
		]
	}: {
		background?: string;
		eyebrow?: string;
		logos?: Logo[];
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	{#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
	<ul class="rail">
		{#each logos as logo, i (i)}
			<li class="logo">
				{#if logo.src}
					<img src={logo.src} alt={logo.label ?? ''} />
				{:else}
					{logo.label}
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	.band {
		padding: 40px;
		text-align: center;
	}
	.eyebrow {
		margin: 0 0 28px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.rail {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 40px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.logo {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 18px;
		letter-spacing: 0.02em;
		color: var(--m-fg-subtle);
		opacity: 0.7;
	}
	.logo img {
		max-height: 28px;
		width: auto;
		display: block;
	}
</style>
