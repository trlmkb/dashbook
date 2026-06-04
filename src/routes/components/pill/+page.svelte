<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { pill as spec } from '$specs/components/pill';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import { Badge } from '@dashfi/svelte/ui/badge';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import CircleX from '@lucide/svelte/icons/circle-x';
</script>

<svelte:head><title>Pill — Components — Dashbook</title></svelte:head>

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

			<PreviewCanvas caption="Types" minHeight="160px">
				{#snippet children(_m)}
					<Pill type="base">Pending</Pill>
					<Pill type="info">New</Pill>
					<Pill type="success">Active</Pill>
					<Pill type="warning">Review</Pill>
					<Pill type="danger">Failed</Pill>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="With a leading icon (0.5.0)" minHeight="120px">
				{#snippet children(_m)}
					<Pill type="success"><CircleCheck class="size-3" />Connected</Pill>
					<Pill type="warning"><TriangleAlert class="size-3" />Review</Pill>
					<Pill type="danger"><CircleX class="size-3" />Failed</Pill>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="In context — status">
				{#snippet children(_m)}
					<Pill type="success">Connected</Pill>
					<Pill type="warning">Needs update</Pill>
					<Pill type="danger">Disconnected</Pill>
					<Pill type="base">Draft</Pill>
				{/snippet}
			</PreviewCanvas>

			<section class="vs">
				<h3>Badge vs Pill</h3>
				<p class="vs-lede">
					Pill encodes WHAT CONDITION something is in (semantic state). Badge encodes WHAT
					something IS (category, visual style). The two components live side by side — pick based
					on meaning, not appearance.
				</p>
				<table class="vs-table">
					<thead>
						<tr>
							<th></th>
							<th>Pill</th>
							<th>Badge</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">Encodes</th>
							<td>semantic state</td>
							<td>category / decoration</td>
						</tr>
						<tr>
							<th scope="row">Examples</th>
							<td>
								<Pill type="success">Active</Pill>
								<Pill type="warning">Pending</Pill>
								<Pill type="danger">Failed</Pill>
								<Pill type="info">Connected</Pill>
							</td>
							<td>
								<Badge>DEBIT</Badge>
								<Badge variant="brand">CORPORATE</Badge>
								<Badge variant="outline">99+</Badge>
								<Badge variant="secondary">NEW</Badge>
							</td>
						</tr>
						<tr>
							<th scope="row">Variants</th>
							<td>base · info · success · warning · danger (semantic)</td>
							<td>default · brand · outline · secondary (visual)</td>
						</tr>
						<tr>
							<th scope="row">Typography</th>
							<td>sentence case, body sans</td>
							<td>mono uppercase, tracked wider, code-style</td>
						</tr>
						<tr>
							<th scope="row">Radius</th>
							<td><code>rounded-sm</code> (4px)</td>
							<td><code>rounded-md</code> (6px)</td>
						</tr>
					</tbody>
				</table>
				<p class="vs-link">
					See <a href="/components/badge">/components/badge</a> for the counterpart.
				</p>
			</section>
		</div>
	{/snippet}
	{#snippet code()}<CodeSnippet code={spec.example} language="svelte" />{/snippet}
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
