import { describe, expect, test } from 'vitest';
import { expectedTokensFromTv, compareTokenMaps } from './audit.js';
import { parseTokenSheet } from './resolver.js';
import type { TvBlock } from './tv-extractor.js';

const sheet = parseTokenSheet(`
	:root { --primary: 67 13% 13%; --primary-foreground: 0 0% 100%; --brand: 175 38% 27%; }
	.dark { --primary: 0 0% 100%; --primary-foreground: 0 0% 0%; --brand: 175 45% 50%; }
`);

describe('expectedTokensFromTv', () => {
	test('resolves every colour utility across a tv block into a cssVar→hex map', () => {
		const blocks: TvBlock[] = [
			{
				name: 'badgeVariants',
				variants: {
					variant: {
						default: 'bg-primary text-primary-foreground border-primary',
						brand: 'bg-brand text-brand-foreground border-brand'
					}
				},
				defaultVariants: {}
			}
		];
		const exp = expectedTokensFromTv(blocks, sheet);
		expect(exp.get('--color-primary')).toEqual({ light: '#24251d', dark: '#ffffff' });
		expect(exp.get('--color-primary-foreground')).toEqual({ light: '#ffffff', dark: '#000000' });
		expect(exp.has('--color-brand')).toBe(true);
		// non-token utilities never appear
		expect(exp.has('--color-brand-foreground')).toBe(false); // brand-foreground not in sheet
	});
});

describe('compareTokenMaps', () => {
	const expected = new Map([
		['--color-primary', { light: '#24251d', dark: '#ffffff' }],
		['--color-brand', { light: '#2b605c', dark: '#5bb8b0' }],
		['--color-cobalt', { light: '#354cef', dark: '#354cef' }]
	]);

	test('HSL-rounding differences are ok, real changes are drift, unrecorded are missing', () => {
		const recorded = new Map([
			['--color-primary', { light: '#25261d', dark: '#ffffff' }], // rounding → ok
			['--color-brand', { light: '#999999', dark: '#5bb8b0' }] // light changed → drift
			// --color-cobalt absent → missing
		]);
		const findings = compareTokenMaps(expected, recorded);
		const byVar = Object.fromEntries(findings.map((f) => [f.cssVar, f.verdict]));
		expect(byVar['--color-primary']).toBe('ok');
		expect(byVar['--color-brand']).toBe('drift');
		expect(byVar['--color-cobalt']).toBe('missing');
	});

	test('a clean spec reports all ok', () => {
		const findings = compareTokenMaps(
			new Map([['--color-primary', { light: '#25261d', dark: '#ffffff' }]]),
			new Map([['--color-primary', { light: '#25261d', dark: '#ffffff' }]])
		);
		expect(findings.every((f) => f.verdict === 'ok')).toBe(true);
	});
});
