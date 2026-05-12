<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '@dashfi/svelte/ui/tabs';

	const tabsProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			bindable: true,
			description: 'The active tab value. Bind for controlled mode.'
		},
		{
			name: 'onValueChange',
			type: '(value: string) => void',
			description: 'Callback fired when the active tab changes.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout orientation. Affects arrow-key navigation direction.'
		},
		{
			name: 'activationMode',
			type: "'automatic' | 'manual'",
			default: "'automatic'",
			description: 'Whether tabs activate on focus or only on explicit selection.'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'true',
			description: 'Whether keyboard navigation wraps around at the ends.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable all triggers within the Tabs root.'
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

	const tabsListProps: PropDef[] = [
		{
			name: 'variant',
			type: "'primary' | 'secondary'",
			default: "'primary'",
			description: 'Primary renders an underline track; secondary renders a sliding pill indicator.'
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
			description: 'Element ref binding for the list container.'
		}
	];

	const tabsTriggerProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'Unique value identifying this trigger and its corresponding content.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable this individual trigger.'
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

	const tabsContentProps: PropDef[] = [
		{
			name: 'value',
			type: 'string',
			required: true,
			description: 'Must match the value of the matching trigger.'
		},
		{
			name: 'forceMount',
			type: 'boolean',
			default: 'false',
			description: 'Force mounting when inactive — useful for animated transitions.'
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
			description: 'Element ref binding for the content pane.'
		}
	];

	const example = `<script lang="ts">
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '@dashfi/svelte/ui/tabs';
<\/script>

<Tabs value="overview">
\t<TabsList>
\t\t<TabsTrigger value="overview">Overview</TabsTrigger>
\t\t<TabsTrigger value="transactions">Transactions</TabsTrigger>
\t\t<TabsTrigger value="rewards">Rewards</TabsTrigger>
\t</TabsList>
\t<TabsContent value="overview">…overview pane…</TabsContent>
\t<TabsContent value="transactions">…transactions pane…</TabsContent>
\t<TabsContent value="rewards">…rewards pane…</TabsContent>
</Tabs>`;
</script>

<svelte:head><title>Tabs — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Tabs"
	description="Switch between panes of related content. Built on bits-ui — keyboard navigation and roving tabindex out of the box."
	importPath="@dashfi/svelte/ui/tabs"
>
	{#snippet preview()}
		<div class="preview-stack">
			<PreviewCanvas caption="Composition" minHeight="280px">
				{#snippet children(_m)}
					<div style:width="100%" style:max-width="600px">
						<Tabs value="overview">
							<TabsList>
								<TabsTrigger value="overview">Overview</TabsTrigger>
								<TabsTrigger value="transactions">Transactions</TabsTrigger>
								<TabsTrigger value="rewards">Rewards</TabsTrigger>
							</TabsList>
							<TabsContent value="overview">
								<div style:padding="16px 0" style:font-size="14px">Overview pane.</div>
							</TabsContent>
							<TabsContent value="transactions">
								<div style:padding="16px 0" style:font-size="14px">Transactions pane.</div>
							</TabsContent>
							<TabsContent value="rewards">
								<div style:padding="16px 0" style:font-size="14px">Rewards pane.</div>
							</TabsContent>
						</Tabs>
					</div>
				{/snippet}
			</PreviewCanvas>
		</div>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Tabs" props={tabsProps} />
			<PropsTable title="TabsList" props={tabsListProps} />
			<PropsTable title="TabsTrigger" props={tabsTriggerProps} />
			<PropsTable title="TabsContent" props={tabsContentProps} />
		</div>
	{/snippet}

	{#snippet anatomy()}
		<div>
			<div class="docs-h">Parts</div>
			<ul class="docs-list">
				<li><code>Tabs</code> — root, holds shared <code>value</code> state.</li>
				<li><code>TabsList</code> — container for triggers, renders the underline track.</li>
				<li><code>TabsTrigger</code> — individual tab button. Active when <code>value</code> matches.</li>
				<li><code>TabsContent</code> — the pane shown when the matching trigger is active.</li>
			</ul>
			<div class="docs-h">Behavior</div>
			<ul class="docs-list">
				<li><code>value</code> can be bound (<code>bind:value</code>) for controlled mode.</li>
				<li>Active indicator is a 1px brand underline, animated with the default easing.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				<li>Implements WAI-ARIA tabs pattern. <code>Arrow Left/Right</code> moves between triggers, <code>Home/End</code> jumps to first/last.</li>
				<li>Inactive tab panes are removed from the tab order until activated.</li>
				<li>Each <code>TabsTrigger</code> needs unique <code>value</code>; pair with a meaningful label.</li>
				<li>Provide <code>aria-label</code> on <code>Tabs</code> if the surrounding context doesn't make the purpose clear.</li>
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
