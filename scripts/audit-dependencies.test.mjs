import assert from 'node:assert/strict'
import { test } from 'node:test'
import { validateAudit } from './audit-dependencies.mjs'

const clean = () => ({ metadata: { vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0 } }, advisories: {} })
const known = () => ({
  metadata: { vulnerabilities: { info: 0, low: 1, moderate: 0, high: 0, critical: 0 } },
  advisories: { one: {
    url: 'https://github.com/advisories/GHSA-gcqx-w48m-w2h4', module_name: 'deepmerge', severity: 'low',
    findings: [{ version: '4.3.1', paths: ['.>@storybook/angular>@storybook/builder-webpack5>fork-ts-checker-webpack-plugin>deepmerge'] }],
  } },
})

test('only the documented development finding is allowed', () => {
  validateAudit(clean(), 0, true)
  validateAudit(known(), 1, false)
  assert.throws(() => validateAudit(known(), 1, true), /production dependencies/)
})

test('new advisories, paths and severity changes fail', () => {
  for (const change of [
    a => { a.url = 'https://github.com/advisories/new' },
    a => { a.severity = 'high' },
    a => { a.findings[0].paths.push('.>other-parent>deepmerge') },
  ]) {
    const report = known()
    change(report.advisories.one)
    assert.throws(() => validateAudit(report, 1, false))
  }
})

test('incomplete reports and empty findings cannot pass', () => {
  for (const change of [
    r => { delete r.metadata.vulnerabilities.moderate },
    r => { r.metadata.vulnerabilities.high = 1 },
    r => { delete r.advisories },
    r => { r.advisories = {} },
    r => { r.advisories.one.findings = [] },
    r => { r.advisories.one.findings[0].paths = [] },
    r => { delete r.advisories.one.findings[0].version },
    r => { r.error = { message: 'registry failure' } },
  ]) {
    const report = known()
    change(report)
    assert.throws(() => validateAudit(report, 0, false))
  }
})

test('errors and interrupted audit processes fail even with accepted findings', () => {
  for (const status of [null, 2, 128]) assert.throws(() => validateAudit(known(), status, false), /npm audit failed/)
  assert.throws(() => validateAudit(clean(), 1, false), /npm audit failed/)
})
