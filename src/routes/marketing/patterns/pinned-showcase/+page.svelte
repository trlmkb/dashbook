<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { pinnedShowcase as spec } from '$specs/marketing/patterns/pinned-showcase';

	const steps = [
		{ n: '01', title: 'Connect', body: 'Link your carrier and ERP accounts.', active: true },
		{ n: '02', title: 'Audit', body: 'Every invoice is checked against your contract.', active: false },
		{ n: '03', title: 'Recover', body: 'Claims are filed and tracked to each credit.', active: false }
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="pinned">
				<ol class="steps">
					{#each steps as step (step.n)}
						<li class="step" class:active={step.active}>
							<span class="marker">{step.n}</span>
							<div class="body">
								<h4>{step.title}</h4>
								<p>{step.body}</p>
							</div>
						</li>
					{/each}
				</ol>
				<div class="visual">
					<div class="visual-bar">
						<span class="dot"></span><span class="visual-title">Carrier audit</span>
					</div>
					<div class="visual-row"><span>UPS · 1Z…84</span><span class="ok">−$14.20</span></div>
					<div class="visual-row"><span>FedEx · 77…21</span><span class="ok">−$8.90</span></div>
					<span class="pin-tag">position: sticky</span>
				</div>
			</div>
		</div>
		<p class="cap">
			Simplified static view: in production the visual pins with <code>position: sticky</code> while the
			steps scroll past it, and an IntersectionObserver marks the active step to drive what the visual
			shows. Reduced motion swaps the visual instantly.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.pinned {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 32px;
		align-items: start;
	}
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 20px;
	}
	.step {
		display: grid;
		grid-template-columns: 36px minmax(0, 1fr);
		gap: 14px;
		align-items: start;
		color: var(--m-fg-muted);
		opacity: 0.6;
	}
	.step.active {
		opacity: 1;
	}
	.marker {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		border-radius: 999px;
		border: 1px solid var(--m-accent-border);
		background: var(--m-accent-soft);
		color: var(--m-accent);
		font-family: var(--font-mono);
		font-size: 13px;
		font-variant-numeric: tabular-nums;
	}
	.step.active .marker {
		border-color: var(--m-accent);
	}
	.body h4 {
		margin: 0 0 4px;
		font-size: 15px;
		color: var(--m-fg-strong);
	}
	.body p {
		margin: 0;
		font-size: 13px;
		line-height: 1.55;
	}
	.visual {
		position: relative;
		background: var(--m-card);
		border: 1px solid var(--m-border);
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
		padding: 16px;
	}
	.visual-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--m-border);
		margin-bottom: 8px;
	}
	.dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--m-accent);
	}
	.visual-title {
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--m-accent);
	}
	.visual-row {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--m-fg-muted);
		font-variant-numeric: tabular-nums;
	}
	.ok {
		color: var(--m-positive);
	}
	.pin-tag {
		position: absolute;
		top: 10px;
		right: 12px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--m-fg-subtle);
	}
	.cap {
		margin: 16px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 60ch;
	}
	.cap code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 5px;
	}
</style>
