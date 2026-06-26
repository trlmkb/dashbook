<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { metricsHero as spec } from '$specs/marketing/patterns/metrics-hero';

	const metrics = [
		{ label: 'Invite → first swipe', value: '<2 min', sub: 'onboard to a controlled card' },
		{ label: 'Unauthorised charges', value: '0', sub: 'blocked before purchase' },
		{ label: 'Visibility', value: 'Real-time', sub: 'every transaction, every team' },
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<section class="mh">
				<div class="mh-copy">
					<span class="mh-eyebrow">Spend management</span>
					<h3 class="mh-title">Every card, every limit, enforced at the swipe.</h3>
					<p class="mh-sub">Give each person the right limit — controlled before purchase, not reconciled after.</p>
					<div class="mh-actions">
						<button class="mh-btn">Get started</button>
						<button class="mh-btn ghost">Book a demo</button>
					</div>
					<ul class="mh-proof">
						<li>No personal guarantee</li>
						<li>Unlimited virtual cards</li>
					</ul>
				</div>
				<div class="mh-panel">
					{#each metrics as m (m.label)}
						<div class="mh-metric">
							<span class="l">{m.label}</span>
							<b class="v">{m.value}</b>
							<span class="s">{m.sub}</span>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: clamp(32px, 5vw, 56px);
	}
	.mh {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: center;
	}
	.mh-eyebrow {
		display: inline-block;
		width: fit-content;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		padding: 3px 6px;
		border-radius: 1px;
		background: var(--m-accent);
		color: #faf9f5;
	}
	.mh-title {
		margin: 16px 0 12px;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(28px, 4vw, 46px);
		line-height: 1.05;
		letter-spacing: -0.02em;
		text-wrap: balance;
		color: var(--m-fg-strong);
	}
	.mh-sub {
		margin: 0 0 22px;
		color: var(--m-fg-muted);
		max-width: 42ch;
	}
	.mh-actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}
	.mh-btn {
		border: 0;
		border-radius: 10px;
		padding: 11px 18px;
		font: inherit;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		background: var(--m-accent);
		color: #faf9f5;
	}
	.mh-btn.ghost {
		background: transparent;
		color: var(--m-fg-strong);
		border: 1px solid var(--m-border-strong, rgba(15, 20, 18, 0.16));
	}
	.mh-proof {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		list-style: none;
		margin: 22px 0 0;
		padding: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--m-fg-muted);
	}
	.mh-panel {
		background: var(--m-card);
		border: 1px solid var(--m-border);
		border-radius: 16px;
		padding: 24px;
		display: grid;
		gap: 18px;
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
	}
	.mh-metric {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-bottom: 16px;
		border-bottom: 1px solid var(--m-border);
	}
	.mh-metric:last-child {
		padding-bottom: 0;
		border-bottom: 0;
	}
	.mh-metric .l {
		font-size: 13px;
		color: var(--m-fg-muted);
	}
	.mh-metric .v {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 30px;
		line-height: 1.1;
		color: var(--m-fg-strong);
		font-variant-numeric: tabular-nums;
	}
	.mh-metric .s {
		font-size: 12px;
		color: var(--m-fg-subtle);
	}
	@media (max-width: 760px) {
		.mh {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
</style>
