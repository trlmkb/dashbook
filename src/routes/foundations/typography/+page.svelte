<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import CopyValue from '$chrome/CopyValue.svelte';

	const families = [
		{ token: '--font-display', value: "'PP Supply Mono', 'JetBrains Mono', ui-monospace, monospace" },
		{ token: '--font-sans', value: "'Bai Jamjuree', 'Geist', ui-sans-serif, system-ui, sans-serif" },
		{ token: '--font-mono', value: "'PP Supply Mono', 'Geist Mono', ui-monospace, SFMono-Regular, monospace" }
	];

	const styles = [
		{
			class: 'heading-display',
			props: 'PP Supply Mono · 200 · clamp(2.5rem, 6vw, 4.5rem) · 0.9 · -0.01em · uppercase',
			sample: 'BUILT FOR GROWTH'
		},
		{
			class: 'page-label',
			props: 'PP Supply Mono · 0.75rem · 0.3em · uppercase · fg-muted',
			sample: 'BRAND / LOGO'
		},
		{
			class: 'section-header',
			props: 'PP Supply Mono · 0.6875rem · 500 · 0.15em · uppercase · fg-muted',
			sample: 'PRODUCT PALETTE'
		},
		{
			class: 'data-value',
			props: 'PP Supply Mono · 400 · -0.02em · tabular-nums',
			sample: '$2,408,210'
		},
		{
			class: 'body-lg',
			props: 'Bai Jamjuree · 1.0625rem · 1.6',
			sample: 'The most rewarding card for growing your business.'
		},
		{
			class: 'body',
			props: 'Bai Jamjuree · 0.9375rem · 1.6',
			sample: 'Spending data refreshed successfully.'
		},
		{
			class: 'body-sm',
			props: 'Bai Jamjuree · 0.8125rem · 1.5 · fg-muted',
			sample: 'Resets midnight UTC.'
		},
		{
			class: 'caption',
			props: 'Bai Jamjuree · 0.75rem · 1.4 · fg-muted',
			sample: 'Issuing-bank disclosure footnote.'
		}
	];

	const codeSample = `<h1 class="heading-display">Built for growth</h1>

<div class="page-label">Brand / Logo</div>
<div class="section-header">Product palette</div>

<span class="data-value tabular-nums">$2,408,210</span>

<p class="body-lg">The most rewarding card for growing your business.</p>
<p class="body">Spending data refreshed successfully.</p>
<p class="body-sm">Resets midnight UTC.</p>
<p class="caption">Issuing-bank disclosure footnote.</p>`;

	const fallbackSample = `/* Non-Dash.fi stack — JetBrains Mono fallback for PP Supply Mono */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@200..700&display=swap');

:root {
	--font-display: 'JetBrains Mono', ui-monospace, monospace;
	--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
	--font-sans: 'Bai Jamjuree', ui-sans-serif, system-ui, sans-serif;
}`;
</script>

<svelte:head><title>Typography — Foundations — Dashbook</title></svelte:head>

