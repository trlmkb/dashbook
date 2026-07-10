<script lang="ts">
	import PatternLayout from '$chrome/PatternLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '@dashfi/svelte/ui/select';
	import Upload from '@lucide/svelte/icons/upload';
	import Download from '@lucide/svelte/icons/download';
	import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Loader from '@lucide/svelte/icons/loader';

	const WIZARD_STEPS = [
		{ key: 'template', label: 'Get the template' },
		{ key: 'upload', label: 'Upload your file' },
		{ key: 'map', label: 'Map columns' },
		{ key: 'process', label: 'Process' }
	];

	type Phase = 'template' | 'uploading' | 'map' | 'processing' | 'done';
	let phase = $state<Phase>('template');
	const stepIndex = $derived(
		{ template: 0, uploading: 1, map: 2, processing: 3, done: 3 }[phase]
	);

	const fields = [
		{ key: 'vendorName', label: 'Vendor name', hint: 'The payee on the invoice.', required: true },
		{ key: 'amount', label: 'Amount', hint: 'Total in USD.', required: true },
		{ key: 'dueDate', label: 'Due date', hint: 'ISO 8601 or MM/DD/YYYY.', required: true },
		{ key: 'poNumber', label: 'PO number', hint: 'Optional purchase-order reference.', required: false }
	];
	let mapping = $state<Record<string, string>>({
		vendorName: 'Vendor',
		amount: 'Total',
		dueDate: 'Due',
		poNumber: "Don't import"
	});
	const columns = ['Vendor', 'Total', 'Due', 'PO#', "Don't import"];

	function next(): void {
		if (phase === 'template') phase = 'uploading';
		else if (phase === 'uploading') phase = 'map';
		else if (phase === 'map') phase = 'processing';
		else if (phase === 'processing') phase = 'done';
	}

	const example = `<script lang="ts">
\timport { getBulkImportFileSourceQuery, processBulkImportFileSourceMutation } from '$lib/queries/bulk-import.queries';
\timport StepRail from './step-rail.svelte';

\tconst WIZARD_STEPS = [
\t\t{ key: 'template', label: 'Get the template' },
\t\t{ key: 'upload', label: 'Upload your file' },
\t\t{ key: 'map', label: 'Map columns' },
\t\t{ key: 'process', label: 'Process' }
\t];

\t// Phase is derived from server state, never tracked as its own store —
\t// resuming a wizard (resumeFileSourceId) just re-derives the same phase.
\tconst phase = \$derived.by(() => {
\t\tif (uploadFile.isPending) return 'uploading';
\t\tif (!fileSourceId) return 'template';
\t\tif (!fileSource) return 'uploading';
\t\tswitch (fileSource.status) {
\t\t\tcase 'uploading': return 'uploading';
\t\t\tcase 'failed': return 'failed';
\t\t\tcase 'uploaded': return 'map';
\t\t\tcase 'processing': return 'processing';
\t\t\tcase 'processed': return 'done';
\t\t}
\t});
<\/script>

<Dialog.Content class="gap-0 overflow-hidden p-0 sm:max-w-3xl">
\t<Dialog.Header>{type.wizard.dialogTitle}</Dialog.Header>
\t<div class="flex min-h-0">
\t\t<aside class="w-56 border-r p-5">
\t\t\t<StepRail steps={WIZARD_STEPS} current={stepIndex} />
\t\t</aside>
\t\t<div class="flex-1 overflow-y-auto p-6">
\t\t\t{#if phase === 'template'}
\t\t\t\t<!-- template download + drag-drop upload -->
\t\t\t{:else if phase === 'map'}
\t\t\t\t<!-- dash.fi field -> detected CSV column, per required field -->
\t\t\t{:else if phase === 'processing'}
\t\t\t\t<!-- LinearLoader + "keep working" escape hatch -->
\t\t\t{/if}
\t\t</div>
\t</div>
</Dialog.Content>`;
</script>

<svelte:head><title>Bulk import wizard — Patterns — Dashbook</title></svelte:head>

<PatternLayout
	name="Bulk import wizard"
	description="Template → upload → map columns → process, in one Dialog with a left step-rail. Drag-and-drop or click-to-browse CSV upload, auto-detected column mapping against required fields, a loader-driven processing state, and a 'keep working' escape hatch so the import runs in the background."
	uses={['Dialog', 'Select', 'LinearLoader', 'Pill', 'Alert']}
