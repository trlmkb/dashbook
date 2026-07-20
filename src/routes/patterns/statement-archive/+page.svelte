<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import FileText from '@lucide/svelte/icons/file-text';

	let year = $state(2026);
	const months = ['January', 'February', 'March', 'April', 'May'];

	const example = `<!-- Scaffolded shape — year pager + month rows + preview modal.
Full code pending a pass grounded in the statements route. -->
<div class="year-pager">
\t<Button variant="ghost" size="icon-sm" onclick={() => year--}><ChevronLeft /></Button>
\t<span>{year}</span>
\t<Button variant="ghost" size="icon-sm" onclick={() => year++}><ChevronRight /></Button>
</div>
<ul>
\t{#each months as m}<li><FileText /> {m} {year} <Button size="sm">Preview</Button></li>{/each}
</ul>`;
</script>

<svelte:head><title>Statement archive — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Statement archive"
	description="Year pager over monthly statement rows, each opening a preview modal (PDF/CSV export). The shape for any 'archive of periodic documents' surface — statements, tax forms, annual reports."
	uses={['Button', 'Dialog', 'Pill']}
	draft
>
	{#snippet preview()}
		<PreviewCanvas minHeight="280px">
			{#snippet children(_m)}
				<div class="frame">
					<div class="year-pager">
						<Button variant="ghost" size="icon-sm" onclick={() => year--} aria-label="Previous year">
							<ChevronLeft size={14} strokeWidth={1.5} />
						</Button>
						<span class="year mono">{year}</span>
						<Button variant="ghost" size="icon-sm" onclick={() => year++} aria-label="Next year">
							<ChevronRight size={14} strokeWidth={1.5} />
						</Button>
					</div>
					<div class="rows">
						{#each months as m (m)}
							<div class="row">
								<FileText size={14} strokeWidth={1.5} />
								<span>{m} {year}</span>
								<Button variant="outline" size="sm">Preview</Button>
							</div>
						{/each}
					</div>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}
</PatternLayout>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
		max-width: 480px;
	}
	.year-pager {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
	}
	.year {
		font-size: 14px;
		min-width: 48px;
		text-align: center;
	}
	.rows {
		border: 1px solid var(--border);
	}
	.row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		font-size: 13px;
		border-top: 1px solid var(--border);
	}
	.row:first-child {
		border-top: 0;
	}
	.row span {
		flex: 1;
	}
</style>
