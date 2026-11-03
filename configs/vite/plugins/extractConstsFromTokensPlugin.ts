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
} from '../../../tokens/index.ts'

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

export default function extractConstsFromTokensPlugin(
  {
    outPath = 'dist',
    fileName = 'tokens.ts'
  }: IExtractConstsFromTokensPluginOptions
): Plugin {
  return {
    name: 'extract-consts-from-tokens',
    buildStart() {
      const filePath = path.resolve(import.meta.dirname, `../../../${outPath}/${fileName}`)
      const dirPath = path.dirname(filePath)

      // Create the output directory, including missing parents
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }

      const tokenGroups = [COLORS, EXTENDED_COLORS, SIZES, TYPOGRAPHY, EFFECTS, AVATAR]
      fs.writeFileSync(filePath, "export * from './canonical.js'\n")
      fs.writeFileSync(
        path.join(dirPath, 'canonical.ts'),
        tokenGroups.map(extractConstsFromJsonTokens).join('\n\n').concat('\n')
      )
    }
  }
}
