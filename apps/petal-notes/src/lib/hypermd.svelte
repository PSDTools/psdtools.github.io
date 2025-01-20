<script lang="ts" module>
  const HyperMD_ = await import("hypermd");

  const loadingP = Promise.all([
    // Load these modes if you want highlighting ...
    import("codemirror/mode/htmlmixed/htmlmixed.js"), // for embedded HTML.
    import("codemirror/mode/stex/stex.js"), // for Math TeX Formulae.
    import("codemirror/mode/yaml/yaml.js"), // for frontmatter.

    // Load PowerPacks if you want to use 3rd-party libraries for enhanced features...
    import("hypermd/powerpack/fold-math-with-katex.js"),
    import("hypermd/powerpack/hover-with-marked.js"),
  ]);
</script>

<script lang="ts">
  export interface Props {
    value: string;

    mode: "hypermd" | "normal";
  }

  let { mode = $bindable(), value = $bindable() }: Props = $props();

  let editor: CodeMirror.Editor;
  let textarea: HTMLTextAreaElement;

  // eslint-disable-next-line unicorn/prefer-top-level-await
  void (async () => {
    await loadingP;

    // @ts-expect-error(TS2454): Using `bind:this`.
    editor = HyperMD_.fromTextArea(textarea);
    editor.setSize(null, "200%");
    editor.focus();
  })();

  let isMounting = true;

  $effect(() => {
    // Force the effect to run if the mode changes.
    mode = mode;

    if (isMounting) {
      isMounting = false;

      return;
    }

    if (mode === "hypermd") {
      HyperMD_.switchToHyperMD(editor);
    } else {
      HyperMD_.switchToNormal(editor);
    }
  });
</script>

<textarea bind:this={textarea} bind:value></textarea>
