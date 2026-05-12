<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '@dashfi/svelte/ui/accordion';

	const accordionProps: PropDef[] = [
		{
			name: 'type',
			type: "'single' | 'multiple'",
			required: true,
			description: "Single allows one item open at a time; multiple allows any number."
		},
		{
			name: 'value',
			type: 'string | string[]',
			bindable: true,
			description: 'Open item value(s). String when type is "single", string[] when "multiple".'
		},
		{
			name: 'onValueChange',
			type: '(value: string | string[]) => void',
			description: 'Fired when an item opens or closes.'
		},
		{
			name: 'collapsible',
			type: 'boolean',
			default: 'false',
			description: 'Only with type="single" — allow closing the currently open item.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable all items within the accordion.'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'true',
			description: 'Whether keyboard navigation wraps around at the ends.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'vertical'",
			description: 'Layout orientation. Affects arrow-key navigation direction.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the root container.'
		}
	];

	const accordionItemProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'Unique value identifying this item.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable this individual item.'
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
			description: 'Element ref binding for the item container.'
		}
	];

	const accordionTriggerProps: PropDef[] = [
		{
			name: 'level',
			type: '1 | 2 | 3 | 4 | 5 | 6',
			default: '3',
			description: 'Heading level for the surrounding accessible header element.'
		},
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
		}
	];

	const accordionContentProps: PropDef[] = [
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
	import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@dashfi/svelte/ui/accordion';
<\/script>

<Accordion type="single" value="overview">
\t<AccordionItem value="overview">
\t\t<AccordionTrigger>How does Dash.fi work?</AccordionTrigger>
\t\t<AccordionContent>Charge card with built-in audit agents.</AccordionContent>
\t</AccordionItem>
</Accordion>`;
</script>

<svelte:head><title>Accordion — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Accordion"
	description="Collapsible content sections. Single or multi-open mode."
	importPath="@dashfi/svelte/ui/accordion"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="280px">
			{#snippet children(_m)}
				<div style:width="480px">
					<Accordion type="single" value="how">
						<AccordionItem value="how">
							<AccordionTrigger>How does Dash.fi work?</AccordionTrigger>
							<AccordionContent>
								Corporate charge card with built-in audit agents that recover ad-spend
								overcharges and shipping refunds.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="rewards">
							<AccordionTrigger>What's the cashback rate?</AccordionTrigger>
							<AccordionContent>
								3% on ad spend and shipping. Standard 1% on everything else.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="apply">
							<AccordionTrigger>How do I apply?</AccordionTrigger>
							<AccordionContent>
								Brands switching from Capital One, Chase, and Amex apply every day.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Accordion" props={accordionProps} />
			<PropsTable title="AccordionItem" props={accordionItemProps} />
			<PropsTable title="AccordionTrigger" props={accordionTriggerProps} />
			<PropsTable title="AccordionContent" props={accordionContentProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<ul class="docs-list">
				<li><code>type="single"</code> — only one item open at a time.</li>
				<li><code>type="multiple"</code> — any number of items can be open.</li>
				<li><code>value</code> is bindable.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
