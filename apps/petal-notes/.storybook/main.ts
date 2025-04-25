import type { StorybookConfig } from "@storybook/sveltekit";

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|ts|svelte)"],

  addons: [
    "@storybook/addon-svelte-csf",
    "@chromatic-com/storybook",
    "@storybook/addon-designs",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
  ],
  features: {
    developmentModeForBuild: true,
  },
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },
} satisfies StorybookConfig;

export default config;
