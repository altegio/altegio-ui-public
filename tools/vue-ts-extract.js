import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, extname, resolve } from 'path'
import { parse } from '@vue/compiler-sfc'

const VUE_FILES_EXT = '.vue'

function findVueFiles(dir) {
  let results = []
  const items = readdirSync(dir)

  for (const item of items) {
    const fullPath = join(
      dir,
      item,
    )
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      results = [
        ...results,
        ...findVueFiles(fullPath),
      ]
    } else if (extname(fullPath) === VUE_FILES_EXT) {
      results.push(fullPath)
    }
  }

  return results
}

const vueFilePaths = findVueFiles(resolve(
  process.cwd(),
  'web',
))

vueFilePaths.forEach((vueFilePath) => {
  const vueContent = readFileSync(
    vueFilePath,
    'utf-8',
  )
  const { descriptor } = parse(vueContent)

  const vueFileScript = descriptor.script || descriptor.scriptSetup

  if (vueFileScript && vueFileScript.lang === 'ts') {
    const tsContent = vueFileScript.content

    writeFileSync(
      `${vueFilePath}.ts`,
      tsContent,
      'utf-8',
    )
  }
})
