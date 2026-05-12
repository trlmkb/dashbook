<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import MotionPreview from '$chrome/MotionPreview.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';

	let pressed = $state(false);
	function pressOnce() {
		pressed = true;
		setTimeout(() => (pressed = false), 100);
	}

	const dos = [
		{ kind: 'do' as const, text: 'Use the per-character clipped slide-up for hero headings — it is the brand\'s signature motion.' },
		{ kind: 'do' as const, text: 'Animate numerics with count-up (700ms ease-out cubic) on first render and on slide change.' },
		{ kind: 'do' as const, text: 'Use scale(0.97) on every button press. Small, snappy, 100ms.' },
		{ kind: 'dont' as const, text: 'Don\'t use spring or bouncy easing anywhere. The brand is precise — never wobbly.' },
		{ kind: 'dont' as const, text: 'Don\'t animate individual letters with rotation, scale, or color. Slide-up only.' },
		{ kind: 'dont' as const, text: 'Don\'t exceed 500ms unless it\'s a deliberate gradient drift on a marketing surface.' }
	];

	const easings = [
		{
			name: 'easing-out',
			value: 'cubic-bezier(0.16, 1, 0.3, 1)',
			role: 'Default for entries — slow ease-out, signature feel'
		},
		{
			name: 'easing-in',
			value: 'cubic-bezier(0.4, 0, 1, 1)',
			role: 'Exits — fast accelerating'
		},
		{
			name: 'easing-default',
			value: 'cubic-bezier(0.4, 0, 0.2, 1)',
			role: 'Most things — symmetric ease-in-out'
		}
	];

	const durations = [
		{ name: 'instant', value: '50ms', role: 'Hover state changes, micro-interactions' },
		{ name: 'fast', value: '150ms', role: 'Standard — buttons, links, focus rings' },
		{ name: 'normal', value: '300ms', role: 'Sheets, dialogs, route transitions' },
		{ name: 'slow', value: '500ms', role: 'Reserved — only when 300ms feels rushed' }
	];
</script>

<svelte:head><title>Motion — Brand — Dashbook</title></svelte:head>

