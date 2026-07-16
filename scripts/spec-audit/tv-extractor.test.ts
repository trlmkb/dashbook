import { describe, expect, test } from 'vitest';
import { extractTvBlocks } from './tv-extractor.js';

describe('extractTvBlocks — from .ts source', () => {
	test('extracts base, variants, and defaultVariants from a tv() config', () => {
		const src = `
			import { tv } from 'tailwind-variants';
			export const badgeVariants = tv({
				base: 'inline-flex rounded-md border',
				variants: {
					variant: {
						default: 'bg-primary text-primary-foreground border-primary',
						brand: 'bg-brand text-brand-foreground border-brand'
					},
					size: { xs: 'h-4 px-1', md: 'h-[18px] px-2' }
				},
				defaultVariants: { variant: 'default', size: 'md' }
			});
		`;
		const blocks = extractTvBlocks(src);
		expect(blocks).toHaveLength(1);
		expect(blocks[0]).toEqual({
			name: 'badgeVariants',
			base: 'inline-flex rounded-md border',
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground border-primary',
					brand: 'bg-brand text-brand-foreground border-brand'
				},
				size: { xs: 'h-4 px-1', md: 'h-[18px] px-2' }
			},
			defaultVariants: { variant: 'default', size: 'md' }
		});
	});
});

describe('extractTvBlocks — from .svelte source', () => {
	test('reads tv() from a <script module> block', () => {
		const src = `
			<script lang="ts" module>
				import { tv } from 'tailwind-variants';
				export const buttonVariants = tv({
					base: 'rounded-md',
					variants: { variant: { brand: 'bg-brand', ghost: 'hover:bg-muted' } },
					defaultVariants: { variant: 'brand' }
				});
			</script>
			<button class={buttonVariants({ variant })}></button>
		`;
		const blocks = extractTvBlocks(src);
		expect(blocks).toHaveLength(1);
		expect(blocks[0]?.name).toBe('buttonVariants');
		expect(blocks[0]?.variants.variant).toEqual({ brand: 'bg-brand', ghost: 'hover:bg-muted' });
	});

	test('finds multiple tv() blocks in one file (e.g. switch track + thumb)', () => {
		const src = `
			<script module>
				export const switchVariants = tv({ base: 'track', variants: { size: { sm: 'h-4' } } });
				export const thumbVariants = tv({ base: 'thumb', variants: { size: { sm: 'size-3' } } });
			</script>
		`;
		const blocks = extractTvBlocks(src);
		expect(blocks.map((b) => b.name).sort()).toEqual(['switchVariants', 'thumbVariants']);
	});

	test('returns [] when there is no tv() call', () => {
		expect(extractTvBlocks(`<script>let x = 1;</script>`)).toEqual([]);
	});
});
