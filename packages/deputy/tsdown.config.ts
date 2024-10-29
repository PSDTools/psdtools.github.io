import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],

  // ESM-only, Node.js-compatible output
  format: "esm",
  platform: "node",

  // Clean dist between builds
  clean: true,

  // Emit declaration files
  dts: true,

  unused: {
    level: "error",

    ignore: {
      // Not sure why/how peerDependencies are being detected.
      peerDependencies: ["eslint"],
    },
  },
});
