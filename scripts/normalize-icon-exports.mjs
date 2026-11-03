import { readFileSync, writeFileSync } from 'node:fs'

// Keep icon paths and runtime names stable when the SVG generator is rerun.
const renames = [
  { file: 'alt-clients.icon.ts', newName: 'altClientGroup' },
  { file: 'alt-client-service.icon.ts', newName: 'altServiceClient' },
]
const iconSetPath = new URL('../web/shared/icons/build/alt-icons-set.ts', import.meta.url)
let iconSet = readFileSync(iconSetPath, 'utf8')

for (const { file, newName } of renames) {
  const iconPath = new URL(`../web/shared/icons/build/${file}`, import.meta.url)
  const icon = readFileSync(iconPath, 'utf8')
  const declaredName = icon.match(/\bexport const (\w+)\s*:/)?.[1]
  if (!declaredName) throw new Error(`Expected icon export was not found in ${iconPath.pathname}`)
  if (declaredName !== newName) {
    writeFileSync(iconPath, icon.replace(`export const ${declaredName}`, `export const ${newName}`))
  }

  const modulePath = `./${file.slice(0, -3)}`
  const importLine = iconSet.split('\n').find(line => line.includes(`from '${modulePath}'`))
  const importedName = importLine?.match(/import \{ (\w+) \}/)?.[1]
  if (!importedName) throw new Error(`Expected icon-set import was not found for ${file}`)
  if (importedName !== newName) iconSet = iconSet.replaceAll(importedName, newName)
}

writeFileSync(iconSetPath, iconSet)
