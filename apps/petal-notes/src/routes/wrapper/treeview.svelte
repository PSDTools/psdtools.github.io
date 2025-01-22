<script context="module">
	// retain module scoped expansion state for each tree node
	/** @type {Record<string, boolean>} */
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	}
</script>
<script>
//	import { slide } from 'svelte/transition'
	export let tree
	const {label, children} = tree

	let expanded = _expansionState[label] || false
	const toggleExpansion = () => {
		expanded = _expansionState[label] = !expanded
	}
	$: arrowDown = expanded
</script>

<ul><!-- transition:slide -->
	<li>
		{#if children}
			<button type="button" on:click={toggleExpansion} on:keydown={(e) => e.key === 'Enter' && toggleExpansion()} aria-expanded={expanded} class="tree-toggle">
				<span class="arrow" class:arrowDown>&#x25b6</span>
				{label}
			</button>
			{#if expanded}
				{#each children as child}
					<svelte:self tree={child} />
				{/each}
			{/if}
		{:else}
			<span>
				<span class="no-arrow"/>
				{label}
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
		list-style: none;
		padding-left: 0.8rem; 
		user-select: none;
	}
	.no-arrow { padding-left: 1.0rem; }
	.arrow {
		cursor: pointer;
		display: inline-block;
		/* transition: transform 200ms; */
	}
	.arrowDown { transform: rotate(90deg); }
</style>
