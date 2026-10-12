import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    fileParallelism: true,
    maxWorkers: 3,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'text-summary'],
      include: ['**/web/core/src/ui/**/*.ts', '**/web/vue/**/*.vue', '**/web/angular/**/*.component.ts'],
      exclude: ['**/index.ts', '**/test/**', '**/stories/**', '**/*.stories.ts', '**/models/**', '**/types/**', '**/constants/**'],
    },
    projects: [
      {
        extends: 'configs/vitest/core.vitest.config.ts',
      },
      {
        extends: 'configs/vitest/vue.vitest.config.ts',
      },
      {
        extends: 'configs/vitest/ng.vitest.config.ts',
      },
    ],
  },
});
