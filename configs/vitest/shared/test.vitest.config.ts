import { defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import commonViteConfig from '../../vite/shared/common.vite.config.ts'

export default mergeConfig(
  commonViteConfig,
  defineConfig({
    root: process.cwd(),
    server: {
      watch: null,
    },
    test: {
      // Vitest 5 resolves `maxWorkers` per project and ignores the root value.
      // Every project runs its own Chromium, so in CI more than two at a time
      // outgrow the job container's 4 GiB memory limit and the job freezes.
      maxWorkers: process.env.CI ? 2 : 3,
      setupFiles: [
        './configs/vitest/setup/rootVarsStyles.ts',
        './configs/vitest/setup/suppressWarnings.ts',
      ],
      browser: {
        enabled: true,
        provider: playwright(),
        headless: true,
        instances: [
          {
            browser: 'chromium',
          }
        ]
      },
      environment: 'jsdom',
      testTimeout: 30000,
    },
  }),
)
