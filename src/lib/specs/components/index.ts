/**
 * Component spec registry — single source of truth for all 61 components.
 *
 * Imported by:
 * - Docs pages (`src/routes/components/<slug>/+page.svelte`) — render anatomy
 *   from the spec instead of duplicating values inline.
 * - MCP server (`src/lib/mcp/...`) — exposes specs via product_list_components
 *   and product_get_component tools.
 *
 * To add a new component:
 * 1. Create `src/lib/specs/components/<slug>.ts` exporting a `ComponentSpec`.
 * 2. Import + register here (alphabetically).
 * 3. Add an entry to `src/lib/content/components.ts` for sidebar / search.
 */

import type { ComponentSpec } from '../types.js';

import { accordion } from './accordion.js';
import { alert } from './alert.js';
import { alertDialog } from './alert-dialog.js';
import { alertError } from './alert-error.js';
import { avatar } from './avatar.js';
import { badge } from './badge.js';
import { breadcrumb } from './breadcrumb.js';
import { button } from './button.js';
import { calendar } from './calendar.js';
import { card } from './card.js';
import { checkbox } from './checkbox.js';
import { authFooter, pageShell, partnerCobrand, wordmark } from './chrome.js';
import { codeBlock } from './code-block.js';
import { collapsible } from './collapsible.js';
import { command } from './command.js';
import { dataTable } from './data-table.js';
import { dateRangeSelector } from './date-range-selector.js';
import { dialog } from './dialog.js';
import { drawer } from './drawer.js';
import { dropdownMenu } from './dropdown-menu.js';
import { empty } from './empty.js';
import { enhancedTable } from './enhanced-table.js';
import { flowLines } from './flow-lines.js';
import { form } from './form.js';
import { fullscreenDialog } from './fullscreen-dialog.js';
import { hoverCard } from './hover-card.js';
import { indicator } from './indicator.js';
import { input } from './input.js';
import { item } from './item.js';
import { label } from './label.js';
import { linearLoader } from './linear-loader.js';
import { loader } from './loader.js';
import { logo } from './logo.js';
import { magneticHover } from './magnetic-hover.js';
import { merchantLogo } from './merchant-logo.js';
import { multiSelect } from './multi-select.js';
import { navigation } from './navigation.js';
import { pagination } from './pagination.js';
import { phoneInput } from './phone-input.js';
import { pill } from './pill.js';
import { popover } from './popover.js';
import { progress } from './progress.js';
import { radioGroup } from './radio-group.js';
import { rangeCalendar } from './range-calendar.js';
import { scrollArea } from './scroll-area.js';
import { select } from './select.js';
import { separator } from './separator.js';
import { sheet } from './sheet.js';
import { sidebar } from './sidebar.js';
import { skeleton } from './skeleton.js';
import { sonner } from './sonner.js';
import { spinner } from './spinner.js';
import { supportModal } from './support-modal.js';
// `switch` is a reserved word — the spec exports `switchSpec`.
import { switchSpec } from './switch.js';
import { table } from './table.js';
import { tableFilters } from './table-filters.js';
import { tabs } from './tabs.js';
import { telInput } from './tel-input.js';
import { textarea } from './textarea.js';
import { toggle } from './toggle.js';
import { toggleGroup } from './toggle-group.js';
import { tooltip } from './tooltip.js';

/** Every component spec, keyed by slug. */
export const componentSpecs: Record<string, ComponentSpec> = {
	accordion,
	alert,
	'alert-dialog': alertDialog,
	'alert-error': alertError,
	avatar,
	badge,
	breadcrumb,
	button,
	calendar,
	'auth-footer': authFooter,
	card,
	checkbox,
	'code-block': codeBlock,
	collapsible,
	command,
	'data-table': dataTable,
	'date-range-selector': dateRangeSelector,
	dialog,
	drawer,
	'dropdown-menu': dropdownMenu,
	empty,
	'enhanced-table': enhancedTable,
	'flow-lines': flowLines,
	form,
	'fullscreen-dialog': fullscreenDialog,
	'hover-card': hoverCard,
	indicator,
	input,
	item,
	label,
	'linear-loader': linearLoader,
	loader,
	logo,
	'magnetic-hover': magneticHover,
	'merchant-logo': merchantLogo,
	'multi-select': multiSelect,
	navigation,
	'page-shell': pageShell,
	pagination,
	'partner-cobrand': partnerCobrand,
	'phone-input': phoneInput,
	pill,
	popover,
	progress,
	'radio-group': radioGroup,
	'range-calendar': rangeCalendar,
	'scroll-area': scrollArea,
	select,
	separator,
	sheet,
	sidebar,
	skeleton,
	sonner,
	spinner,
	'support-modal': supportModal,
	switch: switchSpec,
	table,
	'table-filters': tableFilters,
	tabs,
	'tel-input': telInput,
	textarea,
	toggle,
	'toggle-group': toggleGroup,
	tooltip,
	wordmark
};

/** Flat array — convenient for iteration in the MCP server. */
export const allComponentSpecs: ComponentSpec[] = Object.values(componentSpecs);

/** Resolve a spec by slug; returns undefined if missing. */
export function getComponentSpec(slug: string): ComponentSpec | undefined {
	return componentSpecs[slug];
}

/** Total count — exposed for landing-page numbers + sanity checks. */
export const componentCount = allComponentSpecs.length;
