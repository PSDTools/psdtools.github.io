import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import browserslist from "browserslist";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";
import * as path from "node:path";
import process from "node:process";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
} from "vitest/config";

const browsersList = browserslist();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sveltekit(), tailwindcss(), wasm(), topLevelAwait()],

  build: {
    cssMinify: "lightningcss",
    sourcemap: true,
    target: browserslistToEsbuild(browsersList),
  },

  css: {
    transformer: "lightningcss",

    lightningcss: {
      targets: browserslistToTargets(browsersList),
    },
  },

  ssr: {
    resolve: {
      conditions: process.env["VITEST"] === undefined ? [] : ["browser"],
    },
  },

  test: {
    exclude: ["**/build/**", ...defaultExclude],

    coverage: {
      enabled: true,
      excludeAfterRemap: true,

      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/build/**",
        "**/.storybook/**",
        "**/*.stories.*",
        "**/storybook-static/**",
      ],
    },

    sequence: {
      concurrent: true,
      shuffle: {
        files: false,
        tests: true,
      },
    },

    // FIXME: SvelteKit doesn’t support Vitest Workspaces yet,
    // so we have do define it here instead of in the workspace root.
    // See: sveltejs/kit#11356.
    workspace: [
      {
        extends: true,
        test: {
          include: ["tests/**/*.test.ts"],
          name: "petal-notes",

          typecheck: {
            enabled: true,
          },
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(import.meta.dirname, ".storybook"),
            // This should match your package.json script to run Storybook
            // The --ci flag will skip prompts and not open a browser
            storybookScript: "pnpm exec storybook dev --ci",
          }),
        ],
        test: {
          name: "petal-notes:storybook",

          browser: {
            enabled: true,
            // https://vitest.dev/guide/browser/playwright
            headless: true,
            provider: "playwright",

            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./.storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
