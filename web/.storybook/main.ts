import type { StorybookConfig } from '@storybook/web-components-vite'
import commonViteConfig from '../../configs/vite/shared/common.vite.config'

const config: StorybookConfig = {
  framework: '@storybook/web-components-vite',
  stories: ['./*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
  ],
  refs: (_, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        vue: {
          title: 'Vue',
          url: 'http://localhost:6007',
        },
        angular: {
          title: 'Angular',
          url: 'http://localhost:6008',
        },
        core: {
          title: 'Core',
          url: 'http://localhost:6006',
        },
      }
    }

    // Получаем базовый путь из переменных окружения или используем относительные пути
    const baseUrl = process.env.STORYBOOK_BASE_URL || ''
    return {
      vue: {
        title: 'Vue',
        url: `${baseUrl}/vue/`,
      },
      angular: {
        title: 'Angular',
        url: `${baseUrl}/angular/`,
      },
      core: {
        title: 'Core',
        url: `${baseUrl}/core/`,
      },
    }
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite')

    // В продакшене устанавливаем базовый путь из переменных окружения
    const base = configType === 'PRODUCTION'
      ? process.env.STORYBOOK_BASE_URL || '/'
      : '/'

    return mergeConfig(
      config,
      {
        ...commonViteConfig,
        base,
      },
    )
  },
}

export default config
