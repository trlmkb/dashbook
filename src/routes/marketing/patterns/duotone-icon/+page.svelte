<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { duotoneIcon as spec } from '$specs/marketing/patterns/duotone-icon';

	// Each icon is one set: hue (a --m-* role), a label, and the two SVG layers
	// (filled silhouette at low opacity + stroked detail), both currentColor.
	const icons = [
		{
			label: 'Box',
			hue: 'var(--m-accent)',
			fill: 'M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z',
			detail: 'M3 7.5 12 12l9-4.5M12 12v9'
		},
		{
			label: 'Doc',
			hue: 'var(--m-positive)',
			fill: 'M6 3h7l5 5v13H6z',
			detail: 'M13 3v5h5M9 13h6M9 17h6'
		},
		{
			label: 'Bolt',
			hue: 'var(--m-cobalt)',
			fill: 'M13 2 4 14h6l-1 8 9-12h-6z',
			detail: 'M13 2 4 14h6l-1 8 9-12h-6z'
		}
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<div class="row">
				{#each icons as icon (icon.label)}
					<span class="cell">
						<svg
							class="duo"
							viewBox="0 0 24 24"
							width="24"
							height="24"
							style="color: {icon.hue}"
							role="img"
							aria-label={icon.label}
						>
							<path d={icon.fill} fill="currentColor" fill-opacity="0.16" />
							<path
								d={icon.detail}
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="cap">{icon.label}</span>
					</span>
				{/each}
			</div>
			<p class="note">
				One svg, two layers — a filled silhouette at low opacity plus a stroked detail, both
				currentColor. The hue is set per item with color on the svg, so each icon carries a
				different role colour while staying themeable.
			</p>
		</div>

		<div class="demo" data-marketing-dark>
			<div class="row">
				{#each icons as icon (icon.label)}
					<span class="cell">
						<svg
							class="duo"
							viewBox="0 0 24 24"
							width="24"
							height="24"
							style="color: {icon.hue}"
							role="img"
							aria-label={icon.label}
						>
							<path d={icon.fill} fill="currentColor" fill-opacity="0.16" />
							<path
								d={icon.detail}
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="cap">{icon.label}</span>
					</span>
				{/each}
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
		gap: 32px;
		flex-wrap: wrap;
		align-items: flex-start;
	}
	.cell {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}
	.duo {
		width: 24px;
		height: 24px;
	}
	.cap {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--m-fg-muted);
	}
	.note {
		margin: 24px 0 0;
		font-size: 13px;
		line-height: 1.55;
		color: var(--m-fg-muted);
		max-width: 60ch;
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
</style>
