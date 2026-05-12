<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Indicator } from '@dashfi/svelte/ui/indicator';
	import Bell from '@lucide/svelte/icons/bell';

	const propsTable: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes appended to the root div — use to absolutely position the dot over its anchor.'
		}
	];

	const example = `<script lang="ts">
	import { Indicator } from '@dashfi/svelte/ui/indicator';
<\/script>

<div class="relative">
\t<Bell />
\t<Indicator />
</div>`;
</script>

<svelte:head><title>Indicator — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Indicator"
	description="Small status dot. Layered over icons for unread counts, presence, alerts."
	importPath="@dashfi/svelte/ui/indicator"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:position="relative" style:display="inline-flex">
					<Bell size={20} strokeWidth={1.5} />
					<Indicator />
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
