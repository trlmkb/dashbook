<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { logoRail as spec } from '$specs/marketing/patterns/logo-rail';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<p class="eyebrow">Trusted by</p>
			<ul class="rail">
				<li class="logo">Northwind</li>
				<li class="logo">Harbor Co.</li>
				<li class="logo">Meridian</li>
				<li class="logo">Atlas</li>
				<li class="logo">Beacon</li>
			</ul>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
		text-align: center;
	}
	.eyebrow {
		margin: 0 0 28px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--m-fg-subtle);
	}
	.rail {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 40px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	/* Production renders <img> logos; the preview uses muted text placeholders. */
	.logo {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 18px;
		letter-spacing: 0.02em;
		color: var(--m-fg-subtle);
		opacity: 0.7;
	}
	@media (max-width: 720px) {
		.rail {
			justify-content: center;
			gap: 28px;
		}
	}
</style>
