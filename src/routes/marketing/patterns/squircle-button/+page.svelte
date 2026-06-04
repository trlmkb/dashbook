<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { squircleButton as spec } from '$specs/marketing/patterns/squircle-button';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="row">
				<button type="button" class="m-btn" data-variant="accent">Start a pilot</button>
				<button type="button" class="m-btn" data-variant="ink">Get the deck</button>
				<button type="button" class="m-btn" data-variant="outline">How it works</button>
			</div>
		</div>
		<div class="demo" data-marketing-dark>
			<div class="row">
				<button type="button" class="m-btn" data-variant="accent">Start a pilot</button>
				<button type="button" class="m-btn" data-variant="ink">Get the deck</button>
				<button type="button" class="m-btn" data-variant="outline">How it works</button>
			</div>
			<span class="tag">[data-marketing-dark]</span>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		position: relative;
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.row {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.tag {
		position: absolute;
		top: 10px;
		right: 12px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--m-fg-subtle);
	}
	.m-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 20px;
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 500;
		border-radius: 6px;
		corner-shape: squircle;
		white-space: nowrap;
		cursor: pointer;
		appearance: none;
		border: 0;
		transition: transform 150ms var(--easing-out);
		text-decoration: none;
	}
	.m-btn:active {
		transform: scale(0.97);
	}
	.m-btn[data-variant='accent'] {
		background: var(--m-accent);
		color: #fff;
	}
	.m-btn[data-variant='ink'] {
		background: var(--m-fg-strong);
		color: var(--m-surface);
	}
	.m-btn[data-variant='outline'] {
		background: transparent;
		border: 1px solid var(--m-border-strong);
		color: var(--m-fg-strong);
	}
</style>
