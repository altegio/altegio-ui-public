import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
// Only these exact development-tool paths are accepted until upstream supports patched majors.
// See docs/DEPENDENCY_AUDIT.md. A new path, advisory or increased severity fails the gate.
const accepted = new Map([
  ['https://github.com/advisories/GHSA-gcqx-w48m-w2h4', {
    module: 'deepmerge', severity: 'low',
    paths: ['.>@storybook/angular>@storybook/builder-webpack5>fork-ts-checker-webpack-plugin>deepmerge'],
  }],
  ['https://github.com/advisories/GHSA-g3hv-75wg-m249', {
    module: 'minimatch', severity: 'moderate',
    paths: ['.>@storybook/angular>@storybook/builder-webpack5>fork-ts-checker-webpack-plugin>minimatch', '.>@typescript-eslint/parser>@typescript-eslint/typescript-estree>minimatch', '.>@microsoft/api-extractor>minimatch'],
  }],
  ['https://github.com/advisories/GHSA-3g3m-2fjr-6pw4', {
    module: 'glob', severity: 'moderate',
    paths: ['.>@vue/test-utils>js-beautify>glob'],
  }],
])

export function validateAudit(report, status, production) {
  assert.ok(report.metadata?.vulnerabilities && !report.error, 'npm audit must return a complete report')
  const counts = ['info', 'low', 'moderate', 'high', 'critical'].map(severity => report.metadata.vulnerabilities[severity])
  assert.ok(counts.every(count => Number.isInteger(count) && count >= 0), 'npm audit must return all severity counts')
  assert.ok(report.advisories && typeof report.advisories === 'object' && !Array.isArray(report.advisories), 'npm audit must return advisory details')
  const advisories = Object.values(report.advisories)
  assert.equal(counts.some(count => count > 0), advisories.length > 0, 'npm audit counts and advisory details must agree')
  for (const severity of ['info', 'low', 'moderate', 'high', 'critical']) {
    assert.equal(report.metadata.vulnerabilities[severity] > 0, advisories.some(advisory => advisory.severity === severity), 'npm audit severity counts and advisory details must agree')
  }
  if (production) assert.equal(advisories.length, 0, 'production dependencies must have zero advisories')
  for (const advisory of advisories) {
    const exception = accepted.get(advisory.url)
    assert.ok(exception && exception.module === advisory.module_name && exception.severity === advisory.severity, `Unaccepted advisory: ${advisory.url} (${advisory.module_name}, ${advisory.severity})`)
    assert.ok(Array.isArray(advisory.findings) && advisory.findings.length > 0, 'npm audit must identify affected versions and paths')
    for (const finding of advisory.findings) {
      assert.ok(typeof finding.version === 'string' && finding.version.length > 0 && Array.isArray(finding.paths) && finding.paths.length > 0, 'npm audit finding must include a version and dependency paths')
      for (const path of finding.paths) {
        assert.ok(exception.paths.includes(path), `Unaccepted vulnerable path: ${path}`)
      }
    }
  }
  // An unexplained nonzero result must never be converted into a passing audit.
  assert.ok(status === 0 || status === 1 && advisories.length > 0, `npm audit failed: exit ${status}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  for (const production of [true, false]) {
    const result = spawnSync('pnpm', ['audit', '--json', '--registry=https://registry.npmjs.org/', ...(production ? ['--prod'] : [])], { cwd: root, encoding: 'utf8', timeout: 120000, maxBuffer: 8 * 1024 * 1024 })
    if (result.error) throw result.error
    const report = JSON.parse(result.stdout)
    validateAudit(report, result.status, production)
    mkdirSync(`${root}artifacts/validation`, { recursive: true })
    writeFileSync(`${root}artifacts/validation/audit-${production ? 'production' : 'development'}.json`, `${JSON.stringify(report, null, 2)}\n`)
    console.log(`${production ? 'Production' : 'Full'} audit: ${JSON.stringify(report.metadata.vulnerabilities)}${production ? '' : '; only documented development-tool paths accepted'}`)
  }
}
