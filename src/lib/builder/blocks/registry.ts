/**
 * Builder block registry — the catalogue of blocks the page builder can place.
 *
 * Each entry pairs a prop-driven Svelte component with the inspector schema
 * (`fields`) and the initial `defaults` applied on insert. The `fields` mirror
 * the corresponding marketing spec's `props` (kept in sync by hand for now —
 * see open question 2 in the design doc).
 */

import type { BuilderBlock, BuilderField } from '../types';
import { BAND_OPTIONS } from './band';
import { ICON_KEYS } from './icons';
import HeroBlock from './HeroBlock.svelte';
import SectionIntroBlock from './SectionIntroBlock.svelte';
import StatTrioBlock from './StatTrioBlock.svelte';
import FeatureGridBlock from './FeatureGridBlock.svelte';
import SplitCtaBlock from './SplitCtaBlock.svelte';
import TestimonialBlock from './TestimonialBlock.svelte';
import LogoRailBlock from './LogoRailBlock.svelte';
import ThreeCardRowBlock from './ThreeCardRowBlock.svelte';
import FaqAccordionBlock from './FaqAccordionBlock.svelte';
import DarkCtaBandBlock from './DarkCtaBandBlock.svelte';
import FeatureListBlock from './FeatureListBlock.svelte';
import NumberedCardRowBlock from './NumberedCardRowBlock.svelte';
import StepTimelineBlock from './StepTimelineBlock.svelte';
import FeatureColumnsBlock from './FeatureColumnsBlock.svelte';

const backgroundField: BuilderField = {
	key: 'background',
	label: 'Background band',
	type: 'select',
	options: [...BAND_OPTIONS],
	default: 'surface'
};

