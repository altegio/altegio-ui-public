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

/**
 * Извлекает константы из JSON-токенов и преобразует их в строку с объявлениями констант
 * @param {TTokensJSON} tokens - JSON-объект с токенами
 * @param {string} prefix - Префикс для имен констант
 * @returns {string} Строка с объявлениями констант
 */
const extractConstsFromJsonTokens = (tokens: TTokensJSON, prefix: string) => {
  return Object.entries(tokens)
    .map(([key, { value }]) => `export const ${prefix}_${String(key).toUpperCase()} = ${
      typeof value === 'number' ? value : `'${value}'`
    }`)
    .join('\n')
}

/**
 * Опции для плагина extractConstsFromTokensPlugin
 * @interface IExtractConstsFromTokensPluginOptions 
 * @property {string} [outPath='dist'] - Путь для сохранения файла с константами, относительно корня проекта, без слэша на конце
 * @property {string} [fileName='tokens.ts'] - Имя выходного файла с константами, относительно outPath
 */
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

      fs.writeFileSync(
        filePath,
        [
          extractConstsFromJsonTokens(COLORS, 'YC'),
          extractConstsFromJsonTokens(EXTENDED_COLORS, 'YC'),
          extractConstsFromJsonTokens(SIZES, 'YC'),
          extractConstsFromJsonTokens(TYPOGRAPHY, 'YC'),
          extractConstsFromJsonTokens(EFFECTS, 'YC'),
          extractConstsFromJsonTokens(AVATAR, 'YC'),
        ].join('\n\n').concat('\n')
      )
    }
  }
}
