<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { comparisonTable as spec } from '$specs/marketing/patterns/comparison-table';

	// Mirrors the live /corporate-card "compare" section: fixed 4 columns
	// (row label + Dash.fi + Brex + Ramp), free-text cells, no check/dash
	// glyphs — see src/pages/corporate-card.astro (class prefix `mk-comparison-`).
	const rows: { feature: string; dashfi: string; brex: string; ramp: string }[] = [
		{
			feature: 'Cash back',
			dashfi: '3% on ad, shipping & AI spend, 2% on the rest',
			brex: 'Points, with caps',
			ramp: '1.5% flat'
		},
		{
			feature: 'Payment terms',
			dashfi: 'Net-1 to Net-60, your choice',
			brex: 'Net-30 typical',
			ramp: 'Net-30 typical'
		},
		{
			feature: 'Audit agents',
			dashfi: 'Shipping, ads, and LLM tokens',
			brex: 'None',
			ramp: 'Savings insights only'
		},
		{
			feature: 'Platform fee',
			dashfi: 'None',
			brex: 'Paid plans for more',
			ramp: 'Free core, paid add-ons'
		}
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="cmp-scroll">
				<div class="cmp-table">
					<div class="cmp-row cmp-row--head">
						<div class="cmp-cell cmp-feature">
							<span class="cmp-collabel">Feature</span>
						</div>
						<div class="cmp-cell cmp-dashfi">
							<span class="cmp-collabel cmp-collabel--accent">Dash.fi</span>
							<span class="cmp-rec">Recommended</span>
						</div>
						<div class="cmp-cell">
							<span class="cmp-collabel">Brex</span>
						</div>
						<div class="cmp-cell">
							<span class="cmp-collabel">Ramp</span>
						</div>
					</div>
					{#each rows as row, i (row.feature)}
						<div class="cmp-row" data-zebra={i % 2 === 1 ? 'true' : 'false'}>
							<div class="cmp-cell cmp-feature">
								<span class="cmp-feature-text">{row.feature}</span>
							</div>
							<div class="cmp-cell cmp-dashfi">
								<span class="cmp-val cmp-val--strong">{row.dashfi}</span>
							</div>
							<div class="cmp-cell">
								<span class="cmp-val">{row.brex}</span>
							</div>
							<div class="cmp-cell">
								<span class="cmp-val">{row.ramp}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<p class="cmp-foot">Based on publicly described capabilities, for general guidance.</p>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface, #faf9f5);
		border: 1px solid var(--m-border, rgba(37, 38, 29, 0.1));
		padding: 24px;
	}

	/* ── Scroll wrapper — forced by the table's own min-width, no media query ── */
	.cmp-scroll {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	.cmp-table {
		min-width: 720px;
		border: 1px solid var(--m-border-strong, rgba(37, 38, 29, 0.16));
		border-radius: 14px;
		overflow: hidden;
		background: var(--m-card, #fff);
		box-shadow: 0 28px 64px -46px rgba(37, 38, 29, 0.5);
	}

	.cmp-row {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		border-top: 1px solid var(--m-border, rgba(37, 38, 29, 0.1));
	}
	.cmp-row:first-child {
		border-top: 0;
	}
	.cmp-row--head {
		background: var(--m-surface, #faf9f5);
	}
	/* Real, verified zebra striping — a monochrome ink tint, never a colour. */
	.cmp-row[data-zebra='true'] {
		background: var(--m-negative-soft, rgba(37, 38, 29, 0.06));
	}

	.cmp-cell {
		padding: 16px 20px;
		border-left: 1px solid var(--m-border, rgba(37, 38, 29, 0.1));
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}
	.cmp-cell:first-child {
		border-left: 0;
	}

	/* The "us" column: soft accent fill + a left-edge accent border only —
	   there is no right-edge border in the live source. */
	.cmp-dashfi {
		background: var(--m-accent-soft, rgba(43, 96, 92, 0.08));
		border-left: 1px solid var(--m-accent-border, rgba(43, 96, 92, 0.28));
	}

	.cmp-collabel {
		font-family: var(--font-mono);
		font-size: 9.5px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--m-fg-muted, #505148);
	}
	.cmp-collabel--accent {
		color: var(--m-accent, #2b605c);
	}
	.cmp-rec {
		font-size: 8px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		background: var(--m-accent, #2b605c);
		color: #fff;
		padding: 2px 7px;
		border-radius: 999px;
	}

	.cmp-feature-text {
		font-size: 12.5px;
		font-weight: 700;
		color: var(--m-fg-strong, #25261d);
	}
	.cmp-val {
		font-size: 12.5px;
		line-height: 1.4;
		color: var(--m-fg-muted, #505148);
	}
	.cmp-val--strong {
		color: var(--m-fg-strong, #25261d);
		font-weight: 600;
	}

	.cmp-foot {
		margin: 16px 0 0;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--m-fg-subtle, #5d5f55);
	}
</style>
