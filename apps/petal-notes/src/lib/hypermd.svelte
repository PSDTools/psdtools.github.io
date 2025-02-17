<script lang="ts">
  import {
    autocompletion,
    closeBrackets,
    closeBracketsKeymap,
    completionKeymap,
  } from "@codemirror/autocomplete";
  import { indentWithTab } from "@codemirror/commands";
  import { markdown } from "@codemirror/lang-markdown";
  import {
    bracketMatching,
    foldKeymap,
    indentOnInput,
    syntaxTree,
  } from "@codemirror/language";
  import { languages } from "@codemirror/language-data";
  import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
  import { EditorState } from "@codemirror/state";
  import {
    crosshairCursor,
    dropCursor,
    EditorView,
    highlightActiveLine,
    keymap,
    rectangularSelection,
  } from "@codemirror/view";
  import { printTree } from "@lezer-unofficial/printer";
  import { GFM } from "@lezer/markdown";
  import { minimalSetup } from "codemirror";
  import { hypermdExtensions, hypermdMarkdownExtensions } from "hypermd";
  import CodeMirror from "svelte-codemirror-editor";

  export interface Props {
    value: string;
  }

  let { value = $bindable() }: Props = $props();

  const extensions = [
    minimalSetup,
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    crosshairCursor(),
    highlightActiveLine(),
    highlightSelectionMatches(),

    EditorView.lineWrapping,
    hypermdExtensions,
    keymap.of([
      ...closeBracketsKeymap,
      ...searchKeymap,
      ...foldKeymap,
      ...completionKeymap,

      indentWithTab,

      // Debugging
      {
        key: "Alt-p",
        run: (view) => {
          if (import.meta.env.PROD) return true;

          console.debug(
            printTree(syntaxTree(view.state), view.state.doc.toString()),
          );

          return true;
        },
      },
    ]),
  ];
</script>

<CodeMirror
  basic={false}
  {extensions}
  lang={markdown({
    codeLanguages: languages,
    extensions: [GFM, hypermdMarkdownExtensions],
  })}
  bind:value
/>
