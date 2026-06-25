<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { calculatorIsland as spec } from '$specs/marketing/patterns/calculator-island';

	let spend = $state(40000);
	const min = 0;
	const max = 250000;
	const pct = $derived(((spend - min) / (max - min)) * 100);
	const recovered = $derived(Math.round(spend * 0.036));
	const fmt = (n: number) => '$' + n.toLocaleString('en-US');
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="calc">
			<div class="head">
				<span class="eyebrow">See what comes back</span>
				<h3>Estimate your recovery.</h3>
				<div class="chips"><span class="chip">Always free</span></div>
			</div>
			<div class="card">
				<div class="slider-top">
					<label for="db-calc-demo">Monthly shipping spend</label>
					<span class="val">{fmt(spend)}</span>
				</div>
				<input
					id="db-calc-demo"
					type="range"
					{min}
					{max}
					step="1000"
					bind:value={spend}
					class="slider"
					style="--m-slider-pct: {pct}%"
				/>
				<div class="result">
					{fmt(recovered)} <span>est. recovered / mo</span>
				</div>
				<p class="disclaimer">Estimate from a typical category mix; actuals vary by account.</p>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.calc {
		display: grid;
		gap: 32px;
		grid-template-columns: 1fr;
		max-width: 720px;
		margin: 0 auto;
	}
	@media (min-width: 720px) {
		.calc {
			grid-template-columns: 0.9fr 1.1fr;
			align-items: center;
		}
	}
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--m-accent, #2b605c);
	}
	.head h3 {
		margin: 12px 0 16px;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 28px;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong, #123b39);
	}
	.chip {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 11px;
		padding: 4px 10px;
		border-radius: 999px;
		border: 1px solid var(--m-border, rgba(15, 20, 18, 0.12));
		color: var(--m-fg-muted, #505148);
	}
	.card {
		background: var(--m-card, #fff);
		border: 1px solid var(--m-border, rgba(15, 20, 18, 0.12));
		border-radius: 16px;
		padding: 28px;
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
	}
	.slider-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 14px;
	}
	.slider-top label {
		font-size: 14px;
		color: var(--m-fg-muted, #505148);
	}
	.val {
		font-family: var(--font-mono);
		font-size: 16px;
		color: var(--m-fg-strong, #123b39);
		font-variant-numeric: tabular-nums;
	}
	.slider {
		width: 100%;
		appearance: none;
		-webkit-appearance: none;
		height: 6px;
		border-radius: 999px;
		background: linear-gradient(
			to right,
			var(--m-accent, #2b605c) var(--m-slider-pct, 50%),
			var(--m-border-strong, rgba(15, 20, 18, 0.16)) var(--m-slider-pct, 50%)
		);
		cursor: pointer;
	}
	.slider::-webkit-slider-thumb {
		appearance: none;
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 999px;
		background: var(--m-accent, #2b605c);
		border: 2px solid var(--m-card, #fff);
		box-shadow: 0 1px 4px rgba(15, 20, 18, 0.3);
	}
	.slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 999px;
		background: var(--m-accent, #2b605c);
		border: 2px solid var(--m-card, #fff);
	}
	.result {
		margin-top: 22px;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 34px;
		letter-spacing: -0.02em;
		color: var(--m-fg-strong, #123b39);
		font-variant-numeric: tabular-nums;
	}
	.result span {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 400;
		color: var(--m-fg-muted, #505148);
	}
	.disclaimer {
		margin: 10px 0 0;
		font-size: 12px;
		color: var(--m-fg-subtle, #80817a);
	}
</style>
