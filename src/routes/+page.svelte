<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { audienceTiles } from '$content/nav';
	import { components } from '$content/components';
	import { patterns } from '$content/patterns';
	import { releases, latestRelease } from '$content/releases';
	import LogoMark from '$chrome/LogoMark.svelte';
	import { Button } from '@dashfi/svelte/ui/button';
	import { Pill } from '@dashfi/svelte/ui/pill';
	import { reveal, countUp } from '$lib/utils/motion';

	const stableCount = components.filter((c) => c.status === 'stable').length;
	const totalComponents = components.length;
	const patternCount = patterns.length;
	const foundationCount = 9; // /foundations/{color, typography, spacing, radius, elevation, motion, accessibility, data-viz, currency}
	const brandSubpageCount = 7; // /brand/{logo, color, typography, voice, motion, photography, iconography}

	// Top 3 recent versions for the landing page — sourced from
	// src/lib/content/releases.ts so this list (and the hero version pill)
	// can never drift from the actual latest changelog entry.
	const recent = releases;

	// "brand & design system" rendered as one clipped char-stagger line.
	const headingChars = 'brand & design system'.split('');

	// Brand palette strip — order intentional (hero → marketing → ink → cream → yellow accent)
	const palette: { name: string; hex: string; role: string }[] = [
		{ name: 'Jade', hex: '#2B605C', role: 'Brand · product' },
		{ name: 'Cobalt', hex: '#354CEF', role: 'Brand · marketing' },
		{ name: 'Orange', hex: '#FF4000', role: 'Destructive' },
		{ name: 'Ink', hex: '#25261D', role: 'Default surface · ink' },
		{ name: 'Cream', hex: '#FAF8F1', role: 'Page background' },
		{ name: 'Yellow', hex: '#EBFF00', role: 'Accent · sparing' }
	];
</script>

<svelte:head>
	<title>Dashbook — Dash.fi Brand &amp; Design System</title>
</svelte:head>

