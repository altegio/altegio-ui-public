import '~shared/.storybook/assets/css/preview.css'

import { parameters } from '~shared/.storybook/config'

export default {
  parameters: {
    ...parameters,
    options: {
      showPanel: false,
      storySort: {
        method: 'alphabetical',
        order: [
          '✅',
          '🔍',
          '⚠️',
          '⛔',
        ],
      },
    },
  },
}

