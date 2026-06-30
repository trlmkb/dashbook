<script lang="ts">
	/** Testimonial — a single centered quote with attribution. Proof. */
	import { bandBg, isDarkBand } from './band';

	let {
		background = 'surface',
		quote = 'Dash.fi found refunds three carriers had quietly written off.',
		name = 'Maya Rivera',
		role = 'VP Logistics, Northwind'
	}: {
		background?: string;
		quote?: string;
		name?: string;
		role?: string;
	} = $props();
</script>

<section
	class="band"
	style:background={bandBg(background)}
	data-marketing-dark={isDarkBand(background) ? '' : undefined}
>
	<figure class="qc">
		<blockquote class="qc-quote">{quote}</blockquote>
		<figcaption class="qc-cap">
			<span class="qc-name">{name}</span>
			<span class="qc-role">{role}</span>
		</figcaption>
	</figure>
</section>

<style>
	.band {
		padding: clamp(40px, 7vw, 72px) 32px;
	}
	.qc {
		max-width: 32ch;
		margin: 0 auto;
		text-align: center;
	}
	.qc-quote {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(22px, 3vw, 32px);
		line-height: 1.3;
		letter-spacing: -0.01em;
		color: var(--m-fg-strong);
	}
	.qc-cap {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: 24px;
	}
	.qc-name {
		color: var(--m-fg-strong);
		font-weight: 600;
		font-size: 15px;
	}
	.qc-role {
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--m-fg-muted);
	}
</style>
