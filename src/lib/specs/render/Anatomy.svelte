<!--
  Renders a ComponentSpec's anatomy section in the canonical 6-subsection layout
  used across every /components/<name> page:
    Dimensions · Tokens (per part) · Variants? · Sizes? · Composition ·
    Not part of X · Props (behaviour-only) · Porting to another stack

  Each subsection is hairline-separated via the portal-canonical `.docs-h` /
  `.docs-list` styles. Pages render this snippet inside their
  {#snippet anatomy()} block.
-->
<script lang="ts">
	import type { ComponentSpec } from '../types.js';

	let { spec }: { spec: ComponentSpec } = $props();
</script>

<div>
	<div class="docs-h">Dimensions</div>
	<ul class="docs-list">
		{#each spec.dimensions as dim (dim.name)}
			<li>
				<strong>{dim.name}</strong> — {dim.value}{#if dim.tw}
					(<code>{dim.tw}</code>){/if}{#if dim.notes}. {dim.notes}{/if}
			</li>
		{/each}
	</ul>

	{#if spec.sizes && spec.sizes.length > 0}
		<div class="docs-h">Sizes</div>
		<ul class="docs-list">
			{#each spec.sizes as size (size.name)}
				<li>
					<strong>{size.name}</strong> —
					{#if size.height}height {size.height}{/if}{#if size.padding}, padding {size.padding}{/if}{#if size.fontSize}, type {size.fontSize}{/if}{#if size.notes}. {size.notes}{/if}
				</li>
			{/each}
		</ul>
	{/if}

	<div class="docs-h">Tokens (per part)</div>
	<ul class="docs-list">
		{#each spec.tokens as part (part.name)}
			<li>
				<strong>{part.name}</strong>{#if part.token} — <code>{part.token.cssVar}</code>
					(light <code>{part.token.light}</code>, dark <code>{part.token.dark}</code>){/if}{#if part.notes}.
					{part.notes}{/if}
			</li>
		{/each}
	</ul>

	{#if spec.variants && spec.variants.length > 0}
		<div class="docs-h">Variants</div>
		<ul class="docs-list">
			{#each spec.variants as v (v.name)}
				<li>
					<strong>{v.name}</strong>{#if v.description} — {v.description}{/if}
					{#if v.tokens && v.tokens.length > 0}
						<ul class="docs-list" style:margin-top="6px">
							{#each v.tokens as part (part.name)}
								<li>
									<em>{part.name}</em>{#if part.token} —
										<code>{part.token.cssVar}</code> (light
										<code>{part.token.light}</code>, dark
										<code>{part.token.dark}</code>){/if}{#if part.notes}. {part.notes}{/if}
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}

	<div class="docs-h">Composition</div>
	<ul class="docs-list">
		{#each spec.composition as rule (rule)}
			<li>{@html rule}</li>
		{/each}
	</ul>

	<div class="docs-h">Not part of {spec.name}</div>
	<ul class="docs-list">
		{#each spec.nonFeatures as item (item)}
			<li>{@html item}</li>
		{/each}
	</ul>

	<div class="docs-h">Props (behaviour-only)</div>
	<ul class="docs-list">
		{#each spec.props as p (p.name)}
			<li>
				<code>{p.name}</code>{#if p.type}
					<span style:color="var(--fg-muted)" style:font-size="12px">— {p.type}</span>{/if}{#if p.description}
					— {p.description}{/if}
			</li>
		{/each}
	</ul>

	<div class="docs-h">Porting to another stack</div>
	<ul class="docs-list">
		{#each spec.porting as item (item)}
			<li>{@html item}</li>
		{/each}
	</ul>
</div>
