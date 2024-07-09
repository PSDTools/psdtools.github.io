import { sheriff } from "eslint-config-sheriff";
import { defineFlatConfig } from "eslint-define-config";

/**
 * @type import("@sherifforg/types").SheriffSettings
 */
const sheriffOptions = {
  react: false,
  lodash: false,
  next: false,
  playwright: false,
  jest: false,
  vitest: false,
  // astro: false, // THIS DOESN'T DO ANYTHING!
  pathsOveriddes: {
    tsconfigLocation: [
      "./tsconfig.json",
      "./tsconfig.sw.json",
      "./tsconfig.eslint.json",
    ],
  },
};

/**
 * @type import("eslint-define-config").FlatESLintConfig[]
 */
const sheriffRules = sheriff(sheriffOptions);

export default defineFlatConfig([
  ...sheriffRules,
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
        { "ts-expect-error": true, "ts-check": false },
      ],
      "import/no-unresolved": [2, { ignore: ["^virtual:"] }],
      "@typescript-eslint/prefer-function-type": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/promise-function-async": "warn",
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/return-await": [2, "always"],
      // This rule doesn't support enforcing implicit return for multiline returns.
      "arrow-return-style/arrow-return-style": "off",
      "arrow-body-style": 0,
      "@typescript-eslint/restrict-template-expressions": [
        2,
        { allowNumber: true },
      ],
      "jsdoc/check-tag-names": "off", // TSDoc is used instead.
    },
  },
]);
