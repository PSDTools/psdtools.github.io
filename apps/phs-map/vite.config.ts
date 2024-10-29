import browserslist from "browserslist";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { FontaineTransform } from "fontaine";
import { browserslistToTargets } from "lightningcss";
import { defineConfig } from "vite";
import htmlMinifier from "vite-plugin-html-minifier";
import { VitePWA } from "vite-plugin-pwa";
import webfontDownload from "vite-plugin-webfont-dl";

const browsersList = browserslist();

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: new URL(import.meta.resolve("./index.html")).pathname,
      },
    },
    sourcemap: true,
    target: browserslistToEsbuild(browsersList),
    // cssMinify: "lightningcss", // Currently doesn't support first-child.
  },
  css: {
    lightningcss: {
      targets: browserslistToTargets(browsersList),
    },
    transformer: "lightningcss",
  },
  plugins: [
    webfontDownload(["https://fonts.googleapis.com/css?family=Lato"]),
    FontaineTransform.vite({
      fallbacks: ["sans-serif"],
      resolvePath: (path) => new URL(`.${path}`, import.meta.url),
    }),
    htmlMinifier({
      minify: true,
    }),
    VitePWA({
      filename: "sw.ts",
      injectManifest: {
        globDirectory: "dist",
        globPatterns: ["**/*.{html,js,css,json,png}"],
        swDest: "dist/sw.js",
        swSrc: "src/sw.ts",
      },
      injectRegister: "script-defer",
      manifest: {
        background_color: "#000000",
        description: "A map of Pattonville Senior High School",
        dir: "ltr",
        display: "standalone",
        display_override: ["window-controls-overlay"],
        id: "/",
        name: "Pattonville Senior High School Map",
        orientation: "any",
        prefer_related_applications: false,
        related_applications: [],
        scope: "/",
        screenshots: [],
        short_name: "PHS Map",
        start_url: "/",
        theme_color: "#00843e",
        // features: [],
        categories: [],
        shortcuts: [],
      },
      pwaAssets: {
        htmlPreset: "2023",
        image: "public/logo.svg",
        overrideManifestIcons: true,
        preset: "minimal-2023",
      },
      registerType: "autoUpdate",
      srcDir: "src",
      strategies: "injectManifest",
      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
