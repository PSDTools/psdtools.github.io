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
    <ul class="m-0 select-none list-none pl-0.5">
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
