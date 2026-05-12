<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CopyValue from '$chrome/CopyValue.svelte';

	const scale = [
		{ token: 'space-1', tw: 'p-1', value: '4px', rem: '0.25rem', use: 'Tight inline gaps, icon-to-label' },
		{ token: 'space-2', tw: 'p-2', value: '8px', rem: '0.5rem', use: 'Button gap, chip padding' },
		{ token: 'space-3', tw: 'p-3', value: '12px', rem: '0.75rem', use: 'Card-internal gaps, table cells' },
		{ token: 'space-4', tw: 'p-4', value: '16px', rem: '1rem', use: 'Default block gap, form rows' },
		{ token: 'space-6', tw: 'p-6', value: '24px', rem: '1.5rem', use: 'Section gap — workhorse for layout' },
		{ token: 'space-8', tw: 'p-8', value: '32px', rem: '2rem', use: 'Page padding (desktop), section padding' },
		{ token: 'space-10', tw: 'p-10', value: '40px', rem: '2.5rem', use: 'Wide page chrome' },
		{ token: 'space-12', tw: 'p-12', value: '48px', rem: '3rem', use: 'Page padding (desktop), block separation' },
		{ token: 'space-16', tw: 'p-16', value: '64px', rem: '4rem', use: 'Hero pad, section breaks' },
		{ token: 'space-20', tw: 'p-20', value: '80px', rem: '5rem', use: 'Large hero, page-end breathing room' }
	];

	const padding = [
		{ break: 'Mobile', value: '24px', token: '--space-6' },
		{ break: 'Tablet', value: '32px', token: '--space-8' },
		{ break: 'Desktop', value: '48px', token: '--space-12' }
	];
</script>

<svelte:head><title>Spacing — Foundations — Dashbook</title></svelte:head>

<InnerPage section="/foundations" wide>
	<PageHeader
		label="Foundations / Spacing"
		title="Spacing."
		lede="0.25rem base. Tailwind's scale, with named tokens for the values that show up in the system. Always use gap-* between siblings — never margin."
	/>

	<Section label="Scale" note="The entire system uses these 10 values. If you're reaching for a different number, you're probably wrong.">
		<div class="scale">
			{#each scale as s (s.token)}
				<div class="row">
					<div class="vis">
						<div class="bar" style:width="{s.value}"></div>
					</div>
					<div class="meta">
						<div class="label">
							<span class="token">--{s.token}</span>
							<span class="tw tabular-nums">{s.tw}</span>
						</div>
						<div class="values tabular-nums">
							<span class="px">{s.value}</span>
							<span class="rem">{s.rem}</span>
						</div>
						<p class="use">{s.use}</p>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Page padding">
		<div class="padding">
			{#each padding as p (p.break)}
				<div class="pad-row">
					<div class="pad-break">{p.break}</div>
					<div class="pad-value tabular-nums">{p.value}</div>
					<CopyValue value={p.token} label="page padding token" />
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Layout rules">
		<ul class="rules">
			<li>
				<strong>Always use <code>gap-*</code></strong> between siblings — flex or grid. Never
				<code>margin-bottom</code> on a child to space the next sibling. Margins compound, gaps don't.
			</li>
			<li>
				<strong>Section gap is 24px (<code>gap-6</code>)</strong>. Page padding is 24/32/48 for
				mobile/tablet/desktop. Maximum content width is 1800px.
			</li>
			<li>
				<strong>Sidebar is 256px expanded, 56px collapsed.</strong> Always at left. The Dashbook
				portal itself uses the same 220px secondary sidebar pattern for sub-section navigation.
			</li>
			<li>
				<strong>Hairline borders</strong> live in spacing, not in margin. Use <code>border-top</code>
				+ <code>padding-top: 1.5rem</code> instead of <code>margin-top</code> to create separation.
			</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.scale {
		display: flex;
		flex-direction: column;
	}
	.row {
		display: grid;
		grid-template-columns: 280px 1fr;
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
		min-height: 32px;
	}
	.bar {
		height: 24px;
		background: var(--brand);
	}
	.label {
		display: flex;
		gap: 12px;
		align-items: baseline;
		margin-bottom: 4px;
	}
	.token {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--brand);
	}
	.tw {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
	}
	.values {
		display: flex;
		gap: 12px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg);
		margin-bottom: 4px;
	}
	.rem {
		color: var(--fg-muted);
	}
	.use {
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
	}

	.padding {
		display: flex;
		flex-direction: column;
	}
	.pad-row {
		display: grid;
		grid-template-columns: 200px 120px 1fr;
		gap: 24px;
		padding: 16px 0;
		border-top: 1px solid var(--border);
		align-items: center;
	}
	.pad-row:last-child {
		border-bottom: 1px solid var(--border);
	}
	.pad-break {
		font-size: 14px;
		color: var(--fg);
	}
	.pad-value {
		font-family: var(--font-mono);
		font-size: 13px;
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
	@media (max-width: 720px) {
		.row,
		.pad-row {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
</style>
