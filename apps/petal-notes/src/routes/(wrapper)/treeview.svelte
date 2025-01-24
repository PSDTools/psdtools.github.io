<script lang="ts">
  import TreeView from "./treeview.svelte";
  import type { Item } from "./treeview.ts";

  interface Props {
    item: Item;

    isRoot?: boolean;
  }

  let { isRoot, item }: Props = $props();
</script>

{#if item.type === "folder"}
  {@const { children, label } = item}

  <details open={isRoot}>
    <summary>{label}</summary>
    <ul>
      {#each children as child (child.id)}
        <li>
          <TreeView item={child} />
        </li>
      {/each}
    </ul>
  </details>
{:else if item.type === "file"}
  {@const { label } = item}

  <span>{label}</span>
{/if}

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 0.8rem;
    user-select: none;
  }
</style>
