import assert from 'node:assert/strict'
import { test } from 'node:test'
import { build } from 'esbuild'

test('the token entry point preserves every legacy named export', async () => {
  const { outputFiles } = await build({
    entryPoints: ['web/shared/constants/tokens/index.ts'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
  })
  const code = outputFiles[0].text
  const tokens = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
  const canonicalNames = Object.keys(tokens).filter(name => name.startsWith('ALT_'))
  const legacyNames = Object.keys(tokens).filter(name => name.startsWith('YC_'))

  assert.ok(canonicalNames.length >= 355)
  assert.equal(legacyNames.length, canonicalNames.length)
  for (const name of canonicalNames) {
    assert.equal(tokens[`YC_${name.slice(4)}`], tokens[name], name)
  }
})
