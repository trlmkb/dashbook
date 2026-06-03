<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import Check from '@lucide/svelte/icons/check';
	import { platformShowcase as spec } from '$specs/marketing/patterns/platform-showcase';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="showcase">
				<div class="copy">
					<p class="eyebrow">Platform</p>
					<h2 class="display">
						One ledger for <span class="accent">every spend</span>
					</h2>
					<p class="lede">
						Audit, reconcile, and recover across every carrier in one place. The platform reads
						each invoice the moment it lands and flags what the contract does not cover.
					</p>
					<ul class="platform-bullets">
						<li><Check class="check" size={18} /> Real-time carrier audit</li>
						<li><Check class="check" size={18} /> Automatic refund recovery</li>
						<li><Check class="check" size={18} /> Line-item reconciliation</li>
						<li><Check class="check" size={18} /> Carrier-agnostic coverage</li>
					</ul>
				</div>
				<div class="media" aria-hidden="true">
					<div class="tile-cluster">
						<div class="tile"><span class="t-label">Audit</span><span class="t-num">1,284</span></div>
						<div class="tile"><span class="t-label">Recovered</span><span class="t-num ok">$48.2k</span></div>
						<div class="tile"><span class="t-label">Carriers</span><span class="t-num">9</span></div>
						<div class="tile"><span class="t-label">Flagged</span><span class="t-num bad">17</span></div>
					</div>
				</div>
			</div>
		</div>
		<p class="cap">
			One copy-media row. The grid lives on the native <code>.showcase</code> element; a
			<code>reverse</code> row flips the columns for the alternating rhythm down a page.
		</p>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.showcase {
		display: grid;
		gap: 40px;
		align-items: center;
		grid-template-columns: minmax(0, 1fr);
	}
	@media (min-width: 720px) {
		.showcase {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.eyebrow {
		margin: 0 0 14px;
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 10px;
		color: var(--m-fg-subtle);
	}
	.display {
		margin: 0 0 14px;
		font-family: var(--font-display);
		font-weight: 200;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 1.02;
		font-size: clamp(28px, 4vw, 40px);
		color: var(--m-fg-strong);
	}
	.display .accent {
		color: var(--m-accent);
	}
	.lede {
		margin: 0 0 20px;
		font-size: 15px;
		line-height: 1.6;
		color: var(--m-fg-muted);
		max-width: 48ch;
	}
	.platform-bullets {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 10px 24px;
		grid-template-columns: minmax(0, 1fr);
	}
	@media (min-width: 480px) {
		.platform-bullets {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.platform-bullets li {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 14px;
		line-height: 1.5;
		color: var(--m-fg-muted);
	}
	.platform-bullets :global(.check) {
		flex: none;
		margin-top: 1px;
		color: var(--m-positive);
	}
	.media {
		background: var(--m-card);
		border: 1px solid var(--m-border);
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
		padding: 18px;
	}
	.tile-cluster {
		display: grid;
		gap: 12px;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.tile {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 14px;
		border-radius: 12px;
		background: var(--m-surface-2);
		border: 1px solid var(--m-border);
	}
	.t-label {
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-size: 10px;
		color: var(--m-fg-subtle);
	}
	.t-num {
		font-family: var(--font-mono);
		font-size: 20px;
		color: var(--m-fg-strong);
		font-variant-numeric: tabular-nums;
	}
	.t-num.ok {
		color: var(--m-positive);
	}
	.t-num.bad {
		color: var(--m-negative);
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
