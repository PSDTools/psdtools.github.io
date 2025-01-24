<script lang="ts">
  import TreeView from "./treeview.svelte";

  let { children, data } = $props();
</script>

<div class="wrapper flex h-screen flex-col overflow-hidden bg-slate-950">
  <header class="flex w-full items-center bg-slate-950 pl-4 pt-4 text-white">
    <a class="flex items-center space-x-2" href="/">
      <img class="h-8 w-8" alt="PetalNotes Logo" src="/PetalNotes-logo.svg" />
      <h1>Petal Notes</h1>
    </a>
  </header>
  <div class="flex flex-1 overflow-hidden">
    <aside class="w-64 bg-slate-950 p-4 text-white">
      <!-- Sidebar tree -->
      <!-- eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -->
      <TreeView isRoot item={data.root} />
    </aside>
    <main class="bg-back flex-1 overflow-auto rounded-tl-lg p-2 text-white">
      {@render children()}
    </main>
  </div>
</div>
