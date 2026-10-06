import { defineConfig, mergeConfig } from 'vitest/config'
import commonVueViteConfig from '../vite/shared/commonVue.vite.config'
import testViteConfig from './shared/test.vitest.config'

export default mergeConfig(
  commonVueViteConfig,
  mergeConfig(
    testViteConfig,
    defineConfig({
      test: {
        name: 'vue',
        include: ['web/vue/src/ui/**/*.test.ts'],
      },
    }),
  ),
) 