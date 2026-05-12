<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CopyValue from '$chrome/CopyValue.svelte';

	const scale = [
		{ token: '--radius-none', value: '0', use: 'Default. Cards, panels, sections, inputs, table cells.' },
		{ token: '--radius-sm', value: '4px', use: 'Internal chips inside buttons, small tags.' },
		{ token: '--radius-md', value: '6px', use: 'Buttons. The one place radii bend the architectural rule.' },
		{ token: '--radius-lg', value: '8px', use: 'Avoid. Reserved for the marketing stat-grid card on the login page (one exception).' },
		{ token: '--radius-full', value: '9999px', use: 'Avatars, icon-button hit-targets, pill badges.' }
	];
</script>

<svelte:head><title>Radius — Foundations — Dashbook</title></svelte:head>

<InnerPage section="/foundations" wide>
	<PageHeader
		label="Foundations / Radius"
		title="Radius."
		lede="The default is zero. Squared corners are the brand mannerism — architectural, deliberate, opinionated. Buttons are the one place we relent."
	/>

	<Section
		label="The architectural-zero stance"
		note="Most product surfaces — cards, sections, inputs, popovers — use --radius: 0. This is the look. If you find yourself reaching for rounded corners, ask why; the answer is usually 'don't.'"
	>
		<div class="stance">
			<div class="comp comp-zero">
				<div class="comp-canvas">
					<div class="surface" style:border-radius="0">
						<div class="s-label">A card. Zero radius.</div>
					</div>
				</div>
				<div class="comp-cap">Default — every product surface</div>
			</div>
			<div class="comp comp-six">
				<div class="comp-canvas">
					<button class="surface btn" style:border-radius="6px">A button. 6px radius.</button>
				</div>
				<div class="comp-cap">Buttons — the exception (and only buttons)</div>
			</div>
		</div>
	</Section>

	<Section label="Scale">
		<div class="scale">
			{#each scale as s (s.token)}
				<div class="row">
					<div class="vis">
						<div class="shape" style:border-radius={s.value}></div>
					</div>
					<div class="meta">
						<div class="label">
							<CopyValue value={s.token} label={s.token} />
							<span class="value tabular-nums">{s.value}</span>
						</div>
						<p class="use">{s.use}</p>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="When to deviate">
		<ul class="rules">
			<li>
				<strong>Buttons.</strong> 6px (<code>--radius-md</code>). Already wired into the lib's
				button component.
			</li>
			<li>
				<strong>Avatars.</strong> 9999px (<code>--radius-full</code>). Standard.
			</li>
			<li>
				<strong>Pill badges.</strong> 9999px. Specifically for status tags ("Active", "Frozen",
				"3% cashback").
			</li>
			<li>
				<strong>App icon.</strong> 36px corner radius — a property of the icon SVG itself, not
				applied via container. See <a href="/brand/logo">Logo</a>.
			</li>
			<li>
				<strong>Marketing stat-grid card</strong> on the login page. The only product surface with
				rounded corners — and that's a marketing surface masquerading as product. Don't replicate.
			</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.stance {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.comp {
		background: var(--bg);
	}
	.comp-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 200px;
		padding: 32px;
	}
	.surface {
		width: 100%;
		max-width: 280px;
		min-height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-muted);
		border: 1px solid var(--border);
	}
	.s-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		color: var(--fg-muted);
	}
	.btn {
		max-width: 200px;
		min-height: 36px;
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		background: var(--primary);
		color: var(--primary-fg);
		border: 0;
		cursor: pointer;
	}
	.comp-cap {
		padding: 12px 24px;
		border-top: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}

	.scale {
		display: flex;
		flex-direction: column;
	}
	.row {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 32px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
		align-items: center;
	}
	.row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.vis {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 64px;
	}
	.shape {
		width: 64px;
		height: 64px;
		background: var(--brand);
	}
	.label {
		display: flex;
		gap: 16px;
		align-items: center;
		margin-bottom: 6px;
	}
	.value {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
	}
	.use {
		font-size: 13px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 600px;
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
	.rules a {
		color: var(--brand);
		text-decoration: none;
	}
	.rules a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	@media (max-width: 720px) {
		.stance {
			grid-template-columns: 1fr;
		}
		.row {
			grid-template-columns: 80px 1fr;
			gap: 16px;
		}
	}
</style>
