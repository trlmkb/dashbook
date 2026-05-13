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
	{#snippet anatomy()}
		<div>
			<div class="docs-h">Behavior</div>
			<ul class="docs-list">
				<li>Wraps Prism (or equivalent) syntax highlighter. Renders <code>code</code> string with the chosen <code>language</code> + <code>theme</code>.</li>
				<li>Optional <code>showLineNumbers</code> toggles a line gutter.</li>
				<li>Themes: <code>default</code>, <code>dark</code>, <code>funky</code>, <code>okaidia</code>, <code>twilight</code>, <code>coy</code>, <code>solarizedlight</code>, <code>tomorrow</code>.</li>
			</ul>
			<div class="docs-h">Languages</div>
			<ul class="docs-list">
				<li><code>javascript</code> · <code>typescript</code> · <code>svelte</code> · <code>html</code> · <code>css</code> · <code>bash</code> · <code>json</code>.</li>
			</ul>
			<div class="docs-h">Not part of CodeBlock</div>
			<ul class="docs-list">
				<li>No copy button. Compose <code>CopyValue</code> at the call site.</li>
				<li>No file header / filename slot.</li>
			</ul>
			<div class="docs-h">Porting</div>
			<ul class="docs-list">
				<li>Wraps Prism / Shiki. Pick an equivalent highlighter for the target stack.</li>
			</ul>
		</div>
	{/snippet}

	{#snippet changelog()}
		<ul class="docs-cl">
			<li>
				<span class="docs-cl-when">v0.3.2 — 2026-05-13</span>
				<p>
					Anatomy added (regenerated against the
					<code>EN-XX/design-vnext--sidebar-feature</code> branch). Prism-backed
					highlighter with 8 themes, optional line numbers, 7 languages.
				</p>
			</li>
		</ul>
	{/snippet}
</ComponentLayout>
