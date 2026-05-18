<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
</script>

<svelte:head><title>Use Dashbook as a designer — Dashbook</title></svelte:head>

<InnerPage>
	<PageHeader
		label="Use / Designer"
		title="Designer."
		lede="Designed to mirror what engineers ship. Every component anatomy on the site is the same data the lib renders, so design and code stay in lock-step — no separate Figma source of truth that drifts."
	/>

	<Section
		label="1. Tokens at a glance"
		note="The three-tier system: base palette (hex primitives), product semantic (light/dark pairs), marketing aliases."
	>
		<ul class="docs-list">
			<li>
				<a href="/foundations/color">Color</a> — 13 base hex tokens · 14 product semantic (light + dark)
				· 10 marketing aliases. Every token has a literal hex value.
			</li>
			<li>
				<a href="/foundations/typography">Typography</a> — PP Supply Mono (display / labels / data) ·
				Bai Jamjuree (body / UI). 10-step scale, 8 semantic classes. Font delivery URLs included.
			</li>
			<li>
				<a href="/foundations/spacing">Spacing</a> — 4 px-base scale (4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 56 / 64).
			</li>
			<li>
				<a href="/foundations/radius">Radius</a> ·
				<a href="/foundations/elevation">Elevation</a> ·
				<a href="/foundations/motion">Motion</a> · <a href="/foundations/data-viz">Data viz</a> ·
				<a href="/foundations/currency">Currency</a> ·
				<a href="/foundations/accessibility">Accessibility</a> — the other foundations.
			</li>
		</ul>
	</Section>

	<Section
		label="2. Components catalogue"
		note="60 components across 7 categories. Each one has a live preview + structured anatomy."
	>
		<ul class="docs-list">
			<li>
				<a href="/components">All 60 components</a> grouped by category — Inputs · Display · Feedback
				· Navigation · Layout · Data · Chrome.
			</li>
			<li>
				Each component page has tabs: <strong>Preview</strong> (live render) · <strong>Code</strong>
				(paste-ready snippet) · <strong>Docs</strong> (PropsTable) · <strong>Anatomy</strong>
				(dimensions, tokens, composition, non-features, porting checklist) ·
				<strong>Accessibility</strong> · <strong>Changelog</strong>.
			</li>
			<li>
				The Anatomy tab is the authoritative spec. Design to those exact values. If you find drift,
				file an issue at <a href="https://github.com/trlmkb/dashbook/issues">trlmkb/dashbook/issues</a>.
			</li>
		</ul>
	</Section>

	<Section
		label="3. Patterns library"
		note="Page-level recipes — the screens we build over and over. 17 patterns across Shells · Data · Forms · Confirmation · States · Layout · Architecture."
	>
		<ul class="docs-list">
			<li>
				<a href="/patterns">All 17 patterns</a> — start here. Each one names what it composes from,
				when to use it, and what alternatives exist.
			</li>
			<li>
				The <strong>Shells</strong> category is highest-leverage for new product surfaces:
				<a href="/patterns/protected-app-shell">Protected app shell</a>,
				<a href="/patterns/auth-split-screen">Auth split-screen</a>,
				<a href="/patterns/sub-section-tabs">Sub-section header with tabs</a>.
			</li>
			<li>
				<strong>Architecture</strong> patterns (<a href="/patterns/auth-route-groups">route groups</a>,
				<a href="/patterns/url-state-dialog">URL-as-state dialog</a>) are non-visual but worth
				knowing — they're how the product app is structured.
			</li>
		</ul>
	</Section>

	<Section
		label="4. Voice + tone"
		note="The brand voice is part of the design system. Copy decisions are design decisions."
	>
		<ul class="docs-list">
			<li>
				<a href="/brand/voice">Voice + tone</a> — confident, direct, sentence case. No exclamation
				marks. No emoji. Numerals not spelled-out. Includes good/bad examples + before/after
				rewrites.
			</li>
			<li>
				When drafting copy with claude.ai (Dashbook Connector enabled), Claude reads the voice rules
				automatically. Just describe the surface and the copy aligns.
			</li>
		</ul>
	</Section>

	<Section
		label="5. Figma library"
		note="Mirrors the live system — tokens as variables, components as variants, styles as text styles."
	>
		<p>
			Status at <a href="/developers/figma">/developers/figma</a>. Library handoff doc + Code Connect
			templates documented; the actual Figma authoring happens in a parallel session bound to the
			dashfi-team account.
		</p>
	</Section>

	<Section
		label="6. When you're designing something new"
		note="The right loop: check the catalogue, find the closest existing component or pattern, design to its anatomy."
	>
		<ol class="ordered">
			<li>
				Check <a href="/components">/components</a> first — odds are the thing already exists.
			</li>
			<li>
				If composing multiple components, check <a href="/patterns">/patterns</a> for a matching
				recipe.
			</li>
			<li>
				If genuinely new — design to the existing tokens. New tokens are a system-level decision;
				new compositions of existing tokens are not.
			</li>
			<li>
				If the design REQUIRES a new component, file an RFC issue at
				<a href="https://github.com/trlmkb/dashbook/issues">trlmkb/dashbook/issues</a>. We add
				components deliberately — the catalogue stays maintainable when it grows on need, not on
				whim.
			</li>
		</ol>
	</Section>
</InnerPage>

<style>
	.docs-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		padding-left: 18px;
	}
	.docs-list a,
	.ordered a {
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.ordered {
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		padding-left: 20px;
	}
</style>
