import commonViteConfig from '../../../configs/vite/shared/common.vite.config'

import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  stories: ['../src/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite')

    const devConfig = mergeConfig(
      config,
      commonViteConfig,
    )
    const prodConfig = mergeConfig(
      config,
      {
        ...commonViteConfig,
        base: `${process.env.STORYBOOK_BASE_URL || ''}/core/`,
      },
    )

    return configType === 'DEVELOPMENT'
      ? devConfig
      : prodConfig
  },
}
export default config
