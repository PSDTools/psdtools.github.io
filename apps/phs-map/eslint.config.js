// @ts-check
import { sheriff } from "eslint-config-sheriff";
import { defineFlatConfig } from "eslint-define-config";

/**
 * @import {SheriffSettings} from "eslint-config-sheriff"
 */

const sheriffOptions = /** @satisfies {SheriffSettings} */ ({
  react: false,
  lodash: false,
  remeda: false,
  next: false,
  playwright: false,
  jest: false,
  vitest: false,
  astro: false,
  pathsOverrides: {
    tsconfigLocation: ["./tsconfig.json", "./tsconfig.eslint.json"],
  },
});

export default defineFlatConfig([
  ...sheriff(sheriffOptions),
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
      "prefer-destructuring": "off",
      "@typescript-eslint/prefer-destructuring": "warn",
      "unicorn/prefer-query-selector": "warn",
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      "operator-assignment": ["warn", "always"],
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-console": "warn",
      "no-negated-condition": "off",
      "unicorn/no-negated-condition": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": { descriptionFormat: "^\\(TS\\d+\\): .+$" },
          "ts-check": false,
        },
      ],
      "import/no-unresolved": ["error", { ignore: ["^virtual:"] }],
      "@typescript-eslint/prefer-function-type": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/promise-function-async": "warn",
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/return-await": ["error", "always"],
      // This rule doesn't support enforcing implicit return for multiline returns.
      "arrow-return-style/arrow-return-style": "off",
      "arrow-body-style": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "jsdoc/check-tag-names": "off", // TSDoc is used instead.
      "unicorn/expiring-todo-comments": "warn",
      "unicorn/no-typeof-undefined": "warn",

      "no-void": ["error", { allowAsStatement: true }],
    },
  },
]);
