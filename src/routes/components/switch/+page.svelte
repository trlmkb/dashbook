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
			<div class="docs-h">Sizes</div>
			<ul class="docs-list">
				<li><code>xs</code> — h-4 w-7 (16×28px). Inline with body copy.</li>
				<li><code>sm</code> — h-5 w-9 (20×36px). Compact settings rows.</li>
				<li><code>base</code> — h-6 w-11 (24×44px). Default — meets 24px touch target.</li>
				<li><code>lg</code> — h-7 w-12 (28×48px). Prominent toggles.</li>
			</ul>
			<div class="docs-h">Props</div>
			<ul class="docs-list">
				<li><code>checked</code> — bindable state.</li>
				<li><code>disabled</code> — non-interactive, dimmed.</li>
				<li>All bits-ui Switch.Root props pass through.</li>
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
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