<InnerPage section="/brand" wide>
	<PageHeader
		label="Brand / Motion"
		title="Motion."
		lede="Per-character clipped slide-up. Count-up numerics. Snappy press. The brand is precise — never bouncy, never decorative."
	/>

	<Section
		label="Signature — clipped slide-up"
		note="Each glyph slides 100% of its own height inside an overflow:hidden box. Stagger 30ms per character. Easing: cubic-bezier(0.16, 1, 0.3, 1). 600ms total."
	>
		<MotionPreview
			label="Replay heading"
			caption="Per-character slide-up · 600ms · 30ms stagger"
		>
			{#snippet children(_k: number)}
				<div class="hero-anim">
					{#each 'BUILT FOR GROWTH'.split('') as ch, i (i)}
						<span
							class="char"
							style:--delay="{i * 30}ms"
							style:--space={ch === ' ' ? '1' : '0'}
						>
							<span class="char-inner">{ch === ' ' ? ' ' : ch}</span>
						</span>
					{/each}
				</div>
			{/snippet}
		</MotionPreview>
	</Section>

	<Section
		label="Count-up numerics"
		note="Numbers animate from 0 to target on first render and on slide change. 700ms ease-out cubic. Tabular figures throughout."
	>
		<MotionPreview label="Replay count-up" caption="0 → target · 700ms ease-out">
			{#snippet children(_k: number)}
				<div class="counter-row">
					<div class="counter">
						<span class="counter-prefix">$</span>
						<span class="counter-num countup tabular-nums">2,400,000</span>
					</div>
					<div class="counter-label">Daily limit</div>
				</div>
			{/snippet}
		</MotionPreview>
	</Section>

	<Section label="Press feedback" note="Every button — and only buttons — press to scale(0.97). 100ms. Small, snappy.">
		<div class="press-demo">
			<button
				class="press-btn"
				class:pressed
				onclick={pressOnce}
				type="button"
			>
				Click me
			</button>
			<p class="press-note">Tap or click to feel it.</p>
		</div>
	</Section>

	<Section label="Easing curves">
		<div class="curves">
			{#each easings as e (e.name)}
				<div class="curve">
					<div class="curve-name">{e.name}</div>
					<div class="curve-value">{e.value}</div>
					<div class="curve-track">
						<div class="curve-dot" style:animation-timing-function={e.value}></div>
					</div>
					<p class="curve-role">{e.role}</p>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Duration scale">
		<table class="durations">
			<thead>
				<tr>
					<th>Token</th>
					<th>Value</th>
					<th>Role</th>
				</tr>
			</thead>
			<tbody>
				{#each durations as d (d.name)}
					<tr>
						<td class="d-name">--dur-{d.name}</td>
						<td class="d-val tabular-nums">{d.value}</td>
						<td class="d-role">{d.role}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Section>

	<Section label="Do · Don't">
		<DoDontGrid items={dos} />
	</Section>
</InnerPage>

<style>
	.hero-anim {
		display: flex;
		flex-wrap: wrap;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(2.5rem, 7vw, 5rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--fg);
		text-transform: uppercase;
	}
	.char {
		display: inline-block;
		overflow: hidden;
	}
	.char[style*='--space: 1'] {
		width: 0.4em;
	}
	.char-inner {
		display: inline-block;
		transform: translateY(100%);
		animation: slide-up 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: var(--delay);
	}
	@keyframes slide-up {
		to {
			transform: translateY(0);
		}
	}

	.counter-row {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: flex-start;
	}
	.counter {
		display: inline-flex;
		align-items: baseline;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(3rem, 8vw, 5.5rem);
		line-height: 1;
		letter-spacing: -0.03em;
		color: var(--fg);
	}
	.counter-prefix {
		font-size: 0.5em;
		color: var(--fg-muted);
		margin-right: 4px;
	}
	.counter-num {
		display: inline-block;
		animation: countup 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
	@keyframes countup {
		from {
			opacity: 0;
			transform: translateY(0.3em);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.counter-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}

	.press-demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 64px 24px;
		border: 1px solid var(--border);
	}
	.press-btn {
		font-family: var(--font-sans);
		font-weight: 500;
		font-size: 13px;
		height: 36px;
		padding: 0 16px;
		background: var(--primary);
		color: var(--primary-fg);
		border: 0;
		border-radius: 6px;
		cursor: pointer;
		transition: transform 100ms cubic-bezier(0.4, 0, 1, 1);
	}
	.press-btn.pressed {
		transform: scale(0.97);
	}
	.press-btn:active {
		transform: scale(0.97);
	}
	.press-note {
		font-size: 13px;
		color: var(--fg-muted);
	}

	.curves {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.curve {
		padding: 24px;
		background: var(--bg);
	}
	.curve-name {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 500;
		color: var(--fg);
		letter-spacing: -0.02em;
		margin-bottom: 4px;
	}
	.curve-value {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
		letter-spacing: -0.01em;
		margin-bottom: 16px;
	}
	.curve-track {
		position: relative;
		height: 4px;
		background: var(--border);
		margin-bottom: 16px;
	}
	.curve-dot {
		position: absolute;
		top: -4px;
		left: 0;
		width: 12px;
		height: 12px;
		background: var(--brand);
		border-radius: 999px;
		animation: curve-move 2.5s infinite alternate;
	}
	@keyframes curve-move {
		from {
			left: 0;
		}
		to {
			left: calc(100% - 12px);
		}
	}
	.curve-role {
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
	}

	.durations {
		width: 100%;
		border-collapse: collapse;
	}
	.durations th {
		text-align: left;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 500;
		padding: 12px 16px 12px 0;
		border-bottom: 1px solid var(--border);
	}
	.durations td {
		padding: 16px 16px 16px 0;
		border-bottom: 1px solid var(--border);
		font-size: 14px;
	}
	.d-name {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--brand);
		letter-spacing: -0.02em;
		width: 200px;
	}
	.d-val {
		font-family: var(--font-mono);
		color: var(--fg);
		width: 120px;
	}
	.d-role {
		color: var(--fg-muted);
	}
</style>
