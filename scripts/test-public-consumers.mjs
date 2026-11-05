import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { readFile, mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { gzipSync } from 'node:zlib'
import { build } from 'esbuild'
import ts from 'typescript'
import { chromium, firefox, webkit } from 'playwright'
import linker from '@angular/compiler-cli/linker/babel'
import { componentEntries } from './component-entries.mjs'
import { writeCompositionFixtures, verifyComposition } from './consumer-composition.mjs'

const run = promisify(execFile)
const require = createRequire(import.meta.url)
const { transformAsync } = createRequire(require.resolve('@angular/compiler-cli/package.json'))('@babel/core')
const waitOn = require('wait-on')
const root = fileURLToPath(new URL('../', import.meta.url))
const scratch = resolve(root, 'artifacts/consumers')
const info = JSON.parse(await readFile(resolve(root, 'artifacts/public/package-info.json'), 'utf8'))
const locked = name => JSON.parse(require('node:fs').readFileSync(require.resolve(`${name}/package.json`), 'utf8')).version
const tarball = resolve(root, 'artifacts/public', info.filename)
const packageSource = process.env.PUBLIC_CONSUMER_SOURCE ?? 'tarball'
assert.ok(['tarball', 'registry'].includes(packageSource), 'PUBLIC_CONSUMER_SOURCE must be tarball or registry')
await rm(scratch, { recursive: true, force: true })
await mkdir(scratch, { recursive: true })
await writeFile(join(scratch, 'package.json'), JSON.stringify({
  name: 'altegio-public-consumer', private: true, type: 'module',
  dependencies: {
    '@altegio/ui': packageSource === 'registry' ? info.version : `file:${tarball}`, vue: locked('vue'),
    '@angular/core': locked('@angular/core'), '@angular/common': locked('@angular/common'),
    '@angular/compiler': locked('@angular/compiler'), '@angular/forms': locked('@angular/forms'),
    '@angular/platform-browser': locked('@angular/platform-browser'), rxjs: '7.8.2', tslib: locked('tslib'),
  },
}, null, 2))
await writeFile(join(scratch, '.npmrc'), 'registry=https://registry.npmjs.org/\n')
await writeFile(join(scratch, 'npm-globalrc'), '')
await run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
  cwd: scratch, timeout: 180000, maxBuffer: 4 * 1024 * 1024,
  env: { ...process.env, NPM_CONFIG_USERCONFIG: join(scratch, '.npmrc'), NPM_CONFIG_GLOBALCONFIG: join(scratch, 'npm-globalrc') },
})
const consumerRequire = createRequire(join(scratch, 'package.json'))
assert.ok(consumerRequire.resolve('@altegio/ui/package.json').startsWith(join(scratch, 'node_modules') + sep), 'the isolated installation must supply the package')
const installed = consumerRequire('@altegio/ui/package.json')
assert.equal(installed.name, info.name)
assert.equal(installed.version, info.version)
const installedLock = JSON.parse(await readFile(join(scratch, 'package-lock.json'), 'utf8'))
assert.equal(installedLock.packages['node_modules/@altegio/ui'].integrity, info.integrity, 'installed bytes must match the reviewed tarball')
console.log(`Installed ${installed.name}@${installed.version} from ${packageSource} without npm user credentials; integrity matches.`)

// Compile every supported entry from the installed package, including its exported types.
const imports = ['core', 'vue', 'angular'].flatMap(framework => componentEntries(framework)
  .map(({ name }, index) => `import * as ${framework}${index} from '@altegio/ui/${framework}/${name}'\nexport type ${framework}Entry${index} = typeof ${framework}${index}`))
imports.push("import * as AngularCatalog from '@altegio/ui/angular'\nexport type AngularExports = typeof AngularCatalog\nimport '@altegio/ui/assets/css/altegio-ui-with-fonts.css'\nimport { ALT_TEXT_PRIMARY } from '@altegio/ui/tokens'\nimport { altClientGroup } from '@altegio/ui/icons'\nconsole.log(ALT_TEXT_PRIMARY, altClientGroup.name)")
const typeFile = join(scratch, 'all-entries.mts')
await writeFile(typeFile, imports.join('\n'))
const program = ts.createProgram([typeFile], { module: ts.ModuleKind.NodeNext, moduleResolution: ts.ModuleResolutionKind.NodeNext, target: ts.ScriptTarget.ES2022, strict: true, skipLibCheck: false, noUncheckedSideEffectImports: true, noEmit: true, types: [] })
const diagnostics = ts.getPreEmitDiagnostics(program)
assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCurrentDirectory: () => scratch, getCanonicalFileName: path => path, getNewLine: () => '\n' }))
console.log(`Typechecked ${imports.length - 1} installed component entry points with NodeNext and strict library checking.`)

