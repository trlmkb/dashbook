<script lang="ts">
	import { footerLinks } from '../content/nav.js';
	import Wordmark from './Wordmark.svelte';
</script>

<footer class="footer">
	<div class="row">
		<div class="meta">
			<Wordmark size="sm" />
			<span class="badge">v0.9.0 · current</span>
			<p class="caption">
				<span class="font-mono font-semibold">dashbook</span> is the public brand
				<br /> &amp; design system portal for Dash.fi
			</p>
		</div>

		<div class="cols">
			{#each footerLinks as col (col.title)}
				<div class="col">
					<div class="col-header">{col.title}</div>
					<ul>
						{#each col.items as item (item.href)}
							<li>
								<a href={item.href}>{item.title}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>

	<div class="legal">
		<span>© {new Date().getFullYear()} Dash.fi</span>
		<span class="sep">·</span>
		<span>Trademarks of their respective owners.</span>
	</div>
</footer>

<style>
	.footer {
		max-width: 1800px;
		margin: 0 auto;
		padding: 64px 32px 48px;
		border-top: 1px solid var(--border);
		margin-top: 96px;
	}
	.row {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 48px;
	}
	.meta {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 320px;
	}
	.badge {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: -0.01em;
		color: var(--fg-muted);
		padding: 2px 8px;
		border: 1px solid var(--border);
		align-self: flex-start;
	}
	.caption {
		text-wrap: balance;
		font-size: 13px;
		line-height: 1.6;
		color: var(--fg-muted);
	}
	.cols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 32px;
	}
	.col-header {
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		margin-bottom: 12px;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	a {
		font-size: 13px;
		color: var(--fg);
		text-decoration: none;
		transition: color 150ms;
	}
	a:hover {
		color: var(--brand);
	}
	.legal {
		margin-top: 48px;
		padding-top: 24px;
		border-top: 1px solid var(--border);
		font-size: 12px;
		color: var(--fg-muted);
	}
	.sep {
		margin: 0 8px;
	}
	@media (max-width: 720px) {
		.row {
			grid-template-columns: 1fr;
		}
	}
</style>
