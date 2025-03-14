  <script lang="ts">
    import HyperMDC from "$lib/hypermd.svelte";
  // Import the conversion function from your library
  let { doc } = $props();
</script>
  
<div class="overflow-hidden">
  <HyperMDC {doc} />
</div>
