import type { MarketingPatternSpec } from './types.js';

/**
 * StepTimeline — a vertical timeline of numbered steps.
 *
 * A connector line runs through a column of numbered nodes; each step is a
 * node (the number) plus a title and a description. The default is vertical;
 * a horizontal variant lays the same nodes left-to-right.
 */
export const stepTimeline: MarketingPatternSpec = {
	slug: 'step-timeline',
	name: 'StepTimeline',
	category: 'Content blocks',
	status: 'stable',
	description:
		'A vertical timeline of steps — a connector line runs through numbered nodes, each with a title and a description. For onboarding, "how it works", or any ordered process. A horizontal variant lays the nodes left-to-right.',

	source: 'src/components/sections/StepTimeline.astro',
	sourceNote: 'Prop signatures pulled from the brief; verify exact prop names against the website source.',

	whenToUse:
		'Reach for StepTimeline when a process is explicitly sequential and the connection between steps matters — onboarding, an audit-to-recovery flow, a multi-stage rollout. Use NumberedCardRow when the steps are independent enough to read as cards without a connecting line.',

	recipe: [
		'Lay out the steps as a list; give the track a connector line — a 1px `--m-border` rule running through the node column (a left border or an absolutely-positioned line behind the nodes).',
		'Each node is a small circle: `border-radius: 999px`, 1px `--m-accent-border`, `background: var(--m-accent-soft)`, with the step number in `--m-accent`, mono, `font-variant-numeric: tabular-nums`.',
		'Beside each node, stack the title (`--m-fg-strong`) and the description (`--m-fg-muted`, ~60ch).',
		'Keep node centres on the connector line; the line should start at the first node and stop at the last (not overrun the ends).',
		'For the horizontal variant, switch the track to a row, run the connector horizontally between node centres, and place the title + description below each node.',
		'Wrap each step in a reveal target so they fade-rise in sequence down the line.',
	],

	dom: `<ol class="step-timeline">
  <li class="step">
    <span class="node">1</span>
    <div class="body">
      <h3>Connect</h3>
      <p>Link your carrier accounts.</p>
    </div>
  </li>
  <li class="step">…</li>
</ol>`,

	tokensUsed: [
		{ part: 'connector line', role: '--m-border', notes: 'The 1px rule through the node column.' },
		{ part: 'node fill', role: '--m-accent-soft' },
		{ part: 'node border + number', role: '--m-accent-border / --m-accent', notes: 'Border tones with the accent; the number is accent.' },
		{ part: 'title', role: '--m-fg-strong' },
		{ part: 'description', role: '--m-fg-muted' },
	],

	dimensions: [
		{ name: 'Node', value: '~36px circle', notes: 'border-radius: 999px, 1px accent border.' },
		{ name: 'Connector', value: '1px', notes: '--m-border, runs first node → last node.' },
		{ name: 'Number', value: '~14px', notes: 'Mono, tabular-nums, accent.' },
		{ name: 'Step gap', value: '~28px', notes: 'Vertical rhythm between steps.' },
		{ name: 'Description width', value: '~60ch' },
	],

	variants: [
		{ name: 'vertical', description: 'Default — nodes stacked, connector runs top to bottom, copy beside each node.' },
		{ name: 'horizontal', description: 'Nodes in a row, connector runs left to right, copy below each node. Collapses back to vertical on mobile.' },
		{
			name: 'compare',
			description:
				'Two parallel tracks — "the old way" vs "the new way" — sharing one connector spine, each step-pair contrasted side by side. Seen on /rewards and /carrier-contract-management to set up a before/after argument rather than a single sequential process.',
		},
		{
			name: 'pipeline status',
			description:
				'Nodes represent named pipeline states (Draft → Submitted → Acknowledged → Accepted) rather than generic numbered steps — the /ai-spend-audit instance. The current state\'s node is filled/accent, completed states are checked, and future states are muted; no numbers are shown, only state labels.',
		},
	],

	props: [
		{ name: 'steps', type: '{ title: string; description: string }[]', required: true, description: 'One entry per step; the node number is derived from order.' },
		{ name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction; horizontal collapses to vertical on mobile.' },
		{ name: 'start', type: 'number', default: '1', description: 'First node number, if the timeline should not start at 1.' },
	],

	nonFeatures: [
		'No branching — this is a single linear track, not a tree or a flow with forks.',
		'No per-node colour — every node is the one accent tone; status is not encoded by recolouring nodes here.',
		'No icons inside nodes by default — the node carries the step number, not a glyph.',
	],

	gotchas: [
		'Stop the connector line at the first and last node centres — a line that overruns the top of the first node or the bottom of the last reads as broken. Use a pseudo-element inset to the node radius, not a full-height border.',
		'In the horizontal variant, columns that hold the node circle plus copy must use `grid-template-columns: minmax(0, 1fr)` tracks so a long word does not size a track past the viewport.',
	],

	accessibility: [
		'Use an `<ol>` so the order is semantic; the painted numbers and connector are a decorative duplicate of the list sequence.',
		'The connector line and node fill are decorative — the step number and title carry the meaning, never colour or position alone.',
	],

	example: `<ol class="step-timeline">
  <li class="step">
    <span class="node">1</span>
    <div class="body">
      <h3>Connect</h3>
      <p>Link your carrier accounts in a few minutes.</p>
    </div>
  </li>
  <li class="step">
    <span class="node">2</span>
    <div class="body">
      <h3>Audit</h3>
      <p>Every invoice is checked against your contract automatically.</p>
    </div>
  </li>
  <li class="step">
    <span class="node">3</span>
    <div class="body">
      <h3>Recover</h3>
      <p>We file the claims and track each credit back to your account.</p>
    </div>
  </li>
</ol>

<style>
  .step-timeline { list-style: none; margin: 0; padding: 0;
    display: grid; gap: 28px; }
  .step { position: relative; display: grid;
    grid-template-columns: 36px minmax(0, 1fr); gap: 16px; align-items: start; }
  /* connector: behind the nodes, stops short of the first/last node centre */
  .step::before { content: ''; position: absolute; left: 17px; top: 36px;
    bottom: -28px; width: 1px; background: var(--m-border); }
  .step:last-child::before { display: none; }
  .node { width: 36px; height: 36px; display: grid; place-items: center;
    border-radius: 999px; background: var(--m-accent-soft);
    border: 1px solid var(--m-accent-border); color: var(--m-accent);
    font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
  .body h3 { margin: 0 0 6px; color: var(--m-fg-strong); }
  .body p { margin: 0; color: var(--m-fg-muted); line-height: 1.55; max-width: 60ch; }
</style>`,
	exampleLang: 'html',

	porting: [
		'A list of node + copy rows with a 1px connector behind the node column; the only colours are the connector and node tones (border / accent-soft / accent) plus fg-strong / fg-muted for the copy.',
		'Stop the connector at the first and last node centres; the horizontal variant is the same nodes laid in a row with the line running between centres — collapse it to vertical on mobile.',
	],

	changelog: [{ version: 'v0.1.0', date: '2026-06-03', note: 'First documented in Dashbook.' }],
};
