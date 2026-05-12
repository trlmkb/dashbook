/**
 * Partner kit content — Powered-by-Dash badge variants, customer logo lockup
 * examples, and co-branding rules. Surfaces on `/press`.
 *
 * Customer entries are placeholders. Swap in real customers (with written
 * permission) when marketing signs off.
 */

export type BadgeVariant = {
	id: string;
	label: string;
	bg: string;
	fg: string;
	note: string;
};

export const badgeVariants: BadgeVariant[] = [
	{
		id: 'jade-on-cream',
		label: 'Jade on cream',
		bg: '#FAF8F1',
		fg: '#2B605C',
		note: 'Default. Use on light surfaces.'
	},
	{
		id: 'white-on-ink',
		label: 'White on ink',
		bg: '#0F1413',
		fg: '#FFFFFF',
		note: 'For dark surfaces and dark-mode footers.'
	},
	{
		id: 'mono-transparent',
		label: 'Mono · transparent',
		bg: '#FAF8F1',
		fg: '#25261D',
		note: 'When the surrounding palette is already accented and the badge needs to recede.'
	}
];

export type CustomerLockup = {
	name: string;
	industry: string;
	note: string;
};

export const customerLockups: CustomerLockup[] = [
	{
		name: 'Acme Vendor',
		industry: 'Marketplace · 200 employees',
		note: 'Display the Powered-by-Dash badge in the footer of every receipt and statement.'
	},
	{
		name: 'Northwind Studio',
		industry: 'Creative agency · 35 employees',
		note: 'Co-brand in checkout flows where Dash.fi-issued cards are accepted.'
	}
];

export type CoBrandRule = { kind: 'do' | 'dont'; text: string };

export const coBrandRules: CoBrandRule[] = [
	{
		kind: 'do',
		text: 'Display the badge in your site footer, About page, or partner directory — anywhere users would look for "Who powers this?".'
	},
	{
		kind: 'do',
		text: 'Maintain 2 dots of clearspace around the badge. The dot in ".fi" is the unit.'
	},
	{
		kind: 'do',
		text: 'Use the SVG version provided. Always vector. Never re-trace or rasterize beyond the provided PNG fallbacks.'
	},
	{
		kind: 'do',
		text: 'Pair the badge with your own logo in horizontal lockup. Your logo first, "Powered by Dash" second, separated by a hairline divider.'
	},
	{
		kind: 'dont',
		text: 'Don\'t modify the badge — no recoloring outside the three approved variants, no rotation, no drop-shadow, no gradient fill.'
	},
	{
		kind: 'dont',
		text: 'Don\'t use the badge to imply Dash.fi has endorsed, vetted, or partnered with your offering beyond the actual business relationship.'
	},
	{
		kind: 'dont',
		text: 'Don\'t place the badge larger than your own logo. Customers should know who you are first, who powers you second.'
	},
	{
		kind: 'dont',
		text: 'Don\'t embed the badge in modified or derivative marks. Use it as-is or not at all.'
	}
];
