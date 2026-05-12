<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CopyValue from '$chrome/CopyValue.svelte';

	const shadows = [
		{
			token: '--shadow-sm',
			value: '0 1px 2px 0 rgba(18,59,57,0.08)',
			label: 'sm',
			role: 'Subtle lift. Reach for it on a popover or menu sheet — the smallest visible elevation we ship.'
		},
		{
			token: '--shadow-md',
			value: '0 6px 20px -6px rgba(18,59,57,0.14), 0 1px 2px rgba(18,59,57,0.06)',
			label: 'md',
			role: 'Floating UI proper. Tooltips, dropdowns, toasts, modal overlay backdrops. Never on cards.'
		}
	];
</script>

<svelte:head><title>Elevation — Foundations — Dashbook</title></svelte:head>

<InnerPage section="/foundations" wide>
	<PageHeader
		label="Foundations / Elevation"
		title="Elevation."
		lede="Depth is restraint. Two shadows total, neither used for layout. Hairline borders carry the rest."
	/>

	<Section label="Tokens" note="Only two shadow tokens exist. There is no scale of six, no inset variants, no coloured glows. If you reach for a third value, the answer is a hairline border.">
		<div class="tokens">
			{#each shadows as s (s.token)}
				<div class="card">
					<div class="card-canvas">
						<div class="floater" style:box-shadow="var({s.token})">
							<span class="floater-label">{s.label}</span>
						</div>
					</div>
					<div class="card-meta">
						<div class="meta-row">
							<CopyValue value={s.token} label={s.token} />
						</div>
						<div class="meta-css">
							<CopyValue value={s.value} label={`${s.token} value`} />
						</div>
						<p class="meta-role">{s.role}</p>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="When to use a shadow">
		<ul class="rules">
			<li><strong>Popover.</strong> Floating panel anchored to a trigger.</li>
			<li><strong>Dropdown.</strong> Menus, select sheets, combo boxes.</li>
			<li><strong>Tooltip.</strong> Small hovering helper attached to a control.</li>
			<li><strong>Toast.</strong> Transient notification that hovers over the page.</li>
			<li><strong>Modal overlay backdrop.</strong> The dim layer behind a dialog.</li>
		</ul>
	</Section>

	<Section label="When not to use a shadow">
		<ul class="rules">
			<li><strong>Card.</strong> Hairline border at <code>--border</code>. No drop shadow, ever.</li>
			<li><strong>Section.</strong> Hairline rule top and bottom — never elevated.</li>
			<li><strong>Button.</strong> Solid fill, hairline edge if outlined. Pressed state is <code>scale(0.97)</code>, not a shadow change.</li>
			<li><strong>Surface elevation.</strong> Layered panels separate by border, not shadow stacking.</li>
			<li><strong>Hover states.</strong> Colour and weight shifts only — never a shadow that wasn&rsquo;t there at rest.</li>
		</ul>
	</Section>

	<Section
		label="Borders carry depth"
		note="The 1px hairline at --border is the primary depth signal. It separates surfaces without lifting them, which is the visual register the brand keeps."
	>
		<div class="contrast">
			<div class="contrast-cell don">
				<div class="contrast-canvas don-canvas">
					<div class="don-card">
						<div class="dc-label">Card.</div>
						<div class="dc-body">Drop shadow under the whole surface.</div>
					</div>
				</div>
				<div class="contrast-cap">
					<span class="cap-tag">Don&rsquo;t</span>
					<span class="cap-text">Shadow used to separate one surface from another.</span>
				</div>
			</div>
			<div class="contrast-cell do">
				<div class="contrast-canvas">
					<div class="do-card">
						<div class="dc-label">Card.</div>
						<div class="dc-body">Hairline border, no shadow.</div>
					</div>
				</div>
				<div class="contrast-cap">
					<span class="cap-tag">Do</span>
					<span class="cap-text">1px <code>--border</code> hairline. Depth without weight.</span>
				</div>
			</div>
		</div>
	</Section>
</InnerPage>

<style>
	.tokens {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.card {
		display: flex;
		flex-direction: column;
		background: var(--bg);
	}
	.card-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 220px;
		padding: 48px;
		background: var(--bg-muted);
	}
	.floater {
		width: 160px;
		height: 96px;
		background: var(--bg);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.floater-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.card-meta {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border-top: 1px solid var(--border);
	}
	.meta-row {
		display: flex;
	}
	.meta-css :global(.copy) {
		max-width: 100%;
	}
	.meta-css :global(.copy .value) {
		white-space: normal;
		word-break: break-all;
		text-align: left;
	}
	.meta-role {
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		margin: 0;
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

	.contrast {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.contrast-cell {
		background: var(--bg);
		display: flex;
		flex-direction: column;
	}
	.contrast-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 220px;
		padding: 32px;
		background: var(--bg-muted);
	}
	.don-canvas {
		background: var(--bg-muted);
	}
	.don-card,
	.do-card {
		width: 100%;
		max-width: 260px;
		background: var(--bg);
		padding: 20px;
	}
	.don-card {
		box-shadow:
			0 18px 40px -10px rgba(18, 59, 57, 0.25),
			0 6px 14px rgba(18, 59, 57, 0.12);
	}
	.do-card {
		border: 1px solid var(--border);
	}
	.dc-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 8px;
	}
	.dc-body {
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg);
	}
	.contrast-cap {
		display: flex;
		gap: 12px;
		align-items: center;
		padding: 14px 20px;
		border-top: 1px solid var(--border);
	}
	.cap-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-muted);
		border: 1px solid var(--border);
		padding: 2px 8px;
	}
	.do .cap-tag {
		color: var(--brand);
		border-color: var(--brand);
	}
	.cap-text {
		font-size: 13px;
		color: var(--fg-muted);
	}
	.cap-text code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}

	@media (max-width: 720px) {
		.tokens,
		.contrast {
			grid-template-columns: 1fr;
		}
	}
</style>
