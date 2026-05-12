<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { MagneticHover } from '@dashfi/svelte/ui/magnetic-hover';
	import { Button } from '@dashfi/svelte/ui/button';

	const propsTable: PropDef[] = [
		{
			name: 'strength',
			type: 'number',
			default: '0.3',
			description: 'Multiplier applied to the cursor-distance offset. Higher values pull the element further.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the magnetic effect — the element stops responding to mouse movement.'
		},
		{
			name: 'transitionDuration',
			type: 'number',
			default: '300',
			description: 'CSS transition duration in milliseconds for transform changes.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes applied to the wrapping <div>.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'The element to magnetize. Typically a Button or similar CTA.'
		}
	];

	const example = `<script lang="ts">
	import { MagneticHover } from '@dashfi/svelte/ui/magnetic-hover';
<\/script>

<MagneticHover>
\t<Button variant="brand">Get the card →</Button>
</MagneticHover>`;
</script>

<svelte:head><title>Magnetic Hover — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Magnetic Hover"
	description="Decorative — wrapped element shifts subtly toward the cursor on hover. For marketing CTAs only; not for product UI."
	importPath="@dashfi/svelte/ui/magnetic-hover"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="240px">
			{#snippet children(_m)}
				<MagneticHover>
					<Button variant="brand">Get the card →</Button>
				</MagneticHover>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
