<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';
	import { Label } from '@dashfi/svelte/ui/label';

	let agreed = $state(false);
	let mark = $state(true);

	const propsTable: PropDef[] = [
		{
			name: 'checked',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable checked state. Two-way binding via bind:checked.'
		},
		{
			name: 'indeterminate',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Tri-state for "some selected" — renders a minus icon instead of a check.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 40% opacity.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name. Submits as on/off (or value) when wrapped in a form.'
		},
		{
			name: 'value',
			type: 'string',
			description: 'Value submitted with the form when checked.'
		},
		{
			name: 'id',
			type: 'string',
			description: 'DOM id — pair with Label for="…" for click-to-focus and screen readers.'
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
			name: 'onCheckedChange',
			type: '(checked: boolean) => void',
			description: 'All bits-ui Checkbox.Root props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Checkbox } from '@dashfi/svelte/ui/checkbox';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

let agreed = $state(false);

<div style="display:flex;gap:12px;align-items:center">
\t<Checkbox id="terms" bind:checked={agreed} />
\t<Label for="terms">I agree to the terms</Label>
</div>`;
</script>

<svelte:head><title>Checkbox — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Checkbox"
	description="Boolean input. Pair with a Label. Supports unchecked / checked states."
	importPath="@dashfi/svelte/ui/checkbox"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:display="flex" style:flex-direction="column" style:gap="12px">
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-1" bind:checked={agreed} />
						<Label for="cb-1">Unchecked default</Label>
					</div>
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-2" bind:checked={mark} />
						<Label for="cb-2">Checked default</Label>
					</div>
					<div style:display="flex" style:gap="12px" style:align-items="center">
						<Checkbox id="cb-3" disabled />
						<Label for="cb-3">Disabled</Label>
					</div>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Always pair with a <code>&lt;Label&gt;</code>.</li>
				<li><code>Space</code> toggles. <code>Tab</code> moves focus.</li>
				<li>Use Switch instead when the change is committed immediately (e.g., a setting).</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
