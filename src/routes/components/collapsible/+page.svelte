<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Collapsible,
		CollapsibleTrigger,
		CollapsibleContent
	} from '@dashfi/svelte/ui/collapsible';
	import { Button } from '@dashfi/svelte/ui/button';

	const collapsibleProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Whether the content is currently expanded.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Fired when the open state changes.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the root container.'
		}
	];

	const collapsibleTriggerProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the trigger button.'
		},
		{
			name: 'child',
			type: 'Snippet<[{ props: Record<string, unknown> }]>',
			description: 'Render-prop snippet to compose the trigger with a custom element such as a Button.'
		}
	];

	const collapsibleContentProps: PropDef[] = [
		{
			name: 'forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting when closed — useful for animated transitions.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the content panel.'
		}
	];

	const example = `<script lang="ts">
	import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@dashfi/svelte/ui/collapsible';
<\/script>

<Collapsible>
\t<CollapsibleTrigger>Show details</CollapsibleTrigger>
\t<CollapsibleContent>...</CollapsibleContent>
</Collapsible>`;
</script>

<svelte:head><title>Collapsible — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Collapsible"
	description="Show/hide a single content block. Building block for accordions and disclosure UI."
	importPath="@dashfi/svelte/ui/collapsible"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<div style:width="320px">
					<Collapsible>
						<CollapsibleTrigger>
							{#snippet child({ props })}
								<Button variant="ghost" size="sm" {...props}>Show transaction metadata</Button>
							{/snippet}
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div style:padding="12px" style:font-size="13px" style:color="var(--fg-muted)">
								Authorization 4401-902F-X · MCC 7311 · Posted 2026-04-02
							</div>
						</CollapsibleContent>
					</Collapsible>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Collapsible" props={collapsibleProps} />
			<PropsTable title="CollapsibleTrigger" props={collapsibleTriggerProps} />
			<PropsTable title="CollapsibleContent" props={collapsibleContentProps} />
		</div>
	{/snippet}
</ComponentLayout>
