/**
 * Curated icon set for builder blocks that take an icon (feature grids, etc.).
 * Keep this list small + marketing-relevant; the select in the inspector uses
 * these keys. Map a key → Lucide component.
 */
import ShieldCheck from '@lucide/svelte/icons/shield-check';
import ScanLine from '@lucide/svelte/icons/scan-line';
import Coins from '@lucide/svelte/icons/coins';
import Plug from '@lucide/svelte/icons/plug';
import Bell from '@lucide/svelte/icons/bell';
import FileText from '@lucide/svelte/icons/file-text';
import Zap from '@lucide/svelte/icons/zap';
import Lock from '@lucide/svelte/icons/lock';
import TrendingUp from '@lucide/svelte/icons/trending-up';
import Package from '@lucide/svelte/icons/package';
import type { Component } from 'svelte';

export const ICONS: Record<string, Component> = {
	'shield-check': ShieldCheck,
	'scan-line': ScanLine,
	coins: Coins,
	plug: Plug,
	bell: Bell,
	'file-text': FileText,
	zap: Zap,
	lock: Lock,
	'trending-up': TrendingUp,
	package: Package
};

export const ICON_KEYS = Object.keys(ICONS);

export function getIcon(key: string): Component {
	return ICONS[key] ?? ShieldCheck;
}
