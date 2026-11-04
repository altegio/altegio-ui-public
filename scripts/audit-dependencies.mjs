import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

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
    paths: ['.>@storybook/angular>@storybook/builder-webpack5>fork-ts-checker-webpack-plugin>minimatch', '.>@typescript-eslint/parser>@typescript-eslint/typescript-estree>minimatch', '.>vite-plugin-dts>@microsoft/api-extractor>minimatch', '.>vite-plugin-dts>@vue/language-core>minimatch'],
  }],
  ['https://github.com/advisories/GHSA-3g3m-2fjr-6pw4', {
    module: 'glob', severity: 'moderate',
    paths: ['.>@vue/test-utils>js-beautify>glob'],
  }],
])

for (const production of [true, false]) {
  const result = spawnSync('pnpm', ['audit', '--json', '--registry=https://registry.npmjs.org/', ...(production ? ['--prod'] : [])], { cwd: root, encoding: 'utf8', timeout: 120000, maxBuffer: 8 * 1024 * 1024 })
  if (result.error) throw result.error
  const report = JSON.parse(result.stdout)
  assert.ok(report.metadata?.vulnerabilities && !report.error, 'npm audit must return a complete report')
  const advisories = Object.values(report.advisories ?? {})
  if (production) assert.equal(advisories.length, 0, 'production dependencies must have zero advisories')
  for (const advisory of advisories) {
    const exception = accepted.get(advisory.url)
    assert.ok(exception && exception.module === advisory.module_name && exception.severity === advisory.severity, `Unaccepted advisory: ${advisory.url} (${advisory.module_name}, ${advisory.severity})`)
    for (const path of advisory.findings.flatMap(finding => finding.paths)) {
      assert.ok(exception.paths.includes(path), `Unaccepted vulnerable path: ${path}`)
    }
  }
  // An unexplained nonzero result must never be converted into a passing audit.
  assert.ok(result.status === 0 || result.status === 1 && advisories.length > 0, `npm audit failed: exit ${result.status}`)
  mkdirSync(`${root}artifacts/validation`, { recursive: true })
  writeFileSync(`${root}artifacts/validation/audit-${production ? 'production' : 'development'}.json`, `${JSON.stringify(report, null, 2)}\n`)
  console.log(`${production ? 'Production' : 'Full'} audit: ${JSON.stringify(report.metadata.vulnerabilities)}${production ? '' : '; only documented development-tool paths accepted'}`)
}
