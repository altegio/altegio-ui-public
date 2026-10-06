import { defineConfig, mergeConfig } from 'vitest/config'
import testViteConfig from './shared/test.vitest.config'

export default mergeConfig(
  testViteConfig,
  defineConfig({
    test: {
      name: 'angular',
      include: ['web/angular/**/*.test.ts'],
    },
  }),
)
