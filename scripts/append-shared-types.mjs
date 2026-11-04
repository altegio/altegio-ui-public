import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import ts from 'typescript'

const shared = readFileSync('web/shared/constants/build/index.d.ts', 'utf8')
const parse = (path, text) => ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true)
const sharedFile = parse('shared.d.ts', shared)
const constants = sharedFile.statements.map(statement => {
  assert.ok(ts.isVariableStatement(statement) && statement.declarationList.declarations.length === 1)
  const declaration = statement.declarationList.declarations[0]
  assert.ok(ts.isIdentifier(declaration.name) && declaration.initializer && ts.isStringLiteral(declaration.initializer))
  return { name: declaration.name.text, value: declaration.initializer.text, text: statement.getText(sharedFile) }
})
function exportsOf(file) {
  const names = new Set()
  for (const statement of file.statements) {
    if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) {
      for (const item of statement.exportClause.elements) names.add(item.name.text)
    }
    if (ts.canHaveModifiers(statement) && ts.getModifiers(statement)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      if (ts.isVariableStatement(statement)) for (const item of statement.declarationList.declarations) names.add(item.name.getText(file))
      else if (statement.name) names.add(statement.name.getText(file))
    }
  }
  return names
}
for (const base of ['dist/web/core/index', 'dist/web/vue/index', 'dist/web/angular/types/altegio-ui-workspace']) {
  const path = `${base}.d.ts`
  let text = readFileSync(path, 'utf8')
  const file = parse(path, text)
  const edits = []
  const additions = []
  for (const constant of constants) {
    const declarations = file.statements.filter(statement => ts.isVariableStatement(statement) && statement.declarationList.declarations.some(item => item.name.getText(file) === constant.name))
    for (const statement of declarations) {
      const declaration = statement.declarationList.declarations.find(item => item.name.getText(file) === constant.name)
      const literal = declaration.initializer ?? (declaration.type && ts.isLiteralTypeNode(declaration.type) ? declaration.type.literal : undefined)
      assert.ok(literal && ts.isStringLiteral(literal) && literal.text === constant.value, `${path}: incompatible declaration for ${constant.name}`)
    }
    if (!declarations.length) additions.push(constant.text)
    else {
      // API Extractor may already have local tag constants used by table-plugin types.
      // Export that declaration instead of redeclaring it when appending shared types.
      for (const duplicate of declarations.slice(1)) edits.push([duplicate.pos, duplicate.end])
      const firstIsExported = ts.getModifiers(declarations[0])?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)
      const namedExport = file.statements.some(statement => ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause) && statement.exportClause.elements.some(item => item.name.text === constant.name))
      if (!firstIsExported && !namedExport) additions.push(`export { ${constant.name} };`)
    }
  }
  for (const [start, end] of edits.sort(([a], [b]) => b - a)) text = text.slice(0, start) + text.slice(end)
  writeFileSync(path, `${text.trimEnd()}\n${additions.join('\n')}\n`)
  const jsPath = base.includes('/angular/') ? 'dist/web/angular/fesm2022/altegio-ui-workspace.mjs' : `${base}.mjs`
  const javascript = readFileSync(jsPath, 'utf8')
  const runtimeExports = exportsOf(parse(jsPath, javascript))
  const runtime = constants.filter(({ name }) => !runtimeExports.has(name)).map(({ name, value }) => `export const ${name} = ${JSON.stringify(value)};`)
  // Declarations must not promise tag-name values absent from the runtime barrel.
  writeFileSync(jsPath, `${javascript.trimEnd()}\n${runtime.join('\n')}\n`)
}
console.log('Added shared tag-name exports without duplicate declarations.')
