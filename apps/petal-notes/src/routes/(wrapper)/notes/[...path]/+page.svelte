<script lang="ts">
  import HyperMDC from "$lib/hypermd.svelte";

  let mode: "hypermd" | "normal" = $state("hypermd");

  let { data } = $props();
</script>

<div class="p-1">
  <button
    class="rounded-sm border px-2 py-0.5"
    onclick={() => {
      mode = "normal";
    }}
    type="button"
  >
    Switch To Normal
  </button>
  <button
    class="rounded-md border px-2 py-0.5"
    onclick={() => {
      mode = "hypermd";
    }}
    type="button"
  >
    Switch To HyperMD
  </button>
</div>

<div id="hypermd-container">
  <!-- eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -->
  <HyperMDC value={data.note} bind:mode />
</div>

<style>
  #hypermd-container {
    overflow: hidden;
  }
</style>
