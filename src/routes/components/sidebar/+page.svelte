<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable from '$chrome/PropsTable.svelte';
	import Anatomy from '$specs/render/Anatomy.svelte';
	import { sidebar as spec } from '$specs/components/sidebar';
	import {
		SidebarProvider,
		Sidebar,
		SidebarHeader,
		SidebarContent,
		SidebarFooter,
		SidebarMenu,
		SidebarMenuItem,
		SidebarMenuButton,
		SidebarGroup,
		SidebarGroupLabel,
		SidebarGroupContent,
		SidebarInset,
		SidebarTrigger,
		SidebarSeparator
	} from '@dashfi/svelte/ui/sidebar';
	import Home from '@lucide/svelte/icons/home';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import Receipt from '@lucide/svelte/icons/receipt';
</script>

<svelte:head><title>Sidebar — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name={spec.name}
	description={spec.description}
	importPath={spec.importPath.replace(/^import .+ from '/, '').replace(/'$/, '')}
	status={spec.status}
>
	{#snippet preview()}
		<div class="preview-stack">
			{#if spec.whenToUse}
				<section class="when-to-use">
					<h3>When to use</h3>
					<p>{spec.whenToUse}</p>
				</section>
			{/if}

			<PreviewCanvas minHeight="360px" caption="collapsible=&quot;none&quot; — always expanded, for docs preview">
				{#snippet children(_m)}
					<div class="shell">
						<SidebarProvider open={true} class="!min-h-0 !h-full">
							<Sidebar collapsible="none">
								<SidebarHeader>
									<span class="brand">Dash.fi</span>
								</SidebarHeader>
								<SidebarSeparator />
								<SidebarContent>
									<SidebarGroup>
										<SidebarGroupLabel>Workspace</SidebarGroupLabel>
										<SidebarGroupContent>
											<SidebarMenu>
												<SidebarMenuItem>
													<SidebarMenuButton isActive={true}>
														<Home size={16} strokeWidth={1.5} />
														<span>Dashboard</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
												<SidebarMenuItem>
													<SidebarMenuButton>
														<CreditCard size={16} strokeWidth={1.5} />
														<span>Cards</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
												<SidebarMenuItem>
													<SidebarMenuButton>
														<Receipt size={16} strokeWidth={1.5} />
														<span>Transactions</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											</SidebarMenu>
										</SidebarGroupContent>
									</SidebarGroup>
								</SidebarContent>
								<SidebarFooter>
									<div class="user">Zygis Y.</div>
								</SidebarFooter>
							</Sidebar>
							<SidebarInset>
								<header class="topbar"><SidebarTrigger /></header>
								<main class="content">Content area (SidebarInset)</main>
							</SidebarInset>
						</SidebarProvider>
					</div>
				{/snippet}
			</PreviewCanvas>
		</div>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={spec.example} language="svelte" />
	{/snippet}

	{#snippet docs()}
		<PropsTable props={spec.props} />
	{/snippet}

	{#snippet anatomy()}
		<Anatomy {spec} />
	{/snippet}

	{#snippet accessibility()}
		<div>
			<ul class="docs-list">
				{#each spec.accessibility as item (item)}
					<li>{@html item}</li>
				{/each}
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			{#each spec.changelog as entry (entry.version)}
				<li>
					<span class="docs-cl-when">{entry.version} — {entry.date}</span>
					<p>{entry.note}</p>
				</li>
			{/each}
		</ul>
	{/snippet}
</ComponentLayout>

<style>
	.shell {
		width: 100%;
		height: 320px;
		border: 1px solid var(--border);
		overflow: hidden;
	}
	.brand {
		padding: 8px 12px;
		font-size: 13px;
		font-weight: 500;
	}
	.user {
		padding: 8px 12px;
		font-size: 12px;
		color: var(--fg-muted);
	}
	.topbar {
		display: flex;
		align-items: center;
		padding: 8px 12px;
		border-bottom: 1px solid var(--border);
	}
	.content {
		padding: 16px;
		font-size: 13px;
		color: var(--fg-muted);
	}
</style>
