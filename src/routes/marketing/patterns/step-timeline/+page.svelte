<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { stepTimeline as spec } from '$specs/marketing/patterns/step-timeline';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">Vertical</p>
			<ol class="step-timeline">
				<li class="step">
					<span class="node">1</span>
					<div class="body">
						<h3>Connect</h3>
						<p>Link your carrier accounts in a few minutes.</p>
					</div>
				</li>
				<li class="step">
					<span class="node">2</span>
					<div class="body">
						<h3>Audit</h3>
						<p>Every invoice is checked against your contract automatically.</p>
					</div>
				</li>
				<li class="step">
					<span class="node">3</span>
					<div class="body">
						<h3>Recover</h3>
						<p>We file the claims and track each credit back to your account.</p>
					</div>
				</li>
			</ol>
		</div>

		<div class="demo">
			<p class="eyebrow">Horizontal variant</p>
			<ol class="step-timeline-h">
				<li class="step-h">
					<span class="node">1</span>
					<div class="body">
						<h3>Connect</h3>
						<p>Link your carrier accounts.</p>
					</div>
				</li>
				<li class="step-h">
					<span class="node">2</span>
					<div class="body">
						<h3>Audit</h3>
						<p>Invoices checked against the contract.</p>
					</div>
				</li>
				<li class="step-h">
					<span class="node">3</span>
					<div class="body">
						<h3>Recover</h3>
						<p>Claims filed, credits tracked back.</p>
					</div>
				</li>
			</ol>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.eyebrow {
		margin: 0 0 24px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}

	/* ── Vertical (default) ── */
	.step-timeline {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 28px;
	}
	.step {
		position: relative;
		display: grid;
		grid-template-columns: 36px minmax(0, 1fr);
		gap: 16px;
		align-items: start;
	}
	.step::before {
		content: '';
		position: absolute;
		left: 17px;
		top: 36px;
		bottom: -28px;
		width: 1px;
		background: var(--m-border);
	}
	.step:last-child::before {
		display: none;
	}

	/* ── Horizontal variant ── */
	.step-timeline-h {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
	}
	.step-h {
		position: relative;
		display: grid;
		gap: 14px;
	}
	.step-h::before {
		content: '';
		position: absolute;
		left: 36px;
		right: -24px;
		top: 17px;
		height: 1px;
		background: var(--m-border);
	}
	.step-h:last-child::before {
		display: none;
	}

	/* ── Shared node + copy ── */
	.node {
		width: 36px;
		height: 36px;
		display: grid;
		place-items: center;
		border-radius: 999px;
		background: var(--m-accent-soft);
		border: 1px solid var(--m-accent-border);
		color: var(--m-accent);
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		font-size: 14px;
	}
	.body h3 {
		margin: 0 0 6px;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		font-size: 18px;
		color: var(--m-fg-strong);
	}
	.body p {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--m-fg-muted);
		max-width: 60ch;
	}
	@media (max-width: 720px) {
		.step-timeline-h {
			grid-template-columns: minmax(0, 1fr);
			gap: 28px;
		}
		.step-h::before {
			left: 17px;
			right: auto;
			top: 36px;
			bottom: -28px;
			width: 1px;
			height: auto;
		}
	}
</style>
