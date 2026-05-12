<script lang="ts">
	import InnerPage from '$chrome/InnerPage.svelte';
	import PageHeader from '$chrome/PageHeader.svelte';
	import Section from '$chrome/Section.svelte';
	import CodeSnippet from '$chrome/CodeSnippet.svelte';

	const conventions = [
		{
			key: 'Symbol',
			value: 'Prefix · always',
			detail: 'The symbol leads the number. We never trail. $1,234.56 — not 1,234.56 $.'
		},
		{
			key: 'Thousands separator',
			value: 'Comma · period · space',
			detail: 'en-US uses comma, de-DE uses period, fr-FR uses space. Locale decides — code never hand-rolls.'
		},
		{
			key: 'Decimal',
			value: 'min 2 · max 2',
			detail: 'Two decimal places. No truncation, no overflow. JPY and other no-decimal currencies are the exception.'
		},
		{
			key: 'Sign',
			value: 'Positive bare · negative U+2212',
			detail: 'Positives carry no plus by default. Negatives render with Unicode minus (−), never hyphen-minus (-).'
		},
		{
			key: 'Zero',
			value: '$0.00',
			detail: 'Always rendered. Never $0, never an em-dash. Empty data uses a separate empty-state, not a fake zero.'
		}
	];

	const locales = [
		{ currency: 'USD', locale: 'en-US', output: '$1,234.56', note: 'Default product locale.' },
		{ currency: 'EUR', locale: 'de-DE', output: '1.234,56 €', note: 'Trailing symbol with non-breaking space.' },
		{ currency: 'GBP', locale: 'en-GB', output: '£1,234.56', note: 'Same shape as USD.' },
		{ currency: 'JPY', locale: 'ja-JP', output: '¥1,235', note: 'No decimals — the rounding is Intl-native.' }
	];

	const helperSnippet = `// Single source for currency rendering across the product.
export function formatCurrency(
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}

formatCurrency(1234.56);                  // "$1,234.56"
formatCurrency(1234.56, 'de-DE', 'EUR');  // "1.234,56 €"
formatCurrency(1234.56, 'en-GB', 'GBP');  // "£1,234.56"
formatCurrency(1234.56, 'ja-JP', 'JPY');  // "¥1,235"`;

	const compactSnippet = `// Compact rendering for dashboards and KPIs.
export function formatCurrencyCompact(
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(amount);
}

formatCurrencyCompact(2408210);  // "$2.4M"
formatCurrencyCompact(982);      // "$982"`;
</script>

<svelte:head><title>Currency — Foundations — Dashbook</title></svelte:head>

