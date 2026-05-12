<script lang="ts">
	import type { ColorToken } from '../tokens.js';
	import CopyValue from './CopyValue.svelte';
	import { theme } from '../stores/theme.svelte.js';

	type Props = {
		token: ColorToken;
	};

	let { token }: Props = $props();

	const fill = $derived(theme.resolved === 'dark' ? token.dark : token.light);
</script>

<div class="swatch">
	<div
		class="fill"
		style="background-color: var({token.cssVar}); border: 1px solid var(--border);"
	></div>
	<div class="meta">
		<div class="row-1">
			<span class="name">{token.name}</span>
			<CopyValue value={fill} label={token.name} />
		</div>
		<div class="cssvar">{token.cssVar}</div>
		<p class="role">{token.role}</p>
	</div>
</div>

<style>
	.swatch {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.fill {
		width: 100%;
		aspect-ratio: 1.6 / 1;
		min-height: 80px;
	}
	.meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.row-1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
	.name {
		font-family: var(--font-mono);
		font-size: 13px;
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--fg);
	}
	.cssvar {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: -0.01em;
		color: var(--fg-muted);
	}
	.role {
		font-size: 12px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin-top: 4px;
	}
</style>