<InnerPage section="/foundations" wide>
	<PageHeader
		label="Foundations / Typography"
		title="Typography."
		lede="Three families. Eight semantic styles. Tabular figures everywhere a number appears. The class names are stable — use them, don't reach for ad-hoc font-size."
	/>

	<Section label="Family tokens">
		<div class="family-tokens">
			{#each families as f (f.token)}
				<div class="family-row">
					<div class="family-token">
						<CopyValue value={f.token} label={f.token} />
					</div>
					<div class="family-value tabular-nums">{f.value}</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Semantic styles" note="Hand-applied via class. The lede on every page uses .body-lg; section labels use .section-header.">
		<div class="styles">
			{#each styles as s (s.class)}
				<div class="style-row">
					<div class="style-meta">
						<div class="style-class">.{s.class}</div>
						<div class="style-props">{s.props}</div>
					</div>
					<div class="style-sample {s.class}">{s.sample}</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Usage">
		<CodeSnippet code={codeSample} language="svelte" />
	</Section>

	<Section label="Numerics">
		<div class="numerics">
			<div class="num-row">
				<div class="num-canvas tabular">$1,240.00</div>
				<div class="num-meta">
					<div class="num-label">Tabular figures</div>
					<p>
						<code>font-variant-numeric: tabular-nums</code> is mandatory anywhere a number lives —
						currency, dates, counts, IDs, percentages. Default in <code>.tabular-nums</code> and on
						any element with <code>data-numeric</code> or <code>data-mono</code>.
					</p>
				</div>
			</div>
			<div class="num-row">
				<div class="num-canvas proportional">$1,240.00</div>
				<div class="num-meta">
					<div class="num-label">Proportional (avoid)</div>
					<p>What it looks like without tabular-nums. Numerals shift by glyph width — sums
						don't align. Never ship this in a table.</p>
				</div>
			</div>
		</div>
	</Section>

	<Section label="Font delivery" note="Where to load each face from. Read this before porting to a non-Dash.fi stack.">
		<ul class="delivery">
			<li>
				<div class="delivery-name">PP Supply Mono</div>
				<p>
					Canonical display and label face for Dash.fi. <strong>Paywalled</strong> — Pangram
					Pangram commercial license, no public CDN. Self-hosted at
					<code>https://dashbook.vercel.app/fonts/pp-supply-mono-ultralight.woff2</code> for
					licensed Dash.fi properties only. Do not link from third-party origins.
				</p>
			</li>
			<li>
				<div class="delivery-name">JetBrains Mono (fallback)</div>
				<p>
					For non-Dash.fi stacks that cannot license PP Supply Mono, the closest open
					substitute is <strong>JetBrains Mono</strong> (Apache 2.0). Same monospaced rhythm,
					same tabular-figure behavior — only the personality differs.
				</p>
				<p>
					<code>https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200..700&amp;display=swap</code>
				</p>
			</li>
			<li>
				<div class="delivery-name">Bai Jamjuree</div>
				<p>
					Body sans. OFL-licensed and safe to auto-link from Google Fonts on any origin.
				</p>
				<p>
					<code>https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@200..700&amp;display=swap</code>
				</p>
			</li>
		</ul>

		<div class="delivery-snippet">
			<CodeSnippet code={fallbackSample} language="css" />
		</div>
	</Section>
</InnerPage>

<style>
	.family-tokens {
		display: flex;
		flex-direction: column;
	}
	.family-row {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 24px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
		align-items: center;
	}
	.family-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.family-token {
		display: flex;
	}
	.family-value {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
		letter-spacing: -0.01em;
	}

	.styles {
		display: flex;
		flex-direction: column;
	}
	.style-row {
		display: grid;
		grid-template-columns: 320px 1fr;
		gap: 32px;
		padding: 24px 0;
		border-top: 1px solid var(--border);
		align-items: center;
	}
	.style-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.style-class {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 500;
		color: var(--brand);
		letter-spacing: -0.02em;
	}
	.style-props {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
		margin-top: 4px;
		letter-spacing: -0.01em;
	}
	.style-sample {
		color: var(--fg);
	}

	.numerics {
		display: flex;
		flex-direction: column;
	}
	.num-row {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 32px;
		padding: 24px 0;
		border-top: 1px solid var(--border);
		align-items: center;
	}
	.num-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.num-canvas {
		font-size: 32px;
		font-weight: 200;
		color: var(--fg);
		letter-spacing: -0.02em;
	}
	.num-canvas.tabular {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
	.num-canvas.proportional {
		font-family: 'Bai Jamjuree', sans-serif;
		font-feature-settings: 'pnum';
	}
	.num-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 8px;
	}
	.num-meta p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		max-width: 600px;
	}
	.num-meta code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}

	.delivery {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.delivery li {
		padding: 20px 0;
		border-top: 1px solid var(--border);
	}
	.delivery li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.delivery-name {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 8px;
	}
	.delivery p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		max-width: 720px;
		margin: 4px 0;
	}
	.delivery code {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg);
		background: var(--bg-muted);
		padding: 1px 6px;
		word-break: break-all;
	}
	.delivery-snippet {
		margin-top: 24px;
	}

	@media (max-width: 720px) {
		.family-row,
		.style-row,
		.num-row {
			grid-template-columns: 1fr;
		}
	}
</style>
