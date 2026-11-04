import { defineConfig, mergeConfig } from 'vitest/config'
import testViteConfig from './shared/test.vitest.config.ts'

export default mergeConfig(
  testViteConfig,
  defineConfig({
    test: {
      name: 'angular',
      include: ['web/angular/**/*.test.ts'],
      // Keep WebKit within the 4 GiB CI limit together with test-browser-ci.mjs sharding.
      ...(process.env.CI && process.env.TEST_BROWSER === 'webkit' ? { maxWorkers: 1 } : {}),
    },
  }),
)
