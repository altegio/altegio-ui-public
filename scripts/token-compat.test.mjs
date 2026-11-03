import assert from 'node:assert/strict'
import { test } from 'node:test'
import { build } from 'esbuild'

test('the token entry point exports every token under the ALT_ prefix only', async () => {
  const { outputFiles } = await build({
    entryPoints: ['web/shared/constants/tokens/index.ts'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
  })
  const code = outputFiles[0].text
  const tokens = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
  const names = Object.keys(tokens)

  assert.ok(names.length >= 355)
  assert.deepEqual(names.filter(name => !name.startsWith('ALT_')), [])
})
