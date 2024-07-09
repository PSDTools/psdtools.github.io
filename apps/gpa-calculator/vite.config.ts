import browserslist from "browserslist";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { minify } from "html-minifier-terser";
import { browserslistToTargets } from "lightningcss";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const browsersList = browserslist();
const basename = "/GPA_Calculator/";

// https://vitejs.dev/config/
export default defineConfig({
  base: basename,
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: new URL(import.meta.resolve("./index.html")).pathname,
      },
    },
    target: browserslistToEsbuild(browsersList),
    cssMinify: "lightningcss",
  },
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(browsersList),
    },
  },
  plugins: [
    {
      name: "html-minify", // Name of the plugin
      transformIndexHtml: {
        order: "post",
        handler: async (html: string): Promise<string> =>
          await minify(html, {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            collapseBooleanAttributes: true,
            minifyURLs: true,
            collapseInlineTagWhitespace: true,
            decodeEntities: true,
            noNewlinesBeforeTagClose: true,
            removeStyleLinkTypeAttributes: true,
            removeScriptTypeAttributes: true,
          }),
      },
    },
    VitePWA({
      strategies: "injectManifest",
      injectManifest: {
        swSrc: "src/sw.ts",
        swDest: "dist/sw.js",
        globDirectory: "dist",
        globPatterns: ["**/*.{html,js,css,json,png}"],
      },
      injectRegister: "script-defer",
      registerType: "autoUpdate",
      srcDir: "src",
      filename: "sw.ts",
      workbox: {
        cleanupOutdatedCaches: true,
      },
      manifest: {
        id: basename,
        scope: basename,
        name: "Pattonville GPA Calculator",
        display: "standalone",
        start_url: basename,
        short_name: "GPA Calculator",
        theme_color: "#00843e",
        description: "GPA Calculator for Pattonville",
        dir: "ltr",
        orientation: "any",
        background_color: "#000000",
        related_applications: [],
        prefer_related_applications: false,
        display_override: ["window-controls-overlay"],
        screenshots: [],
        // features: [],
        categories: [],
        shortcuts: [],
      },
      pwaAssets: {
        htmlPreset: "2023",
        preset: "minimal-2023",
        image: "public/logo.svg",
        overrideManifestIcons: true,
      },
    }),
  ],
});
