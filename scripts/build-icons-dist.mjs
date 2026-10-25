import { mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { build } from 'esbuild'
import ts from 'typescript'

const source = resolve('dist/web/assets/icons/index.ts')
const output = resolve('dist/web/assets/icons')

mkdirSync(output, { recursive: true })

await build({
  entryPoints: [source],
  outfile: resolve(output, 'index.mjs'),
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
})

const options = {
  declaration: true,
  emitDeclarationOnly: true,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  rootDir: output,
  outDir: output,
  skipLibCheck: true,
  strict: true,
}
const program = ts.createProgram([source], options)
const result = program.emit()
const errors = [...ts.getPreEmitDiagnostics(program), ...result.diagnostics]
if (errors.length) {
  const message = ts.formatDiagnosticsWithColorAndContext(errors, {
    getCanonicalFileName: name => name,
    getCurrentDirectory: () => process.cwd(),
    getNewLine: () => '\n',
  })
  throw new Error(message)
}

for (const file of readdirSync(output, { recursive: true })) {
  if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
    unlinkSync(join(output, file))
    continue
  }
  if (!file.endsWith('.d.ts')) continue
  const declaration = join(output, file)
  const content = readFileSync(declaration, 'utf8')
  const nodeNextImports = content.replace(/(from ['"])(\.{1,2}\/[^'"]+)(['"])/g, (match, prefix, specifier, suffix) => {
    return /\.[cm]?js$/.test(specifier) ? match : `${prefix}${specifier}.js${suffix}`
  })
  if (nodeNextImports !== content) writeFileSync(declaration, nodeNextImports)
}
