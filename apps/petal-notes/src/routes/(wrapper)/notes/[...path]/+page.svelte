<script lang="ts">
  import HyperMDC from "$lib/hypermd.svelte";
  import { LoroDoc } from "loro-crdt";
  import { base64ToUint8Array } from "uint8array-extras";

  let { data } = $props();

  const doc = new LoroDoc();
  doc.import(
    base64ToUint8Array(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data.note,
    ),
  );
</script>

<div class="overflow-hidden">
  <HyperMDC {doc} />
</div>
