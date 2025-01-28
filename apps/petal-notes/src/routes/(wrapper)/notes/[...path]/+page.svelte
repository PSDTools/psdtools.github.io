<script lang="ts">
  import HyperMDC from "$lib/hypermd.svelte";

  type EditorMode = "hypermd" | "normal";

  let editorMode: EditorMode = $state("hypermd");

  let { data } = $props();
</script>

<div class="p-1">
  {#snippet button(mode: EditorMode, modeName: string)}
    <button
      class="rounded-sm border border-slate-950 px-2 py-0.5 dark:border-slate-50"
      onclick={() => {
        editorMode = mode;
      }}
      type="button"
    >
      Switch To {modeName}
    </button>
  {/snippet}

  {@render button("normal", "Normal")}
  {@render button("hypermd", "HyperMD")}
</div>

<div class="overflow-hidden">
  <!-- eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -->
  <HyperMDC value={data.note} bind:mode={editorMode} />
</div>
