<script lang="ts">
  import HyperMDC from "$lib/hypermd.svelte";

  let mode: "hypermd" | "normal" = $state("hypermd");
  const value = `---
title: Hello, HyperMD!
---
# Your ~~HyperMD editor~~ Logo is here :gift:
Cant figure out how to make it smaller, but it's here!
![Logo](/PetalNotes-logo.svg)

-------------------

All ~~builtin~~ features are ready to go 🤘
Try out these methods!

1. \`HyperMD.switchToNormal(cm)\`
2. \`HyperMD.switchToHyperMD(cm)\`
3. \`cm.getValue()\` returns the Markdown source text

**Note**: This demo uses these powerpacks:

1. **fold-math-with-katex** uses _$KaTeX$_, the math typesetting library.
2. **hover-with-marked** uses _marked_ to render footnotes[^1].

[^1]: Like this one!

[hypermd-doc]: https://laobubu.net/HyperMD/docs/ HyperMD documentation
[cm-manual]: https://codemirror.net/doc/manual.html CodeMirror User manual
`;
</script>

<div>
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

<div class="hypermd-container">
  <HyperMDC {value} bind:mode />
</div>

<style>
  .hypermd-container {
    overflow: hidden;
  }
</style>