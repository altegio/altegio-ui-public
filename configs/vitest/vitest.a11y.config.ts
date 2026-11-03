import { defineProject, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import testViteConfig from './shared/test.vitest.config.ts'

export default mergeConfig(
  testViteConfig,
  defineProject({
    test: {
      name: 'a11y',
      include: ['web/core/src/a11y/**/*.test.ts'],
      browser: {
        // Entrance transitions such as the dropdown fade then end within a frame, so axe never measures
        // half-transparent text; the components shorten their motion for users who ask for it
        provider: playwright({ contextOptions: { reducedMotion: 'reduce' } }),
      },
      sequence: {
        // Renders every story, so it runs once the other projects finish: in CI the browsers
        // of all projects at once with this one outgrow the job container's 4 GiB memory limit
        groupOrder: 1,
      },
    },
  }),
)
