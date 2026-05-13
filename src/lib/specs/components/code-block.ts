import type { ComponentSpec } from '../types.js';

/**
 * CodeBlock — Prism-backed syntax highlighter.
 *
 * Display code with a monospace surface. No copy button or filename header —
 * compose those at the call site.
 */
export const codeBlock: ComponentSpec = {
	slug: 'code-block',
	name: 'Code Block',
	category: 'Display',
	status: 'beta',
	importPath: "import { CodeBlock } from '@dashfi/svelte/ui/code-block'",
	description:
		'Display code with a monospace surface. Prism-backed — 7 languages, 8 themes, optional line numbers.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/code-block/code-block.svelte',

	dimensions: [
		{
			name: 'Container',
			value: 'Prism-rendered <pre><code> surface',
			notes: 'Monospace; padding and theme styling come from the Prism stylesheet loaded on mount.'
		},
		{
			name: 'Line gutter (optional)',
			value: 'visible when showLineNumbers is true',
			notes: 'Loads the prism line-numbers plugin lazily.'
		}
	],

	tokens: [
		{
			name: 'Surface',
			notes: 'Driven by the chosen Prism theme stylesheet. Not bound to product color tokens.'
		},
		{
			name: 'Type',
			notes: 'Monospace; inherits Prism theme token colors.'
		}
	],

	variants: [
		{ name: 'default', description: 'Light Prism theme.' },
		{ name: 'dark', description: 'Dark Prism theme.' },
		{ name: 'funky', description: 'Funky Prism theme.' },
		{ name: 'okaidia', description: 'Okaidia Prism theme.' },
		{ name: 'twilight', description: 'Twilight Prism theme.' },
		{ name: 'coy', description: 'Coy Prism theme.' },
		{ name: 'solarizedlight', description: 'Solarized light Prism theme.' },
		{ name: 'tomorrow', description: 'Tomorrow Prism theme.' }
	],

	composition: [
		'Pass <code>code</code> as a string and <code>language</code> as one of the 7 supported grammars.',
		'For a copyable surface, wrap with <code>CopyValue</code> at the call site.',
		'Supported languages: <code>javascript</code>, <code>typescript</code>, <code>svelte</code>, <code>html</code>, <code>css</code>, <code>bash</code>, <code>json</code>.'
	],

	nonFeatures: [
		'No copy button. Compose <code>CopyValue</code> at the call site.',
		'No file header / filename slot.',
		'No language picker or theme toggle inside the component.',
		'No diff highlighting.'
	],

	props: [
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
	],

	porting: [
		'Wraps Prism. Pick an equivalent highlighter for the target stack (Shiki, highlight.js, native CodeMirror).',
		'Theme is loaded lazily as a stylesheet — same pattern works wherever the highlighter exposes CSS themes.'
	],

	example: `<script lang="ts">
	import { CodeBlock } from '@dashfi/svelte/ui/code-block';
<\/script>

<CodeBlock code="const total = items.reduce((s, x) => s + x.amount, 0);" language="typescript" />`,

	accessibility: [
		'Renders as <code>&lt;pre&gt;&lt;code&gt;</code> — screen readers announce as preformatted code.',
		'Use <code>aria-label</code> on a wrapping container if context is needed.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). Prism-backed highlighter with 8 themes, optional line numbers, 7 languages.'
		}
	]
};
