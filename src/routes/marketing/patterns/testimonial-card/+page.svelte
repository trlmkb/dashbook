<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { testimonialCard as spec } from '$specs/marketing/patterns/testimonial-card';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<figure class="testimonial-card">
				<span class="mark" aria-hidden="true">&ldquo;</span>
				<blockquote>
					Dash.fi found refunds three of our carriers had quietly written off. We had no idea the
					money was even there.
				</blockquote>
				<figcaption>
					<span class="avatar" aria-hidden="true">MR</span>
					<span class="who">
						<b>Maya Rivera</b>
						<span>VP Logistics, Northwind Freight</span>
					</span>
				</figcaption>
			</figure>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.testimonial-card {
		position: relative;
		max-width: 460px;
		margin: 0 auto;
		background: var(--m-card);
		border: 1px solid var(--m-border);
		border-radius: 16px;
		corner-shape: squircle;
		padding: 28px;
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
	}
	.mark {
		position: absolute;
		top: 4px;
		left: 18px;
		font-family: var(--font-display);
		font-size: 72px;
		line-height: 1;
		color: var(--m-accent-soft);
	}
	.testimonial-card blockquote {
		position: relative;
		margin: 0 0 22px;
		font-size: 19px;
		line-height: 1.5;
		color: var(--m-fg-strong);
		max-width: 42ch;
	}
	.testimonial-card figcaption {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		border-radius: 999px;
		background: var(--m-accent-soft);
		border: 1px solid var(--m-accent-border);
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.04em;
		color: var(--m-accent);
	}
	.who {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.who b {
		font-weight: 400;
		color: var(--m-fg-strong);
	}
	.who span {
		font-size: 13px;
		color: var(--m-fg-muted);
	}
</style>
