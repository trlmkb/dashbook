<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { productWindowHero as spec } from '$specs/marketing/patterns/product-window-hero';

	const slides = [
		{
			url: 'app.dash.fi/transactions',
			rows: [
				{ m: 'Amazon Web Services', a: '$2,480.00' },
				{ m: 'Google Ads', a: '$960.50' },
				{ m: 'Slack', a: '$96.00' },
			],
		},
		{
			url: 'app.dash.fi/rewards',
			rows: [
				{ m: 'Cash back this month', a: '+$4,210' },
				{ m: 'Ad spend · 3%', a: '+$3,100' },
				{ m: 'Shipping · 3%', a: '+$1,110' },
			],
		},
		{
			url: 'app.dash.fi/cards',
			rows: [
				{ m: 'Marketing · Dana', a: '$5,000' },
				{ m: 'AWS · Leena', a: 'Unlimited' },
				{ m: 'Q3 Trade Show', a: '$2,500' },
			],
		},
	];

	let index = $state(0);
	let paused = $state(false);

	$effect(() => {
		if (paused) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;
		const id = setInterval(() => { index = (index + 1) % slides.length; }, 3200);
		return () => clearInterval(id);
	});

	const active = $derived(slides[index]);
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="pw" onmouseenter={() => (paused = true)} onmouseleave={() => (paused = false)}>
				<div class="pw-chrome">
					<span class="d"></span><span class="d"></span><span class="d"></span>
					<span class="pw-url">{active.url}</span>
					<span class="pw-live"><span class="pw-live-dot"></span> Live</span>
				</div>
				<div class="pw-stage">
					{#key index}
						<div class="pw-screen">
							{#each active.rows as r (r.m)}
								<div class="pw-row"><span>{r.m}</span><b>{r.a}</b></div>
							{/each}
						</div>
					{/key}
				</div>
			</div>
			<div class="pw-dots">
				{#each slides as s, i (s.url)}
					<button class="pw-dot" class:on={i === index} aria-current={i === index} aria-label={`Slide ${i + 1}`} onclick={() => (index = i)}></button>
				{/each}
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: clamp(32px, 5vw, 56px);
	}
	.pw {
		max-width: 520px;
		margin: 0 auto;
		background: var(--m-card);
		border: 1px solid var(--m-border);
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 45px 90px -35px rgba(18, 59, 57, 0.45);
	}
	.pw-chrome {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 40px;
		padding: 0 16px;
		border-bottom: 1px solid var(--m-border);
	}
	.pw-chrome .d {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--m-border-strong, rgba(15, 20, 18, 0.16));
	}
	.pw-url {
		margin-left: 10px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--m-fg-subtle);
	}
	.pw-live {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--m-accent);
	}
	.pw-live-dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: var(--m-accent);
		animation: pw-blink 1.2s steps(2, start) infinite;
	}
	.pw-stage {
		min-height: 188px;
		padding: 8px 22px;
	}
	.pw-screen {
		animation: pw-in 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}
	@keyframes pw-in {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
	}
	.pw-row {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 14px 0;
		border-bottom: 1px solid var(--m-border);
		font-size: 14px;
		color: var(--m-fg-strong);
	}
	.pw-row:last-child {
		border-bottom: 0;
	}
	.pw-row b {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
	.pw-dots {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-top: 22px;
	}
	.pw-dot {
		width: 7px;
		height: 7px;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: var(--m-border-strong, rgba(15, 20, 18, 0.16));
		cursor: pointer;
		transition: width 200ms ease, background 200ms ease;
	}
	.pw-dot.on {
		width: 22px;
		background: var(--m-accent);
	}
	@media (prefers-reduced-motion: reduce) {
		.pw-screen,
		.pw-live-dot,
		.pw-dot {
			animation: none;
			transition: none;
		}
	}
</style>
