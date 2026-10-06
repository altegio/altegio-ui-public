import { defineProject, mergeConfig } from 'vitest/config'
import testViteConfig from './shared/test.vitest.config'

export default mergeConfig(
  testViteConfig,
  defineProject({
    test: {
      name: 'core',
      include: ['web/core/src/**/*.test.ts'],
    },
  }),
)
