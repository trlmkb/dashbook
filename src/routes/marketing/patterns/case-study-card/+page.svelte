<script lang="ts">
	import MarketingPatternLayout from '$chrome/MarketingPatternLayout.svelte';
	import { caseStudyCard as spec } from '$specs/marketing/patterns/case-study-card';

	const stats = [
		{ value: '$2.4M', label: 'recovered', primary: true },
		{ value: '18%', label: 'lower blended rate' },
		{ value: '6wk', label: 'to first credit' },
	];
	const strategies = [
		{ label: 'Lead strategy', value: 'DIM reweigh' },
		{ label: 'Then', value: 'Surcharge audit' },
	];
</script>

<MarketingPatternLayout {spec}>
	{#snippet preview()}
		<div class="demo">
			<article class="cs" data-tone="ink">
				<p class="cs-eyebrow">Case study</p>
				<h3 class="cs-title">Northwind cut parcel spend 18%</h3>
				<p class="cs-desc">Audit and renegotiation across two carriers, over one quarter.</p>
				<div class="cs-stats">
					{#each stats as s (s.label)}
						<div class="cs-stat" class:primary={s.primary}>
							<span class="v">{s.value}</span>
							<span class="l">{s.label}</span>
						</div>
					{/each}
				</div>
				<ul class="cs-strats">
					{#each strategies as st (st.label)}
						<li><span class="st-l">{st.label}</span><span class="st-v">{st.value}</span></li>
					{/each}
				</ul>
			</article>
		</div>
	{/snippet}
</MarketingPatternLayout>

<style>
	.demo {
		background: var(--m-surface);
		border: 1px solid var(--m-border);
		padding: 40px;
	}
	.cs {
		max-width: 620px;
		margin: 0 auto;
		background: var(--m-near-black, #25261d);
		color: #faf9f5;
		border-radius: 18px;
		padding: clamp(24px, 4vw, 36px);
	}
	.cs-eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #5ba69d;
	}
	.cs-title {
		margin: 12px 0 10px;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: clamp(24px, 3vw, 34px);
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: #fff;
	}
	.cs-desc {
		margin: 0 0 26px;
		font-size: 15px;
		line-height: 1.55;
		color: rgba(250, 249, 245, 0.75);
		max-width: 46ch;
	}
	.cs-stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		border-top: 1px solid rgba(250, 249, 245, 0.12);
		padding-top: 24px;
	}
	.cs-stat .v {
		display: block;
		font-family: var(--font-display);
		font-weight: 200;
		font-size: 30px;
		color: #fff;
		font-variant-numeric: tabular-nums;
	}
	.cs-stat.primary .v {
		font-size: 46px;
	}
	.cs-stat .l {
		font-size: 13px;
		color: rgba(250, 249, 245, 0.6);
	}
	.cs-strats {
		list-style: none;
		margin: 26px 0 0;
		padding: 24px 0 0;
		border-top: 1px solid rgba(250, 249, 245, 0.12);
		display: grid;
		gap: 10px;
	}
	.cs-strats li {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		font-size: 14px;
	}
	.st-l {
		color: rgba(250, 249, 245, 0.85);
	}
	.st-v {
		font-family: var(--font-mono);
		color: #5ba69d;
	}
	@media (max-width: 560px) {
		.cs-stats {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
