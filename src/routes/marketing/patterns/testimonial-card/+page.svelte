<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { testimonialCard as spec } from '$specs/marketing/patterns/testimonial-card';

	const quotes = [
		{ quote: 'Dash.fi found refunds three carriers had quietly written off.', name: 'Maya Rivera', role: 'VP Logistics, Northwind' },
		{ quote: 'We recovered $300M+ in overcharges without opening a single dispute ourselves.', name: 'Dana Ortiz', role: 'VP Finance, Northwind Freight' },
		{ quote: 'The audit paid for the platform in the first month. Then it kept going.', name: 'Sam Okafor', role: 'Controller, Boxable' },
	];

	let index = $state(0);
	let paused = $state(false);

	$effect(() => {
		if (paused) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const id = setInterval(() => { index = (index + 1) % quotes.length; }, reduce ? 6000 : 3800);
		return () => clearInterval(id);
	});

	const active = $derived(quotes[index]);
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<figure
				class="qc"
				onmouseenter={() => (paused = true)}
				onmouseleave={() => (paused = false)}
				onfocusin={() => (paused = true)}
				onfocusout={() => (paused = false)}
			>
				{#key index}
					<blockquote class="qc-quote">{active.quote}</blockquote>
				{/key}
				<figcaption class="qc-cap">
					<span class="qc-name">{active.name}</span>
					<span class="qc-role">{active.role}</span>
				</figcaption>
				<div class="qc-dots">
					{#each quotes as q, i (q.name)}
						<button
							class="qc-dot"
							class:on={i === index}
							aria-current={i === index}
							aria-label={`Show quote ${i + 1}`}
							onclick={() => (index = i)}
						></button>
					{/each}
				</div>
			</figure>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
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
		animation: qc-in 480ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}
	@keyframes qc-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
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
	.qc-dots {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-top: 24px;
	}
	.qc-dot {
		width: 7px;
		height: 7px;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: var(--m-border-strong, rgba(15, 20, 18, 0.16));
		cursor: pointer;
		transition: width 200ms ease, background 200ms ease;
	}
	.qc-dot.on {
		width: 22px;
		background: var(--m-accent, #2b605c);
	}
	@media (prefers-reduced-motion: reduce) {
		.qc-quote {
			animation: none;
		}
		.qc-dot {
			transition: none;
		}
	}
</style>
