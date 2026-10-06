import commonViteConfig from '../../../configs/vite/shared/common.vite.config'
import commonVueViteConfig from '../../../configs/vite/shared/commonVue.vite.config'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite')

    const devConfig = mergeConfig(
      config,
      mergeConfig(
        commonViteConfig,
        commonVueViteConfig,
      ),
    )
    const prodConfig = mergeConfig(
      config,
      mergeConfig(
        commonViteConfig,
        {
          base: `${process.env.STORYBOOK_BASE_URL || ''}/vue/`,
          plugins: commonVueViteConfig.plugins,
        },
      ),
    )

    return configType === 'DEVELOPMENT'
      ? devConfig
      : prodConfig
  },
}

export default config
