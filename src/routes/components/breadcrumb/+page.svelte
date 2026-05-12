<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import {
		Breadcrumb,
		BreadcrumbList,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbPage,
		BreadcrumbSeparator
	} from '@dashfi/svelte/ui/breadcrumb';

	const breadcrumbProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLElement | undefined',
			bindable: true,
			description: 'Element ref binding for the nav container.'
		}
	];

	const breadcrumbListProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLOListElement | undefined',
			bindable: true,
			description: 'Element ref binding for the ordered list.'
		}
	];

	const breadcrumbItemProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLLIElement | undefined',
			bindable: true,
			description: 'Element ref binding for the list item.'
		}
	];

	const breadcrumbLinkProps: PropDef[] = [
		{
			name: 'href',
			type: 'string',
			description: 'Destination URL for the anchor element.'
		},
		{
			name: 'asChild',
			type: 'boolean',
			default: 'false',
			description: 'When true, defers rendering to the slot so you can compose a custom link element (e.g. SvelteKit <a>).'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLAnchorElement | undefined',
			bindable: true,
			description: 'Element ref binding for the anchor.'
		}
	];

	const breadcrumbPageProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLSpanElement | undefined',
			bindable: true,
			description: 'Element ref binding for the page span. Already wired with aria-current="page".'
		}
	];

	const breadcrumbSeparatorProps: PropDef[] = [
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'el',
			type: 'HTMLLIElement | undefined',
			bindable: true,
			description: 'Element ref binding. Slot accepts a custom separator icon (defaults to ChevronRight).'
		}
	];

	const example = `<script lang="ts">
	import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@dashfi/svelte/ui/breadcrumb';
<\/script>

<Breadcrumb>
\t<BreadcrumbList>
\t\t<BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
\t\t<BreadcrumbSeparator />
\t\t<BreadcrumbItem><BreadcrumbLink href="/cards">Cards</BreadcrumbLink></BreadcrumbItem>
\t\t<BreadcrumbSeparator />
\t\t<BreadcrumbItem><BreadcrumbPage>Q2 Meta · brand</BreadcrumbPage></BreadcrumbItem>
\t</BreadcrumbList>
</Breadcrumb>`;
</script>

<svelte:head><title>Breadcrumb — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Breadcrumb"
	description="Hierarchical navigation trail. Always end with a non-link Page indicating the current location."
	importPath="@dashfi/svelte/ui/breadcrumb"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem><BreadcrumbLink href="/cards">Cards</BreadcrumbLink></BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem><BreadcrumbPage>Q2 Meta · brand</BreadcrumbPage></BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<div style:display="flex" style:flex-direction="column" style:gap="32px">
			<PropsTable title="Breadcrumb" props={breadcrumbProps} />
			<PropsTable title="BreadcrumbList" props={breadcrumbListProps} />
			<PropsTable title="BreadcrumbItem" props={breadcrumbItemProps} />
			<PropsTable title="BreadcrumbLink" props={breadcrumbLinkProps} />
			<PropsTable title="BreadcrumbPage" props={breadcrumbPageProps} />
			<PropsTable title="BreadcrumbSeparator" props={breadcrumbSeparatorProps} />
		</div>
	{/snippet}
</ComponentLayout>
