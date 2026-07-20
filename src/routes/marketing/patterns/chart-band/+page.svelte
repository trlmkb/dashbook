<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { chartBand as spec } from '$specs/marketing/patterns/chart-band';

	// bar-horizontal — real values from ShipShotAnalytics.astro ("Spend by Service")
	const horizontalMaxAxis = 380;
	const horizontalBars = [
		{ label: ['Ground Residential'], value: 360 },
		{ label: ['Shipping Charge', 'Correction Ground'], value: 45 },
		{ label: ['Ground Commercial'], value: 35 },
		{ label: ['Returns Ground'], value: 25 },
		{ label: ['Address Correction', 'Ground'], value: 8 }
	];
	const horizontalTicks = ['$0k', '$95k', '$190k', '$285k', '$380k'];

	// bar-vertical — real values from ShipShotZone.astro ("Volume by Zone")
	const verticalMaxAxis = 220;
	const verticalBars = [
		{ zone: 'Zone 2', value: 6 },
		{ zone: 'Zone 3', value: 12 },
		{ zone: 'Zone 4', value: 26 },
		{ zone: 'Zone 5', value: 30 },
		{ zone: 'Zone 6', value: 62 },
		{ zone: 'Zone 7', value: 95 },
		{ zone: 'Zone 8', value: 210 }
	];
	const verticalTicks = ['$220k', '$165k', '$110k', '$55k', '$0k'];

	// minimal-strip-with-range-pills — real values from ai-spend-audit.ts (usage.bars)
	const strip = [40, 52, 46, 60, 72, 55, 68, 81, 62, 74, 88, 70, 83, 96];
	const ranges = [
		{ label: '7d', days: 7 },
		{ label: '15d', days: 15 },
		{ label: '30d', days: 30 },
		{ label: '60d', days: 60 },
		{ label: '90d', days: 90 }
	];
	let activeRange = $state(30);
	let windowLabel = $state('last 30 days');

	function selectRange(days: number) {
		activeRange = days;
		windowLabel = `last ${days} days`;
	}
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">bar-horizontal — ShipShotAnalytics, "Spend by Service"</p>
			<div class="hbar-panel">
				<div class="hbar-rows">
					{#each horizontalBars as b (b.label.join('-'))}
						<div class="hbar-row">
							<span class="hbar-label">
								{#each b.label as line (line)}
									<span>{line}</span>
								{/each}
							</span>
							<span class="hbar-track">
								<span class="hbar-fill" style="width: {(b.value / horizontalMaxAxis) * 100}%"></span>
							</span>
						</div>
					{/each}
				</div>
				<div class="hbar-axis">
					{#each horizontalTicks as tick (tick)}
						<span>{tick}</span>
					{/each}
				</div>
			</div>
		</div>

		<div class="demo">
			<p class="eyebrow">bar-vertical — ShipShotZone, "Volume by Zone"</p>
			<div class="vbar-panel">
				<div class="vbar-yaxis">
					{#each verticalTicks as tick (tick)}
						<span>{tick}</span>
					{/each}
				</div>
				<div class="vbar-plot">
					<div class="vbar-grid" aria-hidden="true">
						<i></i><i></i><i></i><i></i><i></i>
					</div>
					<div class="vbar-cols">
						{#each verticalBars as b (b.zone)}
							<div class="vbar-col">
								<span class="vbar-fill" style="height: {(b.value / verticalMaxAxis) * 100}%"></span>
								<span class="vbar-collabel">{b.zone}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="demo">
			<p class="eyebrow">minimal-strip-with-range-pills — ai-spend-audit, ".asa-bars"</p>
			<div class="strip-mock">
				<div class="strip-chrome">
					<span class="strip-title">AI Spend agent</span>
					<div class="strip-ranges">
						{#each ranges as r (r.days)}
							<button
								type="button"
								class="strip-range"
								class:active={activeRange === r.days}
								onclick={() => selectRange(r.days)}
							>
								{r.label}
							</button>
						{/each}
					</div>
				</div>
				<div class="strip-head">
					<span class="strip-head-title">Daily cost</span>
					<span class="strip-window">{windowLabel}</span>
				</div>
				<div class="strip-bars">
					{#each strip as h, i (i)}
						<span class="strip-bar" style="height: {h}%"></span>
					{/each}
				</div>
				<p class="strip-note">
					Range pills update the caption above — the bars themselves never change, matching the
					real source.
				</p>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 32px;
	}
	.demo + .demo {
		margin-top: 24px;
	}
	.eyebrow {
		margin: 0 0 20px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}

	/* ── bar-horizontal ── */
	.hbar-panel {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.hbar-rows {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.hbar-row {
		display: flex;
		align-items: center;
		gap: 12px;
		height: 22px;
	}
	.hbar-label {
		flex: 0 0 140px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		text-align: right;
		font-size: 12px;
		line-height: 1.25;
		color: var(--m-fg-muted);
	}
	.hbar-track {
		flex: 1 1 auto;
		display: block;
		height: 22px;
	}
	.hbar-fill {
		display: block;
		height: 100%;
		min-width: 3px;
		border-radius: 0 6px 6px 0;
		background: var(--m-accent);
	}
	.hbar-axis {
		display: flex;
		justify-content: space-between;
		margin-left: 152px;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--m-fg-subtle);
	}

	/* ── bar-vertical ── */
	.vbar-panel {
		display: flex;
		gap: 12px;
		height: 220px;
	}
	.vbar-yaxis {
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 28px;
		text-align: right;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--m-fg-subtle);
	}
	.vbar-plot {
		position: relative;
		flex: 1 1 auto;
		min-width: 0;
	}
	.vbar-grid {
		position: absolute;
		inset: 0 0 28px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: none;
	}
	.vbar-grid i {
		height: 1px;
		border-top: 1px dashed var(--m-border);
	}
	.vbar-cols {
		position: absolute;
		inset: 0 0 28px 0;
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
	}
	.vbar-col {
		position: relative;
		flex: 1 1 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
	}
	.vbar-fill {
		width: 26px;
		min-height: 3px;
		border-radius: 6px 6px 0 0;
		background: var(--m-accent);
	}
	.vbar-collabel {
		position: absolute;
		bottom: -20px;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--m-fg-subtle);
		white-space: nowrap;
	}

	/* ── minimal-strip-with-range-pills ── */
	.strip-mock {
		border-radius: 14px;
		border: 1px solid var(--m-border-strong);
		background: var(--m-card);
		overflow: hidden;
		font-family: var(--font-mono);
	}
	.strip-chrome {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 0 16px;
		height: 44px;
		border-bottom: 1px solid var(--m-border);
		background: var(--m-surface-2);
	}
	.strip-title {
		font-family: var(--font-display);
		font-size: 13px;
		color: var(--m-fg-strong);
	}
	.strip-ranges {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.strip-range {
		font-family: var(--font-mono);
		font-size: 10.5px;
		padding: 3px 8px;
		border-radius: 6px;
		border: 1px solid var(--m-border);
		color: var(--m-fg-subtle);
		background: transparent;
		cursor: pointer;
	}
	.strip-range.active {
		border-color: var(--m-accent-border);
		background: var(--m-accent-soft);
		color: var(--m-accent);
	}
	.strip-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 18px 18px 0;
	}
	.strip-head-title {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 600;
		color: var(--m-fg-strong);
	}
	.strip-window {
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.strip-bars {
		display: flex;
		align-items: flex-end;
		gap: 5px;
		height: 90px;
		margin: 14px 18px 0;
	}
	.strip-bar {
		flex: 1;
		min-width: 0;
		border-radius: 4px 4px 0 0;
		background: var(--m-accent);
		opacity: 0.55;
	}
	.strip-note {
		margin: 12px 18px 16px;
		font-family: var(--font-sans);
		font-size: 12px;
		line-height: 1.5;
		color: var(--m-fg-subtle);
	}
</style>
