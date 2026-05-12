<script lang="ts">
	import Sidebar from '$chrome/Sidebar.svelte';
	import Swatch from '$chrome/Swatch.svelte';
	import { productColors, baseColors, marketingColors } from '$lib/tokens.js';
</script>

<svelte:head>
	<title>Color — Foundations — Dashbook</title>
</svelte:head>

<div class="page">
	<Sidebar />
	<div class="content">
		<div class="page-label">Foundations / Color</div>
		<h1>Color.</h1>
		<p class="lede">
			One brand accent — deep jade. Warm-neutral surfaces. No secondary color hierarchy in the
			product palette; accents come from a single brand color. The marketing palette adds cobalt
			and yellow but never appears in product UI.
		</p>

		<section class="block">
			<div class="block-head">
				<div class="section-header">Product palette</div>
				<p class="block-note">
					Live in the dashboard. Light defaults to warm cream; dark is jade-tinted near-black.
					Toggle the theme in the header to compare — every swatch below updates.
				</p>
			</div>
			<div class="grid">
				{#each productColors as token (token.cssVar)}
					<Swatch {token} />
				{/each}
			</div>
		</section>

		<section class="block">
			<div class="block-head">
				<div class="section-header">Base palette</div>
				<p class="block-note">
					Named brand primitives — the single source of every brand hex value. Product semantic
					tokens (above) and marketing aliases (below) both reference these. Update a value here
					and the rest of the system follows.
				</p>
			</div>
			<div class="grid">
				{#each baseColors as token (token.cssVar)}
					<Swatch {token} />
				{/each}
			</div>
		</section>

		<section class="block">
			<div class="block-head">
				<div class="section-header">Marketing aliases</div>
				<p class="block-note">
					Semantic <code>--m-*</code> names for marketing surfaces (auth screens, decks,
					billboards). Each is an alias of a base primitive — never assign a hex directly.
				</p>
			</div>
			<div class="grid">
				{#each marketingColors as token (token.cssVar)}
					<Swatch {token} />
				{/each}
			</div>
		</section>

		<section class="block usage">
			<div class="section-header">Usage rules</div>
			<ul>
				<li>
					<strong>Brand accent is single-use.</strong> Never combine product jade with marketing
					cobalt in the same surface.
				</li>
				<li>
					<strong>Destructive is monochrome.</strong> Black on light, white on dark — never red.
					Restraint is the trust signal.
				</li>
				<li>
					<strong>Yellow is highlight only.</strong> Pulls focus to one element per slide. Never a
					page background, never a button color.
				</li>
				<li>
					<strong>Borders are barely-there.</strong> Always 1px, always
					<code>--border</code>. No 2px strokes, no colored borders.
				</li>
			</ul>
		</section>
	</div>
</div>

<style>
	.page {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 64px;
	}
	.content {
		max-width: 1100px;
	}
	h1 {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(2rem, 5vw, 3.5rem);
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 16px 0 24px;
	}
	.lede {
		font-size: 17px;
		line-height: 1.55;
		color: var(--fg-muted);
		margin-bottom: 48px;
		max-width: 720px;
	}
	.block {
		margin-bottom: 80px;
	}
	.block-head {
		margin-bottom: 32px;
	}
	.block-note {
		margin-top: 12px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg-muted);
		max-width: 640px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 24px;
	}
	.usage ul {
		list-style: none;
		padding: 0;
		margin: 24px 0 0;
		display: flex;
		flex-direction: column;
		gap: 16px;
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
	.usage li {
		padding: 16px 0;
		border-top: 1px solid var(--border);
	}
	.usage li:last-child {
		border-bottom: 1px solid var(--border);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.95em;
		background: var(--bg-muted);
		padding: 1px 6px;
		border-radius: 0;
	}
	@media (max-width: 960px) {
		.page {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
</style>
