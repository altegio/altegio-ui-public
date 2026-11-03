import { defineProject, mergeConfig } from 'vitest/config'
import testViteConfig from './shared/test.vitest.config.ts'

export default mergeConfig(
  testViteConfig,
  defineProject({
    test: {
      name: 'a11y',
      include: ['web/core/src/a11y/**/*.test.ts'],
      sequence: {
        // Renders every story, so it runs once the other projects finish: in CI the browsers
        // of all projects at once with this one outgrow the job container's 4 GiB memory limit
        groupOrder: 1,
      },
    },
  }),
)
