import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Altegio UI · Beta',
    brandUrl: 'https://github.com/altegio/altegio-ui-public',
  }),
  sidebar: {
    showRoots: false,
    collapsedRoots: [
      'Changelog',
      'Tokens',
    ],
  },
})

