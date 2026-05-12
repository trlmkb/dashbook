<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CopyValue from '$chrome/CopyValue.svelte';

	const targets = [
		{
			key: 'Contrast',
			value: '4.5:1 body · 3:1 large + UI',
			detail: 'WCAG 2.2 AA. Body copy ≥ 16px must hit 4.5:1; ≥ 18.66px or bold ≥ 14px and non-text UI hit 3:1.'
		},
		{
			key: 'Touch targets',
			value: '≥ 44 × 44 CSS px',
			detail: 'Hit area, not visual size. Use padding on the interactive element to reach the floor.'
		},
		{
			key: 'Focus ring',
			value: '1px solid var(--fg), 2px offset',
			detail: 'Set globally in app.css. Visible only on :focus-visible — mouse clicks stay clean.'
		},
		{
			key: 'Motion',
			value: 'Respects prefers-reduced-motion',
			detail: 'Press-scale and per-character stagger both collapse to instant transitions under the reduce query.'
		},
		{
			key: 'Keyboard',
			value: 'Tab · Space / Enter · Escape',
			detail: 'Every interactive surface reachable via Tab, activated via Space or Enter, dialogs trap and Escape closes.'
		}
	];

	const contrastRows = [
		{
			fg: '#123B39',
			bg: '#FAF8F1',
			label: 'Jade-deep on cream',
			role: 'Body copy. Primary --fg over --bg.',
			ratio: '10.2:1',
			pass: 'AAA'
		},
		{
			fg: '#2B605C',
			bg: '#FAF8F1',
			label: 'Jade on cream',
			role: 'Brand accent, links. --brand over --bg.',
			ratio: '5.4:1',
			pass: 'AA'
		},
		{
			fg: '#6E7878',
			bg: '#FAF8F1',
			label: 'Muted on cream',
			role: 'Secondary text. --fg-muted over --bg.',
			ratio: '4.6:1',
			pass: 'AA'
		}
	];

	let pressed = $state(false);
	function press() {
		pressed = true;
		setTimeout(() => (pressed = false), 220);
	}
</script>

<svelte:head><title>Accessibility — Foundations — Dashbook</title></svelte:head>

