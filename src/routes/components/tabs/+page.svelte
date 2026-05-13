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
			<div class="docs-h">Dimensions (per part)</div>
			<ul class="docs-list">
				<li><strong>Tabs</strong> (root) — no layout styling. Holds shared <code>value</code> state.</li>
				<li><strong>TabsList — <code>variant="primary"</code></strong> (default) — <code>flex items-center gap-4 border-b</code>. The list sits on top of a 1px line that becomes the underline track.</li>
				<li><strong>TabsList — <code>variant="secondary"</code></strong> — <code>relative flex items-center gap-1 rounded-md</code>, with a positioned indicator child. No bottom border.</li>
				<li><strong>TabsTrigger — primary</strong> — <code>px-0 py-2.5 text-sm</code> (10px vertical), <code>-mb-px</code> to overlap the list border, <code>border-b-2 border-b-transparent</code>. Active and hover switch the bottom border to <code>border-primary</code>.</li>
				<li><strong>TabsTrigger — secondary</strong> — <code>rounded-md px-3 py-1.5 text-xs</code> (12px font, 12h × 6v padding), <code>select-none</code>, <code>relative z-0</code>. The pill <em>is</em> the trigger; no per-trigger border.</li>
				<li><strong>Secondary indicator</strong> — absolute pill drawn on the list: <code>absolute top-0 bottom-0 rounded-md border border-primary pointer-events-none</code>. Position (<code>left</code> + <code>width</code>) tracks the active trigger via offsetLeft / offsetWidth, animated with <code>transition-all duration-300 ease-out</code> once mounted (initial render is jump-cut).</li>
				<li><strong>TabsContent</strong> — <code>mt-2</code> (8px top margin), <code>focus-visible:ring-2 ring-ring ring-offset-2</code>, otherwise no default padding.</li>
			</ul>

			<div class="docs-h">Tokens (per part)</div>
			<ul class="docs-list">
				<li><strong>TabsList text colour</strong> — both variants inherit <code>text-muted-foreground</code> on the list (light <code>#6e7878</code>, dark <code>#8b9695</code>); triggers override on active / hover.</li>
				<li><strong>TabsList border (primary)</strong> — bottom border uses the default <code>border</code> token (<code>--color-border</code> light <code>#e8e6dc</code>, dark <code>#1f2a29</code>).</li>
				<li><strong>TabsTrigger inactive</strong> — text <code>--color-muted-foreground</code> (inherited).</li>
				<li><strong>TabsTrigger active</strong> — text <code>--color-foreground</code>. Primary: bottom border switches to <code>--color-primary</code>. Secondary: position indicator pill (border <code>--color-primary</code>) slides under the active trigger. <code>data-[state=active]:pointer-events-none</code> so the active tab cannot be re-clicked.</li>
				<li><strong>TabsTrigger hover</strong> — text <code>--color-foreground</code>. Primary: bottom border <code>border-primary</code>. Secondary: text colour shift only.</li>
				<li><strong>Focus ring</strong> — 2px (<code>focus-visible:ring-2</code>) in <code>--color-ring</code> with 2px offset.</li>
				<li><strong>Disabled</strong> — <code>opacity-40</code> + <code>pointer-events-none</code>.</li>
				<li><strong>Transition</strong> — <code>transition-all</code> on triggers; secondary indicator <code>transition-all duration-300 ease-out</code>.</li>
			</ul>

			<div class="docs-h">Composition</div>
			<ul class="docs-list">
				<li>Standard tree: <code>Tabs &gt; TabsList &gt; TabsTrigger</code> + sibling <code>TabsContent</code>. Each <code>TabsContent</code> matches a trigger by <code>value</code>.</li>
				<li>Pick the visual style on the list: <code>&lt;TabsList variant="primary"&gt;</code> for the underline (default) or <code>&lt;TabsList variant="secondary"&gt;</code> for the sliding pill.</li>
				<li>Triggers are <code>inline-flex</code> — they take only as much width as their content + padding + gap.</li>
				<li>For controlled mode, bind <code>value</code> on <code>Tabs</code>.</li>
			</ul>

			<div class="docs-h">Not part of Tabs</div>
			<ul class="docs-list">
				<li>No additional variants beyond <code>primary</code> and <code>secondary</code>. Size is fixed per variant — primary is <code>text-sm</code>, secondary is <code>text-xs</code>.</li>
				<li>No icon-on-trigger slot. Embed icons as children: <code>&lt;TabsTrigger&gt;&lt;Icon /&gt;Label&lt;/TabsTrigger&gt;</code>.</li>
				<li>No vertical orientation styling out of the box (the <code>orientation</code> prop only affects arrow-key direction).</li>
				<li>No badge / count slot on triggers.</li>
				<li>No lazy-mount toggle — use <code>forceMount</code> on TabsContent for animation needs.</li>
				<li>No background fill on the secondary list itself. Only the sliding indicator is rendered.</li>
			</ul>

			<div class="docs-h">Props (behaviour-only)</div>
			<ul class="docs-list">
				<li><code>Tabs.value</code> — bindable.</li>
				<li><code>Tabs.activationMode</code> — <code>'automatic'</code> (default; selecting follows focus) or <code>'manual'</code>.</li>
				<li><code>TabsList.variant</code> — <code>'primary' | 'secondary'</code>, default <code>'primary'</code>.</li>
				<li><code>TabsTrigger.value</code>, <code>TabsContent.value</code> — required, must match.</li>
				<li>All bits-ui <code>Tabs.*</code> props pass through.</li>
			</ul>

			<div class="docs-h">Porting to another stack</div>
			<ul class="docs-list">
				<li><strong>Primary</strong>: flex row with a 1px bottom border (<code>--color-border</code>). Triggers are text-only with <code>px-0 py-2.5 text-sm</code>. Active gets a 2px bottom border in <code>--color-primary</code>; <code>-mb-px</code> makes it overlap the list border so it visually replaces a segment.</li>
				<li><strong>Secondary</strong>: <code>rounded-md</code> list with <code>gap-1</code>. Triggers are <code>rounded-md px-3 py-1.5 text-xs</code> pills; an absolute indicator pill (<code>border border-primary rounded-md</code>) slides under the active trigger via JS-measured <code>offsetLeft</code> / <code>offsetWidth</code> with 300ms ease-out.</li>
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
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch. The
					canonical now ships a real <code>variant="secondary"</code>
					on <code>TabsList</code> — a sliding
					<code>border-primary</code> pill indicator over
					<code>rounded-md px-3 py-1.5 text-xs</code> pill triggers,
					alongside the existing underline default. The primary
					trigger padding also shifted to <code>px-0 py-2.5</code>
					with a <code>border-b-2</code> indicator. The previous
					v0.3.1 anatomy referenced a stale branch (and incorrectly
					claimed no secondary variant existed) and is no longer
					accurate.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.1 — 2026-05-13</span>
				<p>
					Anatomy tightened: per-part dimensions (flex row with
					<code>border-b</code>, triggers <code>px-0.5 py-2</code> with
					<code>-mb-px</code> overlap), per-state token tuples (inactive
					<code>--color-muted-foreground</code>, active
					<code>--color-foreground</code> + <code>border-b-primary</code>
					underline), and explicit non-features (no pill / segmented
					variant in canonical). Matches the Input
					precedent.
				</p>
			</li>
			<li>
				<span class="docs-cl-when">v0.3.0 — 2026-05-10</span>
				<p>First documented in Dashbook.</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
