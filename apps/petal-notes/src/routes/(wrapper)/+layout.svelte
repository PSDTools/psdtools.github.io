<script lang="ts">
  import TreeView from "./treeview.svelte";
  import { onMount } from "svelte";

  let children: string = "";
  let data: {
    root: {
      id: string;
      label: string;
      type: "folder";
      children: Set<{ id: string; label: string; type: "file" }>;
    };
  } | null = null;

  onMount(async () => {
    console.log("Fetching file tree...");
    const response = await fetch("http://localhost:5000/files");
    const fileTree: string[] = (await response.json()) as string[];
    console.log("File tree received:", fileTree);
    data = {
      root: {
        id: "root",
        label: "Root",
        type: "folder" as const,
        children: new Set(
          fileTree.map((file) => ({
            id: file,
            label: file,
            type: "file" as const,
          })),
        ),
      },
    };
    console.log("Data initialized:", data);
  });
</script>

<div
  class="wrapper flex h-screen flex-col overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50"
>
  <header class="flex w-full items-center pl-4 pt-4">
    <a class="flex items-center space-x-2" href="/">
      <img class="h-8 w-8" alt="PetalNotes Logo" src="/PetalNotes-logo.svg" />
      <h1>Petal Notes</h1>
    </a>
  </header>
  <div class="flex flex-1 overflow-hidden">
    <aside class="w-64">
      <!-- Sidebar tree -->
      {#if data}
        <TreeView isRoot item={data.root} />
      {/if}
    </aside>
    <main class="flex-1 overflow-auto rounded-tl-lg p-2">
      <slot />
    </main>
  </div>
</div>
