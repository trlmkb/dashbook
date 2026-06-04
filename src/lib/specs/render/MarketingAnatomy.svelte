<!--
  Renders a MarketingPatternSpec's recipe body — the marketing counterpart to
  Anatomy.svelte. Sections (in order): Recipe · DOM · Token roles · Dimensions ·
  Variants · Props · Not part of X · Gotchas · Motion · Accessibility · Porting ·
  Source. Reuses the global `.docs-h` / `.docs-list` styles.
-->
<script lang="ts">
	import type { MarketingPatternSpec } from '../marketing/patterns/types.js';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';

	let { spec }: { spec: MarketingPatternSpec } = $props();

	// Authored, trusted strings. Escape angle brackets, then render `code` spans.
	function md(s: string): string {
		const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return esc.replace(/`([^`]+)`/g, '<code>$1</code>');
	}
</script>

<div>
	<div class="docs-h">Recipe</div>
	<ol class="docs-list">
		{#each spec.recipe as step (step)}
			<li>{@html md(step)}</li>
		{/each}
	</ol>

	{#if spec.dom}
		<div class="docs-h">DOM</div>
		<CodeSnippet code={spec.dom} language="html" />
	{/if}

	<div class="docs-h">Token roles</div>
	<ul class="docs-list">
		{#each spec.tokensUsed as t (t.part + t.role)}
			<li>
				<strong>{t.part}</strong> — <code>{t.role}</code>{#if t.notes}. {t.notes}{/if}
			</li>
		{/each}
	</ul>

	{#if spec.dimensions && spec.dimensions.length > 0}
		<div class="docs-h">Dimensions</div>
		<ul class="docs-list">
			{#each spec.dimensions as dim (dim.name)}
				<li>
					<strong>{dim.name}</strong> — {dim.value}{#if dim.tw}
						(<code>{dim.tw}</code>){/if}{#if dim.notes}. {dim.notes}{/if}
				</li>
			{/each}
		</ul>
	{/if}

	{#if spec.variants && spec.variants.length > 0}
		<div class="docs-h">Variants</div>
		<ul class="docs-list">
			{#each spec.variants as v (v.name)}
				<li>
					<strong>{v.name}</strong>{#if v.description} — {v.description}{/if}
				</li>
			{/each}
		</ul>
	{/if}

	{#if spec.props && spec.props.length > 0}
		<div class="docs-h">Props</div>
		<PropsTable props={spec.props ?? []} />
		{#if spec.sourceNote}
			<p class="src-note">{spec.sourceNote}</p>
		{/if}
	{/if}

	{#if spec.nonFeatures && spec.nonFeatures.length > 0}
		<div class="docs-h">Not part of {spec.name}</div>
		<ul class="docs-list">
			{#each spec.nonFeatures as item (item)}
				<li>{@html md(item)}</li>
			{/each}
		</ul>
	{/if}

	{#if spec.gotchas && spec.gotchas.length > 0}
		<div class="docs-h">Gotchas</div>
		<ul class="docs-list">
			{#each spec.gotchas as item (item)}
				<li>{@html md(item)}</li>
			{/each}
		</ul>
	{/if}

	{#if spec.motion && spec.motion.length > 0}
		<div class="docs-h">Motion</div>
		<ul class="docs-list">
			{#each spec.motion as item (item)}
				<li>{@html md(item)}</li>
			{/each}
		</ul>
	{/if}

	{#if spec.accessibility && spec.accessibility.length > 0}
		<div class="docs-h">Accessibility</div>
		<ul class="docs-list">
			{#each spec.accessibility as item (item)}
				<li>{@html md(item)}</li>
			{/each}
		</ul>
	{/if}

	{#if spec.porting && spec.porting.length > 0}
		<div class="docs-h">Porting to another stack</div>
		<ul class="docs-list">
			{#each spec.porting as item (item)}
				<li>{@html md(item)}</li>
			{/each}
		</ul>
	{/if}

	<div class="docs-h">Source</div>
	<ul class="docs-list">
		<li>
			<code>{spec.source}</code>{#if spec.sourceNote}. {spec.sourceNote}{/if}
		</li>
	</ul>
</div>

<style>
	.src-note {
		margin: 10px 0 0;
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
	}
</style>
