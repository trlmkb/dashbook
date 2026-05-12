<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CopyValue from '$chrome/CopyValue.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	const easings = [
		{ token: '--easing-out', value: 'cubic-bezier(0.16, 1, 0.3, 1)', role: 'Default for entries — slow ease-out, signature' },
		{ token: '--easing-in', value: 'cubic-bezier(0.4, 0, 1, 1)', role: 'Exits — fast accelerating' },
		{ token: '--easing-default', value: 'cubic-bezier(0.4, 0, 0.2, 1)', role: 'Most things — symmetric ease-in-out' }
	];

	const durations = [
		{ token: '--dur-instant', value: '50ms', role: 'Hover state changes, micro-interactions' },
		{ token: '--dur-fast', value: '150ms', role: 'Standard — buttons, links, focus rings' },
		{ token: '--dur-normal', value: '300ms', role: 'Sheets, dialogs, route transitions' },
		{ token: '--dur-slow', value: '500ms', role: 'Reserved — only when 300ms feels rushed' }
	];
</script>

<svelte:head><title>Motion — Foundations — Dashbook</title></svelte:head>

<InnerPage section="/foundations" wide>
	<PageHeader
		label="Foundations / Motion"
		title="Motion."
		lede="Three easings. Four durations. Token-driven — never hand-rolled cubic-béziers in components. The brand-side narrative lives at /brand/motion."
	/>

	<Section label="Easing tokens">
		<div class="tokens">
			{#each easings as e (e.token)}
				<div class="row">
					<div class="vis">
						<div class="track">
							<div class="dot" style:animation-timing-function={e.value}></div>
						</div>
					</div>
					<div class="meta">
						<div class="label">
							<CopyValue value={e.token} label={e.token} />
						</div>
						<div class="value tabular-nums">{e.value}</div>
						<p class="role">{e.role}</p>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Duration tokens">
		<table class="durations">
			<thead>
				<tr>
					<th>Token</th>
					<th>Value</th>
					<th>Role</th>
				</tr>
			</thead>
			<tbody>
				{#each durations as d (d.token)}
					<tr>
						<td><CopyValue value={d.token} label={d.token} /></td>
						<td class="dv tabular-nums">{d.value}</td>
						<td class="dr">{d.role}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Section>

	<Section label="Usage rules">
		<ul class="rules">
			<li><strong>No spring or bounce.</strong> The brand is precise.</li>
			<li><strong>Press feedback is universal.</strong> Every button — and only buttons — uses
				<code>scale(0.97)</code> at 100ms.
			</li>
			<li><strong>Reduce-motion respected.</strong> All durations collapse to 0 under
				<code>@media (prefers-reduced-motion: reduce)</code>. Animations become instant transitions.
			</li>
			<li><strong>Token names mirror CSS vars.</strong> Use <code>var(--dur-fast)</code> in Svelte
				styles, not literal <code>150ms</code>.</li>
		</ul>
	</Section>

	<a class="see-brand" href="/brand/motion">
		<span>
			<span class="see-label">Brand / Motion</span>
			<span class="see-title">See the signature animations live</span>
		</span>
		<ArrowUpRight size={16} strokeWidth={1.5} />
	</a>
</InnerPage>

<style>
	.tokens {
		display: flex;
		flex-direction: column;
	}
	.row {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 32px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
		align-items: center;
	}
	.row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.vis {
		padding: 24px 0;
	}
	.track {
		position: relative;
		height: 4px;
		background: var(--border);
	}
	.dot {
		position: absolute;
		top: -4px;
		left: 0;
		width: 12px;
		height: 12px;
		background: var(--brand);
		border-radius: 999px;
		animation: move 2.5s infinite alternate;
	}
	@keyframes move {
		from {
			left: 0;
		}
		to {
			left: calc(100% - 12px);
		}
	}
	.label {
		margin-bottom: 4px;
	}
	.value {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
		margin-bottom: 4px;
	}
	.role {
		font-size: 13px;
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
		vertical-align: middle;
		font-size: 14px;
	}
	.dv {
		font-family: var(--font-mono);
		color: var(--fg);
		width: 120px;
	}
	.dr {
		color: var(--fg-muted);
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

	.see-brand {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding: 24px 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		text-decoration: none;
		color: var(--fg);
		transition: color 150ms;
		margin-top: 64px;
	}
	.see-brand:hover {
		color: var(--brand);
	}
	.see-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 4px;
	}
	.see-title {
		display: block;
		font-size: 17px;
		font-weight: 500;
	}

	@media (max-width: 720px) {
		.row {
			grid-template-columns: 1fr;
		}
	}
</style>
