import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    fileParallelism: true,
    maxWorkers: process.env.CI ? 1 : 3,
    coverage: {
      enabled: false,
      provider: 'v8',
      reporter: ['text', 'text-summary'],
      include: ['**/web/core/src/ui/**/*.ts', '**/web/vue/**/*.vue', '**/web/angular/**/*.component.ts'],
      exclude: ['**/index.ts', '**/test/**', '**/stories/**', '**/*.stories.ts', '**/models/**', '**/types/**', '**/constants/**'],
    },
    projects: [
      './configs/vitest/vitest.core.config.ts',
      './configs/vitest/vitest.vue.config.ts',
      './configs/vitest/vitest.ng.config.ts',
    ],
  },
});
