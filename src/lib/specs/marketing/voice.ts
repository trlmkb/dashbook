/**
 * Brand voice spec — extracted from `src/routes/brand/voice/+page.svelte`.
 *
 * Used by:
 * - The voice docs page (could render from here; currently renders from inline arrays).
 * - The MCP `marketing_get_brand_voice` tool — returned in full so agents drafting
 *   marketing copy, press releases, or partner announcements have the canonical
 *   principles + examples + rules to anchor their drafts.
 */

import type { BrandVoiceSpec } from './types.js';

export const brandVoice: BrandVoiceSpec = {
	summary:
		'Direct, confident, warm without being chummy. The brand speaks like a founder who ships — not a bank.',

	principles: [
		{
			title: 'Direct',
			body: 'Short declarative sentences. No throat-clearing. The reader is busy — get to the point.'
		},
		{
			title: 'Confident',
			body: "We've shipped, we know the math, we say it. Specifics over hedges. Real numbers over vague claims."
		},
		{
			title: 'Warm without being chummy',
			body: 'Contractions are fine. Names are not. Address the reader as "you," the company as "we." Never the royal "our customers."'
		},
		{
			title: 'No theater',
			body: 'No exclamation marks. No emoji. No marketing spaghetti. The product earns trust by speaking like a person who ships.'
		}
	],

	tonalRange: [
		{
			context: 'Routine action',
			dial: ['Calm', 'Precise', 'Functional'],
			example: '"Card unlocked. Try a transaction to confirm."'
		},
		{
			context: 'Money moved',
			dial: ['Calm', 'Confident', 'Receipt-like'],
			example: '"$1,240.00 sent to Acme Co. Reference 4401-902F-X."'
		},
		{
			context: 'Approval blocked',
			dial: ['Direct', 'Helpful', 'No blame'],
			example: '"Decline — daily limit reached. Limit resets at midnight UTC."'
		},
		{
			context: 'Marketing — celebratory',
			dial: ['Confident', 'A little swaggering', 'Specific'],
			example: '"Brands are switching from Capital One, Chase, and Amex every day."'
		}
	],

	rules: [
		{
			id: 'sentenceCase',
			do: 'Sentence case across the UI. Title case is for proper nouns only.',
			dont: "Don't title-case UI labels, button text, or section headings.",
			exception: 'Brand names, product names, and proper nouns (Visa, Mastercard, FDIC, etc.) remain capitalised.'
		},
		{
			id: 'exclamations',
			do: 'End sentences with a period. Confidence does not need amplification.',
			dont: "Don't use exclamation marks in product UI. They feel performative — the brand doesn't perform.",
			exception: 'Direct quotes from third parties may retain original punctuation.'
		},
		{
			id: 'emoji',
			do: 'Use icons and tokens from the design system when an icon is warranted.',
			dont: "Don't use emoji anywhere. Not in copy, not in cards, not in empty states.",
			exception: 'External channels Dash.fi does not control (e.g. third-party social comments) — but never in first-party surfaces.'
		},
		{
			id: 'numerals',
			do: 'Numerals, not spelled-out numbers. "3 cards", not "three cards". Currency prefixed: "$300M+".',
			dont: 'Don\'t spell out numbers in body copy — "five to seven percent" reads slow and looks dated.',
			exception: 'Sentence-initial numbers may be spelled out only when a numeral would create ambiguity.'
		},
		{
			id: 'contractions',
			do: 'Use contractions. They\'re warmer and read faster ("we\'ll", "you\'re", "let\'s").',
			dont: "Don't formalise into stilted prose — the brand isn't a bank statement."
		},
		{
			id: 'address',
			do: 'Address the reader as "you" and the company as "we".',
			dont: "Don't address users by name in body copy. Reserve names for greetings only. Never use the royal \"our customers.\""
		}
	],

	examples: {
		good: [
			{ context: 'product confirmation', text: 'The audit is already running.' },
			{ context: 'empty state — dashboard', text: 'No spending data available. Start using your card to see spending analytics here.' },
			{ context: 'error state', text: 'Unable to load spending data. Please try refreshing or check back later.' },
			{ context: 'login subhead', text: "New here? We'll get you set up automatically." },
			{ context: 'toast — success', text: 'Spending data refreshed successfully.' },
			{ context: 'marketing — hero', text: 'Built for growth.' },
			{ context: 'marketing — switching', text: 'Brands are switching from Capital One, Chase, and Amex every day.' },
			{ context: 'decline message', text: 'Decline — daily limit reached. Limit resets at midnight UTC.' },
			{ context: 'transaction receipt', text: '$1,240.00 sent to Acme Co. Reference 4401-902F-X.' }
		],
		bad: [
			{
				context: 'announcement',
				text: "We're so excited to announce that the audit has started! 🚀",
				why: 'Exclamation + emoji + "so excited" — three voice violations stacked. The audit running is the news; the rest is theater.'
			},
			{
				context: 'empty state',
				text: "Oops! 😬 We don't have any spending data yet. Check back soon or contact support if you think this is a mistake!",
				why: 'Apologetic, emoji, two exclamation marks, ends in a CYA caveat. State the fact, suggest the next action.'
			},
			{
				context: 'error state',
				text: 'Whoops! Something went wrong. Please retry or reach out to our friendly support team!!',
				why: 'Cheerful in a failure case reads as evasive. "Friendly support team" overpromises. State the failure plainly.'
			},
			{
				context: 'toast — success',
				text: '🎉 Hooray! Your spending data was refreshed!',
				why: 'Confetti emoji and exclamation on a routine success. Receipts, not parties.'
			},
			{
				context: 'marketing — hero',
				text: 'The very best corporate card for the modern, growing, ambitious advertiser of today and tomorrow.',
				why: 'Stacked adjectives and tense-hedging ("today and tomorrow") signal insecurity. One specific claim beats six fuzzy ones.'
			}
		]
	},

	beforeAfter: [
		{
			context: 'Empty state — Dashboard',
			before:
				"Oops! 😬 We don't have any spending data yet. Check back soon or contact support if you think this is a mistake!",
			after:
				'No spending data available. Start using your card to see spending analytics here.'
		},
		{
			context: 'Error state',
			before:
				'Whoops! Something went wrong. Please retry or reach out to our friendly support team!!',
			after: 'Unable to load spending data. Please try refreshing or check back later.'
		},
		{
			context: 'Login subhead',
			before: 'Welcome to Dash.fi! New users — please complete the onboarding wizard below.',
			after: "New here? We'll get you set up automatically."
		},
		{
			context: 'Toast — success',
			before: '🎉 Hooray! Your spending data was refreshed!',
			after: 'Spending data refreshed successfully.'
		},
		{
			context: 'Marketing — hero',
			before:
				'The very best corporate card for the modern, growing, ambitious advertiser of today and tomorrow.',
			after: 'Built for growth.'
		}
	],

	contextualGuidance: [
		{
			surface: 'product UI',
			rules: [
				'Sentence case for every label, button, heading, and form field.',
				'No exclamation marks. No emoji. No marketing copy in product chrome.',
				'Error states name the failure and offer the next action. No apologies, no caveats.',
				'Empty states state the fact and the unlock — "do X to see Y here".',
				'Numerals always. Currency prefixed. Tabular figures for any column of numbers.'
			]
		},
		{
			surface: 'marketing email',
			rules: [
				'Subject lines are sentence-cased. No emoji in the subject or preheader.',
				'Lead with the specific. "$300M+ saved on ad spend last quarter" beats "Save big".',
				'One claim per email. Stacked benefits feel like a checklist; one sharpened claim feels like a story.',
				'Call to action is a verb in sentence case — "Start a 14-day pilot", not "GET STARTED NOW!".',
				'Sign-off is a single name, not "the Dash team" — humans sign emails.'
			]
		},
		{
			surface: 'partner co-branding',
			rules: [
				'Your partner is named first in lockups; "Powered by Dash" is second.',
				'Match optical weight between the two marks. Equal authority signals partnership, not endorsement.',
				'Use the partner\'s preferred brand color alongside jade, never overlaid.',
				'Disclosures default to `marketing_get_legal_disclosure({kind:"partner-bank"})` unless the relationship requires a card-issuer or full-footer variant.',
				'Never imply Dash.fi has vetted, certified, or endorsed the partner beyond the actual business relationship.'
			]
		},
		{
			surface: 'press release',
			rules: [
				'Headline is a single declarative sentence. No "is excited to announce" framing.',
				'Lead paragraph has the news in one sentence; the next has the specific number that makes it real.',
				'Quotes are short, specific, and attributed to a named human with a title.',
				'Include the boilerplate paragraph at the end, drawn from the canonical company description.',
				'Legal: include the partner-bank or full-footer disclosure inline when the news touches banking, cards, or money movement.'
			]
		},
		{
			surface: 'social — short-form',
			rules: [
				'One idea per post. Threads earn the reader\'s second tap; they don\'t demand it.',
				'No emoji as bullets, dividers, or emphasis.',
				'Numbers, customers, and dates are specific or absent — never round or vague.',
				'Reposting customer quotes: ask first, attribute always.'
			]
		}
	]
};