const html = bundle => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Public consumer</title><link rel="stylesheet" href="./app.css"></head><body><div id="app"></div><app-root></app-root><script type="module" src="./${bundle}"></script></body></html>`
const styles = "import '@altegio/ui/assets/css/altegio-ui-with-fonts.css'\n"
for (const kind of ['barrel', 'component']) {
  const suffix = kind === 'component' ? '/button' : ''
  await writeFile(join(scratch, `core-${kind}.ts`), `${styles}import '@altegio/ui/core${suffix}'\ndocument.querySelector('#app')!.innerHTML = '<alt-core-button label="Consumer button"></alt-core-button>'\n`)
  await writeFile(join(scratch, `vue-${kind}.ts`), `${styles}import { createApp, h } from 'vue'\nimport { AltButton } from '@altegio/ui/vue${suffix}'\ncreateApp({ render: () => h(AltButton, { label: 'Consumer button' }) }).mount('#app')\n`)
  await writeFile(join(scratch, `angular-${kind}.ts`), `import { Component, provideZonelessChangeDetection } from '@angular/core'\nimport { bootstrapApplication } from '@angular/platform-browser'\nimport { AltButton } from '@altegio/ui/angular${suffix}'\n@Component({selector:'app-root', imports:[AltButton], template:'<AltButton label="Consumer button" />'})\nclass App {}\nbootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).catch(error => { throw error })\n`)
  await writeFile(join(scratch, `angular-entry-${kind}.ts`), `${styles}import './compiled/angular-${kind}.js'\n`)
}
const compositions = await writeCompositionFixtures(scratch)
await writeFile(join(scratch, 'tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2022', module: 'ESNext', moduleResolution: 'bundler', strict: true, experimentalDecorators: true, skipLibCheck: true, outDir: './compiled', types: [], lib: ['ES2022', 'DOM'] }, angularCompilerOptions: { strictTemplates: true }, files: ['angular-barrel.ts', 'angular-component.ts', ...compositions.flatMap(testCase => testCase.angularSource ? [testCase.angularSource] : [])] }, null, 2))
await run(process.execPath, [resolve(dirname(require.resolve('@angular/compiler-cli/package.json')), require('@angular/compiler-cli/package.json').bin.ngc), '-p', join(scratch, 'tsconfig.json')], { cwd: scratch, timeout: 120000, maxBuffer: 4 * 1024 * 1024 })
const bundleConsumer = (entry, output, angular) => build({
      absWorkingDir: scratch,
      entryPoints: [entry],
      outfile: join(output, 'app.js'), bundle: true, minify: true, format: 'esm', platform: 'browser',
      target: ['safari14.1', 'ios16', 'chrome109', 'firefox115'],
      define: { 'process.env.NODE_ENV': '"production"', ngDevMode: 'false', ngJitMode: 'false' },
      loader: { '.woff2': 'file' }, metafile: true,
      plugins: !angular ? [] : [{
        name: 'angular-linker', setup(context) {
          context.onLoad({ filter: /\.[cm]?js$/ }, async ({ path }) => {
            const code = await readFile(path, 'utf8')
            if (!code.includes('ɵɵngDeclare')) return undefined
            const transformed = await transformAsync(code, { filename: path, compact: true, configFile: false, babelrc: false, plugins: [[linker, { linkerJitMode: false }]] })
            assert.ok(transformed?.code, `Angular linker output: ${path}`)
            return { contents: transformed.code, loader: 'js', resolveDir: dirname(path) }
          })
        },
      }],
    })
const sizes = {}
for (const framework of ['core', 'vue', 'angular']) {
  sizes[framework] = {}
  for (const kind of ['barrel', 'component']) {
    const output = join(scratch, 'built', `${framework}-${kind}`)
    await mkdir(output, { recursive: true })
    const result = await bundleConsumer(framework === 'angular' ? `angular-entry-${kind}.ts` : `${framework}-${kind}.ts`, output, framework === 'angular')
    const js = await readFile(join(output, 'app.js'))
    sizes[framework][kind] = { bytes: js.length, gzipBytes: gzipSync(js, { level: 9 }).length }
    // A small entry must not pull a form/calendar/table implementation into its graph.
    if (kind === 'component') {
      const forbidden = Object.keys(result.metafile.inputs).filter(file => /web\/core\/(?:index\.mjs$|(?:calendar|table|form)(?:\/|\.mjs$))|web\/runtime\/core\/ui\/(?:calendar|table|form)\/|altegio-ui-workspace\.mjs$/.test(file))
      assert.deepEqual(forbidden, [], `${framework} component imports the full catalog`)
    }
    await writeFile(join(output, 'index.html'), html('app.js'))
  }
}
await writeFile(join(scratch, 'bundle-sizes.json'), `${JSON.stringify(sizes, null, 2)}\n`)
console.log(`Consumer gzip sizes: ${JSON.stringify(sizes)}`)
const budgets = JSON.parse(await readFile(resolve(root, 'configs/consumer-budgets.json'), 'utf8'))
for (const [framework, metrics] of Object.entries(sizes)) {
  assert.ok(metrics.component.gzipBytes <= budgets[framework].maxGzipBytes, `${framework} component is ${metrics.component.gzipBytes} gzip bytes; budget ${budgets[framework].maxGzipBytes}`)
  assert.ok(metrics.component.gzipBytes / metrics.barrel.gzipBytes <= budgets[framework].maxFractionOfBarrel, `${framework} component no longer materially improves on the full catalog`)
}

for (const testCase of compositions) {
  const output = join(scratch, 'built', `composition-${testCase.name}`)
  await mkdir(output, { recursive: true })
  const result = await bundleConsumer(testCase.entry, output, true)
  const duplicates = Object.keys(result.metafile.inputs).filter(path => path.includes('angular-compiled/core/') || path.includes('angular-compiled/shared/'))
  assert.deepEqual(duplicates, [], `${testCase.name}: Core/shared must be linked, not recompiled`)
  await writeFile(join(output, 'index.html'), html('app.js'))
}

const contentTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' }
const built = join(scratch, 'built')
const server = createServer(async (req, res) => {
  const path = resolve(built, `.${new URL(req.url, 'http://localhost').pathname}`)
  if (!path.startsWith(built + sep)) { res.writeHead(403).end(); return }
  try {
    const data = await readFile(path)
    res.writeHead(200, { 'Content-Type': contentTypes[extname(path)] ?? 'application/octet-stream' }).end(data)
  } catch { res.writeHead(404).end() }
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}`
try {
  // Exercise the upgraded wait-on against a real HTTP endpoint, with a bounded timeout.
  await waitOn({ resources: [`${origin}/core-component/index.html`], timeout: 10000 })
  const engines = { chromium, firefox, webkit }
  for (const name of (process.env.CONSUMER_BROWSERS ?? 'chromium,firefox,webkit').split(',')) {
    assert.ok(engines[name], `Unknown browser engine ${name}`)
    const browser = await engines[name].launch({ headless: true })
    try {
      for (const framework of ['core', 'vue', 'angular']) {
        for (const kind of ['barrel', 'component']) {
          const page = await browser.newPage()
          const errors = []
          page.on('pageerror', error => errors.push(error.message))
          await page.goto(`${origin}/${framework}-${kind}/index.html`)
          await page.waitForFunction(() => {
            const button = document.querySelector('alt-core-button')
            return customElements.get('alt-core-button') && button?.shadowRoot?.textContent?.includes('Consumer button')
          })
          assert.equal(await page.evaluate(() => Boolean(customElements.get('alt-core-calendar'))), kind === 'barrel', `${framework} should register exactly the requested catalog scope`)
          await page.evaluate(() => document.fonts.ready)
          assert.deepEqual(errors, [], `${name}/${framework}/${kind}`)
          await page.close()
        }
      }
      for (const testCase of compositions) {
        const page = await browser.newPage()
        const errors = []
        page.on('pageerror', error => errors.push(error.message))
        await page.goto(`${origin}/composition-${testCase.name}/index.html`)
        await verifyComposition(page, testCase)
        assert.deepEqual(errors, [], `${name}/${testCase.name}`)
        await page.close()
      }
      console.log(`${name}: ${compositions.length} mixed-entry/provider/form compositions preserve canonical identities.`)
    } finally { await browser.close() }
    console.log(`${name}: Core, Vue and Angular tarball consumers render; component-only registration preserved.`)
  }
} finally { await new Promise(resolve => server.close(resolve)) }
