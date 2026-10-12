import { defineConfig, mergeConfig } from 'vitest/config'
import commonViteConfig from '../../vite/shared/common.vite.config'

export default mergeConfig(
  commonViteConfig,
  defineConfig({
    server: {
      watch: null,
    },
    test: {
      setupFiles: [
        './configs/vitest/setup/rootVarsStyles.ts',
        './configs/vitest/setup/suppressWarnings.ts',
      ],
      browser: {
        enabled: true,
        provider: 'playwright',
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
