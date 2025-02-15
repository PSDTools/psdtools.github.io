<script lang="ts">
  import HyperMDC from "$lib/hypermd.svelte";

  let { data } = $props();
</script>

<div class="overflow-hidden">
  <!-- eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -->
  <HyperMDC value={data.note} />
</div>
