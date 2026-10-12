import type { Plugin } from 'vite'
import * as fs from 'fs'
import * as path from 'path'

import {
  COLORS,
  EXTENDED_COLORS,
  SIZES,
  TYPOGRAPHY,
  EFFECTS,
  AVATAR,
  type TTokensJSON,
} from '../../../tokens'

interface IExtractConstsFromTokensPluginOptions {
  outPath: string
  fileName: string
}

const extractConstsFromJsonTokens = (tokens: TTokensJSON) => {
  return Object.entries(tokens)
    .map(([key, { value }]) => {
      const name = `ALT_${String(key).toUpperCase()}`
      const serializedValue = typeof value === 'number' ? value : `'${value}'`

      return `export const ${name} = ${serializedValue}`
    })
    .join('\n')
}

const extractLegacyExportsFromJsonTokens = (tokens: TTokensJSON) => {
  return Object.keys(tokens)
    .map((key) => {
      const suffix = String(key).toUpperCase()
      const name = `ALT_${suffix}`
      const legacyName = `YC_${suffix}`

      return `/** @deprecated Use ${name}. */\nexport const ${legacyName} = canonical.${name}`
    })
    .join('\n\n')
}

export default function extractConstsFromTokensPlugin(
  {
    outPath = 'dist',
    fileName = 'tokens.ts'
  }: IExtractConstsFromTokensPluginOptions
): Plugin {
  return {
    name: 'extract-consts-from-tokens',
    buildStart() {
      const filePath = path.resolve(__dirname, `../../../${outPath}/${fileName}`)
      const dirPath = path.dirname(filePath)

      // Создаем директории рекурсивно, если они не существуют
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }

      const tokenGroups = [COLORS, EXTENDED_COLORS, SIZES, TYPOGRAPHY, EFFECTS, AVATAR]
      fs.writeFileSync(filePath, "export * from './canonical.js'\nexport * from './legacy.js'\n")
      fs.writeFileSync(
        path.join(dirPath, 'canonical.ts'),
        tokenGroups.map(extractConstsFromJsonTokens).join('\n\n').concat('\n')
      )
      fs.writeFileSync(
        path.join(dirPath, 'legacy.ts'),
        "import * as canonical from './canonical.js'\n\n" +
          tokenGroups.map(extractLegacyExportsFromJsonTokens).join('\n\n').concat('\n')
      )
    }
  }
}
