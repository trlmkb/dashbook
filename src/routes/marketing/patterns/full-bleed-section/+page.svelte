<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { fullBleedSection as spec } from '$specs/marketing/patterns/full-bleed-section';
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<section class="fb">
				<div class="fb-copy">
					<span class="fb-eyebrow">Audit</span>
					<h3>Every invoice, audited the moment it lands.</h3>
					<p>The agent checks each charge against your contract — no queue, no project.</p>
				</div>
				<div class="fb-media" aria-hidden="true">
					<div class="fb-shot">
						<span class="fb-row"></span><span class="fb-row"></span><span class="fb-row short"></span>
					</div>
				</div>
			</section>
			<p class="demo-note">Media runs to the right edge; copy stays on the container measure. The bled side alternates row to row.</p>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		overflow: hidden;
		padding-block: 48px;
	}
	.fb {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		align-items: center;
		padding-left: clamp(24px, 6vw, 72px);
	}
	.fb-eyebrow {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--m-accent);
	}
	.fb h3 {
		margin: 12px 0 10px;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(22px, 3vw, 32px);
		letter-spacing: -0.02em;
		color: var(--m-fg-strong);
	}
	.fb p {
		margin: 0;
		color: var(--m-fg-muted);
		max-width: 38ch;
	}
	.fb-media {
		/* bleeds to the right edge of the demo frame */
		margin-right: calc(-1 * clamp(24px, 6vw, 72px));
	}
	.fb-shot {
		background: var(--m-card);
		border: 1px solid var(--m-border);
		border-radius: 16px 0 0 16px;
		border-right: 0;
		padding: 24px;
		display: grid;
		gap: 14px;
		box-shadow: 0 26px 56px -38px rgba(15, 20, 18, 0.42);
	}
	.fb-row {
		height: 14px;
		border-radius: 6px;
		background: var(--m-border-strong, rgba(15, 20, 18, 0.16));
	}
	.fb-row.short {
		width: 60%;
	}
	.demo-note {
		margin: 28px clamp(24px, 6vw, 72px) 0;
		font-size: 12px;
		color: var(--m-fg-subtle);
	}
	@media (max-width: 720px) {
		.fb {
			grid-template-columns: 1fr;
			padding: 0 24px;
		}
		.fb-media {
			margin-right: -24px;
		}
	}
</style>