export const builderBlocks: BuilderBlock[] = [
	{
		id: 'hero',
		name: 'Hero',
		category: 'Heroes',
		component: HeroBlock,
		fields: [
			backgroundField,
			{ key: 'eyebrow', label: 'Eyebrow', type: 'inline', default: 'Shipping' },
			{ key: 'heading', label: 'Heading', type: 'inline', default: 'Spend less on' },
			{ key: 'accent', label: 'Accent word', type: 'inline', default: 'every parcel' },
			{
				key: 'lede',
				label: 'Lede',
				type: 'textarea',
				default: 'Audit every carrier invoice automatically. Recover what you overpaid.'
			},
			{ key: 'primaryLabel', label: 'Primary CTA', type: 'text', default: 'Start a pilot' },
			{ key: 'secondaryLabel', label: 'Secondary CTA', type: 'text', default: 'How it works' }
		],
		defaults: {
			background: 'surface',
			eyebrow: 'Shipping',
			heading: 'Spend less on',
			accent: 'every parcel',
			lede: 'Audit every carrier invoice automatically. Recover what you overpaid.',
			primaryLabel: 'Start a pilot',
			secondaryLabel: 'How it works'
		}
	},
	{
		id: 'section-intro',
		name: 'Section intro',
		category: 'Content',
		component: SectionIntroBlock,
		fields: [
			backgroundField,
			{ key: 'eyebrow', label: 'Eyebrow', type: 'inline', default: 'Shipping' },
			{ key: 'heading', label: 'Heading', type: 'inline', default: 'Spend less on' },
			{ key: 'accent', label: 'Accent word', type: 'inline', default: 'every parcel' },
			{
				key: 'lede',
				label: 'Lede',
				type: 'textarea',
				default:
					'Audit every carrier invoice automatically. Recover what you overpaid — no spreadsheet, no dispute queue.'
			}
		],
		defaults: {
			background: 'surface',
			eyebrow: 'Shipping',
			heading: 'Spend less on',
			accent: 'every parcel',
			lede: 'Audit every carrier invoice automatically. Recover what you overpaid — no spreadsheet, no dispute queue.'
		}
	},
	{
		id: 'stat-trio',
		name: 'Stat trio',
		category: 'Proof',
		component: StatTrioBlock,
		fields: [
			backgroundField,
			{
				key: 'stats',
				label: 'Stats',
				type: 'repeater',
				itemFields: [
					{ key: 'value', label: 'Value', type: 'text', default: '00%' },
					{ key: 'label', label: 'Label', type: 'text', default: 'Metric' }
				],
				default: [
					{ value: '$300M+', label: 'Overcharges recovered' },
					{ value: '98.4%', label: 'Invoices auto-audited' },
					{ value: '12', label: 'Carriers supported' }
				]
			}
		],
		defaults: {
			background: 'surface',
			stats: [
				{ value: '$300M+', label: 'Overcharges recovered' },
				{ value: '98.4%', label: 'Invoices auto-audited' },
				{ value: '12', label: 'Carriers supported' }
			]
		}
	},
	{
		id: 'feature-grid',
		name: 'Feature grid',
		category: 'Content',
		component: FeatureGridBlock,
		fields: [
			backgroundField,
			{
				key: 'cells',
				label: 'Cells',
				type: 'repeater',
				itemFields: [
					{ key: 'icon', label: 'Icon', type: 'select', options: ICON_KEYS, default: 'shield-check' },
					{ key: 'title', label: 'Title', type: 'text', default: 'Feature' },
					{ key: 'blurb', label: 'Blurb', type: 'textarea', default: 'A short supporting line.' }
				],
				default: [
					{
						icon: 'shield-check',
						title: 'Invoice audit',
						blurb: 'Every carrier charge checked against your contract, line by line.'
					},
					{
						icon: 'scan-line',
						title: 'Duplicate detection',
						blurb: 'Spots the same parcel billed twice before it leaves your account.'
					},
					{
						icon: 'coins',
						title: 'Refund recovery',
						blurb: 'Files the claim and tracks the credit back to your statement.'
					}
				]
			}
		],
		defaults: {
			background: 'surface',
			cells: [
				{
					icon: 'shield-check',
					title: 'Invoice audit',
					blurb: 'Every carrier charge checked against your contract, line by line.'
				},
				{
					icon: 'scan-line',
					title: 'Duplicate detection',
					blurb: 'Spots the same parcel billed twice before it leaves your account.'
				},
				{
					icon: 'coins',
					title: 'Refund recovery',
					blurb: 'Files the claim and tracks the credit back to your statement.'
				}
			]
		}
	},
	{
		id: 'split-cta',
		name: 'Split CTA',
		category: 'CTAs',
		component: SplitCtaBlock,
		fields: [
			backgroundField,
			{ key: 'eyebrow', label: 'Eyebrow', type: 'inline', default: 'Get started' },
			{ key: 'heading', label: 'Heading', type: 'inline', default: 'Stop overpaying on' },
			{ key: 'accent', label: 'Accent word', type: 'inline', default: 'shipping' },
			{
				key: 'lede',
				label: 'Lede',
				type: 'textarea',
				default: 'Connect your carriers in minutes. We audit the rest.'
			},
			{ key: 'primaryLabel', label: 'Primary CTA', type: 'text', default: 'Start a pilot' },
			{ key: 'secondaryLabel', label: 'Secondary CTA', type: 'text', default: 'Talk to us' },
			{
				key: 'chips',
				label: 'Chips',
				type: 'repeater',
				itemFields: [{ key: 'label', label: 'Label', type: 'text', default: 'Chip' }],
				default: [{ label: 'No setup fee' }, { label: '14-day pilot' }]
			}
		],
		defaults: {
			background: 'cream',
			eyebrow: 'Get started',
			heading: 'Stop overpaying on',
			accent: 'shipping',
			lede: 'Connect your carriers in minutes. We audit the rest.',
			primaryLabel: 'Start a pilot',
			secondaryLabel: 'Talk to us',
			chips: [{ label: 'No setup fee' }, { label: '14-day pilot' }]
		}
	},
	{
		id: 'testimonial',
		name: 'Testimonial',
		category: 'Proof',
		component: TestimonialBlock,
		fields: [
			backgroundField,
			{
				key: 'quote',
				label: 'Quote',
				type: 'textarea',
				default: 'Dash.fi found refunds three carriers had quietly written off.'
			},
			{ key: 'name', label: 'Name', type: 'text', default: 'Maya Rivera' },
			{ key: 'role', label: 'Role', type: 'text', default: 'VP Logistics, Northwind' }
		],
		defaults: {
			background: 'surface',
			quote: 'Dash.fi found refunds three carriers had quietly written off.',
			name: 'Maya Rivera',
			role: 'VP Logistics, Northwind'
		}
	},
	{
		id: 'logo-rail',
		name: 'Logo rail',
		category: 'Proof',
		component: LogoRailBlock,
		fields: [
			backgroundField,
			{ key: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'Trusted by' },
			{
				key: 'logos',
				label: 'Logos',
				type: 'repeater',
				itemFields: [
					{ key: 'label', label: 'Label', type: 'text', default: 'Company' },
					{ key: 'src', label: 'Image URL', type: 'image-url', default: '' }
				],
				default: [
					{ label: 'Northwind' },
					{ label: 'Harbor Co.' },
					{ label: 'Meridian' },
					{ label: 'Atlas' },
					{ label: 'Beacon' }
				]
			}
		],
		defaults: {
			background: 'surface',
			eyebrow: 'Trusted by',
			logos: [
				{ label: 'Northwind' },
				{ label: 'Harbor Co.' },
				{ label: 'Meridian' },
				{ label: 'Atlas' },
				{ label: 'Beacon' }
			]
		}
	},
	{
		id: 'three-card-row',
		name: 'Three-card row',
		category: 'Content',
		component: ThreeCardRowBlock,
		fields: [
			backgroundField,
			{ key: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'How it works' },
			{
				key: 'cards',
				label: 'Cards',
				type: 'repeater',
				itemFields: [
					{ key: 'title', label: 'Title', type: 'text', default: 'Step' },
					{ key: 'body', label: 'Body', type: 'textarea', default: 'A short supporting line.' },
					{ key: 'linkLabel', label: 'Link label', type: 'text', default: 'Learn more' }
				],
				default: [
					{ title: 'Audit', body: 'Every carrier invoice is checked against the contract the moment it lands.', linkLabel: 'How it works' },
					{ title: 'Recover', body: 'We file the claims and track each credit back to your account.', linkLabel: 'See recoveries' },
					{ title: 'Report', body: 'One ledger of every dispute, refund, and saving across carriers.', linkLabel: 'View reports' }
				]
			}
		],
		defaults: {
			background: 'surface',
			eyebrow: 'How it works',
			cards: [
				{ title: 'Audit', body: 'Every carrier invoice is checked against the contract the moment it lands.', linkLabel: 'How it works' },
				{ title: 'Recover', body: 'We file the claims and track each credit back to your account.', linkLabel: 'See recoveries' },
				{ title: 'Report', body: 'One ledger of every dispute, refund, and saving across carriers.', linkLabel: 'View reports' }
			]
		}
	},
	{
		id: 'faq-accordion',
		name: 'FAQ',
		category: 'Content',
		component: FaqAccordionBlock,
		fields: [
			backgroundField,
			{
				key: 'items',
				label: 'Questions',
				type: 'repeater',
				itemFields: [
					{ key: 'q', label: 'Question', type: 'text', default: 'A question?' },
					{ key: 'a', label: 'Answer', type: 'textarea', default: 'The answer.' }
				],
				default: [
					{ q: 'Is the parcel audit really free?', a: 'Yes — the audit is free with the card.' },
					{ q: 'How long until the first finding?', a: 'Most accounts see their first flagged overcharge within 48 hours of connecting invoices.' },
					{ q: 'Which carriers are supported?', a: 'UPS and FedEx today, with DHL in beta.' }
				]
			}
		],
		defaults: {
			background: 'surface',
			items: [
				{ q: 'Is the parcel audit really free?', a: 'Yes — the audit is free with the card.' },
				{ q: 'How long until the first finding?', a: 'Most accounts see their first flagged overcharge within 48 hours of connecting invoices.' },
				{ q: 'Which carriers are supported?', a: 'UPS and FedEx today, with DHL in beta.' }
			]
		}
	},
	{
		id: 'feature-list',
		name: 'Feature list',
		category: 'Content',
		component: FeatureListBlock,
		fields: [
			backgroundField,
			{
				key: 'items',
				label: 'Rows',
				type: 'repeater',
				itemFields: [
					{ key: 'title', label: 'Title', type: 'text', default: 'Feature' },
					{ key: 'desc', label: 'Description', type: 'text', default: 'A short supporting line.' }
				],
				default: [
					{ title: 'Duplicate-charge detection', desc: 'Flags the same parcel billed twice.' },
					{ title: 'Late-delivery refunds', desc: 'Claims the credit when a guarantee is missed.' },
					{ title: 'Dimensional-weight checks', desc: 'Catches inflated DIM pricing on every parcel.' },
					{ title: 'Contract-rate enforcement', desc: 'Holds carriers to the price you negotiated.' }
				]
			}
		],
		defaults: {
			background: 'surface',
			items: [
				{ title: 'Duplicate-charge detection', desc: 'Flags the same parcel billed twice.' },
				{ title: 'Late-delivery refunds', desc: 'Claims the credit when a guarantee is missed.' },
				{ title: 'Dimensional-weight checks', desc: 'Catches inflated DIM pricing on every parcel.' },
				{ title: 'Contract-rate enforcement', desc: 'Holds carriers to the price you negotiated.' }
			]
		}
	},
	{
		id: 'numbered-card-row',
		name: 'Numbered cards',
		category: 'Content',
		component: NumberedCardRowBlock,
		fields: [
			backgroundField,
			{ key: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'Three steps' },
			{
				key: 'cards',
				label: 'Cards',
				type: 'repeater',
				itemFields: [
					{ key: 'title', label: 'Title', type: 'text', default: 'Step' },
					{ key: 'body', label: 'Body', type: 'textarea', default: 'A short supporting line.' }
				],
				default: [
					{ title: 'Connect', body: 'Link your carrier accounts in a few minutes — no engineering work.' },
					{ title: 'Audit', body: 'Every invoice is checked against your contract automatically.' },
					{ title: 'Recover', body: 'We file the claims and track each credit back to your account.' }
				]
			}
		],
		defaults: {
			background: 'surface',
			eyebrow: 'Three steps',
			cards: [
				{ title: 'Connect', body: 'Link your carrier accounts in a few minutes — no engineering work.' },
				{ title: 'Audit', body: 'Every invoice is checked against your contract automatically.' },
				{ title: 'Recover', body: 'We file the claims and track each credit back to your account.' }
			]
		}
	},
	{
		id: 'step-timeline',
		name: 'Step timeline',
		category: 'Content',
		component: StepTimelineBlock,
		fields: [
			backgroundField,
			{ key: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'How it works' },
			{
				key: 'steps',
				label: 'Steps',
				type: 'repeater',
				itemFields: [
					{ key: 'title', label: 'Title', type: 'text', default: 'Step' },
					{ key: 'body', label: 'Body', type: 'textarea', default: 'A short supporting line.' }
				],
				default: [
					{ title: 'Connect', body: 'Link your carrier accounts in a few minutes.' },
					{ title: 'Audit', body: 'Every invoice is checked against your contract automatically.' },
					{ title: 'Recover', body: 'We file the claims and track each credit back to your account.' }
				]
			}
		],
		defaults: {
			background: 'surface',
			eyebrow: 'How it works',
			steps: [
				{ title: 'Connect', body: 'Link your carrier accounts in a few minutes.' },
				{ title: 'Audit', body: 'Every invoice is checked against your contract automatically.' },
				{ title: 'Recover', body: 'We file the claims and track each credit back to your account.' }
			]
		}
	},
	{
		id: 'feature-columns',
		name: 'Feature columns',
		category: 'Content',
		component: FeatureColumnsBlock,
		fields: [
			backgroundField,
			{ key: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'How it works' },
			{
				key: 'columns',
				label: 'Columns',
				type: 'repeater',
				itemFields: [
					{ key: 'icon', label: 'Icon', type: 'select', options: ICON_KEYS, default: 'plug' },
					{ key: 'heading', label: 'Heading', type: 'text', default: 'Feature' },
					{ key: 'body', label: 'Body', type: 'textarea', default: 'A short supporting line.' }
				],
				default: [
					{ icon: 'plug', heading: 'Connect', body: 'Link UPS, FedEx, and DHL in a couple of minutes — invoices flow in on their own.' },
					{ icon: 'scan-line', heading: 'Audit', body: 'Every charge is read against your negotiated contract, line by line, automatically.' },
					{ icon: 'coins', heading: 'Recover', body: 'We file each claim and track the credit back to your statement, no spreadsheet.' }
				]
			}
		],
		defaults: {
			background: 'surface',
			eyebrow: 'How it works',
			columns: [
				{ icon: 'plug', heading: 'Connect', body: 'Link UPS, FedEx, and DHL in a couple of minutes — invoices flow in on their own.' },
				{ icon: 'scan-line', heading: 'Audit', body: 'Every charge is read against your negotiated contract, line by line, automatically.' },
				{ icon: 'coins', heading: 'Recover', body: 'We file each claim and track the credit back to your statement, no spreadsheet.' }
			]
		}
	},
	{
		id: 'dark-cta-band',
		name: 'Dark CTA band',
		category: 'CTAs',
		component: DarkCtaBandBlock,
		fields: [
			{ key: 'eyebrow', label: 'Eyebrow', type: 'inline', default: 'Apply now' },
			{ key: 'heading', label: 'Heading', type: 'inline', default: 'Keep more of' },
			{ key: 'accent', label: 'Accent word', type: 'inline', default: 'every dollar' },
			{
				key: 'lede',
				label: 'Lede',
				type: 'textarea',
				default: 'Apply in minutes. No personal guarantee, no platform fee, and up to 3% cash back.'
			},
			{ key: 'primaryLabel', label: 'Primary CTA', type: 'text', default: 'Apply now' },
			{ key: 'secondaryLabel', label: 'Secondary CTA', type: 'text', default: 'Book a demo' }
		],
		defaults: {
			eyebrow: 'Apply now',
			heading: 'Keep more of',
			accent: 'every dollar',
			lede: 'Apply in minutes. No personal guarantee, no platform fee, and up to 3% cash back.',
			primaryLabel: 'Apply now',
			secondaryLabel: 'Book a demo'
		}
	}
];

export function getBlock(id: string): BuilderBlock | undefined {
	return builderBlocks.find((b) => b.id === id);
}

/** Blocks grouped by category, for the picker. */
export function blocksByCategory(): { category: string; blocks: BuilderBlock[] }[] {
	const map = new Map<string, BuilderBlock[]>();
	for (const b of builderBlocks) {
		const arr = map.get(b.category) ?? [];
		arr.push(b);
		map.set(b.category, arr);
	}
	return [...map.entries()].map(([category, blocks]) => ({ category, blocks }));
}
