<script lang="ts">
	import ComponentLayout from '$chrome/ComponentLayout.svelte';
	import PreviewCanvas from '$chrome/PreviewCanvas.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';
	import PropsTable, { type PropDef } from '$chrome/PropsTable.svelte';
	import { CodeBlock } from '@dashfi/svelte/ui/code-block';

	const propsTable: PropDef[] = [
		{
			name: 'code',
			type: 'string',
			required: true,
			description: 'Source code to render. Leading and trailing whitespace is trimmed.'
		},
		{
			name: 'language',
			type: "'javascript' | 'typescript' | 'svelte' | 'html' | 'css' | 'bash' | 'json'",
			default: "'javascript'",
			description: 'Prism grammar to apply for syntax highlighting.'
		},
		{
			name: 'theme',
			type: "'default' | 'dark' | 'funky' | 'okaidia' | 'twilight' | 'coy' | 'solarizedlight' | 'tomorrow'",
			default: "'default'",
			description: 'Prism theme stylesheet to load on mount.'
		},
		{
			name: 'showLineNumbers',
			type: 'boolean',
			default: 'false',
			description: 'Show gutter line numbers. Loads the prism line-numbers plugin lazily.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge on the container.'
		}
	];

	const example = `<script lang="ts">
	import { CodeBlock } from '@dashfi/svelte/ui/code-block';
<\/script>

<CodeBlock>const total = items.reduce((s, x) => s + x.amount, 0);</CodeBlock>`;
</script>

<svelte:head><title>Code Block — Components — Dashbook</title></svelte:head>

<ComponentLayout
	name="Code Block"
	description="Display code with a monospace surface and a copy button."
	importPath="@dashfi/svelte/ui/code-block"
	status="beta"
>
	{#snippet preview()}
		<PreviewCanvas minHeight="160px">
			{#snippet children(_m)}
				<div style:width="320px">
					<CodeBlock
						code={`const total = items.reduce(\n  (s, x) => s + x.amount, 0\n);`}
						language="typescript"
					/>
				</div>
			{/snippet}
		</PreviewCanvas>
	{/snippet}
	{#snippet code()}<CodeSnippet code={example} language="svelte" />{/snippet}
	{#snippet docs()}
		<PropsTable props={propsTable} />
	{/snippet}
</ComponentLayout>
