<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { sectionCta as spec } from '$specs/marketing/patterns/section-cta';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="filler">…end of a content section…</p>
			<div class="section-cta">
				<p class="prompt">Want the math?</p>
				<button type="button" class="m-btn" data-variant="outline">See how the audit works</button>
			</div>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.filler {
		margin: 0 0 24px;
		font-size: 14px;
		color: var(--m-fg-subtle);
		font-style: italic;
	}
	.section-cta {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		padding-top: 20px;
		border-top: 1px solid var(--m-border);
	}
	.prompt {
		margin: 0;
		font-size: 16px;
		color: var(--m-fg-muted);
	}
	.m-btn {
		display: inline-flex;
		align-items: center;
		padding: 10px 18px;
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 500;
		border-radius: 6px;
		corner-shape: squircle;
		appearance: none;
		cursor: pointer;
		background: transparent;
		border: 1px solid var(--m-border-strong);
		color: var(--m-fg-strong);
		transition: transform 150ms var(--easing-out);
	}
	.m-btn:active {
		transform: scale(0.97);
	}
</style>
