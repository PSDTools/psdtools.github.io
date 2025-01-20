import cspell from "@cspell/eslint-plugin";
import type { Config as SvelteKitConfig } from "@sveltejs/kit";
import {
  sheriff,
  type SheriffSettings,
  supportedFileTypes,
  type TSESLint,
} from "eslint-config-sheriff";
import perfectionist from "eslint-plugin-perfectionist";
import sveltePlugin from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

interface Settings {
  sheriffOverrides: SheriffSettings;
  svelte: boolean | SvelteSettings;
}

interface SvelteSettings {
  enabled: boolean;
  svelteKitConfig: SvelteKitConfig;
}

const off = "off";
const warn = "warn";
const error = "error";

const sheriffOptions = {
  astro: false,
  jest: false,
  lodash: false,
  next: false,
  pathsOverrides: {
    playwrightTests: [],
  },
  playwright: false,
  react: false,
  remeda: false,

  vitest: false,
} satisfies SheriffSettings;

const baseConfig = ts.config([
  {
    files: [supportedFileTypes],
    rules: {
      "arrow-body-style": off,
      // This rule doesn't support enforcing implicit return for multiline returns.
      "arrow-return-style/arrow-return-style": off,
      curly: [error, "multi-line"],
      "func-style": [error, "declaration", { allowArrowFunctions: true }],
      "no-console": warn,
      "no-negated-condition": off,
      "no-nested-ternary": off,
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
      "@typescript-eslint/explicit-function-return-type": [
        warn,
        { allowExpressions: true },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/naming-convention": off,
      "@typescript-eslint/no-confusing-void-expression": warn,
      "@typescript-eslint/no-non-null-assertion": off,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",

          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/prefer-destructuring": warn,
      "@typescript-eslint/prefer-function-type": warn,
      "@typescript-eslint/promise-function-async": warn,
      "@typescript-eslint/restrict-template-expressions": [
        error,
        { allowNumber: true },
      ],
      "@typescript-eslint/return-await": [error, "always"],
      "@typescript-eslint/strict-boolean-expressions": warn,
      "@typescript-eslint/switch-exhaustiveness-check": error,

      "import/no-unresolved": [error, { ignore: ["^virtual:"] }],
      "import/no-useless-path-segments": [error, { noUselessIndex: false }],

      "jsdoc/check-tag-names": off, // TSDoc is used instead.
      "jsdoc/convert-to-jsdoc-comments": off, // Experimental, has bugs.

      "simple-import-sort/imports": off,

      "unicorn/expiring-todo-comments": warn,
      "unicorn/no-negated-condition": error,
      "unicorn/no-typeof-undefined": warn,
      "unicorn/prefer-query-selector": warn,
    },
  },
  {
    files: ["*.js"],
    rules: {
      "tsdoc/syntax": off,
    },
  },
  {
    files: [supportedFileTypes],
    plugins: { perfectionist },
    settings: {
      perfectionist: {
        type: "natural",

        partitionByComment: true,
        partitionByNewLine: true,
      },
    },

    rules: {
      ...perfectionist.configs["recommended-natural"].rules,
      "perfectionist/sort-imports": [
        error,
        {
          groups: [
            ["side-effect", "side-effect-style"],
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
            "object",
          ],
          internalPattern: ["^$lib/.*"],
          partitionByNewLine: false,
        },
      ],
      "perfectionist/sort-modules": off,
      "perfectionist/sort-union-types": [
        error,
        {
          groups: ["unknown", "nullish"],
        },
      ],
    },
  },
  {
    plugins: { "@cspell": cspell },
    rules: {
      "@cspell/spellchecker": [
        warn,
        {
          configFile: import.meta.resolve("../../../cspell.json"),
        },
      ],
    },
  },
]);

function svelteConfig({
  project,
  settings = {},
}: {
  project: string | string[];
  settings?: Partial<SvelteSettings>;
}): TSESLint.FlatConfig.ConfigArray {
  const { svelteKitConfig } = settings;

  return ts.config([
    ...sveltePlugin.configs.recommended,
    {
      languageOptions: {
        globals: {
          ...globals.browser,
        },
      },
    },
    {
      files: ["**/*.svelte"],

      languageOptions: {
        parserOptions: {
          extraFileExtensions: [".svelte"],
          parser: ts.parser,
          project,
          svelteConfig: svelteKitConfig,
        },
      },
      rules: {
        "@typescript-eslint/no-unsafe-call": off,
        "prefer-const": off,
        "storybook/default-exports": off,

        // Possible Errors
        "svelte/infinite-reactive-loop": warn,
        "svelte/no-dom-manipulating": warn,
        "svelte/no-dupe-on-directives": warn,
        "svelte/no-dupe-use-directives": warn,
        "svelte/no-raw-special-elements": warn,
        "svelte/no-reactive-reassign": warn,

        // Security Vulnerability
        "svelte/no-target-blank": warn,

        // Best Practices
        "svelte/block-lang": [warn, { script: "ts" }],
        "svelte/button-has-type": warn,
        "svelte/no-ignored-unsubscribe": warn,
        "svelte/no-immutable-reactive-statements": warn,
        "svelte/no-inline-styles": warn,
        "svelte/no-inspect": warn,
        "svelte/no-reactive-functions": warn,
        "svelte/no-reactive-literals": warn,
        "svelte/no-svelte-internal": warn,
        "svelte/no-useless-children-snippet": warn,
        "svelte/no-useless-mustaches": warn,
        "svelte/prefer-const": warn,
        "svelte/prefer-destructured-store-props": warn,
        "svelte/require-each-key": warn,
        "svelte/require-event-dispatcher-types": warn,
        "svelte/require-optimized-style-attribute": warn,
        "svelte/require-stores-init": warn,
        "svelte/valid-each-key": warn,

        // Stylistic Issues
        "svelte/consistent-selector-style": warn,
        "svelte/derived-has-same-inputs-outputs": warn,
        "svelte/html-self-closing": warn,
        "svelte/no-extra-reactive-curlies": warn,
        "svelte/prefer-class-directive": warn,
        "svelte/prefer-style-directive": warn,
        "svelte/shorthand-attribute": warn,
        "svelte/shorthand-directive": warn,
        "svelte/sort-attributes": warn,
        "svelte/spaced-html-comment": warn,

        // SvelteKit
        "svelte/no-export-load-in-svelte-module-in-kit-pages": warn,
        "svelte/no-navigation-without-base": warn,
      },
    },
  ]);
}

export function config({
  sheriffOverrides,
  svelte,
}: Partial<Settings> = {}): TSESLint.FlatConfig.ConfigArray {
  const combinedSheriffOptions = {
    ...sheriffOptions,
    ...sheriffOverrides,
  };

  const builtConfig = [...sheriff(combinedSheriffOptions), ...baseConfig];

  if (svelte === true) {
    builtConfig.push(...svelteConfig({ project: "./tsconfig.json" }));
  } else if (
    typeof svelte === "object" &&
    Object.hasOwn(svelte, "enabled") &&
    svelte.enabled
  ) {
    builtConfig.push(
      ...svelteConfig({ project: "./tsconfig.json", settings: svelte }),
    );
  }

  return builtConfig;
}
