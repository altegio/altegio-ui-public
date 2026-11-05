import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { readPublicRelease, verifyPublicRelease } from './public-release.mjs'
import { publicManifest } from './public-package.mjs'

test('private release bumps cannot change the public version or mutate the source manifest', () => {
  const source = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
  source.name = '@platform/altegio-ui'
  for (const version of ['3.18.1', '3.99.0', '4.0.0']) {
    source.version = version
    const before = structuredClone(source)
    const manifest = publicManifest(source)
    assert.equal(manifest.version, readPublicRelease().version)
    assert.equal(manifest.publishConfig.tag, 'beta')
    assert.deepEqual(source, before)
  }
  assert.throws(() => publicManifest({ ...source, name: '@altegio/ui' }), /snapshot version/)
})

test('public release configuration fails closed on private versions and incorrect channels', () => {
  const directory = mkdtempSync(join(tmpdir(), 'public-version-'))
  try {
    for (const version of ['3.18.1', '1.0.0', '-0.3.18', '0.03.18', '0.3.18-beta.1']) {
      writeFileSync(join(directory, 'public-release.json'), JSON.stringify({ version, channel: 'beta' }))
      assert.throws(() => readPublicRelease(directory), /0.x/)
    }
    writeFileSync(join(directory, 'public-release.json'), JSON.stringify({ version: '0.3.18', channel: 'latest' }))
    assert.throws(() => readPublicRelease(directory), /beta channel/)
  } finally { rmSync(directory, { recursive: true, force: true }) }
})

test('publication requires the exact reviewed public snapshot, version and confirmation', () => {
  const release = readPublicRelease()
  const source = { name: '@altegio/ui', version: release.version }
  const confirmation = `publish @altegio/ui ${release.version}`
  verifyPublicRelease(source, release, release.version, confirmation)
  assert.throws(() => verifyPublicRelease({ ...source, version: '3.18.1' }, release, release.version, confirmation))
  assert.throws(() => verifyPublicRelease({ ...source, name: '@platform/altegio-ui' }, release, release.version, confirmation))
  assert.throws(() => verifyPublicRelease(source, release, '0.3.19', confirmation))
  assert.throws(() => verifyPublicRelease(source, release, release.version, 'publish'))
})
