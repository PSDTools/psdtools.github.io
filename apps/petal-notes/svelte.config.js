// @ts-check
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default /** @satisfies {import('@sveltejs/kit').Config} */ ({
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
  },

  compilerOptions: {
    modernAst: true,
    // runes: true, // Breaks Storybook (legacy compatibility).
  },
});
