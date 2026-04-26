import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ["@storybook/addon-docs", "@storybook/addon-mcp"],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [tailwindcss()]
    })
};
export default config;