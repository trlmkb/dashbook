<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { twoColSlide as spec } from '$specs/marketing/patterns/two-col-slide';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="two-col">
				<div class="copy">
					<p class="eyebrow">Audit</p>
					<h2 class="display">Every line, <span class="accent">checked</span></h2>
					<p class="lede">We parse each invoice against the contract the moment it lands.</p>
				</div>
				<div class="media"><span class="mlabel">media</span></div>
			</div>
			<div class="two-col reversed">
				<div class="copy">
					<p class="eyebrow">Recover</p>
					<h2 class="display">Disputes, <span class="accent">filed for you</span></h2>
					<p class="lede">Overcharges are queued and submitted automatically.</p>
				</div>
				<div class="media"><span class="mlabel">media</span></div>
			</div>
		</div>
		<p class="cap">Two stacked rows with alternating <code>reverse</code> — the workhorse copy↔media rhythm.</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.two-col {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 48px;
		align-items: center;
	}
	.two-col.reversed .copy {
		order: 2;
	}
	@media (max-width: 720px) {
		.two-col {
			grid-template-columns: minmax(0, 1fr);
			gap: 24px;
		}
		.two-col.reversed .copy {
			order: 0;
		}
	}
	.copy {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.display {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		font-size: clamp(1.5rem, 3.5vw, 2.25rem);
		line-height: 1.05;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong);
	}
	.display .accent {
		color: var(--m-accent);
	}
	.lede {
		margin: 0;
		font-size: 15px;
		line-height: 1.55;
		color: var(--m-fg-muted);
	}
	.media {
		display: grid;
		place-items: center;
		min-height: 140px;
		background: var(--m-card);
		border: 1px solid var(--m-border);
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
	}
	.mlabel {
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--m-fg-subtle);
	}
	.cap {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
	}
	.cap code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 5px;
	}
</style>
