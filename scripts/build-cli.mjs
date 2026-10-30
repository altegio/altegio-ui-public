import { chmod } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = fileURLToPath(new URL('../dist/web/cli/alt-ds.mjs', import.meta.url))

await build({
  entryPoints: [fileURLToPath(new URL('../web/cli/cli.ts', import.meta.url))],
  outfile: output,
  bundle: true,
  packages: 'external',
  platform: 'node',
  format: 'esm',
  target: 'node24',
  sourcemap: true,
  banner: { js: '#!/usr/bin/env node' },
  alias: { '~cli': fileURLToPath(new URL('../web/cli', import.meta.url)) },
  absWorkingDir: root,
})

await chmod(output, 0o755)
