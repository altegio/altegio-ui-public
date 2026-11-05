import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { readPublicRelease, verifyPublicRelease } from './public-release.mjs'
import { publicManifest } from './public-package.mjs'
import { waitForPublicPackage, waitForPublicTags } from './public-registry.mjs'

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

const info = { name: '@altegio/ui', version: '0.3.18', integrity: 'sha512-reviewed' }
const published = { name: info.name, version: info.version, dist: { integrity: info.integrity, attestations: { provenance: { predicateType: 'https://slsa.dev/provenance/v1' } } } }
const response = (data, status = 200) => new Response(JSON.stringify(data), { status })

test('registry verification tolerates delayed version and provenance propagation', async () => {
  const responses = [response({}, 404), response({}, 503), response({ ...published, dist: { integrity: info.integrity } }), response(published)]
  let sleeps = 0
  const result = await waitForPublicPackage(info, { fetchImpl: async () => responses.shift(), sleep: async () => { sleeps++ } })
  assert.deepEqual(result, published)
  assert.equal(sleeps, 3)
})

test('registry verification rejects a different published artifact before promoting tags', async () => {
  await assert.rejects(waitForPublicPackage(info, {
    fetchImpl: async () => response({ ...published, dist: { integrity: 'sha512-unreviewed' } }),
    sleep: async () => assert.fail('Integrity mismatches must not be retried'),
  }), /Published bytes differ/)
})

test('registry verification fails closed on permanent errors and bounded propagation timeout', async () => {
  await assert.rejects(waitForPublicPackage(info, {
    fetchImpl: async () => response({}, 401), sleep: async () => assert.fail('Authentication errors must not be retried'),
  }), /401/)
  let requests = 0
  await assert.rejects(waitForPublicPackage(info, {
    fetchImpl: async () => { requests++; return response({}, 404) }, sleep: async () => {}, attempts: 3,
  }), /deadline reached/)
  assert.equal(requests, 3)
})

test('registry verification retries temporary connection failures', async () => {
  let requests = 0
  await waitForPublicPackage(info, {
    fetchImpl: async () => { if (++requests === 1) throw new TypeError('fetch failed'); return response(published) },
    sleep: async () => {},
  })
  assert.equal(requests, 2)
})

test('tag verification waits for both beta and default install metadata to propagate', async () => {
  const responses = [response({ 'dist-tags': { beta: info.version, latest: '3.18.1' } }), response({ 'dist-tags': { beta: info.version, latest: info.version } })]
  let sleeps = 0
  await waitForPublicTags(info, { fetchImpl: async () => responses.shift(), sleep: async () => { sleeps++ } })
  assert.equal(sleeps, 1)
})
