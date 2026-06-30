<script lang="ts">
	/**
	 * On-canvas inline-editable text. Reads the `builder-edit` context provided by
	 * SectionRenderer: when its section is selected, the text becomes a
	 * contenteditable span that writes back through `onEdit`. Otherwise it renders
	 * as plain text. Blocks use this for their `inline`-typed fields.
	 *
	 * The DOM text is synced from `value` only while the field is NOT focused, so
	 * typing never fights the caret.
	 */
	import { getContext } from 'svelte';

	type EditCtx = { isEditable: () => boolean; onEdit: (key: string, value: string) => void };

	let {
		field,
		value = '',
		class: cls = ''
	}: { field: string; value?: string; class?: string } = $props();

	const ctx = getContext<EditCtx | undefined>('builder-edit');
	const editable = $derived(ctx?.isEditable?.() ?? false);

	let el = $state<HTMLElement | null>(null);

	$effect(() => {
		if (el && document.activeElement !== el) {
			const v = value ?? '';
			if (el.textContent !== v) el.textContent = v;
		}
	});

	function onInput() {
		if (el) ctx?.onEdit(field, el.textContent ?? '');
	}
	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			el?.blur();
		}
	}
	function onPaste(e: ClipboardEvent) {
		e.preventDefault();
		const text = e.clipboardData?.getData('text/plain') ?? '';
		document.execCommand('insertText', false, text);
	}
	function stop(e: Event) {
		e.stopPropagation();
	}
</script>

{#if editable}
	<span
		bind:this={el}
		class={cls}
		contenteditable="true"
		role="textbox"
		tabindex="0"
		spellcheck="false"
		data-editing="true"
		oninput={onInput}
		onkeydown={onKeydown}
		onpaste={onPaste}
		onpointerdown={stop}
		onclick={stop}
	></span>
{:else}
	<span class={cls}>{value}</span>
{/if}

<style>
	[data-editing='true'] {
		outline: 1px dashed var(--m-accent, #2b605c);
		outline-offset: 2px;
		border-radius: 2px;
		cursor: text;
		min-width: 1ch;
	}
	[data-editing='true']:focus {
		outline-style: solid;
	}
</style>
