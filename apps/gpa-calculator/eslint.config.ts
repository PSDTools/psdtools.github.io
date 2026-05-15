import { deputy, off } from "@eslint-deputy/config";

export default deputy(
  {
    domains: [],
    environment: {
      type: "app",
    },
    rootDir: import.meta.dirname,
  },
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": off,
      "jsdoc/require-example": off,
      "unicorn-x/no-keyword-prefix": off,
    },
  },
);
