<script lang="ts">
	import LogoMark from './LogoMark.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	type Props = {
		/** Surface color behind the badge. `null` = transparent (default). */
		bg?: string | null;
		/** Foreground color — main wordmark + caption. */
		fg?: string;
		/** Color for the `.fi` dot accent. Defaults to jade for brand identity. */
		accent?: string;
		/** Size token. Affects wordmark width + paddings. */
		size?: 'sm' | 'md' | 'lg';
		/** When set, the badge renders as an anchor pointing here. */
		href?: string;
		/** Show the up-right arrow icon when href is set. Defaults to true for links. */
		showArrow?: boolean;
	};

	let {
		bg = null,
		fg = '#25261D',
		accent = '#2B605C',
		size = 'md',
		href,
		showArrow
	}: Props = $props();

	const isLink = $derived(!!href);
	const arrow = $derived(showArrow ?? isLink);
	const markWidth = $derived(size === 'sm' ? 52 : size === 'lg' ? 92 : 72);
	const arrowSize = $derived(size === 'sm' ? 10 : size === 'lg' ? 13 : 11);
</script>

{#if isLink}
	<a
		class="badge {size}"
		class:linked={isLink}
		href={href}
		target="_blank"
		rel="noopener"
		style:background={bg ?? 'transparent'}
		style:color={fg}
	>
		<span class="caption">Powered by</span>
		<span class="mark" style:width="{markWidth}px">
			<LogoMark variant="wordmark" {accent} />
		</span>
		{#if arrow}
			<span class="arrow" aria-hidden="true">
				<ArrowUpRight size={arrowSize} strokeWidth={1.75} />
			</span>
		{/if}
	</a>
{:else}
	<span
		class="badge {size}"
		style:background={bg ?? 'transparent'}
		style:color={fg}
	>
		<span class="caption">Powered by</span>
		<span class="mark" style:width="{markWidth}px">
			<LogoMark variant="wordmark" {accent} />
		</span>
	</span>
{/if}

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 8px 14px;
		font-family: var(--font-mono);
		text-decoration: none;
		line-height: 1;
		transition:
			background-color 150ms,
			color 150ms,
			opacity 150ms;
	}
	.badge.sm {
		gap: 8px;
		padding: 6px 10px;
	}
	.badge.lg {
		gap: 14px;
		padding: 10px 18px;
	}
	.caption {
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.6;
		white-space: nowrap;
	}
	.sm .caption {
		font-size: 9px;
		letter-spacing: 0.1em;
	}
	.lg .caption {
		font-size: 11px;
	}
	.mark {
		display: inline-block;
		line-height: 0;
		flex: 0 0 auto;
	}
	.mark :global(svg) {
		display: block;
		width: 100%;
		height: auto;
	}
	.arrow {
		display: inline-flex;
		align-items: center;
		opacity: 0.4;
		transition: opacity 150ms, transform 200ms var(--easing-out);
		margin-left: -4px;
	}

	/* Link-only treatments */
	.linked {
		cursor: pointer;
		border: 1px solid currentColor;
		border-color: color-mix(in srgb, currentColor 18%, transparent);
	}
	.linked:hover {
		border-color: color-mix(in srgb, currentColor 50%, transparent);
	}
	.linked:hover .caption {
		opacity: 0.9;
	}
	.linked:hover .arrow {
		opacity: 1;
		transform: translate(2px, -2px);
	}
	.linked:focus-visible {
		outline: 1px solid currentColor;
		outline-offset: 2px;
	}
</style>
