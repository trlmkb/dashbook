<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import FileText from '@lucide/svelte/icons/file-text';
	import ExternalLink from '@lucide/svelte/icons/external-link';

	const inProgress = true;

	const baseTokens = `// Tier 1 — base palette (13 primitives)
--dash-cobalt:        #354CEF
--dash-cobalt-deep:   #2A3ECC
--dash-periwinkle:    #B6C1F2
--dash-mist:          #E7E7F0
--dash-cream:         #EBEDE4
--dash-white:         #FFFFFF
--dash-yellow:        #EBFF00
--dash-yellow-glow:   rgba(235, 255, 0, 0.5)
--dash-jade:          #2B605C
--dash-jade-deep:     #123B39
--dash-ink:           #25261D
--dash-graphite:      #505148
--dash-graphite-soft: #80817A`;

	const semanticTokens = `// Tier 2 — product semantic (light + dark)
--bg / --bg-muted / --fg / --fg-muted
--border / --input-border
--primary / --primary-fg
--brand / --brand-fg
--destructive (orange #FF4000 in lib, mono in portal)
--ring
--card / --popover`;
</script>

<svelte:head><title>Figma library — Developers — Dashbook</title></svelte:head>

<InnerPage section="/developers" wide>
	<PageHeader
		label="Developers / Figma library"
		title="Figma library."
		lede="The design source of truth, mirrored from this codebase. Built and maintained in Figma — referenced from dashbook for engineers who need to match the exact spec."
	/>

	{#if inProgress}
		<div class="status-banner">
			<span class="cap">Status</span>
			<span>
				<strong>In progress.</strong> The Figma library file is being authored against the
				handoff brief below. The dashbook codebase is the source of truth until publication.
			</span>
		</div>
	{/if}

	<Section
		label="What's in the library"
		note="Mirror of the canonical tokens, type styles, and components. Ships in 8 Figma pages matching the dashbook IA."
	>
		<div class="overview">
			<div class="overview-cell">
				<div class="overview-num tabular-nums">3</div>
				<div class="overview-label">Variable collections</div>
				<p>Base palette (13 primitives, single mode) · Product semantic (14 tokens, Light + Dark) · Marketing aliases (10 tokens, single mode).</p>
			</div>
			<div class="overview-cell">
				<div class="overview-num tabular-nums">8</div>
				<div class="overview-label">Text styles</div>
				<p>Heading display · Page label · Section header · Data value · Body lg / Body / Body sm · Caption.</p>
			</div>
			<div class="overview-cell">
				<div class="overview-num tabular-nums">60</div>
				<div class="overview-label">Components</div>
				<p>10 canonical with full variant trees (Button, Badge, Card, Input, Alert, Tabs, Select, Dialog, Switch, Checkbox) and 50 secondary as stubs with import paths.</p>
			</div>
			<div class="overview-cell">
				<div class="overview-num tabular-nums">8</div>
				<div class="overview-label">Pages</div>
				<p>Cover · Brand · Foundations · Components · Patterns · Resources · Press & Partners · Changelog.</p>
			</div>
		</div>
	</Section>

	<Section
		label="Subscribe to the library"
		note="Internal-only. Library team subscription via Figma. Reach out to design for access."
	>
		<div class="links">
			<a class="link-card disabled" href="https://figma.com" target="_blank" rel="noopener">
				<FileText size={18} strokeWidth={1.5} />
				<div class="link-body">
					<div class="link-title">Figma library file <span class="link-tag">private · staged</span></div>
					<p>Subscribe under "Resources" in your Figma team to inherit components, variables, and styles.</p>
				</div>
				<ExternalLink size={14} strokeWidth={1.5} class="link-arrow" />
			</a>
		</div>
	</Section>

	<Section
		label="Tier 1 — base palette"
		note="13 brand primitives. Every hex in the system originates here. Maps to Figma collection 'dash/palette' (single mode)."
	>
		<CodeSnippet code={baseTokens} language="css" />
	</Section>

	<Section
		label="Tier 2 — product semantic"
		note="Component-facing tokens with Light + Dark modes. Maps to Figma collection 'product/semantic' (modes: Light · Dark)."
	>
		<CodeSnippet code={semanticTokens} language="css" />
	</Section>

	<Section
		label="Code Connect"
		note="Every shipped Figma component links to a @dashfi/svelte import via Code Connect. Engineers select a Figma instance and the import shows up in the inspector."
	>
		<ul class="bullets">
			<li><strong>Canonical 10</strong> ship Code Connect at publication. The other 50 are documented in the handoff but Code Connect lands incrementally as the team subscribes consumer-by-consumer.</li>
			<li>Code Connect template format: <code>{`{ Component } from '@dashfi/svelte/ui/{slug}'`}</code>.</li>
			<li>Variant props on Figma instances map 1:1 to component props (<code>variant</code>, <code>size</code>, <code>disabled</code>, etc.).</li>
		</ul>
	</Section>

	<Section
		label="Reference docs"
		note="Two complementary files at the repo root. The HANDOFF goes to a designer authoring the file; the INTEGRATION RULES go to an engineer using figma-desktop MCP to generate code from designs."
	>
		<div class="links">
			<a class="link-card" href="https://github.com/dashfi/dashbook" target="_blank" rel="noopener">
				<FileText size={18} strokeWidth={1.5} />
				<div class="link-body">
					<div class="link-title">FIGMA_HANDOFF.md <span class="link-tag">repo root</span></div>
					<p>Step-by-step instructions for a designer authoring the Figma library file. 721 lines, executable top-to-bottom.</p>
				</div>
				<ExternalLink size={14} strokeWidth={1.5} class="link-arrow" />
			</a>
			<a class="link-card" href="https://github.com/dashfi/dashbook" target="_blank" rel="noopener">
				<FileText size={18} strokeWidth={1.5} />
				<div class="link-body">
					<div class="link-title">FIGMA_INTEGRATION_RULES.md <span class="link-tag">repo root</span></div>
					<p>Rules doc for engineers using the figma-desktop MCP to generate dashbook-compatible code from Figma designs.</p>
				</div>
				<ExternalLink size={14} strokeWidth={1.5} class="link-arrow" />
			</a>
		</div>
	</Section>

	<Section
		label="Open questions"
		note="From the handoff §9. Pending design / leadership input before final commit."
	>
		<ul class="bullets">
			<li>
				<strong>PP Supply Mono weight 500?</strong> The license includes 200 + 400 only. The
				body section-header style (currently 500 weight) renders synthetic bold without it.
				Decision needed on whether to license 500 or accept the synthetic bold.
			</li>
			<li>
				<strong>Orange as 14th primitive?</strong> <code>#FF4000</code> currently lives as a
				semantic destructive token in Tier 2. Promote it to Tier 1 (<code>--dash-orange</code>)
				to expose it as a marketing surface color?
			</li>
			<li>
				<strong>Press kit ZIP composition</strong> — which logo + app-icon variants ship in
				the press-only bundle (vs the configurable per-user download)?
			</li>
			<li>
				<strong>Editorial / News tab</strong> — adopt the Atlassian pattern of a dedicated
				editorial surface, or fold it under Changelog?
			</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.status-banner {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 16px;
		padding: 14px 18px;
		border: 1px solid var(--border);
		background: var(--bg-muted);
		margin: -16px 0 40px;
		align-items: center;
	}
	.cap {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--brand);
	}
	.status-banner span:last-child {
		font-size: 13px;
		color: var(--fg);
		line-height: 1.5;
	}
	.overview {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	@media (min-width: 720px) {
		.overview {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 960px) {
		.overview {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.overview-cell {
		background: var(--bg);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.overview-num {
		font-family: var(--font-mono);
		font-size: 36px;
		font-weight: 200;
		color: var(--brand);
		line-height: 1;
		letter-spacing: -0.02em;
	}
	.overview-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-top: 8px;
	}
	.overview-cell p {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg);
		margin: 4px 0 0;
	}
	.bullets {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.bullets li {
		padding: 12px 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.bullets li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.bullets li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.bullets code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.links {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	@media (min-width: 720px) {
		.links {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.link-card {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 12px;
		padding: 20px;
		background: var(--bg);
		text-decoration: none;
		color: var(--fg);
		transition: background-color 150ms;
		align-items: start;
	}
	.link-card :global(svg) {
		color: var(--fg-muted);
	}
	.link-card:hover {
		background: var(--bg-muted);
	}
	.link-card.disabled {
		opacity: 0.6;
		pointer-events: none;
	}
	.link-card :global(.link-arrow) {
		align-self: start;
	}
	.link-card:hover :global(.link-arrow) {
		color: var(--brand);
	}
	.link-title {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 4px;
	}
	.link-tag {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 400;
		margin-left: 6px;
		padding: 2px 6px;
		border: 1px solid var(--border);
		vertical-align: middle;
	}
	.link-card p {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin: 0;
	}
</style>
