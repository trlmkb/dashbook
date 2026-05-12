<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group';
	import { Label } from '@dashfi/svelte/ui/label';

	let card = $state('debit');

	const radioGroupProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			default: "''",
			bindable: true,
			description: 'Bindable selected value. Matches the value of the active RadioGroupItem.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name. All items share this name when wrapped in a form.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables all items in the group.'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Marks the group as required for form validation.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'vertical'",
			description: 'Arrow-key navigation direction.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'RadioGroupItem children, typically alongside labels.'
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
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			description: 'All bits-ui RadioGroup.Root props pass through.'
		}
	];

	const radioGroupItemProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'The value submitted/bound when this item is selected.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables this individual item.'
		},
		{
			name: 'id',
			type: 'string',
			description: 'DOM id — pair with Label for="…" for click-to-focus.'
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
			description: 'Element ref binding. Use bind:ref to capture the underlying DOM node.'
		},
		{
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			description: 'All bits-ui RadioGroup.Item props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

<RadioGroup bind:value={card}>
\t<div style="display:flex;gap:8px;align-items:center">
\t\t<RadioGroupItem value="debit" id="debit" />
\t\t<Label for="debit">Debit</Label>
\t</div>
\t<div style="display:flex;gap:8px;align-items:center">
\t\t<RadioGroupItem value="corporate" id="corp" />
\t\t<Label for="corp">Corporate</Label>
\t</div>
</RadioGroup>`;
</script>

<svelte:head><title>Radio Group — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Radio Group"
	description="Single-option selection. Keyboard-navigable; arrow keys move between items."
	importPath="@dashfi/svelte/ui/radio-group"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<div style:width="280px">
					<RadioGroup bind:value={card}>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="debit" id="rg-debit" />
							<Label for="rg-debit">Debit</Label>
						</div>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="corporate" id="rg-corp" />
							<Label for="rg-corp">Corporate</Label>
						</div>
						<div style:display="flex" style:gap="8px" style:align-items="center" style:padding="6px 0">
							<RadioGroupItem value="net60" id="rg-net60" />
							<Label for="rg-net60">Daily Net 60</Label>
						</div>
					</RadioGroup>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="RadioGroup" props={radioGroupProps} />
			<PropsTable title="RadioGroupItem" props={radioGroupItemProps} />
		</div>
	{/snippet}
	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Implements WAI-ARIA radio-group. Arrow keys cycle items; selection follows focus.</li>
				<li>Each <code>RadioGroupItem</code> needs a unique <code>value</code> and matching label.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
