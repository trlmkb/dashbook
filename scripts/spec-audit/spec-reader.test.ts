import { describe, expect, test } from 'vitest';
import { readSpecTokenRefs } from './spec-reader.js';

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
