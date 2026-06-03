<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { liveWidget as spec } from '$specs/marketing/patterns/live-widget';

	// All displayed figures derive from this one state source — never hardcoded.
	let rows = $state([
		{ label: 'Mar', value: 1840 },
		{ label: 'Apr', value: 3120 },
		{ label: 'May', value: 2460 },
		{ label: 'Jun', value: 4280 }
	]);

	const total = $derived(rows.reduce((sum, r) => sum + r.value, 0));
	const max = $derived(Math.max(...rows.map((r) => r.value)));

	// Count-up toward the derived total, honouring reduced motion.
	let shown = $state(0);
	$effect(() => {
		const target = total;
		const reduce =
			typeof matchMedia !== 'undefined' &&
			matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			shown = target;
			return;
		}
		const from = shown;
		const start = performance.now();
		const dur = 900;
		let raf = 0;
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / dur);
			const eased = 1 - Math.pow(1 - t, 3);
			shown = Math.round(from + (target - from) * eased);
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	const money = (n: number) => '$' + n.toLocaleString('en-US');

	// Non-navigating control — re-derives every figure from new state.
	function reroll() {
		rows = rows.map((r) => ({ ...r, value: 900 + Math.round(Math.random() * 3800) }));
	}
</script>

{#snippet widget()}
	<div class="m-live">
		<div class="head">
			<span class="dot" aria-hidden="true"></span>
			Savings recovered
		</div>
		<p class="value">{money(shown)}</p>
		<div class="bars" aria-hidden="true">
			{#each rows as r (r.label)}
				<span class="col">
					<span class="bar" style="height: {(r.value / max) * 100}%"></span>
					<span class="blabel">{r.label}</span>
				</span>
			{/each}
		</div>
	</div>
{/snippet}

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			{@render widget()}
			<div class="controls">
				<button type="button" class="ctl" onclick={reroll}>Re-roll data</button>
				<p class="note">
					Counter and every bar derive from one state array — the count-up animates toward the
					derived total and snaps to final under reduced motion.
				</p>
			</div>
		</div>

		<div class="demo" data-marketing-dark>
			{@render widget()}
			<span class="tag">[data-marketing-dark]</span>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		position: relative;
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 32px;
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
		align-items: flex-start;
	}
	/* The widget — every colour comes from a --m-* role, so it re-themes
	   under [data-marketing-dark]. */
	.m-live {
		width: 260px;
		padding: 18px 20px;
		background: var(--m-card);
		border: 1px solid var(--m-border);
		border-radius: 14px;
	}
	.head {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 10px;
		color: var(--m-fg-muted);
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: var(--m-positive);
		animation: pulse 1800ms ease-in-out infinite;
	}
	.value {
		margin: 10px 0 16px;
		font-family: var(--font-mono);
		font-size: 30px;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		color: var(--m-positive);
	}
	.bars {
		display: flex;
		align-items: flex-end;
		gap: 10px;
		height: 72px;
	}
	.col {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		height: 100%;
		justify-content: flex-end;
	}
	.bar {
		width: 100%;
		min-height: 2px;
		background: var(--m-positive-soft);
		border-top: 2px solid var(--m-positive);
		transition: height 600ms var(--easing-out);
	}
	.blabel {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.04em;
		color: var(--m-fg-subtle);
	}
	.controls {
		flex: 1;
		min-width: 200px;
	}
	.ctl {
		padding: 8px 14px;
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		color: var(--m-fg-strong);
		background: transparent;
		border: 1px solid var(--m-border-strong);
		border-radius: 6px;
		corner-shape: squircle;
		cursor: pointer;
		transition: transform 150ms var(--easing-out);
	}
	.ctl:active {
		transform: scale(0.97);
	}
	.note {
		margin: 14px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--m-fg-muted);
		max-width: 48ch;
	}
	.tag {
		position: absolute;
		top: 10px;
		right: 12px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--m-fg-subtle);
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dot {
			animation: none;
		}
		.bar {
			transition: none;
		}
		.ctl:active {
			transform: none;
		}
	}
</style>
