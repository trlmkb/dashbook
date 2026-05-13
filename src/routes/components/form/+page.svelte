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
			<div class="docs-h">Parts</div>
			<ul class="docs-list">
				<li><strong>FormField</strong> — wraps a SuperForm field, providing validation context.</li>
				<li><strong>FormElementField</strong> — radio/checkbox-group variant.</li>
				<li><strong>FormLabel</strong> — canonical Label component, wired to the field's id.</li>
				<li><strong>FormDescription</strong> — helper copy below the input.</li>
				<li><strong>FormFieldErrors</strong> — validation messages slot.</li>
				<li><strong>FormFieldset</strong> + <strong>FormLegend</strong> — grouped fields with a legend heading.</li>
				<li><strong>FormButton</strong> — Button wired to submit state.</li>
			</ul>
			<div class="docs-h">Dimensions</div>
			<ul class="docs-list">
				<li>Fields stack vertically; default gap inherits from parent. Label + Input + Description + Errors typically stacked with <code>gap-2</code>.</li>
				<li>Inputs inside use canonical Input shape (underline-only).</li>
			</ul>
			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li>Error messages use <code>--color-destructive</code> (monochrome).</li>
				<li>Description text <code>--color-muted-foreground</code>.</li>
				<li>Labels inherit Label tokens (uppercase mono caps).</li>
			</ul>
			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Built on <code>sveltekit-superforms</code> + <code>formsnap</code>. Pass the <code>form</code> instance to <code>FormField</code> with the field <code>name</code>.</li>
				<li>Use <code>FormElementField</code> for radio groups (the field id needs to match all radios in the group).</li>
			</ul>
			<div class="docs-h">Not part of Form</div>
			<ul class="docs-list">
				<li>No layout primitives beyond stacking. Use Card / Item / your own wrapper for visual grouping.</li>
				<li>No client-only validation — driven entirely by superforms schema.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Wraps superforms + formsnap. Caller composes Label + Input + Description + Errors per field.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). superforms +
					formsnap stacked-field primitives. Field / Label / Description / Errors
					/ Fieldset / Legend / Button parts; uses canonical underline Input shape.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
