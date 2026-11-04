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
  const names = new Set(classes.map(statement => statement.name.text))
  const localNames = new Set()
  for (const statement of source.statements) {
    if (statement.name && ts.isIdentifier(statement.name)) localNames.add(statement.name.text)
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) localNames.add(declaration.name.text)
      }
    }
    if (ts.isImportDeclaration(statement) && statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) {
      for (const specifier of statement.importClause.namedBindings.elements) localNames.add(specifier.name.text)
    }
  }
  // Newer declaration emitters preserve ambient tag maps without emitting the
  // referenced Core classes. Import those references from the same canonical module.
  function collectAmbientReferences(node) {
    if (ts.isIdentifier(node) && exports.has(node.text) && !localNames.has(node.text)) names.add(node.text)
    ts.forEachChild(node, collectAmbientReferences)
  }
  for (const statement of source.statements) {
    if (ts.isModuleDeclaration(statement) && statement.flags & ts.NodeFlags.GlobalAugmentation) collectAmbientReferences(statement)
  }
  if (names.size) {
    const publicNames = classes.filter(statement => ts.getModifiers(statement)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)).map(statement => statement.name.text)
    text = `import { ${[...names].join(', ')} } from '${from}'\n${text}`
    if (publicNames.length) text += `\nexport { ${publicNames.join(', ')} }\n`
    writeFileSync(path, text)
  }
  console.log(`${path}: ${names.size} canonical Core references`)
}
