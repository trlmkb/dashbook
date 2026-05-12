<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';

	const fieldProps: PropDef[] = [
		{
			name: 'form',
			type: 'SuperForm<T>',
			required: true,
			description: 'The superForm instance returned from sveltekit-superforms.'
		},
		{
			name: 'name',
			type: 'FormPath<T>',
			required: true,
			description: 'Dot-path of the field in the form schema (e.g. "email", "user.address.city").'
		},
		{
			name: 'children',
			type: 'Snippet<[{ constraints, errors, tainted, value }]>',
			description: 'Field content. Receives field state from formsnap.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged onto the wrapping div.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the wrapper div.'
		},
		{
			name: '...rest',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Remaining div attributes pass through to the wrapper.'
		}
	];

	const controlProps: PropDef[] = [
		{
			name: 'id',
			type: 'string',
			description: 'Custom id for the rendered control. Defaults to a generated value linked to the label.'
		},
		{
			name: 'children',
			type: 'Snippet<[{ props }]>',
			required: true,
			description: 'Render-prop snippet. Spread the provided props onto your input to wire aria-* attributes.'
		}
	];

	const labelProps: PropDef[] = [
		{
			name: 'children',
			type: 'Snippet',
			description: 'Label text or content.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge. data-fs-error styles destructive.'
		},
		{
			name: 'ref',
			type: 'HTMLLabelElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the underlying label.'
		},
		{
			name: '...rest',
			type: 'FormPrimitive.LabelProps',
			description: 'All formsnap Label props pass through (for, etc.).'
		}
	];

	const descriptionProps: PropDef[] = [
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
			description: 'Element ref binding for the underlying description element.'
		},
		{
			name: '...rest',
			type: 'FormPrimitive.DescriptionProps',
			description: 'All formsnap Description props and native attributes pass through.'
		}
	];

	const fieldErrorsProps: PropDef[] = [
		{
			name: 'errorClasses',
			type: 'string | undefined | null',
			description: 'Class applied to each error message div in the default rendering.'
		},
		{
			name: 'children',
			type: 'Snippet<[{ errors, errorProps }]>',
			description: 'Custom error renderer. Omit to use the default per-error rendering.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge on the container.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the underlying container.'
		},
		{
			name: '...rest',
			type: 'FormPrimitive.FieldErrorsProps',
			description: 'All formsnap FieldErrors props pass through.'
		}
	];

	const fieldsetProps: PropDef[] = [
		{
			name: 'form',
			type: 'SuperForm<T>',
			required: true,
			description: 'The superForm instance returned from sveltekit-superforms.'
		},
		{
			name: 'name',
			type: 'FormPath<T>',
			required: true,
			description: 'Dot-path of the grouped field in the form schema.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLFieldSetElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the underlying fieldset.'
		},
		{
			name: '...rest',
			type: 'FormPrimitive.FieldsetProps',
			description: 'All formsnap Fieldset props pass through.'
		}
	];

	const legendProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLLegendElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the underlying legend.'
		},
		{
			name: '...rest',
			type: 'FormPrimitive.LegendProps',
			description: 'All formsnap Legend props pass through.'
		}
	];

	const elementFieldProps: PropDef[] = [
		{
			name: 'form',
			type: 'SuperForm<T>',
			required: true,
			description: 'The superForm instance returned from sveltekit-superforms.'
		},
		{
			name: 'name',
			type: 'FormPathLeaves<T>',
			required: true,
			description: 'Dot-path of an array element leaf (e.g. "tags[0]") in the form schema.'
		},
		{
			name: 'children',
			type: 'Snippet<[{ constraints, errors, tainted, value }]>',
			description: 'Field content. Receives field state from formsnap.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged onto the wrapping div.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the wrapper div.'
		},
		{
			name: '...rest',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Remaining div attributes pass through to the wrapper.'
		}
	];

	const buttonProps: PropDef[] = [
		{
			name: '...rest',
			type: 'Button.Props',
			description: 'Re-exports the Button component with type="submit" pre-applied. See Button docs.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | HTMLAnchorElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding inherited from Button.'
		}
	];

	const example = `<script lang="ts">
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import * as Form from '@dashfi/svelte/ui/form';
	import { Input } from '@dashfi/svelte/ui/input';
<\/script>

const schema = z.object({ email: z.string().email() });
const form = superForm(defaults(zod4Client(schema)), { validators: zod4Client(schema), SPA: true });
const { form: formData, errors, enhance } = form;

<form method="POST" use:enhance>
\t<Form.Field {form} name="email">
\t\t<Form.Control>
\t\t\t{#snippet children({ props })}
\t\t\t\t<Form.Label>Work email</Form.Label>
\t\t\t\t<Input {...props} bind:value={$formData.email} type="email" />
\t\t\t{/snippet}
\t\t</Form.Control>
\t\t<Form.Description>We'll send statement summaries here.</Form.Description>
\t\t<Form.FieldErrors />
\t</Form.Field>
</form>`;
</script>

<svelte:head><title>Form — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Form"
	description="Composition primitives for accessible forms — labels, descriptions, errors. Pairs with sveltekit-superforms + zod."
	importPath="@dashfi/svelte/ui/form"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<div style:font-size="13px" style:color="var(--fg-muted)" style:max-width="400px" style:text-align="center">
					Live preview omitted — Form requires a sveltekit-superforms context. See Code tab for the full pattern.
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="24px">
			<PropsTable title="Form.Field" props={fieldProps} />
			<PropsTable title="Form.Control" props={controlProps} />
			<PropsTable title="Form.Label" props={labelProps} />
			<PropsTable title="Form.Description" props={descriptionProps} />
			<PropsTable title="Form.FieldErrors" props={fieldErrorsProps} />
			<PropsTable title="Form.Fieldset" props={fieldsetProps} />
			<PropsTable title="Form.Legend" props={legendProps} />
			<PropsTable title="Form.ElementField" props={elementFieldProps} />
			<PropsTable title="Form.Button" props={buttonProps} />
		</div>
	{/snippet}
	{#snippet anatomy()}
		<div>
			<ul class="docs-list">
				<li><code>Form.Field</code> — wraps a single field, holds form context.</li>
				<li><code>Form.Control</code> — renders the input, wires aria-* attributes via the <code>props</code> snippet arg.</li>
				<li><code>Form.Label</code>, <code>Form.Description</code>, <code>Form.FieldErrors</code> — semantic siblings.</li>
				<li>Validation comes from your zod schema; errors render automatically when present.</li>
			</ul>
		</div>
	{/snippet}
</ComponentLayout>
