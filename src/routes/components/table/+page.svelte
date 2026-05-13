<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { table as spec } from '$specs/components/table';
	import {
		Table,
		TableHeader,
		TableBody,
		TableRow,
		TableCell,
		TableHead
	} from '@dashfi/svelte/ui/table';

	const rows = [
		{ ref: 'TX-4400-A', merchant: 'Meta Ads', amount: '12,408.00', date: '2026-04-02' },
		{ ref: 'TX-4401-B', merchant: 'Google Ads', amount: '8,210.50', date: '2026-04-02' },
		{ ref: 'TX-4402-C', merchant: 'FedEx Ship', amount: '1,240.00', date: '2026-04-01' }
	];
</script>

<svelte:head><title>Table — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="240px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="640px">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Reference</TableHead>
								<TableHead>Merchant</TableHead>
								<TableHead class="text-right">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{#each rows as row (row.ref)}
								<TableRow>
									<TableCell class="font-mono text-xs">{row.ref}</TableCell>
									<TableCell>{row.merchant}</TableCell>
									<TableCell class="text-right tabular-nums">${row.amount}</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			{/snippet}
		</PreviewCanvas>
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
