import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))

export function readPublicRelease(directory = root) {
  const release = JSON.parse(readFileSync(resolve(directory, 'public-release.json'), 'utf8'))
  assert.match(release.version, /^0\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/, 'Public beta releases must use the independent 0.x version series')
  assert.equal(release.channel, 'beta', 'Public releases must use the beta channel')
  return release
}

export function verifyPublicRelease(source, release, version, confirmation) {
  assert.equal(source.name, '@altegio/ui')
  assert.equal(source.version, release.version, 'Snapshot and public release versions must agree')
  assert.equal(version, release.version, 'Requested version must match the reviewed public release')
  assert.equal(confirmation, `publish @altegio/ui ${release.version}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const release = readPublicRelease()
  verifyPublicRelease(JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')), release, process.argv[2], process.argv[3])
  assert.ok(readFileSync(resolve(root, 'PUBLIC_CHANGELOG.md'), 'utf8').includes(`## ${release.version} — Beta`), 'Reviewed beta release notes are required')
  console.log(`Verified public beta release ${release.version}`)
}
