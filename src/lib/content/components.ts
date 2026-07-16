import type { ComponentStatus } from '../chrome/StatusBadge.svelte';

export type ComponentEntry = {
	slug: string;
	name: string;
	description: string;
	category: ComponentCategory;
	status: ComponentStatus;
	importPath: string;
};

export type ComponentCategory =
	| 'Inputs'
	| 'Display'
	| 'Feedback'
	| 'Navigation'
	| 'Layout'
	| 'Data';

export const components: ComponentEntry[] = [
	// Inputs
	{
		slug: 'button',
		name: 'Button',
		description:
			'The primary action surface. Seven variants, six sizes, with loading state. Renders as button or anchor.',
		category: 'Inputs',
		status: 'stable',
		importPath: "import { Button } from '@dashfi/svelte/ui/button'"
	},
	{
		slug: 'input',
		name: 'Input',
		description: 'Text field. Hairline border, square corners, focus ring in jade. Supports debounce + masks.',
		category: 'Inputs',
		status: 'stable',
		importPath: "import { Input } from '@dashfi/svelte/ui/input'"
	},
	{
		slug: 'textarea',
		name: 'Textarea',
		description: 'Multiline text input. Same border + focus treatment as Input.',
		category: 'Inputs',
		status: 'stable',
		importPath: "import { Textarea } from '@dashfi/svelte/ui/textarea'"
	},
	{
		slug: 'label',
		name: 'Label',
		description: 'Form label. Pairs with any input via for/id.',
		category: 'Inputs',
		status: 'stable',
		importPath: "import { Label } from '@dashfi/svelte/ui/label'"
	},
	{
		slug: 'checkbox',
		name: 'Checkbox',
		description: 'Boolean input with checked / unchecked / indeterminate states.',
		category: 'Inputs',
		status: 'stable',
		importPath: "import { Checkbox } from '@dashfi/svelte/ui/checkbox'"
	},
	{
		slug: 'switch',
		name: 'Switch',
		description: 'Binary on/off control. Larger affordance than a checkbox — for settings, toggles.',
		category: 'Inputs',
		status: 'stable',
		importPath: "import { Switch } from '@dashfi/svelte/ui/switch'"
	},
	{
		slug: 'radio-group',
		name: 'Radio Group',
		description: 'Single-option selection within a group. Keyboard-navigable.',
		category: 'Inputs',
		status: 'stable',
		importPath:
			"import { RadioGroup, RadioGroupItem } from '@dashfi/svelte/ui/radio-group'"
	},
	{
		slug: 'select',
		name: 'Select',
		description: 'Dropdown selection. Built on bits-ui — keyboard navigation, search, async.',
		category: 'Inputs',
		status: 'stable',
		importPath:
			"import { Select, SelectTrigger, SelectContent, SelectItem } from '@dashfi/svelte/ui/select'"
	},
	{
		slug: 'toggle',
		name: 'Toggle',
		description: 'Single press-on/press-off button. Same hit target as Button, different state model.',
		category: 'Inputs',
		status: 'stable',
		importPath: "import { Toggle } from '@dashfi/svelte/ui/toggle'"
	},
	{
		slug: 'toggle-group',
		name: 'Toggle Group',
		description: 'Group of toggles — single or multi-select. Segmented control pattern.',
		category: 'Inputs',
		status: 'stable',
		importPath:
			"import { ToggleGroup, ToggleGroupItem } from '@dashfi/svelte/ui/toggle-group'"
	},
	{
		slug: 'calendar',
		name: 'Calendar',
		description: 'Date picker. Month grid with prev/next navigation, keyboard-navigable.',
		category: 'Inputs',
		status: 'stable',
		importPath: "import { Calendar } from '@dashfi/svelte/ui/calendar'"
	},

	// Display
	{
		slug: 'badge',
		name: 'Badge',
		description: 'Short status or category label. Pill-shaped, monochrome variants.',
		category: 'Display',
		status: 'stable',
		importPath: "import { Badge } from '@dashfi/svelte/ui/badge'"
	},
	{
		slug: 'avatar',
		name: 'Avatar',
		description: 'Circular user or merchant identity. Image with fallback initials.',
		category: 'Display',
		status: 'stable',
		importPath:
			"import { Avatar, AvatarImage, AvatarFallback } from '@dashfi/svelte/ui/avatar'"
	},
	{
		slug: 'pill',
		name: 'Pill',
		description: 'Rounded label or count chip. Multiple semantic types: positive, negative, neutral, etc.',
		category: 'Display',
		status: 'stable',
		importPath: "import { Pill } from '@dashfi/svelte/ui/pill'"
	},
	{
		slug: 'empty',
		name: 'Empty',
		description: 'Empty-state container. Title, description, optional action — for "no data yet" surfaces.',
		category: 'Display',
		status: 'stable',
		importPath:
			"import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@dashfi/svelte/ui/empty'"
	},
	{
		slug: 'separator',
		name: 'Separator',
		description: 'Hairline divider. Horizontal or vertical, decorative or semantic.',
		category: 'Display',
		status: 'stable',
		importPath: "import { Separator } from '@dashfi/svelte/ui/separator'"
	},
	{
		slug: 'skeleton',
		name: 'Skeleton',
		description: 'Placeholder shape for loading states. Matches the eventual content silhouette.',
		category: 'Display',
		status: 'stable',
		importPath: "import { Skeleton } from '@dashfi/svelte/ui/skeleton'"
	},
	{
		slug: 'code-block',
		name: 'Code Block',
		description: 'Display code with a monospace surface and a copy button.',
		category: 'Display',
		status: 'beta',
		importPath: "import { CodeBlock } from '@dashfi/svelte/ui/code-block'"
	},

	// Feedback
	{
		slug: 'alert',
		name: 'Alert',
		description: 'Inline messaging — success, warning, error, info. Always paired with an icon and short copy.',
		category: 'Feedback',
		status: 'stable',
		importPath:
			"import { Alert, AlertTitle, AlertDescription } from '@dashfi/svelte/ui/alert'"
	},
	{
		slug: 'alert-dialog',
		name: 'Alert Dialog',
		description: 'Confirmation modal — interrupts the user for a destructive or irreversible action.',
		category: 'Feedback',
		status: 'stable',
		importPath:
			"import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@dashfi/svelte/ui/alert-dialog'"
	},
	{
		slug: 'dialog',
		name: 'Dialog',
		description: 'Generic modal. Use for forms, confirmations, content panels.',
		category: 'Feedback',
		status: 'beta',
		importPath:
			"import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@dashfi/svelte/ui/dialog'"
	},
	{
		slug: 'sheet',
		name: 'Sheet',
		description: 'Side drawer. Slides in from edge — top, bottom, left, right.',
		category: 'Feedback',
		status: 'stable',
		importPath:
			"import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@dashfi/svelte/ui/sheet'"
	},
	{
		slug: 'popover',
		name: 'Popover',
		description: 'Floating panel anchored to a trigger. For filters, mini-forms, secondary actions.',
		category: 'Feedback',
		status: 'beta',
		importPath:
			"import { Popover, PopoverTrigger, PopoverContent } from '@dashfi/svelte/ui/popover'"
	},
	{
		slug: 'tooltip',
		name: 'Tooltip',
		description: 'Hover-revealed label. Single sentence; never essential information.',
		category: 'Feedback',
		status: 'beta',
		importPath:
			"import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@dashfi/svelte/ui/tooltip'"
	},
	{
		slug: 'progress',
		name: 'Progress',
		description: 'Determinate progress bar. 0–100% with optional label.',
		category: 'Feedback',
		status: 'stable',
		importPath: "import { Progress } from '@dashfi/svelte/ui/progress'"
	},
	{
		slug: 'linear-loader',
		name: 'Linear Loader',
		description: 'Indeterminate horizontal progress. For loading states with no known duration.',
		category: 'Feedback',
		status: 'stable',
		importPath:
			"import { LinearLoader } from '@dashfi/svelte/ui/linear-loader'"
	},
	{
		slug: 'loader',
		name: 'Loader',
		description: 'Indeterminate spinner. Use inside buttons, inline UI.',
		category: 'Feedback',
		status: 'stable',
		importPath: "import { Loader } from '@dashfi/svelte/ui/loader'"
	},
	{
		slug: 'spinner',
		name: 'Spinner',
		description: 'Compact spinning indicator. Smaller than Loader.',
		category: 'Feedback',
		status: 'beta',
		importPath: "import { Spinner } from '@dashfi/svelte/ui/spinner'"
	},

	// Navigation
	{
		slug: 'tabs',
		name: 'Tabs',
		description: 'Switch between panes of content. Underline indicator on the active tab.',
		category: 'Navigation',
		status: 'stable',
		importPath:
			"import { Tabs, TabsList, TabsTrigger, TabsContent } from '@dashfi/svelte/ui/tabs'"
	},
	{
		slug: 'accordion',
		name: 'Accordion',
		description: 'Collapsible sections. Single or multi-open mode.',
		category: 'Navigation',
		status: 'stable',
		importPath:
			"import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@dashfi/svelte/ui/accordion'"
	},
	{
		slug: 'collapsible',
		name: 'Collapsible',
		description: 'Show/hide a single content block. Building block for accordions and disclosure UI.',
		category: 'Navigation',
		status: 'beta',
		importPath:
			"import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@dashfi/svelte/ui/collapsible'"
	},
	{
		slug: 'breadcrumb',
		name: 'Breadcrumb',
		description: 'Hierarchical trail. Home → Section → Subsection → Current.',
		category: 'Navigation',
		status: 'stable',
		importPath:
			"import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@dashfi/svelte/ui/breadcrumb'"
	},
	{
		slug: 'pagination',
		name: 'Pagination',
		description: 'Paged navigation for long lists. First / prev / pages / next / last.',
		category: 'Navigation',
		status: 'beta',
		importPath:
			"import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@dashfi/svelte/ui/pagination'"
	},
	{
		slug: 'pagination-wrapper',
		name: 'Pagination Wrapper',
		description: 'Pagination with a page-size Select and optional total count.',
		category: 'Navigation',
		status: 'beta',
		importPath: "import { PaginationWrapper } from '@dashfi/svelte/ui/pagination-wrapper'"
	},
	{
		slug: 'dropdown-menu',
		name: 'Dropdown Menu',
		description: 'Contextual action menu attached to a trigger button.',
		category: 'Navigation',
		status: 'beta',
		importPath:
			"import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@dashfi/svelte/ui/dropdown-menu'"
	},
	{
		slug: 'scroll-area',
		name: 'Scroll Area',
		description: 'Custom-styled scrollbar. Replaces native browser scrollbar for visual consistency.',
		category: 'Navigation',
		status: 'beta',
		importPath:
			"import { ScrollArea, ScrollBar } from '@dashfi/svelte/ui/scroll-area'"
	},

	// Layout
	{
		slug: 'card',
		name: 'Card',
		description:
			'A bordered surface for grouping related content. Compositional — Card, CardHeader, CardContent, CardFooter.',
		category: 'Layout',
		status: 'stable',
		importPath:
			"import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@dashfi/svelte/ui/card'"
	},

	// Phase 5 additions

	// Inputs (specialized)
	{
		slug: 'multi-select',
		name: 'Multi Select',
		description: 'Select multiple options from a list. Built-in search and chips for selected values.',
		category: 'Inputs',
		status: 'beta',
		importPath: "import { MultiSelect } from '@dashfi/svelte/ui/multi-select'"
	},
	{
		slug: 'phone-input',
		name: 'Phone Input',
		description: 'International phone number input with country picker and validation.',
		category: 'Inputs',
		status: 'beta',
		importPath: "import { PhoneInput } from '@dashfi/svelte/ui/phone-input'"
	},
	{
		slug: 'tel-input',
		name: 'Tel Input',
		description: 'Telephone input — country flag selector, format-as-you-type, validates per locale.',
		category: 'Inputs',
		status: 'beta',
		importPath: "import { TelInput } from '@dashfi/svelte/ui/tel-input'"
	},
	{
		slug: 'date-range-selector',
		name: 'Date Range Selector',
		description: 'Pick a start + end date with presets (last 7d, MTD, QTD, YTD).',
		category: 'Inputs',
		status: 'beta',
		importPath:
			"import { DateRangeSelector } from '@dashfi/svelte/ui/date-range-selector'"
	},
	{
		slug: 'range-calendar',
		name: 'Range Calendar',
		description: 'Two-month calendar grid for selecting a date range. Underlies Date Range Selector.',
		category: 'Inputs',
		status: 'beta',
		importPath:
			"import { RangeCalendar } from '@dashfi/svelte/ui/range-calendar'"
	},
	{
		slug: 'form',
		name: 'Form',
		description: 'Composition primitives for accessible forms — labels, descriptions, errors, validation.',
		category: 'Inputs',
		status: 'beta',
		importPath:
			"import { FormField, FormLabel, FormControl, FormDescription, FormFieldErrors } from '@dashfi/svelte/ui/form'"
	},

	// Display additions
	{
		slug: 'alert-error',
		name: 'Alert Error',
		description: 'Specialized error alert with retry/dismiss affordances. Wraps the destructive Alert variant.',
		category: 'Display',
		status: 'beta',
		importPath: "import { AlertError } from '@dashfi/svelte/ui/alert-error'"
	},
	{
		slug: 'indicator',
		name: 'Indicator',
		description: 'Small status dot. For unread counts, presence, alerts.',
		category: 'Display',
		status: 'beta',
		importPath: "import { Indicator } from '@dashfi/svelte/ui/indicator'"
	},
	{
		slug: 'item',
		name: 'Item',
		description: 'List item primitive — icon, title, description, trailing action. The row in a list.',
		category: 'Display',
		status: 'beta',
		importPath:
			"import { Item, ItemContent, ItemTitle, ItemDescription, ItemMedia, ItemActions } from '@dashfi/svelte/ui/item'"
	},
	{
		slug: 'logo',
		name: 'Logo',
		description: 'Dash.fi wordmark and app icon as Svelte components — Logo, LogoSmall, LogoApp.',
		category: 'Display',
		status: 'stable',
		importPath: "import { Logo, LogoSmall, LogoApp } from '@dashfi/svelte/ui/logo'"
	},
	{
		slug: 'merchant-logo',
		name: 'Merchant Logo',
		description: 'Auto-fetched merchant logo with fallback. Powered by a logo CDN.',
		category: 'Display',
		status: 'beta',
		importPath:
			"import { MerchantLogo } from '@dashfi/svelte/ui/merchant-logo'"
	},
	{
		slug: 'flow-lines',
		name: 'Flow Lines',
		description: 'Animated flowing lines — decorative brand element. Use sparingly on marketing surfaces.',
		category: 'Display',
		status: 'beta',
		importPath: "import { FlowLines } from '@dashfi/svelte/ui/flow-lines'"
	},
	{
		slug: 'magnetic-hover',
		name: 'Magnetic Hover',
		description: 'Decorative hover effect — element shifts subtly toward the cursor. For marketing buttons.',
		category: 'Display',
		status: 'beta',
		importPath:
			"import { MagneticHover } from '@dashfi/svelte/ui/magnetic-hover'"
	},

	// Feedback additions
	{
		slug: 'drawer',
		name: 'Drawer',
		description: 'Mobile-friendly slide-up panel. Pulls from the bottom edge with momentum scroll.',
		category: 'Feedback',
		status: 'beta',
		importPath:
			"import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@dashfi/svelte/ui/drawer'"
	},
	{
		slug: 'fullscreen-dialog',
		name: 'Fullscreen Dialog',
		description: 'Edge-to-edge modal — for long flows like KYC, statement download, partner agreement.',
		category: 'Feedback',
		status: 'beta',
		importPath:
			"import { FullscreenDialog } from '@dashfi/svelte/ui/fullscreen-dialog'"
	},
	{
		slug: 'hover-card',
		name: 'Hover Card',
		description: 'Floating card on hover — richer than a tooltip; for previews, mini-profiles.',
		category: 'Feedback',
		status: 'beta',
		importPath:
			"import { HoverCard, HoverCardTrigger, HoverCardContent } from '@dashfi/svelte/ui/hover-card'"
	},
	{
		slug: 'sonner',
		name: 'Toast (Sonner)',
		description: 'Stacked transient notifications. Wraps svelte-sonner with our theme.',
		category: 'Feedback',
		status: 'beta',
		importPath: "import { Toaster } from '@dashfi/svelte/ui/sonner'"
	},
	{
		slug: 'support-modal',
		name: 'Support Modal',
		description: 'Help & support widget — Dash.fi-specific. Bound to the user session.',
		category: 'Feedback',
		status: 'beta',
		importPath:
			"import { SupportModal } from '@dashfi/svelte/ui/support-modal'"
	},

	// Navigation additions
	{
		slug: 'command',
		name: 'Command',
		description: 'Cmd+K palette. Searchable list of actions. Built on bits-ui.',
		category: 'Navigation',
		status: 'beta',
		importPath:
			"import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandSeparator, CommandEmpty } from '@dashfi/svelte/ui/command'"
	},
	{
		slug: 'navigation',
		name: 'Sub Navigation',
		description: 'In-page section nav with active-state binding. Used inside settings, profile, account.',
		category: 'Navigation',
		status: 'beta',
		importPath:
			"import { SubNavigation } from '@dashfi/svelte/ui/navigation'"
	},

	// Data
	{
		slug: 'table',
		name: 'Table',
		description: 'Basic semantic table — Table, TableHeader, TableBody, TableRow, TableCell, TableHead.',
		category: 'Data',
		status: 'beta',
		importPath:
			"import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@dashfi/svelte/ui/table'"
	},
	{
		slug: 'enhanced-table',
		name: 'Enhanced Table',
		description: 'Feature-rich table — sorting, filtering, pagination, column controls. Built on @tanstack/table-core.',
		category: 'Data',
		status: 'beta',
		importPath:
			"import { EnhancedTable } from '@dashfi/svelte/ui/enhanced-table'"
	},
	{
		slug: 'data-table',
		name: 'Data Table',
		description: 'Headless data-table utilities. Use to compose your own table — sorting, paging, filtering hooks.',
		category: 'Data',
		status: 'beta',
		importPath:
			"import { createSvelteTable } from '@dashfi/svelte/ui/data-table'"
	},
	{
		slug: 'table-filters',
		name: 'Table Filters',
		description: 'Pre-built filter UI — search, date range, multi-select facet. Drops into table toolbars.',
		category: 'Data',
		status: 'beta',
		importPath:
			"import { SearchFilter, DateRangeFilter, FilterButton } from '@dashfi/svelte/ui/table-filters'"
	}
];

export const categoryOrder: ComponentCategory[] = [
	'Inputs',
	'Display',
	'Feedback',
	'Navigation',
	'Layout',
	'Data'
];

export function componentsByCategory(): Map<ComponentCategory, ComponentEntry[]> {
	const map = new Map<ComponentCategory, ComponentEntry[]>();
	for (const cat of categoryOrder) map.set(cat, []);
	for (const c of components) {
		const list = map.get(c.category);
		if (list) list.push(c);
	}
	return map;
}
