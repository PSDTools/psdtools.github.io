import { error } from "@sveltejs/kit";

import type { PageLoad } from "./$types";

interface Data {
  note: string;
}

const notes = new Map<string, string>([
  [
    "1",
    `---
title: Hello, HyperMD!
---
# Your ~~HyperMD editor~~ Logo is here :gift:

Can’t figure out how to make it smaller, but it's here!

![Logo](/PetalNotes-logo.svg)

-------------------

All ~~builtin~~ features are ready to go 🤘
Try out these methods!

1. \`HyperMD.switchToNormal(cm)\`
2. \`HyperMD.switchToHyperMD(cm)\`
3. \`cm.getValue()\` returns the Markdown source text

**Note**: This demo uses these powerpacks:

1. **fold-math-with-katex** uses _$K^{a}T_{e}X$_, the math typesetting library.
2. **hover-with-marked** uses _marked_ to render footnotes[^1].

[^1]: Like this one!

[hypermd-doc]: <https://laobubu.net/HyperMD/docs/> HyperMD documentation
[cm-manual]: <https://codemirror.net/doc/manual.html> CodeMirror User manual
`,
  ],
]);

export const load: PageLoad = ({ params }): Data => {
  const note = notes.get(params.path.slice(0, -1));

  if (note === undefined) {
    error(404);
  }

  return {
    note,
  };
};
