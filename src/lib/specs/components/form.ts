import type { ComponentSpec } from '../types.js';

/**
 * Form — composition primitives for accessible forms.
 *
 * Wraps sveltekit-superforms + formsnap. Caller composes Label + Input +
 * Description + Errors per field. Validation driven entirely by the
 * superforms schema (typically zod).
 */
export const form: ComponentSpec = {
	slug: 'form',
	name: 'Form',
	category: 'Inputs',
	status: 'beta',
	importPath:
		"import { FormField, FormLabel, FormControl, FormDescription, FormFieldErrors } from '@dashfi/svelte/ui/form'",
	description:
		'Composition primitives for accessible forms — Label + Input + Description + Errors. Wraps sveltekit-superforms + formsnap; validation comes from the schema (zod).',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/form/',

	dimensions: [
		{
			name: 'Fields',
			value: 'stacked vertically',
			notes: 'Label + Input + Description + Errors stacked, typically with <code>gap-2</code> at the field level.'
		},
		{
			name: 'Inputs inside',
			value: 'canonical underline Input shape',
			notes: '40px tall, transparent bg, bottom-border-only.'
		}
	],

	tokens: [
		{
			name: 'Error message',
			token: { cssVar: '--color-destructive', light: '#ff4000', dark: '#ff4000' },
			notes: 'Monochrome — same hex in both modes.'
		},
		{
			name: 'Description text',
			token: { cssVar: '--color-muted-foreground', light: '#6e7878', dark: '#8b9695' }
		},
		{ name: 'Labels', notes: 'Inherit Label tokens (uppercase mono caps).' }
	],

	variants: [
		{
			name: 'FormField',
			description: 'Wraps a SuperForm field with validation context. Receives <code>form</code> + <code>name</code> (dot-path) props.'
		},
		{
			name: 'FormElementField',
			description: 'Variant for radio / checkbox groups — the field id needs to match all group members.'
		},
		{ name: 'FormLabel', description: 'Canonical Label component, wired to the field id.' },
		{ name: 'FormDescription', description: 'Helper copy below the input.' },
		{
			name: 'FormFieldErrors',
			description: 'Validation messages slot. Uses <code>--color-destructive</code>.'
		},
		{
			name: 'FormFieldset + FormLegend',
			description: 'Grouped fields with a legend heading.'
		},
		{ name: 'FormButton', description: 'Button wired to submit state.' }
	],

	composition: [
		'Built on <code>sveltekit-superforms</code> + <code>formsnap</code>. Pass the <code>form</code> instance (returned from <code>superForm()</code>) to <code>FormField</code> with the field <code>name</code>.',
		'Use <code>FormElementField</code> for radio groups — the field id needs to match all radios in the group.',
		'<code>FormControl</code> takes a render-prop snippet — spread <code>props</code> onto your Input to wire aria-* attributes correctly.'
	],

	nonFeatures: [
		'No layout primitives beyond stacking. Use Card / Item / your own wrapper for visual grouping.',
		'No client-only validation — driven entirely by the superforms schema.',
		'No design-system-specific Input shape — uses the canonical Input. Pair with Input, Textarea, MultiSelect, etc.',
		'No submit / reset wiring — that is the caller / superForm responsibility.'
	],

	props: [
		{
			name: 'FormField.form',
			type: 'SuperForm<T>',
			required: true,
			description: 'The superForm instance returned from sveltekit-superforms.'
		},
		{
			name: 'FormField.name',
			type: 'FormPath<T>',
			required: true,
			description: 'Dot-path of the field in the form schema (e.g. "email", "user.address.city").'
		},
		{
			name: 'FormField.children',
			type: 'Snippet<[{ constraints, errors, tainted, value }]>',
			description: 'Field content. Receives field state from formsnap.'
		},
		{
			name: 'FormControl.id',
			type: 'string',
			description: 'Custom id for the rendered control. Defaults to a generated value linked to the label.'
		},
		{
			name: 'FormControl.children',
			type: 'Snippet<[{ props }]>',
			required: true,
			description: 'Render-prop snippet. Spread the provided props onto your input to wire aria-* attributes.'
		},
		{
			name: 'FormLabel.children',
			type: 'Snippet',
			description: 'Label text or content. <code>data-fs-error</code> styles destructive.'
		},
		{
			name: 'FormFieldErrors.errorClasses',
			type: 'string',
			description: 'Class applied to each error message div in the default rendering.'
		},
		{
			name: 'FormFieldErrors.children',
			type: 'Snippet<[{ errors, errorProps }]>',
			description: 'Custom error renderer. Omit to use the default per-error rendering.'
		},
		{
			name: 'FormFieldset.form / name',
			type: 'SuperForm<T> / FormPath<T>',
			required: true,
			description: 'Same shape as FormField — used for grouped fields with a legend heading.'
		},
		{
			name: 'FormElementField.name',
			type: 'FormPathLeaves<T>',
			required: true,
			description: 'Dot-path of an array element leaf (e.g. "tags[0]") in the form schema.'
		},
		{
			name: 'FormButton.restProps',
			type: 'Button.Props',
			description: 'Re-exports the Button component with type="submit" pre-applied. See Button docs.'
		}
	],

	porting: [
		'Wraps superforms + formsnap. Caller composes Label + Input + Description + Errors per field.',
		'In another stack: pair the equivalent form library (react-hook-form, vee-validate) with your Label / Input primitives and wire the aria-* attributes via a render-prop pattern.'
	],

	example: `<script lang="ts">
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import * as Form from '@dashfi/svelte/ui/form';
	import { Input } from '@dashfi/svelte/ui/input';

	const schema = z.object({ email: z.string().email() });
	const form = superForm(defaults(zod4Client(schema)), { validators: zod4Client(schema), SPA: true });
	const { form: formData, enhance } = form;
<\/script>

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
</form>`,

	accessibility: [
		'Label / Input wiring is automatic via the FormControl render-prop — spread <code>props</code> on the Input to inherit <code>id</code>, <code>aria-describedby</code>, <code>aria-invalid</code>.',
		'Errors are rendered into the description slot so screen readers announce them when the field becomes invalid.',
		'Use Fieldset + Legend for grouped controls (radio groups, checkboxes) — formsnap handles the group semantics.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). superforms + formsnap stacked-field primitives. Field / Label / Description / Errors / Fieldset / Legend / Button parts; uses canonical underline Input shape.'
		}
	]
};
