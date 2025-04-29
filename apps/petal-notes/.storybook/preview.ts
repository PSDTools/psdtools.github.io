import type { Preview } from "@storybook/sveltekit";

export const parameters = {
  docs: {
    codePanel: true,
  },
};

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs"],
} satisfies Preview;

export default preview;
