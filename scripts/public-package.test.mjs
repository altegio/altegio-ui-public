import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { componentEntries } from './component-entries.mjs'
import { assemblePublicPackage, publicDirectory, publicManifest, walk } from './public-package.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const source = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const manifest = JSON.parse(readFileSync(resolve(publicDirectory, 'package.json'), 'utf8'))
const info = JSON.parse(readFileSync(resolve(publicDirectory, '../package-info.json'), 'utf8'))
const tarball = resolve(publicDirectory, '..', info.filename)
const files = [...walk(publicDirectory)].map(path => relative(publicDirectory, path))

test('public assembly has a separate identity and an allowlisted consumer manifest', () => {
  assert.equal(manifest.name, '@altegio/ui')
  assert.equal(manifest.version, JSON.parse(readFileSync(resolve(root, 'public-release.json'), 'utf8')).version)
  assert.match(manifest.version, /^0\./)
  assert.match(manifest.description, /beta/)
  assert.ok(manifest.keywords.includes('beta'))
  assert.notEqual(manifest.private, true)
  assert.equal(manifest.license, 'MIT')
  assert.deepEqual(manifest.publishConfig, { access: 'public', registry: 'https://registry.npmjs.org/', tag: 'beta' })
  assert.equal(manifest.devDependencies, undefined)
  assert.equal(manifest.scripts, undefined)
  assert.deepEqual(manifest, publicManifest(source))
  assert.ok(source.name === '@platform/altegio-ui' || source.private === true, 'private release or public snapshot development manifest remains separate')
  assert.ok(!Object.keys(manifest.exports).some(name => name.startsWith('./ng/')))
  assert.ok(!Object.keys(manifest.typesVersions['*']).some(name => name.startsWith('ng/')))
})

test('every documented framework component has runtime and declaration exports', () => {
  for (const framework of ['core', 'vue', 'angular']) {
    const mapping = manifest.exports[`./${framework}/*`]
    assert.equal(Object.keys(mapping)[0], 'types')
    for (const { name } of componentEntries(framework)) {
      for (const target of Object.values(mapping)) assert.ok(existsSync(resolve(publicDirectory, target.replace('*', name))), `${framework}/${name}: ${target}`)
    }
  }
  assert.ok(manifest.sideEffects.includes('./dist/web/runtime/**'), 'canonical registration modules keep side effects')
  assert.ok(manifest.sideEffects.includes('./dist/entries/**'), 'registration-only imports must remain side effects')
})

test('public onboarding carries beta status without obsolete migration instructions', () => {
  for (const file of ['README.md', 'PUBLIC_CHANGELOG.md', 'docs/PUBLICATION.md']) {
    const content = readFileSync(resolve(publicDirectory, file), 'utf8')
    assert.match(content, /beta/i, file)
    assert.match(content, /public API may change before 1\.0/, file)
    assert.doesNotMatch(content, /Migrating from|legacy-names:start|first-publication candidate|not claim that it is already published/, file)
  }
})

test('tarball contains declarations, CLI, all required assets and their notices', () => {
  const listing = execFileSync('tar', ['-tzf', tarball], { encoding: 'utf8' }).trim().split('\n').map(path => path.replace(/^package\//, ''))
  for (const path of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'licenses/inter-OFL.txt', 'licenses/BUNDLED-DEPENDENCIES.md', 'dist/web/assets/fonts/inter/inter_latin.woff2', 'dist/web/assets/fonts/inter/inter.css', 'dist/web/assets/css/altegio-ui-with-fonts.css', 'dist/web/assets/scss/breakpoints.scss', 'dist/web/cli/alt-ds.mjs', 'CHANGELOG.md']) {
    assert.ok(listing.includes(path), path)
  }
  assert.match(readFileSync(resolve(publicDirectory, 'licenses/inter-OFL.txt'), 'utf8'), /SIL OPEN FONT LICENSE Version 1.1/)
  assert.match(readFileSync(resolve(publicDirectory, 'licenses/BUNDLED-DEPENDENCIES.md'), 'utf8'), /commander@/)
  assert.match(execFileSync(process.execPath, [resolve(publicDirectory, manifest.bin['alt-ds']), '--help'], { encoding: 'utf8' }), /alt-ds/)
  assert.equal(createHash('sha256').update(readFileSync(tarball)).digest('hex'), info.sha256)
})

test('public output excludes development files, source maps, private aliases and registry credentials', () => {
  for (const path of files) {
    assert.doesNotMatch(path, /(?:^|\/)(?:scripts|node_modules|workspace|\.gitlab|\.github|internal)(?:\/|$)|\.map$|\.npmrc/)
    assert.ok(!path.endsWith('.ts') || path.endsWith('.d.ts'), `source TypeScript: ${path}`)
    if (/\.(?:m?js|css|ts|json|md)$/.test(path)) {
      const content = readFileSync(resolve(publicDirectory, path), 'utf8')
      assert.doesNotMatch(content, /Private package compatibility with 2.x names|NpmToken\.[\w-]+|gitlab\.altegio\.dev|sourceMappingURL=|#altegio-runtime\/|\/Users\//, path)
    }
  }
})

test('public assembly refuses private compatibility code before touching the candidate', () => {
  const fixture = resolve(root, 'dist/.public-package-compat-fixture.mjs')
  const before = readFileSync(tarball)
  try {
    writeFileSync(fixture, '/* Private package compatibility with 2.x names */\n')
    assert.throws(() => assemblePublicPackage(), /rejects private compatibility aliases/)
    assert.deepEqual(readFileSync(tarball), before)
  } finally { rmSync(fixture, { force: true }) }
})

test('packing the same staging directory again produces the same tarball', () => {
  const pack = JSON.parse(execFileSync('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', '..'], { cwd: publicDirectory, encoding: 'utf8' }))[0]
  assert.equal(pack.integrity, info.integrity)
})
