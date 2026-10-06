import { defineConfig } from 'vite'
import path from 'path'

const CLI_PATH = 'web/cli'
const CLI_FILE_NAME_OUTPUT = 'yds'
const CLI_ENTRY_PATH = path.resolve(__dirname, `../../${CLI_PATH}/cli.ts`)
const CLI_OUT_PATH = 'web/cli/build'

export default defineConfig({
  build: {
    lib: {
      name: CLI_FILE_NAME_OUTPUT,
      entry: CLI_ENTRY_PATH,
      formats: ['es'],
      fileName: () => `${CLI_FILE_NAME_OUTPUT}.mjs`,
    },
    outDir: CLI_OUT_PATH,
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'commander',
        'fs',
        'path',
        'node:async_hooks',
        'node:readline',
        'node:process',
        'node:stream',
        'node:events',
        'node:tty',
        'child_process',
        'crypto',
        'stream',
        'tty',
      ],
      output: {
        banner: '#!/usr/bin/env node',
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      '~cli': path.resolve(__dirname, `../../${CLI_PATH}`),
    },
  },
});

