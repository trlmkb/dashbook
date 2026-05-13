<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Switch } from '@dashfi/svelte/ui/switch';
	import { Label } from '@dashfi/svelte/ui/label';

	let on = $state(true);
	let off = $state(false);

	const propsTable: PropDef[] = [
		{
			name: 'checked',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Bindable checked state. Two-way binding via bind:checked.'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'base' | 'lg'",
			default: "'base'",
			description: 'Size token. See Anatomy for pixel dimensions.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Native disabled — non-interactive, dimmed to 50% opacity.'
		},
		{
			name: 'name',
			type: 'string',
			description: 'Native form name. Submits as on/off when wrapped in a form.'
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
			description: 'All bits-ui Switch.Root props pass through.'
		}
	];

	const example = `<script lang="ts">
	import { Switch } from '@dashfi/svelte/ui/switch';
	import { Label } from '@dashfi/svelte/ui/label';
<\/script>

let notifications = $state(true);

<div style="display:flex;align-items:center;gap:12px">
\t<Switch id="notif" bind:checked={notifications} />
\t<Label for="notif">Email notifications</Label>
</div>

<!-- Sizes: xs · sm · base · lg -->
<Switch size="sm" />
<Switch size="lg" />`;
</script>

<svelte:head><title>Switch — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Switch"
	description="Binary on/off control. Larger affordance than a checkbox — for settings, preferences, feature toggles where the state change is immediate."
	importPath="@dashfi/svelte/ui/switch"
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="States" minHeight="160px">
				{#snippet children(_m)}
					<div style:display="flex" style:gap="32px" style:align-items="center">
						<div style:display="flex" style:gap="12px" style:align-items="center">
							<Switch bind:checked={on} id="on" />
							<Label for="on">On</Label>
						</div>
						<div style:display="flex" style:gap="12px" style:align-items="center">
							<Switch bind:checked={off} id="off" />
							<Label for="off">Off</Label>
						</div>
						<div style:display="flex" style:gap="12px" style:align-items="center">
							<Switch checked disabled id="dis-on" />
							<Label for="dis-on">Disabled</Label>
						</div>
					</div>
				{/snippet}
			</PreviewCanvas>

			<PreviewCanvas caption="Sizes" minHeight="160px">
				{#snippet children(_m)}
					<div style:display="flex" style:gap="24px" style:align-items="center">
						<Switch size="xs" checked />
						<Switch size="sm" checked />
						<Switch size="base" checked />
						<Switch size="lg" checked />
					</div>
				{/snippet}
			</PreviewCanvas>
		</div>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Dimensions (per size)</div>
			<ul class="docs-list">
				<li><strong>xs</strong> — track 16×28px (<code>h-4 w-7</code>), thumb 12px (<code>size-3</code>) translating 12px.</li>
				<li><strong>sm</strong> — track 20×36px (<code>h-5 w-9</code>), thumb 16px (<code>size-4</code>) translating 16px.</li>
				<li><strong>base</strong> — track 24×44px (<code>h-6 w-11</code>) — default — thumb 20px (<code>size-5</code>) translating 20px.</li>
				<li><strong>lg</strong> — track 28×48px (<code>h-7 w-12</code>), thumb 24px (<code>size-6</code>) translating 24px.</li>
				<li><strong>Radius</strong> — track and thumb both <code>rounded-full</code>.</li>
				<li><strong>Border</strong> — 2px transparent border on the track (<code>border-2 border-transparent</code>) reserves space so the focus ring sits cleanly. Thumb has no border.</li>
			</ul>

			<div class="docs-h">Tokens</div>
			<ul class="docs-list">
				<li><strong>Track unchecked</strong> — bg <code>--color-input</code> (light <code>#b6c0bf</code>, dark <code>#1f2a29</code>).</li>
				<li><strong>Track checked</strong> — bg <code>--color-primary</code> (light <code>#25261d</code>, dark <code>#ffffff</code>).</li>
				<li><strong>Thumb</strong> — bg <code>--color-background</code> (light <code>#faf8f1</code>, dark <code>#0f1413</code>) — always the surface colour, regardless of state. Shadow <code>shadow-lg</code> (Tailwind v4 default) for lift.</li>
				<li><strong>Focus ring</strong> — 2px (<code>focus-visible:ring-2</code>) in <code>--color-ring</code> with 2px offset against <code>--color-background</code>.</li>
				<li><strong>Disabled</strong> — <code>opacity-50</code> + <code>cursor-not-allowed</code>.</li>
				<li><strong>Transition</strong> — track colour animates (<code>transition-colors</code>); thumb position animates (<code>transition-transform</code>).</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Pair with a sibling <code>&lt;Label for="…"&gt;</code> via matching <code>id</code>. The label takes the role of "what this switch toggles".</li>
				<li>For settings rows, place Switch right of a label-and-helper-text block: <code>&lt;div&gt;Label + helper&lt;/div&gt; &lt;Switch /&gt;</code>.</li>
				<li>Use Switch for settings that <em>commit immediately</em>. Use Checkbox for selections that need a submit step.</li>
			</ul>

			<div class="docs-h">Not part of Switch</div>
			<ul class="docs-list">
				<li>No <code>label</code> prop. Use a sibling <code>&lt;Label&gt;</code>.</li>
				<li>No icon inside the thumb. The brand stays minimal — no check / cross glyphs inside the thumb.</li>
				<li>No coloured track variants. Track-on is always <code>--color-primary</code> — switches read as state, not as brand.</li>
				<li>No loading or async confirmation state. Wrap with your own optimistic / pending logic at the call site.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>checked</code> — bindable.</li>
				<li><code>size</code> — <code>'xs' | 'sm' | 'base' | 'lg'</code>.</li>
				<li><code>disabled</code>, <code>name</code>, <code>value</code>, <code>id</code> — standard form attributes.</li>
				<li>All bits-ui <code>Switch.Root</code> props pass through (<code>onCheckedChange</code>, <code>required</code>, etc).</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li>Track + thumb radii are both <code>rounded-full</code>. Thumb is the surface colour. Track flips from <code>--color-input</code> to <code>--color-primary</code> on check. Thumb translates by <code>(track_width − thumb_size − 2)</code>px (the 2 comes from the 2px transparent border).</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Always pair with a <code>&lt;Label&gt;</code> using <code>for</code> + matching <code>id</code>.</li>
				<li>Implements <code>role="switch"</code>; screen readers announce "On" / "Off".</li>
				<li><code>Space</code> toggles. <code>Tab</code> moves focus.</li>
				<li>Visible focus ring uses <code>--ring</code> with a 2px offset.</li>
				<li>Don't use a switch where confirmation is needed — switches commit immediately. Use a checkbox + submit instead.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch. Track
					colour spec confirmed: off uses <code>--color-input</code>, on
					uses <code>--color-primary</code> (not <code>--color-brand</code>).
					Thumb is always <code>--color-background</code> (the surface
					colour), with Tailwind v4 <code>shadow-lg</code>. The size
					table holds — xs/sm/base/lg track-and-thumb pairs unchanged.
					The previous v0.3.1 anatomy referenced a stale branch and is
					no longer accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy tightened: per-size track + thumb dimensions, per-state
					token tuples (<code>--color-input</code> off, <code>--color-primary</code>
					on, thumb <code>--color-background</code>), composition rule
					(Label as sibling), and explicit non-features (no inside-thumb
					icon, no coloured track variants, no loading state). Matches
					the Input precedent.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
