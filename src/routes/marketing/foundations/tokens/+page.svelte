<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import { marketingTokensFoundation as f } from '$specs/marketing/foundations/tokens';
</script>

<svelte:head><title>Tokens — Marketing — Dashbook</title></svelte:head>

<InnerPage section="/marketing" wide>
	<PageHeader
		label="Marketing / Foundations"
		title="Tokens."
		lede={f.philosophy}
	/>

	<Section label="Semantic roles" note="Components reference these roles, never raw hex. Each carries a light and a dark value; the dark column is what renders inside a [data-marketing-dark] subtree.">
		<div class="roles">
			{#each f.roles as r (r.cssVar)}
				<div class="role">
					<div class="chips">
						<span class="chip light"><span class="fill" style:background={r.light}></span></span>
						<span class="chip dark"><span class="fill" style:background={r.dark}></span></span>
					</div>
					<div class="meta">
						<code class="var">{r.cssVar}</code>
						<p class="use">{r.role}</p>
						<p class="hex tabular-nums">{r.light} · {r.dark}</p>
					</div>
				</div>
			{/each}
		</div>
	</Section>

	<Section label="data-tone convention" note={f.toneConvention.usage}>
		<ul class="docs-list">
			<li><strong>Attribute</strong> — <code>{f.toneConvention.attribute}</code></li>
			<li>
				<strong>Values</strong> —
				{#each f.toneConvention.values as v (v)}
					<code class="tone">{v}</code>
				{/each}
			</li>
		</ul>
	</Section>

	<Section label="Dark variant" note={f.darkVariant.notes}>
		<ul class="docs-list">
			<li><strong>Trigger</strong> — <code>{f.darkVariant.trigger}</code></li>
			{#each f.darkVariant.deltas as d (d)}
				<li>{d}</li>
			{/each}
		</ul>
	</Section>

	<Section label="Radius + layout scale">
		<ul class="docs-list">
			<li><strong>Radii</strong> — {f.radii.scale}</li>
			<li><strong>Button</strong> — {f.radii.button}</li>
			<li><strong>Content max</strong> — {f.layoutScale.contentMax}</li>
			<li><strong>Gutters</strong> — sm {f.layoutScale.gutters.sm} · md {f.layoutScale.gutters.md} · lg {f.layoutScale.gutters.lg}</li>
		</ul>
	</Section>

	<Section label="Color rules">
		<ul class="docs-list">
			{#each f.colorRules as rule (rule)}
				<li>{rule}</li>
			{/each}
		</ul>
	</Section>
</InnerPage>

<style>
	.roles {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 20px;
	}
	.role {
		display: flex;
		gap: 14px;
		align-items: flex-start;
	}
	.chips {
		display: flex;
		flex-shrink: 0;
	}
	.chip {
		width: 34px;
		height: 56px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
	}
	.chip.light {
		background: #faf9f5;
		border-right: 0;
	}
	.chip.dark {
		background: #14181c;
	}
	.chip .fill {
		width: 24px;
		height: 40px;
		border-radius: 2px;
	}
	.meta {
		min-width: 0;
	}
	.var {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg);
		letter-spacing: -0.02em;
	}
	.use {
		margin: 4px 0 0;
		font-size: 12px;
		line-height: 1.45;
		color: var(--fg-muted);
	}
	.hex {
		margin: 4px 0 0;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--fg-muted);
		word-break: break-all;
	}
	.tone {
		margin-right: 6px;
	}
</style>
