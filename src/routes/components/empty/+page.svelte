<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Empty,
		EmptyHeader,
		EmptyTitle,
		EmptyDescription,
		EmptyContent
	} from '@dashfi/svelte/ui/empty';
	import { Button } from '@dashfi/svelte/ui/button';
	import Inbox from '@lucide/svelte/icons/inbox';

	const sharedProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Slotted content.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: '...restProps',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Native div attributes pass through to the root element.'
		}
	];

	const emptyMediaProps: PropDef[] = [
		{
			name: 'variant',
			type: "'default' | 'icon'",
			default: "'default'",
			description: 'Icon variant adds a muted square background and centers the icon.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Typically a Lucide icon or small graphic.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const emptyDescriptionProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Description text. Inline <a> tags are styled with underline-offset.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding.'
		}
	];

	const example = `<script lang="ts">
	import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@dashfi/svelte/ui/empty';
<\/script>

<Empty>
\t<EmptyHeader>
\t\t<EmptyTitle>No spending data available</EmptyTitle>
\t\t<EmptyDescription>Start using your card to see spending analytics here.</EmptyDescription>
\t</EmptyHeader>
\t<EmptyContent>
\t\t<Button>Order a card</Button>
\t</EmptyContent>
</Empty>`;
</script>

<svelte:head><title>Empty — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Empty"
	description="Empty-state container. Title, description, optional action — for 'no data yet' surfaces."
	importPath="@dashfi/svelte/ui/empty"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="320px">
			{#snippet children(_m)}
				<div style:width="100%" style:max-width="480px">
					<Empty>
						<EmptyHeader>
							<EmptyTitle>No spending data available</EmptyTitle>
							<EmptyDescription>Start using your card to see spending analytics here.</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Button>Order a card</Button>
						</EmptyContent>
					</Empty>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Empty" props={sharedProps} />
			<PropsTable title="EmptyHeader" props={sharedProps} />
			<PropsTable title="EmptyTitle" props={sharedProps} />
			<PropsTable title="EmptyDescription" props={emptyDescriptionProps} />
			<PropsTable title="EmptyContent" props={sharedProps} />
			<PropsTable title="EmptyMedia" props={emptyMediaProps} />
		</div>
	{/snippet}
</ComponentLayout>
