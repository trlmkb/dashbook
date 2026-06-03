<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { astroScopedStyles as spec } from '$specs/marketing/patterns/astro-scoped-styles';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="cols">
			<div class="case">
				<div class="case-head bad">❌ Scoped class on a child component</div>
				<code class="case-code">&lt;Reveal class="row"&gt;…&lt;/Reveal&gt;</code>
				<div class="stack">
					<div class="cell">copy</div>
					<div class="cell">media</div>
				</div>
				<p class="case-note">
					The scoped <code>.row</code> grid rule never reaches Reveal's root — it collapses to
					<code>display: block</code>. No error.
				</p>
			</div>
			<div class="case">
				<div class="case-head ok">✅ Structural class on a native element</div>
				<code class="case-code">&lt;div class="row"&gt;&lt;Reveal&gt;…&lt;/Reveal&gt;&lt;/div&gt;</code>
				<div class="grid">
					<div class="cell">copy</div>
					<div class="cell">media</div>
				</div>
				<p class="case-note">The scoped grid applies to the native <code>.row</code> — layout holds.</p>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.cols {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 20px;
	}
	@media (max-width: 720px) {
		.cols {
			grid-template-columns: minmax(0, 1fr);
		}
	}
	.case {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 20px;
	}
	.case-head {
		font-family: var(--font-mono);
		font-size: 12px;
		margin-bottom: 12px;
	}
	.case-head.bad {
		color: var(--m-negative);
	}
	.case-head.ok {
		color: var(--m-positive);
	}
	.case-code {
		display: block;
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 8px 10px;
		margin-bottom: 16px;
		color: var(--fg);
		overflow-x: auto;
	}
	.stack {
		display: block;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}
	.stack .cell {
		margin-bottom: 10px;
	}
	.cell {
		background: var(--m-accent-soft);
		border: 1px solid var(--m-accent-border);
		color: var(--m-accent);
		padding: 16px;
		text-align: center;
		font-family: var(--font-mono);
		font-size: 12px;
	}
	.case-note {
		margin: 14px 0 0;
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
	}
	.case-note code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 1px 5px;
	}
</style>
