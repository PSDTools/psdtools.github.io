<script lang="ts">
  import {
    autocompletion,
    closeBrackets,
    closeBracketsKeymap,
    completionKeymap,
  } from "@codemirror/autocomplete";
  import { defaultKeymap, indentWithTab } from "@codemirror/commands";
  import { markdown } from "@codemirror/lang-markdown";
  import {
    bracketMatching,
    defaultHighlightStyle,
    foldKeymap,
    indentOnInput,
    syntaxHighlighting,
    syntaxTree,
  } from "@codemirror/language";
  import { languages } from "@codemirror/language-data";
  import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
  import { EditorState } from "@codemirror/state";
  import {
    crosshairCursor,
    drawSelection,
    dropCursor,
    EditorView,
    highlightActiveLine,
    highlightSpecialChars,
    keymap,
    rectangularSelection,
  } from "@codemirror/view";
  import { printTree } from "@lezer-unofficial/printer";
  import { GFM } from "@lezer/markdown";
  import { hypermdExtensions, hypermdMarkdownExtensions } from "hypermd";
  import { LoroExtensions } from "loro-codemirror";
  import { Awareness, type LoroDoc, UndoManager } from "loro-crdt";
  import CodeMirror from "svelte-codemirror-editor";
  import { uint8ArrayToBase64 } from "uint8array-extras";

  export interface Props {
    doc: LoroDoc;
  }

  let { doc }: Props = $props();

  const awareness: Awareness = new Awareness(doc.peerIdStr);
  const undoManager = new UndoManager(doc, {});

  const extensions = [
    // minimalSetup,

    highlightSpecialChars(),
    drawSelection(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    keymap.of([...defaultKeymap]),

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

    LoroExtensions(
      doc,
      {
        awareness,
        user: { colorClassName: "user1", name: "User 1" },
      },
      undoManager,
    ),

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
      {
        key: "Cmd-Shift-s",
        run: () => {
          if (import.meta.env.PROD) return true;

          console.debug(uint8ArrayToBase64(doc.export({ mode: "snapshot" })));

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
  value={/* This sets it initially, but Loro handles further updates. */
  doc.getText("codemirror").toString()}
/>
