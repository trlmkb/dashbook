<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';

	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import KeyRound from '@lucide/svelte/icons/key-round';
	import Mail from '@lucide/svelte/icons/mail';
	import Search from '@lucide/svelte/icons/search';
	import Plus from '@lucide/svelte/icons/plus';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	const sizes = [
		{ name: 'size-3', px: 12, role: 'Inside small buttons, table chevrons' },
		{ name: 'size-4', px: 16, role: 'Workhorse — buttons, inline labels, chips' },
		{ name: 'size-5', px: 20, role: 'Sidebar nav items' },
		{ name: 'size-6', px: 24, role: 'Empty-state hero icons' }
	];

	const dos = [
		{ kind: 'do' as const, text: 'Use Lucide exclusively. Imported via @lucide/svelte. Stroke 1.5 (override the default 2).' },
		{ kind: 'do' as const, text: 'Inherit color from currentColor. Tone via text utilities (text-fg-muted, text-brand, text-destructive).' },
		{ kind: 'do' as const, text: 'Match icon size to context: 12px in tight UI, 16px default, 20px for nav, 24px for empty states.' },
		{ kind: 'dont' as const, text: 'Don\'t use emoji anywhere. Not in labels, not in toasts, not in empty states. Ever.' },
		{ kind: 'dont' as const, text: 'Don\'t introduce a second icon library. No Heroicons, no Phosphor, no custom set.' },
		{ kind: 'dont' as const, text: 'Don\'t fill icons. The system is stroked. Filled icons read as a different brand.' }
	];

	const sample = `<script lang="ts">
\timport TrendingUp from '@lucide/svelte/icons/trending-up';
<\/script>

<TrendingUp size={16} strokeWidth={1.5} />`;
</script>

<svelte:head><title>Iconography — Brand — Dashbook</title></svelte:head>

<InnerPage section="/brand" wide>
	<PageHeader
		label="Brand / Iconography"
		title="Iconography."
		lede="Lucide, exclusively. Stroke 1.5. Inherits currentColor. Sized 12 / 16 / 20 / 24. No emoji, no PNG icons, no second library."
	/>

	<Section
		label="The set"
		note="A representative slice — the codebase actually uses ~80 distinct Lucide icons. Add to this set by import; never re-trace."
	>
		<div class="icons">
			{#each [
				{ Icon: RefreshCw, name: 'refresh-cw' },
				{ Icon: TriangleAlert, name: 'triangle-alert' },
				{ Icon: TrendingUp, name: 'trending-up' },
				{ Icon: KeyRound, name: 'key-round' },
				{ Icon: Mail, name: 'mail' },
				{ Icon: Search, name: 'search' },
				{ Icon: Plus, name: 'plus' },
				{ Icon: ChevronDown, name: 'chevron-down' }
			] as item (item.name)}
				<div class="icon-cell">
					<div class="icon-canvas">
						<item.Icon size={24} strokeWidth={1.5} />
					</div>
					<div class="icon-name">{item.name}</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Sizes">
		<div class="sizes">
			{#each sizes as s (s.name)}
				<div class="size-row">
					<div class="size-canvas">
						<TrendingUp size={s.px} strokeWidth={1.5} />
					</div>
					<div class="size-meta">
						<span class="size-name">{s.name}</span>
						<span class="size-px tabular-nums">{s.px}px</span>
						<span class="size-role">{s.role}</span>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Tones">
		<div class="tones">
			<div class="tone-cell" style:color="var(--fg)">
				<TrendingUp size={20} strokeWidth={1.5} />
				<span class="tone-label">fg</span>
			</div>
			<div class="tone-cell" style:color="var(--fg-muted)">
				<TrendingUp size={20} strokeWidth={1.5} />
				<span class="tone-label">fg-muted</span>
			</div>
			<div class="tone-cell" style:color="var(--brand)">
				<TrendingUp size={20} strokeWidth={1.5} />
				<span class="tone-label">brand</span>
			</div>
			<div class="tone-cell" style:color="var(--destructive)">
				<TrendingUp size={20} strokeWidth={1.5} />
				<span class="tone-label">destructive</span>
			</div>
		</div>
	</Section>

	<Section label="Usage">
		<CodeSnippet code={sample} language="svelte" />
	</Section>

	<Section label="Brand marks">
		<div class="brand-marks">
			<p>
				The dash.fi wordmark and app icon are the only custom marks in the system. Everything else
				is Lucide, by import. See <a href="/brand/logo">Logo</a> for downloads and rules.
			</p>
		</div>
	</Section>

	<Section label="Do · Don't">
		<DoDontGrid items={dos} />
	</Section>
</InnerPage>

<style>
	.icons {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.icon-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 24px 16px;
		background: var(--bg);
		color: var(--fg);
	}
	.icon-canvas {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
	}
	.icon-name {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: -0.01em;
		color: var(--fg-muted);
	}

	.sizes {
		display: flex;
		flex-direction: column;
	}
	.size-row {
		display: grid;
		grid-template-columns: 64px 1fr;
		gap: 24px;
		padding: 20px 0;
		border-top: 1px solid var(--border);
		align-items: center;
	}
	.size-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.size-canvas {
		display: flex;
		justify-content: center;
		color: var(--fg);
	}
	.size-meta {
		display: flex;
		gap: 16px;
		align-items: baseline;
		font-size: 14px;
	}
	.size-name {
		font-family: var(--font-mono);
		color: var(--brand);
		min-width: 60px;
	}
	.size-px {
		font-family: var(--font-mono);
		color: var(--fg-muted);
		min-width: 50px;
	}
	.size-role {
		color: var(--fg);
	}

	.tones {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.tone-cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 24px;
		background: var(--bg);
	}
	.tone-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		color: var(--fg-muted);
	}

	.brand-marks p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		max-width: 640px;
	}
	.brand-marks a {
		color: var(--brand);
		text-decoration: none;
	}
	.brand-marks a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
