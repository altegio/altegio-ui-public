import { readFileSync, writeFileSync } from 'node:fs'
import ts from 'typescript'

// Wrapper declarations must refer to the canonical Core classes too: flattening them
// creates distinct private/protected member identities even when JavaScript is shared.
const core = 'dist/web/core/index.d.ts'
const program = ts.createProgram([core], { skipLibCheck: true, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler })
const checker = program.getTypeChecker()
const exports = new Set(checker.getExportsOfModule(checker.getSymbolAtLocation(program.getSourceFile(core))).map(symbol => symbol.name))
for (const [path, from] of [
  ['dist/web/vue/index.d.ts', '../core/index.js'],
  ['dist/web/angular/types/altegio-ui-workspace.d.ts', '../../core/index.js'],
]) {
  let text = readFileSync(path, 'utf8')
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true)
  const classes = source.statements.filter(statement => ts.isClassDeclaration(statement) && statement.name && exports.has(statement.name.text))
  for (const statement of [...classes].reverse()) text = text.slice(0, statement.pos) + text.slice(statement.end)
  const names = classes.map(statement => statement.name.text)
  if (names.length) {
    const publicNames = classes.filter(statement => ts.getModifiers(statement)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)).map(statement => statement.name.text)
    text = `import { ${names.join(', ')} } from '${from}'\n${text}`
    if (publicNames.length) text += `\nexport { ${publicNames.join(', ')} }\n`
    writeFileSync(path, text)
  }
  console.log(`${path}: ${names.length} canonical Core class references`)
}
