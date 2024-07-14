import browserslist from "browserslist";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";
import { defineConfig } from "vite";
import htmlMinifier from "vite-plugin-html-minifier";
import { VitePWA } from "vite-plugin-pwa";

const browsersList = browserslist();

// https://vitejs.dev/config/
export default defineConfig({
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
    htmlMinifier({
      minify: true,
    }),
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
        id: "/",
        scope: "/",
        name: "Pattonville GPA Calculator",
        display: "standalone",
        start_url: "/",
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
