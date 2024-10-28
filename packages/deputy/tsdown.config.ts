import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: "esm",
  clean: true,
  platform: "node",
  dts: true,
  unused: {
    level: "error",
    ignore: {
      peerDependencies: ["eslint"],
    },
  },
});
