<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import AssetDownload from '$chrome/AssetDownload.svelte';
	import DoDontGrid from '$chrome/DoDontGrid.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	const families = [
		{
			name: 'PP Supply Mono',
			role: 'Display + numerics',
			specimen: 'BUILT FOR GROWTH',
			weights: 'Ultralight 200 · Regular 400',
			source: 'Pangram Pangram (commercial)',
			fontFamily: 'PP Supply Mono'
		},
		{
			name: 'Bai Jamjuree',
			role: 'Body + UI',
			specimen: 'Every dollar earns.',
			weights: 'Regular 400 · Medium 500 · Semibold 600',
			source: 'Google Fonts (OFL — free)',
			fontFamily: 'Bai Jamjuree'
		},
		{
			name: 'PP Supply Sans',
			role: 'Secondary display',
			specimen: 'For rare deck moments.',
			weights: 'Ultralight 200 · Regular 400',
			source: 'Pangram Pangram (commercial)',
			fontFamily: 'PP Supply Sans'
		}
	];

	const scale = [
		{ size: 12, role: 'Caption · footnote', sample: 'Footnote — issuing bank disclosure' },
		{ size: 14, role: 'Body small · UI', sample: 'Recent transactions' },
		{ size: 15, role: 'Body', sample: 'Spending data refreshed successfully.' },
		{ size: 17, role: 'Body large · lede', sample: 'The most rewarding card for growing your business.' },
		{ size: 20, role: 'Subhead', sample: 'New here?' },
		{ size: 24, role: 'Section title', sample: 'Avg overcharge rate' },
		{ size: 32, role: 'Page heading', sample: 'Cards' },
		{ size: 48, role: 'Hero (mid)', sample: '$2M+ daily limits' },
		{ size: 56, role: 'Hero (page header)', sample: 'Dashboard' },
		{ size: 72, role: 'Display', sample: 'BUILT FOR GROWTH' }
	];

	const dos = [
		{ kind: 'do' as const, text: 'Use sentence case for UI: page titles, buttons, menu items, table headers.' },
		{ kind: 'do' as const, text: 'Use UPPERCASE TRACKED only for display headings, section labels (11px, 0.15em), and stat labels.' },
		{ kind: 'do' as const, text: 'Use tabular numerics (font-variant-numeric: tabular-nums) for every number — currency, dates, counts.' },
		{ kind: 'dont' as const, text: 'Don\'t use exclamation marks in product UI. Marketing celebrations are a rare exception.' },
		{ kind: 'dont' as const, text: 'Don\'t set body copy in the display font. PP Supply Mono Ultralight is for hero, not paragraphs.' },
		{ kind: 'dont' as const, text: 'Don\'t use proportional figures in tables. Tabular figures only — alignment is non-negotiable.' }
	];
</script>

<svelte:head><title>Typography — Brand — Dashbook</title></svelte:head>

