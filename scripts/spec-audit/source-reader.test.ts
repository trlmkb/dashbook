import { describe, expect, test } from 'vitest';
import { parseTokenSheet } from './resolver.js';
import { extractResolvedSourceTokens } from './source-reader.js';

const sheet = parseTokenSheet(`
	:root { --brand: 175 38% 27%; --muted-foreground: 175 8% 47%; }
	.dark { --brand: 175 45% 50%; --muted-foreground: 174 8% 55%; }
`);

describe('extractResolvedSourceTokens', () => {
	test('covers tv configs, cn conditionals, and ordinary class attributes', () => {
		const tokens = extractResolvedSourceTokens(
			[
				{
					path: 'fixture.svelte',
					source: `
						const styles = tv({ base: 'text-muted-foreground' });
						<div class={cn(active && 'hover:bg-brand', 'bg-brand/10')}></div>
					`
				}
			],
			sheet
		);
		expect([...tokens.keys()].sort()).toEqual(['--color-brand', '--color-muted-foreground']);
	});
});
