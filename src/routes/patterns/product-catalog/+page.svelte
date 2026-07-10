<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Switch } from '@dashfi/svelte/ui/switch';

	type Product = { id: string; name: string; enabled: boolean; price: string };
	let products = $state<Product[]>([
		{ id: 'p1', name: 'Virtual cards', enabled: true, price: 'Free' },
		{ id: 'p2', name: 'Bill pay', enabled: true, price: '$0.50 / transaction' },
		{ id: 'p3', name: 'Rewards', enabled: false, price: '1.5% cashback' }
	]);

	function toggle(id: string): void {
		products = products.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p));
	}

	const example = `<!-- Scaffolded shape — enable/disable rows, off-ramp confirmation dialog on
disable, expandable pricing table. Full code pending a pass grounded in the
product-catalog admin route. -->
{#each products as p}
\t<div class="row">
\t\t<span>{p.name}</span>
\t\t<Switch checked={p.enabled} onCheckedChange={() => confirmToggle(p)} />
\t</div>
{/each}`;
</script>

<svelte:head><title>Product catalog — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Product catalog"
	description="Enable/disable rows for a set of offerable products, each with an off-ramp confirmation dialog and an expandable pricing table. For admin surfaces that toggle product availability rather than edit records."
	uses={['Switch', 'AlertDialog', 'Table']}
	draft
>
	{#snippet preview()}
		<PreviewCanvas minHeight="240px">
			{#snippet children(_m)}
				<div class="rows">
					{#each products as p (p.id)}
						<div class="row">
							<div class="meta">
								<span class="name">{p.name}</span>
								<span class="price">{p.price}</span>
							</div>
							<Switch checked={p.enabled} onCheckedChange={() => toggle(p.id)} />
						</div>
					{/each}
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}
</PatternLayout>

<style>
	.rows {
		width: 100%;
		max-width: 480px;
		border: 1px solid var(--border);
	}
	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 14px;
		border-top: 1px solid var(--border);
	}
	.row:first-child {
		border-top: 0;
	}
	.meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.name {
		font-size: 13px;
		font-weight: 500;
	}
	.price {
		font-size: 11px;
		color: var(--fg-muted);
	}
</style>
