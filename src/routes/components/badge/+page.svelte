<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { badge as spec } from '$specs/components/badge';
	import { Badge } from '@dashfi/svelte/ui/badge';
	import { Pill } from '@dashfi/svelte/ui/pill';
</script>

<svelte:head><title>Badge — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
>
	{#snippet preview()}
		<div class="preview-stack">
			{#if spec.whenToUse}
				<section class="when-to-use">
					<h3>When to use</h3>
					<p>{spec.whenToUse}</p>
				</section>
			{/if}

			<PreviewCanvas caption="Variants — ordered by visual emphasis">
				{#snippet children(_m)}
					<Badge>Default</Badge>
					<Badge variant="brand">Brand</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="yellow">Yellow</Badge>
					<Badge variant="outline">Outline</Badge>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="Sizes">
				{#snippet children(_m)}
					<Badge size="xs">xs</Badge>
					<Badge size="sm">sm</Badge>
					<Badge size="md">md</Badge>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="In context — card tier markers">
				{#snippet children(_m)}
					<Badge variant="default">DEBIT</Badge>
					<Badge variant="brand">CORPORATE</Badge>
					<Badge variant="outline">DAILY NET 60</Badge>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="In context — emphasis ladder">
				{#snippet children(_m)}
					<Badge variant="default">PRIMARY ACTION</Badge>
					<Badge variant="brand">PRODUCT NEW</Badge>
					<Badge variant="secondary">MARKETING</Badge>
					<Badge variant="yellow">LIMITED</Badge>
					<Badge variant="outline">DEFAULT TAG</Badge>
				{/snippet}
			</PreviewCanvas>

			<section class="vs">
				<h3>Badge vs Pill</h3>
				<p class="vs-lede">
					Badge encodes WHAT something IS (category, visual style). Pill encodes WHAT CONDITION
					something is in (semantic state). The two components live side by side — pick based on
					meaning, not appearance.
				</p>
				<table class="vs-table">
					<thead>
						<tr>
							<th></th>
							<th>Badge</th>
							<th>Pill</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Encodes</th>
							<td>category / decoration</td>
							<td>semantic state</td>
						</tr>
						<tr>
							<th scope="row">Examples</th>
							<td>
								<Badge>DEBIT</Badge>
								<Badge variant="brand">CORPORATE</Badge>
								<Badge variant="secondary">PARTNER</Badge>
								<Badge variant="yellow">LIMITED</Badge>
								<Badge variant="outline">99+</Badge>
							</td>
							<td>
								<Pill type="success">Active</Pill>
								<Pill type="warning">Pending</Pill>
								<Pill type="danger">Failed</Pill>
								<Pill type="info">Connected</Pill>
							</td>
						</tr>
						<tr>
							<th scope="row">Variants</th>
							<td>default · brand · secondary · yellow · outline (visual emphasis ladder)</td>
							<td>base · info · success · warning · danger (semantic)</td>
						</tr>
						<tr>
							<th scope="row">Typography</th>
							<td>mono uppercase, tracked wider, code-style</td>
							<td>sentence case, body sans</td>
						</tr>
						<tr>
							<th scope="row">Radius</th>
							<td><code>rounded-md</code> (6px)</td>
							<td><code>rounded-sm</code> (4px)</td>
						</tr>
					</tbody>
				</table>
				<p class="vs-link">
					See <a href="/components/pill">/components/pill</a> for the counterpart.
				</p>
			</section>
		</div>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={spec.example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<PropsTable props={spec.props} />
	{/snippet}

	{#snippet anatomy()}
		<Anatomy {spec} />
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				{#each spec.accessibility as item (item)}
					<li>{@html item}</li>
				{/each}
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			{#each spec.changelog as entry (entry.version)}
				<li>
					<span class="docs-cl-when">{entry.version} — {entry.date}</span>
					<p>{entry.note}</p>
				</li>
			{/each}
		</ul>
	{/snippet}
</ComponentLayout>

<style>
	.when-to-use {
		border: 1px solid var(--border);
		padding: 16px 20px;
		background: var(--bg-muted);
	}
	.when-to-use h3 {
		margin: 0 0 8px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 500;
	}
	.when-to-use p {
		margin: 0;
		font-size: 14px;
		line-height: 1.55;
		color: var(--fg);
	}
	.vs {
		border-top: 1px solid var(--border);
		padding-top: 24px;
		margin-top: 8px;
	}
	.vs h3 {
		margin: 0 0 8px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 500;
	}
	.vs-lede {
		margin: 0 0 16px;
		font-size: 14px;
		line-height: 1.55;
		color: var(--fg);
		max-width: 70ch;
	}
	.vs-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}
	.vs-table th,
	.vs-table td {
		border: 1px solid var(--border);
		padding: 10px 12px;
		text-align: left;
		vertical-align: top;
	}
	.vs-table thead th {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 500;
		background: var(--bg-muted);
	}
	.vs-table tbody th {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 500;
		width: 120px;
	}
	.vs-table td {
		color: var(--fg);
	}
	.vs-table td :global(*) {
		margin-right: 4px;
		margin-bottom: 4px;
	}
	.vs-link {
		margin: 16px 0 0;
		font-size: 13px;
		color: var(--fg-muted);
	}
	.vs-link a {
		color: var(--fg);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
