<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card';
	import { Button } from '@dashfi/svelte/ui/button';

	const rootProps: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Controlled open state. Bind with bind:open or use onOpenChange to track.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the card opens or closes.'
		},
		{
			name: 'openDelay',
			type: 'number',
			default: '700',
			description: 'Milliseconds to wait after hover/focus before the card opens.'
		},
		{
			name: 'closeDelay',
			type: 'number',
			default: '300',
			description: 'Milliseconds to wait after pointer leaves before the card closes.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Composition slot — typically HoverCardTrigger and HoverCardContent.'
		}
	];

	const contentProps: PropDef[] = [
		{
			name: 'align',
			type: "'start' | 'center' | 'end'",
			default: "'center'",
			description: 'Alignment of the content relative to the trigger along the chosen side.'
		},
		{
			name: 'sideOffset',
			type: 'number',
			default: '4',
			description: 'Distance in pixels between the trigger and the content.'
		},
		{
			name: 'transition',
			type: '(node: Element, params?: unknown) => TransitionConfig',
			default: 'flyAndScale',
			description: 'Svelte transition function applied on mount/unmount.'
		},
		{
			name: 'transitionConfig',
			type: 'TransitionConfig',
			description: 'Parameters forwarded to the transition function.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged onto the content surface.'
		}
	];

	const triggerProps: PropDef[] = [
		{
			name: 'HoverCardTrigger',
			type: 'Component',
			description: 'Re-exported from bits-ui LinkPreview.Trigger. Use the child snippet to render a custom element.'
		}
	];

	const example = `<script lang="ts">
	import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card';
<\/script>

<HoverCard>
\t<HoverCardTrigger>@dashfi</HoverCardTrigger>
\t<HoverCardContent>...preview content...</HoverCardContent>
</HoverCard>`;
</script>

<svelte:head><title>Hover Card — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Hover Card"
	description="Floating card on hover — richer than a tooltip. For previews, mini-profiles, link expansions."
	importPath="@dashfi/svelte/ui/hover-card"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="220px">
			{#snippet children(_m)}
				<HoverCard>
					<HoverCardTrigger>
						{#snippet child({ props })}
							<Button variant="link" {...props}>@dashfi</Button>
						{/snippet}
					</HoverCardTrigger>
					<HoverCardContent>
						<div style:padding="4px" style:font-size="13px">
							<strong>Dash.fi</strong>
							<p style:margin-top="4px" style:color="var(--fg-muted)">
								The corporate charge card built for high-spend advertisers.
							</p>
						</div>
					</HoverCardContent>
				</HoverCard>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable title="HoverCard (Root)" props={rootProps} />
		<PropsTable title="HoverCardContent" props={contentProps} />
		<PropsTable title="HoverCardTrigger" props={triggerProps} />
	{/snippet}
</ComponentLayout>
