import type { Preview } from '@storybook/react-vite';

import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/900.css';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
  }
};

export default preview;