<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Drawer,
		DrawerTrigger,
		DrawerContent,
		DrawerHeader,
		DrawerTitle,
		DrawerDescription,
		DrawerFooter
	} from '@dashfi/svelte/ui/drawer';
	import { Button } from '@dashfi/svelte/ui/button';

	const propsTable: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			bindable: true,
			description: 'Controlled open state. Bind with bind:open or pass onOpenChange to track changes.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback fired when the drawer requests to open or close.'
		},
		{
			name: 'shouldScaleBackground',
			type: 'boolean',
			default: 'true',
			description: 'Scale the page behind the drawer for the signature stacked-card effect.'
		},
		{
			name: 'activeSnapPoint',
			type: 'string | number | null',
			default: 'null',
			bindable: true,
			description: 'Current snap point when snapPoints is provided. Bindable for controlled behavior.'
		},
		{
			name: 'snapPoints',
			type: '(string | number)[]',
			description: 'Fractional or pixel positions the drawer will snap to on drag.'
		},
		{
			name: 'dismissible',
			type: 'boolean',
			default: 'true',
			description: 'Allow swipe-down and overlay-click to close the drawer.'
		},
		{
			name: 'children',
			type: 'Snippet',
			required: true,
			description: 'Composition slot — typically DrawerTrigger and DrawerContent.'
		},
		{
			name: 'DrawerTrigger',
			type: 'Component',
			description: 'Re-exported from vaul-svelte. Renders the element that opens the drawer.'
		},
		{
			name: 'DrawerContent',
			type: 'Component',
			description: 'The bottom sheet surface. Accepts ref (bindable HTMLDivElement) and portalProps.'
		},
		{
			name: 'DrawerHeader / DrawerFooter',
			type: 'Component',
			description: 'Layout sections inside DrawerContent. Pass class to override.'
		},
		{
			name: 'DrawerTitle / DrawerDescription',
			type: 'Component',
			description: 'Accessible heading and description, wired to the drawer for screen readers.'
		},
		{
			name: 'DrawerOverlay / DrawerPortal / DrawerClose',
			type: 'Component',
			description: 'Lower-level primitives re-exported from vaul-svelte for custom compositions.'
		}
	];

	const example = `<script lang="ts">
	import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@dashfi/svelte/ui/drawer';
<\/script>

<Drawer>
\t<DrawerTrigger>Open</DrawerTrigger>
\t<DrawerContent>
\t\t<DrawerHeader>
\t\t\t<DrawerTitle>Issue virtual card</DrawerTitle>
\t\t\t<DrawerDescription>For one-off vendor or ad-account spend.</DrawerDescription>
\t\t</DrawerHeader>
\t</DrawerContent>
</Drawer>`;
</script>

<svelte:head><title>Drawer — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Drawer"
	description="Mobile-friendly bottom sheet. Slides up with momentum-scroll, swipe-to-dismiss."
	importPath="@dashfi/svelte/ui/drawer"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="200px">
			{#snippet children(_m)}
				<Drawer>
					<DrawerTrigger>
						{#snippet child({ props }: { props: Record<string, unknown> })}
							<Button variant="outline" {...props}>Open drawer</Button>
						{/snippet}
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Issue virtual card</DrawerTitle>
							<DrawerDescription>
								For one-off vendor or ad-account spend.
							</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter>
							<Button>Issue</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
