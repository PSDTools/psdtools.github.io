import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import browserslist from "browserslist";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = dirname(fileURLToPath(import.meta.url));
const browsersList = browserslist();
const basename = "/GPA_Calculator/";

// https://vitejs.dev/config/
export default defineConfig({
  base: basename,
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
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
    VitePWA({
      strategies: "injectManifest",
      injectManifest: {
        swSrc: "src/sw.ts",
        swDest: "dist/sw.js",
        globDirectory: "dist",
        globPatterns: ["**/*.{html,js,css,json,png}"],
      },
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
        icons: [
          {
            src: `${basename}/psdr3-icon.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        screenshots: [],
        // features: [],
        categories: [],
        shortcuts: [],
      },
    }),
  ],
});