>
	{#snippet preview()}
		<PreviewCanvas minHeight="460px">
			{#snippet children(_m)}
				<div class="dialog-frame">
					<header class="dialog-head">
						<span class="dialog-icon"><Upload size={16} strokeWidth={1.5} /></span>
						<div>
							<div class="dialog-title">Import vendor invoices</div>
							<div class="dialog-sub">Upload a CSV to bulk-create invoices.</div>
						</div>
					</header>
					<div class="dialog-body">
						<aside class="rail">
							<div class="rail-label">Steps</div>
							{#each WIZARD_STEPS as s, i (s.key)}
								<div class="rail-step" class:done={i < stepIndex} class:active={i === stepIndex}>
									<span class="rail-dot"></span>
									{s.label}
								</div>
							{/each}
						</aside>
						<div class="content">
							{#if phase === 'template'}
								<h3>Start from the template</h3>
								<p class="lede">Download the template, fill it in, then upload it below.</p>
								<div class="file-row">
									<FileSpreadsheet size={16} strokeWidth={1.5} />
									<span>vendor-invoices-template.csv</span>
									<Button variant="outline" size="sm">
										<Download size={14} strokeWidth={1.5} />
										Download
									</Button>
								</div>
								<button type="button" class="dropzone" onclick={next}>
									<Upload size={20} strokeWidth={1.5} />
									<span>Drop your CSV here, or click to browse</span>
									<span class="max">Max file size: 10MB</span>
								</button>
							{:else if phase === 'uploading'}
								<div class="uploading">
									<FileSpreadsheet size={18} strokeWidth={1.5} />
									<span>invoices-may.csv — uploading to secure storage</span>
								</div>
								<div class="loader-track"><div class="loader-fill"></div></div>
								<Button size="sm" onclick={next}>Continue (simulated)</Button>
							{:else if phase === 'map'}
								<div class="map-head">
									<h3>Map your columns</h3>
									<Pill type="success">Uploaded</Pill>
								</div>
								<p class="lede">We matched <strong>invoices-may.csv</strong> automatically.</p>
								<div class="map-table">
									<div class="map-row map-head-row">
										<span>dash.fi field</span>
										<span>CSV column</span>
									</div>
									{#each fields as f (f.key)}
										<div class="map-row">
											<div>
												<div class="field-name">{f.label}{f.required ? ' *' : ''}</div>
												<div class="field-hint">{f.hint}</div>
											</div>
											<Select type="single" bind:value={mapping[f.key]}>
												<SelectTrigger class="h-8 text-xs">{mapping[f.key]}</SelectTrigger>
												<SelectContent>
													{#each columns as c (c)}
														<SelectItem value={c}>{c}</SelectItem>
													{/each}
												</SelectContent>
											</Select>
										</div>
									{/each}
								</div>
								<Button variant="brand" onclick={next}>
									Process file
									<ArrowRight size={14} strokeWidth={1.5} />
								</Button>
							{:else if phase === 'processing'}
								<div class="processing">
									<Loader size={18} strokeWidth={1.5} class="spin" />
									<span>Creating 42 invoices…</span>
								</div>
								<div class="loader-track"><div class="loader-fill wide"></div></div>
								<Button size="sm" onclick={next}>Finish (simulated)</Button>
							{:else}
								<div class="done">
									<Pill type="success">Done</Pill>
									<p>42 invoices created. 3 skipped — missing required fields.</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}

	{#snippet code()}
		<CodeSnippet code={example} language="svelte" />
	{/snippet}

	{#snippet rationale()}
		<div class="rationale">
			<h3>Why this shape</h3>
			<p>
				CSV import is the highest-friction data-entry path in the product — one bad file can
				create dozens of malformed records. The wizard front-loads friction into a single
				linear path (template → upload → map → process) so mistakes are caught before anything
				is written, rather than requiring a bulk-undo after the fact.
			</p>
			<h3>Decisions</h3>
			<ul>
				<li>
					<strong>Phase is derived from server state, not a local step counter.</strong> The
					wizard can be closed and resumed (<code>resumeFileSourceId</code>) and land on the
					correct step because the phase always reflects what the file-source record actually
					says, never what the client last remembered.
				</li>
				<li>
					<strong>Column mapping pre-fills from auto-detection</strong>, with required-but-unmapped
					fields called out in a warning Alert before the user can proceed — never a silent
					partial import.
				</li>
				<li>
					<strong>Processing has a "keep working" escape hatch.</strong> Large imports run in the
					background; closing the dialog doesn't cancel the job, and a link lets the user
					navigate away and check back later.
				</li>
				<li>
					<strong>The step-rail is presentational only</strong> — clicking a future step does
					nothing. Steps are gated by real state (file uploaded, mapping complete), not
					free navigation, because skipping ahead would mean acting on incomplete data.
				</li>
			</ul>
			<h3>Source</h3>
			<p>
				Distilled from <code>lib/modules/bulk-import/components/wizard/bulk-import-wizard.svelte</code>
				and its <code>step-rail.svelte</code> sibling.
			</p>
		</div>
	{/snippet}

	{#snippet variations()}
		<div class="rationale">
			<h3>Variations</h3>
			<ul>
				<li>
					<strong>Failed-upload retry</strong> — on a parse failure, the wizard drops back to the
					template step with a destructive Alert naming the file and the specific error, rather
					than a generic "something went wrong."
				</li>
				<li>
					<strong>Live-count tabs</strong> after processing — a follow-up screen groups the result
					into Created / Skipped / Needs review tabs, each with a live count, instead of a single
					summary line, when the import type has non-trivial partial-success handling (see the
					vendors and bill-pay bulk-import consumers).
				</li>
			</ul>
		</div>
	{/snippet}
</PatternLayout>

<style>
	.dialog-frame {
		width: 100%;
		max-width: 720px;
		border: 1px solid var(--border);
		background: var(--bg);
	}
	.dialog-head {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 14px 18px;
		border-bottom: 1px solid var(--border);
	}
	.dialog-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 1px solid var(--border);
		color: var(--fg-muted);
		flex-shrink: 0;
	}
	.dialog-title {
		font-size: 14px;
		font-weight: 500;
	}
	.dialog-sub {
		font-size: 12px;
		color: var(--fg-muted);
	}
	.dialog-body {
		display: flex;
		min-height: 320px;
	}
	.rail {
		width: 180px;
		flex-shrink: 0;
		border-right: 1px solid var(--border);
		background: var(--bg-muted);
		padding: 16px;
	}
	.rail-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 10px;
	}
	.rail-step {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		color: var(--fg-muted);
		padding: 6px 0;
	}
	.rail-step.active {
		color: var(--fg);
		font-weight: 500;
	}
	.rail-step.done {
		color: var(--fg-muted);
	}
	.rail-dot {
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: var(--border);
		flex-shrink: 0;
	}
	.rail-step.active .rail-dot {
		background: var(--m-jade, #2b605c);
	}
	.rail-step.done .rail-dot {
		background: var(--fg-muted);
	}
	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 18px 20px;
	}
	.content h3 {
		margin: 0;
		font-size: 15px;
		font-weight: 500;
	}
	.lede {
		margin: 0;
		font-size: 13px;
		color: var(--fg-muted);
	}
	.file-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		font-size: 13px;
	}
	.file-row span {
		flex: 1;
	}
	.dropzone {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 28px;
		border: 1px dashed var(--border);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
		font-size: 13px;
	}
	.dropzone:hover {
		border-color: var(--m-jade, #2b605c);
	}
	.max {
		font-size: 11px;
		color: var(--fg-muted);
	}
	.uploading,
	.processing {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 13px;
	}
	.loader-track {
		height: 2px;
		background: var(--bg-muted);
		overflow: hidden;
		position: relative;
	}
	.loader-fill {
		position: absolute;
		inset: 0;
		width: 40%;
		background: var(--m-jade, #2b605c);
		animation: slide 1.2s ease-in-out infinite;
	}
	.loader-fill.wide {
		width: 70%;
	}
	@keyframes slide {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(250%);
		}
	}
	:global(.spin) {
		animation: spin 900ms linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	.map-head {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.map-table {
		border: 1px solid var(--border);
	}
	.map-row {
		display: grid;
		grid-template-columns: 1fr 160px;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		border-top: 1px solid var(--border);
	}
	.map-row:first-child {
		border-top: 0;
	}
	.map-head-row {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--fg-muted);
		background: var(--bg-muted);
	}
	.field-name {
		font-size: 12px;
		font-weight: 500;
	}
	.field-hint {
		font-size: 11px;
		color: var(--fg-muted);
	}
	.done {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.rationale {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 720px;
	}
	.rationale h3 {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin: 24px 0 4px;
	}
	.rationale h3:first-child {
		margin-top: 0;
	}
	.rationale p {
		font-size: 14px;
		line-height: 1.65;
		color: var(--fg);
		margin: 0;
	}
	.rationale ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.rationale li {
		padding: 10px 0;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
		border-top: 1px solid var(--border);
	}
	.rationale li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.rationale code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
</style>
