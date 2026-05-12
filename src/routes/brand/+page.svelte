<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import { primaryNav } from '$content/nav.js';

	const brand = primaryNav.find((n) => n.href === '/brand');
	const subpages = brand?.children ?? [];

	const summaries: Record<string, string> = {
		'/brand/logo': 'The wordmark, the app icon, the lockups. With downloads.',
		'/brand/color': 'Deep jade as the single accent. Warm cream surfaces. The story behind the palette.',
		'/brand/typography': 'PP Supply Mono Ultralight for display. Bai Jamjuree for body. Tabular numerics, always.',
		'/brand/voice':
			'Direct, confident, warm. Sentence case. No exclamation marks. No emoji. Examples by context.',
		'/brand/motion':
			'Per-character clipped slide-up. Count-up numerics. Snappy press. The brand is precise — never bouncy.',
		'/brand/photography': 'Cool monochrome, no stock photos, no warm color photography. Imagery is restraint.',
		'/brand/iconography': 'Lucide, exclusively. Stroke 1.5. Inherits currentColor. No emoji, no PNG icons.'
	};
</script>

<svelte:head><title>Brand — Dashbook</title></svelte:head>

<InnerPage>
	<PageHeader
		label="Brand"
		title="The brand."
		lede="Logo, color, type, voice, motion, photography, iconography. The expressive layer — everything that makes Dash.fi look and sound like Dash.fi."
	/>

	<div class="quote">
		<p>
			"Dash.fi is built for growth. Faster than light, more flexible than metal, and seriously
			rewarding."
		</p>
	</div>

	<ul class="index">
		{#each subpages as item (item.href)}
			<li>
				<a href={item.href}>
					<div class="left">
						<span class="title">{item.title}</span>
						<p class="desc">{summaries[item.href] ?? item.description ?? ''}</p>
					</div>
					<ArrowUpRight size={16} strokeWidth={1.5} />
				</a>
			</li>
		{/each}
	</ul>
</InnerPage>

<style>
	.quote {
		padding: 32px 0;
		margin-bottom: 48px;
	}
	.quote p {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.2;
		letter-spacing: -0.02em;
		color: var(--fg);
		text-transform: uppercase;
		max-width: 760px;
	}
	.index {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.index li {
		border-top: 1px solid var(--border);
	}
	.index li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.index a {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 24px;
		padding: 24px 0;
		text-decoration: none;
		color: var(--fg);
		transition: color 150ms;
	}
	.index a:hover {
		color: var(--brand);
	}
	.title {
		font-size: 17px;
		font-weight: 500;
	}
	.desc {
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
		margin-top: 4px;
	}
</style>
