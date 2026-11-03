import { configDefaults, defineProject, mergeConfig } from 'vitest/config'
import testViteConfig from './shared/test.vitest.config.ts'

export default mergeConfig(
  testViteConfig,
  defineProject({
    test: {
      name: 'core',
      include: ['web/core/src/**/*.test.ts'],
      // The story checks run in the a11y project
      exclude: [
        ...configDefaults.exclude,
        'web/core/src/a11y/**',
      ],
    },
  }),
)