<InnerPage section="/foundations" wide>
	<PageHeader
		label="Foundations / Currency"
		title="Currency."
		lede="Currency rendering is opinionated. Symbol position, decimal handling, sign convention — locked in across the product."
	/>

	<Section label="Conventions" note="The same rules apply to every surface that renders money — tables, KPIs, receipts, exports.">
		<table class="conv">
			<thead>
				<tr>
					<th>Rule</th>
					<th>Value</th>
					<th>Detail</th>
				</tr>
			</thead>
			<tbody>
				{#each conventions as c (c.key)}
					<tr>
						<td class="c-key">{c.key}</td>
						<td class="c-val tabular-nums">{c.value}</td>
						<td class="c-detail">{c.detail}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Section>

	<Section
		label="Locale-aware rendering"
		note="Intl.NumberFormat does the heavy lifting. Pass a locale and a currency code; the symbol position, separator, and decimal precision follow."
	>
		<table class="locales">
			<thead>
				<tr>
					<th>Currency</th>
					<th>Locale</th>
					<th>Rendered</th>
					<th>Notes</th>
				</tr>
			</thead>
			<tbody>
				{#each locales as l (l.currency)}
					<tr>
						<td class="l-cur">{l.currency}</td>
						<td class="l-loc tabular-nums">{l.locale}</td>
						<td class="l-out tabular-nums">{l.output}</td>
						<td class="l-note">{l.note}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Section>

	<Section label="Helper" note="The product imports a single formatter. Components never call Intl.NumberFormat directly — they call this.">
		<CodeSnippet language="typescript" code={helperSnippet} />
	</Section>

	<Section label="Compact rendering" note="Use the full helper in tables and ledgers; use compact for hero KPIs and dashboards where space is tight and exactness less useful than scale.">
		<div class="compact-pair">
			<div class="cp-cell">
				<div class="cp-cap">Tables · ledgers</div>
				<div class="cp-value tabular-nums">$2,408,210</div>
				<div class="cp-note">Full precision. Two decimals when fractional.</div>
			</div>
			<div class="cp-cell">
				<div class="cp-cap">Dashboards · KPIs</div>
				<div class="cp-value tabular-nums">$2.4M</div>
				<div class="cp-note">Compact short. One fractional digit max.</div>
			</div>
		</div>
		<div class="snippet-wrap">
			<CodeSnippet language="typescript" code={compactSnippet} />
		</div>
	</Section>

	<Section label="Edge cases">
		<ul class="rules">
			<li><strong>Trailing zeros stay.</strong> $1.00, not $1. Two decimals is the contract for fractional currencies.</li>
			<li><strong>Ranges use an en-dash with non-breaking spaces.</strong> $1,000&nbsp;–&nbsp;$2,000. Both symbols repeat; the dash never wraps.</li>
			<li><strong>No ledger parentheses for negatives.</strong> ($240) is an accounting tradition we don&rsquo;t carry — the Unicode minus (−$240) is clearer for non-accountants and matches our screen-reader output.</li>
			<li><strong>JPY and no-decimal currencies skip the fractional part.</strong> Intl handles this — don&rsquo;t force minimumFractionDigits when the currency disagrees.</li>
			<li><strong>Cross-currency tables.</strong> Convert before rendering. Mixing $1,234.56 and ¥1,235 in the same column breaks the row scan.</li>
		</ul>
	</Section>
</InnerPage>

<style>
	.conv,
	.locales {
		width: 100%;
		border-collapse: collapse;
	}
	.conv th,
	.locales th {
		text-align: left;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
		font-weight: 500;
		padding: 12px 16px 12px 0;
		border-bottom: 1px solid var(--border);
	}
	.conv td,
	.locales td {
		padding: 16px 16px 16px 0;
		border-bottom: 1px solid var(--border);
		vertical-align: top;
		font-size: 14px;
		line-height: 1.55;
	}
	.c-key {
		width: 200px;
		color: var(--fg);
		font-weight: 500;
	}
	.c-val {
		width: 240px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg);
	}
	.c-detail {
		color: var(--fg-muted);
	}

	.l-cur {
		width: 100px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg);
	}
	.l-loc {
		width: 120px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--fg-muted);
	}
	.l-out {
		width: 200px;
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--fg);
	}
	.l-note {
		color: var(--fg-muted);
		font-size: 13px;
	}

	.compact-pair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
	}
	.cp-cell {
		background: var(--bg);
		padding: 28px 28px 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.cp-cap {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--fg-muted);
	}
	.cp-value {
		font-family: var(--font-mono);
		font-size: 32px;
		color: var(--fg);
		letter-spacing: -0.02em;
	}
	.cp-note {
		font-size: 13px;
		line-height: 1.5;
		color: var(--fg-muted);
	}

	.snippet-wrap {
		margin-top: 24px;
	}

	.rules {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.rules li {
		padding: 16px 0;
		border-top: 1px solid var(--border);
		font-size: 14px;
		line-height: 1.6;
		color: var(--fg);
	}
	.rules li:last-child {
		border-bottom: 1px solid var(--border);
	}

	@media (max-width: 720px) {
		.compact-pair {
			grid-template-columns: 1fr;
		}
		.c-key,
		.c-val,
		.l-cur,
		.l-loc,
		.l-out {
			width: auto;
		}
	}
</style>
