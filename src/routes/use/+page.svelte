<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	const audiences: {
		slug: string;
		title: string;
		eyebrow: string;
		lede: string;
		topTasks: string[];
	}[] = [
		{
			slug: 'dev',
			title: 'Engineer',
			eyebrow: 'For developers',
			lede: 'Build Dash.fi UI in any stack. Components, tokens, port-to recipes, plus the MCP server for LLM-driven work.',
			topTasks: [
				'Install the plugin',
				'Build a screen end-to-end',
				'Port a component to React / RN / vanilla'
			]
		},
		{
			slug: 'designer',
			title: 'Designer',
			eyebrow: 'For designers',
			lede: 'Tokens, components, patterns, voice. Designed to mirror what engineers ship — design to the same anatomy.',
			topTasks: [
				'Find a token or component',
				'See a pattern at full fidelity',
				'Use the Figma library'
			]
		},
		{
			slug: 'marketer',
			title: 'Marketing & sales',
			eyebrow: 'For marketing / sales',
			lede: 'Brand voice, logos, partner-co-branding, legal disclosures. Plus the Dashbook Connector in claude.ai for drafting copy on-brand.',
			topTasks: [
				'Get the wordmark or app icon',
				'Pull the voice rules for a launch email',
				'Find partner co-branding rules'
			]
		},
		{
			slug: 'maintainer',
			title: 'Maintainer',
			eyebrow: 'For the dashbook owner',
			lede: 'How to release, add components, bump versions, deploy, and handle reporter bugs. Internal runbook.',
			topTasks: [
				'Ship a release',
				'Add a component / pattern',
				'Update PLAN.md'
			]
		}
	];

	const quickLinks: { label: string; href: string; external?: boolean }[] = [
		{ label: 'Dash.fi wordmark SVG', href: '/api/logo/wordmark/jade?format=svg&size=400' },
		{ label: 'All components (JSON)', href: '/api/components.json' },
		{ label: 'Brand voice rules', href: '/brand/voice' },
		{ label: 'Card art configurator', href: '/brand/card' },
		{ label: 'Install the plugin', href: '/developers/install' },
		{ label: 'Changelog', href: '/changelog' }
	];
</script>

<svelte:head><title>Use Dashbook — Dashbook</title></svelte:head>

<InnerPage>
	<PageHeader
		label="Use"
		title="Use Dashbook."
		lede="Pick the runbook for what you do. Each one is a single page — what's here, how to use it, where to go next. Skip the homepage tour and the long anatomy reads."
	/>

	<section class="tiles">
		{#each audiences as a (a.slug)}
			<a class="tile" href="/use/{a.slug}">
				<div class="tile-eyebrow">{a.eyebrow}</div>
				<div class="tile-title">
					<span>{a.title}</span>
					<ArrowUpRight size={16} strokeWidth={1.5} />
				</div>
				<p class="tile-lede">{a.lede}</p>
				<ul class="tile-tasks">
					{#each a.topTasks as t (t)}
						<li>{t}</li>
					{/each}
				</ul>
			</a>
		{/each}
	</section>

	<section class="quick">
		<div class="quick-head">Quick links</div>
		<ul class="quick-list">
			{#each quickLinks as q (q.href)}
				<li><a href={q.href}>{q.label}</a></li>
			{/each}
		</ul>
	</section>
</InnerPage>

<style>
	.tiles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		margin-bottom: 48px;
	}
	.tile {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 24px;
		background: var(--bg);
		text-decoration: none;
		color: inherit;
		transition: background-color 150ms;
	}
	.tile:hover {
		background: var(--bg-muted);
	}
	.tile-eyebrow {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.tile-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 22px;
		font-weight: 400;
		letter-spacing: -0.01em;
		color: var(--fg);
	}
	.tile-lede {
		font-size: 14px;
		line-height: 1.55;
		color: var(--fg-muted);
		margin: 0;
	}
	.tile-tasks {
		list-style: none;
		padding: 0;
		margin: 8px 0 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.tile-tasks li {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-muted);
		padding-left: 12px;
		position: relative;
	}
	.tile-tasks li::before {
		content: '·';
		position: absolute;
		left: 0;
	}

	.quick {
		margin-top: 16px;
	}
	.quick-head {
		font-family: var(--font-mono);
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 12px;
	}
	.quick-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
	.quick-list a {
		font-size: 13px;
		color: var(--m-jade, #2b605c);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
