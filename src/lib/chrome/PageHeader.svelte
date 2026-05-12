<script lang="ts">
	type Props = {
		label: string;
		title: string;
		lede?: string;
	};

	let { label, title, lede }: Props = $props();
</script>

<header class="page-header">
	<div class="page-label">{label}</div>
	<h1>{title}</h1>
	{#if lede}<p class="lede">{lede}</p>{/if}
</header>

<style>
	.page-header {
		margin: 16px 0 56px;
	}
	h1 {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(2.25rem, 5vw, 3.5rem);
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 16px 0 24px;
	}
	.lede {
		font-size: 17px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 640px;
	}
</style>
