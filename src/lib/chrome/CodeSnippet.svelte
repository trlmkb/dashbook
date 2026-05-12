<script lang="ts" module>
	import { createHighlighter, type Highlighter } from 'shiki';
	import { dashbookLight, dashbookDark } from './shiki-themes';

	let highlighterPromise: Promise<Highlighter> | null = null;

	function getHighlighter(): Promise<Highlighter> {
		if (!highlighterPromise) {
			highlighterPromise = createHighlighter({
				themes: [dashbookLight, dashbookDark],
				langs: ['svelte', 'typescript', 'javascript', 'tsx', 'jsx', 'css', 'html', 'json', 'bash', 'markdown']
			});
		}
		return highlighterPromise;
	}
</script>

<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Copy from '@lucide/svelte/icons/copy';

	type Props = {
		code: string;
		language?: string;
	};

	let { code, language = 'svelte' }: Props = $props();
	let copied = $state(false);
	let highlighted = $state<string>('');
	let timer: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		let cancelled = false;
		(async () => {
			try {
				const h = await getHighlighter();
				const known = h.getLoadedLanguages();
				const lang = (known as string[]).includes(language) ? language : 'plaintext';
				const html = h.codeToHtml(code, {
					lang,
					themes: { light: 'dashbook-light', dark: 'dashbook-dark' },
					defaultColor: false
				});
				if (!cancelled) highlighted = html;
			} catch {
				if (!cancelled) highlighted = '';
			}
		})();
		return () => {
			cancelled = true;
		};
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1200);
		} catch {
			copied = false;
		}
	}
</script>

<div class="snippet">
	<div class="bar">
		<span class="lang">{language}</span>
		<button type="button" class="copy" onclick={copy} aria-label="Copy code">
			{#if copied}
				<Check size={12} strokeWidth={1.5} /> Copied
			{:else}
				<Copy size={12} strokeWidth={1.5} /> Copy
			{/if}
		</button>
	</div>
	{#if highlighted}
		<div class="shiki-host">
			{@html highlighted}
		</div>
	{:else}
		<pre class="fallback"><code>{code}</code></pre>
	{/if}
</div>

<style>
	.snippet {
		border: 1px solid var(--border);
		background: var(--bg-muted);
		overflow: hidden;
	}
	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		border-bottom: 1px solid var(--border);
	}
	.lang {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.copy {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 8px;
		border: 1px solid var(--border);
		background: var(--bg);
		font-family: var(--font-sans);
		font-size: 11px;
		color: var(--fg-muted);
		cursor: pointer;
		transition: color 150ms;
		border-radius: 3px;
	}
	.copy:hover {
		color: var(--fg);
	}
	.fallback {
		margin: 0;
		padding: 16px;
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.6;
		color: var(--fg);
		letter-spacing: -0.02em;
		white-space: pre;
		tab-size: 2;
	}

	/* Shiki output customization. Shiki emits <pre class="shiki shiki-themes ...">
	   with inline styles for color via CSS variables (--shiki-light, --shiki-dark). */
	.shiki-host :global(pre.shiki) {
		margin: 0;
		padding: 18px 20px;
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.7;
		letter-spacing: -0.02em;
		tab-size: 2;
		background-color: transparent !important;
	}
	.shiki-host :global(pre.shiki code) {
		font-family: inherit;
		display: block;
	}
	.shiki-host :global(pre.shiki span) {
		color: var(--shiki-light);
		background-color: var(--shiki-light-bg);
		font-style: var(--shiki-light-font-style);
		font-weight: var(--shiki-light-font-weight);
		text-decoration: var(--shiki-light-text-decoration);
	}
	:global(html.dark) .shiki-host :global(pre.shiki span) {
		color: var(--shiki-dark);
		background-color: var(--shiki-dark-bg);
		font-style: var(--shiki-dark-font-style);
		font-weight: var(--shiki-dark-font-weight);
		text-decoration: var(--shiki-dark-text-decoration);
	}
</style>