<section class="hero">
	<div class="hero-row">
		<div class="hero-text">
			<div class="version-row">
				<span class="ver-pill">{latestRelease.ver}</span>
				<span class="ver-meta">{latestRelease.date} · current</span>
			</div>
			<h1 class="display-mark" aria-label="Dash.fi brand and design system">
				<span class="line char-line" aria-hidden="true">
					{#each headingChars as ch, i (i)}
						<span class="char-mask">
							<span
								class="char"
								class:amp={ch === '&'}
								style:animation-delay={`${i * 30}ms`}>{ch === ' ' ? ' ' : ch}</span
							>
						</span>
					{/each}
				</span>
				<span class="line line-mark">
					<span class="for">for</span>
					<span class="mark-wrap" style:color="var(--dash-jade)">
						<LogoMark variant="wordmark" accent="var(--dash-jade)" />
					</span>
				</span>
			</h1>
			<p class="lede">
				Logos, tokens, components, voice, and partner kits — one source of truth for designers,
				engineers, and the press.
			</p>
		</div>

		<div class="hero-aside" aria-hidden="true">
			<div class="aside-mark">
				<LogoMark variant="app" accent="var(--dash-yellow)" />
			</div>
			<div class="aside-meta">
				<span class="aside-label">App icon</span>
				<span class="aside-hex tabular-nums">#EBFF00 accent</span>
			</div>
		</div>
	</div>
</section>

<section class="numbers db-reveal" aria-label="System scale" use:reveal>
	<a class="num-cell db-press" href="/components">
		<span class="num tabular-nums" use:countUp={{ to: totalComponents }}>{totalComponents}</span>
		<span class="num-label">components</span>
		<span class="num-meta">{stableCount} stable</span>
	</a>
	<a class="num-cell db-press" href="/patterns">
		<span class="num tabular-nums" use:countUp={{ to: patternCount }}>{patternCount}</span>
		<span class="num-label">patterns</span>
		<span class="num-meta">recipes for real screens</span>
	</a>
	<a class="num-cell db-press" href="/foundations">
		<span class="num tabular-nums" use:countUp={{ to: foundationCount }}>{foundationCount}</span>
		<span class="num-label">foundations</span>
		<span class="num-meta">tokens · type · motion</span>
	</a>
	<a class="num-cell db-press" href="/brand">
		<span class="num tabular-nums" use:countUp={{ to: brandSubpageCount }}>{brandSubpageCount}</span
		>
		<span class="num-label">brand surfaces</span>
		<span class="num-meta">voice · motion · logo</span>
	</a>
</section>

<section class="palette db-reveal" aria-label="Brand palette" use:reveal={{ delay: 40 }}>
	<div class="section-header">Palette</div>
	<div class="palette-strip">
		{#each palette as p (p.name)}
			<a class="swatch" href="/foundations/color" style:background={p.hex}>
				<span
					class="swatch-name"
					data-bright={p.name === 'Cream' || p.name === 'Yellow' ? 'true' : 'false'}
				>
					{p.name}
				</span>
				<span
					class="swatch-hex tabular-nums"
					data-bright={p.name === 'Cream' || p.name === 'Yellow' ? 'true' : 'false'}
				>
					{p.hex}
				</span>
				<span
					class="swatch-role"
					data-bright={p.name === 'Cream' || p.name === 'Yellow' ? 'true' : 'false'}
				>
					{p.role}
				</span>
			</a>
		{/each}
	</div>
</section>

<section class="dogfood db-reveal" aria-label="Built with these components" use:reveal={{ delay: 80 }}>
	<div class="section-header">Built with these</div>
	<p class="dogfood-lede">
		Every preview on Dashbook renders the live <code>@dashfi/svelte</code> component. If the lib
		breaks, this page visibly breaks. The portal walks its own talk.
	</p>
	<div class="dogfood-canvas">
		<div class="canvas-row">
			<Button>Default</Button>
			<Button variant="brand">Brand</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
		</div>
		<div class="canvas-row">
			<Pill type="base">Base</Pill>
			<Pill type="info">Info</Pill>
			<Pill type="success">+3% cashback</Pill>
			<Pill type="warning">Review</Pill>
			<Pill type="danger">−$240</Pill>
		</div>
		<a class="dogfood-link" href="/components">
			Browse all {totalComponents} components
			<ArrowUpRight size={14} strokeWidth={1.5} class="link-arrow" />
		</a>
	</div>
</section>

<section class="tiles db-reveal" aria-label="Audience entry points" use:reveal={{ delay: 120 }}>
	{#each audienceTiles as tile (tile.href)}
		<a class="tile db-press" href={tile.href}>
			<div class="tile-head">
				<span class="tile-title">{tile.title}</span>
				<ArrowUpRight size={16} strokeWidth={1.5} class="tile-arrow" />
			</div>
			<p class="tile-desc">{tile.description}</p>
		</a>
	{/each}
</section>

<section class="recent db-reveal" use:reveal={{ delay: 160 }}>
	<div class="section-header">Recent</div>
	<ul class="updates">
		{#each recent as r (r.ver)}
			<li>
				<span class="when">{r.date}</span>
				<a class="what" href={r.href}>
					<span class="r-ver">{r.ver}</span>
					<span class="r-summary">{r.summary}</span>
				</a>
			</li>
		{/each}
	</ul>
	<a class="recent-more" href="/changelog">
		Full changelog
		<ArrowUpRight size={14} strokeWidth={1.5} class="link-arrow" />
	</a>
</section>

<style>
	/* --- Hero ----------------------------------------------------------- */
	.hero {
		padding: 72px 0 64px;
		max-width: 1100px;
		position: relative;
	}
	.hero-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		align-items: end;
	}
	@media (min-width: 880px) {
		.hero-row {
			grid-template-columns: 1.6fr 0.8fr;
		}
	}
	.version-row {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 24px;
	}
	.ver-pill {
		display: inline-block;
		padding: 3px 10px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--brand-fg);
		background: var(--brand);
	}
	.ver-meta {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.05em;
		color: var(--fg-muted);
	}
	.display-mark {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(2.5rem, 6.5vw, 5.25rem);
		line-height: 0.95;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		margin: 0 0 28px;
		color: var(--fg);
	}
	.line {
		display: block;
	}
	.line-mark {
		opacity: 0;
		transform: translateY(0.4em);
		animation: rise 700ms var(--easing-out) 180ms forwards;
	}
	@media (prefers-reduced-motion: reduce) {
		.line-mark {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}
	@keyframes rise {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.char-mask {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
	}
	.char {
		display: inline-block;
		animation: db-char-up 600ms var(--easing-out) both;
	}
	.char.amp {
		color: var(--brand);
		font-weight: 200;
	}
	@media (prefers-reduced-motion: reduce) {
		.char {
			animation: none;
		}
	}
	.line-mark {
		display: flex;
		align-items: center;
		gap: 24px;
		flex-wrap: wrap;
	}
	.for {
		font-weight: 200;
		color: var(--fg-muted);
	}
	.mark-wrap {
		display: inline-block;
		width: clamp(180px, 28vw, 360px);
		line-height: 0;
	}
	.mark-wrap :global(svg) {
		display: block;
		width: 100%;
		height: auto;
	}
	.lede {
		font-size: 17px;
		line-height: 1.55;
		color: var(--fg-muted);
		max-width: 620px;
		margin: 0;
	}

	.hero-aside {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 28px;
		background: var(--bg-muted);
		border: 1px solid var(--border);
		justify-self: end;
		width: min(280px, 100%);
	}
	.aside-mark {
		display: block;
		color: var(--dash-jade);
	}
	.aside-mark :global(svg) {
		width: 100%;
		height: auto;
		display: block;
	}
	.aside-meta {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-top: 16px;
		border-top: 1px solid var(--border);
	}
	.aside-label {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.aside-hex {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
		letter-spacing: -0.02em;
	}

	/* --- Numbers -------------------------------------------------------- */
	.numbers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		margin-bottom: 64px;
	}
	@media (min-width: 720px) {
		.numbers {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.num-cell {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 28px 24px;
		background: var(--bg);
		text-decoration: none;
		color: var(--fg);
		box-shadow: inset 0 0 0 0 transparent;
		transition:
			background-color var(--dur-fast) var(--easing-default),
			box-shadow var(--dur-fast) var(--easing-default);
	}
	.num-cell:hover {
		background: var(--bg-muted);
		box-shadow: var(--shadow-md);
	}
	.num-cell:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: -2px;
	}
	@media (prefers-reduced-motion: reduce) {
		.num-cell {
			transition: none;
		}
	}
	.num {
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(2.5rem, 5vw, 3.75rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--fg);
	}
	.num-label {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg);
		margin-top: 6px;
	}
	.num-meta {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
		letter-spacing: -0.02em;
	}

	/* --- Palette -------------------------------------------------------- */
	.palette {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 64px;
	}
	.palette-strip {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border: 1px solid var(--border);
		overflow: hidden;
	}
	@media (min-width: 720px) {
		.palette-strip {
			grid-template-columns: repeat(6, 1fr);
		}
	}
	.swatch {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 6px;
		min-height: 160px;
		padding: 16px 18px;
		text-decoration: none;
		color: #ffffff;
		box-shadow: inset 0 0 0 1px transparent;
		transition:
			box-shadow var(--dur-fast) var(--easing-out),
			transform var(--dur-fast) var(--easing-out);
	}
	.swatch:hover {
		transform: translateY(-2px);
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
	}
	.swatch:hover .swatch-hex {
		opacity: 1;
	}
	.swatch-hex {
		opacity: 0.85;
		transition: opacity var(--dur-fast) var(--easing-out);
	}
	@media (prefers-reduced-motion: reduce) {
		.swatch,
		.swatch-hex {
			transition: none;
		}
	}
	.swatch-name {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.95);
	}
	.swatch-hex {
		font-family: var(--font-mono);
		font-size: 11px;
		color: rgba(255, 255, 255, 0.85);
		letter-spacing: -0.02em;
	}
	.swatch-role {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.05em;
		color: rgba(255, 255, 255, 0.65);
		text-transform: uppercase;
	}
	.swatch-name[data-bright='true'] {
		color: rgba(18, 59, 57, 0.95);
	}
	.swatch-hex[data-bright='true'] {
		color: rgba(18, 59, 57, 0.85);
	}
	.swatch-role[data-bright='true'] {
		color: rgba(18, 59, 57, 0.65);
	}

	/* --- Dogfood -------------------------------------------------------- */
	.dogfood {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 64px;
	}
	.dogfood-lede {
		font-size: 15px;
		line-height: 1.6;
		color: var(--fg-muted);
		max-width: 720px;
		margin: 0;
	}
	.dogfood-lede code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--bg-muted);
		padding: 1px 6px;
	}
	.dogfood-canvas {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 32px;
		border: 1px solid var(--border);
		background: var(--bg);
	}
	.canvas-row {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		align-items: center;
	}
	.dogfood-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg);
		text-decoration: none;
		margin-top: 8px;
	}
	.dogfood-link:hover {
		color: var(--brand);
	}
	.dogfood-link:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 2px;
	}
	.dogfood-link :global(.link-arrow) {
		transition: transform var(--dur-fast) var(--easing-out);
	}
	.dogfood-link:hover :global(.link-arrow) {
		transform: translate(2px, -2px);
	}
	@media (prefers-reduced-motion: reduce) {
		.dogfood-link :global(.link-arrow) {
			transition: none;
		}
	}

	/* --- Tiles (audience) ---------------------------------------------- */
	.tiles {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		margin-bottom: 64px;
	}
	@media (min-width: 720px) {
		.tiles {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.tile {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 32px;
		background: var(--bg);
		text-decoration: none;
		color: var(--fg);
		box-shadow: inset 0 0 0 0 transparent;
		transition:
			background-color var(--dur-fast) var(--easing-default),
			box-shadow var(--dur-fast) var(--easing-default);
		min-height: 200px;
	}
	.tile:hover {
		background: var(--bg-muted);
		box-shadow: var(--shadow-md);
	}
	.tile:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: -2px;
	}
	.tile-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}
	.tile-title {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.tile :global(svg) {
		color: var(--fg-muted);
		transition: transform var(--dur-fast) var(--easing-out);
	}
	.tile:hover :global(svg) {
		color: var(--brand);
	}
	.tile:hover :global(.tile-arrow) {
		transform: translate(2px, -2px);
	}
	@media (prefers-reduced-motion: reduce) {
		.tile,
		.tile :global(svg) {
			transition: none;
		}
	}
	.tile-desc {
		font-size: 17px;
		line-height: 1.5;
		color: var(--fg);
	}

	/* --- Recent -------------------------------------------------------- */
	.recent {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 1100px;
	}
	.updates {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.updates li {
		display: grid;
		grid-template-columns: 140px 1fr;
		padding: 16px 0;
		border-top: 1px solid var(--border);
		font-size: 14px;
		gap: 24px;
	}
	.updates li:last-child {
		border-bottom: 1px solid var(--border);
	}
	.when {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: -0.01em;
		color: var(--fg-muted);
		padding-top: 4px;
	}
	.what {
		display: flex;
		flex-direction: column;
		gap: 4px;
		color: var(--fg);
		text-decoration: none;
		transition: color var(--dur-fast) var(--easing-default);
	}
	.what:hover {
		color: var(--brand);
	}
	.what:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 2px;
	}
	@media (prefers-reduced-motion: reduce) {
		.what {
			transition: none;
		}
	}
	.r-ver {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--brand);
	}
	.r-summary {
		font-size: 14px;
		line-height: 1.55;
		color: var(--fg);
	}
	.what:hover .r-summary {
		color: var(--fg);
	}
	.recent-more {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--fg-muted);
		text-decoration: none;
		margin-top: 8px;
		transition: color var(--dur-fast) var(--easing-default);
	}
	.recent-more:hover {
		color: var(--brand);
	}
	.recent-more:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 2px;
	}
	.recent-more :global(.link-arrow) {
		transition: transform var(--dur-fast) var(--easing-out);
	}
	.recent-more:hover :global(.link-arrow) {
		transform: translate(2px, -2px);
	}
	@media (prefers-reduced-motion: reduce) {
		.recent-more,
		.recent-more :global(.link-arrow) {
			transition: none;
		}
	}

	@media (max-width: 720px) {
		.hero-aside {
			justify-self: start;
		}
		.updates li {
			grid-template-columns: 1fr;
			gap: 6px;
		}
	}
</style>