<InnerPage section="/brand" wide>
	<PageHeader
		label="Brand / Typography"
		title="Typography."
		lede="PP Supply Mono Ultralight for display and numerics. Bai Jamjuree for body and UI. Tight tracking, tabular figures, never decorative."
	/>

	<div class="hero" aria-hidden="true">
		<div class="hero-line">FASTER</div>
		<div class="hero-line">THAN LIGHT.</div>
		<div class="hero-cap">PP SUPPLY MONO ULTRALIGHT · 96PX · -0.02EM</div>
	</div>

	<Section label="Families">
		<div class="families">
			{#each families as f (f.name)}
				<div class="family">
					<div class="family-meta">
						<div>
							<div class="family-name">{f.name}</div>
							<div class="family-role">{f.role}</div>
						</div>
						<div class="family-source">
							<div class="kv">
								<span class="k">Weights</span>
								<span class="v">{f.weights}</span>
							</div>
							<div class="kv">
								<span class="k">Source</span>
								<span class="v">{f.source}</span>
							</div>
						</div>
					</div>
					<div class="specimen" style:font-family={f.fontFamily}>{f.specimen}</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="Scale" note="The size rhythm: 12 / 14 / 15 / 17 / 20 / 24 / 32 / 48 / 56 / 72px. Line-height tightens as size grows.">
		<table class="scale">
			<thead>
				<tr>
					<th>Size</th>
					<th>Role</th>
					<th>Specimen</th>
				</tr>
			</thead>
			<tbody>
				{#each scale as s (s.size)}
					<tr>
						<td class="px tabular-nums">{s.size}px</td>
						<td class="role">{s.role}</td>
						<td class="sample" style:font-size="{Math.min(s.size, 36)}px" style:line-height="1.1">
							{s.sample}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Section>

	<Section label="Casing rules">
		<ul class="casing">
			<li>
				<span class="case-name">Sentence case</span>
				<p>Default for everything in the UI: page titles, buttons, menu items, table headers, body. <em>Recent transactions</em>, not <em>Recent Transactions</em>.</p>
			</li>
			<li>
				<span class="case-name">Title case</span>
				<p>Reserved for proper nouns and product names. <em>Dash.fi</em>, <em>Bill Pay</em>, <em>Cash Advance</em>.</p>
			</li>
			<li>
				<span class="case-name">UPPERCASE TRACKED</span>
				<p>The brand mannerism. Display headings (PP Supply Mono Ultralight), section labels (11px / 0.15em), stat labels.</p>
			</li>
		</ul>
	</Section>

	<Section
		label="Downloads"
		note="PP Supply files are licensed from Pangram Pangram. Self-hosted only on dash.fi-owned surfaces."
	>
		<div class="downloads">
			<AssetDownload name="PP Supply Mono · Ultralight" format="OTF" href="/fonts/PPSupplyMono-Ultralight.otf">
				{#snippet preview()}
					<span class="dl-spec mono ul">Aa</span>
				{/snippet}
			</AssetDownload>
			<AssetDownload name="PP Supply Mono · Regular" format="OTF" href="/fonts/PPSupplyMono-Regular.otf">
				{#snippet preview()}
					<span class="dl-spec mono">Aa</span>
				{/snippet}
			</AssetDownload>
			<AssetDownload name="PP Supply Sans · Ultralight" format="OTF" href="/fonts/PPSupplySans-Ultralight.otf">
				{#snippet preview()}
					<span class="dl-spec sans ul">Aa</span>
				{/snippet}
			</AssetDownload>
			<AssetDownload name="PP Supply Sans · Regular" format="OTF" href="/fonts/PPSupplySans-Regular.otf">
				{#snippet preview()}
					<span class="dl-spec sans">Aa</span>
				{/snippet}
			</AssetDownload>
		</div>
	</Section>

	<Section label="Font license" id="license">
		<div class="license">
			<p>
				<strong>PP Supply Mono</strong> and <strong>PP Supply Sans</strong> are commercial fonts
				licensed from
				<a href="https://pangrampangram.com" target="_blank" rel="noopener">
					Pangram Pangram <ArrowUpRight size={12} strokeWidth={1.5} />
				</a>
				. They may be self-hosted on dash.fi-owned surfaces and used in deliverables produced for
				Dash.fi. Partners and press should not redistribute the font files.
			</p>
			<p>
				<strong>Bai Jamjuree</strong> is licensed under the SIL Open Font License (OFL) and
				redistributable.
			</p>
		</div>
	</Section>

	<Section label="Do · Don't">
		<DoDontGrid items={dos} />
	</Section>
</InnerPage>

<style>
	.hero {
		padding: 64px 0 80px;
		border-bottom: 1px solid var(--border);
		margin-bottom: 64px;
	}
	.hero-line {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(3rem, 12vw, 9rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		text-transform: uppercase;
		color: var(--fg);
	}
	.hero-cap {
		margin-top: 32px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.families {
		display: flex;
		flex-direction: column;
	}
	.family {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 32px;
		padding: 32px 0;
		border-top: 1px solid var(--border);
		align-items: center;
	}
	.family:last-child {
		border-bottom: 1px solid var(--border);
	}
	.family-meta {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.family-name {
		font-size: 17px;
		font-weight: 500;
	}
	.family-role {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-top: 4px;
	}
	.family-source {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.kv {
		display: flex;
		gap: 8px;
		font-size: 12px;
	}
	.k {
		font-family: var(--font-mono);
		color: var(--fg-muted);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		min-width: 60px;
	}
	.v {
		color: var(--fg);
	}
	.specimen {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 200;
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--fg);
		text-transform: uppercase;
	}
	table.scale {
		width: 100%;
		border-collapse: collapse;
	}
	table.scale th {
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
	table.scale td {
		padding: 16px 16px 16px 0;
		border-bottom: 1px solid var(--border);
		vertical-align: middle;
	}
	.px {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--fg-muted);
		width: 80px;
	}
	.role {
		font-size: 13px;
		color: var(--fg-muted);
		width: 200px;
	}
	.sample {
		font-family: var(--font-display);
		font-weight: 200;
		color: var(--fg);
		letter-spacing: -0.02em;
	}
	.casing {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.casing li {
		padding: 24px 0;
		border-top: 1px solid var(--border);
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 32px;
		align-items: flex-start;
	}
	.casing li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.case-name {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.casing p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		max-width: 600px;
	}
	.casing em {
		font-style: normal;
		font-family: var(--font-mono);
		font-size: 0.95em;
		color: var(--brand);
	}
	.downloads {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 16px;
	}
	.dl-spec {
		font-size: 56px;
		line-height: 1;
		color: var(--fg);
	}
	.dl-spec.mono {
		font-family: 'PP Supply Mono', ui-monospace, monospace;
		font-weight: 400;
	}
	.dl-spec.mono.ul {
		font-weight: 200;
	}
	.dl-spec.sans {
		font-family: 'PP Supply Sans', ui-sans-serif, system-ui, sans-serif;
		font-weight: 400;
	}
	.dl-spec.sans.ul {
		font-weight: 200;
	}
	.license {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 720px;
	}
	.license p {
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
	.license a {
		color: var(--brand);
		text-decoration: none;
		display: inline-flex;
		gap: 4px;
		align-items: baseline;
	}
	@media (max-width: 720px) {
		.family,
		.casing li {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style>
