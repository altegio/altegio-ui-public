import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { setTimeout } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

async function waitForRegistry(url, verify, { fetchImpl = fetch, sleep = setTimeout, attempts = 20, delayMs = 15000 } = {}) {
  let pending = 'Registry has not propagated the release'
  for (let attempt = 0; attempt < attempts; attempt++) {
    let response
    try {
      response = await fetchImpl(url, { signal: AbortSignal.timeout(15000), headers: { 'Cache-Control': 'no-cache' } })
    } catch (error) {
      if (!(error instanceof TypeError) && error.name !== 'TimeoutError' && error.name !== 'AbortError') throw error
      pending = `Registry request failed: ${error.message}`
    }
    if (response?.ok) {
      const result = await response.json()
      if (verify(result)) return result
      pending = 'Registry release metadata has not fully propagated'
    } else if (response) {
      assert.ok(response.status === 404 || response.status === 429 || response.status >= 500, `Registry rejected verification: ${response.status}`)
      pending = `Registry returned ${response.status}`
    }
    if (attempt + 1 < attempts) await sleep(delayMs)
  }
  throw new Error(`${pending}; verification deadline reached`)
}

export function waitForPublicPackage(info, options) {
  return waitForRegistry(`https://registry.npmjs.org/@altegio%2fui/${encodeURIComponent(info.version)}`, published => {
    assert.equal(published.name, info.name)
    assert.equal(published.version, info.version)
    assert.equal(published.dist?.integrity, info.integrity, 'Published bytes differ from the approved artifact')
    return Boolean(published.dist.attestations?.provenance)
  }, options)
}

export function waitForPublicTags(info, options) {
  return waitForRegistry('https://registry.npmjs.org/@altegio%2fui', published =>
    published['dist-tags']?.beta === info.version && published['dist-tags']?.latest === info.version, options)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [mode, path] = process.argv.slice(2)
  assert.ok(['package', 'tags'].includes(mode), 'Usage: public-registry.mjs package|tags package-info.json')
  const info = JSON.parse(readFileSync(path, 'utf8'))
  assert.equal(info.name, '@altegio/ui')
  assert.match(info.version, /^0\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/)
  await (mode === 'package' ? waitForPublicPackage : waitForPublicTags)(info)
  console.log(`Verified public ${mode} for ${info.name}@${info.version}`)
}
