import type { ComponentSpec } from '../types.js';

/**
 * ScrollArea — bits-ui ScrollArea with custom scrollbar.
 *
 * 10px rails, --color-border pill thumbs, jade focus-ring. Replaces
 * native browser scrollbar for visual consistency.
 */
export const scrollArea: ComponentSpec = {
	slug: 'scroll-area',
	name: 'Scroll Area',
	category: 'Navigation',
	status: 'beta',
	importPath: "import { ScrollArea, ScrollBar } from '@dashfi/svelte/ui/scroll-area'",
	description:
		'Custom-styled scrollbar. Replaces native browser scrollbar for visual consistency. 10px rails, --color-border pill thumbs.',

	canonicalSource: 'libs/svelte-components/lib/src/lib/ui/scroll-area/',

	dimensions: [
		{
			name: 'Root',
			value: 'caller-bounded',
			tw: 'relative',
			notes: 'Caller sets bounding height/width.'
		},
		{
			name: 'Viewport',
			value: 'fills root, inherits radius, focus-ring',
			tw: 'size-full rounded-[inherit]',
			notes: 'Scrollable content area with focus-visible:ring-4 focus-visible:outline-1.'
		},
		{
			name: 'Scrollbar rail',
			value: '10px wide/tall with 1px inner padding',
			tw: 'w-2.5 h-2.5 p-px'
		},
		{
			name: 'Thumb',
			value: 'pill-shaped',
			tw: 'bg-border relative flex-1 rounded-full'
		}
	],

	tokens: [
		{
			name: 'Thumb',
			token: { cssVar: '--color-border', light: '#ebeae5', dark: '#1e2928' }
		},
		{
			name: 'Focus ring',
			token: { cssVar: '--color-ring', light: '#2b5f5b', dark: '#46b9af' },
			notes: 'Jade in light, lifted jade in dark.'
		}
	],

	composition: [
		'Wrap any overflowing region (sidebar list, long table, code block) for custom scrollbars vs native.',
		'<code>orientation</code> sets vertical / horizontal / both.',
		'<code>type</code> controls scrollbar visibility behaviour (auto / always / scroll / hover).'
	],

	nonFeatures: [
		'No virtualization. For huge lists use a virtual-scroller wrapped by ScrollArea.',
		'No native fallback toggle.',
		'No scroll-to-anchor helpers.',
		'No momentum / inertia tuning.'
	],

	props: [
		{
			name: 'orientation',
			type: "'vertical' | 'horizontal' | 'both'",
			default: "'vertical'",
			description: 'Which scrollbars to render.'
		},
		{
			name: 'type',
			type: "'auto' | 'always' | 'scroll' | 'hover'",
			default: "'hover'",
			description: 'Visibility behavior of the scrollbars.'
		},
		{
			name: 'scrollHideDelay',
			type: 'number',
			default: '600',
			description: 'Milliseconds before the scrollbar auto-hides (only with type="scroll" or "hover").'
		},
		{
			name: 'dir',
			type: "'ltr' | 'rtl'",
			default: "'ltr'",
			description: 'Text direction.'
		},
		{
			name: 'scrollbarXClasses',
			type: 'string',
			description: 'Additional classes applied to the horizontal scrollbar.'
		},
		{
			name: 'scrollbarYClasses',
			type: 'string',
			description: 'Additional classes applied to the vertical scrollbar.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional Tailwind classes merged via clsx + tailwind-merge.'
		},
		{
			name: 'ref',
			type: 'HTMLDivElement | null',
			default: 'null',
			bindable: true,
			description: 'Element ref binding for the root container.'
		}
	],

	porting: [
		'bits-ui ScrollArea with 10px rails, <code>--color-border</code> pill thumbs, jade focus-ring.',
		'Replace bits-ui with your stack\'s scrollbar primitive; preserve the rail width, thumb token, and focus-ring treatment.'
	],

	example: `<script lang="ts">
	import { ScrollArea } from '@dashfi/svelte/ui/scroll-area';
<\/script>

<ScrollArea class="h-72 w-48 border">
	<!-- long content -->
</ScrollArea>`,

	accessibility: [
		'Viewport is focusable (<code>tabindex="0"</code>) so keyboard users can scroll.',
		'Focus-visible jade ring on the viewport when keyboard-focused.',
		'Native screen-reader behaviour preserved — bits-ui doesn\'t intercept content semantics.'
	],

	changelog: [
		{
			version: 'v0.3.2',
			date: '2026-05-13',
			note: 'Anatomy added (regenerated against the EN-XX/design-vnext--sidebar-feature branch). 10px rails, bg-border pill thumbs, --color-ring focus ring.'
		}
	]
};