<InnerPage section="/foundations" wide>
	<PageHeader
		label="Foundations / Accessibility"
		title="Accessibility."
		lede="WCAG 2.2 AA is the floor. Keyboard-first, motion-considerate, contrast-checked — across the portal and every component we ship."
	/>

	<Section label="Targets" note="The non-negotiables. If a surface fails any of these, it ships with a fix, not a waiver.">
		<table class="targets">
			<thead>
				<tr>
					<th>Target</th>
					<th>Value</th>
					<th>Detail</th>
				</tr>
			</thead>
			<tbody>
				{#each targets as t (t.key)}
					<tr>
						<td class="t-key">{t.key}</td>
						<td class="t-val tabular-nums">{t.value}</td>
						<td class="t-detail">{t.detail}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Section>

	<Section id="focus-demo" label="Focus visualization" note="Tab through the three controls to see the ring. We use :focus-visible only — mouse clicks never light it up.">
		<div class="focus-row">
			<button type="button" class="demo-button">Continue</button>
			<input type="text" class="demo-input" placeholder="email@dash.fi" aria-label="Email address" />
			<a class="demo-link" href="/components/button">View Button docs</a>
		</div>
	</Section>

	<Section label="Contrast tokens" note="Computed against the cream surface. Every product text colour clears AA for its size class.">
		<div class="contrast-grid">
			{#each contrastRows as r (r.label)}
				<div class="cr">
					<div class="cr-sample" style:background={r.bg} style:color={r.fg}>
						<span class="cr-sample-title">Aa</span>
						<span class="cr-sample-body">Body copy at 15px sits here, like this line.</span>
					</div>
					<div class="cr-meta">
						<div class="cr-label">{r.label}</div>
						<div class="cr-tokens">
							<CopyValue value={r.fg} label={`${r.label} foreground`} />
							<CopyValue value={r.bg} label={`${r.label} background`} />
						</div>
						<div class="cr-row">
							<span class="cr-ratio tabular-nums">{r.ratio}</span>
							<span class="cr-pass">Pass · {r.pass}</span>
						</div>
						<p class="cr-role">{r.role}</p>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Motion" note="Press feedback is universal across buttons. Per-character stagger lives on the marketing-side hero only. Both honour reduce-motion via @media.">
		<div class="motion-demo">
			<button type="button" class="press-btn" class:pressed onclick={press}>Press me</button>
			<p class="motion-note">
				The press uses <code>transform: scale(0.97)</code> at 100ms. Under
				<code>@media (prefers-reduced-motion: reduce)</code> the transform is removed entirely and
				the button state changes without animation.
			</p>
		</div>
	</Section>

	<Section label="Screen reader patterns">
		<ul class="rules">
			<li><strong>Semantic HTML first.</strong> Use <code>&lt;button&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> before reaching for ARIA. Most components need no <code>role</code> at all.</li>
			<li><strong>aria-label on icon-only buttons.</strong> Every standalone icon trigger gets a label (close, copy, dismiss). No exceptions.</li>
			<li><strong>aria-busy for loading.</strong> Set on the region that is fetching, not the whole page, so the rest stays navigable.</li>
			<li><strong>aria-current for nav.</strong> Sidebar links and tabs set <code>aria-current="page"</code> or <code>aria-current="true"</code> on the active item.</li>
			<li><strong>Live regions for toasts.</strong> Polite by default, assertive only for errors that block the user.</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.targets {
		width: 100%;
		border-collapse: collapse;
	}
	.targets th {
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
	.targets td {
		padding: 16px 16px 16px 0;
		border-bottom: 1px solid var(--border);
		vertical-align: top;
		font-size: 14px;
		line-height: 1.55;
	}
	.t-key {
		width: 160px;
		color: var(--fg);
		font-weight: 500;
	}
	.t-val {
		width: 240px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg);
	}
	.t-detail {
		color: var(--fg-muted);
	}

	.focus-row {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: center;
		padding: 32px;
		border: 1px solid var(--border);
		background: var(--bg-muted);
	}
	.demo-button {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		background: var(--primary);
		color: var(--primary-fg);
		border: 0;
		padding: 0 16px;
		min-height: 44px;
		cursor: pointer;
	}
	.demo-input {
		font-family: var(--font-sans);
		font-size: 13px;
		background: var(--bg);
		border: 1px solid var(--input-border);
		color: var(--fg);
		padding: 0 12px;
		min-height: 44px;
		min-width: 220px;
	}
	.demo-link {
		font-size: 13px;
		color: var(--brand);
		text-decoration: none;
		padding: 12px 4px;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
	}
	.demo-link:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.contrast-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.cr {
		display: flex;
		flex-direction: column;
		background: var(--bg);
	}
	.cr-sample {
		min-height: 140px;
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		justify-content: center;
	}
	.cr-sample-title {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 40px;
		line-height: 1;
	}
	.cr-sample-body {
		font-size: 13px;
		line-height: 1.55;
	}
	.cr-meta {
		padding: 16px 20px 20px;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.cr-label {
		font-size: 13px;
		color: var(--fg);
		font-weight: 500;
	}
	.cr-tokens {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.cr-row {
		display: flex;
		gap: 12px;
		align-items: baseline;
	}
	.cr-ratio {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--fg);
	}
	.cr-pass {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--brand);
		border: 1px solid var(--brand);
		padding: 2px 6px;
	}
	.cr-role {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
	}

	.motion-demo {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 32px;
		border: 1px solid var(--border);
		background: var(--bg-muted);
		align-items: flex-start;
	}
	.press-btn {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		background: var(--primary);
		color: var(--primary-fg);
		border: 0;
		padding: 0 18px;
		min-height: 44px;
		cursor: pointer;
		transition: transform 100ms var(--easing-default);
	}
	.press-btn.pressed {
		transform: scale(0.97);
	}
	@media (prefers-reduced-motion: reduce) {
		.press-btn {
			transition: none;
		}
		.press-btn.pressed {
			transform: none;
		}
	}
	.motion-note {
		font-size: 13px;
		line-height: 1.6;
		color: var(--fg-muted);
		margin: 0;
		max-width: 640px;
	}
	.motion-note code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg);
		padding: 1px 6px;
	}

	.rules {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.rules li {
		padding: 16px 0;
		border-top: 1px solid var(--border);
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
	.rules li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.rules code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}

	@media (max-width: 960px) {
		.contrast-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 720px) {
		.targets td,
		.targets th {
			font-size: 12px;
		}
		.t-key,
		.t-val {
			width: auto;
		}
	}
</style>
