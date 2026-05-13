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

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Behavior</div>
			<ul class="docs-list">
				<li>Wraps a single child in a <code>&lt;div&gt;</code> that translates toward the cursor on hover.</li>
				<li><strong>Strength</strong> — translation = (cursorCenter − elementCenter) × <code>strength</code> (default 0.3).</li>
				<li><strong>Transition</strong> — <code>transform</code> animates over <code>transitionDuration</code> ms (default 300).</li>
				<li>On <code>mouseleave</code> the element returns to origin.</li>
			</ul>
			<div class="docs-h">Not part of MagneticHover</div>
			<ul class="docs-list">
				<li>No focus mirroring — pure hover effect. Keyboard users get nothing. Hence marketing-only.</li>
				<li>No motion-prefers handling built in. Wrap or disable manually for reduced-motion users.</li>
				<li>No fallback styling. The wrapped child renders as-is when <code>disabled</code>.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Pointer-position translate × 0.3 with 300ms ease on a wrapping element.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Cursor-tracking
					transform on the wrapping div — <code>(cursor − center) × strength</code>,
					300ms ease. Marketing-only; no keyboard fallback.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
