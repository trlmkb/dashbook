<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { bigQuote as spec } from '$specs/marketing/patterns/big-quote';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo cream">
			<figure class="big-quote">
				<span class="mark" aria-hidden="true">&ldquo;</span>
				<blockquote>
					We recovered $300M+ in overcharges without opening a single dispute ourselves.
				</blockquote>
				<figcaption>
					<span class="who">Dana Ortiz</span>
					<span class="role">VP Finance, Northwind Freight</span>
				</figcaption>
			</figure>
			<span class="tag">cream</span>
		</div>
		<div class="demo ink" data-marketing-dark>
			<figure class="big-quote">
				<span class="mark" aria-hidden="true">&ldquo;</span>
				<blockquote>
					We recovered $300M+ in overcharges without opening a single dispute ourselves.
				</blockquote>
				<figcaption>
					<span class="who">Dana Ortiz</span>
					<span class="role">VP Finance, Northwind Freight</span>
				</figcaption>
			</figure>
			<span class="tag">ink · [data-marketing-dark]</span>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		position: relative;
		border: 1px solid var(--m-border);
		padding: 64px 40px;
	}
	.demo.cream {
		background: var(--m-cream);
	}
	.demo.ink {
		background: var(--m-near-black);
	}
	.tag {
		position: absolute;
		top: 10px;
		right: 12px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.big-quote {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 24px;
		max-width: 28ch;
		margin-inline: auto;
	}
	.mark {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 4rem;
		line-height: 0.6;
		color: var(--m-accent);
	}
	blockquote {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(1.75rem, 4vw, 3rem);
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong);
	}
	figcaption {
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-size: 14px;
		color: var(--m-fg-muted);
	}
	.who {
		color: var(--m-fg-strong);
	}
	.role {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
</style>
