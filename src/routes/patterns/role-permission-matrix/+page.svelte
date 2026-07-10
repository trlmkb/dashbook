<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';

	const roles = ['Owner', 'Admin', 'Bookkeeper', 'Member'];
	let activeRole = $state('Admin');
	const perms = ['card:read', 'card:issue', 'billpay:approve', 'settings:edit'];
	const grid: Record<string, Record<string, boolean>> = {
		Owner: { 'card:read': true, 'card:issue': true, 'billpay:approve': true, 'settings:edit': true },
		Admin: { 'card:read': true, 'card:issue': true, 'billpay:approve': true, 'settings:edit': false },
		Bookkeeper: { 'card:read': true, 'card:issue': false, 'billpay:approve': true, 'settings:edit': false },
		Member: { 'card:read': true, 'card:issue': false, 'billpay:approve': false, 'settings:edit': false }
	};

	const example = `<!-- Scaffolded shape — role list master, permission checkbox grid detail,
mobile collapses to a Select. Full code pending a pass grounded in the
role/permission admin route. -->
<div class="matrix">
\t<ul class="roles">{#each roles as r}<li class:active={r === activeRole}>{r}</li>{/each}</ul>
\t<div class="perms">
\t\t{#each perms as p}<label><Checkbox checked={grid[activeRole][p]} /> {p}</label>{/each}
\t</div>
</div>`;
</script>

<svelte:head><title>Role permission matrix — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Role permission matrix"
	description="Master-detail: role list on the left, a permission checkbox grid on the right, collapsing to a Select-driven single-column view on mobile. For any many-roles x many-capabilities admin surface."
	uses={['Select', 'Checkbox', 'Separator']}
	draft
>
	{#snippet preview()}
		<PreviewCanvas minHeight="280px">
			{#snippet children(_m)}
				<div class="matrix">
					<ul class="roles">
						{#each roles as r (r)}
							<li>
								<button type="button" class:active={r === activeRole} onclick={() => (activeRole = r)}>
									{r}
								</button>
							</li>
						{/each}
					</ul>
					<div class="perms">
						{#each perms as p (p)}
							<label class="perm-row">
								<Checkbox checked={grid[activeRole][p]} />
								<span class="mono">{p}</span>
							</label>
						{/each}
					</div>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}
</PatternLayout>

<style>
	.matrix {
		display: grid;
		grid-template-columns: 140px 1fr;
		gap: 0;
		width: 100%;
		max-width: 480px;
		border: 1px solid var(--border);
	}
	.roles {
		list-style: none;
		margin: 0;
		padding: 0;
		border-right: 1px solid var(--border);
	}
	.roles button {
		display: block;
		width: 100%;
		text-align: left;
		padding: 10px 12px;
		border: 0;
		background: transparent;
		font-size: 13px;
		color: var(--fg-muted);
		cursor: pointer;
	}
	.roles button.active {
		background: var(--bg-muted);
		color: var(--fg);
		font-weight: 500;
	}
	.perms {
		display: flex;
		flex-direction: column;
		padding: 8px 14px;
	}
	.perm-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 0;
		font-size: 13px;
	}
	.mono {
		font-family: var(--font-mono);
		font-size: 12px;
	}
</style>
