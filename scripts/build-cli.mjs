import { chmod, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = fileURLToPath(new URL('../dist/web/cli/alt-ds.mjs', import.meta.url))
const { dependencies = {} } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))

await build({
  entryPoints: [fileURLToPath(new URL('../web/cli/cli.ts', import.meta.url))],
  outfile: output,
  bundle: true,
  // CLI-only packages (commander, @inquirer/prompts) are bundled; runtime dependencies stay external
  external: Object.keys(dependencies),
  platform: 'node',
  format: 'esm',
  target: 'node24',
  sourcemap: true,
  // commander is CommonJS: the ESM bundle needs require() for its Node.js built-ins
  banner: { js: "#!/usr/bin/env node\nimport { createRequire } from 'node:module'\nconst require = createRequire(import.meta.url)" },
  alias: { '~cli': fileURLToPath(new URL('../web/cli', import.meta.url)) },
  absWorkingDir: root,
})

await chmod(output, 0o755)
