import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { build } from 'esbuild'
import ts from 'typescript'

const root = fileURLToPath(new URL('../', import.meta.url))
const hasPrivateAliases = existsSync(new URL('./private-icon-compat.mjs', import.meta.url))
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

test('published entry points and CLI resolve to files in the package', () => {
  for (const [name, exportValue] of Object.entries(packageJson.exports)) {
    const targets = typeof exportValue === 'string' ? [exportValue] : Object.values(exportValue)
    for (const target of targets) {
      assert.ok(existsSync(new URL(`../${target}`, import.meta.url)), `${name}: ${target}`)
    }
  }
  const cli = new URL(`../${packageJson.bin.yds}`, import.meta.url)
  assert.ok(existsSync(cli), packageJson.bin.yds)
  assert.match(execFileSync(process.execPath, [fileURLToPath(cli), '--help'], { encoding: 'utf8' }), /yds/)
})

test('Vue declarations expose Vue components to NodeNext consumers', () => {
  const consumer = new URL(`../.package-compat-${randomUUID()}.mts`, import.meta.url)
  try {
    writeFileSync(consumer, "import { YButton } from '@platform/altegio-ui/vue'\ntype Button = typeof YButton\n")
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

test('published tokens preserve values and resolve for NodeNext consumers', async () => {
  const tokens = await import('@platform/altegio-ui/tokens')
  const canonicalNames = Object.keys(tokens).filter(name => name.startsWith('ALT_'))
  assert.ok(canonicalNames.length >= 355)
  assert.equal(Object.keys(tokens).filter(name => name.startsWith('YC_')).length, canonicalNames.length)
  for (const name of canonicalNames) {
    assert.equal(tokens[`YC_${name.slice(4)}`], tokens[name], name)
  }

  const consumer = new URL(`../.package-compat-${randomUUID()}.mts`, import.meta.url)
  try {
    writeFileSync(consumer, "import { ALT_TEXT_PRIMARY, YC_TEXT_PRIMARY } from '@platform/altegio-ui/tokens'\nconsole.log(ALT_TEXT_PRIMARY, YC_TEXT_PRIMARY)\n")
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
  const names = ['yClientGroup', 'yServiceClient']
  if (hasPrivateAliases) names.push('y' + 'Clients', 'y' + 'ClientService')
  const directImport = await import('@platform/altegio-ui/icons')
  const { outputFiles } = await build({
    stdin: {
      contents: `export { ${names.join(', ')} } from '@platform/altegio-ui/icons'`,
      resolveDir: root,
      sourcefile: 'consumer.ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
  })
  const icons = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`)
  assert.equal(icons.yClientGroup.name, 'clients')
  assert.equal(icons.yServiceClient.name, 'client_service')
  assert.equal(directImport.yClientGroup.name, 'clients')
  assert.equal(directImport.yServiceClient.name, 'client_service')
  if (hasPrivateAliases) {
    assert.equal(icons['y' + 'Clients'], icons.yClientGroup)
    assert.equal(icons['y' + 'ClientService'], icons.yServiceClient)
  }

  const consumer = new URL(`../.package-compat-${randomUUID()}.mts`, import.meta.url)
  try {
    writeFileSync(consumer, "import { yClientGroup } from '@platform/altegio-ui/icons'\nconsole.log(yClientGroup.name)\n")
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
