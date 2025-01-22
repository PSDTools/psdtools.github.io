<script lang="ts">
  import Page from "../note/+page.svelte";
  import TreeView from "./treeview.svelte";

  // Example file tree structure
  let tree ={
		label: "USA", children: [
			{label: "Florida", children: [
				{label: "Jacksonville"},
				{label: "Orlando", children: [
					{label: "Disney World"},
					{label: "Universal Studio"},
					{label: "Sea World"},
				]},
				{label: "Miami"},
			]},
			{label: "California", children: [
				{label: "San Francisco"},
				{label: "Los Angeles"},
				{label: "Sacramento"},
			]},
		],
	};
</script>

<div class="wrapper flex flex-col h-screen overflow-hidden bg-slate-950">
  <header class="bg-slate-950 text-white pl-4 pt-4 flex items-center w-full">
    <div class="flex items-center space-x-2">
      <button aria-label="PetalNotes Logo" class="w-8 h-8">
      <img src="/PetalNotes-logo.svg" alt="PetalNotes Logo" class="w-8 h-8"/>
      </button>
      <h1>Petal Notes</h1>
    </div>
  </header>
  <div class="flex flex-1 overflow-hidden">
    <aside class="bg-slate-950 text-white w-64 p-4">
      <!-- Sidebar tree -->
      <TreeView {tree} />
    </aside>
    <main class="flex-1 bg-white text-black overflow-auto rounded-tl-lg">
      <Page />
    </main>
  </div>
</div>

<style>
  aside ul {
    list-style-type: none;
    padding: 0;
  }

  
</style>
