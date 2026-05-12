<script lang="ts">
	export type ComponentStatus = 'stable' | 'beta' | 'deprecated';

	type Props = {
		status: ComponentStatus;
	};

	let { status }: Props = $props();

	const labels: Record<ComponentStatus, string> = {
		stable: 'Stable',
		beta: 'Beta',
		deprecated: 'Deprecated'
	};
</script>

<span class="badge {status}">
	<span class="dot"></span>
	{labels[status]}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 3px 10px 3px 8px;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.05em;
		border: 1px solid var(--border);
		color: var(--fg-muted);
		border-radius: 999px;
	}
	.dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
	.stable .dot {
		background: var(--brand);
	}
	.stable {
		color: var(--fg);
	}
	.beta .dot {
		background: #d4a017;
	}
	.deprecated .dot {
		background: var(--fg-muted);
	}
</style>
