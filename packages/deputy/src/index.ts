import type { ESLint } from "eslint";

import { sheriff, type SheriffSettings } from "eslint-config-sheriff";
import {
  defineFlatConfig,
  type FlatESLintConfig,
  type Rules,
} from "eslint-define-config";
import perfectionist from "eslint-plugin-perfectionist";

const off = "off";
const warn = "warn";
const error = "error";

const sheriffOptions = {
  astro: false,
  jest: false,
  lodash: false,
  next: false,
  pathsOverrides: {
    tsconfigLocation: ["./tsconfig.json", "./tsconfig.eslint.json"],
  },
  playwright: false,
  react: false,
  remeda: false,

  vitest: false,
} satisfies SheriffSettings;

export const config: FlatESLintConfig[] = defineFlatConfig([
  ...sheriff(sheriffOptions),
  {
    files: ["**/*.ts"],
    rules: {
      "arrow-body-style": off,
      // This rule doesn't support enforcing implicit return for multiline returns.
      "arrow-return-style/arrow-return-style": off,
      "func-style": [error, "declaration", { allowArrowFunctions: true }],
      "no-console": warn,
      "no-negated-condition": off,
      "no-plusplus": [error, { allowForLoopAfterthoughts: true }],
      "no-void": [error, { allowAsStatement: true }],
      "operator-assignment": [warn, "always"],
      "prefer-destructuring": off,

      "@typescript-eslint/ban-ts-comment": [
        error,
        {
          "ts-check": false,
          "ts-expect-error": { descriptionFormat: "^\\(TS\\d+\\): .+$" },
        },
      ],
      "@typescript-eslint/explicit-function-return-type": warn,
      "@typescript-eslint/naming-convention": off,
      "@typescript-eslint/no-non-null-assertion": off,
      "@typescript-eslint/prefer-destructuring": warn,
      "@typescript-eslint/prefer-function-type": warn,
      "@typescript-eslint/promise-function-async": warn,
      "@typescript-eslint/restrict-template-expressions": [
        error,
        { allowNumber: true },
      ],
      "@typescript-eslint/return-await": [error, "always"],
      "@typescript-eslint/strict-boolean-expressions": warn,

      "import/no-unresolved": [error, { ignore: ["^virtual:"] }],

      "jsdoc/check-tag-names": off, // TSDoc is used instead.

      "simple-import-sort/imports": off,

      "unicorn/expiring-todo-comments": warn,
      "unicorn/no-negated-condition": error,
      "unicorn/no-typeof-undefined": warn,
      "unicorn/prefer-query-selector": warn,
    },
  },
  {
    plugins: {
      perfectionist: perfectionist as unknown as ESLint.Plugin,
    },
    settings: {
      perfectionist: {
        type: "natural",

        partitionByComment: true,
        partitionByNewLine: true,
      },
    },

    rules: {
      ...(perfectionist.configs["recommended-natural"].rules as Rules),
      "perfectionist/sort-union-types": [
        "error",
        {
          groups: ["unknown", "nullish"],
        },
      ],
    },
  },
]);
