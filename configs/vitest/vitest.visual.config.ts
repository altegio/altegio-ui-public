import { defineProject, mergeConfig } from 'vitest/config'
import testViteConfig from './shared/test.vitest.config.ts'

const config = mergeConfig(testViteConfig, defineProject({
  test: {
    name: 'visual',
    include: ['web/core/src/visual/tests/**/*.test.ts', 'web/core/src/ui/**/*.visual.test.ts'],
  },
}))

// Replace the instance list: mergeConfig concatenates arrays and would run Chromium twice.
export default defineProject({
  ...config,
  test: {
    ...config.test,
    browser: {
      ...config.test?.browser,
      instances: [{ browser: 'chromium' }],
    },
  },
})
