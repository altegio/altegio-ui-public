import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = fileURLToPath(new URL('../', import.meta.url))
const kebab = value => value.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

// The framework barrels define the supported surface. Internal directories never become entry points.
export function componentEntries(framework) {
  const source = readFileSync(resolve(root, `web/${framework}/src/index.ts`), 'utf8')
  return [...source.matchAll(/export \* from ['"]\.\/ui\/([^'"]+)['"]/g)]
    .map(([, directory]) => ({ directory, name: kebab(directory) }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
}

function write(path, text) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, text)
}

export function prepareAngularEntries() {
  const workspace = resolve(root, 'workspace/angular')
  const config = JSON.parse(readFileSync(resolve(workspace, 'ng-package.json'), 'utf8'))
  config.dest = '../../artifacts/angular-declarations'
  writeFileSync(resolve(workspace, 'ng-package.json'), JSON.stringify(config, null, 2))
  writeFileSync(resolve(workspace, 'tsconfig.runtime.json'), JSON.stringify({
    extends: './tsconfig.lib.json',
    compilerOptions: {
      rootDir: './src', outDir: '../../artifacts/angular-compiled',
      target: 'ES2022', declaration: true, declarationMap: false,
      declarationDir: '../../artifacts/angular-compiled',
      noEmit: false, sourceMap: true,
    },
    angularCompilerOptions: { compilationMode: 'partial', strictTemplates: true },
    files: ['src/index.ts'], include: [],
  }, null, 2))
}

export function buildComponentEntries() {
  const config = ts.readConfigFile(resolve(root, 'tsconfig.json'), ts.sys.readFile)
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'))
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root)
  // The checker follows type-star exports (including Vue props/events); it does not emit runtime code.
  const files = ['core', 'vue', 'angular'].flatMap(framework => componentEntries(framework)
    .map(({ directory }) => resolve(root, `web/${framework}/src/ui/${directory}/index.ts`)))
  const program = ts.createProgram(files, parsed.options)
  const checker = program.getTypeChecker()
  for (const framework of ['core', 'vue', 'angular']) {
    for (const { directory, name } of componentEntries(framework)) {
      let runtime
      let declaration
      if (framework === 'angular') {
        runtime = resolve(root, `dist/web/angular/components/${name}/index.mjs`)
        declaration = resolve(root, 'dist/web/angular/types/altegio-ui-workspace.d.ts')
      } else {
        runtime = resolve(root, `dist/web/${framework}/${directory}/index.mjs`)
        declaration = resolve(root, `dist/web/${framework}/index.d.ts`)
      }
      if (!existsSync(runtime) || !existsSync(declaration)) throw new Error(`Missing built ${framework}/${name}`)
      const base = resolve(root, `dist/entries/${framework}/${name}`)
      const from = path => {
        const value = relative(dirname(base), path).replaceAll('\\', '/')
        return value.startsWith('.') ? value : `./${value}`
      }
      write(`${base}.mjs`, `export * from '${from(runtime)}'\n`)
      const source = program.getSourceFile(resolve(root, `web/${framework}/src/ui/${directory}/index.ts`))
      const names = checker.getExportsOfModule(checker.getSymbolAtLocation(source)).map(symbol => symbol.name).sort()
      if (!names.length) throw new Error(`Empty component declaration: ${framework}/${name}`)
      write(`${base}.d.ts`, `export { ${names.join(', ')} } from '${from(declaration).replace(/\.d\.ts$/, '.js')}'\n`)
    }
  }
  console.log('Built typed component entry points for Core, Vue and Angular.')
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === 'angular') prepareAngularEntries()
  else if (process.argv[2] === 'build') buildComponentEntries()
  else throw new Error('Usage: component-entries.mjs angular|build')
}
