<script lang="ts" module>
	export type PropDef = {
		name: string;
		type: string;
		default?: string;
		required?: boolean;
		bindable?: boolean;
		description: string;
	};
</script>

<script lang="ts">
	type Props = {
		title?: string;
		props: PropDef[];
	};

	let { title, props }: Props = $props();
</script>

<section class="block">
	{#if title}
		<div class="block-head">{title}</div>
	{/if}
	<div class="table-wrap">
		<table>
			<thead>
				<tr>
					<th class="th-name">Prop</th>
					<th class="th-type">Type</th>
					<th class="th-default">Default</th>
					<th class="th-desc">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each props as p (p.name)}
					<tr>
						<td class="cell-name">
							<code>{p.name}</code>
							{#if p.required}<span class="badge req">required</span>{/if}
							{#if p.bindable}<span class="badge bind">bindable</span>{/if}
						</td>
						<td class="cell-type"><code>{p.type}</code></td>
						<td class="cell-default">
							{#if p.default}<code>{p.default}</code>{:else}<span class="dash">—</span>{/if}
						</td>
						<td class="cell-desc">{p.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	.block {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.block-head {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.table-wrap {
		border: 1px solid var(--border);
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}
	th {
		text-align: left;
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		padding: 12px 16px;
		background: var(--bg-muted);
		border-bottom: 1px solid var(--border);
		white-space: nowrap;
	}
	.th-name {
		width: 200px;
	}
	.th-type {
		width: 280px;
	}
	.th-default {
		width: 120px;
	}
	td {
		padding: 14px 16px;
		vertical-align: top;
		border-top: 1px solid var(--border);
		color: var(--fg);
	}
	tr:first-child td {
		border-top: 0;
	}
	.cell-name {
		display: flex;
		align-items: baseline;
		gap: 8px;
		flex-wrap: wrap;
	}
	code {
		font-family: var(--font-mono);
		font-size: 12px;
		background: var(--bg-muted);
		padding: 2px 6px;
		letter-spacing: -0.02em;
		color: var(--fg);
	}
	.cell-type code {
		color: var(--brand);
	}
	.dash {
		color: var(--fg-muted);
		font-family: var(--font-mono);
	}
	.badge {
		font-family: var(--font-mono);
		font-size: 9px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 2px 5px;
		border: 1px solid var(--border);
		color: var(--fg-muted);
	}
	.badge.req {
		color: var(--brand);
		border-color: var(--brand);
	}
	.cell-desc {
		line-height: 1.5;
		color: var(--fg);
	}
</style>
