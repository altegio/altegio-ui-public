import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { existsSync, globSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { matchesGlob } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { build } from 'esbuild'
import ts from 'typescript'

const root = fileURLToPath(new URL('../', import.meta.url))
const hasPrivateAliases = existsSync(new URL('./private-compat/apply.mjs', import.meta.url))
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

const exportTargets = () => Object.entries(packageJson.exports).flatMap(([name, exportValue]) => (
  (typeof exportValue === 'string' ? [exportValue] : Object.values(exportValue)).map(target => [name, target])
))
const angularEntry = packageJson.exports['./angular']
const deprecatedAngularEntries = Object.keys(packageJson.exports).filter(name => name.startsWith('./ng/'))
// Matches a package file against the sideEffects globs the way bundlers do: a pattern without a slash matches any directory
const hasSideEffects = file => packageJson.sideEffects.some(pattern => (
  matchesGlob(file, pattern.includes('/') ? pattern.replace(/^\.\//, '') : `**/${pattern}`)
))

test('published entry points and CLI resolve to files in the package', () => {
  for (const [name, target] of exportTargets()) {
    // A subpath pattern maps to a directory; its files are checked by the assets test
    assert.ok(target.includes('*') ? globSync(target, { cwd: root }).length : existsSync(new URL(`../${target}`, import.meta.url)), `${name}: ${target}`)
  }
  const cli = new URL(`../${packageJson.bin['alt-ds']}`, import.meta.url)
  assert.ok(existsSync(cli), packageJson.bin['alt-ds'])
  assert.match(execFileSync(process.execPath, [fileURLToPath(cli), '--help'], { encoding: 'utf8' }), /alt-ds/)
})

test('npm pack includes every public entry point', () => {
  const pack = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { cwd: root, encoding: 'utf8' }))[0]
  const files = new Set(pack.files.map(({ path }) => path))
  for (const [name, target] of exportTargets()) {
    const path = target.replace(/^\.\//, '')
    assert.ok(path.includes('*') ? [...files].some(file => matchesGlob(file, path) || path.endsWith('/*') && file.startsWith(path.slice(0, -1))) : files.has(path), `${name}: ${target}`)
  }
  assert.ok(files.has(packageJson.bin['alt-ds'].replace(/^\.\//, '')), packageJson.bin['alt-ds'])
})

test('the exports map uses only patterns that modern Node.js and bundlers support', () => {
  for (const [name, exportValue] of Object.entries(packageJson.exports)) {
    assert.ok(!name.endsWith('/'), `${name}: subpath folder mappings were removed in Node.js 17; use a "/*" pattern`)
    if (typeof exportValue === 'object') {
      assert.equal(Object.keys(exportValue)[0], 'types', `${name}: "types" must be the first condition`)
    }
  }
  assert.equal(import.meta.resolve(`${packageJson.name}/assets/css/altegio-ui.css`), new URL('../dist/web/assets/css/altegio-ui.css', import.meta.url).href)
  assert.equal(import.meta.resolve(`${packageJson.name}/assets/scss/breakpoints.scss`), new URL('../dist/web/assets/scss/breakpoints.scss', import.meta.url).href)
  assert.equal(import.meta.resolve(`${packageJson.name}/package.json`), new URL('../package.json', import.meta.url).href)
})

test('the canonical Angular entry point and its deprecated aliases resolve to the same bundle', () => {
  assert.deepEqual(angularEntry, {
    types: './dist/web/angular/types/altegio-ui-workspace.d.ts',
    import: './dist/web/angular/fesm2022/altegio-ui-workspace.mjs',
  })
  assert.equal(deprecatedAngularEntries.length, hasPrivateAliases ? 17 : 0)
  for (const name of deprecatedAngularEntries) {
    assert.deepEqual(packageJson.exports[name], angularEntry, name)
    assert.equal(import.meta.resolve(`${packageJson.name}/${name.slice(2)}`), import.meta.resolve(`${packageJson.name}/angular`), name)
  }
  // Consumers on the legacy node10 resolution see the subpaths through typesVersions
  for (const name of Object.keys(packageJson.exports).filter(name => !['.', './assets/*', './package.json'].includes(name))) {
    const typesTarget = packageJson.exports[name].types
    assert.deepEqual(packageJson.typesVersions['*'][name.slice(2)], [typesTarget], name)
  }
})

test('the published manifest declares runtime needs only', () => {
  for (const name of ['commander', '@inquirer/prompts']) {
    assert.equal(packageJson.dependencies[name], undefined, `${name} is used only by the CLI`)
    assert.ok(packageJson.devDependencies[name], `${name} is bundled into the CLI`)
  }
  const cli = readFileSync(new URL(`../${packageJson.bin['alt-ds']}`, import.meta.url), 'utf8')
  assert.doesNotMatch(cli, /(?:from|import|require\()\s*["'](?:commander|@inquirer\/prompts)["']/, 'the CLI bundle must not load its own dependencies at runtime')
  assert.deepEqual(Object.keys(packageJson.engines), ['node'], 'engines must not constrain the consumer package manager')
  assert.equal(packageJson.license, 'MIT')
})

test('sideEffects keeps custom element registration and lets bundlers drop unused icons and tokens', () => {
  assert.ok(Array.isArray(packageJson.sideEffects))
  for (const file of [
    'dist/web/core/index.mjs',
    'dist/web/core/button.mjs',
    'dist/web/vue/index.mjs',
    'dist/web/angular/fesm2022/altegio-ui-workspace.mjs',
    'dist/web/assets/css/altegio-ui.css',
  ]) {
    assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), file)
    assert.ok(hasSideEffects(file), `${file} registers custom elements or styles`)
  }
  // Vite reads the same field while building the library, so the sources must keep their side effects too
  assert.ok(hasSideEffects('web/core/src/ui/button/Button.core.ts'), 'library sources register custom elements')
  for (const file of ['dist/web/assets/icons/index.mjs', 'dist/web/assets/tokens/index.js']) {
    assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), file)
    assert.ok(!hasSideEffects(file), `${file} is side-effect free`)
  }
  // ng-packagr writes a nested package.json, which bundlers read for the Angular bundle instead of the root one
  const angularManifest = JSON.parse(readFileSync(new URL('../dist/web/angular/package.json', import.meta.url), 'utf8'))
  assert.notEqual(angularManifest.sideEffects, false)
})

test('Vue and Angular entry points export Pagination for NodeNext consumers', () => {
  const consumer = new URL(`../.package-compat-${randomUUID()}.mts`, import.meta.url)
  try {
    writeFileSync(consumer, `import { AltPagination, type TVuePaginationChangePageEvent } from '${packageJson.name}/vue'\nimport { AltPagination as AltNgPagination } from '${packageJson.name}/angular'\nimport { AltButton } from '${packageJson.name}/${hasPrivateAliases ? 'ng/button' : 'angular/button'}'\nconst handler = (event: TVuePaginationChangePageEvent): number => event.detail.page\nconsole.log(AltPagination, AltNgPagination, AltButton, handler)\n`)
    const program = ts.createProgram([fileURLToPath(consumer)], {
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      target: ts.ScriptTarget.ES2022,
      noEmit: true,
      skipLibCheck: true,
    })
    assert.deepEqual(ts.getPreEmitDiagnostics(program).map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')), [])
  } finally {
    rmSync(consumer, { force: true })
  }
})

test('Vue declarations preserve the Maskito number API for NodeNext consumers', () => {
  const consumer = new URL(`../.package-compat-${randomUUID()}.mts`, import.meta.url)
  try {
    writeFileSync(consumer, `import { AltButton, maskitoNumberOptionsGenerator } from '${packageJson.name}/vue'\nimport { maskitoNumberOptionsGenerator as directMaskitoNumber } from '@maskito/kit'\ntype Button = typeof AltButton\nmaskitoNumberOptionsGenerator({ thousandSeparator: ' ', precision: 2, max: 1000 })\ndirectMaskitoNumber({ thousandSeparator: ' ', precision: 2, max: 1000 })\n`)
    const program = ts.createProgram([fileURLToPath(consumer)], {
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      target: ts.ScriptTarget.ES2022,
      noEmit: true,
      skipLibCheck: true,
    })
    assert.deepEqual(ts.getPreEmitDiagnostics(program).map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')), [])
  } finally {
    rmSync(consumer, { force: true })
  }
})

test('published tokens use the ALT_ prefix and resolve for NodeNext consumers', async () => {
  const tokens = await import(`${packageJson.name}/tokens`)
  assert.ok(Object.keys(tokens).length >= 355)
  assert.deepEqual(Object.keys(tokens).filter(name => !name.startsWith('ALT_')), [])

  const consumer = new URL(`../.package-compat-${randomUUID()}.mts`, import.meta.url)
  try {
    writeFileSync(consumer, `import { ALT_TEXT_PRIMARY } from '${packageJson.name}/tokens'\nconsole.log(ALT_TEXT_PRIMARY)\n`)
    const options = {
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      target: ts.ScriptTarget.ES2022,
      noEmit: true,
      skipLibCheck: true,
    }
    const program = ts.createProgram([fileURLToPath(consumer)], options)
    const diagnostics = ts.getPreEmitDiagnostics(program)
    assert.deepEqual(diagnostics.map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')), [])
  } finally {
    rmSync(consumer, { force: true })
  }
})

test('published icons keep the consumer names supported by this build', async () => {
  const names = ['altClientGroup', 'altServiceClient']
  if (hasPrivateAliases) names.push('y' + 'Clients', 'y' + 'ClientService')
  const directImport = await import(`${packageJson.name}/icons`)
  const { outputFiles } = await build({
    stdin: {
      contents: `export { ${names.join(', ')} } from '${packageJson.name}/icons'`,
      resolveDir: root,
      sourcefile: 'consumer.ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
  })
  const icons = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`)
  assert.equal(icons.altClientGroup.name, 'clients')
  assert.equal(icons.altServiceClient.name, 'client_service')
  assert.equal(directImport.altClientGroup.name, 'clients')
  assert.equal(directImport.altServiceClient.name, 'client_service')
  if (hasPrivateAliases) {
    assert.equal(icons['y' + 'Clients'], icons.altClientGroup)
    assert.equal(icons['y' + 'ClientService'], icons.altServiceClient)
  }

  const consumer = new URL(`../.package-compat-${randomUUID()}.mts`, import.meta.url)
  try {
    writeFileSync(consumer, `import { altClientGroup } from '${packageJson.name}/icons'\nconsole.log(altClientGroup.name)\n`)
    const program = ts.createProgram([fileURLToPath(consumer)], {
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      target: ts.ScriptTarget.ES2022,
      noEmit: true,
      skipLibCheck: true,
    })
    assert.deepEqual(ts.getPreEmitDiagnostics(program).map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')), [])
  } finally {
    rmSync(consumer, { force: true })
  }
})
