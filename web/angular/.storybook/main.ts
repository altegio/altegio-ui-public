import commonViteConfig from '../../../configs/vite/shared/common.vite.config.ts'
import type { StorybookConfig } from '@storybook/angular'
import type { StorybookConfigVite } from '@storybook/builder-vite'

const config: StorybookConfig & StorybookConfigVite = {
  stories: ['../src/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: { viteConfigPath: undefined },
    },
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
        base: `${process.env.STORYBOOK_BASE_URL || ''}/angular/`,
      },
    )

    return configType === 'DEVELOPMENT'
      ? devConfig
      : prodConfig
  },
}

export default config
