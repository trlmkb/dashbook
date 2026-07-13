import { describe, expect, test } from 'vitest';
import { hslTripleToHex, parseTokenSheet, resolveUtility, hexWithinTolerance } from './resolver.js';

describe('hslTripleToHex', () => {
	test('converts unambiguous primaries', () => {
		expect(hslTripleToHex('0 0% 100%')).toBe('#ffffff');
		expect(hslTripleToHex('0 0% 0%')).toBe('#000000');
		expect(hslTripleToHex('0 100% 50%')).toBe('#ff0000');
		expect(hslTripleToHex('120 100% 50%')).toBe('#00ff00');
		expect(hslTripleToHex('240 100% 50%')).toBe('#0000ff');
	});

	test('converts a real brand token to its rendered (HSL-rounded) hex', () => {
		// --primary: 67 13% 13% is the lib's HSL rounding of design-ink #25261d.
		// What actually renders is hsl(67 13% 13%) => #24251d. The engine reports
		// what renders, not the design-intent hex.
		expect(hslTripleToHex('67 13% 13%')).toBe('#24251d');
	});
});

describe('parseTokenSheet', () => {
	const css = `
		@layer base {
			:root {
				--primary: 67 13% 13%;
				--primary-foreground: 0 0% 100%;
				--brand: 175 38% 27%;
				--card-surface-ink: #0f1412;
				--gradient-jade: radial-gradient(120% 80% at 80% 20%, #2b605c 0%, #123b39 100%);
			}
			.dark {
				--primary: 0 0% 100%;
				--primary-foreground: 0 0% 0%;
				--brand: 175 45% 50%;
			}
		}
	`;

	test('maps token name to light + dark raw values', () => {
		const sheet = parseTokenSheet(css);
		expect(sheet.primary).toEqual({ light: '67 13% 13%', dark: '0 0% 100%' });
		// dark-only omission falls back to the light value
		expect(sheet['card-surface-ink']).toEqual({ light: '#0f1412', dark: '#0f1412' });
	});
});

describe('resolveUtility', () => {
	const sheet = parseTokenSheet(`
		:root { --primary: 67 13% 13%; --brand: 175 38% 27%; --primary-foreground: 0 0% 100%; }
		.dark { --primary: 0 0% 100%; --brand: 175 45% 50%; --primary-foreground: 0 0% 0%; }
	`);

	test('resolves a bg utility to a TokenRef with rendered hex per theme', () => {
		expect(resolveUtility('bg-primary', sheet)).toEqual({
			cssVar: '--color-primary',
			light: '#24251d',
			dark: '#ffffff'
		});
	});

	test('resolves a -foreground utility', () => {
		expect(resolveUtility('text-primary-foreground', sheet)).toEqual({
			cssVar: '--color-primary-foreground',
			light: '#ffffff',
			dark: '#000000'
		});
	});

	test('resolves border utility to the same token', () => {
		expect(resolveUtility('border-brand', sheet)?.cssVar).toBe('--color-brand');
	});

	test('returns null for a non-token utility (should stay prose)', () => {
		expect(resolveUtility('bg-transparent', sheet)).toBeNull();
		expect(resolveUtility('shadow-sm', sheet)).toBeNull();
		expect(resolveUtility('bg-amber-500', sheet)).toBeNull();
	});
});

describe('hexWithinTolerance', () => {
	test('treats HSL-rounding drift as equal (design-intent vs rendered)', () => {
		expect(hexWithinTolerance('#25261d', '#24251d')).toBe(true);
	});
	test('flags a genuinely different colour', () => {
		expect(hexWithinTolerance('#354cef', '#2b605c')).toBe(false);
	});
});
