<script lang="ts">
	type Props = {
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	};

	let { size = 'md', class: className = '' }: Props = $props();

	const sizes = {
		sm: 'text-base',
		md: 'text-xl',
		lg: 'text-3xl'
	};
</script>

<span
	class="{sizes[size]} {className} font-mono font-light tracking-tight"
	style="font-family: var(--font-mono); letter-spacing: -0.02em;"
>
	dash<span style="color: var(--brand);">.</span>fi
</span>
