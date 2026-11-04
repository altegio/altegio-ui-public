import { existsSync, globSync, readFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import MagicString from 'magic-string'

export const root = fileURLToPath(new URL('../', import.meta.url))
export const compiledAngular = resolve(root, 'artifacts/angular-compiled')
const core = resolve(root, 'web/core/src')
const shared = resolve(root, 'web/shared')

function sourceFile(path) {
  const plain = path.replace(/\?.*$/, '').replace(/\.js$/, '.ts')
  return [plain, `${plain}.ts`, resolve(plain, 'index.ts')].find(candidate => existsSync(candidate) && candidate.endsWith('.ts'))
}

export function canonicalSource(id, importer) {
  let path
  if (id.startsWith('~core/')) path = resolve(core, id.slice(6))
  else if (id.startsWith('~shared/')) path = resolve(shared, id.slice(8))
  else if (id.startsWith('~web/shared/')) path = resolve(shared, id.slice(12))
  else if (id.startsWith('/')) path = id
  else if (id.startsWith('.') && importer) path = resolve(dirname(importer.replace(/\?.*$/, '')), id)
  else return undefined
  if (path.startsWith(`${compiledAngular}/core/src/`)) path = resolve(core, relative(`${compiledAngular}/core/src`, path))
  else if (path.startsWith(`${compiledAngular}/shared/`)) path = resolve(shared, relative(`${compiledAngular}/shared`, path))
  if (!path.startsWith(`${core}/`) && !path.startsWith(`${shared}/`)) return undefined
  return sourceFile(path)
}

// All framework references into Core/shared become entries in one Core build graph.
// These modules are implementation details, linked by relative paths after packaging.
export function canonicalRuntimeEntries() {
  const entries = new Map()
  for (const framework of ['angular', 'vue']) {
    for (const file of [...globSync(`web/${framework}/src/**/*.{ts,vue}`, { cwd: root })].sort()) {
      if (/(?:\/tests\/|\/stories\/|\.(?:test|stories)\.ts$)/.test(file)) continue
      let text = readFileSync(resolve(root, file), 'utf8')
      if (file.endsWith('.vue')) text = [...text.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]).join('\n')
      const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
      for (const statement of source.statements) {
        const id = statement.moduleSpecifier?.text
        if (typeof id !== 'string' || !id.startsWith('~')) continue
        if (statement.isTypeOnly || statement.importClause?.isTypeOnly) continue
        const input = canonicalSource(id)
        if (!input) continue
        const group = input.startsWith(`${core}/`) ? 'core' : 'shared'
        const path = relative(group === 'core' ? core : shared, input).replace(/\.ts$/, '').replaceAll('\\', '/')
        entries.set(input, `web/runtime/${group}/${path}`)
      }
    }
  }
  return new Map([...entries].sort((a, b) => a[1].localeCompare(b[1], 'en')))
}

/** @returns {import('vite').Plugin} */
export function canonicalRuntimePlugin() {
  const entries = canonicalRuntimeEntries()
  return {
    name: 'canonical-core-runtime',
    resolveId: {
      order: 'pre',
      handler(id, importer) {
        const source = canonicalSource(id, importer)
        if (!source) return null
        const entry = entries.get(source)
        if (!entry) throw new Error(`Unmapped canonical runtime import: ${id} from ${importer}`)
        return { id: `#altegio-runtime/${entry}`, external: true }
      },
    },
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue
        const copies = Object.keys(chunk.modules).filter(id => canonicalSource(id) || id.startsWith(resolve(root, 'dist/web/core') + '/') || id.startsWith(resolve(root, 'dist/web/runtime') + '/'))
        if (copies.length) throw new Error(`Framework bundle copied canonical runtime modules: ${copies.join(', ')}`)
      }
    },
    renderChunk(code, chunk) {
      const text = new MagicString(code)
      const source = ts.createSourceFile(chunk.fileName, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
      const visit = node => {
        if (ts.isStringLiteralLike(node) && node.text.startsWith('#altegio-runtime/')) {
          const entry = node.text.slice('#altegio-runtime/'.length)
          const target = relative(dirname(chunk.fileName), `${entry}.mjs`).replaceAll('\\', '/')
          text.overwrite(node.getStart(source), node.end, JSON.stringify(target.startsWith('.') ? target : `./${target}`))
        }
        ts.forEachChild(node, visit)
      }
      visit(source)
      return { code: text.toString(), map: text.generateMap({ hires: true }) }
    },
  }
}
