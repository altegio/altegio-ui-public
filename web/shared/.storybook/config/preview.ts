import type { Preview } from '@storybook/vue3'

export const parameters: Preview['parameters'] = {
  // The a11y panel runs axe-core on every story; violations count as errors.
  // CI runs the same check for the core stories in web/core/src/a11y/Stories.a11y.test.ts.
  a11y: { test: 'error' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
}
