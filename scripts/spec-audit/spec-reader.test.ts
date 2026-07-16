import { describe, expect, test } from 'vitest';
import {
	readSpecDimensionUtilities,
	readSpecTokenRefs,
	rewriteSpecTokenRefs
} from './spec-reader.js';

describe('readSpecTokenRefs', () => {
	test('extracts every {cssVar, light, dark} recorded in a spec file', () => {
		const src = `
			export const badge = {
				variants: [
					{ name: 'default', tokens: [
						{ name: 'bg', token: { cssVar: '--color-primary', light: '#25261d', dark: '#ffffff' } },
						{ name: 'text', token: { cssVar: '--color-primary-foreground', light: '#ffffff', dark: '#000000' } }
					] },
					{ name: 'brand', tokens: [
						{ name: 'bg', token: { cssVar: '--color-brand', light: '#2b605c', dark: '#5bb8b0' } }
					] }
				]
			};
		`;
		const refs = readSpecTokenRefs(src);
		expect(refs.get('--color-primary')).toEqual({ light: '#25261d', dark: '#ffffff' });
		expect(refs.get('--color-brand')).toEqual({ light: '#2b605c', dark: '#5bb8b0' });
		expect(refs.size).toBe(3);
	});

	test('returns empty map when there are no token refs', () => {
		expect(readSpecTokenRefs(`export const x = { dimensions: [] };`).size).toBe(0);
	});
});

describe('readSpecDimensionUtilities', () => {
	test('reads only structured tw fields', () => {
		const source = `dimensions: [
			{ name: 'Root', value: '40px', tw: 'h-10 px-4' },
			{ name: 'Note', value: 'prose mentions h-12' }
		]`;
		expect([...readSpecDimensionUtilities(source)]).toEqual(['h-10', 'px-4']);
	});
});

describe('rewriteSpecTokenRefs', () => {
	test('rewrites only resolved values and preserves prose byte-for-byte', () => {
		const source = `const spec = {
			description: 'Keep this exact prose.',
			token: { cssVar: '--color-brand', light: '#old-light', dark: '#old-dark' },
			notes: 'Ordering and comments stay put.'
		};`;
		const result = rewriteSpecTokenRefs(source, (cssVar) =>
			cssVar === '--color-brand' ? { light: '#2b5f5b', dark: '#46b9af' } : undefined
		);
		expect(result.rewrites).toHaveLength(1);
		expect(result.source).toContain("description: 'Keep this exact prose.'");
		expect(result.source).toContain("notes: 'Ordering and comments stay put.'");
		expect(result.source).toContain("cssVar: '--color-brand', light: '#2b5f5b', dark: '#46b9af'");
	});
});
